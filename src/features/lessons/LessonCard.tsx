import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpen, CheckCircle } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/constants';
import type { Lesson } from '@/data/lessons';
import type { LessonProgress } from '@/hooks';

interface LessonCardProps {
  lesson: Lesson;
  progress?: LessonProgress | null;
}

export function LessonCard({ lesson, progress }: LessonCardProps) {
  const isCompleted = progress?.completed;

  return (
    <Link href={`/lessons/${lesson.slug}`}>
      <Card variant="interactive" padding="none" className="h-full group">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={lesson.imageUrl}
            alt={lesson.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmos-darker/80 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="cyan" size="sm">
              {CATEGORY_LABELS[lesson.category]}
            </Badge>
          </div>

          {/* Completed indicator */}
          {isCompleted && (
            <div className="absolute top-3 right-3 p-2 rounded-full bg-success text-white">
              <CheckCircle className="w-4 h-4" />
            </div>
          )}

          {/* Duration */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration} min</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-lg text-white mb-2 line-clamp-2 group-hover:text-accent-cyan transition-colors">
            {lesson.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {lesson.description}
          </p>

          <div className="flex items-center justify-between">
            <Badge variant="purple" size="sm">
              {DIFFICULTY_LABELS[lesson.level]}
            </Badge>
            {isCompleted && progress?.quizScore !== null && (
              <span className="text-sm text-success">
                Quiz: {progress.quizScore}%
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
