'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetPosition } from '../data/solarSystemLayout';
import { calculatePlanetWorldPosition } from '../data/solarSystemLayout';

interface SolarSystemPlanetProps {
  planet: PlanetPosition;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  time?: number;
  quality?: 'low' | 'high';
}

/**
 * Inner component that uses useTexture (which suspends)
 */
function PlanetWithTexture({
  planet,
  isSelected,
  isHovered,
  onClick,
  onHover,
  time,
  quality,
  texturePath,
}: SolarSystemPlanetProps & { texturePath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const highlightRef = useRef<THREE.Mesh>(null);

  // Load texture using drei's useTexture (handles caching automatically)
  const texture = useTexture(texturePath);

  // Configure texture
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Update position based on orbit
  useFrame(() => {
    if (groupRef.current) {
      const [x, y, z] = calculatePlanetWorldPosition(planet, time || 0);
      groupRef.current.position.set(x, y, z);
    }

    // Subtle highlight ring on hover only (planets don't glow)
    if (highlightRef.current) {
      const material = highlightRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = isHovered || isSelected ? 0.35 : 0;
      material.opacity += (targetOpacity - material.opacity) * 0.15;
    }

    // Animate planet scale on hover
    if (meshRef.current) {
      const targetScale = isHovered ? 1.15 : 1;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      meshRef.current.scale.setScalar(newScale);
    }
  });

  const segments = quality === 'high' ? 32 : 16;

  return (
    <group ref={groupRef}>
      {/* Subtle highlight ring - only visible on hover */}
      <mesh ref={highlightRef} scale={1.25}>
        <ringGeometry args={[planet.size * 0.95, planet.size * 1.1, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onHover?.(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
          onHover?.(false);
        }}
      >
        <sphereGeometry args={[planet.size, segments, segments]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Label (shown on hover) */}
      {(isHovered || isSelected) && (
        <Html
          position={[0, planet.size + 0.8, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              transform: 'translateY(-50%)',
            }}
          >
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Fallback component when texture is loading or failed
 */
function PlanetFallback({
  planet,
  isSelected,
  isHovered,
  onClick,
  onHover,
  time,
  quality,
}: SolarSystemPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const highlightRef = useRef<THREE.Mesh>(null);

  // Update position based on orbit
  useFrame(() => {
    if (groupRef.current) {
      const [x, y, z] = calculatePlanetWorldPosition(planet, time || 0);
      groupRef.current.position.set(x, y, z);
    }

    // Subtle highlight ring on hover only
    if (highlightRef.current) {
      const material = highlightRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = isHovered || isSelected ? 0.35 : 0;
      material.opacity += (targetOpacity - material.opacity) * 0.15;
    }

    if (meshRef.current) {
      const targetScale = isHovered ? 1.15 : 1;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      meshRef.current.scale.setScalar(newScale);
    }
  });

  const segments = quality === 'high' ? 32 : 16;
  const planetColor = new THREE.Color(planet.color);

  return (
    <group ref={groupRef}>
      {/* Subtle highlight ring - only visible on hover */}
      <mesh ref={highlightRef} scale={1.25}>
        <ringGeometry args={[planet.size * 0.95, planet.size * 1.1, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onHover?.(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
          onHover?.(false);
        }}
      >
        <sphereGeometry args={[planet.size, segments, segments]} />
        <meshStandardMaterial
          color={planetColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {(isHovered || isSelected) && (
        <Html
          position={[0, planet.size + 0.8, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              transform: 'translateY(-50%)',
            }}
          >
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Error boundary for texture loading
 */
class TextureErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Planet marker in the solar system overview
 * Shows simplified sphere with hover effects and label
 */
export function SolarSystemPlanet(props: SolarSystemPlanetProps) {
  const { planet } = props;
  const texturePath = `/planetarium/textures/${planet.id}_texture.jpg`;

  return (
    <TextureErrorBoundary fallback={<PlanetFallback {...props} />}>
      <Suspense fallback={<PlanetFallback {...props} />}>
        <PlanetWithTexture {...props} texturePath={texturePath} />
      </Suspense>
    </TextureErrorBoundary>
  );
}

/**
 * Preload all planet textures for the overview
 */
export function preloadOverviewTextures() {
  const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  // Preload using drei's useTexture.preload
  planetIds.forEach(id => {
    const texturePath = `/planetarium/textures/${id}_texture.jpg`;
    useTexture.preload(texturePath);
  });
}
