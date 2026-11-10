import { REGIONS } from '../data/regions';
import { Stars } from './ui/Stars';
import { Button } from './ui/Button';
import { ArrowRightIcon } from './Icons';

export function GameResult({ region, card, stars = 3, scoreLabel = '', ratingLabel = '', onFinish }) {
  const isFinalRegion = region.order === REGIONS.length;
  const rating = ratingLabel || (stars === 3 ? 'Sempurna' : stars === 2 ? 'Baik' : 'Terus belajar');

  return (
    <div className="flex min-h-[100dvh] flex-col justify-center pb-12 pt-24">
      <div className="mx-auto w-full max-w-xl px-5">
        <p className="eyebrow">Wilayah selesai</p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {region.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{scoreLabel}</p>

        <div className="mt-5 flex items-center gap-3">
          <Stars value={stars} size="h-5 w-5" />
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{rating}</span>
        </div>

        <div className="panel mt-8 p-5">
          <p className="eyebrow">Kartu baru</p>
          <p className="mt-2 font-display text-lg font-semibold text-ink">{card.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{card.short}</p>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          {isFinalRegion
            ? 'Seluruh wilayah telah selesai. Semua kartu budaya tersimpan di Album Budaya.'
            : 'Wilayah berikutnya telah terbuka di peta. Kartu dapat dibaca lewat Album Budaya.'}
        </p>

        <Button onClick={onFinish} className="mt-6" trailing={<ArrowRightIcon className="h-4 w-4" />}>
          {isFinalRegion ? 'Kembali ke Peta' : 'Lanjut ke Peta'}
        </Button>
      </div>
    </div>
  );
}
