'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, Filter, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import { SearchInput, Button, Badge, Card, EmptyState, ErrorState, Skeleton } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { searchNasaLibrary, getSuggestedSearches } from './library.service';
import { LibraryGrid } from './LibraryGrid';
import type { LibraryItem, LibrarySearchResult } from './library.types';

type MediaFilter = 'all' | 'image' | 'video';

export function LibrarySearch() {
  const [query, setQuery] = useState('');
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
  const [results, setResults] = useState<LibrarySearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const performSearch = useCallback(async (searchQuery: string, filter: MediaFilter) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchNasaLibrary({
        query: searchQuery,
        mediaType: filter,
      });
      setResults(data);
    } catch (err) {
      setError('Nie udało się wyszukać zasobów. Spróbuj ponownie.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search when query or filter changes
  useEffect(() => {
    performSearch(debouncedQuery, mediaFilter);
  }, [debouncedQuery, mediaFilter, performSearch]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const suggestions = getSuggestedSearches();

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj zdjęć i filmów NASA..."
              aria-label="Szukaj w bibliotece NASA"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={mediaFilter === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMediaFilter('all')}
              leftIcon={<Filter className="w-4 h-4" />}
            >
              Wszystko
            </Button>
            <Button
              variant={mediaFilter === 'image' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMediaFilter('image')}
              leftIcon={<ImageIcon className="w-4 h-4" />}
            >
              Zdjęcia
            </Button>
            <Button
              variant={mediaFilter === 'video' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMediaFilter('video')}
              leftIcon={<Video className="w-4 h-4" />}
            >
              Filmy
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggestions (when no query) */}
      {!query && !results && (
        <div>
          <h3 className="text-sm text-gray-400 mb-3">Popularne wyszukiwania:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 rounded-full bg-cosmos-card border border-cosmos-border text-sm text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton height={180} className="w-full rounded-lg" />
              <Skeleton height={20} className="w-3/4" />
              <Skeleton height={16} className="w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <ErrorState
          message={error}
          onRetry={() => performSearch(debouncedQuery, mediaFilter)}
        />
      )}

      {/* Results */}
      {results && !isLoading && !error && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Znaleziono <span className="text-white font-medium">{results.totalHits}</span> wyników
              dla &quot;{debouncedQuery}&quot;
            </p>
          </div>

          {results.items.length > 0 ? (
            <LibraryGrid
              items={results.items}
              onItemClick={setSelectedItem}
            />
          ) : (
            <EmptyState
              icon="search"
              title="Brak wyników"
              description="Nie znaleziono zasobów pasujących do zapytania. Spróbuj innych słów kluczowych."
            />
          )}
        </>
      )}

      {/* Item detail modal */}
      {selectedItem && (
        <LibraryItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

// Simple modal for item details
function LibraryItemModal({ item, onClose }: { item: LibraryItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        padding="none"
        className="max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image/Video */}
        {item.thumbnailUrl && (
          <div className="relative aspect-video bg-cosmos-dark">
            {item.mediaType === 'video' ? (
              <video
                src={item.thumbnailUrl.replace('~thumb', '~orig').replace('.jpg', '.mp4')}
                controls
                className="w-full h-full"
                poster={item.thumbnailUrl}
              >
                Twoja przeglądarka nie obsługuje odtwarzania wideo.
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-xl font-display font-bold text-white">
              {item.title}
            </h2>
            <Badge variant={item.mediaType === 'video' ? 'purple' : 'cyan'}>
              {item.mediaType === 'video' ? 'Video' : 'Image'}
            </Badge>
          </div>

          {item.description && (
            <p className="text-gray-300 text-sm mb-4 max-h-40 overflow-auto">
              {item.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
            <span>ID: {item.id}</span>
            <span>Data: {new Date(item.dateCreated).toLocaleDateString('pl-PL')}</span>
            {item.center && <span>Centrum: {item.center}</span>}
            {item.photographer && <span>Fotograf: {item.photographer}</span>}
          </div>

          {item.keywords && item.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.keywords.slice(0, 10).map((keyword) => (
                <Badge key={keyword} variant="default" size="sm">
                  {keyword}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Zamknij
            </Button>
            {item.thumbnailUrl && (
              <a
                href={
                  item.mediaType === 'video'
                    ? item.thumbnailUrl.replace('~thumb', '~orig').replace('.jpg', '.mp4')
                    : item.thumbnailUrl.replace('~thumb', '~orig')
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">
                  Otwórz oryginał
                </Button>
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
