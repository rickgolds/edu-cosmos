// NASA API
export const NASA_API_BASE_URL = 'https://api.nasa.gov';
export const NASA_APOD_URL = `${NASA_API_BASE_URL}/planetary/apod`;
export const NASA_IMAGES_API_URL = 'https://images-api.nasa.gov';
export const NASA_MARS_PHOTOS_URL = `${NASA_API_BASE_URL}/mars-photos/api/v1`;
export const NASA_NEOWS_URL = `${NASA_API_BASE_URL}/neo/rest/v1`;

// App constants
export const APP_NAME = 'CosmosEdu';
export const APP_DESCRIPTION = 'Interaktywna aplikacja edukacyjna o kosmosie';

// Progress data version (for migrations)
export const PROGRESS_VERSION = 4;

// Local storage keys
export const STORAGE_KEYS = {
  PROGRESS: 'cosmos-edu-progress',
  BOOKMARKS: 'cosmos-edu-bookmarks',
  QUIZ_RESULTS: 'cosmos-edu-quiz-results',
  LESSON_PROGRESS: 'cosmos-edu-lesson-progress',
  STREAK: 'cosmos-edu-streak',
} as const;

// Categories for lessons
export const LESSON_CATEGORIES = {
  SOLAR_SYSTEM: 'solar-system',
  STARS: 'stars',
  GALAXIES: 'galaxies',
  ROCKETS: 'rockets',
  TELESCOPES: 'telescopes',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  [LESSON_CATEGORIES.SOLAR_SYSTEM]: 'Układ Słoneczny',
  [LESSON_CATEGORIES.STARS]: 'Gwiazdy',
  [LESSON_CATEGORIES.GALAXIES]: 'Galaktyki',
  [LESSON_CATEGORIES.ROCKETS]: 'Rakiety',
  [LESSON_CATEGORIES.TELESCOPES]: 'Teleskopy',
};

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  [DIFFICULTY_LEVELS.BEGINNER]: 'Początkujący',
  [DIFFICULTY_LEVELS.INTERMEDIATE]: 'Średniozaawansowany',
  [DIFFICULTY_LEVELS.ADVANCED]: 'Zaawansowany',
};

// Quiz settings
export const QUIZ_SETTINGS = {
  MIN_PASS_SCORE: 60, // procent
  QUICK_QUIZ_QUESTIONS: 5,
  LESSON_QUIZ_QUESTIONS: 3,
};

// Mars Rovers
export const MARS_ROVERS = {
  CURIOSITY: 'curiosity',
  PERSEVERANCE: 'perseverance',
  OPPORTUNITY: 'opportunity',
  SPIRIT: 'spirit',
} as const;

export const MARS_ROVER_LABELS: Record<string, string> = {
  [MARS_ROVERS.CURIOSITY]: 'Curiosity',
  [MARS_ROVERS.PERSEVERANCE]: 'Perseverance',
  [MARS_ROVERS.OPPORTUNITY]: 'Opportunity',
  [MARS_ROVERS.SPIRIT]: 'Spirit',
};

// Mars Cameras
export const MARS_CAMERAS = {
  FHAZ: 'fhaz',
  RHAZ: 'rhaz',
  MAST: 'mast',
  CHEMCAM: 'chemcam',
  MAHLI: 'mahli',
  MARDI: 'mardi',
  NAVCAM: 'navcam',
  PANCAM: 'pancam',
  MINITES: 'minites',
} as const;

export const MARS_CAMERA_LABELS: Record<string, string> = {
  [MARS_CAMERAS.FHAZ]: 'Front Hazard Avoidance',
  [MARS_CAMERAS.RHAZ]: 'Rear Hazard Avoidance',
  [MARS_CAMERAS.MAST]: 'Mast Camera',
  [MARS_CAMERAS.CHEMCAM]: 'Chemistry Camera',
  [MARS_CAMERAS.MAHLI]: 'Mars Hand Lens Imager',
  [MARS_CAMERAS.MARDI]: 'Mars Descent Imager',
  [MARS_CAMERAS.NAVCAM]: 'Navigation Camera',
  [MARS_CAMERAS.PANCAM]: 'Panoramic Camera',
  [MARS_CAMERAS.MINITES]: 'Mini-TES',
};

// Badges
export const BADGES = {
  MARS_RESEARCHER: 'mars-researcher',
  ASTEROID_ANALYST: 'asteroid-analyst',
  LAB_EXPLORER: 'lab-explorer',
  GLOSSARY_MASTER: 'glossary-master',
  FIRST_STEP: 'first-step',
  QUIZ_EXPERT: 'quiz-expert',
  STREAK_3: 'streak-3',
  COLLECTOR: 'collector',
  // Planetarium badges
  PLANET_EXPLORER: 'planet-explorer',
  GRAND_TOUR: 'grand-tour',
  STARGAZER: 'stargazer',
} as const;

export const BADGE_LABELS: Record<string, { name: string; description: string }> = {
  [BADGES.MARS_RESEARCHER]: {
    name: 'Mars Researcher',
    description: 'Zbadaj 10 zdjęć z Marsa',
  },
  [BADGES.ASTEROID_ANALYST]: {
    name: 'Asteroid Analyst',
    description: 'Przeanalizuj 5 asteroid',
  },
  [BADGES.LAB_EXPLORER]: {
    name: 'Lab Explorer',
    description: 'Ukończ wszystkie laboratoria',
  },
  [BADGES.GLOSSARY_MASTER]: {
    name: 'Glossary Master',
    description: 'Dodaj 10 haseł do nauki',
  },
  [BADGES.FIRST_STEP]: {
    name: 'Pierwszy krok',
    description: 'Ukończ pierwszą lekcję',
  },
  [BADGES.QUIZ_EXPERT]: {
    name: 'Ekspert quizów',
    description: 'Rozwiąż 5 quizów',
  },
  [BADGES.STREAK_3]: {
    name: 'Seria 3 dni',
    description: 'Ucz się przez 3 dni z rzędu',
  },
  [BADGES.COLLECTOR]: {
    name: 'Kolekcjoner',
    description: 'Zapisz 5 zdjęć APOD',
  },
  // Planetarium badges
  [BADGES.PLANET_EXPLORER]: {
    name: 'Planet Explorer',
    description: 'Odwiedź 4 planety w Planetarium',
  },
  [BADGES.GRAND_TOUR]: {
    name: 'Grand Tour',
    description: 'Odwiedź wszystkie planety Układu Słonecznego',
  },
  [BADGES.STARGAZER]: {
    name: 'Stargazer',
    description: 'Spędź 5 minut w Planetarium',
  },
};

// Gravity constants (m/s²)
export const GRAVITY_VALUES: Record<string, number> = {
  earth: 9.81,
  moon: 1.62,
  mars: 3.71,
  jupiter: 24.79,
  venus: 8.87,
  mercury: 3.7,
  saturn: 10.44,
  uranus: 8.69,
  neptune: 11.15,
  sun: 274,
};

// Distances in km
export const COSMIC_DISTANCES: Record<string, number> = {
  moon: 384400,
  mars_min: 54600000,
  mars_avg: 225000000,
  au: 149597870.7,
  jupiter: 628730000,
  saturn: 1275000000,
};
