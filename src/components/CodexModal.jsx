import { useEffect, useState } from 'react';
import { CODEX_CARDS } from '../data/codexCards';
import { audio } from '../lib/audio';
import { useGameState } from '../hooks/useGameState';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { CodexCard } from './CodexCard';
import { ArrowLeftIcon, CheckIcon } from './Icons';

export function CodexModal({ open, onClose, onReset }) {
  const { collectedCards } = useGameState();
  const [selectedId, setSelectedId] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const selected = CODEX_CARDS.find((card) => card.id === selectedId) ?? null;

  useEffect(() => {
    if (!open) {
      setSelectedId(null);
      setConfirmReset(false);
    }
  }, [open]);

  const count = collectedCards.length;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="codex-title"
      panelClassName="max-h-[90dvh] max-w-2xl overflow-y-auto"
    >
      <header className="border-b border-line px-5 pb-4 pr-14 pt-5 sm:pl-7 sm:pr-16">
        <div className="flex items-center justify-between gap-3">
          <h2 id="codex-title" className="font-display text-xl font-semibold text-ink">
            Album Budaya
          </h2>
          <span className="text-xs font-medium tabular-nums text-muted">{count} / {CODEX_CARDS.length}</span>
        </div>
      </header>

      <div className="px-5 py-5 sm:px-7">
        {selected ? (
          <div>
            <button
              type="button"
              onClick={() => {
                audio.click();
                setSelectedId(null);
              }}
              className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Kembali ke album
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span className="label-chip">{selected.category}</span>
              <span className="label-chip">{selected.regionLabel}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {selected.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{selected.lore}</p>

            <div className="mt-6 border-t border-line pt-4">
              <p className="eyebrow">Fakta budaya</p>
              <ul className="mt-3 space-y-2.5">
                {selected.facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/80">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : count === 0 ? (
          <div className="py-14 text-center">
            <p className="font-display text-lg text-ink">Album masih kosong</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Selesaikan mini-game pertama di Serang untuk membuka kartu budaya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {CODEX_CARDS.map((card) => (
              <CodexCard
                key={card.id}
                card={card}
                unlocked={collectedCards.includes(card.id)}
                onClick={() => {
                  audio.collect();
                  setSelectedId(card.id);
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted">Progres tersimpan otomatis</p>
          {onReset ? (
            confirmReset ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted">Hapus progres?</span>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-md border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted hover:text-ink"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    setConfirmReset(false);
                  }}
                  className="rounded-md bg-accent px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-accent-dark"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="bare"
                onClick={() => setConfirmReset(true)}
                className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted hover:text-accent"
              >
                Mulai ulang
              </Button>
            )
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
