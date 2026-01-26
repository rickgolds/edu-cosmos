'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SUN_CONFIG } from '../data/solarSystemLayout';

interface SunProps {
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  isHovered?: boolean;
}

/**
 * Custom shader for realistic sun glow
 * Creates smooth radial falloff from center
 */
const sunGlowShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float intensity;
    uniform float falloff;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      float glow = pow(0.65 - dot(vNormal, vPositionNormal), falloff);
      gl_FragColor = vec4(glowColor, glow * intensity);
    }
  `,
};

/**
 * Sun with texture
 */
function SunWithTexture({ onClick, onHover, isHovered }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const texture = useTexture('/planetarium/textures/sun_texture.jpg');

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Animate glow pulsing and sun rotation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Slow sun rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.02;
    }

    // Subtle glow pulsing
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.intensity.value = (isHovered ? 0.9 : 0.7) + Math.sin(time * 0.8) * 0.1;
      }
    }
  });

  // Glow uniforms
  const glowUniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color('#FFA500') }, // Warm orange
    intensity: { value: 0.7 },
    falloff: { value: 2.5 },
  }), []);

  return (
    <group>
      {/* Core with texture */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onHover?.(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
          onHover?.(false);
        }}
      >
        <sphereGeometry args={[SUN_CONFIG.size, 64, 64]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
        />
      </mesh>

      {/* Single smooth glow with shader */}
      <mesh ref={glowRef} scale={SUN_CONFIG.size * 2.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          vertexShader={sunGlowShader.vertexShader}
          fragmentShader={sunGlowShader.fragmentShader}
          uniforms={glowUniforms}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Label on hover */}
      {isHovered && (
        <Html
          position={[0, SUN_CONFIG.size + 1.5, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              transform: 'translateY(-50%)',
            }}
          >
            Słońce
          </div>
        </Html>
      )}

      {/* Point light */}
      <pointLight
        color={SUN_CONFIG.color}
        intensity={SUN_CONFIG.glowIntensity}
        distance={100}
        decay={2}
      />

      {/* Ambient contribution */}
      <ambientLight intensity={0.1} />
    </group>
  );
}

/**
 * Fallback sun without texture
 */
function SunFallback({ onClick, onHover, isHovered }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Glow uniforms for fallback
  const glowUniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color('#FFA500') },
    intensity: { value: 0.7 },
    falloff: { value: 2.5 },
  }), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.intensity.value = (isHovered ? 0.9 : 0.7) + Math.sin(time * 0.8) * 0.1;
      }
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onHover?.(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
          onHover?.(false);
        }}
      >
        <sphereGeometry args={[SUN_CONFIG.size, 32, 32]} />
        <meshBasicMaterial color={SUN_CONFIG.color} />
      </mesh>

      {/* Single smooth glow with shader */}
      <mesh ref={glowRef} scale={SUN_CONFIG.size * 2.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          vertexShader={sunGlowShader.vertexShader}
          fragmentShader={sunGlowShader.fragmentShader}
          uniforms={glowUniforms}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {isHovered && (
        <Html
          position={[0, SUN_CONFIG.size + 1.5, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              transform: 'translateY(-50%)',
            }}
          >
            Słońce
          </div>
        </Html>
      )}

      <pointLight
        color={SUN_CONFIG.color}
        intensity={SUN_CONFIG.glowIntensity}
        distance={100}
        decay={2}
      />

      <ambientLight intensity={0.1} />
    </group>
  );
}

/**
 * Sun component for the solar system overview
 * Glowing sphere at the center with texture
 */
export function Sun(props: SunProps) {
  return (
    <Suspense fallback={<SunFallback {...props} />}>
      <SunWithTexture {...props} />
    </Suspense>
  );
}

/**
 * Preload sun texture
 */
export function preloadSunTexture() {
  useTexture.preload('/planetarium/textures/sun_texture.jpg');
}
