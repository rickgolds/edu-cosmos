'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, ArrowRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { MisconceptionFlag } from '../adaptive.types';
import { getActiveMisconceptionDetails } from '../adaptive.selectors';
import { TagChipList } from './TagChip';

interface DiagnosticsPanelProps {
  misconceptions: MisconceptionFlag[];
  onResolveMisconception?: (ruleId: string) => void;
  className?: string;
}

export function DiagnosticsPanel({
  misconceptions,
  onResolveMisconception,
  className,
}: DiagnosticsPanelProps) {
  const activeMisconceptions = getActiveMisconceptionDetails(misconceptions);
  const resolvedCount = misconceptions.filter((m) => m.resolved).length;

  if (activeMisconceptions.length === 0 && resolvedCount === 0) {
    return (
      <Card variant="default" className={className}>
        <CardContent className="py-8 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <p className="text-gray-300">Brak wykrytych problemów!</p>
          <p className="text-sm text-gray-500 mt-1">
            Kontynuuj naukę, a system będzie monitorował Twoje postępy.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {/* Active misconceptions */}
      {activeMisconceptions.length > 0 && (
        <Card variant="default">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Wykryte możliwe pomyłki ({activeMisconceptions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeMisconceptions.map((item) => (
              <MisconceptionCard
                key={item.id}
                misconception={item}
                onResolve={onResolveMisconception}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Resolved count */}
      {resolvedCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{resolvedCount} problemów naprawionych</span>
        </div>
      )}
    </div>
  );
}

interface MisconceptionCardProps {
  misconception: {
    id: string;
    title: string;
    description: string;
    userMessage: string;
    relatedTags: { tag: string; label: string }[];
    recommendedLessonSlug?: string;
    detectedAt: string;
  };
  onResolve?: (ruleId: string) => void;
}

function MisconceptionCard({ misconception, onResolve }: MisconceptionCardProps) {
  const detectedDate = new Date(misconception.detectedAt).toLocaleDateString('pl-PL');

  return (
    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium text-yellow-200">{misconception.title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">Wykryto: {detectedDate}</p>
        </div>
        {onResolve && (
          <button
            onClick={() => onResolve(misconception.id)}
            className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            title="Oznacz jako naprawione"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* User message */}
      <p className="mt-3 text-sm text-gray-300">{misconception.userMessage}</p>

      {/* Related tags */}
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-1">Powiązane tematy:</p>
        <div className="flex flex-wrap gap-1">
          {misconception.relatedTags.map(({ tag, label }) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      {misconception.recommendedLessonSlug && (
        <div className="mt-4">
          <Link
            href={`/lessons/${misconception.recommendedLessonSlug}`}
            className={clsx(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm',
              'bg-yellow-600 hover:bg-yellow-500 text-white transition-colors'
            )}
          >
            Napraw to
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

interface DiagnosticsBadgeProps {
  misconceptions: MisconceptionFlag[];
  className?: string;
}

export function DiagnosticsBadge({ misconceptions, className }: DiagnosticsBadgeProps) {
  const activeCount = misconceptions.filter((m) => !m.resolved).length;

  if (activeCount === 0) {
    return null;
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium',
        'bg-yellow-500 text-yellow-900',
        className
      )}
    >
      {activeCount}
    </span>
  );
}
