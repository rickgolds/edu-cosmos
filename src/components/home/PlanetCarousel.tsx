'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { PLANETS } from '@/features/planetarium';

export function PlanetCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="py-16 border-t border-cosmos-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Planetarium 3D
            </h2>
            <p className="text-gray-400">
              Poznaj planety Układu Słonecznego
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-lg bg-cosmos-card border border-cosmos-border hover:border-accent-cyan/50 transition-colors"
              aria-label="Przewiń w lewo"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-lg bg-cosmos-card border border-cosmos-border hover:border-accent-cyan/50 transition-colors"
              aria-label="Przewiń w prawo"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="carousel-fade-edges">
            <div
              ref={scrollRef}
              className="planet-carousel flex gap-4 overflow-x-auto pb-4"
            >
              {PLANETS.map((planet) => (
                <Link
                  key={planet.id}
                  href={`/planetarium/${planet.id}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-[240px] p-4 rounded-xl bg-cosmos-card/80 border border-cosmos-border hover:border-accent-cyan/50 transition-all hover:scale-[1.02]">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <Image
                        src={`/planetarium/textures/${planet.id}_texture.jpg`}
                        alt={planet.namePL}
                        width={96}
                        height={96}
                        className="rounded-full object-cover w-full h-full"
                      />
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: `0 0 20px ${planet.color}33, inset -8px -4px 16px rgba(0,0,0,0.5)`,
                        }}
                      />
                    </div>
                    <h3 className="text-center font-display font-bold text-white group-hover:text-accent-cyan transition-colors">
                      {planet.namePL}
                    </h3>
                    <p className="text-center text-xs text-gray-500 mt-1">
                      {planet.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/planetarium">
            <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Otwórz Planetarium
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
