import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <Loader2
      className={clsx('animate-spin text-accent-cyan', sizes[size], className)}
      aria-label="Ładowanie..."
    />
  );
}

// Full page loading spinner
export function LoadingSpinner({ message = 'Ładowanie...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Spinner size="lg" />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
