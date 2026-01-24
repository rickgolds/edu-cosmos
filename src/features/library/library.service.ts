import { NASA_IMAGES_API_URL } from '@/lib/constants';
import { buildUrl } from '@/lib/fetcher';
import {
  NasaSearchResponseSchema,
  type LibrarySearchParams,
  type LibrarySearchResult,
  type LibraryItem,
  type NasaItem,
} from './library.types';

const PAGE_SIZE = 20;

/**
 * Transform NASA API item to simplified LibraryItem
 */
function transformItem(item: NasaItem): LibraryItem {
  const data = item.data[0];
  const thumbnail = item.links?.find((link) => link.rel === 'preview');

  return {
    id: data.nasa_id,
    title: data.title,
    description: data.description,
    dateCreated: data.date_created,
    mediaType: data.media_type as 'image' | 'video',
    thumbnailUrl: thumbnail?.href,
    previewUrl: item.href,
    keywords: data.keywords,
    center: data.center,
    photographer: data.photographer,
  };
}

/**
 * Search NASA Images API
 */
export async function searchNasaLibrary(
  params: LibrarySearchParams
): Promise<LibrarySearchResult> {
  const { query, mediaType = 'all', page = 1, pageSize = PAGE_SIZE } = params;

  if (!query.trim()) {
    return {
      items: [],
      totalHits: 0,
      page,
      hasMore: false,
    };
  }

  const searchParams: Record<string, string | number> = {
    q: query,
    page,
    page_size: pageSize,
  };

  if (mediaType !== 'all') {
    searchParams.media_type = mediaType;
  } else {
    searchParams.media_type = 'image,video';
  }

  const url = buildUrl(`${NASA_IMAGES_API_URL}/search`, searchParams);

  const response = await fetch(url, {
    next: { revalidate: 1800 }, // Cache for 30 minutes
  });

  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`);
  }

  const data = await response.json();
  const parsed = NasaSearchResponseSchema.parse(data);

  const items = parsed.collection.items
    .filter((item) => item.data[0]?.media_type !== 'audio') // Exclude audio
    .map(transformItem);

  const totalHits = parsed.collection.metadata?.total_hits || items.length;
  const hasMore = page * pageSize < totalHits;

  return {
    items,
    totalHits,
    page,
    hasMore,
  };
}

/**
 * Get asset details (image/video URLs)
 */
export async function getAssetDetails(nasaId: string): Promise<string[]> {
  const url = `${NASA_IMAGES_API_URL}/asset/${nasaId}`;

  const response = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch asset: ${response.status}`);
  }

  const data = await response.json();

  // Extract URLs from collection
  const urls: string[] = data.collection?.items?.map(
    (item: { href: string }) => item.href
  ) || [];

  return urls;
}

/**
 * Get suggested search terms
 */
export function getSuggestedSearches(): string[] {
  return [
    'Mars',
    'Moon',
    'Jupiter',
    'Saturn rings',
    'Nebula',
    'Galaxy',
    'ISS',
    'Rocket launch',
    'Astronaut',
    'Earth from space',
    'Black hole',
    'Hubble',
  ];
}
