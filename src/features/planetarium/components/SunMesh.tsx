'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetAssetConfig, QualityLevel } from '../planetarium.types';

interface SunMeshProps {
  assets: PlanetAssetConfig;
  autoRotate: boolean;
  rotationSpeed: number;
  quality: QualityLevel;
}

/**
 * Sun mesh with texture - special emissive rendering
 */
function SunMeshWithTexture({ assets, autoRotate, rotationSpeed, quality }: SunMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  const texture = useTexture('/planetarium/textures/sun_texture.jpg');

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  const tiltRadians = THREE.MathUtils.degToRad(assets.tilt);
  const segments = quality === 'high' ? 64 : 32;

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += assets.rotationSpeed * rotationSpeed * delta * 50;
    }

    // Animate corona
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.05;
    }

    // Pulsing glow
    if (glowRef.current) {
      const time = Date.now() * 0.001;
      const scale = assets.scale * 1.3 + Math.sin(time * 0.5) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group rotation={[0, 0, tiltRadians]}>
      {/* Core sun sphere */}
      <mesh ref={meshRef} scale={assets.scale}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshBasicMaterial map={texture} color="#ffffff" />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef} scale={assets.scale * 1.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FF6B00"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona */}
      <mesh ref={coronaRef} scale={assets.scale * 1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outermost glow */}
      <mesh scale={assets.scale * 2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Fallback sun without texture
 */
function SunMeshFallback({ assets, autoRotate, rotationSpeed, quality }: SunMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tiltRadians = THREE.MathUtils.degToRad(assets.tilt);
  const segments = quality === 'high' ? 64 : 32;

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += assets.rotationSpeed * rotationSpeed * delta * 50;
    }
  });

  return (
    <group rotation={[0, 0, tiltRadians]}>
      <mesh ref={meshRef} scale={assets.scale}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>

      <mesh scale={assets.scale * 1.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FF6B00"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Main SunMesh component for detailed view
 */
export function SunMesh(props: SunMeshProps) {
  return (
    <Suspense fallback={<SunMeshFallback {...props} />}>
      <SunMeshWithTexture {...props} />
    </Suspense>
  );
}

/**
 * Preload sun texture
 */
export function preloadSunDetailTexture() {
  useTexture.preload('/planetarium/textures/sun_texture.jpg');
}
