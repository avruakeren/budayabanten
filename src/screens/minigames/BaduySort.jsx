import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BADUY_CARDS } from '../../data/minigames';
import { audio } from '../../lib/audio';
import { GameFrame } from '../../components/GameFrame';
import { GameResult } from '../../components/GameResult';
import { CheckIcon, CloseIcon } from '../../components/Icons';

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function BaduySort({ region, card, onExit, onComplete }) {
  const deck = useMemo(() => shuffle(BADUY_CARDS), []);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(null);
  const current = deck[index];
  const total = deck.length;

  const choose = (allowed) => {
    if (chosen !== null) return;
    setChosen(allowed);
    const isCorrect = allowed === current.allowed;
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
      audio.success();
    } else {
      audio.error();
    }
  };

  const finish = (score) => {
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1;
    setResult({ stars, score });
    onComplete?.(stars);
    audio.success();
  };

  const next = () => {
    audio.click();
    if (index < total - 1) {
      setIndex((count) => count + 1);
      setChosen(null);
      return;
    }
    finish(correctCount);
  };

  if (result) {
    return (
      <GameResult
        region={region}
        card={card}
        stars={result.stars}
        scoreLabel={`${result.score} dari ${total} aturan adat dipahami dengan tepat.`}
        onFinish={onExit}
      />
    );
  }

  const isCorrect = chosen !== null && chosen === current.allowed;

  return (
    <GameFrame
      region={region}
      title="Pikukuh Kanekes"
      subtitle="Tentukan apakah setiap pernyataan sesuai dengan adat Baduy."
      progress={(index + (chosen !== null ? 1 : 0)) / total}
      progressLabel={`${index + 1} / ${total}`}
      onExit={onExit}
    >
      <div className="flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="uppercase tracking-[0.12em]">Aturan & adat</span>
        <span>
          Tepat: <span className="font-medium tabular-nums text-ink">{correctCount}</span>
        </span>
      </div>

      <div className="mt-3 flex gap-1">
        {deck.map((item, dotIndex) => (
          <span
            key={item.id}
            className={`h-px flex-1 ${dotIndex <= index ? 'bg-accent' : 'bg-line'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="mt-5"
        >
          <p className="rounded-md bg-paper p-5 text-center text-pretty font-display text-lg leading-relaxed text-ink sm:text-xl">
            {current.text}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => choose(true)}
              disabled={chosen !== null}
              className={`flex items-center justify-center gap-2 rounded-md border px-4 py-3.5 text-sm font-semibold transition-colors ${
                chosen === null
                  ? 'border-olive/40 bg-olive/5 text-olive hover:bg-olive/10'
                  : current.allowed
                    ? 'border-olive/60 bg-olive/15 text-ink'
                    : 'border-line bg-surface text-muted/50'
              }`}
            >
              <CheckIcon className="h-4 w-4" />
              Boleh
            </button>
            <button
              type="button"
              onClick={() => choose(false)}
              disabled={chosen !== null}
              className={`flex items-center justify-center gap-2 rounded-md border px-4 py-3.5 text-sm font-semibold transition-colors ${
                chosen === null
                  ? 'border-accent/30 bg-accent/5 text-accent hover:bg-accent/10'
                  : !current.allowed
                    ? 'border-accent/60 bg-accent-soft text-ink'
                    : 'border-line bg-surface text-muted/50'
              }`}
            >
              <CloseIcon className="h-4 w-4" />
              Tidak boleh
            </button>
          </div>

          <AnimatePresence>
            {chosen !== null ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-5 border-t border-line pt-4"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                  {isCorrect ? 'Tepat' : 'Belum tepat'}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{current.explanation}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={next}
                    className="btn btn-primary px-4 py-2.5 text-xs"
                  >
                    {index < total - 1 ? 'Kartu berikutnya' : 'Selesaikan'}
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </GameFrame>
  );
}
