'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface MoonProps {
  /** Parent planet's current world position */
  parentPosition: [number, number, number];
  /** Animation time for orbit */
  time: number;
  /** Visual quality */
  quality?: 'low' | 'high';
  /** Click handler */
  onClick?: () => void;
  /** Hover handler */
  onHover?: (hovered: boolean) => void;
  /** Is hovered */
  isHovered?: boolean;
}

// Moon configuration
const MOON_CONFIG = {
  size: 0.12,              // Relative to Earth (actual ratio ~0.27)
  orbitRadius: 0.8,        // Distance from Earth center
  orbitSpeed: 2.5,         // Orbit speed multiplier
  color: '#aaaaaa',        // Fallback gray color
  orbitTilt: 0.09,         // Slight tilt in radians (~5 degrees)
};

/**
 * Moon with texture
 */
function MoonWithTexture({ parentPosition, time, quality = 'low', onClick, onHover, isHovered }: MoonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useTexture('/planetarium/textures/moon_texture.jpg');

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Update moon position (orbiting parent)
  useFrame(() => {
    if (groupRef.current) {
      // Calculate orbit position around parent
      const angle = time * MOON_CONFIG.orbitSpeed;
      const x = parentPosition[0] + Math.cos(angle) * MOON_CONFIG.orbitRadius;
      const y = parentPosition[1] + Math.sin(MOON_CONFIG.orbitTilt) * Math.sin(angle) * MOON_CONFIG.orbitRadius * 0.3;
      const z = parentPosition[2] + Math.sin(angle) * MOON_CONFIG.orbitRadius;

      groupRef.current.position.set(x, y, z);
    }

    // Synchronous rotation (same face always toward Earth)
    if (meshRef.current) {
      meshRef.current.rotation.y = time * MOON_CONFIG.orbitSpeed;
    }
  });

  const segments = quality === 'high' ? 32 : 16;

  return (
    <group ref={groupRef}>
      {/* Moon sphere */}
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
        <sphereGeometry args={[MOON_CONFIG.size, segments, segments]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Subtle glow */}
      <mesh scale={isHovered ? 1.4 : 1.2}>
        <sphereGeometry args={[MOON_CONFIG.size, 16, 16]} />
        <meshBasicMaterial
          color={MOON_CONFIG.color}
          transparent
          opacity={isHovered ? 0.3 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Label on hover */}
      {isHovered && (
        <Html
          position={[0, MOON_CONFIG.size + 0.3, 0]}
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
            Księżyc
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Fallback moon without texture
 */
function MoonFallback({ parentPosition, time, quality = 'low', onClick, onHover, isHovered }: MoonProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const angle = time * MOON_CONFIG.orbitSpeed;
      const x = parentPosition[0] + Math.cos(angle) * MOON_CONFIG.orbitRadius;
      const y = parentPosition[1] + Math.sin(MOON_CONFIG.orbitTilt) * Math.sin(angle) * MOON_CONFIG.orbitRadius * 0.3;
      const z = parentPosition[2] + Math.sin(angle) * MOON_CONFIG.orbitRadius;

      groupRef.current.position.set(x, y, z);
    }
  });

  const segments = quality === 'high' ? 32 : 16;

  return (
    <group ref={groupRef}>
      <mesh
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
        <sphereGeometry args={[MOON_CONFIG.size, segments, segments]} />
        <meshStandardMaterial
          color={MOON_CONFIG.color}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {isHovered && (
        <Html
          position={[0, MOON_CONFIG.size + 0.3, 0]}
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
            Księżyc
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Moon component that orbits around a parent planet (Earth)
 */
export function Moon(props: MoonProps) {
  return (
    <Suspense fallback={<MoonFallback {...props} />}>
      <MoonWithTexture {...props} />
    </Suspense>
  );
}

/**
 * Preload moon texture
 */
export function preloadMoonTexture() {
  useTexture.preload('/planetarium/textures/moon_texture.jpg');
}

/**
 * Export config for external use
 */
export { MOON_CONFIG };
