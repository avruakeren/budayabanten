import { useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { getRegion } from '../data/regions';
import { getCard } from '../data/codexCards';
import { audio } from '../lib/audio';
import { SerangQuiz } from './minigames/SerangQuiz';
import { BaduySort } from './minigames/BaduySort';
import { PandeglangMemory } from './minigames/PandeglangMemory';
import { CilegonSimon } from './minigames/CilegonSimon';
import { ComingSoon } from './minigames/ComingSoon';

const GAMES = {
  quiz: SerangQuiz,
  sort: BaduySort,
  memory: PandeglangMemory,
  rhythm: CilegonSimon,
  'coming-soon': ComingSoon,
};

export function MinigameScreen() {
  const { activeRegionId, dispatch } = useGameState();
  const region = getRegion(activeRegionId);
  const card = region ? getCard(region.cardId) : null;

  useEffect(() => {
    if (!region) dispatch({ type: 'RETURN_TO_MAP' });
  }, [region, dispatch]);

  if (!region || !card) return null;

  const Game = GAMES[region.minigame];
  if (!Game) return null;

  const exit = () => {
    audio.click();
    dispatch({ type: 'RETURN_TO_MAP' });
  };

  const complete = (stars) => {
    dispatch({
      type: 'COMPLETE_REGION',
      regionId: region.id,
      cardId: region.cardId,
      stars,
    });
  };

  return <Game region={region} card={card} onExit={exit} onComplete={complete} />;
}
