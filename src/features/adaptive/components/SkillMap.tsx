'use client';

import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TAG_GROUPS, TAG_LABELS, type AdaptiveTag } from '../adaptive.tags';
import type { TagStat } from '../adaptive.types';
import { getTagStatsGrouped, getMasteryLevel } from '../adaptive.selectors';
import { MasteryBar, MasteryBarCompact } from './MasteryBar';

interface SkillMapProps {
  tagStats: Record<AdaptiveTag, TagStat>;
  variant?: 'full' | 'compact';
  className?: string;
}

export function SkillMap({ tagStats, variant = 'full', className }: SkillMapProps) {
  const grouped = getTagStatsGrouped(tagStats);

  if (variant === 'compact') {
    return <SkillMapCompact tagStats={tagStats} className={className} />;
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {Object.entries(grouped).map(([groupKey, group]) => (
        <Card key={groupKey} variant="default">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{group.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {group.stats.map((stat) => (
                <SkillMapItem key={stat.tag} stat={stat} />
              ))}
              {group.stats.length === 0 && (
                <p className="text-sm text-gray-500">
                  Brak danych - rozpocznij naukę w tym obszarze!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface SkillMapItemProps {
  stat: TagStat;
}

function SkillMapItem({ stat }: SkillMapItemProps) {
  const label = TAG_LABELS[stat.tag] || stat.tag;
  const { level, label: levelLabel, color } = getMasteryLevel(stat.mastery);
  const hasData = stat.seen > 0;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">{label}</span>
          {hasData && (
            <span className={clsx('text-xs', color)}>({levelLabel})</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {hasData ? (
            <>
              <span>
                {stat.correct}/{stat.seen} poprawnych
              </span>
            </>
          ) : (
            <span>Nierozpoczęte</span>
          )}
        </div>
      </div>
      <MasteryBar
        mastery={hasData ? stat.mastery : 0}
        showPercentage={hasData}
        size="sm"
      />
    </div>
  );
}

interface SkillMapCompactProps {
  tagStats: Record<AdaptiveTag, TagStat>;
  maxItems?: number;
  className?: string;
}

function SkillMapCompact({
  tagStats,
  maxItems = 5,
  className,
}: SkillMapCompactProps) {
  // Get all tags with data, sorted by mastery
  const tagsWithData = Object.values(tagStats)
    .filter((stat) => stat.seen > 0)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, maxItems);

  if (tagsWithData.length === 0) {
    return (
      <div className={clsx('text-sm text-gray-500', className)}>
        Rozpocznij quizy, aby zobaczyć swoją mapę umiejętności!
      </div>
    );
  }

  return (
    <div className={clsx('space-y-2', className)}>
      {tagsWithData.map((stat) => {
        const label = TAG_LABELS[stat.tag] || stat.tag;
        return (
          <div key={stat.tag} className="flex items-center gap-3">
            <span className="text-sm text-gray-400 truncate w-32">{label}</span>
            <div className="flex-1">
              <MasteryBarCompact mastery={stat.mastery} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface WeakAreasCardProps {
  tagStats: Record<AdaptiveTag, TagStat>;
  maxItems?: number;
  className?: string;
}

export function WeakAreasCard({
  tagStats,
  maxItems = 3,
  className,
}: WeakAreasCardProps) {
  const allTagsWithData = Object.values(tagStats).filter((stat) => stat.seen > 0);
  const weakTags = allTagsWithData
    .filter((stat) => stat.mastery < 0.6)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, maxItems);

  return (
    <Card variant="default" className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-yellow-400">⚠️</span>
          Słabe obszary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {weakTags.length === 0 ? (
          <div className="text-center py-4">
            {allTagsWithData.length === 0 ? (
              <p className="text-sm text-gray-500">
                Rozwiąż quizy, aby zobaczyć obszary do poprawy.
              </p>
            ) : (
              <>
                <span className="text-2xl">🎉</span>
                <p className="text-sm text-green-400 mt-2">
                  Świetnie! Wszystkie tematy opanowane powyżej 60%.
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {weakTags.map((stat) => {
                const label = TAG_LABELS[stat.tag] || stat.tag;
                return (
                  <div key={stat.tag}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">{label}</span>
                      <span className="text-xs text-yellow-400">
                        {Math.round(stat.mastery * 100)}%
                      </span>
                    </div>
                    <MasteryBar mastery={stat.mastery} showPercentage={false} size="sm" />
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Te tematy wymagają dodatkowej uwagi. Skorzystaj z rekomendacji!
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
