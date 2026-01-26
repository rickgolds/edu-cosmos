'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { TransitionDirection } from '../state/usePlanetariumState';

interface TransitionHUDProps {
  visible: boolean;
  direction: TransitionDirection | null;
  planetName: string;
  progress: number;
}

/**
 * HUD overlay during camera transitions
 * Shows "Approaching: Mars" or "Returning to Solar System"
 */
export function TransitionHUD({
  visible,
  direction,
  planetName,
  progress,
}: TransitionHUDProps) {
  const message = direction === 'to-planet'
    ? `Zbliżanie do: ${planetName}`
    : 'Powrót do Układu Słonecznego';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
        >
          {/* Subtle vignette during transition */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
            }}
          />

          {/* Center HUD element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center"
          >
            {/* Status text */}
            <div className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <p className="text-sm tracking-[0.15em] text-cyan-400 uppercase">
                {message}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Speed lines effect (CSS) */}
            {direction === 'to-planet' && (
              <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: '-10%',
                      right: '-10%',
                      transform: `rotate(${-5 + i * 1.5}deg)`,
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Corner HUD elements */}
          <div className="absolute bottom-8 left-8 text-xs text-gray-500 tracking-wider">
            <span className="text-cyan-500">ESC</span> aby anulować
          </div>

          <div className="absolute bottom-8 right-8 text-xs text-gray-500 tracking-wider font-mono">
            {Math.round(progress * 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
