'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { RecommendationState } from '../adaptive.types';
import { hasRecommendations } from '../adaptive.selectors';
import { RecommendationCard, RecommendationCardCompact } from './RecommendationCard';

interface DailyMissionProps {
  recommendations: RecommendationState | null;
  variant?: 'full' | 'compact';
  className?: string;
}

export function DailyMission({
  recommendations,
  variant = 'full',
  className,
}: DailyMissionProps) {
  if (!hasRecommendations(recommendations)) {
    return <DailyMissionEmpty className={className} />;
  }

  if (variant === 'compact') {
    return (
      <DailyMissionCompact
        recommendations={recommendations!}
        className={className}
      />
    );
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-display font-bold text-white">
            Twoja misja na dziś
          </h2>
        </div>
        <Link
          href="/learning"
          className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          Zobacz wszystko
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Recommendation cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations!.items.map((rec, index) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

interface DailyMissionCompactProps {
  recommendations: RecommendationState;
  className?: string;
}

function DailyMissionCompact({
  recommendations,
  className,
}: DailyMissionCompactProps) {
  return (
    <Card variant="default" className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Twoja misja na dziś
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {recommendations.items.slice(0, 3).map((rec) => (
          <RecommendationCardCompact key={rec.id} recommendation={rec} />
        ))}
        <Link
          href="/learning"
          className="block text-center text-sm text-cyan-400 hover:text-cyan-300 pt-2"
        >
          Zobacz szczegóły
        </Link>
      </CardContent>
    </Card>
  );
}

interface DailyMissionEmptyProps {
  className?: string;
}

function DailyMissionEmpty({ className }: DailyMissionEmptyProps) {
  return (
    <Card variant="default" className={className}>
      <CardContent className="py-8 text-center">
        <Sparkles className="w-10 h-10 mx-auto mb-3 text-gray-600" />
        <h3 className="text-lg font-medium text-white mb-2">
          Brak rekomendacji
        </h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Rozpocznij naukę, rozwiązuj quizy, a system adaptacyjny przygotuje
          spersonalizowane rekomendacje specjalnie dla Ciebie!
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/lessons"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Przeglądaj lekcje
          </Link>
          <Link
            href="/quizzes"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Rozwiąż quiz
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

interface DailyMissionBannerProps {
  recommendations: RecommendationState | null;
  className?: string;
}

export function DailyMissionBanner({
  recommendations,
  className,
}: DailyMissionBannerProps) {
  if (!hasRecommendations(recommendations)) {
    return null;
  }

  const topRec = recommendations!.items[0];

  return (
    <div
      className={clsx(
        'bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-700/30 rounded-lg p-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-sm text-gray-400">Następny krok:</p>
            <p className="text-white font-medium">{topRec.targetTitle}</p>
          </div>
        </div>
        <Link
          href={
            topRec.type === 'lesson'
              ? `/lessons/${topRec.targetSlug}`
              : topRec.type === 'quiz'
              ? `/quizzes?quiz=${topRec.targetSlug}`
              : `/learning?tab=review`
          }
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Rozpocznij
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
