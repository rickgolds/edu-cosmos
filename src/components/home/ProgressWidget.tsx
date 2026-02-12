'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rocket, BookOpen, BarChart3, Award, Flame, ArrowRight } from 'lucide-react';
import { Button, Card, Skeleton } from '@/components/ui';
import { useProgress } from '@/hooks/useProgress';

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-cosmos-card/50 border border-cosmos-border">
      {icon}
      <span className="text-xl font-display font-bold text-white">{value}</span>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}

export function ProgressWidget() {
  const { stats } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 border-t border-cosmos-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton variant="rectangular" className="h-48 w-full rounded-xl" />
        </div>
      </section>
    );
  }

  const isReturningUser = stats.completedLessonsCount > 0 || stats.totalQuizzes > 0;

  if (isReturningUser) {
    return (
      <section className="py-20 border-t border-cosmos-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Twój postęp
            </h2>
            <p className="text-gray-400">
              Kontynuuj swoją kosmiczną podróż
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<BookOpen className="w-5 h-5 text-accent-cyan" />}
              value={stats.completedLessonsCount}
              label="Ukończone lekcje"
            />
            <StatCard
              icon={<BarChart3 className="w-5 h-5 text-accent-purple" />}
              value={stats.avgOverallScore > 0 ? `${stats.avgOverallScore}%` : '—'}
              label="Średni wynik"
            />
            <StatCard
              icon={<Flame className="w-5 h-5 text-orange-400" />}
              value={stats.streak}
              label="Seria dni"
            />
            <StatCard
              icon={<Award className="w-5 h-5 text-yellow-400" />}
              value={stats.badgesCount}
              label="Odznaki"
            />
          </div>

          <div className="text-center">
            <Link href="/progress">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Kontynuuj naukę
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // New user CTA
  return (
    <section className="py-20 border-t border-cosmos-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6">
          <div className="p-4 rounded-full bg-accent-cyan/10 animate-float">
            <Rocket className="w-10 h-10 text-accent-cyan" />
          </div>
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          Gotowy na kosmiczną przygodę?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Śledź swój postęp, zdobywaj osiągnięcia i poznawaj fascynujące tajemnice Wszechświata.
          Rozpocznij swoją podróż już teraz!
        </p>
        <Link href="/lessons">
          <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
            Rozpocznij pierwszą lekcję
          </Button>
        </Link>
      </div>
    </section>
  );
}
