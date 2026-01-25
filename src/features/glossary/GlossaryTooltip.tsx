'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Check } from 'lucide-react';
import { useProgress } from '@/hooks';
import type { GlossaryTerm } from './glossary.data';
import { getDefinitionPreview } from './glossary.utils';

interface GlossaryTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

export function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isTermInStudyList, toggleGlossaryTerm } = useProgress();
  const inStudyList = isTermInStudyList(term.id);

  return (
    <span className="relative inline">
      <button
        type="button"
        className="text-accent-cyan underline decoration-dotted decoration-accent-cyan/50 underline-offset-2 cursor-help hover:decoration-accent-cyan transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        aria-describedby={`tooltip-${term.id}`}
      >
        {children}
      </button>

      {isOpen && (
        <div
          id={`tooltip-${term.id}`}
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 rounded-lg bg-cosmos-card border border-cosmos-border shadow-lg animate-fade-in"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Arrow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
            <div className="border-8 border-transparent border-t-cosmos-border" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px border-8 border-transparent border-t-cosmos-card" />
          </div>

          {/* Content */}
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-accent-purple mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-white capitalize">{term.term}</span>
              {term.termEn && term.termEn.toLowerCase() !== term.term.toLowerCase() && (
                <span className="text-gray-500 text-xs ml-1">({term.termEn})</span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-3">
            {getDefinitionPreview(term.definition, 120)}
          </p>

          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/glossary#${term.id}`}
              className="text-xs text-accent-cyan hover:text-accent-cyan/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Zobacz w słowniczku →
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleGlossaryTerm(term.id);
              }}
              className={`p-1 rounded transition-colors ${
                inStudyList
                  ? 'text-success bg-success/20'
                  : 'text-gray-400 hover:text-accent-cyan hover:bg-accent-cyan/10'
              }`}
              title={inStudyList ? 'Usuń z listy nauki' : 'Dodaj do nauki'}
            >
              {inStudyList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

/**
 * Component to render text with highlighted glossary terms
 */
import { highlightTermsInText } from './glossary.utils';

interface HighlightedTextProps {
  text: string;
  className?: string;
}

export function HighlightedText({ text, className }: HighlightedTextProps) {
  const segments = highlightTermsInText(text);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.isHighlighted && segment.term) {
          return (
            <GlossaryTooltip key={index} term={segment.term}>
              {segment.text}
            </GlossaryTooltip>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
}
