/**
 * Performance detection utility for the Planetarium.
 *
 * Detects mobile devices AND weak desktop/laptop hardware so that
 * the renderer can fall back to lightweight textures instead of heavy GLB models.
 */

// ── Known weak GPU patterns ────────────────────────────────────────────────
// Matched against the UNMASKED_RENDERER_WEBGL string (case-insensitive).
// Intel HD/UHD integrated GPUs below ~630 are generally too slow for 60+ MB GLB scenes.
const WEAK_GPU_PATTERNS: RegExp[] = [
  // Intel integrated — different naming conventions across generations
  /Intel.*HD Graphics(?:\s+\d{3,4})?$/i,          // Intel HD Graphics (generic / ≤ 530)
  /Intel.*HD Graphics\s+[1-5]\d{2}/i,              // Intel HD 100–599
  /Intel.*UHD Graphics\s+6[0-2]\d/i,               // Intel UHD 600–629
  /Intel.*UHD Graphics(?!\s+\d)/i,                  // Intel UHD Graphics (no number = very low-end)
  /Intel.*Iris\s+Graphics\s+[56]\d{2}/i,            // Intel Iris 540/550/580 (older)

  // Old AMD integrated
  /AMD Radeon.*R[2-5]\b/i,                          // AMD Radeon R2–R5 (APU era)
  /AMD Radeon.*Vega\s+[3-6]\b/i,                    // AMD Vega 3–6 (Athlon APUs)
  /ATI\b/i,                                         // Very old ATI-era GPUs

  // Old NVIDIA — anything below the 700 series desktop / 900M mobile
  /GeForce\s+GT\s+[1-6]\d{2}M?/i,                   // GT 100–699
  /GeForce\s+GTX?\s+[1-6]\d{2}M?/i,                 // GTX 100–699
  /GeForce\s+[89]\d{2}M/i,                           // Mobile 800M/900M

  // Generic software / Mesa fallbacks
  /SwiftShader/i,
  /llvmpipe/i,
  /Software Rasterizer/i,
  /Mesa.*Gallium.*llvmpipe/i,
];

// ── Cached result ──────────────────────────────────────────────────────────
let _cachedResult: boolean | null = null;

// ── Public API ─────────────────────────────────────────────────────────────

/** Returns `true` when the current device is mobile (phones / tablets). */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/**
 * Returns `true` when the device is mobile **or** has weak desktop hardware
 * that is unlikely to render large GLB models at an acceptable framerate.
 *
 * The result is cached after the first call so subsequent invocations are free.
 */
export function isLowPerformanceDevice(): boolean {
  if (typeof window === 'undefined') return false;

  if (_cachedResult !== null) return _cachedResult;

  // Mobile is always low-performance for our purposes
  if (isMobileDevice()) {
    _cachedResult = true;
    return true;
  }

  let score = 0; // every signal adds 1; threshold = 2

  // 1. GPU renderer string
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (gl && (gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext)) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
        if (WEAK_GPU_PATTERNS.some(p => p.test(renderer))) {
          score += 1;
        }
      }

      // 2. Max texture size — high-end GPUs expose 16384+, weak ones ≤ 4096
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
      if (maxTextureSize <= 4096) {
        score += 1;
      }
    }
  } catch {
    // WebGL not available at all → definitely low-end
    score += 2;
  }

  // 3. CPU core count (logical)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    score += 1;
  }

  // 4. Device memory (Chrome / Edge only – optional signal)
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) {
    score += 1;
  }

  _cachedResult = score >= 2;
  return _cachedResult;
}
