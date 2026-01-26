/**
 * Solar System Layout Configuration
 *
 * Defines planet positions for the top-down overview.
 * These are NOT astronomically accurate - they're optimized for visual clarity.
 */

export interface PlanetPosition {
  id: string;
  name: string;
  orbitRadius: number;    // Distance from sun center
  startAngle: number;     // Initial angle in radians (for visual spread)
  size: number;           // Visual size in overview (not to scale)
  color: string;          // Fallback/glow color
  orbitSpeed: number;     // Animation speed multiplier
}

/**
 * Sun configuration
 */
export const SUN_CONFIG = {
  size: 2.5,
  color: '#FDB813',
  glowColor: '#FF6B00',
  glowIntensity: 1.5,
};

/**
 * Planet positions optimized for overview aesthetics
 * Angles are spread to avoid overlap at start
 */
export const PLANET_POSITIONS: PlanetPosition[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    orbitRadius: 5,
    startAngle: 0,
    size: 0.25,
    color: '#8c7853',
    orbitSpeed: 4.15,
  },
  {
    id: 'venus',
    name: 'Venus',
    orbitRadius: 7,
    startAngle: Math.PI * 0.7,
    size: 0.4,
    color: '#e6c87a',
    orbitSpeed: 1.62,
  },
  {
    id: 'earth',
    name: 'Earth',
    orbitRadius: 9,
    startAngle: Math.PI * 0.3,
    size: 0.42,
    color: '#6b93d6',
    orbitSpeed: 1.0,
  },
  {
    id: 'mars',
    name: 'Mars',
    orbitRadius: 11.5,
    startAngle: Math.PI * 1.2,
    size: 0.3,
    color: '#c1440e',
    orbitSpeed: 0.53,
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    orbitRadius: 16,
    startAngle: Math.PI * 0.9,
    size: 0.9,
    color: '#d8ca9d',
    orbitSpeed: 0.084,
  },
  {
    id: 'saturn',
    name: 'Saturn',
    orbitRadius: 21,
    startAngle: Math.PI * 1.6,
    size: 0.75,
    color: '#ead6b8',
    orbitSpeed: 0.034,
  },
  {
    id: 'uranus',
    name: 'Uranus',
    orbitRadius: 26,
    startAngle: Math.PI * 0.5,
    size: 0.5,
    color: '#d1e7e7',
    orbitSpeed: 0.012,
  },
  {
    id: 'neptune',
    name: 'Neptune',
    orbitRadius: 31,
    startAngle: Math.PI * 1.8,
    size: 0.48,
    color: '#5b5ddf',
    orbitSpeed: 0.006,
  },
];

/**
 * Get planet position by ID
 */
export function getPlanetPosition(planetId: string): PlanetPosition | undefined {
  return PLANET_POSITIONS.find(p => p.id === planetId);
}

/**
 * Calculate planet's current position in 3D space
 */
export function calculatePlanetWorldPosition(
  planet: PlanetPosition,
  time: number = 0
): [number, number, number] {
  const angle = planet.startAngle + time * planet.orbitSpeed * 0.1;
  const x = Math.cos(angle) * planet.orbitRadius;
  const z = Math.sin(angle) * planet.orbitRadius;
  return [x, 0, z];
}

/**
 * Camera positions for different views
 */
export const CAMERA_POSITIONS = {
  // Top-down overview camera
  overview: {
    position: [0, 60, 0] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 50,
  },
  // Default planet view camera (will be adjusted per planet)
  planet: {
    distance: 5,
    height: 0,
    fov: 45,
  },
};

/**
 * Get camera distance for a specific planet
 */
export function getPlanetCameraDistance(planetId: string): number {
  const distances: Record<string, number> = {
    mercury: 4,
    venus: 5,
    earth: 5,
    mars: 4,
    jupiter: 7,
    saturn: 10, // Extra for rings
    uranus: 6,
    neptune: 6,
  };
  return distances[planetId] || 5;
}

/**
 * Orbit ring visual config
 */
export const ORBIT_CONFIG = {
  segments: 128,
  lineWidth: 1,
  opacity: 0.15,
  hoverOpacity: 0.4,
  color: '#ffffff',
};
