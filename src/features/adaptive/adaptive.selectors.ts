/**
 * Adaptive Learning - Selectors
 *
 * Helper functions do odczytu i agregacji danych z progress.
 */

import { ALL_TAGS, TAG_LABELS, TAG_GROUPS, type AdaptiveTag } from './adaptive.tags';
import type {
  TagStat,
  QuestionAttempt,
  MisconceptionFlag,
  RecommendationState,
} from './adaptive.types';
import { getOverallMastery, getWeakestTags, getUnseenTags } from './adaptive.engine';
import { getActiveMisconceptions, getMisconceptionsWithRules } from './adaptive.misconceptions';

// ============================================================================
// TAG STATS SELECTORS
// ============================================================================

/**
 * Get tag stats sorted by mastery (lowest first)
 */
export function getTagStatsSortedByMastery(
  tagStats: Record<AdaptiveTag, TagStat>
): TagStat[] {
  return ALL_TAGS
    .map((tag) => tagStats[tag])
    .filter((stat) => stat != null)
    .sort((a, b) => a.mastery - b.mastery);
}

/**
 * Get tag stats sorted by last seen (most recent first)
 */
export function getTagStatsSortedByRecent(
  tagStats: Record<AdaptiveTag, TagStat>
): TagStat[] {
  return ALL_TAGS
    .map((tag) => tagStats[tag])
    .filter((stat) => stat != null && stat.lastSeenAt != null)
    .sort((a, b) => {
      const dateA = new Date(a.lastSeenAt!).getTime();
      const dateB = new Date(b.lastSeenAt!).getTime();
      return dateB - dateA;
    });
}

/**
 * Get tag stats grouped by category
 */
export function getTagStatsGrouped(
  tagStats: Record<AdaptiveTag, TagStat>
): Record<string, { label: string; stats: TagStat[] }> {
  const result: Record<string, { label: string; stats: TagStat[] }> = {};

  for (const [groupKey, group] of Object.entries(TAG_GROUPS)) {
    result[groupKey] = {
      label: group.label,
      stats: group.tags
        .map((tag) => tagStats[tag])
        .filter((stat) => stat != null),
    };
  }

  return result;
}

/**
 * Get mastery level description
 */
export function getMasteryLevel(mastery: number): {
  level: 'beginner' | 'developing' | 'proficient' | 'expert';
  label: string;
  color: string;
} {
  if (mastery >= 0.8) {
    return { level: 'expert', label: 'Ekspert', color: 'text-green-400' };
  }
  if (mastery >= 0.6) {
    return { level: 'proficient', label: 'Zaawansowany', color: 'text-cyan-400' };
  }
  if (mastery >= 0.3) {
    return { level: 'developing', label: 'Rozwijający się', color: 'text-yellow-400' };
  }
  return { level: 'beginner', label: 'Początkujący', color: 'text-gray-400' };
}

/**
 * Get progress summary for dashboard
 */
export function getProgressSummary(
  tagStats: Record<AdaptiveTag, TagStat>,
  questionHistory: QuestionAttempt[],
  misconceptions: MisconceptionFlag[]
) {
  const seenTags = ALL_TAGS.filter((tag) => tagStats[tag]?.seen > 0);
  const unseenTags = getUnseenTags(tagStats);
  const weakestTags = getWeakestTags(tagStats, 3);
  const overallMastery = getOverallMastery(tagStats);
  const activeMisconceptions = getActiveMisconceptions(misconceptions);

  // Calculate accuracy from recent attempts
  const recentAttempts = questionHistory.slice(-50); // Last 50
  const correctCount = recentAttempts.filter((a) => a.isCorrect).length;
  const accuracy = recentAttempts.length > 0 ? correctCount / recentAttempts.length : 0;

  return {
    tagsExplored: seenTags.length,
    tagsTotal: ALL_TAGS.length,
    tagsRemaining: unseenTags.length,
    overallMastery,
    masteryLevel: getMasteryLevel(overallMastery),
    weakestTags: weakestTags.map((t) => ({
      tag: t.tag,
      label: TAG_LABELS[t.tag],
      mastery: t.mastery,
    })),
    totalQuestions: questionHistory.length,
    recentAccuracy: accuracy,
    activeMisconceptions: activeMisconceptions.length,
  };
}

// ============================================================================
// QUESTION HISTORY SELECTORS
// ============================================================================

/**
 * Get attempts for a specific tag
 */
export function getAttemptsForTag(
  questionHistory: QuestionAttempt[],
  tag: AdaptiveTag
): QuestionAttempt[] {
  return questionHistory.filter((a) => a.tags.includes(tag));
}

/**
 * Get attempts from the last N days
 */
export function getRecentAttempts(
  questionHistory: QuestionAttempt[],
  days: number
): QuestionAttempt[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return questionHistory.filter((a) => new Date(a.attemptedAt) > cutoff);
}

/**
 * Get accuracy stats by tag
 */
export function getAccuracyByTag(
  questionHistory: QuestionAttempt[]
): Record<AdaptiveTag, { correct: number; total: number; accuracy: number }> {
  const stats: Record<AdaptiveTag, { correct: number; total: number; accuracy: number }> =
    {} as Record<AdaptiveTag, { correct: number; total: number; accuracy: number }>;

  for (const tag of ALL_TAGS) {
    const attempts = getAttemptsForTag(questionHistory, tag);
    const correct = attempts.filter((a) => a.isCorrect).length;
    const total = attempts.length;
    stats[tag] = {
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    };
  }

  return stats;
}

// ============================================================================
// MISCONCEPTION SELECTORS
// ============================================================================

/**
 * Get active misconceptions with full details
 */
export function getActiveMisconceptionDetails(misconceptions: MisconceptionFlag[]) {
  const withRules = getMisconceptionsWithRules(misconceptions);
  return withRules
    .filter(({ flag }) => !flag.resolved)
    .map(({ flag, rule }) => ({
      id: rule.id,
      title: rule.title,
      description: rule.description,
      userMessage: rule.userMessage,
      relatedTags: rule.relatedTags.map((t) => ({
        tag: t,
        label: TAG_LABELS[t],
      })),
      recommendedLessonSlug: rule.recommendedLessonSlug,
      detectedAt: flag.detectedAt,
    }));
}

// ============================================================================
// RECOMMENDATION SELECTORS
// ============================================================================

/**
 * Get recommendations by type
 */
export function getRecommendationsByType(
  recommendations: RecommendationState | null,
  type: 'lesson' | 'review' | 'quiz'
) {
  if (!recommendations) return [];
  return recommendations.items.filter((r) => r.type === type);
}

/**
 * Get the top recommendation
 */
export function getTopRecommendation(recommendations: RecommendationState | null) {
  if (!recommendations || recommendations.items.length === 0) return null;
  return recommendations.items[0];
}

/**
 * Check if there are any recommendations
 */
export function hasRecommendations(recommendations: RecommendationState | null): boolean {
  return recommendations != null && recommendations.items.length > 0;
}
