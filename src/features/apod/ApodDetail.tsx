'use client';

import Image from 'next/image';
import { Bookmark, ExternalLink, Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useProgress } from '@/hooks';
import { formatDatePolish, formatDateForApi } from '@/lib/date-utils';
import { GlossaryTerms } from './GlossaryTerms';
import type { Apod } from './apod.types';
import Link from 'next/link';

interface ApodDetailProps {
  apod: Apod;
}

export function ApodDetail({ apod }: ApodDetailProps) {
  const { isBookmarked, toggleBookmark } = useProgress();
  const bookmarked = isBookmarked(apod.date);

  const isVideo = apod.media_type === 'video';

  // Calculate prev/next dates
  const currentDate = new Date(apod.date);
  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const canGoNext = nextDate <= today;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href={`/apod?date=${formatDateForApi(prevDate)}`}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Poprzedni
          </Button>
        </Link>
        <Badge variant="cyan">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDatePolish(apod.date)}
        </Badge>
        {canGoNext ? (
          <Link href={`/apod?date=${formatDateForApi(nextDate)}`}>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Następny
            </Button>
          </Link>
        ) : (
          <Button variant="ghost" size="sm" disabled rightIcon={<ArrowRight className="w-4 h-4" />}>
            Następny
          </Button>
        )}
      </div>

      {/* Main content */}
      <Card padding="none" className="overflow-hidden">
        {/* Media */}
        <div className="relative">
          {isVideo ? (
            <div className="aspect-video">
              <iframe
                src={apod.url}
                title={apod.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video lg:aspect-[21/9]">
              <Image
                src={apod.url}
                alt={apod.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                {apod.title}
              </h1>
              {apod.copyright && (
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Autor: {apod.copyright}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={bookmarked ? 'primary' : 'secondary'}
                onClick={() => toggleBookmark(apod.date)}
                leftIcon={<Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />}
              >
                {bookmarked ? 'Zapisano' : 'Zapisz'}
              </Button>
              {apod.hdurl && (
                <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" leftIcon={<ExternalLink className="w-4 h-4" />}>
                    HD
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {apod.explanation}
            </p>
          </div>
        </div>
      </Card>

      {/* Glossary */}
      <GlossaryTerms text={apod.explanation} />
    </div>
  );
}
