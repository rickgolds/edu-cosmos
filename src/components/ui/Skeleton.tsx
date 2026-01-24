import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-cosmos-border/50';

  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={clsx(baseStyles, variants[variant], className)}
      style={style}
      aria-hidden="true"
    />
  );
}

// Pre-built skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="bg-cosmos-card/80 border border-cosmos-border rounded-xl p-6 space-y-4">
      <Skeleton height={200} className="w-full" />
      <Skeleton height={24} className="w-3/4" />
      <Skeleton height={16} className="w-full" />
      <Skeleton height={16} className="w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton height={32} width={100} />
        <Skeleton height={32} width={100} />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          className={clsx('w-full', i === lines - 1 && 'w-4/5')}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ aspectRatio }}
    >
      <Skeleton className="absolute inset-0" />
    </div>
  );
}
