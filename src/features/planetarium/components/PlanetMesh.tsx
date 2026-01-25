'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetInfo, PlanetAssetConfig, QualityLevel } from '../planetarium.types';
import { FALLBACK_COLORS } from '../planetarium.assets';

interface PlanetMeshProps {
  planet: PlanetInfo;
  assets: PlanetAssetConfig;
  autoRotate: boolean;
  rotationSpeed: number;
  quality: QualityLevel;
}

/**
 * GLB Model renderer for planets
 */
function GLBPlanet({
  glbFile,
  scale,
  tiltRadians,
  autoRotate,
  rotationSpeed,
  assetRotationSpeed,
}: {
  glbFile: string;
  scale: number;
  tiltRadians: number;
  autoRotate: boolean;
  rotationSpeed: number;
  assetRotationSpeed: number;
}) {
  const { scene } = useGLTF(glbFile);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += assetRotationSpeed * rotationSpeed * delta * 50;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, tiltRadians]} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
}

/**
 * Texture-based sphere renderer for planets
 */
function TexturePlanet({
  planet,
  assets,
  autoRotate,
  rotationSpeed,
  quality,
}: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const segments = quality === 'high' ? 64 : 32;

  // State for textures
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [normalMap, setNormalMap] = useState<THREE.Texture | null>(null);
  const [emissiveMap, setEmissiveMap] = useState<THREE.Texture | null>(null);

  // Apply axial tilt
  const tiltRadians = THREE.MathUtils.degToRad(assets.tilt);
  const fallbackColor = FALLBACK_COLORS[planet.id] || planet.color;

  // Load main texture
  useEffect(() => {
    let isMounted = true;
    setTexture(null);

    if (!assets.textureFile) {
      return;
    }

    const loader = new THREE.TextureLoader();

    loader.load(
      assets.textureFile,
      (loadedTexture) => {
        if (isMounted) {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          loadedTexture.needsUpdate = true;
          setTexture(loadedTexture);
        }
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture for ${planet.id}:`, error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [assets.textureFile, planet.id]);

  // Load normal map
  useEffect(() => {
    let isMounted = true;
    setNormalMap(null);

    if (!assets.normalMapFile) {
      return;
    }

    const loader = new THREE.TextureLoader();

    loader.load(
      assets.normalMapFile,
      (loadedTexture) => {
        if (isMounted) {
          loadedTexture.needsUpdate = true;
          setNormalMap(loadedTexture);
        }
      },
      undefined,
      (error) => {
        console.warn(`Failed to load normal map for ${planet.id}:`, error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [assets.normalMapFile, planet.id]);

  // Load emissive map (night lights for Earth)
  useEffect(() => {
    let isMounted = true;
    setEmissiveMap(null);

    if (!assets.emissiveMapFile) {
      return;
    }

    const loader = new THREE.TextureLoader();

    loader.load(
      assets.emissiveMapFile,
      (loadedTexture) => {
        if (isMounted) {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          loadedTexture.needsUpdate = true;
          setEmissiveMap(loadedTexture);
        }
      },
      undefined,
      (error) => {
        console.warn(`Failed to load emissive map for ${planet.id}:`, error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [assets.emissiveMapFile, planet.id]);

  // Update material when textures change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.map = texture;
      materialRef.current.normalMap = normalMap;
      materialRef.current.emissiveMap = emissiveMap;
      materialRef.current.emissive = emissiveMap
        ? new THREE.Color(0xffffcc)
        : new THREE.Color(0x000000);
      materialRef.current.emissiveIntensity = emissiveMap ? 0.3 : 0;
      materialRef.current.color.set(texture ? 0xffffff : fallbackColor);
      materialRef.current.normalScale.set(normalMap ? 0.5 : 0, normalMap ? 0.5 : 0);
      materialRef.current.needsUpdate = true;
    }
  }, [texture, normalMap, emissiveMap, fallbackColor]);

  // Rotation animation
  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += assets.rotationSpeed * rotationSpeed * delta * 50;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, tiltRadians]} scale={assets.scale}>
      <sphereGeometry args={[1, segments, segments]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.5, 0.5)}
        emissiveMap={emissiveMap}
        emissive={emissiveMap ? 0xffffcc : 0x000000}
        emissiveIntensity={emissiveMap ? 0.3 : 0}
        color={texture ? 0xffffff : fallbackColor}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

export function PlanetMesh(props: PlanetMeshProps) {
  const { assets, autoRotate, rotationSpeed } = props;
  const [glbFailed, setGlbFailed] = useState(false);

  // Try GLB first if available
  if (assets.renderMode === 'glb' && assets.glbFile && !glbFailed) {
    return (
      <Suspense fallback={<TexturePlanet {...props} />}>
        <GLBPlanetWithFallback
          glbFile={assets.glbFile}
          scale={assets.scale}
          tiltRadians={THREE.MathUtils.degToRad(assets.tilt)}
          autoRotate={autoRotate}
          rotationSpeed={rotationSpeed}
          assetRotationSpeed={assets.rotationSpeed}
          onError={() => setGlbFailed(true)}
          fallback={<TexturePlanet {...props} />}
        />
      </Suspense>
    );
  }

  // Default to texture-based rendering
  return <TexturePlanet {...props} />;
}

/**
 * GLB loader with error boundary-like behavior
 */
function GLBPlanetWithFallback({
  glbFile,
  scale,
  tiltRadians,
  autoRotate,
  rotationSpeed,
  assetRotationSpeed,
  onError,
  fallback,
}: {
  glbFile: string;
  scale: number;
  tiltRadians: number;
  autoRotate: boolean;
  rotationSpeed: number;
  assetRotationSpeed: number;
  onError: () => void;
  fallback: React.ReactNode;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Preload and check if file exists
    useGLTF.preload(glbFile);
  }, [glbFile]);

  if (hasError) {
    return <>{fallback}</>;
  }

  try {
    return (
      <GLBPlanet
        glbFile={glbFile}
        scale={scale}
        tiltRadians={tiltRadians}
        autoRotate={autoRotate}
        rotationSpeed={rotationSpeed}
        assetRotationSpeed={assetRotationSpeed}
      />
    );
  } catch {
    setHasError(true);
    onError();
    return <>{fallback}</>;
  }
}
