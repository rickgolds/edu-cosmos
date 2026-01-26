'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanetariumIntroProps {
  visible: boolean;
  onComplete: () => void;
}

/**
 * Intro screen for the Planetarium
 * Premium loading/splash screen with animated text
 */
export function PlanetariumIntro({ visible, onComplete }: PlanetariumIntroProps) {
  useEffect(() => {
    if (!visible) return;

    // Complete after animation duration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(0, 20, 40, 0.9) 0%, rgba(3, 3, 8, 1) 70%),
              url('/planetarium/textures/stars_background.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative text-center">
            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white mb-4"
              style={{
                textShadow: '0 0 60px rgba(0, 212, 255, 0.3)',
              }}
            >
              PLANETARIUM
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm md:text-base tracking-[0.2em] text-gray-400 uppercase"
            >
              Exploring the Solar System
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            />

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
