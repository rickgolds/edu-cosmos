'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Globe } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

/**
 * Animated back button for returning to Solar System overview
 */
export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      onClick={onClick}
      className="absolute top-4 left-4 z-20 group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all"
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      <Globe className="w-4 h-4" />
      <span className="text-sm tracking-wide">Solar System</span>
    </motion.button>
  );
}
