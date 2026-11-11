import { motion } from 'framer-motion';
import { ProgressBar } from './ui/ProgressBar';
import { ArrowLeftIcon } from './Icons';

export function GameFrame({ region, title, subtitle, progress = 0, progressLabel, onExit, children }) {
  return (
    <div className="min-h-[100dvh] pb-6 pt-12 sm:pb-12 sm:pt-14">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-5">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Kembali ke peta
        </button>

        <header className="mt-3 sm:mt-5">
          <p className="eyebrow text-[10px]">Mini-game · {region.label}</p>
          <div className="mt-1.5 flex flex-wrap items-end justify-between gap-2 sm:mt-2 sm:gap-3">
            <h1 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl sm:text-4xl">{title}</h1>
            {progressLabel ? (
              <span className="text-[10px] font-medium tabular-nums text-muted sm:text-[11px]">{progressLabel}</span>
            ) : null}
          </div>
          <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{subtitle}</p>
          <ProgressBar value={progress * 100} className="mt-3 sm:mt-5" />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="panel mt-4 p-4 sm:mt-6 sm:p-5 md:p-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
