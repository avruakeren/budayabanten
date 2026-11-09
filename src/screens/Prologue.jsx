import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { PROLOGUE } from '../data/regions';
import { audio } from '../lib/audio';
import { DialogBox } from '../components/DialogBox';

export function Prologue() {
  const { dispatch } = useGameState();
  const [index, setIndex] = useState(0);

  const finish = () => {
    audio.unlock();
    dispatch({ type: 'PROLOGUE_DONE' });
  };

  const next = () => {
    audio.click();
    if (index < PROLOGUE.lines.length - 1) {
      setIndex((current) => current + 1);
      return;
    }
    finish();
  };

  const skip = () => {
    audio.click();
    finish();
  };

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col px-5 pb-8 pt-24">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Prolog · Bab 01</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {PROLOGUE.title}
          </h1>
        </div>
        <button
          type="button"
          onClick={skip}
          className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        >
          Lewati prolog
        </button>
      </header>

      <div className="flex flex-1 items-center py-12">
        <blockquote className="max-w-xl border-l-2 border-accent pl-5">
          <p className="font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
            “Jangan hanya melihat — dengarkan.”
          </p>
          <footer className="mt-3 text-[11px] uppercase tracking-[0.14em] text-muted">
            Catatan terakhir Aki Wira
          </footer>
        </blockquote>
      </div>

      <DialogBox
        line={PROLOGUE.lines[index]}
        index={index}
        total={PROLOGUE.lines.length}
        onNext={next}
      />
    </div>
  );
}
