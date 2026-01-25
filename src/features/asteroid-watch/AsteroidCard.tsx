'use client';

import Link from 'next/link';
import { AlertTriangle, Ruler, Gauge, Calendar, Navigation } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { useProgress } from '@/hooks';
import {
  formatDistance,
  formatVelocity,
  formatDiameter,
  getHazardLevel,
} from './neows.service';
import { type NeoSummary } from './neows.types';

interface AsteroidCardProps {
  neo: NeoSummary;
}

export function AsteroidCard({ neo }: AsteroidCardProps) {
  const { progress } = useProgress();
  const isAnalyzed = (progress.asteroidAnalyses ?? []).some((a) => a.neoId === neo.id);
  const hazardLevel = getHazardLevel(neo);

  const hazardColors = {
    low: 'border-cosmos-border',
    medium: 'border-warning/50',
    high: 'border-error/50',
  };

  return (
    <Link href={`/asteroid-watch/${neo.id}`}>
      <Card
        variant="interactive"
        padding="md"
        className={`h-full ${hazardColors[hazardLevel]} ${neo.isPotentiallyHazardous ? 'hover:border-error' : 'hover:border-accent-cyan'
          }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display font-semibold text-white line-clamp-1">
              {neo.name}
            </h3>
            <p className="text-xs text-gray-500">ID: {neo.id}</p>
          </div>
          <div className="flex gap-1">
            {isAnalyzed && (
              <Badge variant="success" size="sm">
                ✓
              </Badge>
            )}
            {neo.isPotentiallyHazardous && (
              <Badge variant="error" size="sm">
                <AlertTriangle className="w-3 h-3" />
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        {neo.closestApproach && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4 text-accent-cyan" />
              <span>
                {new Date(neo.closestApproach.date + 'T00:00:00').toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Navigation className="w-4 h-4 text-accent-purple" />
              <span>{formatDistance(neo.closestApproach.distanceKm)}</span>
              <span className="text-gray-600">
                ({neo.closestApproach.distanceAu.toFixed(4)} AU)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Ruler className="w-4 h-4 text-accent-pink" />
              <span>{formatDiameter(neo.estimatedDiameterMin, neo.estimatedDiameterMax)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Gauge className="w-4 h-4 text-warning" />
              <span>{formatVelocity(neo.closestApproach.velocityKmPerSec)}</span>
            </div>
          </div>
        )}

        {/* Lunar distance indicator */}
        {neo.closestApproach && (
          <div className="mt-3 pt-3 border-t border-cosmos-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Dystans w Księżycach</span>
              <span className="text-gray-300 font-medium">
                {neo.closestApproach.distanceLunar.toFixed(1)} LD
              </span>
            </div>
            <div className="mt-1 h-1.5 bg-cosmos-dark rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${neo.closestApproach.distanceLunar < 10
                    ? 'bg-error'
                    : neo.closestApproach.distanceLunar < 50
                      ? 'bg-warning'
                      : 'bg-success'
                  }`}
                style={{
                  width: `${Math.min(100, (neo.closestApproach.distanceLunar / 100) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
}
