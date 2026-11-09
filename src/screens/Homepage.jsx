import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../hooks/useGameState';
import { audio } from '../lib/audio';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { BantenBackdrop } from '../components/BantenBackdrop';
import { ArrowRightIcon } from '../components/Icons';

export function Homepage() {
  const { hasStarted, dispatch } = useGameState();
  const [confirmNew, setConfirmNew] = useState(false);

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
    <div className="relative min-h-[100dvh] overflow-hidden">
      <BantenBackdrop className="absolute right-0 bottom-0 h-[min(46vh,400px)] w-[min(46vh,400px)] translate-x-[10%] text-ink [mask-image:linear-gradient(to_right,transparent_2%,black_46%)] sm:top-1/2 sm:bottom-auto sm:h-[min(74vh,720px)] sm:w-[min(74vh,720px)] sm:-translate-y-1/2 sm:translate-x-[8%]" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-5 pb-8 pt-12 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-1 flex-col justify-center py-14"
        >
          <h1 className="font-display text-[clamp(3.25rem,10.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.02em] text-ink">
            Jelajah Budaya
            <br />
            <span className="italic text-accent">Banten</span>
          </h1>

          <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Empat wilayah, empat cerita. Telusuri Serang, Baduy, Ujung Kulon, dan Cilegon lewat
            dialog singkat serta mini-game.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              onClick={start}
              className="h-12 px-6 text-[15px]"
              trailing={<ArrowRightIcon className="h-4 w-4" />}
            >
              {hasStarted ? 'Lanjutkan' : 'Mulai'}
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
                Mulai dari awal
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>

      <Modal
        open={confirmNew}
        onClose={() => setConfirmNew(false)}
        labelledBy="confirm-new"
        panelClassName="max-w-md"
      >
        <div className="p-6">
          <h2 id="confirm-new" className="font-display text-xl font-semibold text-ink">
            Mulai dari awal?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Progres wilayah, bintang, dan kartu album akan dihapus. Tindakan ini tidak bisa dibatalkan.
          </p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setConfirmNew(false)}>
              Batal
            </Button>
            <Button onClick={confirmStartNew}>Mulai baru</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
