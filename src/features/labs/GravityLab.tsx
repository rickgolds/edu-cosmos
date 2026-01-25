'use client';

import { useState } from 'react';
import { Scale, ArrowDown, Info, Brain } from 'lucide-react';
import { Card, CardTitle, Button, Badge } from '@/components/ui';
import { QuizView } from '@/features/quiz-engine';
import { useProgress } from '@/hooks';
import { CELESTIAL_BODIES } from './labs.types';
import {
  calculateWeightsOnAllBodies,
  formatWeightNewtons,
  formatWeightKgf,
  getGravityComparison,
} from './gravity';

const GRAVITY_QUIZ = {
  id: 'gravity-lab-quiz',
  title: 'Quiz: Masa i ciężar',
  description: 'Sprawdź, czy rozumiesz różnicę między masą a ciężarem.',
  questions: [
    {
      id: 'gq-1',
      question: 'Astronauta o masie 70 kg ląduje na Księżycu. Co się zmienia?',
      options: [
        { id: 'a', text: 'Zmienia się jego ciężar, masa pozostaje taka sama', isCorrect: true },
        { id: 'b', text: 'Zmienia się jego masa, ciężar pozostaje taki sam', isCorrect: false },
        { id: 'c', text: 'Nic się nie zmienia', isCorrect: false },
        { id: 'd', text: 'Zmienia się zarówno masa jak i ciężar', isCorrect: false },
      ],
      explanation:
        'Masa to ilość materii i nie zmienia się w zależności od lokalizacji. Ciężar to siła grawitacji działająca na masę, więc zmienia się w zależności od przyspieszenia grawitacyjnego.',
    },
    {
      id: 'gq-2',
      question: 'Na której planecie ważyłbyś najwięcej?',
      options: [
        { id: 'a', text: 'Jowisz', isCorrect: true },
        { id: 'b', text: 'Saturn', isCorrect: false },
        { id: 'c', text: 'Mars', isCorrect: false },
        { id: 'd', text: 'Ziemia', isCorrect: false },
      ],
      explanation:
        'Jowisz ma najsilniejszą grawitację powierzchniową spośród planet – około 2.5 razy większą niż Ziemia. Na Jowiszu ważyłbyś prawie 2.5 razy więcej niż na Ziemi.',
    },
  ],
  passingScore: 50,
};

export function GravityLab() {
  const [mass, setMass] = useState<number>(70);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedBody, setSelectedBody] = useState<string>('earth');

  const { saveQuizResult, completeLab, isLabCompleted } = useProgress();
  const labCompleted = isLabCompleted('gravity');

  const weights = calculateWeightsOnAllBodies(mass);
  const selectedWeight = weights.find((w) => w.body.id === selectedBody);

  const handleQuizComplete = (result: {
    score: number;
    totalQuestions: number;
    answers: Record<string, { answerId: string; isCorrect: boolean }>;
  }) => {
    saveQuizResult({
      quizId: GRAVITY_QUIZ.id,
      score: result.score,
      totalQuestions: result.totalQuestions,
      answers: Object.fromEntries(
        Object.entries(result.answers).map(([k, v]) => [k, v.answerId])
      ),
    });
    completeLab('gravity');
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
          quiz={GRAVITY_QUIZ}
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
          <div className="p-2 rounded-lg bg-accent-purple/20">
            <Scale className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">
              Gravity Lab
            </h2>
            <p className="text-sm text-gray-400">
              Ile ważysz na różnych ciałach niebieskich?
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
              <strong className="text-white">Masa</strong> to ilość materii w obiekcie – mierzymy ją
              w kilogramach (kg). Masa nie zmienia się w zależności od lokalizacji.
            </p>
            <p>
              <strong className="text-white">Ciężar</strong> to siła, z jaką grawitacja przyciąga
              masę – mierzymy go w niutonach (N). Ciężar zmienia się w zależności od przyspieszenia
              grawitacyjnego.
            </p>
            <p className="text-accent-cyan">
              Wzór: <span className="font-mono">F = m × g</span> (ciężar = masa × przyspieszenie grawitacyjne)
            </p>
          </div>
        </div>
      </Card>

      {/* Mass input */}
      <Card padding="md">
        <CardTitle className="mb-4">Twoja masa</CardTitle>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="10"
            max="200"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="flex-1 h-2 bg-cosmos-dark rounded-lg appearance-none cursor-pointer accent-accent-purple"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="10"
              max="500"
              value={mass}
              onChange={(e) => setMass(Math.max(10, Math.min(500, Number(e.target.value) || 10)))}
              className="w-20 bg-cosmos-dark border border-cosmos-border rounded-lg px-3 py-1.5 text-white text-center focus:outline-none focus:border-accent-purple"
            />
            <span className="text-gray-400">kg</span>
          </div>
        </div>
      </Card>

      {/* Body selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CELESTIAL_BODIES.map((body) => (
          <button
            key={body.id}
            onClick={() => setSelectedBody(body.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedBody === body.id
                ? 'border-accent-purple bg-accent-purple/10'
                : 'border-cosmos-border bg-cosmos-card hover:border-accent-purple/50'
            }`}
          >
            <span className="text-2xl block mb-1">{body.emoji}</span>
            <span className="text-sm text-white">{body.name}</span>
            <span className="text-xs text-gray-500 block">
              g = {body.gravity} m/s²
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {selectedWeight && (
        <Card padding="lg" className="border-accent-purple/30">
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-2">
              Na {selectedWeight.body.name} {selectedWeight.body.emoji}
            </p>
            <p className="text-4xl font-display font-bold text-white mb-1">
              {formatWeightNewtons(selectedWeight.weightN)}
            </p>
            <p className="text-lg text-accent-purple">
              ≈ {formatWeightKgf(selectedWeight.weightKgf)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Grawitacja: {getGravityComparison(selectedWeight.body.id)}
            </p>
          </div>

          {/* Comparison bars */}
          <div className="space-y-3">
            {weights
              .sort((a, b) => b.ratio - a.ratio)
              .map((w) => (
                <div key={w.body.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">
                      {w.body.emoji} {w.body.name}
                    </span>
                    <span className="text-gray-300">
                      {w.ratio.toFixed(2)}x Ziemi
                    </span>
                  </div>
                  <div className="h-3 bg-cosmos-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        w.body.id === selectedBody
                          ? 'bg-accent-purple'
                          : w.body.id === 'earth'
                          ? 'bg-accent-cyan'
                          : 'bg-gray-600'
                      }`}
                      style={{
                        width: `${Math.min(100, (w.ratio / weights[0].ratio) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* Quiz CTA */}
      <Card padding="md" className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-accent-purple" />
          <div>
            <h3 className="font-medium text-white">Mini-quiz: Masa i ciężar</h3>
            <p className="text-sm text-gray-400">
              Sprawdź, czy rozumiesz różnicę
            </p>
          </div>
        </div>
        <Button onClick={() => setShowQuiz(true)}>Rozwiąż quiz</Button>
      </Card>
    </div>
  );
}
