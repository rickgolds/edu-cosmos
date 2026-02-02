'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, PROGRESS_VERSION, BADGES } from '@/lib/constants';
import { calculateStreak, formatDateForApi } from '@/lib/date-utils';
import {
  type AdaptiveTag,
  type TagStat,
  type QuestionAttempt,
  type MisconceptionFlag,
  type RecommendationState,
  type MasteryUpdateParams,
  initializeTagStats,
  ensureAllTagsExist,
  processMasteryUpdate,
  evaluateMisconceptionRules,
  resolveMisconception as resolveMisconceptionFn,
  generateRecommendations,
  isRecommendationsCacheValid,
  type LessonWithTags,
  type QuizWithTags,
} from '@/features/adaptive';

// Progress data types
export interface LessonProgress {
  lessonSlug: string;
  completed: boolean;
  quizScore: number | null;
  completedAt: string | null;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  answers: Record<string, string>;
}

export interface MarsExploration {
  photoId: number;
  rover: string;
  sol: number;
  completedAt: string;
  checklistCompleted: string[];
}

export interface LabCompletion {
  labId: string;
  completedAt: string;
  score?: number;
}

export interface AsteroidAnalysis {
  neoId: string;
  analyzedAt: string;
}

export interface PlanetVisit {
  planetId: string;
  firstSeenAt: string;
  lastSeenAt: string;
  totalSecondsSpent: number;
}

export interface ProgressData {
  version: number;
  lessonsProgress: Record<string, LessonProgress>;
  quizResults: QuizResult[];
  bookmarks: string[]; // APOD dates
  activityDates: string[];
  lastActive: string | null;
  // New fields (v2)
  badges: string[];
  marsExplorations: MarsExploration[];
  labCompletions: LabCompletion[];
  asteroidAnalyses: AsteroidAnalysis[];
  glossaryStudyList: string[];
  // New fields (v3) - Planetarium
  planetariumVisits: PlanetVisit[];
  planetariumTotalSeconds: number;
  // New fields (v4) - Adaptive Learning
  tagStats: Record<AdaptiveTag, TagStat>;
  questionHistory: QuestionAttempt[];
  misconceptions: MisconceptionFlag[];
  recommendations: RecommendationState | null;
}

const initialProgress: ProgressData = {
  version: PROGRESS_VERSION,
  lessonsProgress: {},
  quizResults: [],
  bookmarks: [],
  activityDates: [],
  lastActive: null,
  badges: [],
  marsExplorations: [],
  labCompletions: [],
  asteroidAnalyses: [],
  glossaryStudyList: [],
  // v3 - Planetarium
  planetariumVisits: [],
  planetariumTotalSeconds: 0,
  // v4 - Adaptive Learning
  tagStats: initializeTagStats(),
  questionHistory: [],
  misconceptions: [],
  recommendations: null,
};

/**
 * Migrate old progress data to new version
 */
function migrateProgress(data: Partial<ProgressData>): ProgressData {
  const version = data.version || 1;

  // Base structure from v1
  const migrated: ProgressData = {
    version: PROGRESS_VERSION,
    lessonsProgress: data.lessonsProgress || {},
    quizResults: data.quizResults || [],
    bookmarks: data.bookmarks || [],
    activityDates: data.activityDates || [],
    lastActive: data.lastActive || null,
    // New v2 fields with defaults
    badges: data.badges || [],
    marsExplorations: data.marsExplorations || [],
    labCompletions: data.labCompletions || [],
    asteroidAnalyses: data.asteroidAnalyses || [],
    glossaryStudyList: data.glossaryStudyList || [],
    // New v3 fields - Planetarium
    planetariumVisits: data.planetariumVisits || [],
    planetariumTotalSeconds: data.planetariumTotalSeconds || 0,
    // New v4 fields - Adaptive Learning
    tagStats: data.tagStats
      ? ensureAllTagsExist(data.tagStats)
      : initializeTagStats(),
    questionHistory: data.questionHistory || [],
    misconceptions: data.misconceptions || [],
    recommendations: data.recommendations || null,
  };

  // v4 specific migration: ensure all tags exist
  if (version < 4 && data.tagStats) {
    migrated.tagStats = ensureAllTagsExist(data.tagStats);
  }

  return migrated;
}

/**
 * Main progress tracking hook
 */
export function useProgress() {
  const [progress, setProgress, clearProgress] = useLocalStorage<ProgressData>(
    STORAGE_KEYS.PROGRESS,
    initialProgress
  );

  // Migrate on load if needed
  useEffect(() => {
    if (!progress.version || progress.version < PROGRESS_VERSION) {
      setProgress(migrateProgress(progress));
    }
  }, [progress, setProgress]);

  // Record activity (for streak)
  const recordActivity = useCallback(() => {
    const today = formatDateForApi(new Date());
    setProgress((prev) => {
      if (prev.activityDates.includes(today)) {
        return { ...prev, lastActive: today };
      }
      return {
        ...prev,
        activityDates: [...prev.activityDates, today],
        lastActive: today,
      };
    });
  }, [setProgress]);

  // Complete a lesson
  const completeLesson = useCallback(
    (lessonSlug: string, quizScore: number | null) => {
      recordActivity();
      setProgress((prev) => {
        const newProgress = {
          ...prev,
          lessonsProgress: {
            ...prev.lessonsProgress,
            [lessonSlug]: {
              lessonSlug,
              completed: true,
              quizScore,
              completedAt: new Date().toISOString(),
            },
          },
        };
        // Check for first step badge
        if (!prev.badges.includes(BADGES.FIRST_STEP)) {
          newProgress.badges = [...prev.badges, BADGES.FIRST_STEP];
        }
        return newProgress;
      });
    },
    [setProgress, recordActivity]
  );

  // Save quiz result
  const saveQuizResult = useCallback(
    (result: Omit<QuizResult, 'completedAt'>) => {
      recordActivity();
      setProgress((prev) => {
        const newQuizResults = [
          ...prev.quizResults,
          { ...result, completedAt: new Date().toISOString() },
        ];
        const badges = [...prev.badges];
        // Check for quiz expert badge
        if (newQuizResults.length >= 5 && !badges.includes(BADGES.QUIZ_EXPERT)) {
          badges.push(BADGES.QUIZ_EXPERT);
        }
        return { ...prev, quizResults: newQuizResults, badges };
      });
    },
    [setProgress, recordActivity]
  );

  // Toggle bookmark
  const toggleBookmark = useCallback(
    (apodDate: string) => {
      setProgress((prev) => {
        const isBookmarked = prev.bookmarks.includes(apodDate);
        const newBookmarks = isBookmarked
          ? prev.bookmarks.filter((d) => d !== apodDate)
          : [...prev.bookmarks, apodDate];
        const badges = [...prev.badges];
        // Check for collector badge
        if (newBookmarks.length >= 5 && !badges.includes(BADGES.COLLECTOR)) {
          badges.push(BADGES.COLLECTOR);
        }
        return { ...prev, bookmarks: newBookmarks, badges };
      });
    },
    [setProgress]
  );

  // Check if APOD is bookmarked
  const isBookmarked = useCallback(
    (apodDate: string) => progress.bookmarks.includes(apodDate),
    [progress.bookmarks]
  );

  // Get lesson progress
  const getLessonProgress = useCallback(
    (lessonSlug: string) => progress.lessonsProgress[lessonSlug] || null,
    [progress.lessonsProgress]
  );

  // Add Mars exploration
  const addMarsExploration = useCallback(
    (exploration: Omit<MarsExploration, 'completedAt'>) => {
      recordActivity();
      setProgress((prev) => {
        // Check if already explored
        if (prev.marsExplorations.some((e) => e.photoId === exploration.photoId)) {
          // Update checklist
          return {
            ...prev,
            marsExplorations: prev.marsExplorations.map((e) =>
              e.photoId === exploration.photoId
                ? { ...e, checklistCompleted: exploration.checklistCompleted }
                : e
            ),
          };
        }
        const newExplorations = [
          ...prev.marsExplorations,
          { ...exploration, completedAt: new Date().toISOString() },
        ];
        const badges = [...prev.badges];
        // Check for Mars researcher badge
        if (newExplorations.length >= 10 && !badges.includes(BADGES.MARS_RESEARCHER)) {
          badges.push(BADGES.MARS_RESEARCHER);
        }
        return { ...prev, marsExplorations: newExplorations, badges };
      });
    },
    [setProgress, recordActivity]
  );

  // Add lab completion
  const completeLabCallback = useCallback(
    (labId: string, score?: number) => {
      recordActivity();
      setProgress((prev) => {
        // Check if already completed
        if (prev.labCompletions.some((l) => l.labId === labId)) {
          return prev;
        }
        const newCompletions = [
          ...prev.labCompletions,
          { labId, completedAt: new Date().toISOString(), score },
        ];
        const badges = [...prev.badges];
        // Check for lab explorer badge (2 labs = all)
        if (newCompletions.length >= 2 && !badges.includes(BADGES.LAB_EXPLORER)) {
          badges.push(BADGES.LAB_EXPLORER);
        }
        return { ...prev, labCompletions: newCompletions, badges };
      });
    },
    [setProgress, recordActivity]
  );

  // Add asteroid analysis
  const addAsteroidAnalysis = useCallback(
    (neoId: string) => {
      recordActivity();
      setProgress((prev) => {
        if (prev.asteroidAnalyses.some((a) => a.neoId === neoId)) {
          return prev;
        }
        const newAnalyses = [
          ...prev.asteroidAnalyses,
          { neoId, analyzedAt: new Date().toISOString() },
        ];
        const badges = [...prev.badges];
        if (newAnalyses.length >= 5 && !badges.includes(BADGES.ASTEROID_ANALYST)) {
          badges.push(BADGES.ASTEROID_ANALYST);
        }
        return { ...prev, asteroidAnalyses: newAnalyses, badges };
      });
    },
    [setProgress, recordActivity]
  );

  // Toggle glossary term in study list
  const toggleGlossaryTerm = useCallback(
    (termId: string) => {
      setProgress((prev) => {
        const inList = prev.glossaryStudyList.includes(termId);
        const newList = inList
          ? prev.glossaryStudyList.filter((t) => t !== termId)
          : [...prev.glossaryStudyList, termId];
        const badges = [...prev.badges];
        if (newList.length >= 10 && !badges.includes(BADGES.GLOSSARY_MASTER)) {
          badges.push(BADGES.GLOSSARY_MASTER);
        }
        return { ...prev, glossaryStudyList: newList, badges };
      });
    },
    [setProgress]
  );

  // Check if term is in study list
  const isTermInStudyList = useCallback(
    (termId: string) => (progress.glossaryStudyList ?? []).includes(termId),
    [progress.glossaryStudyList]
  );

  // Check if Mars photo is explored
  const isMarsPhotoExplored = useCallback(
    (photoId: number) => (progress.marsExplorations ?? []).some((e) => e.photoId === photoId),
    [progress.marsExplorations]
  );

  // Get Mars photo exploration
  const getMarsExploration = useCallback(
    (photoId: number) => (progress.marsExplorations ?? []).find((e) => e.photoId === photoId) || null,
    [progress.marsExplorations]
  );

  // Check if lab is completed
  const isLabCompleted = useCallback(
    (labId: string) => (progress.labCompletions ?? []).some((l) => l.labId === labId),
    [progress.labCompletions]
  );

  // Visit a planet in Planetarium
  const visitPlanet = useCallback(
    (planetId: string, secondsSpent: number = 0) => {
      recordActivity();
      setProgress((prev) => {
        const visits = prev.planetariumVisits ?? [];
        const existingIndex = visits.findIndex((v) => v.planetId === planetId);
        const now = new Date().toISOString();

        let newVisits: PlanetVisit[];
        if (existingIndex >= 0) {
          // Update existing visit
          newVisits = visits.map((v, i) =>
            i === existingIndex
              ? {
                  ...v,
                  lastSeenAt: now,
                  totalSecondsSpent: v.totalSecondsSpent + secondsSpent,
                }
              : v
          );
        } else {
          // New visit
          newVisits = [
            ...visits,
            {
              planetId,
              firstSeenAt: now,
              lastSeenAt: now,
              totalSecondsSpent: secondsSpent,
            },
          ];
        }

        const newTotalSeconds = (prev.planetariumTotalSeconds ?? 0) + secondsSpent;
        const badges = [...(prev.badges ?? [])];

        // Check for Planet Explorer badge (4 planets)
        if (newVisits.length >= 4 && !badges.includes(BADGES.PLANET_EXPLORER)) {
          badges.push(BADGES.PLANET_EXPLORER);
        }

        // Check for Grand Tour badge (all 8 planets)
        if (newVisits.length >= 8 && !badges.includes(BADGES.GRAND_TOUR)) {
          badges.push(BADGES.GRAND_TOUR);
        }

        // Check for Stargazer badge (5 minutes total)
        if (newTotalSeconds >= 300 && !badges.includes(BADGES.STARGAZER)) {
          badges.push(BADGES.STARGAZER);
        }

        return {
          ...prev,
          planetariumVisits: newVisits,
          planetariumTotalSeconds: newTotalSeconds,
          badges,
        };
      });
    },
    [setProgress, recordActivity]
  );

  // Check if planet was visited
  const isPlanetVisited = useCallback(
    (planetId: string) => (progress.planetariumVisits ?? []).some((v) => v.planetId === planetId),
    [progress.planetariumVisits]
  );

  // Get planet visit data
  const getPlanetVisit = useCallback(
    (planetId: string) => (progress.planetariumVisits ?? []).find((v) => v.planetId === planetId) || null,
    [progress.planetariumVisits]
  );

  // ============================================================================
  // ADAPTIVE LEARNING METHODS (v4)
  // ============================================================================

  /**
   * Update mastery after answering a question
   * This is the main entry point for adaptive learning updates
   */
  const updateMastery = useCallback(
    (params: MasteryUpdateParams) => {
      recordActivity();
      setProgress((prev) => {
        const currentTagStats = prev.tagStats ?? initializeTagStats();
        const currentHistory = prev.questionHistory ?? [];
        const currentMisconceptions = prev.misconceptions ?? [];

        // Process mastery update
        const result = processMasteryUpdate(currentTagStats, params);

        // Add new attempt to history
        const newHistory = [...currentHistory, result.newAttempt];

        // Evaluate misconception rules
        const newMisconceptions = evaluateMisconceptionRules(
          newHistory,
          currentMisconceptions
        );

        // Merge misconceptions
        const allMisconceptions = [...currentMisconceptions, ...newMisconceptions];

        // Build updated tagStats
        const updatedTagStats = { ...currentTagStats };
        for (const update of result.updatedTags) {
          const stat = currentTagStats[update.tag];
          if (stat) {
            updatedTagStats[update.tag] = {
              ...stat,
              mastery: update.newMastery,
              seen: stat.seen + 1,
              correct: params.isCorrect ? stat.correct + 1 : stat.correct,
              wrong: params.isCorrect ? stat.wrong : stat.wrong + 1,
              lastSeenAt: new Date().toISOString(),
            };
          }
        }

        // Invalidate recommendations cache
        return {
          ...prev,
          tagStats: updatedTagStats,
          questionHistory: newHistory,
          misconceptions: allMisconceptions,
          recommendations: null, // Will be regenerated on demand
        };
      });
    },
    [setProgress, recordActivity]
  );

  /**
   * Resolve a misconception (mark as fixed)
   */
  const resolveMisconception = useCallback(
    (ruleId: string) => {
      setProgress((prev) => {
        const updatedMisconceptions = resolveMisconceptionFn(
          prev.misconceptions ?? [],
          ruleId
        );
        return {
          ...prev,
          misconceptions: updatedMisconceptions,
        };
      });
    },
    [setProgress]
  );

  /**
   * Regenerate recommendations
   */
  const refreshRecommendations = useCallback(
    (lessons: LessonWithTags[], quizzes: QuizWithTags[]) => {
      setProgress((prev) => {
        const newRecommendations = generateRecommendations({
          lessons,
          quizzes,
          lessonsProgress: prev.lessonsProgress,
          tagStats: prev.tagStats ?? initializeTagStats(),
          questionHistory: prev.questionHistory ?? [],
          misconceptions: prev.misconceptions ?? [],
        });

        return {
          ...prev,
          recommendations: newRecommendations,
        };
      });
    },
    [setProgress]
  );

  /**
   * Compute recommendations (pure function, no side effects)
   * Use this in useMemo to avoid infinite loops
   */
  const computeRecommendationsData = useMemo(() => {
    const currentRecs = progress.recommendations;

    // Check if cache is valid
    if (currentRecs && isRecommendationsCacheValid(currentRecs)) {
      return currentRecs;
    }

    // Return null to indicate recommendations need to be generated
    return null;
  }, [progress.recommendations]);

  /**
   * Get or generate recommendations (with caching)
   * WARNING: This function updates state - don't call it during render!
   */
  const getRecommendations = useCallback(
    (lessons: LessonWithTags[], quizzes: QuizWithTags[]): RecommendationState => {
      const currentRecs = progress.recommendations;

      // Check if cache is valid
      if (currentRecs && isRecommendationsCacheValid(currentRecs)) {
        return currentRecs;
      }

      // Generate new recommendations
      const newRecommendations = generateRecommendations({
        lessons,
        quizzes,
        lessonsProgress: progress.lessonsProgress,
        tagStats: progress.tagStats ?? initializeTagStats(),
        questionHistory: progress.questionHistory ?? [],
        misconceptions: progress.misconceptions ?? [],
      });

      return newRecommendations;
    },
    [progress]
  );

  // Computed stats
  const stats = useMemo(() => {
    const completedLessons = Object.values(progress.lessonsProgress).filter(
      (l) => l.completed
    );

    const avgQuizScore =
      completedLessons.length > 0
        ? completedLessons.reduce((acc, l) => acc + (l.quizScore || 0), 0) /
          completedLessons.filter((l) => l.quizScore !== null).length
        : 0;

    const totalQuizzes = progress.quizResults.length;
    const avgOverallScore =
      totalQuizzes > 0
        ? progress.quizResults.reduce(
            (acc, r) => acc + (r.score / r.totalQuestions) * 100,
            0
          ) / totalQuizzes
        : 0;

    const streak = calculateStreak(progress.activityDates);

    return {
      completedLessonsCount: completedLessons.length,
      avgQuizScore: Math.round(avgQuizScore) || 0,
      avgOverallScore: Math.round(avgOverallScore) || 0,
      totalQuizzes,
      bookmarksCount: progress.bookmarks.length,
      streak,
      lastActive: progress.lastActive,
      // New stats (with fallbacks for migration safety)
      badgesCount: progress.badges?.length ?? 0,
      marsPhotosExplored: progress.marsExplorations?.length ?? 0,
      labsCompleted: progress.labCompletions?.length ?? 0,
      asteroidsAnalyzed: progress.asteroidAnalyses?.length ?? 0,
      glossaryTermsCount: progress.glossaryStudyList?.length ?? 0,
      // Planetarium stats (v3)
      planetsVisited: progress.planetariumVisits?.length ?? 0,
      planetariumTotalMinutes: Math.round((progress.planetariumTotalSeconds ?? 0) / 60),
      // Adaptive stats (v4)
      questionsAnswered: progress.questionHistory?.length ?? 0,
      activeMisconceptions: (progress.misconceptions ?? []).filter((m) => !m.resolved).length,
    };
  }, [progress]);

  return {
    progress,
    stats,
    completeLesson,
    saveQuizResult,
    toggleBookmark,
    isBookmarked,
    getLessonProgress,
    recordActivity,
    // Mars/Labs/Asteroids methods
    addMarsExploration,
    completeLab: completeLabCallback,
    addAsteroidAnalysis,
    toggleGlossaryTerm,
    isTermInStudyList,
    isMarsPhotoExplored,
    getMarsExploration,
    isLabCompleted,
    clearProgress,
    // Planetarium methods (v3)
    visitPlanet,
    isPlanetVisited,
    getPlanetVisit,
    // Adaptive Learning methods (v4)
    updateMastery,
    resolveMisconception,
    refreshRecommendations,
    getRecommendations,
  };
}
