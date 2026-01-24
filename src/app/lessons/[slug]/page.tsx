import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getLessonBySlug, lessons } from '@/data/lessons';
import { LessonContent } from '@/features/lessons';
import { Button } from '@/components/ui';

interface LessonPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = getLessonBySlug(params.slug);

  if (!lesson) {
    return {
      title: 'Lekcja nie znaleziona',
    };
  }

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export async function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = getLessonBySlug(params.slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link href="/lessons" className="inline-block mb-6">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Powrót do lekcji
        </Button>
      </Link>

      {/* Lesson content */}
      <LessonContent lesson={lesson} />
    </div>
  );
}
