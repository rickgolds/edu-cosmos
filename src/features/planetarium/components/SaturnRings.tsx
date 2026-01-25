'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel, RingsConfig } from '../planetarium.types';

interface SaturnRingsProps {
  config: RingsConfig;
  planetScale: number;
  quality: QualityLevel;
}

/**
 * Planet rings component (Saturn, Uranus, etc.)
 * Uses RingGeometry with proper UV mapping for texture
 */
export function SaturnRings({ config, planetScale, quality }: SaturnRingsProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  const segments = quality === 'high' ? 128 : 64;

  // Calculate actual radii based on planet scale
  const innerRadius = config.innerRadius * planetScale;
  const outerRadius = config.outerRadius * planetScale;

  // Load texture manually for better control
  useEffect(() => {
    let isMounted = true;

    if (!config.textureFile) {
      return;
    }

    const loader = new THREE.TextureLoader();

    loader.load(
      config.textureFile,
      (loadedTexture) => {
        if (isMounted) {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          // Ring texture should repeat along the ring
          loadedTexture.wrapS = THREE.RepeatWrapping;
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.rotation = Math.PI / 2;
          loadedTexture.needsUpdate = true;
          setTexture(loadedTexture);
        }
      },
      undefined,
      (error) => {
        console.warn('Failed to load ring texture:', error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [config.textureFile]);

  // Very slow rotation for visual interest
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.002;
    }
  });

  // Ring should lie flat (XZ plane) then tilt with the planet
  const tiltRadians = THREE.MathUtils.degToRad(config.tilt);

  return (
    <group rotation={[tiltRadians, 0, 0]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, segments, 1]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            side={THREE.DoubleSide}
            transparent
            opacity={config.opacity}
            roughness={0.7}
            metalness={0.1}
            alphaTest={0.01}
          />
        ) : (
          <meshStandardMaterial
            color="#c9b896"
            side={THREE.DoubleSide}
            transparent
            opacity={config.opacity * 0.8}
            roughness={0.5}
          />
        )}
      </mesh>
    </group>
  );
}

// Legacy props interface for backwards compatibility
interface LegacySaturnRingsProps {
  textureFile: string;
  innerRadius: number;
  outerRadius: number;
  tilt: number;
  quality: QualityLevel;
}

export function LegacySaturnRings({
  textureFile,
  innerRadius,
  outerRadius,
  tilt,
  quality,
}: LegacySaturnRingsProps) {
  const config: RingsConfig = {
    enabled: true,
    textureFile,
    innerRadius,
    outerRadius,
    opacity: 0.85,
    tilt,
  };

  return <SaturnRings config={config} planetScale={1} quality={quality} />;
}
