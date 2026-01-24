'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import { calculateStreak, formatDateForApi } from '@/lib/date-utils';

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

export interface ProgressData {
  lessonsProgress: Record<string, LessonProgress>;
  quizResults: QuizResult[];
  bookmarks: string[]; // APOD dates
  activityDates: string[];
  lastActive: string | null;
}

const initialProgress: ProgressData = {
  lessonsProgress: {},
  quizResults: [],
  bookmarks: [],
  activityDates: [],
  lastActive: null,
};

/**
 * Main progress tracking hook
 */
export function useProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressData>(
    STORAGE_KEYS.PROGRESS,
    initialProgress
  );

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
      setProgress((prev) => ({
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
      }));
    },
    [setProgress, recordActivity]
  );

  // Save quiz result
  const saveQuizResult = useCallback(
    (result: Omit<QuizResult, 'completedAt'>) => {
      recordActivity();
      setProgress((prev) => ({
        ...prev,
        quizResults: [
          ...prev.quizResults,
          { ...result, completedAt: new Date().toISOString() },
        ],
      }));
    },
    [setProgress, recordActivity]
  );

  // Toggle bookmark
  const toggleBookmark = useCallback(
    (apodDate: string) => {
      setProgress((prev) => {
        const isBookmarked = prev.bookmarks.includes(apodDate);
        return {
          ...prev,
          bookmarks: isBookmarked
            ? prev.bookmarks.filter((d) => d !== apodDate)
            : [...prev.bookmarks, apodDate],
        };
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
  };
}
