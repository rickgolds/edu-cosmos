'use client';

import { useRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easeInOutCubic, lerpVector3, type EasingFunction } from './easing';

/**
 * Camera animation target
 */
export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

/**
 * Animation state
 */
interface AnimationState {
  isAnimating: boolean;
  startTime: number;
  duration: number;
  from: CameraTarget;
  to: CameraTarget;
  easing: EasingFunction;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

/**
 * Hook for smooth camera animations
 */
export function useCameraAnimation() {
  const animationRef = useRef<AnimationState | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  /**
   * Start a camera animation
   */
  const animateTo = useCallback((
    target: CameraTarget,
    options: {
      duration?: number;
      easing?: EasingFunction;
      onProgress?: (progress: number) => void;
      onComplete?: () => void;
    } = {}
  ) => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const {
      duration = 2000,
      easing = easeInOutCubic,
      onProgress,
      onComplete,
    } = options;

    // Capture current camera state
    const from: CameraTarget = {
      position: [camera.position.x, camera.position.y, camera.position.z],
      lookAt: [0, 0, 0], // Will be calculated from current orientation
      fov: camera.fov,
    };

    // Calculate current lookAt from camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const lookAtPoint = camera.position.clone().add(direction.multiplyScalar(10));
    from.lookAt = [lookAtPoint.x, lookAtPoint.y, lookAtPoint.z];

    animationRef.current = {
      isAnimating: true,
      startTime: performance.now(),
      duration,
      from,
      to: target,
      easing,
      onProgress,
      onComplete,
    };
  }, []);

  /**
   * Stop current animation
   */
  const stopAnimation = useCallback(() => {
    animationRef.current = null;
  }, []);

  /**
   * Check if currently animating
   */
  const isAnimating = useCallback(() => {
    return animationRef.current?.isAnimating ?? false;
  }, []);

  /**
   * Set camera position immediately (no animation)
   */
  const setPosition = useCallback((target: CameraTarget) => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    camera.position.set(...target.position);
    camera.lookAt(...target.lookAt);
    if (target.fov) {
      camera.fov = target.fov;
      camera.updateProjectionMatrix();
    }
  }, []);

  /**
   * Frame update - call this in useFrame
   */
  useFrame(() => {
    const animation = animationRef.current;
    const camera = cameraRef.current;

    if (!animation || !animation.isAnimating || !camera) return;

    const elapsed = performance.now() - animation.startTime;
    const rawProgress = Math.min(elapsed / animation.duration, 1);
    const easedProgress = animation.easing(rawProgress);

    // Interpolate position
    const newPosition = lerpVector3(
      animation.from.position,
      animation.to.position,
      easedProgress
    );
    camera.position.set(...newPosition);

    // Interpolate lookAt
    const newLookAt = lerpVector3(
      animation.from.lookAt,
      animation.to.lookAt,
      easedProgress
    );
    camera.lookAt(...newLookAt);

    // Interpolate FOV if specified
    if (animation.from.fov && animation.to.fov) {
      const newFov = animation.from.fov + (animation.to.fov - animation.from.fov) * easedProgress;
      camera.fov = newFov;
      camera.updateProjectionMatrix();
    }

    // Call progress callback
    animation.onProgress?.(rawProgress);

    // Check if complete
    if (rawProgress >= 1) {
      animation.isAnimating = false;
      animation.onComplete?.();
      animationRef.current = null;
    }
  });

  return {
    cameraRef,
    animateTo,
    stopAnimation,
    isAnimating,
    setPosition,
  };
}

export type UseCameraAnimation = ReturnType<typeof useCameraAnimation>;
