'use client';

import { useState, useEffect } from 'react';
import { Orbit, Calendar, Brain } from 'lucide-react';
import { Card, Button, Badge, Skeleton, ErrorState } from '@/components/ui';
import { QuizView } from '@/features/quiz-engine';
import { useProgress } from '@/hooks';
import { formatDateForApi } from '@/lib/date-utils';
import {
  AsteroidList,
  AsteroidEducation,
  AsteroidQuizData,
  fetchNeoFeed,
  type NeoSummary,
} from '@/features/asteroid-watch';

export default function AsteroidWatchPage() {
  const [neos, setNeos] = useState<NeoSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const { saveQuizResult } = useProgress();

  // Date range state
  const today = new Date();
  const defaultEndDate = new Date(today);
  defaultEndDate.setDate(today.getDate() + 7);

  const [startDate, setStartDate] = useState(formatDateForApi(today));
  const [endDate, setEndDate] = useState(formatDateForApi(defaultEndDate));

  // Fetch NEOs
  useEffect(() => {
    const loadNeos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchNeoFeed({ startDate, endDate });
        setNeos(data);
      } catch (err) {
        setError('Nie udało się pobrać danych o asteroidach. Spróbuj ponownie.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNeos();
  }, [startDate, endDate]);

  // Quiz data
  const quizData = {
    ...AsteroidQuizData(),
    passingScore: 60,
  };

  const handleQuizComplete = (result: { score: number; totalQuestions: number; answers: Record<string, { answerId: string; isCorrect: boolean }> }) => {
    saveQuizResult({
      quizId: quizData.id,
      score: result.score,
      totalQuestions: result.totalQuestions,
      answers: Object.fromEntries(
        Object.entries(result.answers).map(([k, v]) => [k, v.answerId])
      ),
    });
  };

  if (showQuiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowQuiz(false)}
          className="mb-6"
        >
          ← Powrót do Asteroid Watch
        </Button>
        <QuizView
          quiz={quizData}
          onComplete={handleQuizComplete}
          onRestart={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-warning/20">
            <Orbit className="w-6 h-6 text-warning" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            Asteroid Watch
          </h1>
        </div>
        <p className="text-gray-400">
          Monitoruj obiekty bliskie Ziemi (NEO) w czasie rzeczywistym. Dane z NASA NeoWs API.
        </p>
      </div>

      {/* Education */}
      <section className="mb-8">
        <AsteroidEducation />
      </section>

      {/* Quiz CTA */}
      <Card padding="md" className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-accent-purple" />
          <div>
            <h3 className="font-medium text-white">Quiz: Interpretacja danych</h3>
            <p className="text-sm text-gray-400">Sprawdź, czy potrafisz odczytać dane o asteroidach</p>
          </div>
        </div>
        <Button onClick={() => setShowQuiz(true)}>
          Rozwiąż quiz
        </Button>
      </Card>

      {/* Date range selector */}
      <Card padding="md" className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Od:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-cosmos-dark border border-cosmos-border rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-accent-cyan"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Do:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-cosmos-dark border border-cosmos-border rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-accent-cyan"
            />
          </div>
          <Badge variant="cyan" className="ml-auto">
            {neos.length} obiektów w zakresie
          </Badge>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Uwaga: API NASA pozwala na zakres maksymalnie 7 dni.
        </p>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton height={200} className="w-full rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <ErrorState
          message={error}
          onRetry={() => {
            setStartDate(startDate);
          }}
        />
      )}

      {/* Results */}
      {!isLoading && !error && (
        <AsteroidList neos={neos} />
      )}
    </div>
  );
}
