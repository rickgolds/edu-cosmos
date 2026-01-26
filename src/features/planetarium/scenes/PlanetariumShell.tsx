'use client';

import { useRef, useCallback, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePlanetariumState } from '../state/usePlanetariumState';
import { CameraDirector, type CameraDirectorRef } from '../camera/CameraDirector';
import { SolarSystemScene } from './SolarSystemScene';
import { PlanetFocusScene } from './PlanetFocusScene';
import { PlanetariumIntro } from '../ui/PlanetariumIntro';
import { TransitionHUD } from '../ui/TransitionHUD';
import { PlanetariumHeader } from '../ui/PlanetariumHeader';
import { BackButton } from '../ui/BackButton';
import { PlanetInfoPanel } from '../components/PlanetInfoPanel';
import { PlanetHUD } from '../components/PlanetHUD';
import { PlanetControls } from '../components/PlanetControls';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { preloadPlanetModels } from '../components/PlanetMesh';
import { preloadOverviewTextures } from './SolarSystemPlanet';
import { preloadSunTexture } from './Sun';
import { preloadMoonTexture } from './Moon';
import { getPlanetById } from '../planetarium.data';
import type { PlanetariumSettings } from '../planetarium.types';

// Detect mobile device (used for preloading decisions)
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Start preloading assets - but be conservative on mobile to avoid crashes
if (typeof window !== 'undefined') {
  const isMobile = isMobileDevice();

  // Always preload overview textures (small, needed immediately)
  preloadOverviewTextures();

  // On desktop, preload everything for smooth experience
  // On mobile, skip heavy GLB models to prevent memory crashes
  if (!isMobile) {
    preloadSunTexture();
    preloadMoonTexture();
    preloadPlanetModels(); // Skip on mobile - these are 150MB+ total
  }
}

interface PlanetariumShellProps {
  initialPlanetId?: string;
}

const DEFAULT_SETTINGS: PlanetariumSettings = {
  autoRotate: true,
  rotationSpeed: 0.5,
  lighting: 'right',
  lightIntensity: 1.2,
  quality: 'high',
  showHUD: true,
  showAtmosphere: true,
  // Context Solar System defaults
  showSolarSystemContext: true,
  contextDistanceScale: 0.5,
  contextSlowOrbits: true,
  contextShowOrbits: true,
};

/**
 * Main Planetarium Shell
 * Orchestrates the entire planetarium experience
 */
export function PlanetariumShell({ initialPlanetId }: PlanetariumShellProps) {
  const { state, actions } = usePlanetariumState(initialPlanetId);
  const cameraRef = useRef<CameraDirectorRef>(null);

  const [settings, setSettings] = useState<PlanetariumSettings>(DEFAULT_SETTINGS);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  // Get current planet data
  const currentPlanet = state.currentPlanetId
    ? getPlanetById(state.currentPlanetId)
    : null;
  const targetPlanet = state.targetPlanetId
    ? getPlanetById(state.targetPlanetId)
    : null;

  // Handle planet selection from overview
  const handlePlanetSelect = actions.selectPlanet;

  // Handle return to overview
  const handleBackToOverview = useCallback(() => {
    setIsInfoOpen(false);
    setIsControlsOpen(false);
    actions.returnToOverview();
  }, [actions.returnToOverview]);

  // Handle settings change
  const handleSettingsChange = useCallback((newSettings: Partial<PlanetariumSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Handle transition progress - use stable action directly
  const handleTransitionProgress = actions.updateTransitionProgress;

  // Handle transition complete - use stable action directly
  const handleTransitionComplete = actions.completeTransition;

  // Handle intro complete - use stable action directly
  const handleIntroComplete = actions.completeIntro;

  // Handle scene ready - use stable action directly
  const handleSceneReady = actions.setSceneReady;

  // Detect mobile and adjust settings for performance
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    if (mobile) {
      setSettings(prev => ({
        ...prev,
        quality: 'low',
        showHUD: false,
        showAtmosphere: false, // Disable atmosphere effect on mobile
        showSolarSystemContext: false, // Disable context planets on mobile
      }));
    }
  }, []);

  // Scene ready notification
  useEffect(() => {
    // Give canvas a moment to initialize
    const timeout = setTimeout(handleSceneReady, 100);
    return () => clearTimeout(timeout);
  }, [handleSceneReady]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state.mode === 'transition') {
          actions.cancelTransition();
        } else if (state.mode === 'planet') {
          handleBackToOverview();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.mode, actions.cancelTransition, handleBackToOverview]);

  const pixelRatio = settings.quality === 'low' ? 1 : Math.min(window.devicePixelRatio, 2);

  return (
    <div className="h-screen w-screen bg-[#030308] overflow-hidden relative">
      {/* Intro overlay */}
      <PlanetariumIntro
        visible={state.mode === 'intro'}
        onComplete={handleIntroComplete}
      />

      {/* 3D Canvas */}
      <Canvas
        dpr={pixelRatio}
        gl={{
          antialias: !isMobile && settings.quality === 'high',
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          alpha: false,
          // Limit precision on mobile to reduce memory usage
          precision: isMobile ? 'lowp' : 'highp',
        }}
        shadows={!isMobile && settings.quality === 'high'}
        style={{
          opacity: state.mode === 'intro' ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <Suspense fallback={null}>
          {/* Background - always visible */}
          <StarfieldBackground />

          {/* Camera Director */}
          <CameraDirector
            ref={cameraRef}
            mode={state.mode}
            targetPlanetId={state.targetPlanetId}
            transitionDirection={state.transitionDirection}
            onTransitionProgress={handleTransitionProgress}
            onTransitionComplete={handleTransitionComplete}
            orbitTime={state.orbitTime}
          />

          {/* Solar System Overview */}
          <SolarSystemScene
            onPlanetSelect={handlePlanetSelect}
            visible={state.mode === 'overview' || state.mode === 'transition'}
            quality={settings.quality}
            orbitTime={state.orbitTime}
            onOrbitTimeUpdate={actions.updateOrbitTime}
            isTransitioning={state.mode === 'transition'}
          />

          {/* Focused Planet View */}
          <PlanetFocusScene
            planetId={state.currentPlanetId || state.targetPlanetId || ''}
            settings={settings}
            visible={state.mode === 'planet' || state.mode === 'transition'}
            orbitTime={state.orbitTime}
          />
        </Suspense>
      </Canvas>

      {/* Header */}
      <PlanetariumHeader
        visible={state.mode !== 'intro'}
        mode={state.mode}
        currentPlanetName={currentPlanet?.name || targetPlanet?.name}
      />

      {/* Transition HUD */}
      <TransitionHUD
        visible={state.mode === 'transition'}
        direction={state.transitionDirection}
        planetName={targetPlanet?.name || currentPlanet?.name || ''}
        progress={state.transitionProgress}
      />

      {/* Planet View UI (only in planet mode) */}
      {state.mode === 'planet' && currentPlanet && (
        <>
          {/* Back button */}
          <BackButton onClick={handleBackToOverview} />

          {/* HUD */}
          <PlanetHUD planet={currentPlanet} visible={settings.showHUD} />

          {/* Controls panel */}
          <PlanetControls
            settings={settings}
            onSettingsChange={handleSettingsChange}
            isOpen={isControlsOpen}
            onToggle={() => setIsControlsOpen(!isControlsOpen)}
            hasAtmosphere={currentPlanet.hasAtmosphere}
          />

          {/* Info panel */}
          <PlanetInfoPanel
            planet={currentPlanet}
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
          />

          {/* Info toggle button - top right, same row as back button */}
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className={`absolute top-4 right-4 z-20 p-2.5 rounded-lg border backdrop-blur-sm transition-all ${
              isInfoOpen
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:bg-black/70 hover:border-white/20'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </>
      )}

    </div>
  );
}
