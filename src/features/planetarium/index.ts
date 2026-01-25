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
  getDefaultCameraDistance,
} from './planetarium.assets';

// Utils
export * from './utils/formatters';

// Components are exported from their individual files
// Import them directly when needed (for code splitting)
