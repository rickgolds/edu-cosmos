'use client';

import { Card, Button, Badge } from '@/components/ui';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import type { Quiz, QuizResult, AnswerOption } from './quiz.types';
import { useQuiz, type AdaptiveQuizData } from './useQuiz';

interface QuizViewProps {
  quiz: Quiz;
  onComplete?: (result: QuizResult, adaptiveData?: AdaptiveQuizData) => void;
  onRestart?: () => void;
}

export function QuizView({ quiz, onComplete, onRestart }: QuizViewProps) {
  const {
    state,
    currentQuestion,
    isLastQuestion,
    hasAnswered,
    result,
    adaptiveData,
    progress,
    actions,
  } = useQuiz(quiz);

  // Handle answer selection
  const handleAnswerSelect = (answerId: string) => {
    if (!state.showFeedback && currentQuestion) {
      actions.selectAnswer(currentQuestion.id, answerId);
    }
  };

  // Handle check answer
  const handleCheckAnswer = () => {
    actions.showFeedback();
  };

  // Handle next / complete
  const handleNext = () => {
    if (isLastQuestion && state.showFeedback) {
      actions.nextQuestion();
      if (result && onComplete) {
        onComplete(result, adaptiveData ?? undefined);
      }
    } else {
      actions.nextQuestion();
    }
  };

  // Handle restart
  const handleRestart = () => {
    actions.restart();
    onRestart?.();
  };

  // Render complete state
  if (state.isComplete && result) {
    return (
      <QuizSummary result={result} quiz={quiz} onRestart={handleRestart} />
    );
  }

  // Render question
  if (!currentQuestion) return null;

  const selectedAnswerId = state.answers[currentQuestion.id];
  const selectedAnswer = currentQuestion.options.find(
    (opt) => opt.id === selectedAnswerId
  );

  return (
    <Card padding="lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Pytanie {progress.current} z {progress.total}
          </span>
          <Badge variant="cyan">{progress.percentage}%</Badge>
        </div>
        <div className="h-2 bg-cosmos-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-cyan transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-display font-semibold text-white mb-6">
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option) => (
          <AnswerOptionButton
            key={option.id}
            option={option}
            isSelected={selectedAnswerId === option.id}
            showFeedback={state.showFeedback}
            onClick={() => handleAnswerSelect(option.id)}
            disabled={state.showFeedback}
          />
        ))}
      </div>

      {/* Feedback */}
      {state.showFeedback && selectedAnswer && (
        <FeedbackPanel
          isCorrect={selectedAnswer.isCorrect}
          explanation={currentQuestion.explanation}
          answerExplanation={selectedAnswer.explanation}
        />
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-cosmos-border">
        {!state.showFeedback ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={!hasAnswered}
            variant="primary"
          >
            Sprawdź odpowiedź
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="primary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isLastQuestion ? 'Zobacz wynik' : 'Następne pytanie'}
          </Button>
        )}
      </div>
    </Card>
  );
}

// Answer option button
interface AnswerOptionButtonProps {
  option: AnswerOption;
  isSelected: boolean;
  showFeedback: boolean;
  onClick: () => void;
  disabled: boolean;
}

function AnswerOptionButton({
  option,
  isSelected,
  showFeedback,
  onClick,
  disabled,
}: AnswerOptionButtonProps) {
  const getStyles = () => {
    if (!showFeedback) {
      return isSelected
        ? 'border-accent-cyan bg-accent-cyan/10'
        : 'border-cosmos-border hover:border-accent-cyan/50 hover:bg-white/5';
    }

    if (option.isCorrect) {
      return 'border-success bg-success/10';
    }

    if (isSelected && !option.isCorrect) {
      return 'border-error bg-error/10';
    }

    return 'border-cosmos-border opacity-50';
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full p-4 rounded-lg border text-left transition-all',
        'flex items-center gap-3',
        getStyles(),
        disabled && !showFeedback && 'cursor-not-allowed'
      )}
    >
      {/* Icon */}
      {showFeedback && option.isCorrect && (
        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
      )}
      {showFeedback && isSelected && !option.isCorrect && (
        <XCircle className="w-5 h-5 text-error flex-shrink-0" />
      )}
      {!showFeedback && (
        <div
          className={clsx(
            'w-5 h-5 rounded-full border-2 flex-shrink-0',
            isSelected
              ? 'border-accent-cyan bg-accent-cyan'
              : 'border-cosmos-border'
          )}
        />
      )}

      {/* Text */}
      <span className={clsx('text-gray-200', showFeedback && option.isCorrect && 'text-success')}>
        {option.text}
      </span>
    </button>
  );
}

// Feedback panel
interface FeedbackPanelProps {
  isCorrect: boolean;
  explanation: string;
  answerExplanation?: string;
}

function FeedbackPanel({ isCorrect, explanation, answerExplanation }: FeedbackPanelProps) {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border animate-fade-in',
        isCorrect
          ? 'border-success/30 bg-success/10'
          : 'border-error/30 bg-error/10'
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="font-medium text-success">Poprawna odpowiedź!</span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-error" />
            <span className="font-medium text-error">Niepoprawna odpowiedź</span>
          </>
        )}
      </div>
      <p className="text-sm text-gray-300">
        {answerExplanation || explanation}
      </p>
    </div>
  );
}

// Quiz summary
interface QuizSummaryProps {
  result: QuizResult;
  quiz: Quiz;
  onRestart: () => void;
}

function QuizSummary({ result, quiz: _quiz, onRestart }: QuizSummaryProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins} min ${secs} s` : `${secs} s`;
  };

  return (
    <Card padding="lg" className="text-center">
      {/* Result icon */}
      <div
        className={clsx(
          'w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center',
          result.passed ? 'bg-success/20' : 'bg-warning/20'
        )}
      >
        {result.passed ? (
          <Trophy className="w-10 h-10 text-success" />
        ) : (
          <AlertTriangle className="w-10 h-10 text-warning" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-display font-bold text-white mb-2">
        {result.passed ? 'Gratulacje!' : 'Prawie udało się!'}
      </h3>
      <p className="text-gray-400 mb-6">
        {result.passed
          ? 'Świetnie ci poszło! Tak trzymaj!'
          : 'Nie martw się, nauka to proces. Spróbuj jeszcze raz!'}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-cosmos-dark border border-cosmos-border">
          <div className="text-3xl font-bold text-accent-cyan mb-1">
            {result.score}/{result.totalQuestions}
          </div>
          <div className="text-sm text-gray-500">Poprawne</div>
        </div>
        <div className="p-4 rounded-lg bg-cosmos-dark border border-cosmos-border">
          <div className={clsx(
            'text-3xl font-bold mb-1',
            result.passed ? 'text-success' : 'text-warning'
          )}>
            {result.percentage}%
          </div>
          <div className="text-sm text-gray-500">Wynik</div>
        </div>
        <div className="p-4 rounded-lg bg-cosmos-dark border border-cosmos-border">
          <div className="text-3xl font-bold text-accent-purple mb-1">
            {formatDuration(result.duration)}
          </div>
          <div className="text-sm text-gray-500">Czas</div>
        </div>
      </div>

      {/* Recommendations */}
      {!result.passed && result.recommendations && result.recommendations.length > 0 && (
        <div className="text-left mb-6 p-4 rounded-lg bg-cosmos-dark border border-cosmos-border">
          <h4 className="font-medium text-white mb-2">Zalecane powtórki:</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            {result.recommendations.map((rec, i) => (
              <li key={i}>• {rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <Button
          variant="secondary"
          onClick={onRestart}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Spróbuj ponownie
        </Button>
      </div>
    </Card>
  );
}
