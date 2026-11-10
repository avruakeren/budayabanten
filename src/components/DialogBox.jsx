import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArrowRightIcon } from './Icons';

export function DialogBox({
  line,
  index = 0,
  total = 1,
  onNext,
  onSkip,
  skipLabel = 'Lewati',
  variant = 'default',
  className = '',
}) {
  const reduceMotion = useReducedMotion();
  const { displayed, done, skip } = useTypewriter(line?.text ?? '', {
    speed: 18,
    enabled: !reduceMotion,
  });

  const isLast = index >= total - 1;
  const isNarration = line?.portrait === 'narrator' || line?.speaker === 'Narator';
  const isVn = variant === 'vn';

  const advance = () => {
    if (!done) {
      skip();
      return;
    }
    onNext?.();
  };

  useEffect(() => {
    const handleKey = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('button, a, input, textarea, select')) return;
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
        event.preventDefault();
        advance();
      }
      if (event.key === 'Escape' && onSkip) {
        onSkip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <section onClick={advance} aria-live="polite" className={`cursor-pointer ${className}`}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        {isVn ? (
          isNarration ? (
            <p className="eyebrow">{line?.role}</p>
          ) : (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="rounded-sm bg-accent px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-paper">
                {line?.speaker}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted">{line?.role}</span>
            </div>
          )
        ) : isNarration ? (
          <p className="eyebrow">{line?.role}</p>
        ) : (
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-lg font-semibold leading-none text-ink">
              {line?.speaker}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted">{line?.role}</span>
          </div>
        )}
        <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <p
        className={`mt-6 min-h-[7rem] text-pretty font-display leading-[1.85] sm:min-h-[6rem] ${
          isVn ? 'text-[18px] sm:text-[21px]' : 'text-[17px] sm:text-[19px]'
        } ${isNarration ? 'italic text-muted' : 'text-ink/90'}`}
      >
        {isNarration ? (
          displayed
        ) : (
          <>
            <span aria-hidden="true">“</span>
            {displayed}
            <span aria-hidden="true">{done ? '”' : ''}</span>
          </>
        )}
        {!done ? (
          <span className="ml-1 inline-block h-[1.05em] w-px translate-y-[0.18em] animate-pulse bg-accent align-baseline" />
        ) : null}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        {onSkip ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSkip();
            }}
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
          >
            {skipLabel}
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            advance();
          }}
          className="group inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dark"
        >
          {done ? (isLast ? 'Selesai' : 'Lanjut') : 'Tampilkan'}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
