import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credits | 3D Planetarium | CosmosEdu',
  description: 'Źródła i autorzy zasobów używanych w 3D Planetarium',
};

const TEXTURE_SOURCES = [
  {
    name: 'NASA Visible Earth',
    url: 'https://visibleearth.nasa.gov',
    license: 'Public Domain',
    description: 'Wysokiej jakości zdjęcia satelitarne Ziemi i innych planet',
    assets: ['Tekstury Ziemi', 'Mapy normalne'],
  },
  {
    name: 'Solar System Scope',
    url: 'https://www.solarsystemscope.com/textures/',
    license: 'CC BY 4.0',
    description:
      'Profesjonalne tekstury planet, księżyców i innych ciał niebieskich',
    assets: [
      'Tekstury wszystkich planet',
      'Pierścienie Saturna',
      'Tekstury księżyców',
    ],
  },
  {
    name: 'Planet Pixel Emporium',
    url: 'http://planetpixelemporium.com',
    license: 'Free for non-commercial use',
    description: 'Realistyczne tekstury planet do projektów edukacyjnych',
    assets: ['Alternatywne tekstury planet'],
  },
];

const LIBRARIES = [
  {
    name: 'Three.js',
    url: 'https://threejs.org',
    description: 'Biblioteka JavaScript do grafiki 3D w przeglądarce',
  },
  {
    name: 'React Three Fiber',
    url: 'https://docs.pmnd.rs/react-three-fiber',
    description: 'React renderer dla Three.js',
  },
  {
    name: 'Drei',
    url: 'https://github.com/pmndrs/drei',
    description: 'Pomocnicze komponenty dla React Three Fiber',
  },
  {
    name: 'Framer Motion',
    url: 'https://www.framer.com/motion/',
    description: 'Animacje UI w React',
  },
];

const DATA_SOURCES = [
  {
    name: 'NASA Solar System Exploration',
    url: 'https://solarsystem.nasa.gov',
    description: 'Oficjalne dane o planetach i misjach NASA',
  },
  {
    name: 'Wikipedia',
    url: 'https://en.wikipedia.org',
    description: 'Dodatkowe informacje i ciekawostki',
  },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/planetarium"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Wróć do Planetarium
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Podziękowania i źródła
          </h1>
          <p className="text-gray-400">
            3D Planetarium korzysta z wielu wspaniałych zasobów open source i
            publicznych danych. Poniżej znajduje się pełna lista źródeł i
            autorów.
          </p>
        </div>

        {/* Texture sources */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-planetarium-glow/20 flex items-center justify-center text-planetarium-glow text-sm">
              1
            </span>
            Tekstury planet
          </h2>
          <div className="space-y-4">
            {TEXTURE_SOURCES.map((source) => (
              <div
                key={source.name}
                className="p-5 bg-planetarium-panel border border-planetarium-border rounded-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {source.name}
                    </h3>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-planetarium-glow hover:underline flex items-center gap-1"
                    >
                      {source.url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                    {source.license}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{source.description}</p>
                <div className="flex flex-wrap gap-2">
                  {source.assets.map((asset) => (
                    <span
                      key={asset}
                      className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Libraries */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-planetarium-glow/20 flex items-center justify-center text-planetarium-glow text-sm">
              2
            </span>
            Biblioteki i narzędzia
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {LIBRARIES.map((lib) => (
              <a
                key={lib.name}
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-planetarium-panel border border-planetarium-border rounded-xl hover:border-planetarium-glow transition-colors group"
              >
                <h3 className="text-base font-medium text-white group-hover:text-planetarium-glow transition-colors flex items-center gap-2">
                  {lib.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-400 mt-1">{lib.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-planetarium-glow/20 flex items-center justify-center text-planetarium-glow text-sm">
              3
            </span>
            Źródła danych
          </h2>
          <div className="space-y-4">
            {DATA_SOURCES.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-planetarium-panel border border-planetarium-border rounded-xl hover:border-planetarium-glow transition-colors group"
              >
                <div>
                  <h3 className="text-base font-medium text-white group-hover:text-planetarium-glow transition-colors">
                    {source.name}
                  </h3>
                  <p className="text-sm text-gray-400">{source.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-planetarium-glow transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Note about textures */}
        <section className="p-6 bg-planetarium-warning/10 border border-planetarium-warning/30 rounded-xl mb-12">
          <h3 className="text-base font-medium text-planetarium-warning mb-2">
            Uwaga dotycząca tekstur
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Tekstury planet nie są dołączone do repozytorium ze względu na rozmiar
            plików i licencje. Aby uzyskać pełne doświadczenie wizualne:
          </p>
          <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
            <li>
              Pobierz tekstury z jednego z powyższych źródeł (zalecamy Solar System
              Scope dla kompletnego zestawu)
            </li>
            <li>
              Umieść pliki w katalogu{' '}
              <code className="px-1.5 py-0.5 bg-white/10 rounded text-planetarium-glow">
                public/planetarium/textures/
              </code>
            </li>
            <li>
              Użyj nazewnictwa zgodnego z konfiguracją:{' '}
              <code className="px-1.5 py-0.5 bg-white/10 rounded text-planetarium-glow">
                {'{planeta}_texture.jpg'}
              </code>
            </li>
          </ol>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-8 border-t border-planetarium-border">
          <p className="flex items-center justify-center gap-2">
            Zbudowane z <Heart className="w-4 h-4 text-red-500" /> dla CosmosEdu
          </p>
          <p className="mt-2">
            Jeśli korzystasz z tekstur komercyjnie, sprawdź indywidualne licencje
            każdego źródła.
          </p>
        </footer>
      </div>
    </div>
  );
}
