'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    const rand = seededRandom(7919);
    const starCount = Math.min(400, Math.floor((width * height) / 3500));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // 75% of stars twinkle (up from 35%)
      const isTwinkling = rand() < 0.75;
      const hueRoll = rand();
      let hue = 0;
      if (hueRoll < 0.08) hue = 200;
      else if (hueRoll < 0.14) hue = 260;
      else if (hueRoll < 0.17) hue = 30;

      stars.push({
        x: rand() * width,
        y: rand() * height,
        radius: 0.4 + rand() * 2,
        baseOpacity: 0.15 + rand() * 0.75,
        twinkle: isTwinkling,
        // Much faster twinkling: range 1.5 - 6.0 (was 0.3 - 2.1)
        twinkleSpeed: 1.5 + rand() * 4.5,
        twinklePhase: rand() * Math.PI * 2,
        hue,
      });
    }

    function draw(time: number) {
      const t = time / 1000;
      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        let opacity = star.baseOpacity;
        if (star.twinkle) {
          // Sharper fade: nearly off (0.03) to fully on — more dramatic flicker
          const wave = (Math.sin(t * star.twinkleSpeed + star.twinklePhase) + 1) / 2;
          opacity = star.baseOpacity * (0.03 + 0.97 * wave);
        }

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (star.hue === 0) {
          ctx!.fillStyle = `rgba(255,255,255,${opacity})`;
        } else {
          ctx!.fillStyle = `hsla(${star.hue},70%,80%,${opacity})`;
        }
        ctx!.fill();

        // Glow for larger stars
        if (star.radius > 1.4) {
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          const glowOpacity = opacity * 0.1;
          if (star.hue === 0) {
            ctx!.fillStyle = `rgba(200,220,255,${glowOpacity})`;
          } else {
            ctx!.fillStyle = `hsla(${star.hue},60%,75%,${glowOpacity})`;
          }
          ctx!.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      const oldW = width;
      const oldH = height;
      resize();
      for (const star of stars) {
        star.x = (star.x / oldW) * width;
        star.y = (star.y / oldH) * height;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(10,15,40,1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(30,10,50,0.6) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 10% 90%, rgba(5,20,40,0.5) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 50%, #050510 0%, #080818 40%, #050510 100%)
          `,
        }}
      />

      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Nebula orbs */}
      <div className="cosmic-nebula cosmic-nebula-1" />
      <div className="cosmic-nebula cosmic-nebula-2" />
      <div className="cosmic-nebula cosmic-nebula-3" />
      <div className="cosmic-nebula cosmic-nebula-4" />
      <div className="cosmic-nebula cosmic-nebula-5" />
      <div className="cosmic-nebula cosmic-nebula-6" />

      {/* Shooting stars — 8 total */}
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />
      <div className="shooting-star shooting-star-4" />
      <div className="shooting-star shooting-star-5" />
      <div className="shooting-star shooting-star-6" />
      <div className="shooting-star shooting-star-7" />
      <div className="shooting-star shooting-star-8" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(3,3,10,0.5) 100%)',
        }}
      />
    </div>
  );
}
