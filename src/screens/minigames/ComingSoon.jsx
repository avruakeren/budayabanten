import { useState } from 'react';
import { GameFrame } from '../../components/GameFrame';
import { GameResult } from '../../components/GameResult';
import { Button } from '../../components/ui/Button';
import { ArrowRightIcon } from '../../components/Icons';
import { audio } from '../../lib/audio';

export function ComingSoon({ region, card, onExit, onComplete }) {
  const [done, setDone] = useState(false);

  const markVisit = () => {
    if (done) return;
    audio.collect();
    onComplete?.(1);
    setDone(true);
  };

  if (done) {
    return (
      <GameResult
        region={region}
        card={card}
        stars={1}
        ratingLabel="Kunjungan tercatat"
        scoreLabel="Mini-game wilayah ini sedang disiapkan. Kartu budayanya sudah masuk Album."
        onFinish={onExit}
      />
    );
  }

  return (
    <GameFrame
      region={region}
      title="Segera hadir"
      subtitle={`Mini-game ${region.title} masih disiapkan.`}
      progress={0}
      progressLabel="Dalam pengerjaan"
      onExit={onExit}
    >
      <div className="flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="uppercase tracking-[0.12em]">Mini-game</span>
        <span>Menyusul</span>
      </div>

      <p className="mt-4 font-display text-xl leading-relaxed text-ink sm:text-2xl">
        Kisahnya sudah menunggu, tinggal permainannya yang belum selesai.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Kamu tetap bisa menutup kunjungan ini. Kartu <span className="font-medium text-ink">{card.name}</span>{' '}
        akan tersimpan di Album Budaya, dan wilayah berikutnya terbuka di peta.
      </p>

      <div className="mt-5 rounded-md bg-paper p-4">
        <p className="eyebrow">Kartu budaya</p>
        <p className="mt-2 font-display text-lg font-semibold text-ink">{card.name}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{card.short}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[11px] leading-relaxed text-muted">
          Mini-game akan terbuka otomatis saat rilis.
        </p>
        <Button onClick={markVisit} trailing={<ArrowRightIcon className="h-4 w-4" />}>
          Tandai kunjungan
        </Button>
      </div>
    </GameFrame>
  );
}
