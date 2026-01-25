'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Rocket, BookOpen, Brain, Search, BarChart3, Info, Orbit, FlaskConical, Globe2 } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Start', icon: Rocket },
  { href: '/apod', label: 'Kosmos dziś', icon: null },
  { href: '/lessons', label: 'Lekcje', icon: BookOpen },
  { href: '/quizzes', label: 'Quizy', icon: Brain },
  { href: '/asteroid-watch', label: 'Asteroidy', icon: Orbit },
  { href: '/planetarium', label: 'Planetarium', icon: Globe2 },
  { href: '/labs', label: 'Laboratoria', icon: FlaskConical },
  { href: '/library', label: 'Biblioteka', icon: Search },
  { href: '/progress', label: 'Postęp', icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-cosmos-darker/80 backdrop-blur-md border-b border-cosmos-border" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-display font-bold"
            aria-label="CosmosEdu - Strona główna"
          >
            <Rocket className="w-6 h-6 text-accent-cyan" />
            <span className="text-gradient">CosmosEdu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-accent-cyan/20 text-accent-cyan'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/about"
              className={clsx(
                'p-2 rounded-lg transition-all duration-200',
                pathname === '/about'
                  ? 'bg-accent-purple/20 text-accent-purple'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
              aria-label="O aplikacji"
            >
              <Info className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Menu nawigacji"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-cosmos-border animate-fade-in">
            <div className="flex flex-col gap-1">
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
                        ? 'bg-accent-cyan/20 text-accent-cyan'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all',
                  pathname === '/about'
                    ? 'bg-accent-purple/20 text-accent-purple'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
