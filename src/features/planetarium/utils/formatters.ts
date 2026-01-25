/**
 * Format large numbers with thousands separators
 */
export function formatNumber(num: number, locale = 'pl-PL'): string {
  return num.toLocaleString(locale);
}

/**
 * Format distance in km with appropriate unit
 */
export function formatDistance(km: number): string {
  if (km >= 1_000_000) {
    return `${(km / 1_000_000).toFixed(2)} mln km`;
  }
  if (km >= 1_000) {
    return `${formatNumber(Math.round(km))} km`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Format temperature with Celsius
 */
export function formatTemperature(celsius: number): string {
  const sign = celsius > 0 ? '+' : '';
  return `${sign}${celsius}°C`;
}

/**
 * Format gravity in m/s²
 */
export function formatGravity(gravity: number): string {
  return `${gravity.toFixed(2)} m/s²`;
}

/**
 * Format day length from hours
 */
export function formatDayLength(hours: number): string {
  if (hours < 24) {
    return `${hours.toFixed(1)} godz.`;
  }
  const days = hours / 24;
  if (days < 365) {
    return `${days.toFixed(1)} dni ziemskich`;
  }
  const years = days / 365;
  return `${years.toFixed(1)} lat ziemskich`;
}

/**
 * Format year length from Earth days
 */
export function formatYearLength(days: number): string {
  if (days < 365) {
    return `${days} dni ziemskich`;
  }
  const years = days / 365.25;
  return `${years.toFixed(1)} lat ziemskich`;
}

/**
 * Compare two values and return percentage difference
 */
export function compareValues(valueA: number, valueB: number): {
  ratio: number;
  percentDiff: number;
  comparison: 'larger' | 'smaller' | 'equal';
} {
  if (valueA === valueB) {
    return { ratio: 1, percentDiff: 0, comparison: 'equal' };
  }
  const ratio = valueA / valueB;
  const percentDiff = ((valueA - valueB) / valueB) * 100;
  return {
    ratio,
    percentDiff,
    comparison: valueA > valueB ? 'larger' : 'smaller',
  };
}

/**
 * Format ratio for comparison display
 */
export function formatRatio(ratio: number): string {
  if (ratio >= 1) {
    return `${ratio.toFixed(1)}x`;
  }
  return `${(1 / ratio).toFixed(1)}x mniejszy`;
}

/**
 * Format time duration in seconds to human readable
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} sek.`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0
      ? `${minutes} min ${remainingSeconds} sek.`
      : `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} godz. ${remainingMinutes} min`;
}
