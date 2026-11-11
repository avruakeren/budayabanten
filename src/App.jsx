import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { GameProvider, useGameState } from './hooks/useGameState';
import { audio } from './lib/audio';
import { Navbar } from './components/Navbar';
import { GameMenuButton } from './components/GameMenuButton';
import { CodexModal } from './components/CodexModal';
import { Homepage } from './screens/Homepage';
import { Prologue } from './screens/Prologue';
import { OverworldMap } from './screens/OverworldMap';
import { RegionDialog } from './screens/RegionDialog';
import { MinigameScreen } from './screens/MinigameScreen';

function GameDirector() {
  const { screen, activeRegionId, audioMuted, resetSave } = useGameState();
  const [codexOpen, setCodexOpen] = useState(false);

  useEffect(() => {
    audio.setMuted(audioMuted);
    if (!audioMuted) audio.startBgm();
  }, [audioMuted]);

  useEffect(() => {
    if (audioMuted) return undefined;
    const unlock = () => {
      audio.ensure();
      audio.startBgm();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, [audioMuted]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) audio.suspend();
      else if (!audioMuted) audio.resume();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [audioMuted]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [screen, activeRegionId]);

  const renderScreen = () => {
    switch (screen) {
      case 'PROLOGUE':
        return <Prologue />;
      case 'MAP':
        return <OverworldMap onOpenCodex={() => setCodexOpen(true)} />;
      case 'DIALOG':
        return activeRegionId ? (
          <RegionDialog />
        ) : (
          <OverworldMap onOpenCodex={() => setCodexOpen(true)} />
        );
      case 'MINIGAME':
        return activeRegionId ? (
          <MinigameScreen />
        ) : (
          <OverworldMap onOpenCodex={() => setCodexOpen(true)} />
        );
      case 'HOMEPAGE':
      default:
        return <Homepage />;
    }
  };

  const screenKey = `${screen}-${activeRegionId ?? 'root'}`;

  return (
    <div className="relative min-h-[100dvh]">
      {screen === 'MINIGAME' ? (
        <GameMenuButton onOpenCodex={() => setCodexOpen(true)} />
      ) : screen !== 'HOMEPAGE' ? (
        <Navbar onOpenCodex={() => setCodexOpen(true)} />
      ) : null}

      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screenKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <CodexModal
        open={codexOpen}
        onClose={() => setCodexOpen(false)}
        onReset={() => {
          resetSave();
          setCodexOpen(false);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <GameProvider>
        <GameDirector />
      </GameProvider>
    </MotionConfig>
  );
}
