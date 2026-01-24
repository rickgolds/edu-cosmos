'use client';

import { BookOpen, Brain, Bookmark, Flame, Trophy, Clock, TrendingUp } from 'lucide-react';
import { Card, CardTitle, Badge, Button, EmptyState } from '@/components/ui';
import { useProgress, useIsMounted } from '@/hooks';
import { getRelativeTime } from '@/lib/date-utils';
import Link from 'next/link';

export function ProgressDashboard() {
  const { stats, progress } = useProgress();
  const isMounted = useIsMounted();

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return <ProgressDashboardSkeleton />;
  }

  const hasActivity = stats.completedLessonsCount > 0 || stats.totalQuizzes > 0;

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Ukończone lekcje"
          value={stats.completedLessonsCount}
          color="cyan"
        />
        <StatCard
          icon={<Brain className="w-6 h-6" />}
          label="Rozwiązane quizy"
          value={stats.totalQuizzes}
          color="purple"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Średni wynik"
          value={`${stats.avgOverallScore}%`}
          color="success"
        />
        <StatCard
          icon={<Flame className="w-6 h-6" />}
          label="Seria dni"
          value={stats.streak}
          color="warning"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <Card padding="lg">
          <CardTitle className="mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent-cyan" />
            Ostatnia aktywność
          </CardTitle>

          {hasActivity ? (
            <div className="space-y-4">
              {stats.lastActive && (
                <p className="text-gray-400 text-sm">
                  Ostatnia aktywność: {getRelativeTime(stats.lastActive)}
                </p>
              )}

              {/* Recent lessons */}
              {Object.values(progress.lessonsProgress)
                .filter((l) => l.completed)
                .sort(
                  (a, b) =>
                    new Date(b.completedAt || 0).getTime() -
                    new Date(a.completedAt || 0).getTime()
                )
                .slice(0, 3)
                .map((lesson) => (
                  <div
                    key={lesson.lessonSlug}
                    className="flex items-center justify-between p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-cyan/20">
                        <BookOpen className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {lesson.lessonSlug.replace(/-/g, ' ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lesson.completedAt &&
                            getRelativeTime(lesson.completedAt)}
                        </p>
                      </div>
                    </div>
                    {lesson.quizScore !== null && (
                      <Badge
                        variant={lesson.quizScore >= 60 ? 'success' : 'warning'}
                        size="sm"
                      >
                        {lesson.quizScore}%
                      </Badge>
                    )}
                  </div>
                ))}

              <Link href="/lessons">
                <Button variant="secondary" className="w-full">
                  Zobacz wszystkie lekcje
                </Button>
              </Link>
            </div>
          ) : (
            <EmptyState
              icon="inbox"
              title="Brak aktywności"
              description="Rozpocznij naukę, aby zobaczyć swój postęp."
              action={{
                label: 'Rozpocznij lekcję',
                onClick: () => (window.location.href = '/lessons'),
              }}
            />
          )}
        </Card>

        {/* Achievements */}
        <Card padding="lg">
          <CardTitle className="mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-purple" />
            Osiągnięcia
          </CardTitle>

          <div className="space-y-4">
            <Achievement
              title="Pierwszy krok"
              description="Ukończ pierwszą lekcję"
              unlocked={stats.completedLessonsCount >= 1}
            />
            <Achievement
              title="Uczeń"
              description="Ukończ 3 lekcje"
              unlocked={stats.completedLessonsCount >= 3}
            />
            <Achievement
              title="Ekspert quizów"
              description="Rozwiąż 5 quizów"
              unlocked={stats.totalQuizzes >= 5}
            />
            <Achievement
              title="Perfekcjonista"
              description="Uzyskaj 100% w quizie"
              unlocked={progress.quizResults.some((r) => r.score === r.totalQuestions)}
            />
            <Achievement
              title="Seria 3 dni"
              description="Ucz się przez 3 dni z rzędu"
              unlocked={stats.streak >= 3}
            />
            <Achievement
              title="Kolekcjoner"
              description="Zapisz 5 zdjęć APOD"
              unlocked={stats.bookmarksCount >= 5}
            />
          </div>
        </Card>
      </div>

      {/* Bookmarks */}
      {stats.bookmarksCount > 0 && (
        <Card padding="lg">
          <CardTitle className="mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-warning" />
            Zapisane APOD ({stats.bookmarksCount})
          </CardTitle>
          <p className="text-gray-400 text-sm mb-4">
            Zapisałeś {stats.bookmarksCount} zdjęć dnia z NASA.
          </p>
          <Link href="/apod">
            <Button variant="secondary">Zobacz zapisane</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}

// Stat card component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'cyan' | 'purple' | 'success' | 'warning';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colors = {
    cyan: 'text-accent-cyan bg-accent-cyan/20',
    purple: 'text-accent-purple bg-accent-purple/20',
    success: 'text-success bg-success/20',
    warning: 'text-warning bg-warning/20',
  };

  return (
    <Card padding="md">
      <div className={`inline-flex p-3 rounded-lg ${colors[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </Card>
  );
}

// Achievement component
interface AchievementProps {
  title: string;
  description: string;
  unlocked: boolean;
}

function Achievement({ title, description, unlocked }: AchievementProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        unlocked
          ? 'bg-accent-purple/10 border-accent-purple/30'
          : 'bg-cosmos-dark/50 border-cosmos-border opacity-50'
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          unlocked ? 'bg-accent-purple/20 text-accent-purple' : 'bg-cosmos-border text-gray-500'
        }`}
      >
        <Trophy className="w-4 h-4" />
      </div>
      <div>
        <p className={`font-medium ${unlocked ? 'text-white' : 'text-gray-500'}`}>
          {title}
        </p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {unlocked && (
        <Badge variant="purple" size="sm" className="ml-auto">
          ✓
        </Badge>
      )}
    </div>
  );
}

// Skeleton loader
function ProgressDashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-cosmos-card rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-cosmos-card rounded-xl" />
        <div className="h-64 bg-cosmos-card rounded-xl" />
      </div>
    </div>
  );
}
