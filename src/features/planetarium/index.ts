// Planetarium module barrel exports

// Types
export * from './planetarium.types';

// Data
export { PLANETS, PLANET_ORDER, getPlanetById, getPlanetIndex } from './planetarium.data';

// Assets
export {
  PLANET_ASSETS,
  getPlanetAssets,
  FALLBACK_COLORS,
  LIGHTING_POSITIONS,
  BACKGROUND_TEXTURE,
  MODELS_PATH,
  getDefaultCameraDistance,
  getGlbPath,
} from './planetarium.assets';

// Solar System Layout
export {
  PLANET_POSITIONS,
  SUN_CONFIG,
  CAMERA_POSITIONS,
  ORBIT_CONFIG,
  getPlanetPosition,
  calculatePlanetWorldPosition,
  getPlanetCameraDistance,
} from './data/solarSystemLayout';

// State
export { usePlanetariumState } from './state/usePlanetariumState';
export type {
  PlanetariumMode,
  PlanetariumState,
  PlanetariumActions,
  TransitionDirection,
} from './state/usePlanetariumState';

// Camera
export { CameraDirector } from './camera/CameraDirector';
export * from './camera/easing';

// Utils
export * from './utils/formatters';

// Components are exported from their individual files
// Import them directly when needed (for code splitting)
