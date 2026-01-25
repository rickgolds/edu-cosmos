'use client';

import { Card, CardTitle } from '@/components/ui';
import { Info, Ruler, Navigation, Gauge } from 'lucide-react';

export function AsteroidEducation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* AU explanation */}
      <Card padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-5 h-5 text-accent-cyan" />
          <CardTitle>Co to jest AU?</CardTitle>
        </div>
        <div className="text-sm text-gray-300 space-y-2">
          <p>
            <strong>AU</strong> (Astronomical Unit) to jednostka astronomiczna – średnia
            odległość Ziemi od Słońca.
          </p>
          <p className="text-accent-cyan font-medium">
            1 AU ≈ 150 milionów km
          </p>
          <p className="text-gray-400">
            Dla porównania: Księżyc jest od nas w odległości zaledwie 0.0026 AU.
          </p>
        </div>
      </Card>

      {/* Diameter explanation */}
      <Card padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="w-5 h-5 text-accent-purple" />
          <CardTitle>Widełki średnicy</CardTitle>
        </div>
        <div className="text-sm text-gray-300 space-y-2">
          <p>
            Średnicę asteroid szacujemy na podstawie jasności i albedo (odbijania światła).
          </p>
          <p>
            Widełki (np. <span className="text-accent-purple">100 - 250 m</span>) oznaczają
            niepewność pomiaru.
          </p>
          <p className="text-gray-400">
            Asteroida o średnicy 140m+ może spowodować regionalne zniszczenia.
          </p>
        </div>
      </Card>

      {/* Velocity explanation */}
      <Card padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Gauge className="w-5 h-5 text-warning" />
          <CardTitle>Prędkość km/s</CardTitle>
        </div>
        <div className="text-sm text-gray-300 space-y-2">
          <p>
            Prędkość względna asteroidy wobec Ziemi w momencie najbliższego podejścia.
          </p>
          <p>
            Typowe prędkości: <span className="text-warning">5-30 km/s</span>
          </p>
          <p className="text-gray-400">
            Dla porównania: pocisk karabinowy to zaledwie 1 km/s.
          </p>
        </div>
      </Card>
    </div>
  );
}

export function AsteroidQuizData() {
  return {
    id: 'asteroid-interpretation',
    title: 'Quiz: Interpretacja danych o asteroidach',
    description: 'Sprawdź, czy potrafisz poprawnie interpretować dane o NEO.',
    questions: [
      {
        id: 'aq-1',
        question: 'Asteroida ma dystans podejścia 0.01 AU. Ile to w przybliżeniu milionów kilometrów?',
        options: [
          { id: 'a', text: '1.5 miliona km', isCorrect: true },
          { id: 'b', text: '15 milionów km', isCorrect: false },
          { id: 'c', text: '150 tysięcy km', isCorrect: false },
          { id: 'd', text: '150 milionów km', isCorrect: false },
        ],
        explanation: '1 AU ≈ 150 milionów km, więc 0.01 AU = 1.5 miliona km. To około 4 razy dalej niż Księżyc.',
      },
      {
        id: 'aq-2',
        question: 'Która asteroida jest potencjalnie bardziej niebezpieczna?',
        options: [
          { id: 'a', text: '1 km średnicy, 50 LD od Ziemi', isCorrect: false },
          { id: 'b', text: '200 m średnicy, 5 LD od Ziemi', isCorrect: true },
          { id: 'c', text: '50 m średnicy, 2 LD od Ziemi', isCorrect: false },
          { id: 'd', text: '500 m średnicy, 100 LD od Ziemi', isCorrect: false },
        ],
        explanation: 'Kombinacja rozmiaru i bliskości jest kluczowa. 200 m asteroida na 5 LD od Ziemi stanowi największe zagrożenie – jest wystarczająco duża i blisko.',
      },
      {
        id: 'aq-3',
        question: 'Co oznacza etykieta "Potentially Hazardous Asteroid" (PHA)?',
        options: [
          { id: 'a', text: 'Asteroida na pewno uderzy w Ziemię', isCorrect: false },
          { id: 'b', text: 'Asteroida zbliża się do Ziemi na mniej niż 0.05 AU i ma >140m średnicy', isCorrect: true },
          { id: 'c', text: 'Asteroida zawiera toksyczne substancje', isCorrect: false },
          { id: 'd', text: 'Asteroida porusza się szybciej niż 10 km/s', isCorrect: false },
        ],
        explanation: 'PHA to asteroida spełniająca dwa kryteria: zbliża się do Ziemi na mniej niż 0.05 AU (7.5 mln km) i ma średnicę ponad 140 metrów.',
      },
    ],
  };
}
