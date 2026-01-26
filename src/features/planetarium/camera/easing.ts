/**
 * Easing functions for camera animations
 * Based on https://easings.net/
 */

/**
 * Linear (no easing)
 */
export function linear(t: number): number {
  return t;
}

/**
 * Ease In Quad - accelerating from zero velocity
 */
export function easeInQuad(t: number): number {
  return t * t;
}

/**
 * Ease Out Quad - decelerating to zero velocity
 */
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

/**
 * Ease In Out Quad - acceleration until halfway, then deceleration
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Ease In Cubic - accelerating from zero velocity (stronger)
 */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/**
 * Ease Out Cubic - decelerating to zero velocity (stronger)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Ease In Out Cubic - smooth acceleration and deceleration
 * RECOMMENDED for camera fly-to animations
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Ease In Quart - even stronger acceleration
 */
export function easeInQuart(t: number): number {
  return t * t * t * t;
}

/**
 * Ease Out Quart - even stronger deceleration
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Ease In Out Quart
 */
export function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

/**
 * Ease In Out Expo - exponential (very dramatic)
 */
export function easeInOutExpo(t: number): number {
  if (t === 0) return 0;
  if (t === 1) return 1;
  if (t < 0.5) {
    return Math.pow(2, 20 * t - 10) / 2;
  }
  return (2 - Math.pow(2, -20 * t + 10)) / 2;
}

/**
 * Ease Out Expo - fast start, slow end (good for "landing")
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Custom cinematic ease - slow start, fast middle, slow end
 * Perfect for "space travel" feel
 */
export function cinematicEase(t: number): number {
  // Custom bezier-like curve
  if (t < 0.2) {
    // Slow start (ease in)
    return easeInCubic(t / 0.2) * 0.1;
  } else if (t < 0.8) {
    // Fast middle (linear-ish)
    return 0.1 + ((t - 0.2) / 0.6) * 0.8;
  } else {
    // Slow end (ease out)
    return 0.9 + easeOutCubic((t - 0.8) / 0.2) * 0.1;
  }
}

/**
 * Type for easing function
 */
export type EasingFunction = (t: number) => number;

/**
 * Get easing function by name
 */
export function getEasing(name: string): EasingFunction {
  const easings: Record<string, EasingFunction> = {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInOutExpo,
    easeOutExpo,
    cinematicEase,
  };
  return easings[name] || easeInOutCubic;
}

/**
 * Lerp (linear interpolation) between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Lerp for 3D vectors
 */
export function lerpVector3(
  start: [number, number, number],
  end: [number, number, number],
  t: number
): [number, number, number] {
  return [
    lerp(start[0], end[0], t),
    lerp(start[1], end[1], t),
    lerp(start[2], end[2], t),
  ];
}

/**
 * Smooth damp - for smooth camera following
 */
export function smoothDamp(
  current: number,
  target: number,
  velocity: { value: number },
  smoothTime: number,
  deltaTime: number
): number {
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity.value + omega * change) * deltaTime;
  velocity.value = (velocity.value - omega * temp) * exp;
  return target + (change + temp) * exp;
}
