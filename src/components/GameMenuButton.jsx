import { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { CODEX_CARDS } from '../data/codexCards';
import { audio } from '../lib/audio';
import { BookIcon, HomeIcon, MuteIcon, VolumeIcon, CloseIcon } from './Icons';

export function GameMenuButton({ onOpenCodex }) {
  const { screen, collectedCards, audioMuted, dispatch } = useGameState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const goHome = () => {
    audio.click();
    setOpen(false);
    if (screen !== 'HOMEPAGE') dispatch({ type: 'GO_HOME' });
  };

  const toggleAudio = () => {
    const nextMuted = !audioMuted;
    audio.setMuted(nextMuted);
    if (!nextMuted) audio.startBgm();
    audio.play(nextMuted ? 'hover' : 'click');
    dispatch({ type: 'TOGGLE_AUDIO' });
  };

  const openCodex = () => {
    audio.click();
    setOpen(false);
    onOpenCodex?.();
  };

  return (
    <div className="fixed right-3 top-3 z-50 sm:right-4 sm:top-4">
      <button
        type="button"
        onClick={() => {
          audio.click();
          setOpen((value) => !value);
        }}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-paper/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-line bg-surface p-2 shadow-soft"
          >
            <button
              type="button"
              role="menuitem"
              onClick={goHome}
              className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-paper"
            >
              <HomeIcon className="h-4 w-4 text-muted" />
              <span>Beranda</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={toggleAudio}
              className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-paper"
              aria-pressed={!audioMuted}
            >
              {audioMuted ? <MuteIcon className="h-4 w-4 text-muted" /> : <VolumeIcon className="h-4 w-4 text-muted" />}
              <span>{audioMuted ? 'Nyalakan suara' : 'Matikan suara'}</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={openCodex}
              className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-paper"
            >
              <BookIcon className="h-4 w-4 text-muted" />
              <span>Album Budaya</span>
              <span className="ml-auto tabular-nums text-muted">{collectedCards.length}/{CODEX_CARDS.length}</span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
