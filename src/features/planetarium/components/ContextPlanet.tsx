'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ContextPlanetProps {
  position: [number, number, number];
  radius: number;
  color: string;
  planetId: string;
  emissive?: boolean;
  quality?: 'low' | 'high';
  useTextures?: boolean;
}

/**
 * Textured context planet (higher quality)
 */
function TexturedContextPlanet({
  position,
  radius,
  color,
  planetId,
  emissive = false,
  quality = 'low',
  texturePath,
}: ContextPlanetProps & { texturePath: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(texturePath);

  // Configure texture
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Slow self-rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const segments = quality === 'high' ? 24 : 16;
  const isSun = planetId === 'sun';

  return (
    <group position={position}>
      {/* Main sphere with texture */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        {emissive || isSun ? (
          <meshBasicMaterial map={texture} color="#ffffff" />
        ) : (
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={0.8}
            metalness={0.1}
          />
        )}
      </mesh>

      {/* Glow for sun */}
      {isSun && (
        <>
          <mesh scale={1.3}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial
              color="#FF6B00"
              transparent
              opacity={0.25}
              side={THREE.BackSide}
            />
          </mesh>
          <mesh scale={1.8}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
          {/* Sun light source */}
          <pointLight
            color={color}
            intensity={2}
            distance={600}
            decay={1}
          />
        </>
      )}

      {/* Subtle glow for gas giants */}
      {(planetId === 'jupiter' || planetId === 'saturn') && (
        <mesh scale={1.15}>
          <sphereGeometry args={[radius, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Simple colored context planet (fallback/low quality)
 */
function SimpleContextPlanet({
  position,
  radius,
  color,
  planetId,
  emissive = false,
  quality = 'low',
}: Omit<ContextPlanetProps, 'useTextures'>) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slow self-rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const segments = quality === 'high' ? 16 : 8;
  const isSun = planetId === 'sun';

  return (
    <group position={position}>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        {emissive || isSun ? (
          <meshBasicMaterial color={color} />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={0.8}
            metalness={0.1}
          />
        )}
      </mesh>

      {/* Glow for sun */}
      {isSun && (
        <>
          <mesh scale={1.3}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial
              color="#FF6B00"
              transparent
              opacity={0.25}
              side={THREE.BackSide}
            />
          </mesh>
          <mesh scale={1.8}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
          {/* Sun light source */}
          <pointLight
            color={color}
            intensity={2}
            distance={600}
            decay={1}
          />
        </>
      )}

      {/* Subtle glow for gas giants */}
      {(planetId === 'jupiter' || planetId === 'saturn') && (
        <mesh scale={1.15}>
          <sphereGeometry args={[radius, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
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
 * Context planet mesh for background rendering
 * Supports both textured (high quality) and simple (low quality) modes
 */
export function ContextPlanet(props: ContextPlanetProps) {
  const { planetId, useTextures = true, quality } = props;

  // Use textures for high quality mode (including sun)
  const shouldUseTexture = useTextures && quality === 'high';

  if (!shouldUseTexture) {
    return <SimpleContextPlanet {...props} />;
  }

  const texturePath = `/planetarium/textures/${planetId}_texture.jpg`;
  const fallback = <SimpleContextPlanet {...props} />;

  return (
    <TextureErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <TexturedContextPlanet {...props} texturePath={texturePath} />
      </Suspense>
    </TextureErrorBoundary>
  );
}

/**
 * Context orbit ring - very subtle
 */
export function ContextOrbitRing({
  radius,
  opacity = 0.08,
}: {
  radius: number;
  opacity?: number;
}) {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 64;

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
      color: '#ffffff',
      transparent: true,
      opacity: opacity,
      depthWrite: false,
    });

    return new THREE.Line(geometry, material);
  }, [radius, opacity]);

  return <primitive object={line} />;
}

/**
 * Moon orbit ring around Earth position
 */
export function MoonOrbitRing({
  earthPosition,
  radius = 2.5,
  opacity = 0.04,
}: {
  earthPosition: [number, number, number];
  radius?: number;
  opacity?: number;
}) {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 32;

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
      color: '#aaaaaa',
      transparent: true,
      opacity: opacity,
      depthWrite: false,
    });

    return new THREE.Line(geometry, material);
  }, [radius, opacity]);

  return (
    <group position={earthPosition}>
      <primitive object={line} />
    </group>
  );
}
