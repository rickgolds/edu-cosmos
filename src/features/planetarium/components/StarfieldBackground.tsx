'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BACKGROUND_TEXTURE } from '../planetarium.assets';

// Global texture cache - shared across all instances
let cachedTexture: THREE.Texture | null = null;
let isLoading = false;

/**
 * Starfield background using stars_background.jpg texture
 * Uses a global cache to prevent flickering on re-renders
 */
export function StarfieldBackground() {
  const { scene } = useThree();
  const appliedRef = useRef(false);

  useEffect(() => {
    // If we already have cached texture, apply it immediately
    if (cachedTexture) {
      scene.background = cachedTexture;
      appliedRef.current = true;
      return;
    }

    // If already loading, wait for it
    if (isLoading) {
      const checkInterval = setInterval(() => {
        if (cachedTexture) {
          scene.background = cachedTexture;
          appliedRef.current = true;
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    // Start loading
    isLoading = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      BACKGROUND_TEXTURE,
      (texture) => {
        // Configure texture for spherical background
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.mapping = THREE.EquirectangularReflectionMapping;

        // Cache it globally
        cachedTexture = texture;
        isLoading = false;

        // Apply to scene
        scene.background = texture;
        appliedRef.current = true;
      },
      undefined,
      (error) => {
        console.warn('Failed to load background texture, using fallback:', error);
        isLoading = false;
        // Fallback: dark color
        scene.background = new THREE.Color('#050510');
      }
    );

    // NO cleanup - we want the background to persist
  }, [scene]);

  // Ensure background is always applied when component is mounted
  useEffect(() => {
    if (cachedTexture && !appliedRef.current) {
      scene.background = cachedTexture;
      appliedRef.current = true;
    }
  });

  return null;
}
