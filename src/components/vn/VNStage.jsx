import { AnimatePresence, motion } from 'framer-motion';
import { VNBackground } from './VNBackground';
import { VNPortrait, portraitSide } from './VNPortrait';
import { Stars } from '../ui/Stars';
import { ArrowLeftIcon } from '../Icons';

export function VNStage({ region, line, completed = false, stars = 0, onBack, children }) {
  const isNarration = line?.portrait === 'narrator' || line?.speaker === 'Narator';
  const side = portraitSide(line?.speaker, line?.portrait);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-paper">
      <VNBackground region={region} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/80 via-paper/5 to-ink/35" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-5 pb-5 pt-20">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-ink"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Kembali ke peta
            </button>

            <div className="mt-3 flex w-fit max-w-full flex-col rounded-md border border-line/80 bg-paper/85 px-3.5 py-2.5 shadow-soft backdrop-blur">
              <p className="eyebrow">
                Wilayah {String(region.order).padStart(2, '0')} · {region.era}
              </p>
              <h1 className="mt-1 font-display text-base font-semibold leading-snug text-ink sm:text-lg">
                {region.title}
              </h1>
              <p className="mt-0.5 text-[11px] italic text-muted">{region.tagline}</p>
            </div>
          </div>

          {completed ? (
            <div className="shrink-0 rounded-md border border-line/80 bg-paper/85 px-2.5 py-2 shadow-soft backdrop-blur">
              <Stars value={stars} size="h-3.5 w-3.5" />
            </div>
          ) : null}
        </header>

        <div className="relative min-h-[220px] flex-1 sm:min-h-[280px]">
          <AnimatePresence>
            {!isNarration ? (
              <motion.div
                key={`${line?.speaker}-${side}`}
                initial={{ opacity: 0, y: 14, x: side === 'left' ? -18 : 18 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`absolute bottom-0 ${
                  side === 'left' ? 'left-0 sm:left-4' : 'right-0 sm:right-4'
                }`}
              >
                <VNPortrait
                  speaker={line?.speaker}
                  portrait={line?.portrait}
                  emotion={line?.emotion ?? 'happy'}
                  className="h-[min(34vh,300px)] w-auto max-w-[62vw] sm:h-[min(48vh,430px)] sm:max-w-none"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="relative z-20 mt-2 rounded-xl border border-line/80 bg-paper/95 p-5 shadow-[0_20px_60px_-34px_rgba(27,25,22,0.55)] backdrop-blur sm:p-6">
          <span className="absolute inset-x-6 top-0 h-px bg-accent/40" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}
