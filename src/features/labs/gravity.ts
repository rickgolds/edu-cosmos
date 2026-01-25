import { CELESTIAL_BODIES, type CelestialBody } from './labs.types';

/**
 * Calculate weight (force) in Newtons
 * F = m * g
 */
export function calculateWeightNewtons(massKg: number, gravity: number): number {
  return massKg * gravity;
}

/**
 * Calculate weight in kilogram-force (kgf)
 * This is the "apparent weight" - what a scale would show
 * 1 kgf = 9.80665 N (standard gravity)
 */
export function calculateWeightKgf(massKg: number, gravity: number): number {
  const weightN = calculateWeightNewtons(massKg, gravity);
  return weightN / 9.80665;
}

/**
 * Calculate weight on a specific celestial body
 */
export function calculateWeightOnBody(
  massKg: number,
  bodyId: string
): { weightN: number; weightKgf: number; body: CelestialBody } | null {
  const body = CELESTIAL_BODIES.find((b) => b.id === bodyId);
  if (!body) return null;

  return {
    weightN: calculateWeightNewtons(massKg, body.gravity),
    weightKgf: calculateWeightKgf(massKg, body.gravity),
    body,
  };
}

/**
 * Calculate weights on all celestial bodies
 */
export function calculateWeightsOnAllBodies(
  massKg: number
): Array<{ body: CelestialBody; weightN: number; weightKgf: number; ratio: number }> {
  const earthGravity = CELESTIAL_BODIES.find((b) => b.id === 'earth')?.gravity || 9.81;
  const earthWeightN = calculateWeightNewtons(massKg, earthGravity);

  return CELESTIAL_BODIES.map((body) => {
    const weightN = calculateWeightNewtons(massKg, body.gravity);
    return {
      body,
      weightN,
      weightKgf: calculateWeightKgf(massKg, body.gravity),
      ratio: weightN / earthWeightN,
    };
  });
}

/**
 * Format weight in Newtons with proper units
 */
export function formatWeightNewtons(weightN: number): string {
  if (weightN >= 1000) {
    return `${(weightN / 1000).toFixed(2)} kN`;
  }
  return `${weightN.toFixed(2)} N`;
}

/**
 * Format weight in kgf with proper precision
 */
export function formatWeightKgf(weightKgf: number): string {
  if (weightKgf >= 100) {
    return `${weightKgf.toFixed(1)} kgf`;
  }
  return `${weightKgf.toFixed(2)} kgf`;
}

/**
 * Get gravity comparison text
 */
export function getGravityComparison(bodyId: string): string {
  const body = CELESTIAL_BODIES.find((b) => b.id === bodyId);
  const earth = CELESTIAL_BODIES.find((b) => b.id === 'earth');

  if (!body || !earth) return '';

  const ratio = body.gravity / earth.gravity;

  if (ratio > 1) {
    return `${ratio.toFixed(1)}x silniejsza niż na Ziemi`;
  } else if (ratio < 1) {
    return `${(1 / ratio).toFixed(1)}x słabsza niż na Ziemi`;
  }
  return 'taka sama jak na Ziemi';
}
