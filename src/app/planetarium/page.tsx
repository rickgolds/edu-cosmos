'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { PLANETS, PLANET_ORDER } from '@/features/planetarium';
import { useProgress } from '@/hooks/useProgress';
import { BADGES, BADGE_LABELS } from '@/lib/constants';

export default function PlanetariumPage() {
  const { progress, stats, recordActivity } = useProgress();
  const hasRecordedActivity = useRef(false);

  // Record activity on mount - only once
  useEffect(() => {
    if (!hasRecordedActivity.current) {
      hasRecordedActivity.current = true;
      recordActivity();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const visitedPlanets = progress.planetariumVisits?.map((v) => v.planetId) || [];
  const allPlanetsVisited = visitedPlanets.length === PLANETS.length;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            <span className="text-planetarium-glow">3D</span> Planetarium
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Eksploruj planety Układu Słonecznego w interaktywnym widoku 3D.
            Obracaj, przybliżaj i poznawaj fascynujące fakty o każdej planecie.
          </p>
        </motion.div>

        {/* Progress stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          <StatCard
            label="Odwiedzone planety"
            value={`${stats.planetsVisited} / ${PLANETS.length}`}
          />
          <StatCard
            label="Czas eksploracji"
            value={`${stats.planetariumTotalMinutes} min`}
          />
          <StatCard
            label="Postęp"
            value={`${Math.round((stats.planetsVisited / PLANETS.length) * 100)}%`}
          />
          <StatCard
            label="Status"
            value={allPlanetsVisited ? 'Grand Tour!' : 'W trakcie'}
            highlight={allPlanetsVisited}
          />
        </motion.div>

        {/* Badges section */}
        {(progress.badges?.includes(BADGES.PLANET_EXPLORER) ||
          progress.badges?.includes(BADGES.GRAND_TOUR) ||
          progress.badges?.includes(BADGES.STARGAZER)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Zdobyte odznaki
            </h2>
            <div className="flex flex-wrap gap-3">
              {[BADGES.PLANET_EXPLORER, BADGES.GRAND_TOUR, BADGES.STARGAZER].map(
                (badge) =>
                  progress.badges?.includes(badge) && (
                    <div
                      key={badge}
                      className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                    >
                      <span className="text-sm font-medium text-yellow-500">
                        {BADGE_LABELS[badge].name}
                      </span>
                    </div>
                  )
              )}
            </div>
          </motion.div>
        )}

        {/* Planets grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-6">
            Wybierz planetę
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANET_ORDER.map((planetId, index) => {
              const planet = PLANETS.find((p) => p.id === planetId);
              if (!planet) return null;

              const isVisited = visitedPlanets.includes(planet.id);

              return (
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={`/planetarium/${planet.id}`}
                    className={clsx(
                      'group block p-6 rounded-xl border transition-all duration-300',
                      'bg-planetarium-panel hover:bg-planetarium-panel/80',
                      isVisited
                        ? 'border-planetarium-accent/30 hover:border-planetarium-accent'
                        : 'border-planetarium-border hover:border-planetarium-glow'
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-full shadow-lg transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: planet.color,
                          boxShadow: `0 0 20px ${planet.color}40`,
                        }}
                      />
                      {isVisited && (
                        <div className="flex items-center gap-1 text-planetarium-accent">
                          <Check className="w-4 h-4" />
                          <span className="text-xs">Odwiedzona</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-planetarium-glow transition-colors">
                      {planet.namePL}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{planet.subtitle}</p>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{planet.moons} księżyc(ów)</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-planetarium-glow" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 bg-planetarium-panel border border-planetarium-border rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Jak korzystać</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-gray-400">
            <div>
              <div className="text-planetarium-glow font-medium mb-1">Obracanie</div>
              <p>Przeciągnij myszą lub palcem, aby obrócić planetę</p>
            </div>
            <div>
              <div className="text-planetarium-glow font-medium mb-1">Zoom</div>
              <p>Użyj scrolla myszy lub gestu pinch, aby przybliżać/oddalać</p>
            </div>
            <div>
              <div className="text-planetarium-glow font-medium mb-1">Informacje</div>
              <p>Kliknij panel po prawej, aby zobaczyć szczegóły planety</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border',
        highlight
          ? 'bg-planetarium-accent/10 border-planetarium-accent/30'
          : 'bg-planetarium-panel border-planetarium-border'
      )}
    >
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div
        className={clsx(
          'text-lg font-bold',
          highlight ? 'text-planetarium-accent' : 'text-white'
        )}
      >
        {value}
      </div>
    </div>
  );
}
