'use client';

import { Video, Image as ImageIcon, Calendar } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { LibraryItem } from './library.types';

interface LibraryGridProps {
  items: LibraryItem[];
  onItemClick: (item: LibraryItem) => void;
}

export function LibraryGrid({ items, onItemClick }: LibraryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <LibraryItemCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}

interface LibraryItemCardProps {
  item: LibraryItem;
  onClick: () => void;
}

function LibraryItemCard({ item, onClick }: LibraryItemCardProps) {
  const formattedDate = new Date(item.dateCreated).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      variant="interactive"
      padding="none"
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-cosmos-dark overflow-hidden">
        {item.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {item.mediaType === 'video' ? (
              <Video className="w-12 h-12 text-gray-600" />
            ) : (
              <ImageIcon className="w-12 h-12 text-gray-600" />
            )}
          </div>
        )}

        {/* Media type badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant={item.mediaType === 'video' ? 'purple' : 'cyan'}
            size="sm"
          >
            {item.mediaType === 'video' ? (
              <Video className="w-3 h-3" />
            ) : (
              <ImageIcon className="w-3 h-3" />
            )}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-accent-cyan transition-colors mb-2">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          {formattedDate}
        </div>
      </div>
    </Card>
  );
}
