'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, ExternalLink, Calendar, User } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useProgress } from '@/hooks';
import { formatDatePolish } from '@/lib/date-utils';
import type { Apod } from './apod.types';

interface ApodCardProps {
  apod: Apod;
  variant?: 'compact' | 'full';
  showBookmark?: boolean;
}

export function ApodCard({ apod, variant = 'compact', showBookmark = true }: ApodCardProps) {
  const { isBookmarked, toggleBookmark } = useProgress();
  const bookmarked = isBookmarked(apod.date);

  const isVideo = apod.media_type === 'video';
  const imageUrl = isVideo ? apod.thumbnail_url || '/placeholder-video.jpg' : apod.url;

  return (
    <Card variant="interactive" padding="none" className="group">
      {/* Image/Video thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={apod.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-cosmos-border flex items-center justify-center">
            <span className="text-gray-500">Brak obrazu</span>
          </div>
        )}

        {/* Overlay with badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="cyan" size="sm">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDatePolish(apod.date)}
          </Badge>
          {isVideo && (
            <Badge variant="purple" size="sm">
              Video
            </Badge>
          )}
        </div>

        {/* Bookmark button */}
        {showBookmark && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark(apod.date);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              bookmarked
                ? 'bg-accent-cyan text-cosmos-darker'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
            aria-label={bookmarked ? 'Usuń z zapisanych' : 'Zapisz'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-white mb-2 line-clamp-2 group-hover:text-accent-cyan transition-colors">
          {apod.title}
        </h3>

        {variant === 'full' && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{apod.explanation}</p>
        )}

        {apod.copyright && (
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
            <User className="w-3 h-3" />
            {apod.copyright}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Link href={`/apod?date=${apod.date}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              Zobacz szczegóły
            </Button>
          </Link>
          {apod.hdurl && (
            <a
              href={apod.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
