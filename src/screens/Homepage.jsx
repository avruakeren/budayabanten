import { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useGameState } from '../hooks/useGameState';
import { audio } from '../lib/audio';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon } from '../components/Icons';

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 55, damping: 16, mass: 0.35 };

function Reveal({ children, delay = 0, reduceMotion = false, className = '' }) {
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Homepage() {
  const { hasStarted, dispatch } = useGameState();
  const [confirmNew, setConfirmNew] = useState(false);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const backdropX = useSpring(pointerX, SPRING);
  const backdropY = useSpring(pointerY, SPRING);

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 12);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 10);
  };

  const confirmStartNew = () => {
    setConfirmNew(false);
    dispatch({ type: 'START_NEW' });
  };

  const start = () => {
    audio.startBgm();
    audio.click();
    if (hasStarted) {
      dispatch({ type: 'CONTINUE' });
      return;
    }
    dispatch({ type: 'START_NEW' });
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      {/* Background layer: foto + Ken Burns + parallax + overlay editorial */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ x: backdropX, y: backdropY }}
      >
        <motion.img
          src="assets/backgrounds/pandeglang.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'saturate(0.4) brightness(0.92)' }}
          loading="eager"
          decoding="async"
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={
            reduceMotion
              ? { scale: 1, x: 0, y: 0 }
              : { scale: [1, 1.06, 1], x: [0, -12, 0], y: [0, -8, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 28, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        {/* Overlay: kiri (tempat teks) paper, kanan foto terlihat */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-transparent to-paper/40" />
      </motion.div>

      {/* Konten editorial langsung di atas background, tanpa panel/card */}
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-5 pb-8 pt-12 sm:pt-16">
        <div className="flex flex-1 flex-col justify-center py-14">
          <Reveal delay={0} reduceMotion={reduceMotion}>
            <p className="eyebrow">Delapan Wilayah · Delapan Cerita</p>
          </Reveal>

          <Reveal delay={0.08} reduceMotion={reduceMotion}>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-ink">
              Yuk, Jelajahi
              <br />
              <span className="relative inline-block italic text-accent">
                Budaya Banten!
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1.5 h-[0.08em] origin-left bg-accent/60"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.18} reduceMotion={reduceMotion}>
            <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ada 8 wilayah seru menantimu! Dengarkan ceritanya, mainkan mini-game-nya, dan
              kumpulkan kartu budaya. Ayo mulai petualanganmu!
            </p>
          </Reveal>

          <Reveal delay={0.28} reduceMotion={reduceMotion}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button
                onClick={start}
                className="h-12 px-6 text-[15px]"
                trailing={
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                }
              >
                {hasStarted ? 'Lanjutkan Petualangan' : 'Ayo Mulai!'}
              </Button>

              {hasStarted ? (
                <button
                  type="button"
                  onClick={() => {
                    audio.click();
                    setConfirmNew(true);
                  }}
                  className="text-xs font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                >
                  Ulangi dari awal
                </button>
              ) : null}
            </div>
          </Reveal>

        </div>
      </div>

      <Modal
        open={confirmNew}
        onClose={() => setConfirmNew(false)}
        labelledBy="confirm-new"
        panelClassName="max-w-md"
      >
        <div className="p-6">
          <h2 id="confirm-new" className="font-display text-xl font-semibold text-ink">
            Mulai ulang dari awal?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Semua progresmu (wilayah, bintang, dan kartu) akan hilang. Yakin mau mulai ulang?
          </p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setConfirmNew(false)}>
              Batal
            </Button>
            <Button onClick={confirmStartNew}>Ya, mulai ulang!</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
