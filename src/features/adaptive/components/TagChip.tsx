'use client';

import { clsx } from 'clsx';
import { TAG_LABELS, type AdaptiveTag } from '../adaptive.tags';

interface TagChipProps {
  tag: AdaptiveTag;
  mastery?: number; // 0..1, optional
  size?: 'sm' | 'md';
  showMastery?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagChip({
  tag,
  mastery,
  size = 'sm',
  showMastery = false,
  onClick,
  className,
}: TagChipProps) {
  const label = TAG_LABELS[tag] || tag;

  const getMasteryColor = () => {
    if (mastery === undefined) return 'bg-gray-700 text-gray-300';
    if (mastery >= 0.8) return 'bg-green-900/50 text-green-300 border-green-700';
    if (mastery >= 0.6) return 'bg-cyan-900/50 text-cyan-300 border-cyan-700';
    if (mastery >= 0.3) return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
    return 'bg-gray-800 text-gray-400 border-gray-600';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border',
        sizeClasses[size],
        getMasteryColor(),
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
    >
      <span className="truncate max-w-[120px]">{label}</span>
      {showMastery && mastery !== undefined && (
        <span className="text-[10px] opacity-75">
          {Math.round(mastery * 100)}%
        </span>
      )}
    </span>
  );
}

interface TagChipListProps {
  tags: AdaptiveTag[];
  tagStats?: Record<AdaptiveTag, { mastery: number }>;
  showMastery?: boolean;
  maxVisible?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function TagChipList({
  tags,
  tagStats,
  showMastery = false,
  maxVisible = 5,
  size = 'sm',
  className,
}: TagChipListProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const hiddenCount = tags.length - maxVisible;

  return (
    <div className={clsx('flex flex-wrap gap-1', className)}>
      {visibleTags.map((tag) => (
        <TagChip
          key={tag}
          tag={tag}
          mastery={tagStats?.[tag]?.mastery}
          showMastery={showMastery}
          size={size}
        />
      ))}
      {hiddenCount > 0 && (
        <span className="text-xs text-gray-500 self-center">
          +{hiddenCount} więcej
        </span>
      )}
    </div>
  );
}
