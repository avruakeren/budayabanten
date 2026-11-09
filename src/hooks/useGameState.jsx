import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { REGION_ORDER } from '../data/regions';
import { CODEX_CARDS } from '../data/codexCards';

const SAVE_KEY = 'jbb:save:v1';
const SAVE_VERSION = 1;
const CARD_IDS = CODEX_CARDS.map((card) => card.id);

export const BASE_STATE = {
  screen: 'HOMEPAGE',
  hasStarted: false,
  unlockedRegions: ['serang'],
  completedRegions: [],
  collectedCards: [],
  regionStars: {},
  activeRegionId: null,
  audioMuted: false,
};

const clampStars = (value) => Math.min(3, Math.max(1, Number(value) || 1));

export function sanitizeSave(raw) {
  if (!raw || typeof raw !== 'object' || raw.version !== SAVE_VERSION) return null;

  const completedRegions = Array.isArray(raw.completedRegions)
    ? REGION_ORDER.filter((id) => raw.completedRegions.includes(id))
    : [];

  const unlockedRegions = ['serang'];
  for (let i = 1; i < REGION_ORDER.length; i += 1) {
    if (completedRegions.includes(REGION_ORDER[i - 1])) unlockedRegions.push(REGION_ORDER[i]);
  }
  if (Array.isArray(raw.unlockedRegions)) {
    for (const id of raw.unlockedRegions) {
      if (REGION_ORDER.includes(id) && !unlockedRegions.includes(id)) unlockedRegions.push(id);
    }
  }

  const regionStars = {};
  if (raw.regionStars && typeof raw.regionStars === 'object') {
    for (const id of REGION_ORDER) {
      if (raw.regionStars[id]) regionStars[id] = clampStars(raw.regionStars[id]);
    }
  }

  const hasProgress =
    Boolean(raw.hasStarted) || completedRegions.length > 0 || (raw.collectedCards?.length ?? 0) > 0;

  return {
    ...BASE_STATE,
    hasStarted: hasProgress,
    unlockedRegions,
    completedRegions: completedRegions.filter((id) => unlockedRegions.includes(id)),
    collectedCards: Array.isArray(raw.collectedCards)
      ? raw.collectedCards.filter((id, index, arr) => CARD_IDS.includes(id) && arr.indexOf(id) === index)
      : [],
    regionStars,
    audioMuted: Boolean(raw.audioMuted),
  };
}

function loadSave() {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return sanitizeSave(JSON.parse(raw));
  } catch {
    return null;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_NEW':
      return {
        ...BASE_STATE,
        audioMuted: state.audioMuted,
        hasStarted: true,
        screen: 'PROLOGUE',
      };

    case 'CONTINUE':
      if (!state.hasStarted) return state;
      return { ...state, screen: 'MAP', activeRegionId: null };

    case 'GO_HOME':
      return { ...state, screen: 'HOMEPAGE', activeRegionId: null };

    case 'PROLOGUE_DONE':
      return { ...state, hasStarted: true, screen: 'MAP' };

    case 'OPEN_REGION': {
      if (!state.unlockedRegions.includes(action.regionId)) return state;
      return { ...state, screen: 'DIALOG', activeRegionId: action.regionId };
    }

    case 'DIALOG_DONE':
      return { ...state, screen: 'MINIGAME' };

    case 'COMPLETE_REGION': {
      const { regionId, stars, cardId } = action;
      if (!REGION_ORDER.includes(regionId)) return state;

      const completedRegions = state.completedRegions.includes(regionId)
        ? state.completedRegions
        : [...state.completedRegions, regionId];

      const index = REGION_ORDER.indexOf(regionId);
      const nextId = REGION_ORDER[index + 1];
      const unlockedRegions =
        nextId && !state.unlockedRegions.includes(nextId)
          ? [...state.unlockedRegions, nextId]
          : state.unlockedRegions;

      const collectedCards =
        cardId && CARD_IDS.includes(cardId) && !state.collectedCards.includes(cardId)
          ? [...state.collectedCards, cardId]
          : state.collectedCards;

      const previousStars = state.regionStars[regionId] ?? 0;
      const regionStars = {
        ...state.regionStars,
        [regionId]: Math.max(previousStars, clampStars(stars)),
      };

      return {
        ...state,
        completedRegions,
        unlockedRegions,
        collectedCards,
        regionStars,
        hasStarted: true,
      };
    }

    case 'RETURN_TO_MAP':
      return { ...state, screen: 'MAP', activeRegionId: null };

    case 'TOGGLE_AUDIO':
      return { ...state, audioMuted: !state.audioMuted };

    case 'SET_AUDIO':
      return { ...state, audioMuted: Boolean(action.muted) };

    case 'RESET':
      return { ...BASE_STATE, audioMuted: state.audioMuted };

    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadSave() ?? BASE_STATE);
  const lastSaved = useRef('');

  const totalRegions = REGION_ORDER.length;
  const completedCount = state.completedRegions.length;
  const progress = Math.round((completedCount / totalRegions) * 100);

  const nextRegionId = useMemo(() => {
    const candidate = REGION_ORDER.find((id) => state.unlockedRegions.includes(id) && !state.completedRegions.includes(id));
    return candidate ?? null;
  }, [state.unlockedRegions, state.completedRegions]);

  useEffect(() => {
    if (!state.hasStarted) return undefined;

    const snapshot = {
      version: SAVE_VERSION,
      hasStarted: true,
      unlockedRegions: state.unlockedRegions,
      completedRegions: state.completedRegions,
      collectedCards: state.collectedCards,
      regionStars: state.regionStars,
      audioMuted: state.audioMuted,
      lastPlayedAt: Date.now(),
    };
    const serialized = JSON.stringify(snapshot);
    if (serialized === lastSaved.current) return undefined;

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(SAVE_KEY, serialized);
        lastSaved.current = serialized;
      } catch {
        /* storage penuh atau diblokir — game tetap berjalan */
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [
    state.hasStarted,
    state.unlockedRegions,
    state.completedRegions,
    state.collectedCards,
    state.regionStars,
    state.audioMuted,
  ]);

  const resetSave = useCallback(() => {
    try {
      window.localStorage.removeItem(SAVE_KEY);
    } catch {
      /* noop */
    }
    lastSaved.current = '';
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      state,
      dispatch,
      totalRegions,
      completedCount,
      progress,
      nextRegionId,
      isUnlocked: (id) => state.unlockedRegions.includes(id),
      isCompleted: (id) => state.completedRegions.includes(id),
      starsFor: (id) => state.regionStars[id] ?? 0,
      resetSave,
    }),
    [state, totalRegions, completedCount, progress, nextRegionId, resetSave],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameState() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameState harus dipakai di dalam GameProvider');
  return context;
}

export { SAVE_KEY };
