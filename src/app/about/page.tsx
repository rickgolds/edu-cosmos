import { Metadata } from 'next';
import { Rocket, BookOpen, Brain, Search, BarChart3, Code, Database, Palette, ExternalLink } from 'lucide-react';
import { Card, CardTitle, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'O aplikacji',
  description: 'Informacje o projekcie CosmosEdu - aplikacji edukacyjnej o kosmosie.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-4xl font-display font-bold mb-4">
          <Rocket className="w-10 h-10 text-accent-cyan" />
          <span className="text-gradient">CosmosEdu</span>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Interaktywna aplikacja edukacyjna o kosmosie stworzona jako projekt pracy inżynierskiej.
        </p>
      </div>

      {/* Project description */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4">
          O projekcie
        </CardTitle>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
          <p>
            CosmosEdu to nowoczesna aplikacja webowa zaprojektowana w celu popularyzacji wiedzy astronomicznej.
            Łączy ona materiały edukacyjne z interaktywnymi elementami, takimi jak quizy i śledzenie postępów,
            aby uczynić naukę o kosmosie angażującą i efektywną.
          </p>
          <p>
            Aplikacja wykorzystuje oficjalne API NASA do prezentacji autentycznych materiałów kosmicznych,
            w tym codziennych zdjęć astronomicznych (APOD) oraz ogromnej biblioteki zdjęć i filmów.
          </p>
        </div>
      </Card>

      {/* Features */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-6">
          Funkcjonalności
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureItem
            icon={<Rocket className="w-5 h-5" />}
            title="Kosmos dziś (APOD)"
            description="Codzienne zdjęcie astronomiczne NASA z opisem i słowniczkiem pojęć"
          />
          <FeatureItem
            icon={<BookOpen className="w-5 h-5" />}
            title="Lekcje"
            description="Mikro-moduły edukacyjne z ilustracjami i quizem na końcu"
          />
          <FeatureItem
            icon={<Brain className="w-5 h-5" />}
            title="Quizy"
            description="Interaktywne testy wiedzy z wyjaśnieniami odpowiedzi"
          />
          <FeatureItem
            icon={<Search className="w-5 h-5" />}
            title="Biblioteka NASA"
            description="Wyszukiwarka milionów zdjęć i filmów z archiwum NASA"
          />
          <FeatureItem
            icon={<BarChart3 className="w-5 h-5" />}
            title="Śledzenie postępów"
            description="Panel statystyk, osiągnięć i historii aktywności"
          />
        </div>
      </Card>

      {/* Tech stack */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-6">
          Stack technologiczny
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TechItem
            icon={<Code className="w-5 h-5" />}
            title="Frontend"
            items={['Next.js 14 (App Router)', 'React 18', 'TypeScript', 'TailwindCSS']}
          />
          <TechItem
            icon={<Database className="w-5 h-5" />}
            title="Dane"
            items={['NASA APOD API', 'NASA Images API', 'LocalStorage', 'Zod']}
          />
          <TechItem
            icon={<Palette className="w-5 h-5" />}
            title="UI/UX"
            items={['Lucide Icons', 'Framer Motion', 'Custom Design System', 'Responsive']}
          />
        </div>
      </Card>

      {/* Architecture */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4">
          Architektura
        </CardTitle>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
          <p>
            Aplikacja oparta jest na architekturze <strong>feature-based modularnej</strong>,
            gdzie każda domena (APOD, lekcje, quizy, biblioteka, postęp) ma własny folder
            z typami, serwisami i komponentami.
          </p>
          <ul className="text-gray-400 space-y-1 list-disc list-inside">
            <li><code>app/</code> - Next.js App Router, strony i layouty</li>
            <li><code>components/ui/</code> - Reusable UI components (design system)</li>
            <li><code>features/</code> - Moduły domenowe z logiką biznesową</li>
            <li><code>hooks/</code> - Custom React hooks</li>
            <li><code>lib/</code> - Utilities i helpery</li>
            <li><code>data/</code> - Statyczne dane (lekcje, quizy)</li>
          </ul>
        </div>
      </Card>

      {/* Data sources */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4">
          Źródła danych
        </CardTitle>
        <div className="space-y-3">
          <DataSource
            name="NASA APOD API"
            description="Astronomy Picture of the Day - codzienne zdjęcia astronomiczne"
            url="https://api.nasa.gov/"
          />
          <DataSource
            name="NASA Images API"
            description="Ogromna biblioteka zdjęć i filmów z misji NASA"
            url="https://images.nasa.gov/"
          />
        </div>
      </Card>

      {/* Footer note */}
      <div className="text-center text-gray-500 text-sm">
        <p>
          Projekt wykonany jako praca inżynierska • {new Date().getFullYear()}
        </p>
        <p className="mt-1">
          Dane kosmiczne pochodzą z oficjalnych API NASA i są udostępniane publicznie.
        </p>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border">
      <div className="p-2 rounded-lg bg-accent-cyan/20 text-accent-cyan h-fit">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function TechItem({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="p-4 rounded-lg bg-cosmos-dark/50 border border-cosmos-border">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-accent-purple/20 text-accent-purple">
          {icon}
        </div>
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-400">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DataSource({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border hover:border-accent-cyan/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-white">{name}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500" />
      </div>
    </a>
  );
}
