'use client';

import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PlanetMesh } from './PlanetMesh';
import { StarfieldBackground } from './StarfieldBackground';
import { Atmosphere } from './Atmosphere';
import { SaturnRings } from './SaturnRings';
import { getPlanetAssets, getDefaultCameraDistance, LIGHTING_POSITIONS } from '../planetarium.assets';
import type { PlanetariumSettings, PlanetInfo, PlanetAssetConfig } from '../planetarium.types';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface PlanetSceneProps {
  planet: PlanetInfo;
  settings: PlanetariumSettings;
  onTimeUpdate?: (seconds: number) => void;
}

/**
 * Three-point lighting setup for more cinematic look
 */
function SceneLighting({
  settings,
  assets,
}: {
  settings: PlanetariumSettings;
  assets: PlanetAssetConfig;
}) {
  const keyPosition = LIGHTING_POSITIONS[settings.lighting];

  // Calculate fill and rim positions based on key light
  const fillPosition = useMemo(() => {
    const [x, y, z] = keyPosition;
    return [-x * 0.5, y * 0.5, z * 0.8] as [number, number, number];
  }, [keyPosition]);

  const rimPosition = useMemo(() => {
    const [x, y, z] = keyPosition;
    return [-x * 1.2, y, -z * 0.5] as [number, number, number];
  }, [keyPosition]);

  return (
    <>
      {/* Ambient - very subtle for deep space feel */}
      <ambientLight intensity={0.05} />

      {/* Key Light - main directional light (sun) */}
      <directionalLight
        position={keyPosition as [number, number, number]}
        intensity={settings.lightIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill Light - softer, opposite side */}
      <directionalLight
        position={fillPosition}
        intensity={settings.lightIntensity * 0.15}
        color="#4a6fa5"
      />

      {/* Rim Light - back lighting for edge definition */}
      <directionalLight
        position={rimPosition}
        intensity={settings.lightIntensity * 0.3}
        color="#ffffff"
      />

      {/* Subtle point light for atmosphere highlighting */}
      {assets.atmosphere?.enabled && (
        <pointLight
          position={keyPosition as [number, number, number]}
          intensity={settings.lightIntensity * 0.1}
          color={assets.atmosphere.color}
          distance={15}
          decay={2}
        />
      )}
    </>
  );
}

function SceneContent({
  planet,
  settings,
}: {
  planet: PlanetInfo;
  settings: PlanetariumSettings;
}) {
  const assets = getPlanetAssets(planet.id);

  if (!assets) return null;

  // Get atmosphere config (prefer new format, fallback to legacy)
  const atmosphereConfig = assets.atmosphere || {
    enabled: !!assets.atmosphereColor,
    color: assets.atmosphereColor || '#ffffff',
    intensity: assets.atmosphereIntensity || 0.3,
    scale: assets.scale * 1.06,
    falloff: 4,
  };

  // Get rings config (prefer new format, fallback to legacy)
  const ringsConfig = assets.rings || {
    enabled: !!assets.ringsTextureFile,
    textureFile: assets.ringsTextureFile || null,
    innerRadius: assets.ringsInnerRadius || 1.2,
    outerRadius: assets.ringsOuterRadius || 2.3,
    opacity: 0.85,
    tilt: assets.tilt,
  };

  return (
    <>
      {/* Lighting */}
      <SceneLighting settings={settings} assets={assets} />

      {/* Planet */}
      <PlanetMesh
        planet={planet}
        assets={assets}
        autoRotate={settings.autoRotate}
        rotationSpeed={settings.rotationSpeed}
        quality={settings.quality}
      />

      {/* Atmosphere (if applicable) */}
      {settings.showAtmosphere && planet.hasAtmosphere && atmosphereConfig.enabled && (
        <Atmosphere
          color={atmosphereConfig.color}
          intensity={atmosphereConfig.intensity}
          scale={atmosphereConfig.scale || assets.scale * 1.06}
          falloff={atmosphereConfig.falloff}
        />
      )}

      {/* Rings (Saturn, potentially Uranus/Neptune) */}
      {ringsConfig.enabled && ringsConfig.textureFile && (
        <SaturnRings
          config={ringsConfig}
          planetScale={assets.scale}
          quality={settings.quality}
        />
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

export function PlanetScene({ planet, settings, onTimeUpdate }: PlanetSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef(0);

  // Get assets to determine camera distance
  const assets = getPlanetAssets(planet.id);
  const cameraDistance = assets ? getDefaultCameraDistance(assets) : 5;

  // Calculate min/max distances based on planet scale
  const minDistance = assets ? Math.max(1.5, assets.scale * 1.5) : 2;
  const maxDistance = assets ? Math.max(20, cameraDistance * 3) : 15;

  // Track time spent viewing
  useEffect(() => {
    secondsRef.current = 0;
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Report time on unmount
      if (onTimeUpdate && secondsRef.current > 0) {
        onTimeUpdate(secondsRef.current);
      }
    };
  }, [planet.id, onTimeUpdate]);

  const pixelRatio =
    settings.quality === 'low' ? 1 : Math.min(window.devicePixelRatio, 2);

  return (
    <div className="w-full h-full bg-planetarium-bg">
      <Canvas
        dpr={pixelRatio}
        gl={{
          antialias: settings.quality === 'high',
          powerPreference: 'high-performance',
          alpha: false,
        }}
        shadows={settings.quality === 'high'}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, cameraDistance]}
          fov={45}
          near={0.1}
          far={1000}
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={minDistance}
          maxDistance={maxDistance}
          autoRotate={false}
          dampingFactor={0.05}
          enableDamping
          rotateSpeed={0.5}
        />

        {/* Starfield background - now uses texture */}
        <StarfieldBackground />

        <Suspense fallback={<LoadingFallback />}>
          <SceneContent planet={planet} settings={settings} />
        </Suspense>
      </Canvas>
    </div>
  );
}
