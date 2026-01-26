/**
 * Solar System UX Scale Model
 *
 * Real astronomical distances are too vast to display meaningfully in 3D.
 * This module provides compressed scaling that preserves relative relationships
 * while making the solar system visually navigable.
 *
 * Compression formula: displayDistance = BASE_SCALE * (distanceAU ^ EXPONENT)
 *
 * With exponent = 0.5 (square root):
 * - Mercury (0.39 AU) → ~9.4 units
 * - Neptune (30.1 AU) → ~82 units
 * - Ratio compressed from 77:1 to ~9:1
 */

// Real astronomical data (semi-major axis in AU)
export const PLANET_AU_DISTANCES: Record<string, number> = {
  sun: 0,
  mercury: 0.387,
  venus: 0.723,
  earth: 1.0,
  moon: 1.00257, // Earth + ~384,400 km
  mars: 1.524,
  jupiter: 5.203,
  saturn: 9.537,
  uranus: 19.19,
  neptune: 30.07,
};

// Real planet radii in km (for relative sizing)
export const PLANET_RADII_KM: Record<string, number> = {
  sun: 696340,
  mercury: 2439.7,
  venus: 6051.8,
  earth: 6371,
  moon: 1737.4,
  mars: 3389.5,
  jupiter: 69911,
  saturn: 58232,
  uranus: 25362,
  neptune: 24622,
};

// Default scale parameters
export const DEFAULT_SCALE_CONFIG = {
  distanceExponent: 0.5,      // Square root compression
  distanceBaseScale: 80,      // Base multiplier for distances (larger = more spread)
  radiusExponent: 0.35,       // More aggressive compression for sizes
  radiusBaseScale: 0.8,       // Base multiplier for radii
  sunRadiusOverride: 2.5,     // Sun is special - don't make it too big
  minPlanetRadius: 0.15,      // Minimum visible size
  maxPlanetRadius: 1.2,       // Maximum size (Jupiter)
};

export interface ScaleConfig {
  distanceExponent: number;
  distanceBaseScale: number;
  radiusExponent: number;
  radiusBaseScale: number;
  sunRadiusOverride: number;
  minPlanetRadius: number;
  maxPlanetRadius: number;
}

/**
 * Convert AU distance to display units
 */
export function auToDisplayDistance(
  au: number,
  config: Partial<ScaleConfig> = {}
): number {
  const { distanceExponent, distanceBaseScale } = {
    ...DEFAULT_SCALE_CONFIG,
    ...config,
  };

  if (au <= 0) return 0;
  return distanceBaseScale * Math.pow(au, distanceExponent);
}

/**
 * Convert real radius (km) to display radius
 */
export function radiusToDisplaySize(
  radiusKm: number,
  planetId: string,
  config: Partial<ScaleConfig> = {}
): number {
  const cfg = { ...DEFAULT_SCALE_CONFIG, ...config };

  // Sun override
  if (planetId === 'sun') {
    return cfg.sunRadiusOverride;
  }

  // Use Earth as reference (1.0 display unit = Earth size base)
  const earthRadius = PLANET_RADII_KM.earth;
  const relativeSize = radiusKm / earthRadius;

  // Apply compression
  const compressed = cfg.radiusBaseScale * Math.pow(relativeSize, cfg.radiusExponent);

  // Clamp to min/max
  return Math.max(cfg.minPlanetRadius, Math.min(cfg.maxPlanetRadius, compressed));
}

/**
 * Get display position for a planet
 */
export function getPlanetDisplayPosition(
  planetId: string,
  angle: number = 0,
  config: Partial<ScaleConfig> = {}
): [number, number, number] {
  const au = PLANET_AU_DISTANCES[planetId] ?? 1;
  const distance = auToDisplayDistance(au, config);

  // Sun at center
  if (planetId === 'sun' || distance === 0) {
    return [0, 0, 0];
  }

  // Calculate position on orbital plane (y = 0)
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;

  return [x, 0, z];
}

/**
 * Get display radius for a planet
 */
export function getPlanetDisplayRadius(
  planetId: string,
  config: Partial<ScaleConfig> = {}
): number {
  const radiusKm = PLANET_RADII_KM[planetId] ?? PLANET_RADII_KM.earth;
  return radiusToDisplaySize(radiusKm, planetId, config);
}

/**
 * Get all planet display data at once
 */
export interface PlanetDisplayData {
  id: string;
  position: [number, number, number];
  radius: number;
  distanceAU: number;
  color: string;
}

// Colors for context rendering
export const PLANET_COLORS: Record<string, string> = {
  sun: '#FDB813',
  mercury: '#8c7853',
  venus: '#e6c87a',
  earth: '#6b93d6',
  moon: '#aaaaaa',
  mars: '#c1440e',
  jupiter: '#d8ca9d',
  saturn: '#ead6b8',
  uranus: '#d1e7e7',
  neptune: '#5b5ddf',
};

export function getAllPlanetsDisplayData(
  time: number = 0,
  config: Partial<ScaleConfig> = {},
  includeMoon: boolean = true
): PlanetDisplayData[] {
  const planetIds = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  // Orbital speeds (relative to Earth = 1)
  const orbitalSpeeds: Record<string, number> = {
    sun: 0,
    mercury: 4.15,
    venus: 1.62,
    earth: 1.0,
    mars: 0.53,
    jupiter: 0.084,
    saturn: 0.034,
    uranus: 0.012,
    neptune: 0.006,
  };

  // Starting angles for visual spread
  const startAngles: Record<string, number> = {
    sun: 0,
    mercury: 0,
    venus: Math.PI * 0.7,
    earth: Math.PI * 0.3,
    mars: Math.PI * 1.2,
    jupiter: Math.PI * 0.9,
    saturn: Math.PI * 1.6,
    uranus: Math.PI * 0.5,
    neptune: Math.PI * 1.8,
  };

  const results: PlanetDisplayData[] = planetIds.map(id => {
    const startAngle = startAngles[id] ?? 0;
    const speed = orbitalSpeeds[id] ?? 1;
    const angle = startAngle + time * speed * 0.1;

    return {
      id,
      position: getPlanetDisplayPosition(id, angle, config),
      radius: getPlanetDisplayRadius(id, config),
      distanceAU: PLANET_AU_DISTANCES[id] ?? 0,
      color: PLANET_COLORS[id] ?? '#ffffff',
    };
  });

  // Add moon orbiting Earth
  if (includeMoon) {
    const earthData = results.find(p => p.id === 'earth');
    if (earthData) {
      // Moon orbits much faster than planets - about 13x per year
      const moonOrbitSpeed = 13;
      const moonAngle = time * moonOrbitSpeed * 0.3;
      const moonOrbitRadius = 2.5; // Visual distance from Earth

      const moonPosition: [number, number, number] = [
        earthData.position[0] + Math.cos(moonAngle) * moonOrbitRadius,
        earthData.position[1],
        earthData.position[2] + Math.sin(moonAngle) * moonOrbitRadius,
      ];

      results.push({
        id: 'moon',
        position: moonPosition,
        radius: 0.18, // Small but visible
        distanceAU: PLANET_AU_DISTANCES.moon ?? 1,
        color: PLANET_COLORS.moon ?? '#aaaaaa',
      });
    }
  }

  return results;
}

/**
 * Calculate appropriate camera far plane for the scale
 */
export function getRequiredFarPlane(config: Partial<ScaleConfig> = {}): number {
  // Neptune is the farthest - calculate its distance + margin
  const neptuneDistance = auToDisplayDistance(PLANET_AU_DISTANCES.neptune, config);
  return Math.ceil(neptuneDistance * 1.5);
}
