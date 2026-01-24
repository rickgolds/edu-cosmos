import { z } from 'zod';

// NASA APOD API response schema
export const ApodSchema = z.object({
  date: z.string(),
  title: z.string(),
  explanation: z.string(),
  url: z.string().url(),
  hdurl: z.string().url().optional(),
  media_type: z.enum(['image', 'video']),
  copyright: z.string().optional(),
  service_version: z.string().optional(),
  thumbnail_url: z.string().url().optional(),
});

export type Apod = z.infer<typeof ApodSchema>;

// Array schema for multiple APODs
export const ApodArraySchema = z.array(ApodSchema);

// Params for APOD API
export interface ApodParams {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
}
