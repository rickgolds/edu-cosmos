import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kosmiczna paleta kolorów
        cosmos: {
          dark: '#0a0a1a',
          darker: '#050510',
          card: '#12122a',
          border: '#1e1e3f',
        },
        // Planetarium theme - mission control aesthetic
        planetarium: {
          bg: '#020208',
          panel: 'rgba(10, 20, 40, 0.85)',
          border: 'rgba(0, 180, 220, 0.3)',
          glow: '#00b4dc',
          accent: '#00ffcc',
          warning: '#ff6b35',
        },
        accent: {
          cyan: '#00d4ff',
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cosmos-gradient': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(18,18,42,0.8) 0%, rgba(10,10,26,0.9) 100%)',
        'glow-cyan': 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 30px rgba(0, 212, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        // Planetarium animations
        'scan-line': 'scanLine 3s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Planetarium keyframes
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 10px rgba(0, 180, 220, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(0, 180, 220, 0.6)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
