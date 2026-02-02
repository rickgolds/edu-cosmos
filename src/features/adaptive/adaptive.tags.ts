/**
 * Adaptive Learning - Tag System
 *
 * Taksonomia tagów dla lekcji i pytań.
 * Każdy tag reprezentuje konkretny obszar wiedzy astronomicznej.
 */

// Tag union type - wszystkie dostępne tagi
export const ADAPTIVE_TAGS = {
  // Układ Słoneczny
  SOLAR_SYSTEM_BASICS: 'solar_system_basics',
  PLANETS: 'planets',
  ORBITS: 'orbits',
  MOONS: 'moons',
  ASTEROIDS_COMETS: 'asteroids_comets',

  // Gwiazdy
  STARS_BASICS: 'stars_basics',
  STELLAR_EVOLUTION: 'stellar_evolution',
  STAR_TYPES: 'star_types',

  // Galaktyki i kosmologia
  GALAXIES: 'galaxies',
  BLACK_HOLES: 'black_holes',

  // Fizyka i jednostki
  PHYSICS_NEWTON: 'physics_newton',
  GRAVITY: 'gravity',
  SCALES_DISTANCES: 'scales_distances',
  LIGHT_SPECTRUM: 'light_spectrum',

  // Technologia
  ROCKETS: 'rockets',
  TELESCOPES: 'telescopes',
  SPACE_MISSIONS: 'space_missions',
} as const;

export type AdaptiveTag = typeof ADAPTIVE_TAGS[keyof typeof ADAPTIVE_TAGS];

// Wszystkie tagi jako tablica (dla iteracji)
export const ALL_TAGS: AdaptiveTag[] = Object.values(ADAPTIVE_TAGS);

// Polskie etykiety dla tagów
export const TAG_LABELS: Record<AdaptiveTag, string> = {
  [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS]: 'Podstawy Układu Słonecznego',
  [ADAPTIVE_TAGS.PLANETS]: 'Planety',
  [ADAPTIVE_TAGS.ORBITS]: 'Orbity i ruch',
  [ADAPTIVE_TAGS.MOONS]: 'Księżyce',
  [ADAPTIVE_TAGS.ASTEROIDS_COMETS]: 'Asteroidy i komety',
  [ADAPTIVE_TAGS.STARS_BASICS]: 'Podstawy gwiazd',
  [ADAPTIVE_TAGS.STELLAR_EVOLUTION]: 'Ewolucja gwiazd',
  [ADAPTIVE_TAGS.STAR_TYPES]: 'Typy gwiazd',
  [ADAPTIVE_TAGS.GALAXIES]: 'Galaktyki',
  [ADAPTIVE_TAGS.BLACK_HOLES]: 'Czarne dziury',
  [ADAPTIVE_TAGS.PHYSICS_NEWTON]: 'Fizyka Newtona',
  [ADAPTIVE_TAGS.GRAVITY]: 'Grawitacja',
  [ADAPTIVE_TAGS.SCALES_DISTANCES]: 'Skale i odległości',
  [ADAPTIVE_TAGS.LIGHT_SPECTRUM]: 'Widmo światła',
  [ADAPTIVE_TAGS.ROCKETS]: 'Rakiety',
  [ADAPTIVE_TAGS.TELESCOPES]: 'Teleskopy',
  [ADAPTIVE_TAGS.SPACE_MISSIONS]: 'Misje kosmiczne',
};

// Grupowanie tagów według kategorii (do UI)
export const TAG_GROUPS: Record<string, { label: string; tags: AdaptiveTag[] }> = {
  solar_system: {
    label: 'Układ Słoneczny',
    tags: [
      ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS,
      ADAPTIVE_TAGS.PLANETS,
      ADAPTIVE_TAGS.ORBITS,
      ADAPTIVE_TAGS.MOONS,
      ADAPTIVE_TAGS.ASTEROIDS_COMETS,
    ],
  },
  stars: {
    label: 'Gwiazdy',
    tags: [
      ADAPTIVE_TAGS.STARS_BASICS,
      ADAPTIVE_TAGS.STELLAR_EVOLUTION,
      ADAPTIVE_TAGS.STAR_TYPES,
    ],
  },
  cosmos: {
    label: 'Kosmos',
    tags: [
      ADAPTIVE_TAGS.GALAXIES,
      ADAPTIVE_TAGS.BLACK_HOLES,
    ],
  },
  physics: {
    label: 'Fizyka',
    tags: [
      ADAPTIVE_TAGS.PHYSICS_NEWTON,
      ADAPTIVE_TAGS.GRAVITY,
      ADAPTIVE_TAGS.SCALES_DISTANCES,
      ADAPTIVE_TAGS.LIGHT_SPECTRUM,
    ],
  },
  technology: {
    label: 'Technologia',
    tags: [
      ADAPTIVE_TAGS.ROCKETS,
      ADAPTIVE_TAGS.TELESCOPES,
      ADAPTIVE_TAGS.SPACE_MISSIONS,
    ],
  },
};

// Mapowanie difficulty na wartość numeryczną
export type DifficultyLevel = 1 | 2 | 3;

export const DIFFICULTY_MAP: Record<string, DifficultyLevel> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

export const DIFFICULTY_LABELS_PL: Record<DifficultyLevel, string> = {
  1: 'Łatwe',
  2: 'Średnie',
  3: 'Trudne',
};
