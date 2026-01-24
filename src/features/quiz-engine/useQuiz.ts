'use client';

import { useReducer, useCallback, useMemo } from 'react';
import type { Quiz, QuizState, QuizAction, QuizResult } from './quiz.types';
import { QUIZ_SETTINGS } from '@/lib/constants';

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

  return {
    state,
    currentQuestion,
    isLastQuestion,
    hasAnswered,
    result,
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
