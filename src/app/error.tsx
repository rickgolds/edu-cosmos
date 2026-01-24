'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card padding="lg" className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-error/10 border border-error/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>

        <h1 className="text-2xl font-display font-bold text-white mb-2">
          Coś poszło nie tak
        </h1>
        <p className="text-gray-400 mb-6">
          Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wrócić na stronę główną.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-600 mb-6 font-mono">
            Kod błędu: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Spróbuj ponownie
          </Button>
          <Link href="/">
            <Button variant="secondary" leftIcon={<Home className="w-4 h-4" />}>
              Strona główna
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
