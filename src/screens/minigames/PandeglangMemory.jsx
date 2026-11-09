import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PANDEGLANG_PAIRS } from '../../data/minigames';
import { audio } from '../../lib/audio';
import { GameFrame } from '../../components/GameFrame';
import { GameResult } from '../../components/GameResult';
import { CheckIcon } from '../../components/Icons';

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildDeck() {
  return shuffle(
    PANDEGLANG_PAIRS.flatMap((pair) => [
      { uid: `${pair.id}-a`, pairId: pair.id, label: pair.label, symbol: pair.symbol, matched: false },
      { uid: `${pair.id}-b`, pairId: pair.id, label: pair.label, symbol: pair.symbol, matched: false },
    ]),
  );
}

export function PandeglangMemory({ region, card, onExit, onComplete }) {
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [result, setResult] = useState(null);
  const timers = useRef([]);

  const totalPairs = PANDEGLANG_PAIRS.length;
  const matchedPairs = deck.filter((item) => item.matched).length / 2;

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const finish = (finalMoves) => {
    const stars = finalMoves <= 9 ? 3 : finalMoves <= 12 ? 2 : 1;
    setResult({ stars, moves: finalMoves });
    onComplete?.(stars);
    audio.success();
  };

  const handleFlip = (item) => {
    if (locked || result || item.matched || flipped.includes(item.uid)) return;
    if (flipped.length >= 2) return;

    audio.click();

    if (flipped.length === 0) {
      setFlipped([item.uid]);
      return;
    }

    const first = deck.find((entry) => entry.uid === flipped[0]);
    if (!first || first.uid === item.uid) return;

    const nextMoves = moves + 1;
    setFlipped([first.uid, item.uid]);
    setMoves(nextMoves);
    setLocked(true);

    if (first.pairId === item.pairId) {
      const updated = deck.map((entry) =>
        entry.pairId === item.pairId ? { ...entry, matched: true } : entry,
      );
      setDeck(updated);
      audio.collect();
      timers.current.push(
        window.setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 460),
      );

      const totalMatched = updated.filter((entry) => entry.matched).length;
      if (totalMatched === updated.length) {
        timers.current.push(window.setTimeout(() => finish(nextMoves), 900));
      }
    } else {
      audio.error();
      timers.current.push(
        window.setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 850),
      );
    }
  };

  if (result) {
    return (
      <GameResult
        region={region}
        card={card}
        stars={result.stars}
        scoreLabel={`${totalPairs} pasangan ditemukan dalam ${result.moves} langkah.`}
        onFinish={onExit}
      />
    );
  }

  return (
    <GameFrame
      region={region}
      title="Rimba Ujung Kulon"
      subtitle="Temukan pasangan flora, fauna, dan budaya Pandeglang. Semakin sedikit langkah, semakin tinggi bintangmu."
      progress={matchedPairs / totalPairs}
      progressLabel={`${matchedPairs} / ${totalPairs} pasang`}
      onExit={onExit}
    >
      <div className="flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="uppercase tracking-[0.12em]">Memori rimba</span>
        <span>
          Langkah: <span className="font-medium tabular-nums text-ink">{moves}</span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {deck.map((item) => {
          const isFlipped = flipped.includes(item.uid) || item.matched;
          return (
            <button
              key={item.uid}
              type="button"
              onClick={() => handleFlip(item)}
              disabled={locked || item.matched || isFlipped}
              className="relative aspect-[3/4] w-full rounded-md [perspective:900px]"
              aria-label={isFlipped ? item.label : 'Kartu tertutup'}
            >
              <motion.div
                className="relative h-full w-full [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 flex items-center justify-center rounded-md border border-line bg-paper [backface-visibility:hidden]">
                  <span className="text-lg font-light text-muted/40">?</span>
                </div>

                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-md border bg-surface p-1.5 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                    item.matched ? 'border-olive/50' : 'border-ink/20'
                  }`}
                >
                  <span className="text-xl leading-none sm:text-2xl">{item.symbol}</span>
                  <span className="text-center text-[9px] font-medium leading-tight text-muted sm:text-[10px]">
                    {item.label}
                  </span>
                  {item.matched ? (
                    <span className="absolute right-1 top-1 text-olive">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                  ) : null}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] text-muted">Klik dua kartu untuk mencari pasangan.</p>
    </GameFrame>
  );
}
