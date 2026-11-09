import { motion } from 'framer-motion';

export function ProgressBar({ value = 0, className = '', barClassName = '', label }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={className}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          <span>{label}</span>
          <span className="tabular-nums">{clamped}%</span>
        </div>
      ) : null}
      <div
        className="h-[3px] w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
      >
        <motion.div
          className={`h-full rounded-full bg-accent ${barClassName}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
