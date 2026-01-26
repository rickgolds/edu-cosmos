'use client';

import { useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { ORBIT_CONFIG } from '../data/solarSystemLayout';

interface OrbitRingProps {
  radius: number;
  isHighlighted?: boolean;
  color?: string;
}

/**
 * Orbit ring - glowing line representing planet's orbit path
 */
export function OrbitRing({
  radius,
  isHighlighted = false,
  color = ORBIT_CONFIG.color,
}: OrbitRingProps) {
  const [opacity, setOpacity] = useState(ORBIT_CONFIG.opacity);

  // Create circular points
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = ORBIT_CONFIG.segments;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      ]);
    }

    return pts;
  }, [radius]);

  // Animate opacity on highlight
  useFrame(() => {
    const targetOpacity = isHighlighted
      ? ORBIT_CONFIG.hoverOpacity
      : ORBIT_CONFIG.opacity;
    setOpacity(prev => prev + (targetOpacity - prev) * 0.1);
  });

  return (
    <Line
      points={points}
      color={color}
      lineWidth={ORBIT_CONFIG.lineWidth}
      transparent
      opacity={opacity}
    />
  );
}
