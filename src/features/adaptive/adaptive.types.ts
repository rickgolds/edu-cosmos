/**
 * Adaptive Learning - Type Definitions
 *
 * Typy dla silnika adaptacyjnego uczenia.
 */

import type { AdaptiveTag, DifficultyLevel } from './adaptive.tags';

/**
 * Statystyki dla pojedynczego tagu
 */
export interface TagStat {
  tag: AdaptiveTag;
  mastery: number; // 0..1
  seen: number; // liczba widzianych pytań
  correct: number; // liczba poprawnych odpowiedzi
  wrong: number; // liczba błędnych odpowiedzi
  lastSeenAt: string | null; // ISO date
  nextReviewAt: string | null; // ISO date - kiedy powtórka
}

/**
 * Pojedyncza próba odpowiedzi na pytanie
 */
export interface QuestionAttempt {
  questionId: string;
  quizId: string;
  tags: AdaptiveTag[];
  difficulty: DifficultyLevel;
  isCorrect: boolean;
  selectedAnswerId: string;
  correctAnswerId: string;
  attemptedAt: string; // ISO date
}

/**
 * Wykryte błędne przekonanie (misconception)
 */
export interface MisconceptionFlag {
  ruleId: string;
  detectedAt: string; // ISO date
  triggerCount: number; // ile razy wykryto pattern
  resolved: boolean; // czy użytkownik "naprawił" błąd
  resolvedAt?: string; // ISO date
}

/**
 * Pojedyncza rekomendacja
 */
export interface Recommendation {
  id: string;
  type: 'lesson' | 'review' | 'quiz';
  targetSlug: string; // lesson slug lub quiz id
  targetTitle: string;
  tags: AdaptiveTag[];
  reason: RecommendationReason;
  priority: number; // 1-10, wyższy = ważniejszy
  createdAt: string; // ISO date
}

/**
 * Powód rekomendacji
 */
export interface RecommendationReason {
  type: 'low_mastery' | 'review_due' | 'misconception' | 'not_started' | 'incomplete';
  details: string; // np. "Mastery w 'orbits' wynosi tylko 25%"
  tagsMentioned?: AdaptiveTag[];
}

/**
 * Stan rekomendacji (cache)
 */
export interface RecommendationState {
  items: Recommendation[];
  generatedAt: string; // ISO date
  validUntil: string; // ISO date - cache ważny do
}

/**
 * Rozszerzenie progress data o adaptive learning (v4)
 */
export interface AdaptiveProgressData {
  // Nowe pola w v4
  tagStats: Record<AdaptiveTag, TagStat>;
  questionHistory: QuestionAttempt[];
  misconceptions: MisconceptionFlag[];
  recommendations: RecommendationState | null;
}

/**
 * Parametry dla updateMastery
 */
export interface MasteryUpdateParams {
  questionId: string;
  quizId: string;
  tags: AdaptiveTag[];
  difficulty: DifficultyLevel;
  isCorrect: boolean;
  selectedAnswerId: string;
  correctAnswerId: string;
}

/**
 * Wynik aktualizacji mastery
 */
export interface MasteryUpdateResult {
  updatedTags: {
    tag: AdaptiveTag;
    oldMastery: number;
    newMastery: number;
    delta: number;
  }[];
  newAttempt: QuestionAttempt;
}

/**
 * Element kolejki do powtórki
 */
export interface ReviewQueueItem {
  tag: AdaptiveTag;
  mastery: number;
  nextReviewAt: string;
  isOverdue: boolean;
  daysOverdue: number;
}

/**
 * Reguła wykrywania misconception
 */
export interface MisconceptionRule {
  id: string;
  title: string;
  description: string;
  // Funkcja sprawdzająca czy pattern wystąpił
  checkCondition: (attempts: QuestionAttempt[]) => boolean;
  // Minimalna liczba wystąpień do aktywacji
  minTriggerCount: number;
  // Powiązane tagi
  relatedTags: AdaptiveTag[];
  // Rekomendowana lekcja do naprawy
  recommendedLessonSlug?: string;
  // Wiadomość dla użytkownika
  userMessage: string;
}

/**
 * Konfiguracja silnika adaptacyjnego
 */
export interface AdaptiveEngineConfig {
  // Delta mastery
  baseCorrectDelta: number; // default: +0.06
  baseWrongDelta: number; // default: -0.08
  difficultyMultipliers: Record<DifficultyLevel, number>; // {1: 0.8, 2: 1.0, 3: 1.2}

  // Review intervals (w dniach)
  reviewIntervalWrong: number; // default: 1
  reviewIntervalLowMastery: number; // default: 3 (jeśli mastery < 0.6)
  reviewIntervalHighMastery: number; // default: 7 (jeśli mastery >= 0.6)
  masteryThreshold: number; // default: 0.6

  // Recommendations cache
  recommendationCacheHours: number; // default: 6
}

/**
 * Domyślna konfiguracja
 */
export const DEFAULT_ADAPTIVE_CONFIG: AdaptiveEngineConfig = {
  baseCorrectDelta: 0.15,
  baseWrongDelta: -0.12,
  difficultyMultipliers: {
    1: 0.9,
    2: 1.0,
    3: 1.15,
  },
  reviewIntervalWrong: 1,
  reviewIntervalLowMastery: 3,
  reviewIntervalHighMastery: 7,
  masteryThreshold: 0.6,
  recommendationCacheHours: 6,
};
