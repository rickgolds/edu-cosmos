'use client';

import { useState, useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sun } from './Sun';
import { OrbitRing } from './OrbitRing';
import { SolarSystemPlanet } from './SolarSystemPlanet';
import { Moon } from './Moon';
import { PLANET_POSITIONS, calculatePlanetWorldPosition } from '../data/solarSystemLayout';

interface SolarSystemSceneProps {
  onPlanetSelect: (planetId: string) => void;
  visible: boolean;
  quality?: 'low' | 'high';
  orbitTime: number;
  onOrbitTimeUpdate: (delta: number) => void;
  isTransitioning?: boolean;
}

/**
 * Solar System Overview Scene
 * Top-down view of the entire solar system
 */
export function SolarSystemScene({
  onPlanetSelect,
  visible,
  quality = 'low',
  orbitTime,
  onOrbitTimeUpdate,
  isTransitioning = false,
}: SolarSystemSceneProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // Animate planet positions (very slow orbit) - update global time
  // STOP updating during transitions so planets don't move while camera is flying
  useFrame((_, delta) => {
    if (visible && !isTransitioning) {
      onOrbitTimeUpdate(delta);
    }
  });

  const handlePlanetHover = useCallback((planetId: string, hovered: boolean) => {
    setHoveredPlanet(hovered ? planetId : null);
  }, []);

  // Get Earth's position for Moon orbit
  const earthData = useMemo(() => PLANET_POSITIONS.find(p => p.id === 'earth'), []);
  const earthPosition = useMemo(() => {
    if (!earthData) return [0, 0, 0] as [number, number, number];
    return calculatePlanetWorldPosition(earthData, orbitTime);
  }, [earthData, orbitTime]);

  if (!visible) return null;

  return (
    <group>
      {/* Sun at center */}
      <Sun
        onClick={() => onPlanetSelect('sun')}
        onHover={(hovered) => handlePlanetHover('sun', hovered)}
        isHovered={hoveredPlanet === 'sun'}
      />

      {/* Orbit rings */}
      {PLANET_POSITIONS.map((planet) => (
        <OrbitRing
          key={`orbit-${planet.id}`}
          radius={planet.orbitRadius}
          isHighlighted={hoveredPlanet === planet.id}
        />
      ))}

      {/* Planets */}
      {PLANET_POSITIONS.map((planet) => (
        <SolarSystemPlanet
          key={planet.id}
          planet={planet}
          isHovered={hoveredPlanet === planet.id}
          onClick={() => onPlanetSelect(planet.id)}
          onHover={(hovered) => handlePlanetHover(planet.id, hovered)}
          time={orbitTime}
          quality={quality}
        />
      ))}

      {/* Moon orbiting Earth */}
      <Moon
        parentPosition={earthPosition}
        time={orbitTime}
        quality={quality}
        onClick={() => onPlanetSelect('moon')}
        onHover={(hovered) => handlePlanetHover('moon', hovered)}
        isHovered={hoveredPlanet === 'moon'}
      />

      {/* Ambient light so planets are visible from above */}
      <ambientLight intensity={0.8} />

      {/* Directional light from above for visibility */}
      <directionalLight
        position={[0, 50, 0]}
        intensity={1}
        color="#ffffff"
      />

      {/* Point light from sun position to illuminate planets */}
      <pointLight
        position={[0, 2, 0]}
        intensity={3}
        color="#FDB813"
        distance={150}
        decay={0.5}
      />
    </group>
  );
}
