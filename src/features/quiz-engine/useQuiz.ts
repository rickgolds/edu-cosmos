'use client';

import { useReducer, useCallback, useMemo } from 'react';
import type { Quiz, QuizState, QuizAction, QuizResult, Question } from './quiz.types';
import { QUIZ_SETTINGS } from '@/lib/constants';
import type { AdaptiveTag, DifficultyLevel, MasteryUpdateParams } from '@/features/adaptive';
import { ADAPTIVE_TAGS, DIFFICULTY_MAP } from '@/features/adaptive';

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,
  showFeedback: false,
  startTime: 0,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        startTime: Date.now(),
      };

    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answerId,
        },
      };

    case 'SHOW_FEEDBACK':
      return {
        ...state,
        showFeedback: true,
      };

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showFeedback: false,
      };

    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isComplete: true,
        endTime: Date.now(),
      };

    case 'RESTART_QUIZ':
      return {
        ...initialState,
        startTime: Date.now(),
      };

    default:
      return state;
  }
}

/**
 * Get tags from a question (with fallback to category-based tags)
 */
function getQuestionTags(question: Question): AdaptiveTag[] {
  if (question.tags && question.tags.length > 0) {
    return question.tags;
  }

  // Fallback: map category to tags
  const categoryTagMap: Record<string, AdaptiveTag[]> = {
    'solar-system': [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.PLANETS],
    stars: [ADAPTIVE_TAGS.STARS_BASICS],
    galaxies: [ADAPTIVE_TAGS.GALAXIES],
    exploration: [ADAPTIVE_TAGS.SPACE_MISSIONS],
    rockets: [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON],
    telescopes: [ADAPTIVE_TAGS.TELESCOPES],
  };

  return categoryTagMap[question.category || ''] || [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS];
}

/**
 * Get difficulty level from a question
 */
function getQuestionDifficulty(question: Question): DifficultyLevel {
  if (question.difficultyLevel) {
    return question.difficultyLevel;
  }

  if (question.difficulty) {
    return DIFFICULTY_MAP[question.difficulty] || 2;
  }

  return 2; // Default: intermediate
}

/**
 * Get the correct answer ID from a question
 */
function getCorrectAnswerId(question: Question): string {
  const correctOption = question.options.find((opt) => opt.isCorrect);
  return correctOption?.id || '';
}

export interface AdaptiveQuizData {
  /** Data needed for updateMastery calls */
  masteryUpdates: MasteryUpdateParams[];
}

export function useQuiz(quiz: Quiz) {
  const [state, dispatch] = useReducer(quizReducer, {
    ...initialState,
    startTime: Date.now(),
  });

  const currentQuestion = quiz.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswered = currentQuestion
    ? Boolean(state.answers[currentQuestion.id])
    : false;

  const selectAnswer = useCallback((questionId: string, answerId: string) => {
    dispatch({ type: 'SELECT_ANSWER', questionId, answerId });
  }, []);

  const showFeedback = useCallback(() => {
    dispatch({ type: 'SHOW_FEEDBACK' });
  }, []);

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      dispatch({ type: 'COMPLETE_QUIZ' });
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  }, [isLastQuestion]);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART_QUIZ' });
  }, []);

  // Calculate result
  const result = useMemo((): QuizResult | null => {
    if (!state.isComplete) return null;

    let correctCount = 0;
    const answersWithCorrectness: Record<
      string,
      { answerId: string; isCorrect: boolean }
    > = {};

    quiz.questions.forEach((question) => {
      const selectedAnswerId = state.answers[question.id];
      const selectedAnswer = question.options.find(
        (opt) => opt.id === selectedAnswerId
      );
      const isCorrect = selectedAnswer?.isCorrect || false;

      if (isCorrect) correctCount++;

      answersWithCorrectness[question.id] = {
        answerId: selectedAnswerId,
        isCorrect,
      };
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passingScore = quiz.passingScore || QUIZ_SETTINGS.MIN_PASS_SCORE;
    const duration = Math.round(
      ((state.endTime || Date.now()) - state.startTime) / 1000
    );

    return {
      quizId: quiz.id,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      percentage,
      passed: percentage >= passingScore,
      answers: answersWithCorrectness,
      duration,
    };
  }, [state, quiz]);

  // Generate adaptive learning data when quiz is complete
  const adaptiveData = useMemo((): AdaptiveQuizData | null => {
    if (!state.isComplete) return null;

    const masteryUpdates: MasteryUpdateParams[] = quiz.questions.map((question) => {
      const selectedAnswerId = state.answers[question.id];
      const selectedAnswer = question.options.find(
        (opt) => opt.id === selectedAnswerId
      );
      const isCorrect = selectedAnswer?.isCorrect || false;
      const correctAnswerId = getCorrectAnswerId(question);

      return {
        questionId: question.id,
        quizId: quiz.id,
        tags: getQuestionTags(question),
        difficulty: getQuestionDifficulty(question),
        isCorrect,
        selectedAnswerId: selectedAnswerId || '',
        correctAnswerId,
      };
    });

    return { masteryUpdates };
  }, [state, quiz]);

  return {
    state,
    currentQuestion,
    isLastQuestion,
    hasAnswered,
    result,
    adaptiveData,
    progress: {
      current: state.currentQuestionIndex + 1,
      total: quiz.questions.length,
      percentage: Math.round(
        ((state.currentQuestionIndex + 1) / quiz.questions.length) * 100
      ),
    },
    actions: {
      selectAnswer,
      showFeedback,
      nextQuestion,
      restart,
    },
  };
}
