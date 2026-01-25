'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BACKGROUND_TEXTURE } from '../planetarium.assets';

/**
 * Starfield background using stars_background.jpg texture
 * Falls back to a dark gradient if texture fails to load
 */
export function StarfieldBackground() {
  const { scene, gl } = useThree();

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load(
      BACKGROUND_TEXTURE,
      (texture) => {
        // Configure texture for spherical background
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.mapping = THREE.EquirectangularReflectionMapping;

        // Set as scene background
        scene.background = texture;
      },
      undefined,
      (error) => {
        console.warn('Failed to load background texture, using fallback:', error);
        // Fallback: dark gradient color
        scene.background = new THREE.Color('#050510');
      }
    );

    // Cleanup
    return () => {
      if (scene.background instanceof THREE.Texture) {
        scene.background.dispose();
      }
      scene.background = null;
    };
  }, [scene, gl]);

  return null;
}
