import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SERANG_HOTSPOTS } from '../../data/minigames';
import { audio } from '../../lib/audio';
import { GameFrame } from '../../components/GameFrame';
import { GameResult } from '../../components/GameResult';
import { CheckIcon, PinIcon } from '../../components/Icons';

const TOTAL = SERANG_HOTSPOTS.length;

function starsFor(found) {
  if (found >= TOTAL) return 3;
  if (found >= TOTAL - 1) return 2;
  return 1;
}

export function SerangExplore({ region, card, onExit, onComplete }) {
  const [found, setFound] = useState([]);
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);

  const handleHotspot = (hotspot) => {
    if (found.includes(hotspot.id)) return;
    audio.click();
    setFound((current) => [...current, hotspot.id]);
    setActive(hotspot.id);
  };

  const closeFact = () => {
    audio.click();
    setActive(null);
  };

  const finish = () => {
    const stars = starsFor(found.length);
    setResult({ stars, score: found.length });
    onComplete?.(stars);
    audio.success();
  };

  if (result) {
    return (
      <GameResult
        region={region}
        card={card}
        stars={result.stars}
        scoreLabel={`${result.score} dari ${TOTAL} titik sejarah Banten Lama ditemukan.`}
        onFinish={onExit}
      />
    );
  }

  const activeHotspot = SERANG_HOTSPOTS.find((h) => h.id === active) ?? null;

  return (
    <GameFrame
      region={region}
      title="Jejak Banten Lama"
      subtitle="Ketuk titik-titik di ilustrasi untuk membuka kisahnya."
      progress={found.length / TOTAL}
      progressLabel={`${found.length} / ${TOTAL} ditemukan`}
      onExit={onExit}
    >
      <div className="flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="uppercase tracking-[0.12em]">Eksplorasi hotspot</span>
        <span>
          Ditemukan: <span className="font-medium tabular-nums text-ink">{found.length}</span> / {TOTAL}
        </span>
      </div>

      {/* Canvas ilustrasi Banten Lama */}
      <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-paper">
        <svg
          viewBox="0 0 100 56.25"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F3EFE3" />
              <stop offset="1" stopColor="#E8E2D0" />
            </linearGradient>
          </defs>
          <rect width="100" height="56.25" fill="url(#sky)" />

          {/* Tanah / pelataran */}
          <path d="M0 40 C20 36 40 38 60 40 C80 42 90 39 100 40 L100 56.25 L0 56.25 Z" fill="#D9D1BD" stroke="#B9B2A4" strokeWidth="0.3" />
          <path d="M0 46 C25 44 50 46 75 44 C90 43 98 45 100 46 L100 56.25 L0 56.25 Z" fill="#CEC5AE" />

          {/* Menara Masjid Agung (hotspot 1) */}
          <g stroke="#2B2620" strokeWidth="0.6" fill="#F7F5F0" opacity="0.95">
            <rect x="49" y="12" width="6" height="28" />
            <path d="M49 12 L52 6 L55 12 Z" fill="#B4552D" />
            <circle cx="52" cy="5" r="1.2" fill="#C9A227" />
            <line x1="50.5" y1="18" x2="53.5" y2="18" />
            <line x1="50.5" y1="24" x2="53.5" y2="24" />
            <line x1="50.5" y1="30" x2="53.5" y2="30" />
          </g>

          {/* Masjid Agung (hotspot 2) */}
          <g stroke="#2B2620" strokeWidth="0.6" fill="#F7F5F0" opacity="0.95">
            <rect x="38" y="26" width="20" height="14" />
            <path d="M38 26 L48 18 L58 26 Z" fill="#E8E3D8" />
            <rect x="44" y="30" width="4" height="6" fill="#B4552D" />
            <path d="M40 40 L40 36 M43 40 L43 36 M46 40 L46 36 M49 40 L49 36 M52 40 L52 36 M55 40 L55 36" />
          </g>

          {/* Keraton Surosowan (hotspot 3) */}
          <g stroke="#2B2620" strokeWidth="0.6" fill="#EDE7DA" opacity="0.9">
            <rect x="18" y="34" width="18" height="10" />
            <path d="M18 34 L27 28 L36 34 Z" fill="#C9A227" opacity="0.7" />
            <rect x="22" y="38" width="3" height="6" />
            <rect x="29" y="38" width="3" height="6" />
            <path d="M18 44 L18 48 M22 44 L22 48 M27 44 L27 48 M32 44 L32 48 M36 44 L36 48" />
          </g>

          {/* Meriam Ki Amuk (hotspot 4) */}
          <g stroke="#2B2620" strokeWidth="0.6" fill="#D8D0C0" opacity="0.9">
            <ellipse cx="34" cy="44" rx="6" ry="2.2" />
            <rect x="28" y="42" width="10" height="4" rx="1" />
            <circle cx="27" cy="44" r="1.4" fill="#2B2620" />
            <line x1="38" y1="44" x2="42" y2="44" />
            <circle cx="43" cy="44" r="1.2" fill="#2B2620" />
          </g>

          {/* Vihara Avalokitesvara (hotspot 5) */}
          <g stroke="#2B2620" strokeWidth="0.6" fill="#E8E3D8" opacity="0.9">
            <rect x="68" y="30" width="16" height="14" />
            <path d="M68 30 L76 22 L84 30 Z" fill="#B4552D" opacity="0.7" />
            <path d="M72 30 L72 26 L76 23 L80 26 L80 30" fill="#F7F5F0" />
            <rect x="73" y="36" width="3" height="8" />
            <rect x="78" y="36" width="3" height="8" />
            <path d="M68 44 L68 48 M72 44 L72 48 M76 44 L76 48 M80 44 L80 48 M84 44 L84 48" />
          </g>

          {/* Pohon / dekorasi */}
          <g stroke="#6E8B6B" strokeWidth="0.5" fill="#C3D1B8" opacity="0.6">
            <circle cx="12" cy="38" r="3" />
            <circle cx="10" cy="36" r="2" />
            <circle cx="14" cy="36" r="2" />
            <circle cx="92" cy="36" r="3" />
            <circle cx="90" cy="34" r="2" />
            <circle cx="94" cy="34" r="2" />
          </g>

          {/* Laut di kejauhan */}
          <path d="M0 50 Q25 48 50 50 T100 50" stroke="#A9C0BE" strokeWidth="0.4" fill="none" opacity="0.5" />
        </svg>

        {/* Hotspots */}
        {SERANG_HOTSPOTS.map((hotspot, index) => {
          const isFound = found.includes(hotspot.id);
          return (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => handleHotspot(hotspot)}
              disabled={isFound}
              aria-label={`${hotspot.label}${isFound ? ' — sudah ditemukan' : ' — ketuk untuk membuka'}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none ${
                isFound ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span
                className={`relative grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold tabular-nums shadow-soft transition-transform duration-150 ${
                  isFound
                    ? 'border-olive/50 bg-olive text-paper'
                    : 'border-accent bg-accent text-paper group-hover:scale-110 group-focus-visible:scale-110'
                }`}
              >
                {isFound ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
              </span>
              {!isFound ? (
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink/80 px-1.5 py-0.5 text-[9px] font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {hotspot.label}
                </span>
              ) : null}
              {!isFound ? (
                <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/30" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Panel fakta */}
      <AnimatePresence>
        {activeHotspot ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-md border border-olive/30 bg-olive/5 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow text-olive">Ditemukan</p>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{activeHotspot.label}</h3>
              </div>
              <button
                type="button"
                onClick={closeFact}
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
              >
                Tutup
              </button>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/85">{activeHotspot.fact}</p>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-[12px] italic text-muted"
          >
            Ketuk titik bernomor di ilustrasi untuk membuka kisahnya.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={finish}
          disabled={found.length < 3}
          className="btn btn-primary px-4 py-2.5 text-xs disabled:opacity-40"
        >
          {found.length >= TOTAL ? 'Selesaikan eksplorasi' : 'Selesai (minimal 3 titik)'}
        </button>
      </div>
    </GameFrame>
  );
}
