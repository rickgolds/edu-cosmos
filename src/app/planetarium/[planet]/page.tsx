'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Info, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { getPlanetById } from '@/features/planetarium';
import type { PlanetariumSettings } from '@/features/planetarium';
import { useProgress } from '@/hooks/useProgress';

// Dynamic imports for 3D components (client-side only)
const PlanetScene = dynamic(
  () =>
    import('@/features/planetarium/components/PlanetScene').then(
      (mod) => mod.PlanetScene
    ),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
);

const PlanetHUD = dynamic(
  () =>
    import('@/features/planetarium/components/PlanetHUD').then(
      (mod) => mod.PlanetHUD
    ),
  { ssr: false }
);

const PlanetInfoPanel = dynamic(
  () =>
    import('@/features/planetarium/components/PlanetInfoPanel').then(
      (mod) => mod.PlanetInfoPanel
    ),
  { ssr: false }
);

const PlanetSelector = dynamic(
  () =>
    import('@/features/planetarium/components/PlanetSelector').then(
      (mod) => mod.PlanetSelector
    ),
  { ssr: false }
);

const PlanetControls = dynamic(
  () =>
    import('@/features/planetarium/components/PlanetControls').then(
      (mod) => mod.PlanetControls
    ),
  { ssr: false }
);

const DEFAULT_SETTINGS: PlanetariumSettings = {
  autoRotate: true,
  rotationSpeed: 0.5,
  lighting: 'right',
  lightIntensity: 1.2,
  quality: 'high',
  showHUD: true,
  showAtmosphere: true,
};

function SceneLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-planetarium-bg">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-planetarium-glow animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-400">Ładowanie sceny 3D...</p>
      </div>
    </div>
  );
}

export default function PlanetViewPage() {
  const params = useParams();
  const planetId = params.planet as string;
  const planet = getPlanetById(planetId);

  const { progress, visitPlanet, recordActivity } = useProgress();
  const visitedPlanets = progress.planetariumVisits?.map((v) => v.planetId) || [];

  const [settings, setSettings] = useState<PlanetariumSettings>(DEFAULT_SETTINGS);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track if we've already recorded the initial visit
  const hasRecordedVisit = useRef(false);

  // Record initial visit - only once per planet
  useEffect(() => {
    if (planet && !hasRecordedVisit.current) {
      hasRecordedVisit.current = true;
      recordActivity();
      visitPlanet(planet.id, 0);
      setIsLoaded(true);
    }
  }, [planet?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset ref when planet changes
  useEffect(() => {
    hasRecordedVisit.current = false;
  }, [planetId]);

  // Store visitPlanet in ref to avoid dependency issues
  const visitPlanetRef = useRef(visitPlanet);
  visitPlanetRef.current = visitPlanet;

  // Handle time tracking when leaving
  const handleTimeUpdate = useCallback(
    (seconds: number) => {
      if (planet && seconds > 0) {
        visitPlanetRef.current(planet.id, seconds);
      }
    },
    [planet?.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Handle settings change
  const handleSettingsChange = useCallback(
    (newSettings: Partial<PlanetariumSettings>) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    []
  );

  // Detect mobile and adjust settings
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setSettings((prev) => ({
        ...prev,
        quality: 'low',
        showHUD: false,
      }));
    }
  }, []);

  if (!planet) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-48px)] relative overflow-hidden">
      {/* 3D Scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <PlanetScene
          planet={planet}
          settings={settings}
          onTimeUpdate={handleTimeUpdate}
        />
      </motion.div>

      {/* HUD Overlay */}
      <PlanetHUD planet={planet} visible={settings.showHUD} />

      {/* Controls Panel (left) */}
      <PlanetControls
        settings={settings}
        onSettingsChange={handleSettingsChange}
        isOpen={isControlsOpen}
        onToggle={() => setIsControlsOpen(!isControlsOpen)}
        hasAtmosphere={planet.hasAtmosphere}
      />

      {/* Info Panel (right) */}
      <PlanetInfoPanel
        planet={planet}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

      {/* Info toggle button */}
      <button
        onClick={() => setIsInfoOpen(!isInfoOpen)}
        className={clsx(
          'absolute top-4 right-4 z-10 p-2.5 rounded-lg border transition-all',
          isInfoOpen
            ? 'bg-planetarium-glow/20 border-planetarium-glow text-planetarium-glow'
            : 'bg-planetarium-panel border-planetarium-border text-gray-400 hover:text-white hover:border-planetarium-glow/50'
        )}
      >
        <Info className="w-5 h-5" />
      </button>

      {/* Planet Selector (bottom) */}
      <PlanetSelector
        currentPlanet={planet}
        visitedPlanets={visitedPlanets}
      />

      {/* Mobile hint */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 md:hidden">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-500 text-center bg-planetarium-panel/80 px-3 py-1.5 rounded-full"
        >
          Dotknij i przeciągnij, aby obrócić
        </motion.p>
      </div>
    </div>
  );
}
