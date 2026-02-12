import Link from 'next/link';
import { Orbit, ArrowRight } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';

interface AsteroidTickerProps {
  neoData: { count: number; hazardousCount: number } | null;
}

function pluralizeNeo(count: number): string {
  if (count === 1) return 'obiekt';
  if (count >= 2 && count <= 4) return 'obiekty';
  return 'obiektów';
}

export function AsteroidTicker({ neoData }: AsteroidTickerProps) {
  if (!neoData) {
    return (
      <Card padding="lg" className="text-center">
        <Orbit className="w-8 h-8 text-gray-500 mx-auto mb-2" />
        <p className="text-sm text-gray-500">
          Dane o asteroidach chwilowo niedostępne
        </p>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-accent-cyan/10">
          <Orbit className="w-8 h-8 text-accent-cyan animate-pulse-slow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400 mb-1">Dziś w pobliżu Ziemi</p>
          <p className="text-3xl font-display font-bold text-white">
            {neoData.count}
          </p>
          <p className="text-sm text-gray-400">
            {pluralizeNeo(neoData.count)} NEO
          </p>
        </div>
      </div>

      {neoData.hazardousCount > 0 && (
        <Badge variant="warning" className="mt-3">
          {neoData.hazardousCount} potencjalnie niebezpieczn{neoData.hazardousCount === 1 ? 'y' : 'ych'}
        </Badge>
      )}

      <Link href="/asteroid-watch" className="mt-4 block">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Asteroid Watch
        </Button>
      </Link>
    </Card>
  );
}
