/**
 * Format date to YYYY-MM-DD (NASA API format)
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format date to Polish locale (dd MMMM yyyy)
 */
export function formatDatePolish(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format date short (dd.MM.yyyy)
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Get last N days as array of date strings (YYYY-MM-DD)
 */
export function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(formatDateForApi(date));
  }

  return dates;
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Get relative time string (e.g., "2 dni temu")
 */
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'dzisiaj';
  if (diffDays === 1) return 'wczoraj';
  if (diffDays < 7) return `${diffDays} dni temu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tyg. temu`;
  return formatDateShort(d);
}

/**
 * Calculate streak days from activity dates
 */
export function calculateStreak(activityDates: string[]): number {
  if (activityDates.length === 0) return 0;

  const sortedDates = [...activityDates]
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if last activity was today or yesterday
  const lastActivity = sortedDates[0];
  lastActivity.setHours(0, 0, 0, 0);

  if (lastActivity < yesterday) {
    return 0; // Streak broken
  }

  let streak = 1;
  let currentDate = lastActivity;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i];
    prevDate.setHours(0, 0, 0, 0);

    const expectedPrevDate = new Date(currentDate);
    expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);

    if (prevDate.getTime() === expectedPrevDate.getTime()) {
      streak++;
      currentDate = prevDate;
    } else if (prevDate.getTime() < expectedPrevDate.getTime()) {
      break;
    }
  }

  return streak;
}
