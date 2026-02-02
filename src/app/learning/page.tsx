'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Sparkles, Map, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useIsMounted } from '@/hooks';
import { lessons } from '@/data/lessons';
import { quizzes } from '@/data/quizzes';
import {
  DailyMission,
  SkillMap,
  WeakAreasCard,
  DiagnosticsPanel,
  MasteryBar,
  initializeTagStats,
  computeReviewQueue,
  getProgressSummary,
  generateRecommendations,
  TAG_LABELS,
  type LessonWithTags,
  type QuizWithTags,
  type RecommendationState,
} from '@/features/adaptive';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LearningPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'recommendations';

  const { progress, resolveMisconception } = useProgress();
  const isMounted = useIsMounted();
  const [recommendations, setRecommendations] = useState<RecommendationState | null>(null);

  // Track question count to detect new quiz completions
  const questionCount = progress.questionHistory?.length ?? 0;

  // Generate recommendations when mounted or when new questions are answered
  useEffect(() => {
    if (!isMounted) return;

    // Generate new recommendations (always fresh, don't use cache for real-time updates)
    const newRecs = generateRecommendations({
      lessons: lessons as LessonWithTags[],
      quizzes: quizzes as QuizWithTags[],
      lessonsProgress: progress.lessonsProgress,
      tagStats: progress.tagStats ?? initializeTagStats(),
      questionHistory: progress.questionHistory ?? [],
      misconceptions: progress.misconceptions ?? [],
    });
    setRecommendations(newRecs);
  }, [isMounted, questionCount]); // Re-run when question count changes

  // Get progress summary
  const summary = useMemo(() => {
    const tagStats = progress.tagStats ?? initializeTagStats();
    const questionHistory = progress.questionHistory ?? [];
    const misconceptions = progress.misconceptions ?? [];
    return getProgressSummary(tagStats, questionHistory, misconceptions);
  }, [progress]);

  // Get review queue
  const reviewQueue = useMemo(() => {
    const tagStats = progress.tagStats ?? initializeTagStats();
    return computeReviewQueue(tagStats);
  }, [progress]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Adaptacyjna nauka
        </h1>
        <p className="text-gray-400">
          Spersonalizowane rekomendacje, mapa umiejętności i diagnostyka postępów.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}
          label="Ogólne mastery"
          value={`${Math.round(summary.overallMastery * 100)}%`}
          sublabel={summary.masteryLevel.label}
        />
        <SummaryCard
          icon={<Map className="w-5 h-5 text-purple-400" />}
          label="Tematy"
          value={`${summary.tagsExplored}/${summary.tagsTotal}`}
          sublabel="poznanych"
        />
        <SummaryCard
          icon={<RefreshCw className="w-5 h-5 text-yellow-400" />}
          label="Do powtórki"
          value={reviewQueue.length.toString()}
          sublabel={reviewQueue.length === 1 ? 'temat' : 'tematy'}
        />
        <SummaryCard
          icon={<AlertTriangle className="w-5 h-5 text-orange-400" />}
          label="Wykryte problemy"
          value={summary.activeMisconceptions.toString()}
          sublabel={summary.activeMisconceptions === 0 ? 'brak' : 'do naprawy'}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue={initialTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Rekomendacje
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Mapa umiejętności
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Powtórki
            {reviewQueue.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-500 text-yellow-900 rounded-full">
                {reviewQueue.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Diagnostyka
            {summary.activeMisconceptions > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-orange-500 text-orange-900 rounded-full">
                {summary.activeMisconceptions}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <DailyMission recommendations={recommendations} />
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <WeakAreasCard
              tagStats={progress.tagStats ?? initializeTagStats()}
              maxItems={5}
            />
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-base">Statystyki nauki</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Odpowiedzi łącznie</span>
                  <span className="text-white">{summary.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Trafność (ostatnie 50)</span>
                  <span className="text-white">
                    {Math.round(summary.recentAccuracy * 100)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tematy do odkrycia</span>
                  <span className="text-white">{summary.tagsRemaining}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <SkillMap tagStats={progress.tagStats ?? initializeTagStats()} />
        </TabsContent>

        {/* Review Tab */}
        <TabsContent value="review">
          <ReviewQueuePanel
            reviewQueue={reviewQueue}
            tagStats={progress.tagStats ?? initializeTagStats()}
          />
        </TabsContent>

        {/* Diagnostics Tab */}
        <TabsContent value="diagnostics">
          <DiagnosticsPanel
            misconceptions={progress.misconceptions ?? []}
            onResolveMisconception={resolveMisconception}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Summary card component
interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
}

function SummaryCard({ icon, label, value, sublabel }: SummaryCardProps) {
  return (
    <Card variant="default" className="p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-800 rounded-lg">{icon}</div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-gray-400">{sublabel}</p>
        </div>
      </div>
    </Card>
  );
}

// Review queue panel
interface ReviewQueuePanelProps {
  reviewQueue: Array<{
    tag: string;
    mastery: number;
    nextReviewAt: string;
    isOverdue: boolean;
    daysOverdue: number;
  }>;
  tagStats: Record<string, { mastery: number; seen: number; correct: number; wrong: number }>;
}

function ReviewQueuePanel({ reviewQueue, tagStats }: ReviewQueuePanelProps) {
  if (reviewQueue.length === 0) {
    return (
      <Card variant="default">
        <CardContent className="py-12 text-center">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <h3 className="text-lg font-medium text-white mb-2">
            Wszystko powtórzone!
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Nie masz zaległych tematów do powtórki. Kontynuuj naukę, a system
            automatycznie zaplanuje powtórki na odpowiedni moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        Tematy wymagające powtórki, posortowane według pilności:
      </p>
      <div className="space-y-3">
        {reviewQueue.map((item) => {
          const label = TAG_LABELS[item.tag as keyof typeof TAG_LABELS] || item.tag;
          const stat = tagStats[item.tag];

          return (
            <Card key={item.tag} variant="interactive" className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white">{label}</h4>
                    {item.daysOverdue > 0 && (
                      <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                        {item.daysOverdue} dni zaległości
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      {stat?.correct ?? 0}/{stat?.seen ?? 0} poprawnych
                    </span>
                  </div>
                  <div className="mt-2 max-w-xs">
                    <MasteryBar mastery={item.mastery} size="sm" showPercentage />
                  </div>
                </div>
                <a
                  href={`/quizzes?tag=${item.tag}`}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Powtórz
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
