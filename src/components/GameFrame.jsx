import { motion } from 'framer-motion';
import { ProgressBar } from './ui/ProgressBar';
import { ArrowLeftIcon } from './Icons';

export function GameFrame({ region, title, subtitle, progress = 0, progressLabel, onExit, children }) {
  return (
    <div className="min-h-[100dvh] pb-12 pt-24">
      <div className="mx-auto w-full max-w-2xl px-5">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Kembali ke peta
        </button>

        <header className="mt-5">
          <p className="eyebrow">Mini-game · {region.label}</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h1>
            {progressLabel ? (
              <span className="text-[11px] font-medium tabular-nums text-muted">{progressLabel}</span>
            ) : null}
          </div>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{subtitle}</p>
          <ProgressBar value={progress * 100} className="mt-5" />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="panel mt-6 p-5 sm:p-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
