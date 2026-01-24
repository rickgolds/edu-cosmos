import { z } from 'zod';

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Enhanced fetch wrapper with error handling and timeout
 */
export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new FetchError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new FetchError('Request timeout');
      }
      throw error;
    }

    throw new FetchError('An unknown error occurred');
  }
}

/**
 * Fetch with Zod validation
 */
export async function fetchWithValidation<T>(
  url: string,
  schema: z.ZodType<T>,
  options?: FetchOptions
): Promise<T> {
  const data = await fetcher<unknown>(url, options);
  return schema.parse(data);
}

/**
 * Build URL with query parameters
 */
export function buildUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}
