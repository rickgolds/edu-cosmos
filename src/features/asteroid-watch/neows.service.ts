import { NASA_NEOWS_URL } from '@/lib/constants';
import { buildUrl } from '@/lib/fetcher';
import {
  NeoFeedResponseSchema,
  type Neo,
  type NeoSummary,
  type NeoSearchParams,
  type NeoSortOption,
  type CloseApproachData,
} from './neows.types';

const API_KEY = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY;

/**
 * Find the most relevant close approach (nearest upcoming, or most recent past)
 */
function findRelevantApproach(approaches: CloseApproachData[]): CloseApproachData | null {
  if (approaches.length === 0) return null;
  if (approaches.length === 1) return approaches[0];

  const now = Date.now();

  // Sort by epoch time (chronological order)
  const sorted = [...approaches].sort(
    (a, b) => a.epoch_date_close_approach - b.epoch_date_close_approach
  );

  // Find first future approach
  const firstFuture = sorted.find((a) => a.epoch_date_close_approach >= now);
  if (firstFuture) return firstFuture;

  // No future approaches - return the most recent (last in sorted array)
  return sorted[sorted.length - 1];
}

/**
 * Transform raw Neo to simplified NeoSummary
 */
function transformNeo(neo: Neo): NeoSummary {
  const closestApproach = findRelevantApproach(neo.close_approach_data);

  return {
    id: neo.id,
    name: neo.name.replace(/[()]/g, '').trim(),
    absoluteMagnitude: neo.absolute_magnitude_h,
    estimatedDiameterMin: neo.estimated_diameter.kilometers.estimated_diameter_min,
    estimatedDiameterMax: neo.estimated_diameter.kilometers.estimated_diameter_max,
    isPotentiallyHazardous: neo.is_potentially_hazardous_asteroid,
    closestApproach: closestApproach
      ? {
        date: closestApproach.close_approach_date,
        distanceKm: parseFloat(closestApproach.miss_distance.kilometers),
        distanceAu: parseFloat(closestApproach.miss_distance.astronomical),
        distanceLunar: parseFloat(closestApproach.miss_distance.lunar),
        velocityKmPerSec: parseFloat(closestApproach.relative_velocity.kilometers_per_second),
        velocityKmPerHour: parseFloat(closestApproach.relative_velocity.kilometers_per_hour),
      }
      : null,
    nasaUrl: neo.nasa_jpl_url,
  };
}

/**
 * Fetch NEO feed for a date range
 */
export async function fetchNeoFeed(params: NeoSearchParams): Promise<NeoSummary[]> {
  const url = buildUrl(`${NASA_NEOWS_URL}/feed`, {
    api_key: API_KEY,
    start_date: params.startDate,
    end_date: params.endDate,
  });

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NEO feed: ${response.status}`);
  }

  const data = await response.json();
  const parsed = NeoFeedResponseSchema.parse(data);

  // Flatten all NEOs from all dates
  const allNeos: Neo[] = [];
  Object.values(parsed.near_earth_objects).forEach((neos) => {
    allNeos.push(...neos);
  });

  return allNeos.map(transformNeo);
}

/**
 * Fetch single NEO by ID
 */
export async function fetchNeoById(neoId: string): Promise<NeoSummary | null> {
  const url = buildUrl(`${NASA_NEOWS_URL}/neo/${neoId}`, {
    api_key: API_KEY,
  });

  const response = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch NEO: ${response.status}`);
  }

  const data = await response.json();
  return transformNeo(data);
}

/**
 * Sort NEOs by different criteria
 */
export function sortNeos(neos: NeoSummary[], sortBy: NeoSortOption, ascending = true): NeoSummary[] {
  const sorted = [...neos].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return (
          new Date(a.closestApproach?.date || 0).getTime() -
          new Date(b.closestApproach?.date || 0).getTime()
        );
      case 'distance':
        return (
          (a.closestApproach?.distanceKm || Infinity) -
          (b.closestApproach?.distanceKm || Infinity)
        );
      case 'diameter':
        return b.estimatedDiameterMax - a.estimatedDiameterMax;
      case 'velocity':
        return (
          (b.closestApproach?.velocityKmPerSec || 0) -
          (a.closestApproach?.velocityKmPerSec || 0)
        );
      default:
        return 0;
    }
  });

  return ascending ? sorted : sorted.reverse();
}

/**
 * Filter NEOs by hazardous status
 */
export function filterHazardousNeos(neos: NeoSummary[], onlyHazardous: boolean): NeoSummary[] {
  if (!onlyHazardous) return neos;
  return neos.filter((neo) => neo.isPotentiallyHazardous);
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1000000) {
    return `${km.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} km`;
  }
  const millions = km / 1000000;
  return `${millions.toLocaleString('pl-PL', { maximumFractionDigits: 2 })} mln km`;
}

/**
 * Format velocity for display
 */
export function formatVelocity(kmPerSec: number): string {
  return `${kmPerSec.toLocaleString('pl-PL', { maximumFractionDigits: 2 })} km/s`;
}

/**
 * Format diameter for display
 */
export function formatDiameter(min: number, max: number): string {
  if (max < 1) {
    return `${(min * 1000).toFixed(0)} - ${(max * 1000).toFixed(0)} m`;
  }
  return `${min.toFixed(2)} - ${max.toFixed(2)} km`;
}

/**
 * Get hazard level based on distance and size
 */
export function getHazardLevel(neo: NeoSummary): 'low' | 'medium' | 'high' {
  if (!neo.closestApproach) return 'low';

  const distanceLunar = neo.closestApproach.distanceLunar;
  const diameter = neo.estimatedDiameterMax;

  if (neo.isPotentiallyHazardous && distanceLunar < 10 && diameter > 0.1) {
    return 'high';
  }
  if (neo.isPotentiallyHazardous || distanceLunar < 20) {
    return 'medium';
  }
  return 'low';
}
