'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Clock, BookOpen, ArrowRight, CheckCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { QuizView, type AdaptiveQuizData } from '@/features/quiz-engine';
import { useProgress } from '@/hooks';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/constants';
import type { Lesson, ContentBlock } from '@/data/lessons';
import type { QuizResult, Quiz } from '@/features/quiz-engine';

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const { completeLesson, getLessonProgress, recordActivity, updateMastery } = useProgress();

  const progress = getLessonProgress(lesson.slug);

  // Convert lesson quiz to Quiz format
  const quizData: Quiz = {
    id: `lesson-${lesson.slug}`,
    title: `Quiz: ${lesson.title}`,
    questions: lesson.quiz,
    passingScore: 60,
  };

  const handleQuizComplete = (result: QuizResult, adaptiveData?: AdaptiveQuizData) => {
    // Update mastery for each question answered
    if (adaptiveData?.masteryUpdates) {
      for (const update of adaptiveData.masteryUpdates) {
        updateMastery(update);
      }
    }

    completeLesson(lesson.slug, result.percentage);
  };

  const handleStartQuiz = () => {
    recordActivity();
    setShowQuiz(true);
  };

  if (showQuiz) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-white">
            Quiz: {lesson.title}
          </h2>
          <Button variant="ghost" onClick={() => setShowQuiz(false)}>
            Wróć do lekcji
          </Button>
        </div>
        <QuizView
          quiz={quizData}
          onComplete={handleQuizComplete}
          onRestart={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="aspect-video lg:aspect-[21/9] relative rounded-xl overflow-hidden">
          <Image
            src={lesson.imageUrl}
            alt={lesson.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmos-darker via-cosmos-darker/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="cyan">{CATEGORY_LABELS[lesson.category]}</Badge>
            <Badge variant="purple">{DIFFICULTY_LABELS[lesson.level]}</Badge>
            <Badge variant="default">
              <Clock className="w-3 h-3 mr-1" />
              {lesson.duration} min
            </Badge>
            {progress?.completed && (
              <Badge variant="success">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ukończono
              </Badge>
            )}
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white">
            {lesson.title}
          </h1>
          <p className="text-gray-300 mt-2 max-w-2xl">{lesson.description}</p>
        </div>
      </div>

      {/* Content */}
      <Card padding="lg">
        <div className="prose prose-invert max-w-none space-y-6">
          {lesson.contentBlocks.map((block, index) => (
            <ContentBlockRenderer key={index} block={block} />
          ))}
        </div>
      </Card>

      {/* Quiz CTA */}
      <Card padding="lg" className="text-center">
        <BookOpen className="w-12 h-12 text-accent-cyan mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold text-white mb-2">
          Sprawdź swoją wiedzę!
        </h3>
        <p className="text-gray-400 mb-6">
          Rozwiąż krótki quiz ({lesson.quiz.length} pytań), aby utrwalić materiał z tej lekcji.
        </p>
        {progress?.completed && progress.quizScore !== null && (
          <p className="text-success mb-4">
            Twój poprzedni wynik: {progress.quizScore}%
          </p>
        )}
        <Button onClick={handleStartQuiz} rightIcon={<ArrowRight className="w-4 h-4" />}>
          {progress?.completed ? 'Rozwiąż ponownie' : 'Rozpocznij quiz'}
        </Button>
      </Card>
    </div>
  );
}

// Content block renderer
function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return <p className="text-gray-300 leading-relaxed">{block.content}</p>;

    case 'image':
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={block.imageUrl || ''}
              alt={block.imageAlt || ''}
              fill
              className="object-cover"
            />
          </div>
          {block.imageAlt && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {block.imageAlt}
            </figcaption>
          )}
        </figure>
      );

    case 'callout':
      const calloutStyles = {
        info: {
          bg: 'bg-accent-cyan/10',
          border: 'border-accent-cyan/30',
          icon: <Info className="w-5 h-5 text-accent-cyan" />,
        },
        warning: {
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          icon: <AlertTriangle className="w-5 h-5 text-warning" />,
        },
        tip: {
          bg: 'bg-accent-purple/10',
          border: 'border-accent-purple/30',
          icon: <Lightbulb className="w-5 h-5 text-accent-purple" />,
        },
      };
      const style = calloutStyles[block.calloutType || 'info'];

      return (
        <div className={`p-4 rounded-lg border ${style.bg} ${style.border}`}>
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
            <p className="text-gray-300 text-sm">{block.content}</p>
          </div>
        </div>
      );

    case 'list':
      return (
        <div className="my-4">
          {block.content && (
            <p className="text-gray-300 font-medium mb-2">{block.content}</p>
          )}
          <ul className="space-y-2">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-400">
                <span className="text-accent-cyan mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}
