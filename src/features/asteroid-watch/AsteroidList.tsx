'use client';

import { useState, useMemo } from 'react';
import { Filter, SortAsc, AlertTriangle } from 'lucide-react';
import { Button, Badge, EmptyState } from '@/components/ui';
import { AsteroidCard } from './AsteroidCard';
import { sortNeos, filterHazardousNeos } from './neows.service';
import { type NeoSummary, type NeoSortOption } from './neows.types';

interface AsteroidListProps {
  neos: NeoSummary[];
}

const sortOptions: { value: NeoSortOption; label: string }[] = [
  { value: 'date', label: 'Data podejścia' },
  { value: 'distance', label: 'Najbliższy dystans' },
  { value: 'diameter', label: 'Największa średnica' },
  { value: 'velocity', label: 'Najwyższa prędkość' },
];

export function AsteroidList({ neos }: AsteroidListProps) {
  const [sortBy, setSortBy] = useState<NeoSortOption>('date');
  const [onlyHazardous, setOnlyHazardous] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = filterHazardousNeos(neos, onlyHazardous);
    result = sortNeos(result, sortBy);
    return result;
  }, [neos, sortBy, onlyHazardous]);

  const hazardousCount = neos.filter((n) => n.isPotentiallyHazardous).length;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as NeoSortOption)}
            className="bg-cosmos-card border border-cosmos-border rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-cyan"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Hazardous filter */}
        <Button
          variant={onlyHazardous ? 'danger' : 'secondary'}
          size="sm"
          onClick={() => setOnlyHazardous(!onlyHazardous)}
          leftIcon={<AlertTriangle className="w-4 h-4" />}
        >
          Tylko niebezpieczne ({hazardousCount})
        </Button>

        {/* Count */}
        <Badge variant="cyan" className="ml-auto">
          {filteredAndSorted.length} obiektów
        </Badge>
      </div>

      {/* Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSorted.map((neo) => (
            <AsteroidCard key={neo.id} neo={neo} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="Brak asteroid"
          description={
            onlyHazardous
              ? 'Brak potencjalnie niebezpiecznych asteroid w tym okresie.'
              : 'Nie znaleziono asteroid w wybranym zakresie dat.'
          }
          action={
            onlyHazardous
              ? { label: 'Pokaż wszystkie', onClick: () => setOnlyHazardous(false) }
              : undefined
          }
        />
      )}
    </div>
  );
}
