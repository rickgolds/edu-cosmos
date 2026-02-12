'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, ArrowRight, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Button, Card, Badge, Skeleton } from '@/components/ui';
import { quizzes } from '@/data/quizzes';
import type { Quiz, Question } from '@/features/quiz-engine';

export function HomeQuiz() {
  const [mounted, setMounted] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Rotate full quiz daily
    const quizIndex = dayOfYear % quizzes.length;
    const todayQuiz = quizzes[quizIndex];
    setQuiz(todayQuiz);

    // Pick one preview question from this quiz
    const questionIndex = dayOfYear % todayQuiz.questions.length;
    setPreviewQuestion(todayQuiz.questions[questionIndex]);
    setMounted(true);
  }, []);

  const handleAnswer = (optionId: string) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
    setShowResult(true);
  };

  if (!mounted || !quiz || !previewQuestion) {
    return (
      <section className="py-16 border-t border-cosmos-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton variant="rectangular" className="h-64 w-full rounded-xl" />
        </div>
      </section>
    );
  }

  const correctOption = previewQuestion.options.find((o) => o.isCorrect);
  const isCorrect = selectedAnswer === correctOption?.id;

  return (
    <section className="py-16 border-t border-cosmos-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Quiz dnia
          </h2>
          <p className="text-gray-400">
            Codziennie nowy quiz do rozwiązania
          </p>
        </div>

        <Card padding="lg">
          {/* Quiz header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent-purple/10">
              <Brain className="w-6 h-6 text-accent-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-display font-semibold text-white">
                {quiz.title}
              </h3>
              <p className="text-sm text-gray-500">{quiz.description}</p>
            </div>
            <Badge variant="purple">
              <HelpCircle className="w-3 h-3 mr-1" />
              {quiz.questions.length} pytań
            </Badge>
          </div>

          {/* Divider */}
          <div className="border-t border-cosmos-border my-4" />

          {/* Preview question */}
          <p className="text-sm text-accent-cyan mb-3">Pytanie na start:</p>
          <p className="text-gray-200 font-medium mb-4">{previewQuestion.question}</p>

          <div className="grid gap-3">
            {previewQuestion.options.map((option) => {
              let style = 'border-cosmos-border hover:border-accent-cyan/50 bg-cosmos-card/50';

              if (showResult) {
                if (option.isCorrect) {
                  style = 'border-green-500/50 bg-green-500/10';
                } else if (option.id === selectedAnswer && !option.isCorrect) {
                  style = 'border-red-500/50 bg-red-500/10';
                } else {
                  style = 'border-cosmos-border bg-cosmos-card/30 opacity-50';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${style} ${
                    !showResult ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-cosmos-border flex items-center justify-center text-sm text-gray-400 font-medium">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="text-gray-200">{option.text}</span>
                    {showResult && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto flex-shrink-0" />
                    )}
                    {showResult && option.id === selectedAnswer && !option.isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 ml-auto flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={isCorrect ? 'success' : 'error'}>
                  {isCorrect ? 'Dobrze!' : 'Niestety nie'}
                </Badge>
              </div>
              <p className="text-sm text-gray-300">{previewQuestion.explanation}</p>
            </div>
          )}

          {/* CTA to full quiz */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/quizzes">
              <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                Rozwiąż cały quiz ({quiz.questions.length} pytań)
              </Button>
            </Link>
            <Link href="/quizzes">
              <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Więcej quizów
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
