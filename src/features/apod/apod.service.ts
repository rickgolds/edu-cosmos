import { NASA_APOD_URL } from '@/lib/constants';
import { buildUrl } from '@/lib/fetcher';
import { Apod, ApodSchema, ApodArraySchema, ApodParams } from './apod.types';

const API_KEY = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY;

/**
 * Fetch today's APOD
 */
export async function fetchTodayApod(): Promise<Apod> {
  const url = buildUrl(NASA_APOD_URL, {
    api_key: API_KEY,
    thumbs: true,
  });

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch APOD: ${response.status}`);
  }

  const data = await response.json();
  return ApodSchema.parse(data);
}

/**
 * Fetch APOD for a specific date
 */
export async function fetchApodByDate(date: string): Promise<Apod> {
  const url = buildUrl(NASA_APOD_URL, {
    api_key: API_KEY,
    date,
    thumbs: true,
  });

  const response = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch APOD for ${date}: ${response.status}`);
  }

  const data = await response.json();
  return ApodSchema.parse(data);
}

/**
 * Fetch APODs for a date range
 */
export async function fetchApodRange(
  startDate: string,
  endDate: string
): Promise<Apod[]> {
  const url = buildUrl(NASA_APOD_URL, {
    api_key: API_KEY,
    start_date: startDate,
    end_date: endDate,
    thumbs: true,
  });

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch APOD range: ${response.status}`);
  }

  const data = await response.json();
  return ApodArraySchema.parse(data);
}

/**
 * Fetch random APODs
 */
export async function fetchRandomApods(count: number = 5): Promise<Apod[]> {
  const url = buildUrl(NASA_APOD_URL, {
    api_key: API_KEY,
    count,
    thumbs: true,
  });

  const response = await fetch(url, {
    cache: 'no-store', // Random should not be cached
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch random APODs: ${response.status}`);
  }

  const data = await response.json();
  return ApodArraySchema.parse(data);
}
