/**
 * Adaptive Learning - Recommendations Generator
 *
 * Deterministyczny generator rekomendacji "3 rzeczy na dziś".
 */

import type { Lesson } from '@/data/lessons';
import type { Quiz } from '@/features/quiz-engine';
import type { LessonProgress } from '@/hooks/useProgress';
import { ADAPTIVE_TAGS, TAG_LABELS, type AdaptiveTag } from './adaptive.tags';
import type {
  TagStat,
  Recommendation,
  RecommendationState,
  MisconceptionFlag,
  RecommendationReason,
  QuestionAttempt,
} from './adaptive.types';
import {
  computeReviewQueue,
  getWeakestTags,
  getUnseenTags,
  addDays,
} from './adaptive.engine';
import { getMisconceptionRuleById, getActiveMisconceptions } from './adaptive.misconceptions';

// ============================================================================
// TYPES FOR EXTENDED CONTENT (with tags)
// ============================================================================

export interface LessonWithTags extends Lesson {
  tags?: AdaptiveTag[];
}

export interface QuizWithTags extends Quiz {
  tags?: AdaptiveTag[];
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get tags from a lesson (using category fallback if no explicit tags)
 */
export function getLessonTags(lesson: LessonWithTags): AdaptiveTag[] {
  if (lesson.tags && lesson.tags.length > 0) {
    return lesson.tags;
  }

  // Fallback: map category to tags
  const categoryTagMap: Record<string, AdaptiveTag[]> = {
    'solar-system': [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.PLANETS],
    stars: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.STELLAR_EVOLUTION],
    galaxies: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.BLACK_HOLES],
    rockets: [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON],
    telescopes: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
  };

  return categoryTagMap[lesson.category] || [];
}

/**
 * Get tags from a quiz
 */
export function getQuizTags(quiz: QuizWithTags): AdaptiveTag[] {
  if (quiz.tags && quiz.tags.length > 0) {
    return quiz.tags;
  }

  // Fallback: map category to tags
  const categoryTagMap: Record<string, AdaptiveTag[]> = {
    'solar-system': [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.PLANETS],
    stars: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.STELLAR_EVOLUTION],
    galaxies: [ADAPTIVE_TAGS.GALAXIES],
    exploration: [ADAPTIVE_TAGS.SPACE_MISSIONS],
    quick: [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.GALAXIES],
  };

  return categoryTagMap[quiz.category || ''] || [];
}

/**
 * Calculate average mastery for given tags
 */
function getAverageMasteryForTags(
  tagStats: Record<AdaptiveTag, TagStat>,
  tags: AdaptiveTag[]
): number {
  if (tags.length === 0) return 0.5; // neutral

  const masteries = tags.map((t) => tagStats[t]?.mastery || 0);
  return masteries.reduce((a, b) => a + b, 0) / masteries.length;
}

/**
 * Check if lesson was completed recently (within last 7 days)
 */
function wasLessonRecentlyCompleted(
  lessonProgress: LessonProgress | null,
  days: number = 7
): boolean {
  if (!lessonProgress?.completed || !lessonProgress.completedAt) {
    return false;
  }

  const completedDate = new Date(lessonProgress.completedAt);
  const cutoff = addDays(new Date(), -days);
  return completedDate > cutoff;
}

// ============================================================================
// RECOMMENDATION GENERATORS
// ============================================================================

/**
 * Generate lesson recommendation
 */
function generateLessonRecommendation(
  lessons: LessonWithTags[],
  lessonsProgress: Record<string, LessonProgress>,
  tagStats: Record<AdaptiveTag, TagStat>,
  misconceptions: MisconceptionFlag[]
): Recommendation | null {
  const now = new Date().toISOString();

  // Priority 1: Check for misconception-related lessons
  const activeMisconceptions = getActiveMisconceptions(misconceptions);
  for (const m of activeMisconceptions) {
    const rule = getMisconceptionRuleById(m.ruleId);
    if (rule?.recommendedLessonSlug) {
      const lesson = lessons.find((l) => l.slug === rule.recommendedLessonSlug);
      if (lesson) {
        return {
          id: `lesson-misconception-${lesson.slug}`,
          type: 'lesson',
          targetSlug: lesson.slug,
          targetTitle: lesson.title,
          tags: getLessonTags(lesson),
          priority: 10,
          createdAt: now,
          reason: {
            type: 'misconception',
            details: `Powiązane z wykrytym problemem: "${rule.title}"`,
            tagsMentioned: rule.relatedTags,
          },
        };
      }
    }
  }

  // Priority 2: Incomplete lessons with low mastery tags
  const weakestTags = getWeakestTags(tagStats, 3);
  const weakTagSet = new Set(weakestTags.map((t) => t.tag));

  const incompleteLessons = lessons.filter((l) => {
    const progress = lessonsProgress[l.slug];
    return !progress?.completed;
  });

  // Score lessons by overlap with weak tags
  const scoredLessons = incompleteLessons.map((lesson) => {
    const lessonTags = getLessonTags(lesson);
    const weakOverlap = lessonTags.filter((t) => weakTagSet.has(t)).length;
    const avgMastery = getAverageMasteryForTags(tagStats, lessonTags);
    return { lesson, score: weakOverlap * 10 + (1 - avgMastery) * 5 };
  });

  scoredLessons.sort((a, b) => b.score - a.score);

  if (scoredLessons.length > 0) {
    const best = scoredLessons[0];
    const lessonTags = getLessonTags(best.lesson);
    const avgMastery = getAverageMasteryForTags(tagStats, lessonTags);

    return {
      id: `lesson-weak-${best.lesson.slug}`,
      type: 'lesson',
      targetSlug: best.lesson.slug,
      targetTitle: best.lesson.title,
      tags: lessonTags,
      priority: 8,
      createdAt: now,
      reason: {
        type: 'low_mastery',
        details: `Mastery w powiązanych tematach: ${Math.round(avgMastery * 100)}%`,
        tagsMentioned: lessonTags.slice(0, 2),
      },
    };
  }

  // Priority 3: Any not-recently-completed lesson
  const notRecentlyCompleted = lessons.filter((l) => {
    const progress = lessonsProgress[l.slug];
    return !wasLessonRecentlyCompleted(progress, 14);
  });

  if (notRecentlyCompleted.length > 0) {
    const lesson = notRecentlyCompleted[0];
    const progress = lessonsProgress[lesson.slug];
    const lessonTags = getLessonTags(lesson);

    return {
      id: `lesson-revisit-${lesson.slug}`,
      type: 'lesson',
      targetSlug: lesson.slug,
      targetTitle: lesson.title,
      tags: lessonTags,
      priority: 5,
      createdAt: now,
      reason: {
        type: progress?.completed ? 'incomplete' : 'not_started',
        details: progress?.completed
          ? 'Dawno nieodwiedzana lekcja - warto odświeżyć!'
          : 'Nowa lekcja do odkrycia',
        tagsMentioned: lessonTags.slice(0, 2),
      },
    };
  }

  return null;
}

/**
 * Generate review recommendation
 */
function generateReviewRecommendation(
  tagStats: Record<AdaptiveTag, TagStat>
): Recommendation | null {
  const now = new Date().toISOString();
  const reviewQueue = computeReviewQueue(tagStats);

  if (reviewQueue.length === 0) {
    return null;
  }

  // Pick the most overdue tag
  const topItem = reviewQueue[0];
  const tagLabel = TAG_LABELS[topItem.tag] || topItem.tag;

  return {
    id: `review-${topItem.tag}`,
    type: 'review',
    targetSlug: topItem.tag, // Tag as target
    targetTitle: `Powtórka: ${tagLabel}`,
    tags: [topItem.tag],
    priority: topItem.daysOverdue > 3 ? 9 : 7,
    createdAt: now,
    reason: {
      type: 'review_due',
      details:
        topItem.daysOverdue > 0
          ? `Zaległa powtórka od ${topItem.daysOverdue} dni. Mastery: ${Math.round(topItem.mastery * 100)}%`
          : `Czas na powtórkę! Mastery: ${Math.round(topItem.mastery * 100)}%`,
      tagsMentioned: [topItem.tag],
    },
  };
}

/**
 * Generate quiz recommendation
 */
function generateQuizRecommendation(
  quizzes: QuizWithTags[],
  tagStats: Record<AdaptiveTag, TagStat>,
  recentAttempts: QuestionAttempt[]
): Recommendation | null {
  const now = new Date().toISOString();

  // Get weakest tags
  const weakestTags = getWeakestTags(tagStats, 3);
  const weakTagSet = new Set(weakestTags.map((t) => t.tag));

  // Get quizzes not taken recently
  const recentQuizIds = new Set(
    recentAttempts
      .filter((a) => {
        const date = new Date(a.attemptedAt);
        const cutoff = addDays(new Date(), -3);
        return date > cutoff;
      })
      .map((a) => a.quizId)
  );

  const availableQuizzes = quizzes.filter((q) => !recentQuizIds.has(q.id));

  if (availableQuizzes.length === 0 && quizzes.length > 0) {
    // Fallback: use any quiz
    availableQuizzes.push(...quizzes);
  }

  // Score quizzes by overlap with weak tags
  const scoredQuizzes = availableQuizzes.map((quiz) => {
    const quizTags = getQuizTags(quiz);
    const weakOverlap = quizTags.filter((t) => weakTagSet.has(t)).length;
    return { quiz, score: weakOverlap };
  });

  scoredQuizzes.sort((a, b) => b.score - a.score);

  if (scoredQuizzes.length > 0) {
    const best = scoredQuizzes[0];
    const quizTags = getQuizTags(best.quiz);
    const avgMastery = getAverageMasteryForTags(tagStats, quizTags);

    return {
      id: `quiz-${best.quiz.id}`,
      type: 'quiz',
      targetSlug: best.quiz.id,
      targetTitle: best.quiz.title,
      tags: quizTags,
      priority: 6,
      createdAt: now,
      reason: {
        type: 'low_mastery',
        details: `Sprawdź wiedzę w tematach z mastery ${Math.round(avgMastery * 100)}%`,
        tagsMentioned: quizTags.slice(0, 2),
      },
    };
  }

  return null;
}

// ============================================================================
// MAIN GENERATOR
// ============================================================================

export interface GenerateRecommendationsParams {
  lessons: LessonWithTags[];
  quizzes: QuizWithTags[];
  lessonsProgress: Record<string, LessonProgress>;
  tagStats: Record<AdaptiveTag, TagStat>;
  questionHistory: QuestionAttempt[];
  misconceptions: MisconceptionFlag[];
}

/**
 * Generate "3 things for today" recommendations
 */
export function generateRecommendations(
  params: GenerateRecommendationsParams
): RecommendationState {
  const { lessons, quizzes, lessonsProgress, tagStats, questionHistory, misconceptions } = params;

  const recommendations: Recommendation[] = [];
  const now = new Date();

  // A) Lesson recommendation
  const lessonRec = generateLessonRecommendation(
    lessons,
    lessonsProgress,
    tagStats,
    misconceptions
  );
  if (lessonRec) {
    recommendations.push(lessonRec);
  }

  // B) Review recommendation
  const reviewRec = generateReviewRecommendation(tagStats);
  if (reviewRec) {
    recommendations.push(reviewRec);
  }

  // C) Quiz recommendation
  const quizRec = generateQuizRecommendation(quizzes, tagStats, questionHistory);
  if (quizRec) {
    recommendations.push(quizRec);
  }

  // Sort by priority (highest first)
  recommendations.sort((a, b) => b.priority - a.priority);

  // Limit to 3
  const items = recommendations.slice(0, 3);

  // Cache valid for 6 hours
  const validUntil = addDays(now, 0.25); // 6 hours = 0.25 days

  return {
    items,
    generatedAt: now.toISOString(),
    validUntil: validUntil.toISOString(),
  };
}

/**
 * Check if recommendations cache is still valid
 */
export function isRecommendationsCacheValid(state: RecommendationState | null): boolean {
  if (!state || !state.validUntil) {
    return false;
  }

  const validUntil = new Date(state.validUntil);
  return validUntil > new Date();
}

/**
 * Get human-readable reason for recommendation
 */
export function getRecommendationReasonText(reason: RecommendationReason): string {
  switch (reason.type) {
    case 'low_mastery':
      return `📉 ${reason.details}`;
    case 'review_due':
      return `🔄 ${reason.details}`;
    case 'misconception':
      return `⚠️ ${reason.details}`;
    case 'not_started':
      return `🆕 ${reason.details}`;
    case 'incomplete':
      return `📖 ${reason.details}`;
    default:
      return reason.details;
  }
}
