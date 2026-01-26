'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import type { PlanetariumMode } from '../state/usePlanetariumState';

interface PlanetariumHeaderProps {
  visible: boolean;
  mode: PlanetariumMode;
  currentPlanetName?: string;
}

/**
 * Collapsible header for Planetarium
 * Shows breadcrumb navigation and home link
 */
export function PlanetariumHeader({
  visible,
  mode,
  currentPlanetName,
}: PlanetariumHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!visible) return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-black/30 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-6 py-3">
              {/* Left: Home link + Breadcrumbs */}
              <div className="flex items-center gap-3">
                {/* Home link */}
                <Link
                  href="/"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Home className="w-4 h-4" />
                </Link>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm">
                  <Link
                    href="/planetarium"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Układ Słoneczny
                  </Link>

                  {(mode === 'planet' || mode === 'transition') && currentPlanetName && (
                    <>
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                      <span className="text-white font-medium">
                        {currentPlanetName}
                      </span>
                    </>
                  )}
                </nav>
              </div>

              {/* Right: Mode indicator */}
              <div className="flex items-center gap-4">
                {mode === 'overview' && (
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <span className="text-xs text-cyan-400 tracking-wider uppercase">
                      Przegląd
                    </span>
                  </div>
                )}

                {mode === 'planet' && (
                  <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                    <span className="text-xs text-purple-400 tracking-wider uppercase">
                      Eksploracja
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom border gradient */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.header>
        )}
      </AnimatePresence>

      {/* Toggle button - always visible */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute ${isExpanded ? 'top-14' : 'top-2'} right-4 p-1.5 rounded-lg bg-black/50 border border-white/10 text-gray-400 hover:text-white hover:bg-black/70 transition-all`}
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
}
