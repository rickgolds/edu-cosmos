import { z } from 'zod';

// NASA Images API response schemas
const NasaLinkSchema = z.object({
  href: z.string(),
  rel: z.string().optional(),
  render: z.string().optional(),
});

const NasaDataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date_created: z.string(),
  media_type: z.enum(['image', 'video', 'audio']),
  nasa_id: z.string(),
  keywords: z.array(z.string()).optional(),
  center: z.string().optional(),
  photographer: z.string().optional(),
});

const NasaItemSchema = z.object({
  href: z.string(),
  data: z.array(NasaDataSchema),
  links: z.array(NasaLinkSchema).optional(),
});

export const NasaSearchResponseSchema = z.object({
  collection: z.object({
    version: z.string(),
    href: z.string(),
    items: z.array(NasaItemSchema),
    metadata: z.object({
      total_hits: z.number(),
    }).optional(),
  }),
});

export type NasaLink = z.infer<typeof NasaLinkSchema>;
export type NasaData = z.infer<typeof NasaDataSchema>;
export type NasaItem = z.infer<typeof NasaItemSchema>;
export type NasaSearchResponse = z.infer<typeof NasaSearchResponseSchema>;

// Simplified item for UI
export interface LibraryItem {
  id: string;
  title: string;
  description?: string;
  dateCreated: string;
  mediaType: 'image' | 'video' | 'audio';
  thumbnailUrl?: string;
  previewUrl?: string;
  keywords?: string[];
  center?: string;
  photographer?: string;
}

// Search params
export interface LibrarySearchParams {
  query: string;
  mediaType?: 'image' | 'video' | 'all';
  page?: number;
  pageSize?: number;
}

// Search result
export interface LibrarySearchResult {
  items: LibraryItem[];
  totalHits: number;
  page: number;
  hasMore: boolean;
}
