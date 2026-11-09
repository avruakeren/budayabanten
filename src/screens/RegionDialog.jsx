import { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { getRegion } from '../data/regions';
import { getCard } from '../data/codexCards';
import { audio } from '../lib/audio';
import { DialogBox } from '../components/DialogBox';
import { Stars } from '../components/ui/Stars';
import { ArrowLeftIcon } from '../components/Icons';

export function RegionDialog() {
  const { activeRegionId, dispatch, isCompleted, starsFor } = useGameState();
  const region = getRegion(activeRegionId);
  const card = region ? getCard(region.cardId) : null;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [activeRegionId]);

  if (!region) {
    return (
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col justify-center px-5 pt-24">
        <p className="font-display text-xl text-ink">Wilayah tidak ditemukan</p>
        <p className="mt-2 text-sm text-muted">Kembali ke peta untuk memilih wilayah.</p>
        <button
          type="button"
          onClick={() => dispatch({ type: 'RETURN_TO_MAP' })}
          className="btn btn-primary mt-5 w-max"
        >
          Kembali ke Peta
        </button>
      </div>
    );
  }

  const lines = region.dialog;
  const completed = isCompleted(region.id);

  const finish = () => {
    audio.success();
    dispatch({ type: 'DIALOG_DONE' });
  };

  const next = () => {
    audio.click();
    if (index < lines.length - 1) {
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
      <button
        type="button"
        onClick={() => {
          audio.click();
          dispatch({ type: 'RETURN_TO_MAP' });
        }}
        className="inline-flex w-max items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Kembali ke peta
      </button>

      <header className="mt-6">
        <p className="eyebrow">
          Wilayah {String(region.order).padStart(2, '0')} · {region.era}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {region.title}
          </h1>
          {completed ? <Stars value={starsFor(region.id)} size="h-3.5 w-3.5" /> : null}
        </div>
        <p className="mt-2 text-sm italic text-muted">{region.tagline}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{region.description}</p>
        {card ? (
          <p className="mt-3 text-[11px] text-muted">
            Hadiah: <span className="font-medium text-ink">{card.name}</span> · {card.category}
          </p>
        ) : null}
      </header>

      <div className="mt-auto pt-10">
        <DialogBox
          line={lines[index]}
          index={index}
          total={lines.length}
          onNext={next}
          onSkip={skip}
          skipLabel="Lewati dialog"
        />
      </div>
    </div>
  );
}
