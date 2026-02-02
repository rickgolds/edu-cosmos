'use client';

import { useState } from 'react';
import { Brain, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { QuizView, type AdaptiveQuizData } from '@/features/quiz-engine';
import { useProgress } from '@/hooks';
import { quizzes, getQuickQuizzes, getQuizzesByCategory } from '@/data/quizzes';
import { CATEGORY_LABELS, LESSON_CATEGORIES } from '@/lib/constants';
import type { Quiz, QuizResult } from '@/features/quiz-engine';

export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const { saveQuizResult, updateMastery } = useProgress();

  const quickQuizzes = getQuickQuizzes();
  const categories = Object.values(LESSON_CATEGORIES);

  const handleQuizComplete = (result: QuizResult, adaptiveData?: AdaptiveQuizData) => {
    // Update mastery for each question answered
    if (adaptiveData?.masteryUpdates) {
      for (const update of adaptiveData.masteryUpdates) {
        updateMastery(update);
      }
    }

    saveQuizResult({
      quizId: result.quizId,
      score: result.score,
      totalQuestions: result.totalQuestions,
      answers: Object.fromEntries(
        Object.entries(result.answers).map(([k, v]) => [k, v.answerId])
      ),
    });
  };

  // Quiz view
  if (selectedQuiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedQuiz(null)}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          className="mb-6"
        >
          Powrót do quizów
        </Button>

        <QuizView
          quiz={selectedQuiz}
          onComplete={handleQuizComplete}
          onRestart={() => {}}
        />
      </div>
    );
  }

  // Quiz selection
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Quizy
        </h1>
        <p className="text-gray-400">
          Sprawdź swoją wiedzę o kosmosie. Po każdej odpowiedzi otrzymasz wyjaśnienie!
        </p>
      </div>

      {/* Quick quizzes */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-accent-cyan" />
          Szybkie quizy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onSelect={() => setSelectedQuiz(quiz)}
            />
          ))}
        </div>
      </section>

      {/* Category quizzes */}
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-accent-purple" />
          Quizy tematyczne
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryQuizzes = getQuizzesByCategory(category);
            if (categoryQuizzes.length === 0) return null;

            return categoryQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                category={CATEGORY_LABELS[category]}
                onSelect={() => setSelectedQuiz(quiz)}
              />
            ));
          })}

          {/* Exploration quiz */}
          {quizzes
            .filter((q) => q.category === 'exploration')
            .map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                category="Eksploracja"
                onSelect={() => setSelectedQuiz(quiz)}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

// Quiz card component
interface QuizCardProps {
  quiz: Quiz;
  category?: string;
  onSelect: () => void;
}

function QuizCard({ quiz, category, onSelect }: QuizCardProps) {
  return (
    <Card
      variant="interactive"
      padding="lg"
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-accent-purple/20 text-accent-purple group-hover:bg-accent-purple/30 transition-colors">
          <Brain className="w-6 h-6" />
        </div>
        {category && (
          <Badge variant="cyan" size="sm">
            {category}
          </Badge>
        )}
      </div>

      <CardTitle className="mb-2 group-hover:text-accent-cyan transition-colors">
        {quiz.title}
      </CardTitle>

      {quiz.description && (
        <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {quiz.questions.length} pytań
        </span>
        <span className="text-accent-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Rozpocznij <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Card>
  );
}
