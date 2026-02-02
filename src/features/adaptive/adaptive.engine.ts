/**
 * Adaptive Learning - Engine
 *
 * Główna logika silnika adaptacyjnego:
 * - Aktualizacja mastery
 * - Obliczanie kolejki do powtórki
 * - Inicjalizacja tagStats
 */

import { ALL_TAGS, type AdaptiveTag, type DifficultyLevel } from './adaptive.tags';
import {
  type TagStat,
  type QuestionAttempt,
  type MasteryUpdateParams,
  type MasteryUpdateResult,
  type ReviewQueueItem,
  type AdaptiveEngineConfig,
  DEFAULT_ADAPTIVE_CONFIG,
} from './adaptive.types';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get ISO date string for today (without time)
 */
export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Parse ISO date string to Date
 */
export function parseISODate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Check if date is today or in the past
 */
export function isDateDueOrPast(isoDateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = parseISODate(isoDateString);
  date.setHours(0, 0, 0, 0);
  return date <= today;
}

/**
 * Calculate days between two dates
 */
export function daysBetween(dateA: Date, dateB: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((dateA.getTime() - dateB.getTime()) / msPerDay);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Create initial TagStat for a tag
 */
export function createInitialTagStat(tag: AdaptiveTag): TagStat {
  return {
    tag,
    mastery: 0,
    seen: 0,
    correct: 0,
    wrong: 0,
    lastSeenAt: null,
    nextReviewAt: null,
  };
}

/**
 * Initialize tagStats for all tags
 */
export function initializeTagStats(): Record<AdaptiveTag, TagStat> {
  const stats: Partial<Record<AdaptiveTag, TagStat>> = {};
  for (const tag of ALL_TAGS) {
    stats[tag] = createInitialTagStat(tag);
  }
  return stats as Record<AdaptiveTag, TagStat>;
}

/**
 * Ensure all tags exist in tagStats (for migrations)
 */
export function ensureAllTagsExist(
  existing: Partial<Record<AdaptiveTag, TagStat>>
): Record<AdaptiveTag, TagStat> {
  const result = { ...existing } as Record<AdaptiveTag, TagStat>;
  for (const tag of ALL_TAGS) {
    if (!result[tag]) {
      result[tag] = createInitialTagStat(tag);
    }
  }
  return result;
}

// ============================================================================
// MASTERY UPDATE
// ============================================================================

/**
 * Calculate new mastery value after answering a question
 */
export function calculateMasteryDelta(
  isCorrect: boolean,
  difficulty: DifficultyLevel,
  config: AdaptiveEngineConfig = DEFAULT_ADAPTIVE_CONFIG
): number {
  const baseDelta = isCorrect ? config.baseCorrectDelta : config.baseWrongDelta;
  const multiplier = config.difficultyMultipliers[difficulty];
  return baseDelta * multiplier;
}

/**
 * Calculate next review date based on answer and mastery
 */
export function calculateNextReviewDate(
  isCorrect: boolean,
  mastery: number,
  config: AdaptiveEngineConfig = DEFAULT_ADAPTIVE_CONFIG
): Date {
  const now = new Date();

  if (!isCorrect) {
    return addDays(now, config.reviewIntervalWrong);
  }

  if (mastery < config.masteryThreshold) {
    return addDays(now, config.reviewIntervalLowMastery);
  }

  return addDays(now, config.reviewIntervalHighMastery);
}

/**
 * Update mastery for a single tag
 */
export function updateTagStat(
  stat: TagStat,
  isCorrect: boolean,
  difficulty: DifficultyLevel,
  config: AdaptiveEngineConfig = DEFAULT_ADAPTIVE_CONFIG
): TagStat {
  const delta = calculateMasteryDelta(isCorrect, difficulty, config);
  const newMastery = clamp(stat.mastery + delta, 0, 1);
  const now = new Date().toISOString();

  const nextReviewDate = calculateNextReviewDate(isCorrect, newMastery, config);

  return {
    ...stat,
    mastery: newMastery,
    seen: stat.seen + 1,
    correct: isCorrect ? stat.correct + 1 : stat.correct,
    wrong: isCorrect ? stat.wrong : stat.wrong + 1,
    lastSeenAt: now,
    nextReviewAt: nextReviewDate.toISOString(),
  };
}

/**
 * Process a question attempt and update all relevant tag stats
 */
export function processMasteryUpdate(
  currentStats: Record<AdaptiveTag, TagStat>,
  params: MasteryUpdateParams,
  config: AdaptiveEngineConfig = DEFAULT_ADAPTIVE_CONFIG
): MasteryUpdateResult {
  const { questionId, quizId, tags, difficulty, isCorrect, selectedAnswerId, correctAnswerId } =
    params;

  const updatedTags: MasteryUpdateResult['updatedTags'] = [];
  const newStats = { ...currentStats };

  // Update each tag associated with the question
  for (const tag of tags) {
    const oldStat = newStats[tag] || createInitialTagStat(tag);
    const newStat = updateTagStat(oldStat, isCorrect, difficulty, config);

    updatedTags.push({
      tag,
      oldMastery: oldStat.mastery,
      newMastery: newStat.mastery,
      delta: newStat.mastery - oldStat.mastery,
    });

    newStats[tag] = newStat;
  }

  // Create the attempt record
  const newAttempt: QuestionAttempt = {
    questionId,
    quizId,
    tags,
    difficulty,
    isCorrect,
    selectedAnswerId,
    correctAnswerId,
    attemptedAt: new Date().toISOString(),
  };

  return {
    updatedTags,
    newAttempt,
  };
}

// ============================================================================
// REVIEW QUEUE
// ============================================================================

/**
 * Compute the review queue - tags that need review
 */
export function computeReviewQueue(
  tagStats: Record<AdaptiveTag, TagStat>
): ReviewQueueItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const queue: ReviewQueueItem[] = [];

  for (const tag of ALL_TAGS) {
    const stat = tagStats[tag];
    if (!stat || !stat.nextReviewAt || stat.seen === 0) {
      continue;
    }

    const reviewDate = parseISODate(stat.nextReviewAt);
    reviewDate.setHours(0, 0, 0, 0);

    const isOverdue = reviewDate <= today;
    const daysOverdue = isOverdue ? daysBetween(today, reviewDate) : 0;

    if (isOverdue) {
      queue.push({
        tag,
        mastery: stat.mastery,
        nextReviewAt: stat.nextReviewAt,
        isOverdue,
        daysOverdue,
      });
    }
  }

  // Sort by overdue days (most overdue first) then by mastery (lowest first)
  queue.sort((a, b) => {
    if (a.daysOverdue !== b.daysOverdue) {
      return b.daysOverdue - a.daysOverdue;
    }
    return a.mastery - b.mastery;
  });

  return queue;
}

/**
 * Get tags with lowest mastery (weak areas)
 */
export function getWeakestTags(
  tagStats: Record<AdaptiveTag, TagStat>,
  limit: number = 5
): TagStat[] {
  const seenTags = ALL_TAGS
    .map((tag) => tagStats[tag])
    .filter((stat) => stat && stat.seen > 0);

  // Sort by mastery (lowest first)
  seenTags.sort((a, b) => a.mastery - b.mastery);

  return seenTags.slice(0, limit);
}

/**
 * Get overall mastery (average across all seen tags)
 */
export function getOverallMastery(tagStats: Record<AdaptiveTag, TagStat>): number {
  const seenTags = ALL_TAGS
    .map((tag) => tagStats[tag])
    .filter((stat) => stat && stat.seen > 0);

  if (seenTags.length === 0) return 0;

  const sum = seenTags.reduce((acc, stat) => acc + stat.mastery, 0);
  return sum / seenTags.length;
}

/**
 * Get tags that haven't been seen yet
 */
export function getUnseenTags(tagStats: Record<AdaptiveTag, TagStat>): AdaptiveTag[] {
  return ALL_TAGS.filter((tag) => {
    const stat = tagStats[tag];
    return !stat || stat.seen === 0;
  });
}
