import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function PlanetNotFound() {
  return (
    <div className="min-h-[calc(100vh-48px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-planetarium-warning/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-planetarium-warning" />
        </div>
        <h1 className="text-2xl font-display font-bold text-white mb-3">
          Planeta nie znaleziona
        </h1>
        <p className="text-gray-400 mb-8">
          Przepraszamy, ale ta planeta nie istnieje w naszym Planetarium.
          Sprawdź czy wpisałeś poprawną nazwę lub wybierz planetę z listy.
        </p>
        <Link
          href="/planetarium"
          className="inline-flex items-center gap-2 px-6 py-3 bg-planetarium-glow/20 border border-planetarium-glow text-planetarium-glow rounded-lg hover:bg-planetarium-glow/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Wróć do listy planet
        </Link>
      </div>
    </div>
  );
}
