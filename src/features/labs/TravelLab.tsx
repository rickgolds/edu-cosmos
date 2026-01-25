'use client';

import { useState } from 'react';
import { Rocket, Clock, Info, Brain, Zap } from 'lucide-react';
import { Card, CardTitle, Button, Badge } from '@/components/ui';
import { QuizView } from '@/features/quiz-engine';
import { useProgress } from '@/hooks';
import { TRAVEL_PRESETS, TRAVEL_DESTINATIONS } from './labs.types';
import {
  calculateAllTravelTimes,
  formatTravelTime,
  formatTravelTimeShort,
  formatDistanceKm,
  getTravelFact,
} from './travel';

const TRAVEL_QUIZ = {
  id: 'travel-lab-quiz',
  title: 'Quiz: Podróże kosmiczne',
  description: 'Sprawdź swoją wiedzę o dystansach i prędkościach w kosmosie.',
  questions: [
    {
      id: 'tq-1',
      question: 'Ile czasu potrzebuje światło, aby dotrzeć z Ziemi do Księżyca?',
      options: [
        { id: 'a', text: 'Około 1.3 sekundy', isCorrect: true },
        { id: 'b', text: 'Około 8 minut', isCorrect: false },
        { id: 'c', text: 'Około 1 godziny', isCorrect: false },
        { id: 'd', text: 'Natychmiast', isCorrect: false },
      ],
      explanation:
        'Księżyc jest oddalony o około 384 400 km. Światło podróżuje z prędkością ~300 000 km/s, więc potrzebuje około 1.28 sekundy na pokonanie tej odległości.',
    },
    {
      id: 'tq-2',
      question: 'Dlaczego sterowanie łazikiem na Marsie jest wyzwaniem?',
      options: [
        { id: 'a', text: 'Sygnał radiowy potrzebuje 3-22 minuty na dotarcie do Marsa', isCorrect: true },
        { id: 'b', text: 'Mars ma zbyt silną grawitację', isCorrect: false },
        { id: 'c', text: 'Atmosfera Marsa blokuje sygnały', isCorrect: false },
        { id: 'd', text: 'Łaziki są zbyt wolne', isCorrect: false },
      ],
      explanation:
        'Odległość Mars-Ziemia zmienia się od 54 do 400 mln km. Sygnał radiowy (poruszający się z prędkością światła) potrzebuje od ~3 do ~22 minut na pokonanie tej odległości. Oznacza to, że łazik musi działać autonomicznie!',
    },
  ],
  passingScore: 50,
};

export function TravelLab() {
  const [destination, setDestination] = useState<string>('moon');
  const [showQuiz, setShowQuiz] = useState(false);
  const [customDistance, setCustomDistance] = useState<number | null>(null);

  const { saveQuizResult, completeLab, isLabCompleted } = useProgress();
  const labCompleted = isLabCompleted('travel');

  const selectedDestination = TRAVEL_DESTINATIONS.find((d) => d.id === destination);
  const effectiveDistance = customDistance ?? selectedDestination?.distanceKm ?? 0;
  const travelTimes = calculateAllTravelTimes(destination);

  const handleQuizComplete = (result: {
    score: number;
    totalQuestions: number;
    answers: Record<string, { answerId: string; isCorrect: boolean }>;
  }) => {
    saveQuizResult({
      quizId: TRAVEL_QUIZ.id,
      score: result.score,
      totalQuestions: result.totalQuestions,
      answers: Object.fromEntries(
        Object.entries(result.answers).map(([k, v]) => [k, v.answerId])
      ),
    });
    completeLab('travel');
  };

  if (showQuiz) {
    return (
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowQuiz(false)}
          className="mb-4"
        >
          ← Powrót do laboratorium
        </Button>
        <QuizView
          quiz={TRAVEL_QUIZ}
          onComplete={handleQuizComplete}
          onRestart={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-cyan/20">
            <Rocket className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">
              Travel Time Lab
            </h2>
            <p className="text-sm text-gray-400">
              Ile trwa podróż do różnych celów w kosmosie?
            </p>
          </div>
        </div>
        {labCompleted && (
          <Badge variant="success">Ukończono</Badge>
        )}
      </div>

      {/* Educational content */}
      <Card padding="md" className="border-accent-cyan/30 bg-accent-cyan/5">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300 space-y-2">
            <p>
              Kosmos jest <strong className="text-white">ogromny</strong>. Nawet najszybsze
              obiekty stworzone przez człowieka potrzebują lat na dotarcie do innych planet.
            </p>
            <p>
              <strong className="text-white">Prędkość światła</strong> (c ≈ 300 000 km/s) to
              absolutny limit prędkości we wszechświecie. Nic nie może podróżować szybciej!
            </p>
            <p className="text-accent-cyan">
              Nawet przy prędkości światła, dotarcie do najbliższej gwiazdy (Proxima Centauri)
              zajęłoby ponad 4 lata.
            </p>
          </div>
        </div>
      </Card>

      {/* Destination selector */}
      <Card padding="md">
        <CardTitle className="mb-4">Wybierz cel podróży</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRAVEL_DESTINATIONS.map((dest) => (
            <button
              key={dest.id}
              onClick={() => {
                setDestination(dest.id);
                setCustomDistance(null);
              }}
              className={`p-4 rounded-lg border text-left transition-all ${
                destination === dest.id && !customDistance
                  ? 'border-accent-cyan bg-accent-cyan/10'
                  : 'border-cosmos-border bg-cosmos-card hover:border-accent-cyan/50'
              }`}
            >
              <span className="text-white font-medium block">{dest.name}</span>
              <span className="text-sm text-gray-400">
                {formatDistanceKm(dest.distanceKm)}
              </span>
            </button>
          ))}
        </div>

        {/* Custom distance */}
        <div className="mt-4 pt-4 border-t border-cosmos-border">
          <label className="text-sm text-gray-400 block mb-2">
            Lub wpisz własny dystans (km):
          </label>
          <input
            type="number"
            placeholder="np. 1000000"
            value={customDistance ?? ''}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null;
              setCustomDistance(val);
            }}
            className="w-full sm:w-64 bg-cosmos-dark border border-cosmos-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-cyan"
          />
        </div>
      </Card>

      {/* Results */}
      <Card padding="lg">
        <div className="text-center mb-6">
          <p className="text-gray-400 mb-1">Dystans do celu</p>
          <p className="text-3xl font-display font-bold text-white">
            {formatDistanceKm(effectiveDistance)}
          </p>
          {selectedDestination && !customDistance && (
            <p className="text-sm text-gray-500">{selectedDestination.name}</p>
          )}
        </div>

        {/* Travel times table */}
        <div className="space-y-3">
          {TRAVEL_PRESETS.map((preset) => {
            const time = {
              seconds: effectiveDistance / preset.speedKmS,
              minutes: effectiveDistance / preset.speedKmS / 60,
              hours: effectiveDistance / preset.speedKmS / 3600,
              days: effectiveDistance / preset.speedKmS / 86400,
              years: effectiveDistance / preset.speedKmS / 31557600,
            };
            const fact = getTravelFact(destination, preset.id);

            return (
              <div
                key={preset.id}
                className="p-4 rounded-lg bg-cosmos-dark/50 border border-cosmos-border"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    {preset.id === 'light' ? (
                      <Zap className="w-5 h-5 text-warning" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <span className="text-white font-medium">{preset.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({preset.description})
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      time.years > 100
                        ? 'error'
                        : time.years > 1
                        ? 'warning'
                        : time.days > 1
                        ? 'cyan'
                        : 'success'
                    }
                  >
                    {formatTravelTime(time)}
                  </Badge>
                </div>
                {fact && (
                  <p className="text-xs text-accent-cyan mt-2 pl-8">{fact}</p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Comparison visual */}
      <Card padding="md">
        <CardTitle className="mb-4">Porównanie czasu podróży</CardTitle>
        <div className="space-y-2">
          {TRAVEL_PRESETS.map((preset) => {
            const time = {
              seconds: effectiveDistance / preset.speedKmS,
              minutes: effectiveDistance / preset.speedKmS / 60,
              hours: effectiveDistance / preset.speedKmS / 3600,
              days: effectiveDistance / preset.speedKmS / 86400,
              years: effectiveDistance / preset.speedKmS / 31557600,
            };

            // Use logarithmic scale for visualization
            const lightTime = effectiveDistance / 299792.458;
            const currentTime = effectiveDistance / preset.speedKmS;
            const logRatio = Math.log10(currentTime / lightTime + 1);
            const maxLogRatio = Math.log10(
              effectiveDistance / TRAVEL_PRESETS[0].speedKmS / lightTime + 1
            );
            const widthPercent = Math.min(100, (logRatio / maxLogRatio) * 100);

            return (
              <div key={preset.id} className="flex items-center gap-3">
                <div className="w-24 text-xs text-gray-400 truncate">
                  {preset.name}
                </div>
                <div className="flex-1 h-4 bg-cosmos-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      preset.id === 'light'
                        ? 'bg-warning'
                        : preset.id === 'voyager' || preset.id === 'rocket'
                        ? 'bg-accent-cyan'
                        : 'bg-accent-purple'
                    }`}
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
                <div className="w-20 text-xs text-gray-300 text-right">
                  {formatTravelTimeShort(time)}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          * Skala logarytmiczna dla lepszej wizualizacji różnic
        </p>
      </Card>

      {/* Quiz CTA */}
      <Card padding="md" className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-accent-cyan" />
          <div>
            <h3 className="font-medium text-white">Mini-quiz: Podróże kosmiczne</h3>
            <p className="text-sm text-gray-400">
              Sprawdź swoją wiedzę o dystansach w kosmosie
            </p>
          </div>
        </div>
        <Button onClick={() => setShowQuiz(true)}>Rozwiąż quiz</Button>
      </Card>
    </div>
  );
}
