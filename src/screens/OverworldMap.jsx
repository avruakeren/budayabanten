import { useEffect, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { REGIONS } from '../data/regions';
import { CODEX_CARDS } from '../data/codexCards';
import { audio } from '../lib/audio';
import { Stars } from '../components/ui/Stars';
import { Toast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon, LockIcon } from '../components/Icons';

function statusOf(region, completedRegions, unlockedRegions) {
  if (completedRegions.includes(region.id)) return 'completed';
  if (unlockedRegions.includes(region.id)) return 'available';
  return 'locked';
}

export function OverworldMap({ onOpenCodex }) {
  const {
    completedRegions,
    unlockedRegions,
    completedCount,
    totalRegions,
    nextRegionId,
    dispatch,
    starsFor,
    collectedCards,
  } = useGameState();
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  };

  const handleRegion = (region) => {
    const status = statusOf(region, completedRegions, unlockedRegions);
    if (status === 'locked') {
      const previous = REGIONS[region.order - 2];
      audio.error();
      notify(`Selesaikan ${previous?.title ?? 'wilayah sebelumnya'} terlebih dahulu.`);
      return;
    }
    audio.click();
    dispatch({ type: 'OPEN_REGION', regionId: region.id });
  };

  const nextRegion = REGIONS.find((region) => region.id === nextRegionId) ?? null;
  const allComplete = completedRegions.length === totalRegions;

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-16 pt-24">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Peta perjalanan</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight text-ink sm:text-5xl">
            Perjalanan
          </h1>
        </div>
        <p className="text-xs tabular-nums text-muted">
          {completedCount} / {totalRegions} selesai
        </p>
      </header>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        Pilih wilayah yang tersedia. Beberapa mini-game masih disiapkan, tetapi kartu budayanya tetap
        bisa dikumpulkan.
      </p>

      {nextRegion && !allComplete ? (
        <p className="mt-6 text-xs text-muted">
          Berikutnya: <span className="font-medium text-ink">{nextRegion.title}</span>
        </p>
      ) : null}

      <ul className="mt-4 border-t border-line">
        {REGIONS.map((region) => {
          const status = statusOf(region, completedRegions, unlockedRegions);
          const locked = status === 'locked';
          const completed = status === 'completed';
          const comingSoon = region.minigame === 'coming-soon';

          return (
            <li key={region.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => handleRegion(region)}
                className={`group flex w-full items-center gap-4 py-5 text-left transition-colors ${
                  locked ? 'cursor-not-allowed opacity-55' : 'hover:text-accent'
                }`}
                aria-label={`${region.title} — ${
                  locked
                    ? 'terkunci'
                    : completed
                      ? 'selesai'
                      : comingSoon
                        ? 'tersedia, mini-game segera hadir'
                        : 'tersedia'
                }`}
              >
                <span className="w-6 shrink-0 text-[11px] font-medium tabular-nums text-muted">
                  {String(region.order).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold leading-snug text-ink sm:text-lg">
                    {region.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{region.tagline}</span>
                </span>

                <span className="flex shrink-0 items-center gap-2.5">
                  {completed ? (
                    <>
                      <Stars value={starsFor(region.id)} size="h-3 w-3" />
                      <span className="hidden text-[10px] uppercase tracking-[0.1em] text-muted sm:inline">
                        Selesai
                      </span>
                    </>
                  ) : locked ? (
                    <LockIcon className="h-3.5 w-3.5 text-muted/60" />
                  ) : (
                    <>
                      <span className="hidden text-[10px] uppercase tracking-[0.1em] text-accent sm:inline">
                        {comingSoon ? 'Segera hadir' : 'Tersedia'}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                    </>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
        <span>{collectedCards.length} dari {CODEX_CARDS.length} kartu terkumpul</span>
        <span>Ketuk wilayah untuk mulai</span>
      </div>

      {allComplete ? (
        <div className="panel mt-8 p-5">
          <p className="font-display text-lg font-semibold text-ink">Semua wilayah selesai</p>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
            {totalRegions} kisah telah kamu dengarkan. Semua kartu budaya tersimpan di Album Budaya.
          </p>
          <Button onClick={onOpenCodex} className="mt-4" trailing={<ArrowRightIcon className="h-4 w-4" />}>
            Buka Album
          </Button>
        </div>
      ) : null}

      <Toast message={toast} />
    </div>
  );
}
