import Link from 'next/link';
import { Suspense } from 'react';
import { Rocket, BookOpen, Brain, Search, ArrowRight, Sparkles, Orbit, FlaskConical } from 'lucide-react';
import { Button, Card, CardTitle, Badge, SkeletonCard } from '@/components/ui';
import { fetchTodayApod } from '@/features/apod';
import { ApodCard } from '@/features/apod';
import { lessons } from '@/data/lessons';
import { LessonCard } from '@/features/lessons';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="purple" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Aplikacja edukacyjna
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient">Odkryj tajemnice</span>
              <br />
              <span className="text-white">Wszechświata</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Poznawaj kosmos poprzez codzienne zdjęcia NASA, interaktywne lekcje,
              quizy i bogatą bibliotekę zasobów kosmicznych.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lessons">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Rozpocznij naukę
                </Button>
              </Link>
              <Link href="/apod">
                <Button variant="secondary" size="lg">
                  Zobacz kosmos dziś
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-accent-cyan rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-accent-purple rounded-full animate-pulse-slow animation-delay-200" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-accent-pink rounded-full animate-pulse-slow animation-delay-500" />
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-cosmos-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Co znajdziesz w aplikacji?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kompleksowa platforma do nauki o kosmosie z materiałami NASA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Kosmos dziś"
              description="Codzienne zdjęcie astronomiczne NASA z opisem i słowniczkiem pojęć."
              href="/apod"
              color="cyan"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Lekcje"
              description="Mikro-moduły edukacyjne o Układzie Słonecznym, gwiazdach, galaktykach i więcej."
              href="/lessons"
              color="purple"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Quizy"
              description="Sprawdź swoją wiedzę! Szybkie quizy i tematyczne testy z wyjaśnieniami."
              href="/quizzes"
              color="pink"
            />
            <FeatureCard
              icon={<Search className="w-8 h-8" />}
              title="Biblioteka"
              description="Przeszukuj ogromną bazę zdjęć i filmów NASA."
              href="/library"
              color="blue"
            />
          </div>

          {/* New modules row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FeatureCard
              icon={<Orbit className="w-8 h-8" />}
              title="Asteroid Watch"
              description="Monitoruj asteroidy bliskie Ziemi w czasie rzeczywistym z NASA NeoWs."
              href="/asteroid-watch"
              color="cyan"
            />
            <FeatureCard
              icon={<FlaskConical className="w-8 h-8" />}
              title="Laboratoria"
              description="Interaktywne symulacje grawitacji i czasu podróży w kosmosie."
              href="/labs"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* APOD Preview */}
      <section className="py-16 border-t border-cosmos-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Kosmos dziś
              </h2>
              <p className="text-gray-400">
                Astronomiczne zdjęcie dnia od NASA
              </p>
            </div>
            <Link href="/apod">
              <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Zobacz więcej
              </Button>
            </Link>
          </div>

          <Suspense fallback={<SkeletonCard />}>
            <TodayApod />
          </Suspense>
        </div>
      </section>

      {/* Lessons Preview */}
      <section className="py-16 border-t border-cosmos-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Popularne lekcje
              </h2>
              <p className="text-gray-400">
                Rozpocznij swoją kosmiczną przygodę
              </p>
            </div>
            <Link href="/lessons">
              <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Wszystkie lekcje
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.slice(0, 3).map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-cosmos-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Gotowy na kosmiczną przygodę?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Śledź swój postęp, zdobywaj osiągnięcia i poznawaj fascynujące tajemnice Wszechświata.
          </p>
          <Link href="/progress">
            <Button size="lg" variant="primary">
              Sprawdź swój postęp
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Feature card component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: 'cyan' | 'purple' | 'pink' | 'blue';
}

function FeatureCard({ icon, title, description, href, color }: FeatureCardProps) {
  const colors = {
    cyan: 'text-accent-cyan bg-accent-cyan/20 group-hover:bg-accent-cyan/30',
    purple: 'text-accent-purple bg-accent-purple/20 group-hover:bg-accent-purple/30',
    pink: 'text-accent-pink bg-accent-pink/20 group-hover:bg-accent-pink/30',
    blue: 'text-accent-blue bg-accent-blue/20 group-hover:bg-accent-blue/30',
  };

  return (
    <Link href={href}>
      <Card
        variant="interactive"
        padding="lg"
        className="h-full group text-center"
      >
        <div
          className={`inline-flex p-4 rounded-xl mb-4 transition-colors ${colors[color]}`}
        >
          {icon}
        </div>
        <CardTitle className="mb-2 group-hover:text-accent-cyan transition-colors">
          {title}
        </CardTitle>
        <p className="text-gray-400 text-sm">{description}</p>
      </Card>
    </Link>
  );
}

// Today's APOD component (server component)
async function TodayApod() {
  try {
    const apod = await fetchTodayApod();
    return (
      <div className="max-w-2xl">
        <ApodCard apod={apod} variant="full" />
      </div>
    );
  } catch {
    return (
      <Card padding="lg" className="text-center">
        <p className="text-gray-400">
          Nie udało się załadować zdjęcia dnia. Spróbuj później.
        </p>
        <Link href="/apod" className="mt-4 inline-block">
          <Button variant="secondary">Przejdź do archiwum</Button>
        </Link>
      </Card>
    );
  }
}
