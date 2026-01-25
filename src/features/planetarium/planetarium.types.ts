// Planetarium module types

export interface PlanetInfo {
  id: string;
  name: string;
  namePL: string;
  subtitle: string;
  description: string;
  // Physical properties
  radiusKm: number;
  massKg: string; // Scientific notation as string for display
  gravity: number; // m/s²
  dayLengthHours: number;
  yearLengthDays: number;
  avgTempC: number;
  moons: number;
  // Visual properties
  color: string;
  hasAtmosphere: boolean;
  hasRings: boolean;
  // Content
  funFacts: string[];
  keyMissions: PlanetMission[];
  composition: string[];
}

export interface PlanetMission {
  name: string;
  year: number;
  agency: string;
  description: string;
}

export interface AtmosphereConfig {
  enabled: boolean;
  color: string;
  intensity: number;
  scale: number; // 1.04 - 1.10 recommended
  falloff: number; // Fresnel power (2-5)
}

export interface RingsConfig {
  enabled: boolean;
  textureFile: string | null;
  innerRadius: number; // relative to planet radius
  outerRadius: number; // relative to planet radius
  opacity: number;
  tilt: number; // degrees
}

export interface PlanetAssetConfig {
  planetId: string;
  // Render mode
  renderMode: 'texture' | 'glb';
  glbFile?: string | null;
  // Textures
  textureFile: string | null;
  normalMapFile?: string | null;
  roughnessMapFile?: string | null;
  emissiveMapFile?: string | null; // For Earth night lights
  // Transform
  scale: number;
  rotationSpeed: number;
  tilt: number; // Axial tilt in degrees
  // Camera
  cameraDistance?: number; // Override default camera distance
  // Atmosphere
  atmosphere?: AtmosphereConfig;
  // Rings (Saturn, Uranus, Neptune)
  rings?: RingsConfig;
  // Legacy fields (for backwards compatibility)
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  ringsTextureFile?: string;
  ringsInnerRadius?: number;
  ringsOuterRadius?: number;
}

export type LightingPreset = 'left' | 'right' | 'top' | 'front';

export type QualityLevel = 'low' | 'high';

export interface PlanetariumSettings {
  autoRotate: boolean;
  rotationSpeed: number;
  lighting: LightingPreset;
  lightIntensity: number;
  quality: QualityLevel;
  showHUD: boolean;
  showAtmosphere: boolean;
}

export interface ComparisonData {
  planetA: PlanetInfo;
  planetB: PlanetInfo;
}
