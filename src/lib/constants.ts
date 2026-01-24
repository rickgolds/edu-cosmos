// NASA API
export const NASA_API_BASE_URL = 'https://api.nasa.gov';
export const NASA_APOD_URL = `${NASA_API_BASE_URL}/planetary/apod`;
export const NASA_IMAGES_API_URL = 'https://images-api.nasa.gov';

// App constants
export const APP_NAME = 'CosmosEdu';
export const APP_DESCRIPTION = 'Interaktywna aplikacja edukacyjna o kosmosie';

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
