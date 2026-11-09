import { LockIcon } from './Icons';

export function CodexCard({ card, unlocked = false, onClick, index = 0 }) {
  return (
    <button
      type="button"
      onClick={unlocked ? onClick : undefined}
      className={`group relative flex min-h-[150px] w-full flex-col rounded-lg border p-4 text-left transition-colors ${
        unlocked
          ? 'border-line bg-surface hover:border-ink/40'
          : 'border-line bg-paper'
      }`}
      aria-label={unlocked ? `Buka kartu ${card.name}` : `Kartu ${card.number} masih terkunci`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[11px] font-medium tabular-nums ${unlocked ? 'text-accent' : 'text-muted'}`}>
          {card.number}
        </span>
        {unlocked ? (
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted">{card.category}</span>
        ) : (
          <LockIcon className="h-3.5 w-3.5 text-muted/60" />
        )}
      </div>

      {unlocked ? (
        <>
          <p className="mt-3 font-display text-base font-semibold leading-tight text-ink">{card.name}</p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted">{card.short}</p>
        </>
      ) : (
        <>
          <p className="mt-3 font-display text-base font-semibold leading-tight text-muted">Terkunci</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted/70">
            Selesaikan {card.regionLabel.split(' · ')[0]}
          </p>
        </>
      )}
    </button>
  );
}
