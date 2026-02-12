import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button, Card, SkeletonCard } from '@/components/ui';
import { ApodCard } from '@/features/apod';
import type { Apod } from '@/features/apod';
import { AsteroidTicker } from './AsteroidTicker';
import { TermOfTheDay } from './TermOfTheDay';

interface CosmosTodayProps {
  apod: Apod | null;
  neoData: { count: number; hazardousCount: number } | null;
}

export function CosmosToday({ apod, neoData }: CosmosTodayProps) {
  return (
    <section className="py-16 border-t border-cosmos-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Co dziś w kosmosie
            </h2>
            <p className="text-gray-400">
              Codzienne zdjęcie NASA, asteroidy i nowy termin
            </p>
          </div>
          <Link href="/apod">
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Zobacz więcej
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* APOD - takes 2 columns */}
          <div className="lg:col-span-2">
            {apod ? (
              <ApodCard apod={apod} variant="full" />
            ) : (
              <Card padding="lg" className="text-center h-full flex flex-col items-center justify-center">
                <p className="text-gray-400 mb-4">
                  Nie udało się załadować zdjęcia dnia.
                </p>
                <Link href="/apod">
                  <Button variant="secondary">Przejdź do archiwum</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Sidebar - asteroid ticker + term of the day */}
          <div className="flex flex-col gap-6">
            <AsteroidTicker neoData={neoData} />
            <Suspense fallback={<SkeletonCard />}>
              <TermOfTheDay />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
