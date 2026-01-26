import { PlanetAssetConfig } from './planetarium.types';

/**
 * Planet asset configuration
 *
 * Texture sources (download and place in public/planetarium/textures/):
 * - NASA Visible Earth: https://visibleearth.nasa.gov (public domain)
 * - Solar System Scope: https://www.solarsystemscope.com/textures/ (CC BY 4.0)
 * - Planet Pixel Emporium: http://planetpixelemporium.com (free for non-commercial)
 *
 * GLB models: place in public/planetarium/models/{planetId}.glb
 * They will be automatically detected and used if available.
 */

// Background texture path
export const BACKGROUND_TEXTURE = '/planetarium/textures/stars_background.jpg';

// GLB models directory - files should be named {planetId}.glb
export const MODELS_PATH = '/planetarium/models';

/**
 * Get the expected GLB file path for a planet
 */
export function getGlbPath(planetId: string): string {
  return `${MODELS_PATH}/${planetId}.glb`;
}

export const PLANET_ASSETS: PlanetAssetConfig[] = [
  {
    planetId: 'sun',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/sun_texture.jpg',
    normalMapFile: null,
    scale: 2.5,
    rotationSpeed: 0.002,
    tilt: 7.25,
    cameraDistance: 10,
    emissive: true, // Special flag for sun rendering
  },
  {
    planetId: 'mercury',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/mercury_texture.jpg',
    normalMapFile: null,
    scale: 0.4,
    rotationSpeed: 0.002,
    tilt: 0.03,
    cameraDistance: 4,
  },
  {
    planetId: 'venus',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/venus_texture.jpg',
    normalMapFile: null,
    scale: 0.95,
    rotationSpeed: -0.001,
    tilt: 177.4,
    cameraDistance: 5,
    atmosphere: {
      enabled: true,
      color: '#e6d5a8',
      intensity: 0.5,
      scale: 1.08,
      falloff: 3,
    },
    // Legacy
    atmosphereColor: '#e6d5a8',
    atmosphereIntensity: 0.5,
  },
  {
    planetId: 'earth',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/earth_texture.jpg',
    normalMapFile: '/planetarium/textures/earth_normal.jpg',
    emissiveMapFile: '/planetarium/textures/earth_night.jpg', // Optional
    scale: 1.0,
    rotationSpeed: 0.005,
    tilt: 23.4,
    cameraDistance: 5,
    atmosphere: {
      enabled: true,
      color: '#6ea5ff',
      intensity: 0.4,
      scale: 1.06,
      falloff: 4,
    },
    // Legacy
    atmosphereColor: '#6ea5ff',
    atmosphereIntensity: 0.4,
  },
  {
    planetId: 'moon',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/moon_texture.jpg',
    normalMapFile: null,
    scale: 0.27, // Relative to Earth
    rotationSpeed: 0.001, // Slow synchronous rotation
    tilt: 1.5,
    cameraDistance: 3,
  },
  {
    planetId: 'mars',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/mars_texture.jpg',
    normalMapFile: null,
    scale: 0.53,
    rotationSpeed: 0.005,
    tilt: 25.2,
    cameraDistance: 4,
    atmosphere: {
      enabled: true,
      color: '#d4a574',
      intensity: 0.12,
      scale: 1.03,
      falloff: 5,
    },
    // Legacy
    atmosphereColor: '#d4a574',
    atmosphereIntensity: 0.12,
  },
  {
    planetId: 'jupiter',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/jupiter_texture.jpg',
    normalMapFile: null,
    scale: 1.8,
    rotationSpeed: 0.01,
    tilt: 3.1,
    cameraDistance: 6,
  },
  {
    planetId: 'saturn',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/saturn_texture.jpg',
    normalMapFile: null,
    scale: 1.5,
    rotationSpeed: 0.009,
    tilt: 26.7,
    cameraDistance: 8, // Farther for rings
    rings: {
      enabled: true,
      textureFile: '/planetarium/textures/saturn_rings.png',
      innerRadius: 1.3,  // 1.3x planet radius
      outerRadius: 2.4,  // 2.4x planet radius
      opacity: 0.85,
      tilt: 26.7,
    },
    // Legacy
    ringsTextureFile: '/planetarium/textures/saturn_rings.png',
    ringsInnerRadius: 1.3,
    ringsOuterRadius: 2.4,
  },
  {
    planetId: 'uranus',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/uranus_texture.jpg',
    normalMapFile: null,
    scale: 1.2,
    rotationSpeed: 0.007,
    tilt: 97.8,
    cameraDistance: 5,
    atmosphere: {
      enabled: true,
      color: '#b8e4e4',
      intensity: 0.2,
      scale: 1.05,
      falloff: 4,
    },
    // Legacy
    atmosphereColor: '#b8e4e4',
    atmosphereIntensity: 0.2,
  },
  {
    planetId: 'neptune',
    renderMode: 'texture',
    textureFile: '/planetarium/textures/neptune_texture.jpg',
    normalMapFile: null,
    scale: 1.15,
    rotationSpeed: 0.008,
    tilt: 28.3,
    cameraDistance: 5,
    atmosphere: {
      enabled: true,
      color: '#5b7fdf',
      intensity: 0.25,
      scale: 1.06,
      falloff: 3.5,
    },
    // Legacy
    atmosphereColor: '#5b7fdf',
    atmosphereIntensity: 0.25,
  },
];

export function getPlanetAssets(planetId: string): PlanetAssetConfig | undefined {
  return PLANET_ASSETS.find((a) => a.planetId === planetId);
}

/**
 * Fallback colors when textures are not available
 */
export const FALLBACK_COLORS: Record<string, string> = {
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

/**
 * Lighting presets positions (x, y, z)
 */
export const LIGHTING_POSITIONS = {
  left: [-10, 2, 5],
  right: [10, 2, 5],
  top: [0, 10, 5],
  front: [0, 2, 10],
} as const;

/**
 * Default camera distance based on planet scale
 */
export function getDefaultCameraDistance(assets: PlanetAssetConfig): number {
  if (assets.cameraDistance) return assets.cameraDistance;

  // If planet has rings, need more distance
  if (assets.rings?.enabled) {
    return assets.scale * assets.rings.outerRadius * 2.5;
  }

  return Math.max(4, assets.scale * 3);
}
