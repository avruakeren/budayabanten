import { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { getRegion } from '../data/regions';
import { audio } from '../lib/audio';
import { DialogBox } from '../components/DialogBox';
import { VNStage } from '../components/vn/VNStage';
import { ArrowLeftIcon } from '../components/Icons';

export function RegionDialog() {
  const { activeRegionId, dispatch, isCompleted, starsFor } = useGameState();
  const region = getRegion(activeRegionId);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [activeRegionId]);

  if (!region) {
    return (
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col justify-center px-5 pt-24">
        <p className="font-display text-xl text-ink">Wilayah tidak ditemukan</p>
        <p className="mt-2 text-sm text-muted">Kembali ke peta untuk memilih wilayah.</p>
        <button
          type="button"
          onClick={() => dispatch({ type: 'RETURN_TO_MAP' })}
          className="btn btn-primary mt-5 w-max"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Kembali ke Peta
        </button>
      </div>
    );
  }

  const lines = region.dialog;
  const completed = isCompleted(region.id);

  const finish = () => {
    audio.success();
    dispatch({ type: 'DIALOG_DONE' });
  };

  const next = () => {
    audio.click();
    if (index < lines.length - 1) {
      setIndex((current) => current + 1);
      return;
    }
    finish();
  };

  const skip = () => {
    audio.click();
    finish();
  };

  const back = () => {
    audio.click();
    dispatch({ type: 'RETURN_TO_MAP' });
  };

  return (
    <VNStage
      region={region}
      line={lines[index]}
      completed={completed}
      stars={starsFor(region.id)}
      onBack={back}
    >
      <DialogBox
        variant="vn"
        line={lines[index]}
        index={index}
        total={lines.length}
        onNext={next}
        onSkip={skip}
        skipLabel="Lewati dialog"
      />
    </VNStage>
  );
}
