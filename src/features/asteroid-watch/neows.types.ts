import { z } from 'zod';

// Estimated diameter schema
const EstimatedDiameterRangeSchema = z.object({
  estimated_diameter_min: z.number(),
  estimated_diameter_max: z.number(),
});

const EstimatedDiameterSchema = z.object({
  kilometers: EstimatedDiameterRangeSchema,
  meters: EstimatedDiameterRangeSchema,
  miles: EstimatedDiameterRangeSchema.optional(),
  feet: EstimatedDiameterRangeSchema.optional(),
});

// Close approach data schema
const CloseApproachDataSchema = z.object({
  close_approach_date: z.string(),
  close_approach_date_full: z.string().optional(),
  epoch_date_close_approach: z.number(),
  relative_velocity: z.object({
    kilometers_per_second: z.string(),
    kilometers_per_hour: z.string(),
    miles_per_hour: z.string().optional(),
  }),
  miss_distance: z.object({
    astronomical: z.string(),
    lunar: z.string(),
    kilometers: z.string(),
    miles: z.string().optional(),
  }),
  orbiting_body: z.string(),
});

// NEO schema
export const NeoSchema = z.object({
  id: z.string(),
  neo_reference_id: z.string(),
  name: z.string(),
  nasa_jpl_url: z.string(),
  absolute_magnitude_h: z.number(),
  estimated_diameter: EstimatedDiameterSchema,
  is_potentially_hazardous_asteroid: z.boolean(),
  close_approach_data: z.array(CloseApproachDataSchema),
  is_sentry_object: z.boolean(),
});

// Feed response schema
export const NeoFeedResponseSchema = z.object({
  element_count: z.number(),
  near_earth_objects: z.record(z.array(NeoSchema)),
});

// Types
export type EstimatedDiameterRange = z.infer<typeof EstimatedDiameterRangeSchema>;
export type EstimatedDiameter = z.infer<typeof EstimatedDiameterSchema>;
export type CloseApproachData = z.infer<typeof CloseApproachDataSchema>;
export type Neo = z.infer<typeof NeoSchema>;
export type NeoFeedResponse = z.infer<typeof NeoFeedResponseSchema>;

// Simplified NEO for UI
export interface NeoSummary {
  id: string;
  name: string;
  absoluteMagnitude: number;
  estimatedDiameterMin: number; // km
  estimatedDiameterMax: number; // km
  isPotentiallyHazardous: boolean;
  closestApproach: {
    date: string;
    distanceKm: number;
    distanceAu: number;
    distanceLunar: number;
    velocityKmPerSec: number;
    velocityKmPerHour: number;
  } | null;
  nasaUrl: string;
}

// Search params
export interface NeoSearchParams {
  startDate: string;
  endDate: string;
}

// Sort options
export type NeoSortOption = 'date' | 'distance' | 'diameter' | 'velocity';
