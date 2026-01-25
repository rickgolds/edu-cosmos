import { Metadata } from 'next';
import { GlossaryPage } from '@/features/glossary';

export const metadata: Metadata = {
  title: 'Słowniczek pojęć',
  description: 'Słowniczek pojęć astronomicznych i kosmicznych. Definicje, wyjaśnienia i powiązane terminy.',
};

export default function GlossaryRoute() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Słowniczek pojęć
        </h1>
        <p className="text-gray-400">
          Poznaj kluczowe terminy astronomiczne i kosmiczne. Dodawaj pojęcia do listy nauki.
        </p>
      </div>

      <GlossaryPage />
    </div>
  );
}
