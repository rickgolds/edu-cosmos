'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { easeInOutCubic, lerpVector3, lerp } from './easing';
import {
  CAMERA_POSITIONS,
  getPlanetPosition,
  getPlanetCameraDistance,
  calculatePlanetWorldPosition,
} from '../data/solarSystemLayout';
import { getPlanetAssets } from '../planetarium.assets';

// Moon orbit radius (must match PlanetFocusScene)
const MOON_ORBIT_RADIUS = 4;

/**
 * Get world position for any celestial body (including sun and moon)
 * Uses the orbital positions from solarSystemLayout for smooth camera transitions
 */
function getCelestialWorldPosition(id: string, time: number): [number, number, number] {
  // Sun is at the center
  if (id === 'sun') {
    return [0, 0, 0];
  }

  // Moon has its own position, offset from Earth
  if (id === 'moon') {
    const earthPos = getPlanetPosition('earth');
    if (earthPos) {
      const earthWorld = calculatePlanetWorldPosition(earthPos, time);
      // Moon is offset from Earth by orbit radius
      return [
        earthWorld[0] + MOON_ORBIT_RADIUS,
        earthWorld[1],
        earthWorld[2],
      ];
    }
    return [0, 0, 0];
  }

  // Regular planets - use their orbital position
  const planetPos = getPlanetPosition(id);
  if (planetPos) {
    return calculatePlanetWorldPosition(planetPos, time);
  }

  return [0, 0, 0];
}

/**
 * Get camera distance for any celestial body
 */
function getCelestialCameraDistance(id: string): number {
  // Check assets for camera distance
  const assets = getPlanetAssets(id);
  if (assets?.cameraDistance) {
    return assets.cameraDistance;
  }

  // Fallback to planet camera distance
  return getPlanetCameraDistance(id);
}
import type { PlanetariumMode, TransitionDirection } from '../state/usePlanetariumState';

interface CameraDirectorProps {
  mode: PlanetariumMode;
  targetPlanetId: string | null;
  transitionDirection: TransitionDirection | null;
  onTransitionProgress: (progress: number) => void;
  onTransitionComplete: () => void;
  orbitTime: number;
}

export interface CameraDirectorRef {
  getCamera: () => THREE.PerspectiveCamera | null;
  getControls: () => OrbitControlsImpl | null;
}

interface AnimationState {
  isAnimating: boolean;
  startTime: number;
  duration: number;
  fromPosition: [number, number, number];
  toPosition: [number, number, number];
  fromTarget: [number, number, number];
  toTarget: [number, number, number];
  fromFov: number;
  toFov: number;
}

// Store the overview camera state when transitioning to planet
interface SavedCameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

/**
 * Camera Director - manages camera position and animations
 */
export const CameraDirector = forwardRef<CameraDirectorRef, CameraDirectorProps>(
  function CameraDirector(
    {
      mode,
      targetPlanetId,
      transitionDirection,
      onTransitionProgress,
      onTransitionComplete,
      orbitTime,
    },
    ref
  ) {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const animationRef = useRef<AnimationState | null>(null);
    const lastModeRef = useRef<PlanetariumMode>(mode);

    // Save the overview camera state to return to
    const savedOverviewState = useRef<SavedCameraState | null>(null);

    // Freeze orbit time at the moment of transition start
    const frozenOrbitTimeRef = useRef<number>(orbitTime);

    // Track animation state for UI updates
    const [isAnimating, setIsAnimating] = useState(false);

    // Expose refs to parent
    useImperativeHandle(ref, () => ({
      getCamera: () => cameraRef.current,
      getControls: () => controlsRef.current,
    }));

    // Handle mode changes - start animations
    useEffect(() => {
      if (!cameraRef.current) return;

      const camera = cameraRef.current;
      const controls = controlsRef.current;
      const prevMode = lastModeRef.current;
      lastModeRef.current = mode;

      // Starting transition TO planet (or sun/moon)
      if (mode === 'transition' && targetPlanetId && transitionDirection === 'to-planet') {
        // Freeze orbit time at the moment of click - this is the position we'll fly to
        frozenOrbitTimeRef.current = orbitTime;

        // Save current camera state BEFORE transitioning
        savedOverviewState.current = {
          position: [camera.position.x, camera.position.y, camera.position.z],
          target: controls
            ? [controls.target.x, controls.target.y, controls.target.z]
            : [...CAMERA_POSITIONS.overview.target],
          fov: camera.fov,
        };

        const celestialWorldPos = getCelestialWorldPosition(targetPlanetId, frozenOrbitTimeRef.current);
        const celestialCameraDistance = getCelestialCameraDistance(targetPlanetId);

        // Flying from CURRENT position to celestial body
        animationRef.current = {
          isAnimating: true,
          startTime: performance.now(),
          duration: 2000,
          fromPosition: [camera.position.x, camera.position.y, camera.position.z],
          toPosition: [
            celestialWorldPos[0],
            celestialWorldPos[1] + 0.5,
            celestialWorldPos[2] + celestialCameraDistance,
          ],
          fromTarget: controls
            ? [controls.target.x, controls.target.y, controls.target.z]
            : [...CAMERA_POSITIONS.overview.target],
          toTarget: celestialWorldPos,
          fromFov: camera.fov,
          toFov: CAMERA_POSITIONS.planet.fov,
        };
        setIsAnimating(true);
      }

      // Starting transition BACK to overview
      if (mode === 'transition' && transitionDirection === 'to-overview') {
        // Use saved state or default
        const returnState = savedOverviewState.current || {
          position: [...CAMERA_POSITIONS.overview.position] as [number, number, number],
          target: [...CAMERA_POSITIONS.overview.target] as [number, number, number],
          fov: CAMERA_POSITIONS.overview.fov,
        };

        animationRef.current = {
          isAnimating: true,
          startTime: performance.now(),
          duration: 1500,
          fromPosition: [camera.position.x, camera.position.y, camera.position.z],
          toPosition: returnState.position,
          fromTarget: controls
            ? [controls.target.x, controls.target.y, controls.target.z]
            : [0, 0, 0],
          toTarget: returnState.target,
          fromFov: camera.fov,
          toFov: returnState.fov,
        };
        setIsAnimating(true);
      }

      // Entering overview mode (not from transition, e.g., from intro)
      if (mode === 'overview' && prevMode === 'intro') {
        camera.position.set(...CAMERA_POSITIONS.overview.position);
        camera.lookAt(...CAMERA_POSITIONS.overview.target);
        camera.fov = CAMERA_POSITIONS.overview.fov;
        camera.updateProjectionMatrix();

        if (controls) {
          controls.target.set(...CAMERA_POSITIONS.overview.target);
          controls.update();
        }

        // Clear any saved state
        savedOverviewState.current = null;
      }
    // Note: orbitTime is intentionally NOT in dependencies - we capture it via ref at transition start
    }, [mode, targetPlanetId, transitionDirection]);

    // Animation frame
    useFrame(() => {
      const animation = animationRef.current;
      const camera = cameraRef.current;
      const controls = controlsRef.current;

      if (!animation || !animation.isAnimating || !camera) return;

      const elapsed = performance.now() - animation.startTime;
      const rawProgress = Math.min(elapsed / animation.duration, 1);
      const easedProgress = easeInOutCubic(rawProgress);

      // Interpolate position
      const newPosition = lerpVector3(
        animation.fromPosition,
        animation.toPosition,
        easedProgress
      );
      camera.position.set(...newPosition);

      // Interpolate target (lookAt)
      const newTarget = lerpVector3(
        animation.fromTarget,
        animation.toTarget,
        easedProgress
      );
      camera.lookAt(...newTarget);

      // Interpolate FOV
      const newFov = lerp(animation.fromFov, animation.toFov, easedProgress);
      camera.fov = newFov;
      camera.updateProjectionMatrix();

      // Update controls target
      if (controls) {
        controls.target.set(...newTarget);
        controls.update();
      }

      // Report progress
      onTransitionProgress(rawProgress);

      // Check completion
      if (rawProgress >= 1) {
        animation.isAnimating = false;
        animationRef.current = null;
        setIsAnimating(false);
        onTransitionComplete();
      }
    });

    // Determine if controls should be enabled
    const canInteract = !isAnimating && mode !== 'transition' && mode !== 'intro';
    const canZoom = canInteract && (mode === 'overview' || mode === 'planet');
    // Enable rotation in both overview and planet modes
    const canRotate = canInteract && (mode === 'overview' || mode === 'planet');

    // Initial camera setup based on mode
    const initialPosition = CAMERA_POSITIONS.overview.position;
    const initialFov = CAMERA_POSITIONS.overview.fov;

    // Polar angle limits for overview (prevent going under the plane)
    const isOverview = mode === 'overview';
    const minPolarAngle = isOverview ? Math.PI * 0.1 : 0;  // ~18 degrees from top
    const maxPolarAngle = isOverview ? Math.PI * 0.45 : Math.PI; // ~81 degrees max

    return (
      <>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={initialPosition}
          fov={initialFov}
          near={0.1}
          far={1500}
        />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={canZoom}
          enableRotate={canRotate}
          minDistance={2}
          maxDistance={mode === 'overview' ? 150 : 30}
          zoomSpeed={1.2}
          dampingFactor={0.05}
          enableDamping
          rotateSpeed={0.5}
          minPolarAngle={minPolarAngle}
          maxPolarAngle={maxPolarAngle}
        />
      </>
    );
  }
);
