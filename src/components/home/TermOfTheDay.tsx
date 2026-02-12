'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Badge, Button, Card, Skeleton } from '@/components/ui';
import { GLOSSARY_TERMS, type GlossaryTerm } from '@/features/glossary';

const CATEGORY_COLORS: Record<string, 'cyan' | 'purple' | 'default' | 'success' | 'warning'> = {
  astronomy: 'cyan',
  physics: 'purple',
  'space-exploration': 'success',
  'celestial-bodies': 'warning',
  instruments: 'default',
};

const CATEGORY_LABELS: Record<string, string> = {
  astronomy: 'Astronomia',
  physics: 'Fizyka',
  'space-exploration': 'Eksploracja',
  'celestial-bodies': 'Ciała niebieskie',
  instruments: 'Instrumenty',
};

export function TermOfTheDay() {
  const [term, setTerm] = useState<GlossaryTerm | null>(null);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % GLOSSARY_TERMS.length;
    setTerm(GLOSSARY_TERMS[index]);
  }, []);

  if (!term) {
    return (
      <Card padding="lg">
        <Skeleton variant="text" className="h-5 w-32 mb-2" />
        <Skeleton variant="text" className="h-8 w-48 mb-3" />
        <Skeleton variant="text" className="h-16 w-full" />
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-accent-purple/10">
          <BookOpen className="w-8 h-8 text-accent-purple" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400 mb-1">Termin dnia</p>
          <h3 className="text-lg font-display font-bold text-white mb-1">
            {term.term}
          </h3>
          {term.termEn && (
            <p className="text-xs text-gray-500 mb-2 italic">{term.termEn}</p>
          )}
        </div>
      </div>

      <Badge
        variant={CATEGORY_COLORS[term.category] || 'default'}
        className="mt-3"
      >
        {CATEGORY_LABELS[term.category] || term.category}
      </Badge>

      <p className="text-sm text-gray-400 mt-3 line-clamp-3">
        {term.definition}
      </p>

      <Link href="/glossary" className="mt-4 block">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Słowniczek pojęć
        </Button>
      </Link>
    </Card>
  );
}
