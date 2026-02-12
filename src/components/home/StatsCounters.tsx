'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { BookOpen, Brain, Search, FlaskConical, Globe2 } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  target: number;
  label: string;
  suffix?: string;
}

const STATS: StatItem[] = [
  { icon: <BookOpen className="w-6 h-6 text-accent-cyan" />, target: 15, label: 'Lekcji' },
  { icon: <Brain className="w-6 h-6 text-accent-purple" />, target: 4, label: 'Quizów' },
  { icon: <Search className="w-6 h-6 text-accent-pink" />, target: 62, label: 'Pojęć' },
  { icon: <FlaskConical className="w-6 h-6 text-accent-blue" />, target: 2, label: 'Laboratoriów' },
  { icon: <Globe2 className="w-6 h-6 text-accent-cyan" />, target: 10, label: 'Planet 3D' },
];

function useCountUp(target: number, isVisible: boolean, duration = 1500): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, target, duration]);

  return value;
}

function StatCounter({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const count = useCountUp(stat.target, isVisible);

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="p-3 rounded-xl bg-cosmos-card/80 border border-cosmos-border">
        {stat.icon}
      </div>
      <span className="text-3xl font-display font-bold text-white">
        {count}{stat.suffix || ''}
      </span>
      <span className="text-sm text-gray-400">{stat.label}</span>
    </div>
  );
}

export function StatsCounters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <section className="py-16 border-t border-cosmos-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            CosmosEdu w liczbach
          </h2>
          <p className="text-gray-400">
            Bogata baza wiedzy o kosmosie
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {STATS.map((stat, i) => (
            <StatCounter key={i} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
