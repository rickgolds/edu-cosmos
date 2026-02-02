'use client';

import { clsx } from 'clsx';
import { getMasteryLevel } from '../adaptive.selectors';

interface MasteryBarProps {
  mastery: number; // 0..1
  showLabel?: boolean;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MasteryBar({
  mastery,
  showLabel = false,
  showPercentage = true,
  size = 'md',
  className,
}: MasteryBarProps) {
  const percentage = Math.round(mastery * 100);
  const { level, label, color } = getMasteryLevel(mastery);

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const getBarColor = () => {
    if (mastery >= 0.8) return 'bg-green-500';
    if (mastery >= 0.6) return 'bg-cyan-500';
    if (mastery >= 0.3) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {showLabel && (
            <span className={clsx('text-xs font-medium', color)}>{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs text-gray-400">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={clsx(
          'w-full bg-gray-700 rounded-full overflow-hidden',
          heightClasses[size]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out',
            getBarColor()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface MasteryBarCompactProps {
  mastery: number;
  className?: string;
}

export function MasteryBarCompact({ mastery, className }: MasteryBarCompactProps) {
  const percentage = Math.round(mastery * 100);

  const getBarColor = () => {
    if (mastery >= 0.8) return 'bg-green-500';
    if (mastery >= 0.6) return 'bg-cyan-500';
    if (mastery >= 0.3) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full', getBarColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 tabular-nums w-8 text-right">
        {percentage}%
      </span>
    </div>
  );
}
