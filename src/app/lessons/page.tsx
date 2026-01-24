import { Metadata } from 'next';
import Link from 'next/link';
import { lessons, getAllCategories } from '@/data/lessons';
import { LessonCard } from '@/features/lessons';
import { CATEGORY_LABELS } from '@/lib/constants';
import { Badge, Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Lekcje',
  description: 'Mikro-moduły edukacyjne o kosmosie. Poznaj Układ Słoneczny, gwiazdy, galaktyki, rakiety i teleskopy.',
};

export default function LessonsPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Lekcje
        </h1>
        <p className="text-gray-400">
          Interaktywne mikro-moduły edukacyjne z quizami na końcu każdej lekcji.
        </p>
      </div>

      {/* Category badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Link key={category} href={`#${category}`}>
            <Badge variant="cyan" className="cursor-pointer hover:bg-accent-cyan/30 transition-colors">
              {CATEGORY_LABELS[category]}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Lessons by category */}
      {categories.map((category) => {
        const categoryLessons = lessons.filter((l) => l.category === category);

        return (
          <section key={category} id={category} className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
              {CATEGORY_LABELS[category]}
              <Badge variant="purple" size="sm">
                {categoryLessons.length} {categoryLessons.length === 1 ? 'lekcja' : 'lekcji'}
              </Badge>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryLessons.map((lesson) => (
                <LessonCard key={lesson.slug} lesson={lesson} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Empty state (shouldn't happen but just in case) */}
      {lessons.length === 0 && (
        <Card padding="lg" className="text-center">
          <p className="text-gray-400">
            Brak dostępnych lekcji. Wkrótce pojawią się nowe materiały!
          </p>
        </Card>
      )}
    </div>
  );
}
