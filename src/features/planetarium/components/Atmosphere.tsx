'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereProps {
  color: string;
  intensity: number;
  scale: number;
  falloff?: number; // Fresnel power (2-5 recommended)
}

/**
 * Atmospheric glow effect using proper Fresnel shader
 * Creates a rim-lighting effect that responds to camera position
 */
export function Atmosphere({ color, intensity, scale, falloff = 4 }: AtmosphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Shader uniforms that update per frame
  const uniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      falloff: { value: falloff },
      viewVector: { value: new THREE.Vector3() },
    }),
    [color, intensity, falloff]
  );

  // Vertex shader - passes world position and normal for Fresnel calculation
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader - proper Fresnel effect based on view direction
  const fragmentShader = `
    uniform vec3 glowColor;
    uniform float intensity;
    uniform float falloff;
    uniform vec3 viewVector;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      // Calculate view direction from fragment to camera
      vec3 viewDir = normalize(viewVector - vWorldPosition);

      // Fresnel effect: stronger at edges (grazing angles)
      float fresnel = 1.0 - abs(dot(vNormal, viewDir));
      fresnel = pow(fresnel, falloff);

      // Soft fade at the very edges
      float alpha = fresnel * intensity;
      alpha = smoothstep(0.0, 1.0, alpha);

      // Additive glow color
      vec3 finalColor = glowColor * (1.0 + fresnel * 0.5);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  useFrame(() => {
    if (meshRef.current) {
      // Update view vector uniform with camera position
      uniforms.viewVector.value.copy(camera.position);

      // Very subtle breathing effect
      const time = Date.now() * 0.0005;
      const breathe = 1.0 + Math.sin(time) * 0.003;
      meshRef.current.scale.setScalar(scale * breathe);
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
