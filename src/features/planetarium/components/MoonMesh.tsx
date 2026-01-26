'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetAssetConfig, QualityLevel } from '../planetarium.types';

interface MoonMeshProps {
  assets: PlanetAssetConfig;
  autoRotate: boolean;
  rotationSpeed: number;
  quality: QualityLevel;
}

/**
 * Moon mesh with texture
 */
function MoonMeshWithTexture({ assets, autoRotate, rotationSpeed, quality }: MoonMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useTexture('/planetarium/textures/moon_texture.jpg');

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
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, tiltRadians]} scale={assets.scale}>
      <sphereGeometry args={[1, segments, segments]} />
      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
}

/**
 * Fallback moon without texture
 */
function MoonMeshFallback({ assets, autoRotate, rotationSpeed, quality }: MoonMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tiltRadians = THREE.MathUtils.degToRad(assets.tilt);
  const segments = quality === 'high' ? 64 : 32;

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += assets.rotationSpeed * rotationSpeed * delta * 50;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, tiltRadians]} scale={assets.scale}>
      <sphereGeometry args={[1, segments, segments]} />
      <meshStandardMaterial
        color="#aaaaaa"
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
}

/**
 * Main MoonMesh component for detailed view
 */
export function MoonMesh(props: MoonMeshProps) {
  return (
    <Suspense fallback={<MoonMeshFallback {...props} />}>
      <MoonMeshWithTexture {...props} />
    </Suspense>
  );
}

/**
 * Preload moon texture
 */
export function preloadMoonDetailTexture() {
  useTexture.preload('/planetarium/textures/moon_texture.jpg');
}
