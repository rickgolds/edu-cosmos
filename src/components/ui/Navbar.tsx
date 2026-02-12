'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Rocket, BookOpen, Brain, Search, BarChart3, Info, Orbit, FlaskConical, Globe2, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Start', icon: Rocket },
  { href: '/apod', label: 'Kosmos dziś', icon: Sparkles },
  { href: '/lessons', label: 'Lekcje', icon: BookOpen },
  { href: '/quizzes', label: 'Quizy', icon: Brain },
  { href: '/asteroid-watch', label: 'Asteroidy', icon: Orbit },
  { href: '/labs', label: 'Laboratoria', icon: FlaskConical },
  { href: '/library', label: 'Biblioteka', icon: Search },
  { href: '/progress', label: 'Postęp', icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isPlanetariumActive = pathname.startsWith('/planetarium');

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cosmos-darker/80 backdrop-blur-md" />
      {/* Gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="CosmosEdu - Strona główna"
          >
            <div className="relative">
              <Rocket className="w-6 h-6 text-accent-cyan transition-transform duration-300 group-hover:-rotate-12" />
              <div className="absolute inset-0 bg-accent-cyan/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-display font-bold text-gradient">CosmosEdu</span>
          </Link>

          {/* Desktop Navigation — center */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'text-accent-cyan'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Icon className={clsx(
                      'w-3.5 h-3.5 transition-colors duration-200',
                      isActive ? 'text-accent-cyan' : 'text-gray-500 group-hover:text-gray-300'
                    )} />
                    {link.label}
                  </span>
                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-cyan rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right section: Planetarium CTA + About */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/planetarium"
              className={clsx(
                'nav-planetarium-btn relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
                isPlanetariumActive
                  ? 'bg-accent-cyan/20 text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                  : 'text-accent-cyan border border-accent-cyan/30 bg-accent-cyan/5 hover:bg-accent-cyan/10 hover:border-accent-cyan/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]'
              )}
            >
              <Globe2 className="w-4 h-4" />
              Planetarium
            </Link>

            <div className="w-px h-6 bg-cosmos-border" />

            <Link
              href="/about"
              className={clsx(
                'p-2 rounded-lg transition-all duration-200',
                pathname === '/about'
                  ? 'bg-accent-purple/20 text-accent-purple'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              )}
              aria-label="O aplikacji"
            >
              <Info className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Menu nawigacji"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-cosmos-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {/* Planetarium CTA — prominent at top */}
              <Link
                href="/planetarium"
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'nav-planetarium-btn flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all mb-2',
                  isPlanetariumActive
                    ? 'bg-accent-cyan/20 text-accent-cyan shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                    : 'text-accent-cyan border border-accent-cyan/30 bg-accent-cyan/5'
                )}
              >
                <Globe2 className="w-5 h-5" />
                Planetarium
              </Link>

              <div className="h-px bg-cosmos-border/30 mx-2 mb-1" />

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all',
                      isActive
                        ? 'bg-accent-cyan/10 text-accent-cyan'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className={clsx('w-5 h-5', isActive ? 'text-accent-cyan' : 'text-gray-500')} />
                    {link.label}
                  </Link>
                );
              })}

              <div className="h-px bg-cosmos-border/30 mx-2 my-1" />

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all',
                  pathname === '/about'
                    ? 'bg-accent-purple/10 text-accent-purple'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Info className="w-5 h-5" />
                O aplikacji
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
