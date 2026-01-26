'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetMesh } from '../components/PlanetMesh';
import { Atmosphere } from '../components/Atmosphere';
import { SaturnRings } from '../components/SaturnRings';
import { ContextSolarSystem } from '../components/ContextSolarSystem';
import { getPlanetAssets, LIGHTING_POSITIONS, FALLBACK_COLORS } from '../planetarium.assets';
import { getPlanetById } from '../planetarium.data';
import { getPlanetPosition, calculatePlanetWorldPosition } from '../data/solarSystemLayout';
import type { PlanetariumSettings } from '../planetarium.types';

interface PlanetFocusSceneProps {
  planetId: string;
  settings: PlanetariumSettings;
  visible: boolean;
  orbitTime: number;
}

/**
 * Scene content for focused planet view
 * Renders planet at its orbital position for smooth camera transitions
 */
function PlanetContent({
  planetId,
  settings,
  worldPosition,
}: {
  planetId: string;
  settings: PlanetariumSettings;
  worldPosition: [number, number, number];
}) {
  const planet = getPlanetById(planetId);
  const assets = getPlanetAssets(planetId);

  if (!planet || !assets) return null;

  // Atmosphere config (prefer new format, fallback to legacy)
  const atmosphereConfig = assets.atmosphere || {
    enabled: !!assets.atmosphereColor,
    color: assets.atmosphereColor || '#ffffff',
    intensity: assets.atmosphereIntensity || 0.3,
    scale: assets.scale * 1.06,
    falloff: 4,
  };

  // Rings config (prefer new format, fallback to legacy)
  const ringsConfig = assets.rings || {
    enabled: !!assets.ringsTextureFile,
    textureFile: assets.ringsTextureFile || null,
    innerRadius: assets.ringsInnerRadius || 1.2,
    outerRadius: assets.ringsOuterRadius || 2.3,
    opacity: 0.85,
    tilt: assets.tilt,
  };

  return (
    <group position={worldPosition}>
      {/* Planet mesh */}
      <PlanetMesh
        planet={planet}
        assets={assets}
        autoRotate={true}
        rotationSpeed={1}
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

      {/* Rings (Saturn, Uranus, Neptune) */}
      {ringsConfig.enabled && ringsConfig.textureFile && (
        <SaturnRings
          config={ringsConfig}
          planetScale={assets.scale}
          quality={settings.quality}
        />
      )}
    </group>
  );
}

/**
 * Lighting for the focused planet scene
 */
function PlanetLighting({
  settings,
  planetId,
  worldPosition,
}: {
  settings: PlanetariumSettings;
  planetId: string;
  worldPosition: [number, number, number];
}) {
  const assets = getPlanetAssets(planetId);
  const keyPosition = LIGHTING_POSITIONS[settings.lighting];

  // Calculate light positions relative to planet
  const { fillPosition, rimPosition, keyOffset } = useMemo(() => {
    const [x, y, z] = keyPosition;
    return {
      keyOffset: [
        worldPosition[0] + x,
        worldPosition[1] + y,
        worldPosition[2] + z,
      ] as [number, number, number],
      fillPosition: [
        worldPosition[0] + (-x * 0.5),
        worldPosition[1] + (y * 0.5),
        worldPosition[2] + (z * 0.8),
      ] as [number, number, number],
      rimPosition: [
        worldPosition[0] + (-x * 1.2),
        worldPosition[1] + y,
        worldPosition[2] + (-z * 0.5),
      ] as [number, number, number],
    };
  }, [keyPosition, worldPosition]);

  // Sun has its own lighting - minimal ambient only
  if (planetId === 'sun') {
    return <ambientLight intensity={0.1} />;
  }

  return (
    <>
      {/* Ambient - very subtle */}
      <ambientLight intensity={0.05} />

      {/* Key Light (sun) */}
      <directionalLight
        position={keyOffset}
        intensity={settings.lightIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light */}
      <directionalLight
        position={fillPosition}
        intensity={settings.lightIntensity * 0.15}
        color="#4a6fa5"
      />

      {/* Rim Light */}
      <directionalLight
        position={rimPosition}
        intensity={settings.lightIntensity * 0.3}
        color="#ffffff"
      />

      {/* Atmosphere highlight */}
      {assets?.atmosphere?.enabled && (
        <pointLight
          position={keyOffset}
          intensity={settings.lightIntensity * 0.1}
          color={assets.atmosphere.color}
          distance={15}
          decay={2}
        />
      )}
    </>
  );
}

/**
 * Orbiting Moon - visible when viewing Earth
 */
function OrbitingMoonWithTexture({
  earthPosition,
  quality,
  texturePath,
}: {
  earthPosition: [number, number, number];
  quality: 'low' | 'high';
  texturePath: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [angle, setAngle] = useState(0);
  const texture = useTexture(texturePath);

  // Configure texture
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Moon orbit animation
  useFrame((_, delta) => {
    setAngle(prev => prev + delta * 0.15);

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  // Moon orbit parameters
  const orbitRadius = 4; // Distance from Earth center
  const moonRadius = 0.35;

  const moonPosition: [number, number, number] = [
    earthPosition[0] + Math.cos(angle) * orbitRadius,
    earthPosition[1] + Math.sin(angle * 0.3) * 0.3, // Slight vertical wobble
    earthPosition[2] + Math.sin(angle) * orbitRadius,
  ];

  const segments = quality === 'high' ? 24 : 16;

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={moonPosition}>
        <sphereGeometry args={[moonRadius, segments, segments]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function OrbitingMoonFallback({
  earthPosition,
  quality,
}: {
  earthPosition: [number, number, number];
  quality: 'low' | 'high';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [angle, setAngle] = useState(0);

  // Moon orbit animation
  useFrame((_, delta) => {
    setAngle(prev => prev + delta * 0.15);

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  const orbitRadius = 4;
  const moonRadius = 0.35;

  const moonPosition: [number, number, number] = [
    earthPosition[0] + Math.cos(angle) * orbitRadius,
    earthPosition[1] + Math.sin(angle * 0.3) * 0.3,
    earthPosition[2] + Math.sin(angle) * orbitRadius,
  ];

  const segments = quality === 'high' ? 24 : 16;

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={moonPosition}>
        <sphereGeometry args={[moonRadius, segments, segments]} />
        <meshStandardMaterial
          color={FALLBACK_COLORS.moon}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function OrbitingMoon({
  earthPosition,
  quality,
}: {
  earthPosition: [number, number, number];
  quality: 'low' | 'high';
}) {
  const texturePath = '/planetarium/textures/moon_texture.jpg';
  const fallback = <OrbitingMoonFallback earthPosition={earthPosition} quality={quality} />;

  return (
    <Suspense fallback={fallback}>
      <OrbitingMoonWithTexture
        earthPosition={earthPosition}
        quality={quality}
        texturePath={texturePath}
      />
    </Suspense>
  );
}

/**
 * Moon orbit ring decoration
 */
function MoonOrbitRingDecoration({
  earthPosition,
  radius = 4,
}: {
  earthPosition: [number, number, number];
  radius?: number;
}) {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 48;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: '#666666',
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });

    return new THREE.Line(geometry, material);
  }, [radius]);

  return (
    <group position={earthPosition}>
      <primitive object={line} />
    </group>
  );
}

// Moon orbit radius (distance from Earth)
const MOON_ORBIT_RADIUS = 4;

/**
 * Earth visible when viewing Moon - orbits around Moon's position
 * (visually equivalent to Moon orbiting Earth, but from Moon's reference frame)
 */
function OrbitingEarthAroundMoon({
  moonPosition,
  quality,
}: {
  moonPosition: [number, number, number];
  quality: 'low' | 'high';
}) {
  const earthData = getPlanetById('earth');
  const earthAssets = getPlanetAssets('earth');
  const groupRef = useRef<THREE.Group>(null);
  const [angle, setAngle] = useState(Math.PI); // Start on opposite side

  // Animate Earth orbiting around Moon's position
  useFrame((_, delta) => {
    setAngle(prev => prev + delta * 0.08); // Slow orbit
  });

  if (!earthData || !earthAssets) return null;

  // Earth orbits around Moon
  const earthPosition: [number, number, number] = [
    moonPosition[0] + Math.cos(angle) * MOON_ORBIT_RADIUS,
    moonPosition[1],
    moonPosition[2] + Math.sin(angle) * MOON_ORBIT_RADIUS,
  ];

  return (
    <group ref={groupRef} position={earthPosition}>
      <PlanetMesh
        planet={earthData}
        assets={earthAssets}
        autoRotate={true}
        rotationSpeed={0.5}
        quality={quality}
      />
      {/* Earth's atmosphere */}
      <Atmosphere
        color="#88ccff"
        intensity={0.3}
        scale={earthAssets.scale * 1.06}
        falloff={4}
      />
    </group>
  );
}

/**
 * Moon orbit ring when viewing Moon (centered on Moon, showing Earth's apparent orbit)
 */
function EarthOrbitRingAroundMoon({
  moonPosition,
  radius = MOON_ORBIT_RADIUS,
}: {
  moonPosition: [number, number, number];
  radius?: number;
}) {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 48;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: '#6b93d6',
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });

    return new THREE.Line(geometry, material);
  }, [radius]);

  return (
    <group position={moonPosition}>
      <primitive object={line} />
    </group>
  );
}

/**
 * Planet Focus Scene
 * Full detail view of a single planet with solar system context
 */
export function PlanetFocusScene({
  planetId,
  settings,
  visible,
  orbitTime,
}: PlanetFocusSceneProps) {
  // Calculate planet's orbital position (used for camera and rendering)
  // Uses global orbitTime to stay in sync with SolarSystemScene
  const worldPosition = useMemo((): [number, number, number] => {
    if (planetId === 'sun') {
      return [0, 0, 0];
    }
    if (planetId === 'moon') {
      // Moon has its own position, offset from Earth
      const earthPos = getPlanetPosition('earth');
      if (earthPos) {
        const earthWorld = calculatePlanetWorldPosition(earthPos, orbitTime);
        // Moon is offset from Earth by orbit radius
        return [
          earthWorld[0] + MOON_ORBIT_RADIUS,
          earthWorld[1],
          earthWorld[2],
        ];
      }
      return [0, 0, 0];
    }
    const position = getPlanetPosition(planetId);
    return position ? calculatePlanetWorldPosition(position, orbitTime) : [0, 0, 0];
  }, [planetId, orbitTime]);

  // Earth position (needed for moon orbit when viewing Earth)
  const earthPosition = useMemo((): [number, number, number] => {
    const earthPos = getPlanetPosition('earth');
    return earthPos ? calculatePlanetWorldPosition(earthPos, orbitTime) : [0, 0, 0];
  }, [orbitTime]);

  if (!visible || !planetId) return null;

  const isViewingEarth = planetId === 'earth';
  const isViewingMoon = planetId === 'moon';

  return (
    <group>
      {/* Context Solar System (background) - positioned relative to focused planet */}
      {settings.showSolarSystemContext && (
        <ContextSolarSystem
          focusedPlanetId={planetId}
          focusedPlanetOrbitalPosition={isViewingMoon ? earthPosition : worldPosition}
          distanceExponent={settings.contextDistanceScale}
          animateOrbits={settings.contextSlowOrbits}
          showOrbits={settings.contextShowOrbits}
          quality={settings.quality}
          visible={true}
        />
      )}

      {/* Lighting */}
      <PlanetLighting settings={settings} planetId={planetId} worldPosition={worldPosition} />

      {/* Planet content */}
      <Suspense fallback={null}>
        <PlanetContent planetId={planetId} settings={settings} worldPosition={worldPosition} />
      </Suspense>

      {/* Moon orbiting Earth (only when viewing Earth) */}
      {isViewingEarth && (
        <>
          <OrbitingMoon earthPosition={earthPosition} quality={settings.quality} />
          <MoonOrbitRingDecoration earthPosition={earthPosition} />
        </>
      )}

      {/* Earth orbiting when viewing Moon */}
      {isViewingMoon && (
        <>
          <OrbitingEarthAroundMoon moonPosition={worldPosition} quality={settings.quality} />
          <EarthOrbitRingAroundMoon moonPosition={worldPosition} />
        </>
      )}
    </group>
  );
}
