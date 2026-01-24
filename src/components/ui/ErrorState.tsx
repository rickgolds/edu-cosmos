import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Wystąpił błąd',
  message = 'Nie udało się załadować danych. Spróbuj ponownie.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-error/10 border border-error/30 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Spróbuj ponownie
        </Button>
      )}
    </div>
  );
}
