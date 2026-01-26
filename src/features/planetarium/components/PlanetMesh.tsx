'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { PlanetInfo, PlanetAssetConfig, QualityLevel } from '../planetarium.types';
import { FALLBACK_COLORS, getGlbPath } from '../planetarium.assets';

// Cache for preloaded GLB status
const glbPreloadCache = new Map<string, 'loading' | 'loaded' | 'error'>();
const glbCache = new Map<string, THREE.Group>();

// Celestial bodies that have GLB models available (to avoid 404 requests)
const PLANETS_WITH_GLB: string[] = [
  'sun',       // 40MB - detailed model
  // 'moon',      // 20MB - detailed model
  'earth',     // 62MB - detailed model
  'mars',      // 14MB - detailed model
  'neptune',   // 8MB
  'saturn',    // 3MB
  'uranus',    // 1MB
];

// Check if a planet has a GLB model
export function hasGlbModel(planetId: string): boolean {
  return PLANETS_WITH_GLB.includes(planetId);
}

// Preload planet GLB files (only for planets that have them)
export function preloadPlanetModels() {
  const loader = new GLTFLoader();

  PLANETS_WITH_GLB.forEach(planetId => {
    const glbPath = getGlbPath(planetId);

    if (glbPreloadCache.has(glbPath)) return;

    glbPreloadCache.set(glbPath, 'loading');

    // Load the GLB file
    loader.load(
      glbPath,
      (gltf) => {
        glbCache.set(glbPath, gltf.scene);
        glbPreloadCache.set(glbPath, 'loaded');
        console.log(`[GLB] Preloaded: ${planetId}`);
      },
      undefined,
      () => {
        glbPreloadCache.set(glbPath, 'error');
        console.warn(`[GLB] Failed to load: ${planetId}`);
      }
    );
  });
}

interface PlanetMeshProps {
  planet: PlanetInfo;
  assets: PlanetAssetConfig;
  autoRotate: boolean;
  rotationSpeed: number;
  quality: QualityLevel;
}

/**
 * GLB Model renderer for planets
 * Uses cached models when available for better performance
 */
function GLBPlanet({
  glbFile,
  scale,
  tiltRadians,
  autoRotate,
  rotationSpeed,
  assetRotationSpeed,
  _useCached = false,
}: {
  glbFile: string;
  scale: number;
  tiltRadians: number;
  autoRotate: boolean;
  rotationSpeed: number;
  assetRotationSpeed: number;
  _useCached?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);

  // Try to use cached model first, otherwise load
  useEffect(() => {
    const cached = glbCache.get(glbFile);
    if (cached) {
      setScene(cached.clone());
      return;
    }

    // Load if not cached
    const loader = new GLTFLoader();
    loader.load(
      glbFile,
      (gltf) => {
        glbCache.set(glbFile, gltf.scene);
        setScene(gltf.scene.clone());
      },
      undefined,
      (error) => console.error(`[GLB] Failed to load: ${glbFile}`, error)
    );
  }, [glbFile]);

  // Clone and normalize the scene
  const normalizedScene = useMemo(() => {
    if (!scene) return null;

    const cloned = scene.clone();

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

    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += assetRotationSpeed * rotationSpeed * delta * 50;
    }
  });

  if (!normalizedScene) return null;

  return (
    <group ref={groupRef} rotation={[0, 0, tiltRadians]} scale={scale}>
      <primitive object={normalizedScene} />
    </group>
  );
}

/**
 * Emissive (self-illuminated) sphere renderer for objects like the Sun
 */
function EmissivePlanet({
  planet,
  assets,
  autoRotate,
  rotationSpeed,
  quality,
}: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const segments = quality === 'high' ? 64 : 32;

  const [texture, setTexture] = useState<THREE.Texture | null>(null);
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

  // Update material when texture changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.map = texture;
      materialRef.current.color.set(texture ? '#ffffff' : fallbackColor);
      materialRef.current.needsUpdate = true;
    }
  }, [texture, fallbackColor]);

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += assets.rotationSpeed * rotationSpeed * delta * 50;
    }
    // Animate glow
    if (glowRef.current) {
      glowRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, tiltRadians]}>
      {/* Main sphere with texture - self illuminated */}
      <mesh ref={meshRef} scale={assets.scale}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          color={fallbackColor}
        />
      </mesh>

      {/* Inner glow */}
      <mesh scale={assets.scale * 1.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FF6B00"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona */}
      <mesh ref={glowRef} scale={assets.scale * 1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={fallbackColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
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
 * Get the appropriate texture-based component
 */
function getTextureComponent(props: PlanetMeshProps) {
  // Use emissive rendering for self-illuminated objects like the Sun
  if (props.assets.emissive) {
    return <EmissivePlanet {...props} />;
  }
  return <TexturePlanet {...props} />;
}

/**
 * Main PlanetMesh component
 * Uses GLB models for planets that have them, textures for others
 */
export function PlanetMesh(props: PlanetMeshProps) {
  const { planet, assets, autoRotate, rotationSpeed } = props;

  // Check if this planet has a GLB model (no network request needed)
  const planetHasGlb = hasGlbModel(planet.id);

  // If planet doesn't have GLB, use textures immediately
  if (!planetHasGlb) {
    return getTextureComponent(props);
  }

  // Check cache status for GLB
  const glbPath = getGlbPath(planet.id);
  const cacheStatus = glbPreloadCache.get(glbPath);

  // If GLB is loaded, use it
  if (cacheStatus === 'loaded') {
    return (
      <GLBPlanet
        glbFile={glbPath}
        scale={assets.scale}
        tiltRadians={THREE.MathUtils.degToRad(assets.tilt)}
        autoRotate={autoRotate}
        rotationSpeed={rotationSpeed}
        assetRotationSpeed={assets.rotationSpeed}
        _useCached={true}
      />
    );
  }

  // If GLB failed to load or still loading, use textures as fallback
  return getTextureComponent(props);
}
