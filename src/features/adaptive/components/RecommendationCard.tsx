'use client';

import { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import {
  BookOpen,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { Recommendation } from '../adaptive.types';
import { getRecommendationReasonText } from '../adaptive.recommendations';
import { TagChipList } from './TagChip';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index?: number;
  className?: string;
}

export function RecommendationCard({
  recommendation,
  index,
  className,
}: RecommendationCardProps) {
  const [showWhy, setShowWhy] = useState(false);

  const getIcon = () => {
    switch (recommendation.type) {
      case 'lesson':
        return <BookOpen className="w-5 h-5" />;
      case 'review':
        return <RefreshCw className="w-5 h-5" />;
      case 'quiz':
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (recommendation.type) {
      case 'lesson':
        return 'Lekcja';
      case 'review':
        return 'Powtórka';
      case 'quiz':
        return 'Quiz';
    }
  };

  const getTypeColor = () => {
    switch (recommendation.type) {
      case 'lesson':
        return 'text-cyan-400 bg-cyan-500/10';
      case 'review':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'quiz':
        return 'text-purple-400 bg-purple-500/10';
    }
  };

  const getLink = () => {
    switch (recommendation.type) {
      case 'lesson':
        return `/lessons/${recommendation.targetSlug}`;
      case 'review':
        return `/learning?tab=review&tag=${recommendation.targetSlug}`;
      case 'quiz':
        return `/quizzes?quiz=${recommendation.targetSlug}`;
    }
  };

  const reasonText = getRecommendationReasonText(recommendation.reason);

  return (
    <Card
      variant="interactive"
      className={clsx(
        'relative overflow-hidden transition-all',
        className
      )}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* Index badge */}
          {index !== undefined && (
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-300">
              {index + 1}
            </div>
          )}

          {/* Icon */}
          <div
            className={clsx(
              'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
              getTypeColor()
            )}
          >
            {getIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={clsx(
                  'text-xs font-medium px-2 py-0.5 rounded',
                  getTypeColor()
                )}
              >
                {getTypeLabel()}
              </span>
            </div>
            <h3 className="font-medium text-white truncate">
              {recommendation.targetTitle}
            </h3>
          </div>
        </div>

        {/* Tags */}
        {recommendation.tags.length > 0 && (
          <div className="mt-3 pl-10">
            <TagChipList tags={recommendation.tags} maxVisible={3} />
          </div>
        )}

        {/* Why section */}
        <div className="mt-3 pl-10">
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showWhy ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
            Dlaczego to polecamy?
          </button>
          {showWhy && (
            <p className="mt-2 text-sm text-gray-400 bg-gray-800/50 rounded p-2">
              {reasonText}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pl-10">
          <Link
            href={getLink()}
            className={clsx(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
              'bg-cyan-600 hover:bg-cyan-500 text-white transition-colors'
            )}
          >
            {recommendation.type === 'lesson' && 'Rozpocznij lekcję'}
            {recommendation.type === 'review' && 'Powtórz materiał'}
            {recommendation.type === 'quiz' && 'Rozwiąż quiz'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

interface RecommendationCardCompactProps {
  recommendation: Recommendation;
  className?: string;
}

export function RecommendationCardCompact({
  recommendation,
  className,
}: RecommendationCardCompactProps) {
  const getIcon = () => {
    switch (recommendation.type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'review':
        return <RefreshCw className="w-4 h-4" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (recommendation.type) {
      case 'lesson':
        return 'text-cyan-400';
      case 'review':
        return 'text-yellow-400';
      case 'quiz':
        return 'text-purple-400';
    }
  };

  const getLink = () => {
    switch (recommendation.type) {
      case 'lesson':
        return `/lessons/${recommendation.targetSlug}`;
      case 'review':
        return `/learning?tab=review&tag=${recommendation.targetSlug}`;
      case 'quiz':
        return `/quizzes?quiz=${recommendation.targetSlug}`;
    }
  };

  return (
    <Link
      href={getLink()}
      className={clsx(
        'flex items-center gap-3 p-3 rounded-lg',
        'bg-gray-800/50 hover:bg-gray-800 transition-colors',
        'group',
        className
      )}
    >
      <span className={clsx('flex-shrink-0', getTypeColor())}>{getIcon()}</span>
      <span className="flex-1 text-sm text-gray-300 truncate group-hover:text-white transition-colors">
        {recommendation.targetTitle}
      </span>
      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
    </Link>
  );
}
