'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { PLANETS, PLANET_ORDER, getPlanetIndex } from '../planetarium.data';
import type { PlanetInfo } from '../planetarium.types';

interface PlanetSelectorProps {
  currentPlanet: PlanetInfo;
  visitedPlanets?: string[];
}

export function PlanetSelector({ currentPlanet, visitedPlanets = [] }: PlanetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentIndex = getPlanetIndex(currentPlanet.id);

  const prevPlanet = currentIndex > 0 ? PLANETS[currentIndex - 1] : null;
  const nextPlanet = currentIndex < PLANETS.length - 1 ? PLANETS[currentIndex + 1] : null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      {/* Quick navigation arrows */}
      <div className="flex items-center gap-2 mb-2 justify-center">
        {prevPlanet && (
          <Link
            href={`/planetarium/${prevPlanet.id}`}
            className="px-3 py-1.5 text-xs bg-planetarium-panel border border-planetarium-border rounded-lg hover:border-planetarium-glow transition-colors flex items-center gap-1 text-gray-300 hover:text-white"
          >
            <ChevronUp className="w-3 h-3 rotate-[-90deg]" />
            {prevPlanet.namePL}
          </Link>
        )}
        {nextPlanet && (
          <Link
            href={`/planetarium/${nextPlanet.id}`}
            className="px-3 py-1.5 text-xs bg-planetarium-panel border border-planetarium-border rounded-lg hover:border-planetarium-glow transition-colors flex items-center gap-1 text-gray-300 hover:text-white"
          >
            {nextPlanet.namePL}
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
          </Link>
        )}
      </div>

      {/* Main selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'flex items-center gap-3 px-4 py-2 bg-planetarium-panel border rounded-lg transition-all',
            isOpen ? 'border-planetarium-glow' : 'border-planetarium-border hover:border-planetarium-glow/50'
          )}
        >
          <div
            className="w-6 h-6 rounded-full shadow-lg"
            style={{ backgroundColor: currentPlanet.color }}
          />
          <div className="text-left">
            <div className="text-sm font-medium text-white">{currentPlanet.namePL}</div>
            <div className="text-xs text-gray-400">
              {getPlanetIndex(currentPlanet.id) + 1} / {PLANETS.length}
            </div>
          </div>
          <ChevronDown
            className={clsx(
              'w-4 h-4 text-gray-400 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-0 right-0 mb-2 bg-planetarium-panel border border-planetarium-border rounded-lg overflow-hidden shadow-xl"
            >
              {PLANET_ORDER.map((planetId) => {
                const planet = PLANETS.find((p) => p.id === planetId);
                if (!planet) return null;

                const isCurrent = planet.id === currentPlanet.id;
                const isVisited = visitedPlanets.includes(planet.id);

                return (
                  <Link
                    key={planet.id}
                    href={`/planetarium/${planet.id}`}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 px-4 py-2.5 transition-colors',
                      isCurrent
                        ? 'bg-planetarium-glow/20'
                        : 'hover:bg-white/5'
                    )}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                    <div className="flex-1">
                      <span
                        className={clsx(
                          'text-sm',
                          isCurrent ? 'text-planetarium-glow font-medium' : 'text-gray-300'
                        )}
                      >
                        {planet.namePL}
                      </span>
                    </div>
                    {isVisited && !isCurrent && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                    {isCurrent && (
                      <span className="text-xs text-planetarium-glow">Aktywna</span>
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="flex gap-1 mt-2 justify-center">
        {PLANET_ORDER.map((planetId) => {
          const isCurrent = planetId === currentPlanet.id;
          const isVisited = visitedPlanets.includes(planetId);
          return (
            <div
              key={planetId}
              className={clsx(
                'w-2 h-2 rounded-full transition-all',
                isCurrent
                  ? 'bg-planetarium-glow scale-125'
                  : isVisited
                  ? 'bg-planetarium-accent/50'
                  : 'bg-planetarium-border'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
