import { TRAVEL_PRESETS, TRAVEL_DESTINATIONS, type TravelPreset } from './labs.types';

export interface TravelTime {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  years: number;
}

/**
 * Calculate travel time given distance (km) and speed (km/s)
 */
export function calculateTravelTime(distanceKm: number, speedKmS: number): TravelTime {
  const seconds = distanceKm / speedKmS;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365.25;

  return { seconds, minutes, hours, days, years };
}

/**
 * Calculate travel time to a destination with a specific preset
 */
export function calculateTravelToDestination(
  destinationId: string,
  presetId: string
): { time: TravelTime; preset: TravelPreset; destination: { id: string; name: string; distanceKm: number } } | null {
  const destination = TRAVEL_DESTINATIONS.find((d) => d.id === destinationId);
  const preset = TRAVEL_PRESETS.find((p) => p.id === presetId);

  if (!destination || !preset) return null;

  return {
    time: calculateTravelTime(destination.distanceKm, preset.speedKmS),
    preset,
    destination,
  };
}

/**
 * Calculate travel times to a destination with all presets
 */
export function calculateAllTravelTimes(
  destinationId: string
): Array<{ preset: TravelPreset; time: TravelTime }> | null {
  const destination = TRAVEL_DESTINATIONS.find((d) => d.id === destinationId);
  if (!destination) return null;

  return TRAVEL_PRESETS.map((preset) => ({
    preset,
    time: calculateTravelTime(destination.distanceKm, preset.speedKmS),
  }));
}

/**
 * Format travel time in human-readable format
 */
export function formatTravelTime(time: TravelTime): string {
  if (time.years >= 1) {
    const remainingDays = Math.floor((time.years % 1) * 365.25);
    if (time.years >= 10) {
      return `${Math.floor(time.years).toLocaleString('pl-PL')} lat`;
    }
    if (remainingDays > 0) {
      return `${Math.floor(time.years)} ${getYearWord(Math.floor(time.years))} i ${remainingDays} dni`;
    }
    return `${time.years.toFixed(1)} ${getYearWord(time.years)}`;
  }

  if (time.days >= 1) {
    const remainingHours = Math.floor((time.days % 1) * 24);
    if (time.days >= 30) {
      return `${Math.floor(time.days).toLocaleString('pl-PL')} dni`;
    }
    if (remainingHours > 0) {
      return `${Math.floor(time.days)} ${getDayWord(Math.floor(time.days))} i ${remainingHours} godz.`;
    }
    return `${time.days.toFixed(1)} ${getDayWord(time.days)}`;
  }

  if (time.hours >= 1) {
    const remainingMinutes = Math.floor((time.hours % 1) * 60);
    if (remainingMinutes > 0) {
      return `${Math.floor(time.hours)} godz. ${remainingMinutes} min`;
    }
    return `${time.hours.toFixed(1)} godz.`;
  }

  if (time.minutes >= 1) {
    const remainingSeconds = Math.floor((time.minutes % 1) * 60);
    if (remainingSeconds > 0) {
      return `${Math.floor(time.minutes)} min ${remainingSeconds} sek`;
    }
    return `${time.minutes.toFixed(1)} min`;
  }

  return `${time.seconds.toFixed(2)} sek`;
}

/**
 * Format travel time as a short version
 */
export function formatTravelTimeShort(time: TravelTime): string {
  if (time.years >= 1000) {
    return `${(time.years / 1000).toFixed(1)}k lat`;
  }
  if (time.years >= 1) {
    return `${time.years.toFixed(1)} lat`;
  }
  if (time.days >= 1) {
    return `${Math.floor(time.days)} dni`;
  }
  if (time.hours >= 1) {
    return `${time.hours.toFixed(1)} godz.`;
  }
  if (time.minutes >= 1) {
    return `${time.minutes.toFixed(1)} min`;
  }
  return `${time.seconds.toFixed(1)} sek`;
}

/**
 * Format distance in human-readable format
 */
export function formatDistanceKm(distanceKm: number): string {
  if (distanceKm >= 1_000_000_000) {
    return `${(distanceKm / 1_000_000_000).toFixed(2)} mld km`;
  }
  if (distanceKm >= 1_000_000) {
    return `${(distanceKm / 1_000_000).toFixed(2)} mln km`;
  }
  if (distanceKm >= 1_000) {
    return `${(distanceKm / 1_000).toFixed(0)} tys. km`;
  }
  return `${distanceKm.toFixed(0)} km`;
}

/**
 * Polish word for "year" with proper declension
 */
function getYearWord(years: number): string {
  const absYears = Math.abs(years);
  if (absYears === 1) return 'rok';
  if (absYears >= 2 && absYears <= 4) return 'lata';
  if (absYears >= 5 && absYears <= 21) return 'lat';
  const lastDigit = absYears % 10;
  if (lastDigit >= 2 && lastDigit <= 4) return 'lata';
  return 'lat';
}

/**
 * Polish word for "day" with proper declension
 */
function getDayWord(days: number): string {
  const absDays = Math.abs(days);
  if (absDays === 1) return 'dzień';
  return 'dni';
}

/**
 * Get interesting facts about travel time
 */
export function getTravelFact(destinationId: string, presetId: string): string | null {
  const result = calculateTravelToDestination(destinationId, presetId);
  if (!result) return null;

  const { time, preset, destination } = result;

  if (preset.id === 'light' && destination.id === 'moon') {
    return 'Światło pokonuje tę odległość w nieco ponad sekundę!';
  }
  if (preset.id === 'light' && destination.id.includes('mars')) {
    return 'Sygnał radiowy z Marsa dociera do nas z takim opóźnieniem – dlatego sterowanie łazikami jest wyzwaniem!';
  }
  if (preset.id === 'walk') {
    return `Gdybyś szedł bez przerwy, musiałbyś iść przez ${formatTravelTime(time)}.`;
  }
  if (preset.id === 'rocket' && time.days < 7) {
    return 'Misja Apollo 11 leciała na Księżyc około 3 dni.';
  }
  if (preset.id === 'voyager' && destination.id === 'jupiter') {
    return 'Sonda Voyager 1 dotarła do Jowisza w niecałe 2 lata (1977-1979).';
  }

  return null;
}
