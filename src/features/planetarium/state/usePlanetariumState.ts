'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

/**
 * Planetarium view modes
 */
export type PlanetariumMode =
  | 'intro'      // Initial loading/intro screen
  | 'overview'   // Solar system top-down view
  | 'transition' // Flying to/from planet
  | 'planet';    // Viewing single planet

/**
 * Transition direction
 */
export type TransitionDirection = 'to-planet' | 'to-overview';

/**
 * Planetarium state
 */
export interface PlanetariumState {
  mode: PlanetariumMode;
  targetPlanetId: string | null;
  currentPlanetId: string | null;
  transitionDirection: TransitionDirection | null;
  transitionProgress: number; // 0-1
  isSceneReady: boolean;
  introComplete: boolean;
  orbitTime: number; // Global time for orbital positions - single source of truth
}

/**
 * Planetarium actions
 */
export interface PlanetariumActions {
  // Scene lifecycle
  setSceneReady: () => void;
  completeIntro: () => void;

  // Navigation
  selectPlanet: (planetId: string) => void;
  returnToOverview: () => void;

  // Transition
  updateTransitionProgress: (progress: number) => void;
  completeTransition: () => void;
  cancelTransition: () => void;

  // Orbit animation
  updateOrbitTime: (delta: number) => void;
}

const INITIAL_STATE: PlanetariumState = {
  mode: 'intro',
  targetPlanetId: null,
  currentPlanetId: null,
  transitionDirection: null,
  transitionProgress: 0,
  isSceneReady: false,
  introComplete: false,
  orbitTime: 0,
};

/**
 * Minimum intro duration (ms) - ensures intro is shown even if scene loads fast
 */
const MIN_INTRO_DURATION = 1500;

/**
 * State machine hook for Planetarium
 */
export function usePlanetariumState(initialPlanetId?: string) {
  const [state, setState] = useState<PlanetariumState>(() => ({
    ...INITIAL_STATE,
    // If starting with a planet ID, we'll transition to it after intro
    targetPlanetId: initialPlanetId || null,
  }));

  const introStartTime = useRef<number>(Date.now());
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Auto-transition from intro to overview when ready
  useEffect(() => {
    if (state.isSceneReady && state.introComplete && state.mode === 'intro') {
      const elapsed = Date.now() - introStartTime.current;
      const remaining = Math.max(0, MIN_INTRO_DURATION - elapsed);

      transitionTimeoutRef.current = setTimeout(() => {
        setState(prev => {
          // If we have a target planet from URL, go directly to transition
          if (prev.targetPlanetId) {
            return {
              ...prev,
              mode: 'transition',
              transitionDirection: 'to-planet',
              transitionProgress: 0,
            };
          }
          // Otherwise go to overview
          return {
            ...prev,
            mode: 'overview',
          };
        });
      }, remaining);
    }
  }, [state.isSceneReady, state.introComplete, state.mode]);

  // Create stable action functions
  const setSceneReady = useCallback(() => {
    setState(prev => ({ ...prev, isSceneReady: true }));
  }, []);

  const completeIntro = useCallback(() => {
    setState(prev => ({ ...prev, introComplete: true }));
  }, []);

  const selectPlanet = useCallback((planetId: string) => {
    setState(prev => {
      // Can only select from overview mode
      if (prev.mode !== 'overview') return prev;

      return {
        ...prev,
        mode: 'transition',
        targetPlanetId: planetId,
        transitionDirection: 'to-planet',
        transitionProgress: 0,
      };
    });
  }, []);

  const returnToOverview = useCallback(() => {
    setState(prev => {
      // Can only return from planet mode
      if (prev.mode !== 'planet') return prev;

      return {
        ...prev,
        mode: 'transition',
        transitionDirection: 'to-overview',
        transitionProgress: 0,
      };
    });
  }, []);

  const updateTransitionProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      transitionProgress: Math.min(1, Math.max(0, progress)),
    }));
  }, []);

  const completeTransition = useCallback(() => {
    setState(prev => {
      if (prev.mode !== 'transition') return prev;

      if (prev.transitionDirection === 'to-planet') {
        return {
          ...prev,
          mode: 'planet',
          currentPlanetId: prev.targetPlanetId,
          transitionDirection: null,
          transitionProgress: 0,
        };
      } else {
        return {
          ...prev,
          mode: 'overview',
          currentPlanetId: null,
          targetPlanetId: null,
          transitionDirection: null,
          transitionProgress: 0,
        };
      }
    });
  }, []);

  const cancelTransition = useCallback(() => {
    setState(prev => {
      if (prev.mode !== 'transition') return prev;

      // Return to previous state
      if (prev.transitionDirection === 'to-planet') {
        return {
          ...prev,
          mode: 'overview',
          targetPlanetId: null,
          transitionDirection: null,
          transitionProgress: 0,
        };
      } else {
        return {
          ...prev,
          mode: 'planet',
          transitionDirection: null,
          transitionProgress: 0,
        };
      }
    });
  }, []);

  const updateOrbitTime = useCallback((delta: number) => {
    setState(prev => ({
      ...prev,
      orbitTime: prev.orbitTime + delta * 0.5,
    }));
  }, []);

  // Memoize the actions object to prevent unnecessary re-renders
  const actions = useMemo<PlanetariumActions>(() => ({
    setSceneReady,
    completeIntro,
    selectPlanet,
    returnToOverview,
    updateTransitionProgress,
    completeTransition,
    cancelTransition,
    updateOrbitTime,
  }), [
    setSceneReady,
    completeIntro,
    selectPlanet,
    returnToOverview,
    updateTransitionProgress,
    completeTransition,
    cancelTransition,
    updateOrbitTime,
  ]);

  return { state, actions };
}

export type UsePlanetariumState = ReturnType<typeof usePlanetariumState>;
