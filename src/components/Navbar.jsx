import { useGameState } from '../hooks/useGameState';
import { audio } from '../lib/audio';
import { BookIcon, MuteIcon, VolumeIcon } from './Icons';

export function Navbar({ onOpenCodex }) {
  const { screen, collectedCards, audioMuted, dispatch } = useGameState();

  const goHome = () => {
    audio.click();
    if (screen !== 'HOMEPAGE') dispatch({ type: 'GO_HOME' });
  };

  const toggleAudio = () => {
    const nextMuted = !audioMuted;
    audio.setMuted(nextMuted);
    if (!nextMuted) audio.startBgm();
    audio.play(nextMuted ? 'hover' : 'click');
    dispatch({ type: 'TOGGLE_AUDIO' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-5">
        <button
          type="button"
          onClick={goHome}
          className="min-w-0 text-left font-display text-[15px] font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          Jelajah Budaya <span className="italic">Banten</span>
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={toggleAudio}
            className="btn-icon"
            aria-label={audioMuted ? 'Nyalakan suara' : 'Matikan suara'}
            aria-pressed={!audioMuted}
          >
            {audioMuted ? <MuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              audio.click();
              onOpenCodex();
            }}
            className="inline-flex h-9 items-center gap-2 rounded-md px-2.5 text-xs font-medium text-muted transition-colors hover:bg-line/60 hover:text-ink"
            aria-label={`Buka album budaya, ${collectedCards.length} dari 4 kartu terkumpul`}
          >
            <BookIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Album</span>
            <span className="tabular-nums text-ink">{collectedCards.length}/4</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
