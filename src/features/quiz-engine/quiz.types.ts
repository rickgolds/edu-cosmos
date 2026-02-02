import type { AdaptiveTag, DifficultyLevel } from '@/features/adaptive';

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  question: string;
  options: AnswerOption[];
  explanation: string; // Wyjaśnienie po odpowiedzi
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  // Adaptive learning fields (v4)
  tags?: AdaptiveTag[];
  difficultyLevel?: DifficultyLevel; // 1, 2, or 3
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  category?: string;
  timeLimit?: number; // in seconds, optional
  passingScore?: number; // percentage
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> answerId
  isComplete: boolean;
  showFeedback: boolean;
  startTime: number;
  endTime?: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, { answerId: string; isCorrect: boolean }>;
  duration: number; // in seconds
  recommendations?: string[]; // suggested lessons to review
}

export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'SELECT_ANSWER'; questionId: string; answerId: string }
  | { type: 'SHOW_FEEDBACK' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESTART_QUIZ' };
