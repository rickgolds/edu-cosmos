import Link from 'next/link';
import { Rocket, BookOpen, Brain, Search, ArrowRight, Sparkles, Orbit, FlaskConical } from 'lucide-react';
import { Button, Card, CardTitle, Badge } from '@/components/ui';
import { fetchTodayApod } from '@/features/apod';
import { fetchNeoFeed } from '@/features/asteroid-watch';
import { lessons } from '@/data/lessons';
import { LessonCard } from '@/features/lessons';
import { formatDateForApi } from '@/lib/date-utils';
import {
  CosmosToday,
  StatsCounters,
  PlanetCarousel,
  HomeQuiz,
  ProgressWidget,
} from '@/components/home';

export default async function HomePage() {
  const today = formatDateForApi(new Date());

  // Parallel server-side data fetching
  const [apodResult, neoResult] = await Promise.allSettled([
    fetchTodayApod(),
    fetchNeoFeed({ startDate: today, endDate: today }),
  ]);

  const apod = apodResult.status === 'fulfilled' ? apodResult.value : null;

  let neoData: { count: number; hazardousCount: number } | null = null;
  if (neoResult.status === 'fulfilled') {
    const neos = neoResult.value;
    neoData = {
      count: neos.length,
      hazardousCount: neos.filter((n) => n.isPotentiallyHazardous).length,
    };
  }

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

      {/* "Co dziś w kosmosie" - APOD + Asteroids + Term */}
      <CosmosToday apod={apod} neoData={neoData} />

      {/* Animated Stats Counters */}
      <StatsCounters />

      {/* Planet Carousel → Planetarium */}
      <PlanetCarousel />

      {/* Quiz of the Day */}
      <HomeQuiz />

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

      {/* Progress Widget / CTA */}
      <ProgressWidget />
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
