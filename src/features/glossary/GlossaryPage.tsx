'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Plus, Check, Search, Tag } from 'lucide-react';
import { Card, CardTitle, Badge, SearchInput, Button, EmptyState } from '@/components/ui';
import { useProgress, useDebounce } from '@/hooks';
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  searchTerms,
  type GlossaryTerm,
} from './glossary.data';

type CategoryKey = keyof typeof GLOSSARY_CATEGORIES;

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [showStudyListOnly, setShowStudyListOnly] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { isTermInStudyList, toggleGlossaryTerm, progress } = useProgress();

  const filteredTerms = useMemo(() => {
    let terms: GlossaryTerm[] = GLOSSARY_TERMS;

    // Filter by search query
    if (debouncedQuery) {
      terms = searchTerms(debouncedQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      terms = terms.filter((term) => term.category === selectedCategory);
    }

    // Filter by study list
    if (showStudyListOnly) {
      terms = terms.filter((term) => (progress.glossaryStudyList ?? []).includes(term.id));
    }

    return terms;
  }, [debouncedQuery, selectedCategory, showStudyListOnly, progress.glossaryStudyList]);

  const categories = Object.entries(GLOSSARY_CATEGORIES) as [CategoryKey, string][];

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj pojęć..."
              aria-label="Szukaj w słowniczku"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={showStudyListOnly ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setShowStudyListOnly(!showStudyListOnly)}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Do nauki ({progress.glossaryStudyList?.length ?? 0})
            </Button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            Wszystkie
          </Button>
          {categories.map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Znaleziono <span className="text-white font-medium">{filteredTerms.length}</span> pojęć
        </p>
      </div>

      {/* Terms grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              inStudyList={isTermInStudyList(term.id)}
              onToggleStudyList={() => toggleGlossaryTerm(term.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="Brak wyników"
          description={
            showStudyListOnly
              ? 'Nie masz jeszcze żadnych pojęć do nauki. Dodaj je klikając + przy pojęciu.'
              : 'Nie znaleziono pojęć pasujących do wyszukiwania.'
          }
          action={
            showStudyListOnly
              ? {
                  label: 'Pokaż wszystkie',
                  onClick: () => setShowStudyListOnly(false),
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

interface TermCardProps {
  term: GlossaryTerm;
  inStudyList: boolean;
  onToggleStudyList: () => void;
}

function TermCard({ term, inStudyList, onToggleStudyList }: TermCardProps) {
  return (
    <Card
      id={term.id}
      padding="md"
      variant="interactive"
      className="scroll-mt-20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display font-semibold text-white capitalize">
              {term.term}
            </h3>
            {term.termEn && term.termEn.toLowerCase() !== term.term.toLowerCase() && (
              <span className="text-sm text-gray-500">({term.termEn})</span>
            )}
          </div>

          <p className="text-sm text-gray-300 mb-3">{term.definition}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="purple" size="sm">
              <Tag className="w-3 h-3 mr-1" />
              {GLOSSARY_CATEGORIES[term.category]}
            </Badge>
            {term.related && term.related.length > 0 && (
              <span className="text-xs text-gray-500">
                Powiązane: {term.related.slice(0, 3).join(', ')}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleStudyList}
          className={`p-2 rounded-lg transition-all ${
            inStudyList
              ? 'bg-success/20 text-success hover:bg-success/30'
              : 'bg-cosmos-border text-gray-400 hover:text-accent-cyan hover:bg-accent-cyan/10'
          }`}
          title={inStudyList ? 'Usuń z listy nauki' : 'Dodaj do nauki'}
        >
          {inStudyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
    </Card>
  );
}
