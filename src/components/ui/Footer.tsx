import Link from 'next/link';
import { Rocket, Github, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-cosmos-border bg-cosmos-darker/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-display font-bold mb-4">
              <Rocket className="w-6 h-6 text-accent-cyan" />
              <span className="text-gradient">CosmosEdu</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              Interaktywna aplikacja edukacyjna o kosmosie. Poznawaj tajemnice Wszechświata
              poprzez codzienne zdjęcia NASA, lekcje, quizy i bogatą bibliotekę zasobów.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Nawigacja</h3>
            <ul className="space-y-2">
              {[
                { href: '/apod', label: 'Kosmos dziś' },
                { href: '/lessons', label: 'Lekcje' },
                { href: '/quizzes', label: 'Quizy' },
                { href: '/library', label: 'Biblioteka' },
                { href: '/progress', label: 'Twój postęp' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Źródła danych</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://api.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-cyan transition-colors text-sm inline-flex items-center gap-1"
                >
                  NASA API
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://apod.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-cyan transition-colors text-sm inline-flex items-center gap-1"
                >
                  NASA APOD
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://images.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-cyan transition-colors text-sm inline-flex items-center gap-1"
                >
                  NASA Images
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cosmos-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CosmosEdu &bull; <span className="text-white">Gracjan Zalewski</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Praca inżynierska &bull; Politechnika Koszalińska &bull; Wydział Elektroniki i Informatyki
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                O projekcie
              </Link>
              <a
                href="https://github.com/rickgolds/edu-cosmos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
