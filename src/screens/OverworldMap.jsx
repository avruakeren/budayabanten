import { useEffect, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { REGIONS } from '../data/regions';
import { CODEX_CARDS } from '../data/codexCards';
import { audio } from '../lib/audio';
import { BantenMap } from '../components/BantenMap';
import { Stars } from '../components/ui/Stars';
import { Toast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon, CheckIcon, CompassIcon, LockIcon } from '../components/Icons';

function statusOf(region, completedRegions, unlockedRegions) {
  if (completedRegions.includes(region.id)) return 'completed';
  if (unlockedRegions.includes(region.id)) return 'available';
  return 'locked';
}

function statusLabel(status, region) {
  if (status === 'completed') return { text: 'Selesai', className: 'text-olive' };
  if (status === 'locked') return { text: 'Terkunci', className: 'text-muted' };
  return {
    text: region.minigame === 'coming-soon' ? 'Segera hadir' : 'Tersedia',
    className: 'text-accent',
  };
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
  const [hoveredId, setHoveredId] = useState(null);
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
  const activeRegion = REGIONS.find((region) => region.id === hoveredId) ?? nextRegion ?? REGIONS[0];
  const activeStatus = statusOf(activeRegion, completedRegions, unlockedRegions);
  const activeMeta = statusLabel(activeStatus, activeRegion);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-24">
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

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
        Pilih pin wilayah untuk memulai. Beberapa mini-game masih disiapkan, tetapi kartu budayanya
        tetap bisa dikumpulkan.
      </p>

      <section className="panel mt-6 overflow-hidden p-3 sm:p-4">
        <div className="relative aspect-[10/8] w-full overflow-hidden rounded-lg border border-line bg-[#EFEBE1] sm:aspect-[10/7]">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(27,25,22,0.09) 1px, transparent 0)',
              backgroundSize: '18px 18px',
            }}
            aria-hidden="true"
          />
          <BantenMap completedRegions={completedRegions} />

          {REGIONS.map((region) => {
            const status = statusOf(region, completedRegions, unlockedRegions);
            const locked = status === 'locked';
            const completed = status === 'completed';
            const isNext = region.id === nextRegionId && !completed;
            const meta = statusLabel(status, region);

            const pinClass = completed
              ? 'border-olive/50 bg-olive text-paper'
              : locked
                ? 'border-line bg-paper/90 text-muted/50'
                : isNext
                  ? 'border-accent bg-accent text-paper'
                  : 'border-accent/50 bg-paper text-accent';

            return (
              <button
                key={region.id}
                type="button"
                onClick={() => handleRegion(region)}
                onMouseEnter={() => setHoveredId(region.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(region.id)}
                onBlur={() => setHoveredId(null)}
                style={{ left: `${region.position.x}%`, top: `${region.position.y}%` }}
                className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none ${
                  locked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                aria-label={`${region.title} — ${meta.text}${region.minigame === 'coming-soon' ? ', mini-game segera hadir' : ''}`}
              >
                {isNext ? (
                  <span className="absolute -inset-1 animate-pulse rounded-full border border-accent/40" aria-hidden="true" />
                ) : null}
                <span
                  className={`relative grid h-9 w-9 place-items-center rounded-full border text-[11px] font-semibold tabular-nums shadow-soft transition-transform duration-150 group-hover:scale-110 group-focus-visible:scale-110 ${pinClass}`}
                >
                  {String(region.order).padStart(2, '0')}
                  {completed ? (
                    <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border border-line bg-paper text-olive">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                  ) : locked ? (
                    <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border border-line bg-paper text-muted">
                      <LockIcon className="h-2.5 w-2.5" />
                    </span>
                  ) : null}
                </span>
                <span className="sr-only">{region.label}</span>
              </button>
            );
          })}

          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-paper/85 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-muted backdrop-blur">
            <CompassIcon className="h-3 w-3" />
            Peta Banten
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 rounded-md border border-line bg-paper px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold text-ink">{activeRegion.title}</p>
            <p className="truncate text-[11px] text-muted">{activeRegion.tagline}</p>
          </div>
          <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] ${activeMeta.className}`}>
            {activeMeta.text}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" /> Tersedia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-olive" /> Selesai
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-line" /> Terkunci
            </span>
          </div>
          <span>Ketuk pin bernomor untuk mulai</span>
        </div>
      </section>

      <details className="group mt-5">
        <summary className="flex cursor-pointer list-none items-center justify-between border-t border-line pt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink">
          <span>Daftar wilayah</span>
          <span className="text-[10px] font-normal normal-case tracking-normal text-muted">
            {totalRegions} wilayah
          </span>
        </summary>

        <ul className="mt-2 grid gap-x-8 sm:grid-cols-2">
          {REGIONS.map((region) => {
            const status = statusOf(region, completedRegions, unlockedRegions);
            const locked = status === 'locked';
            const completed = status === 'completed';
            const meta = statusLabel(status, region);

            return (
              <li key={region.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => handleRegion(region)}
                  className={`group flex w-full items-center gap-3 py-3 text-left transition-colors ${
                    locked ? 'cursor-not-allowed opacity-55' : 'hover:text-accent'
                  }`}
                  aria-label={`${region.title} — ${meta.text}`}
                >
                  <span className="w-5 shrink-0 text-[11px] tabular-nums text-muted">
                    {String(region.order).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-semibold leading-snug text-ink">
                      {region.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted">{region.tagline}</span>
                  </span>
                  {completed ? (
                    <Stars value={starsFor(region.id)} size="h-3 w-3" />
                  ) : locked ? (
                    <LockIcon className="h-3.5 w-3.5 shrink-0 text-muted/60" />
                  ) : (
                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent">
                      {meta.text}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </details>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
        <span>{collectedCards.length} dari {CODEX_CARDS.length} kartu terkumpul</span>
        <span>{allComplete ? 'Semua wilayah telah dikunjungi' : 'Perjalananmu tersimpan otomatis'}</span>
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
