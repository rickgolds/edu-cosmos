'use client';

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { PlanetInfo, PlanetAssetConfig, QualityLevel } from '../planetarium.types';
import { FALLBACK_COLORS, getGlbPath } from '../planetarium.assets';

interface PlanetMeshProps {
  planet: PlanetInfo;
  assets: PlanetAssetConfig;
  autoRotate: boolean;
  rotationSpeed: number;
  quality: QualityLevel;
}

/**
 * GLB Model renderer for planets
 * Normalizes the model to fit within expected bounds
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
  const gltf = useLoader(GLTFLoader, glbFile);
  const groupRef = useRef<THREE.Group>(null);

  // Clone and normalize the scene
  const normalizedScene = useMemo(() => {
    const cloned = gltf.scene.clone();

    // Calculate bounding box to normalize scale
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Normalize to unit size (diameter = 2, like our sphere)
    if (maxDim > 0) {
      const normalizeScale = 2 / maxDim;
      cloned.scale.multiplyScalar(normalizeScale);
    }

    // Center the model
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center.multiplyScalar(cloned.scale.x));

    console.log(`[GLB] Loaded ${glbFile}, original size:`, size, 'normalized scale:', cloned.scale);

    return cloned;
  }, [gltf.scene, glbFile]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += assetRotationSpeed * rotationSpeed * delta * 50;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, tiltRadians]} scale={scale}>
      <primitive object={normalizedScene} />
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

  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [normalMap, setNormalMap] = useState<THREE.Texture | null>(null);
  const [emissiveMap, setEmissiveMap] = useState<THREE.Texture | null>(null);

  const tiltRadians = THREE.MathUtils.degToRad(assets.tilt);
  const fallbackColor = FALLBACK_COLORS[planet.id] || planet.color;

  // Load main texture
  useEffect(() => {
    let isMounted = true;
    setTexture(null);

    if (!assets.textureFile) return;

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
      (error) => console.error(`Failed to load texture for ${planet.id}:`, error)
    );

    return () => { isMounted = false; };
  }, [assets.textureFile, planet.id]);

  // Load normal map
  useEffect(() => {
    let isMounted = true;
    setNormalMap(null);

    if (!assets.normalMapFile) return;

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
      (error) => console.warn(`Failed to load normal map for ${planet.id}:`, error)
    );

    return () => { isMounted = false; };
  }, [assets.normalMapFile, planet.id]);

  // Load emissive map
  useEffect(() => {
    let isMounted = true;
    setEmissiveMap(null);

    if (!assets.emissiveMapFile) return;

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
      (error) => console.warn(`Failed to load emissive map for ${planet.id}:`, error)
    );

    return () => { isMounted = false; };
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

/**
 * Main PlanetMesh component with auto GLB detection
 */
export function PlanetMesh(props: PlanetMeshProps) {
  const { planet, assets, autoRotate, rotationSpeed } = props;
  const [glbStatus, setGlbStatus] = useState<'checking' | 'found' | 'not-found' | 'error'>('checking');

  const glbPath = getGlbPath(planet.id);

  // Check if GLB exists
  useEffect(() => {
    setGlbStatus('checking');

    fetch(glbPath, { method: 'HEAD' })
      .then((response) => {
        if (response.ok) {
          console.log(`[GLB] Found model for ${planet.id}: ${glbPath}`);
          setGlbStatus('found');
        } else {
          console.log(`[GLB] No model for ${planet.id}, using textures`);
          setGlbStatus('not-found');
        }
      })
      .catch(() => {
        setGlbStatus('not-found');
      });
  }, [glbPath, planet.id]);

  // While checking or if not found, use textures
  if (glbStatus === 'checking' || glbStatus === 'not-found') {
    return <TexturePlanet {...props} />;
  }

  // GLB found - try to load it with fallback
  if (glbStatus === 'found') {
    return (
      <Suspense fallback={<TexturePlanet {...props} />}>
        <GLBWithFallback
          glbPath={glbPath}
          scale={assets.scale}
          tiltRadians={THREE.MathUtils.degToRad(assets.tilt)}
          autoRotate={autoRotate}
          rotationSpeed={rotationSpeed}
          assetRotationSpeed={assets.rotationSpeed}
          onError={() => setGlbStatus('error')}
        />
      </Suspense>
    );
  }

  // Error loading GLB - use textures
  return <TexturePlanet {...props} />;
}

/**
 * GLB loader with error callback
 */
function GLBWithFallback({
  glbPath,
  scale,
  tiltRadians,
  autoRotate,
  rotationSpeed,
  assetRotationSpeed,
  onError,
}: {
  glbPath: string;
  scale: number;
  tiltRadians: number;
  autoRotate: boolean;
  rotationSpeed: number;
  assetRotationSpeed: number;
  onError: () => void;
}) {
  useEffect(() => {
    // Set up error handler for loader
    const handleError = () => {
      console.error(`[GLB] Failed to load: ${glbPath}`);
      onError();
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [glbPath, onError]);

  return (
    <GLBPlanet
      glbFile={glbPath}
      scale={scale}
      tiltRadians={tiltRadians}
      autoRotate={autoRotate}
      rotationSpeed={rotationSpeed}
      assetRotationSpeed={assetRotationSpeed}
    />
  );
}
