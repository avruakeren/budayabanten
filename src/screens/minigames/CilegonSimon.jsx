import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CILEGON_PADS } from '../../data/minigames';
import { audio } from '../../lib/audio';
import { GameFrame } from '../../components/GameFrame';
import { GameResult } from '../../components/GameResult';

const TOTAL_ROUNDS = 5;

function randomPad() {
  return Math.floor(Math.random() * CILEGON_PADS.length);
}

function PadGlyph({ id, className = 'h-6 w-6' }) {
  if (id === 'gong') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="9" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (id === 'rebana') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="12" strokeDasharray="2 4" />
        <circle cx="24" cy="16" r="1.6" fill="currentColor" />
        <circle cx="32" cy="24" r="1.6" fill="currentColor" />
        <circle cx="24" cy="32" r="1.6" fill="currentColor" />
        <circle cx="16" cy="24" r="1.6" fill="currentColor" />
      </svg>
    );
  }
  if (id === 'angklung') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M16 40V10M24 40V6M32 40V12" />
        <path d="M12 40h8M20 40h8M28 40h8M12 10h8M20 6h8M28 12h8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 16h20l-2 22H16Z" />
      <ellipse cx="24" cy="16" rx="10" ry="4" />
      <ellipse cx="24" cy="38" rx="8" ry="3" />
    </svg>
  );
}

export function CilegonSimon({ region, card, onExit, onComplete }) {
  const [phase, setPhase] = useState('intro');
  const [sequence, setSequence] = useState([]);
  const [activePad, setActivePad] = useState(null);
  const [inputIndex, setInputIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [mistakes, setMistakes] = useState(0);
  const [result, setResult] = useState(null);
  const showTimers = useRef([]);
  const replayTimer = useRef(null);
  const flashTimer = useRef(null);
  const completedRef = useRef(false);

  useEffect(
    () => () => {
      showTimers.current.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(replayTimer.current);
      window.clearTimeout(flashTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (phase !== 'show' || sequence.length === 0) return undefined;

    const timers = [];
    sequence.forEach((padIndex, order) => {
      const start = 520 + order * 620;
      timers.push(
        window.setTimeout(() => {
          setActivePad(padIndex);
          audio.note(CILEGON_PADS[padIndex].frequency);
        }, start),
      );
      timers.push(window.setTimeout(() => setActivePad(null), start + 400));
    });
    timers.push(
      window.setTimeout(() => {
        setPhase('input');
        setInputIndex(0);
      }, 520 + sequence.length * 620 + 220),
    );

    showTimers.current = timers;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [phase, sequence]);

  const finish = (stars, label) => {
    if (completedRef.current) return;
    completedRef.current = true;
    setResult({ stars, label });
    onComplete?.(stars);
    audio.success();
  };

  const begin = () => {
    audio.click();
    setSequence([randomPad(), randomPad()]);
    setRound(1);
    setLives(3);
    setMistakes(0);
    setInputIndex(0);
    setPhase('show');
  };

  const pressPad = (padIndex) => {
    if (phase !== 'input' || result) return;

    const pad = CILEGON_PADS[padIndex];
    audio.note(pad.frequency);
    setActivePad(padIndex);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setActivePad(null), 230);

    const expected = sequence[inputIndex];

    if (padIndex !== expected) {
      audio.error();
      const nextLives = lives - 1;
      setLives(nextLives);
      setMistakes((count) => count + 1);

      if (nextLives <= 0) {
        setPhase('wait');
        replayTimer.current = window.setTimeout(() => {
          finish(1, `Bertahan sampai ronde ${round} dari ${TOTAL_ROUNDS}. Coba lagi untuk hasil lebih baik.`);
        }, 700);
        return;
      }

      setPhase('wait');
      replayTimer.current = window.setTimeout(() => setPhase('show'), 1000);
      return;
    }

    if (inputIndex + 1 === sequence.length) {
      if (round === TOTAL_ROUNDS) {
        const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
        finish(stars, `Lima ronde selesai dengan ${mistakes} kesalahan.`);
        return;
      }

      setPhase('wait');
      setRound((current) => current + 1);
      setSequence((current) => [...current, randomPad()]);
      setInputIndex(0);
      replayTimer.current = window.setTimeout(() => setPhase('show'), 750);
      return;
    }

    setInputIndex((current) => current + 1);
  };

  if (result) {
    return (
      <GameResult
        region={region}
        card={card}
        stars={result.stars}
        scoreLabel={result.label}
        onFinish={onExit}
      />
    );
  }

  const statusText =
    phase === 'intro'
      ? 'Tekan mulai, lalu ulangi irama yang diperdengarkan.'
      : phase === 'show'
        ? 'Dengarkan dan perhatikan urutan nadanya.'
        : phase === 'input'
          ? 'Giliranmu. Ulangi urutan nada dengan tepat.'
          : 'Bersiap untuk irama berikutnya.';

  return (
    <GameFrame
      region={region}
      title="Rentak Pesisir"
      subtitle="Ikuti urutan nada gendang, gong, rebana, dan angklung yang makin panjang."
      progress={(round - 1) / TOTAL_ROUNDS}
      progressLabel={`Ronde ${round} / ${TOTAL_ROUNDS}`}
      onExit={onExit}
    >
      <div className="flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="uppercase tracking-[0.12em]">Simon nada · {sequence.length || 2} nada</span>
        <span className="flex items-center gap-1.5">
          Nyawa
          <span className="flex gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${index < lives ? 'bg-accent' : 'bg-line'}`}
              />
            ))}
          </span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {CILEGON_PADS.map((pad, index) => {
          const isActive = activePad === index;
          const canPress = phase === 'input';
          return (
            <motion.button
              key={pad.id}
              type="button"
              onClick={() => pressPad(index)}
              disabled={!canPress}
              animate={{ scale: isActive ? 1.02 : 1 }}
              whileTap={canPress ? { scale: 0.99 } : undefined}
              transition={{ duration: 0.12 }}
              className={`relative flex aspect-[5/3] flex-col items-center justify-center gap-1.5 rounded-md border transition-colors sm:aspect-[2/1] ${
                isActive
                  ? 'border-ink bg-paper'
                  : 'border-line bg-surface'
              } ${canPress ? 'cursor-pointer hover:border-ink/30' : 'cursor-default'}`}
              aria-label={`Nada ${pad.label}`}
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-md"
                style={{ backgroundColor: pad.color }}
              />
              <PadGlyph
                id={pad.id}
                className={`relative h-6 w-6 sm:h-7 sm:w-7 ${isActive ? 'text-ink' : 'text-muted'}`}
              />
              <span className={`relative text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-xs ${isActive ? 'text-ink' : 'text-muted'}`}>
                {pad.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 rounded-md bg-paper p-3.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs leading-relaxed text-muted">{statusText}</p>
          {phase === 'intro' ? (
            <button
              type="button"
              onClick={begin}
              className="btn btn-primary shrink-0 px-4 py-2.5 text-xs"
            >
              Mulai irama
            </button>
          ) : null}
        </div>

        {phase === 'input' ? (
          <div className="mt-3 flex items-center gap-1">
            {sequence.map((_, index) => (
              <span
                key={index}
                className={`h-px flex-1 ${index < inputIndex ? 'bg-accent' : 'bg-line'}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </GameFrame>
  );
}
