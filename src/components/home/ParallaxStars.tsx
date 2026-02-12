'use client';

import { useEffect, useRef, useMemo } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

function generateStars(count: number, seed: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const hash = ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    const hash2 = ((seed * (i + 2) * 7919 + 12347) % 233280) / 233280;
    const hash3 = ((seed * (i + 3) * 3571 + 67891) % 233280) / 233280;
    const hash4 = ((seed * (i + 4) * 5381 + 23456) % 233280) / 233280;
    stars.push({
      x: hash * 100,
      y: hash2 * 100,
      size: 1 + hash3 * 2,
      opacity: 0.3 + hash4 * 0.7,
    });
  }
  return stars;
}

export function ParallaxStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const layer1Stars = useMemo(() => generateStars(40, 42), []);
  const layer2Stars = useMemo(() => generateStars(25, 137), []);
  const layer3Stars = useMemo(() => generateStars(15, 256), []);

  useEffect(() => {
    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (layer1Ref.current) {
          layer1Ref.current.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
        if (layer2Ref.current) {
          layer2Ref.current.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
        if (layer3Ref.current) {
          layer3Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const renderStars = (stars: Star[]) =>
    stars.map((star, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
        }}
      />
    ));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Star layers */}
      <div ref={layer1Ref} className="absolute inset-0 will-change-transform">
        {renderStars(layer1Stars)}
      </div>
      <div ref={layer2Ref} className="absolute inset-0 will-change-transform">
        {renderStars(layer2Stars)}
      </div>
      <div ref={layer3Ref} className="absolute inset-0 will-change-transform">
        {renderStars(layer3Stars)}
      </div>

      {/* Nebula orbs */}
      <div
        className="absolute w-64 h-64 rounded-full animate-float opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)',
          top: '10%',
          left: '5%',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full animate-pulse-slow opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          top: '60%',
          right: '10%',
        }}
      />
      <div
        className="absolute w-36 h-36 rounded-full animate-float opacity-[0.07] animation-delay-300"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
          bottom: '20%',
          left: '40%',
        }}
      />
    </div>
  );
}
