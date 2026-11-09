import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SERANG_QUESTIONS } from '../../data/minigames';
import { audio } from '../../lib/audio';
import { GameFrame } from '../../components/GameFrame';
import { GameResult } from '../../components/GameResult';
import { CheckIcon, CloseIcon } from '../../components/Icons';

export function SerangQuiz({ region, card, onExit, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(null);
  const question = SERANG_QUESTIONS[index];
  const total = SERANG_QUESTIONS.length;

  const handleAnswer = (optionIndex) => {
    if (selected !== null) return;
    const isCorrect = optionIndex === question.answer;
    setSelected(optionIndex);
    if (isCorrect) {
      setCorrectCount((current) => current + 1);
      audio.success();
    } else {
      audio.error();
    }
  };

  const finish = (score) => {
    const stars = score >= 4 ? 3 : score >= 3 ? 2 : 1;
    setResult({ stars, score });
    onComplete?.(stars);
    audio.success();
  };

  const next = () => {
    audio.click();
    if (index < total - 1) {
      setIndex((current) => current + 1);
      setSelected(null);
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
        scoreLabel={`${result.score} dari ${total} jawaban tepat tentang Banten Lama.`}
        onFinish={onExit}
      />
    );
  }

  return (
    <GameFrame
      region={region}
      title="Jejak Banten Lama"
      subtitle="Pilih jawaban yang tepat untuk setiap petunjuk."
      progress={(index + (selected !== null ? 1 : 0)) / total}
      progressLabel={`Soal ${index + 1} / ${total}`}
      onExit={onExit}
    >
      <div className="flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="uppercase tracking-[0.12em]">Kuis visual</span>
        <span>
          Benar: <span className="font-medium tabular-nums text-ink">{correctCount}</span>
        </span>
      </div>

      <p className="mt-4 rounded-md bg-paper p-4 text-[15px] leading-relaxed text-ink">
        {question.clue}
      </p>

      <div className="mt-4 grid gap-2">
        {question.options.map((option, optionIndex) => {
          const revealed = selected !== null;
          const isCorrect = optionIndex === question.answer;
          const isPicked = optionIndex === selected;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleAnswer(optionIndex)}
              disabled={revealed}
              className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                !revealed
                  ? 'border-line bg-surface text-ink hover:border-ink/30 hover:bg-paper'
                  : isCorrect
                    ? 'border-olive/50 bg-olive/10 text-ink'
                    : isPicked
                      ? 'border-accent/50 bg-accent-soft text-ink'
                      : 'border-line bg-surface text-muted/60'
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-[10px] font-medium text-muted">
                {revealed && isCorrect ? (
                  <CheckIcon className="h-3 w-3 text-olive" />
                ) : revealed && isPicked ? (
                  <CloseIcon className="h-3 w-3 text-accent" />
                ) : (
                  String.fromCharCode(65 + optionIndex)
                )}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 border-t border-line pt-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
              {selected === question.answer ? 'Tepat' : 'Belum tepat'}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{question.fact}</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={next}
                className="btn btn-primary px-4 py-2.5 text-xs"
              >
                {index < total - 1 ? 'Soal berikutnya' : 'Selesaikan kuis'}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GameFrame>
  );
}
