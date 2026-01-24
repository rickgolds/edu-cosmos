import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchTodayApod, fetchApodByDate, fetchApodRange } from '@/features/apod';
import { ApodDetail, ApodCard } from '@/features/apod';
import { Card, SkeletonCard, ErrorState } from '@/components/ui';
import { formatDateForApi, getLastNDays } from '@/lib/date-utils';

export const metadata: Metadata = {
  title: 'Kosmos dziś - APOD',
  description: 'Astronomiczne zdjęcie dnia od NASA. Codzienne piękne obrazy kosmosu z opisami.',
};

interface ApodPageProps {
  searchParams: { date?: string };
}

export default async function ApodPage({ searchParams }: ApodPageProps) {
  const selectedDate = searchParams.date || formatDateForApi(new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Kosmos dziś
        </h1>
        <p className="text-gray-400">
          Astronomiczne zdjęcie dnia (APOD) od NASA
        </p>
      </div>

      {/* Main APOD */}
      <Suspense fallback={<SkeletonCard />}>
        <ApodContent date={selectedDate} />
      </Suspense>

      {/* Recent APODs */}
      <section className="mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          Ostatnie zdjęcia
        </h2>
        <Suspense fallback={<RecentApodsSkeleton />}>
          <RecentApods currentDate={selectedDate} />
        </Suspense>
      </section>
    </div>
  );
}

// Main APOD content
async function ApodContent({ date }: { date: string }) {
  try {
    const apod = await fetchApodByDate(date);
    return <ApodDetail apod={apod} />;
  } catch (error) {
    return (
      <Card padding="lg">
        <ErrorState
          title="Nie udało się załadować"
          message="Nie można pobrać zdjęcia dla wybranej daty. Spróbuj innej daty lub odśwież stronę."
        />
      </Card>
    );
  }
}

// Recent APODs grid
async function RecentApods({ currentDate }: { currentDate: string }) {
  try {
    const dates = getLastNDays(8);
    const endDate = dates[0];
    const startDate = dates[dates.length - 1];

    const apods = await fetchApodRange(startDate, endDate);

    // Filter out current date and reverse to show newest first
    const filteredApods = apods
      .filter((apod) => apod.date !== currentDate)
      .reverse()
      .slice(0, 6);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApods.map((apod) => (
          <ApodCard key={apod.date} apod={apod} />
        ))}
      </div>
    );
  } catch {
    return (
      <Card padding="md" className="text-center">
        <p className="text-gray-400">
          Nie udało się załadować ostatnich zdjęć.
        </p>
      </Card>
    );
  }
}

// Skeleton for recent APODs
function RecentApodsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
