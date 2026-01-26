'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { ContextPlanet, ContextOrbitRing, MoonOrbitRing } from './ContextPlanet';
import {
  getAllPlanetsDisplayData,
  auToDisplayDistance,
  getPlanetDisplayPosition,
  PLANET_AU_DISTANCES,
  type ScaleConfig,
} from '../data/scaleModel';

interface ContextSolarSystemProps {
  /** Current focused planet ID - will be excluded from rendering */
  focusedPlanetId: string;
  /** The orbital position where the focused planet is actually rendered */
  focusedPlanetOrbitalPosition: [number, number, number];
  /** Distance compression exponent (0.3-0.8) */
  distanceExponent?: number;
  /** Base scale for distances (higher = more spread) */
  distanceBaseScale?: number;
  /** Enable slow orbital animation */
  animateOrbits?: boolean;
  /** Show orbit rings */
  showOrbits?: boolean;
  /** Quality level */
  quality?: 'low' | 'high';
  /** Visibility */
  visible?: boolean;
}

/**
 * Renders the solar system as background context in planet view
 * Positioned so the context aligns with the focused planet's orbital position
 */
export function ContextSolarSystem({
  focusedPlanetId,
  focusedPlanetOrbitalPosition,
  distanceExponent = 0.5,
  distanceBaseScale = 80,
  animateOrbits = true,
  showOrbits = true,
  quality = 'low',
  visible = true,
}: ContextSolarSystemProps) {
  const [time, setTime] = useState(0);

  // Animate if enabled
  useFrame((_, delta) => {
    if (animateOrbits && visible) {
      setTime(prev => prev + delta * 0.3); // Slow movement
    }
  });

  // Scale configuration
  const scaleConfig: Partial<ScaleConfig> = useMemo(() => ({
    distanceExponent,
    distanceBaseScale,
  }), [distanceExponent, distanceBaseScale]);

  // Get focused planet's position in context scale
  const focusedPlanetContextPosition = useMemo((): [number, number, number] => {
    if (focusedPlanetId === 'sun') {
      return [0, 0, 0];
    }

    // Use fixed starting angles (same as in getAllPlanetsDisplayData)
    const startAngles: Record<string, number> = {
      mercury: 0,
      venus: Math.PI * 0.7,
      earth: Math.PI * 0.3,
      mars: Math.PI * 1.2,
      jupiter: Math.PI * 0.9,
      saturn: Math.PI * 1.6,
      uranus: Math.PI * 0.5,
      neptune: Math.PI * 1.8,
      moon: Math.PI * 0.3,
    };
    const orbitalSpeeds: Record<string, number> = {
      mercury: 4.15,
      venus: 1.62,
      earth: 1.0,
      mars: 0.53,
      jupiter: 0.084,
      saturn: 0.034,
      uranus: 0.012,
      neptune: 0.006,
      moon: 1.0,
    };

    const startAngle = startAngles[focusedPlanetId] ?? 0;
    const speed = orbitalSpeeds[focusedPlanetId] ?? 1;
    const angle = startAngle + time * speed * 0.1;

    return getPlanetDisplayPosition(focusedPlanetId, angle, scaleConfig);
  }, [focusedPlanetId, time, scaleConfig]);

  // Calculate offset: move context so its focused planet position aligns with orbital position
  // offset = orbitalPosition - contextPosition
  const contextOffset: [number, number, number] = useMemo(() => [
    focusedPlanetOrbitalPosition[0] - focusedPlanetContextPosition[0],
    focusedPlanetOrbitalPosition[1] - focusedPlanetContextPosition[1],
    focusedPlanetOrbitalPosition[2] - focusedPlanetContextPosition[2],
  ], [focusedPlanetOrbitalPosition, focusedPlanetContextPosition]);

  // Get all planet data
  const planetsData = useMemo(() => {
    const includeMoon = focusedPlanetId === 'earth';
    return getAllPlanetsDisplayData(time, scaleConfig, includeMoon);
  }, [time, scaleConfig, focusedPlanetId]);

  // Filter out focused planet and related bodies
  const contextPlanets = useMemo(() => {
    return planetsData.filter(p => {
      // Exclude focused planet
      if (p.id === focusedPlanetId) return false;
      // When viewing Earth, exclude Moon (shown separately)
      if (focusedPlanetId === 'earth' && p.id === 'moon') return false;
      // When viewing Moon, exclude Earth (shown separately as orbiting)
      if (focusedPlanetId === 'moon' && p.id === 'earth') return false;
      return true;
    });
  }, [planetsData, focusedPlanetId]);

  // Calculate orbit radii for rings
  const orbitData = useMemo(() => {
    const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    return planetIds
      .filter(id => id !== focusedPlanetId)
      .map(id => ({
        id,
        radius: auToDisplayDistance(PLANET_AU_DISTANCES[id], scaleConfig),
      }));
  }, [focusedPlanetId, scaleConfig]);

  if (!visible) return null;

  return (
    <group position={contextOffset}>
      {/* Context planets */}
      {contextPlanets.map(planet => (
        <ContextPlanet
          key={planet.id}
          position={planet.position}
          radius={planet.radius}
          color={planet.color}
          planetId={planet.id}
          emissive={planet.id === 'sun'}
          quality={quality}
          useTextures={quality === 'high'}
        />
      ))}

      {/* Subtle orbit rings (centered at sun position in context) */}
      {showOrbits && orbitData.map(orbit => (
        <ContextOrbitRing
          key={`orbit-${orbit.id}`}
          radius={orbit.radius}
          opacity={0.06}
        />
      ))}

      {/* Moon orbit ring when viewing Earth */}
      {showOrbits && focusedPlanetId === 'earth' && (
        <MoonOrbitRing
          earthPosition={focusedPlanetContextPosition}
          radius={2.5}
          opacity={0.04}
        />
      )}

      {/* Ambient light for context planets */}
      <ambientLight intensity={0.3} />
    </group>
  );
}

/**
 * Hook to get the focused planet's position in the context scale
 */
export function useContextPosition(
  planetId: string,
  time: number = 0,
  distanceExponent: number = 0.5,
  distanceBaseScale: number = 80
): [number, number, number] {
  return useMemo(() => {
    const scaleConfig: Partial<ScaleConfig> = {
      distanceExponent,
      distanceBaseScale,
    };

    const allPlanets = getAllPlanetsDisplayData(time, scaleConfig, false);
    const planet = allPlanets.find(p => p.id === planetId);

    return planet?.position ?? [0, 0, 0];
  }, [planetId, time, distanceExponent, distanceBaseScale]);
}
