const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch data from Strapi API
 * @param endpoint - API endpoint (e.g., '/api/articles')
 * @param options - Fetch options
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_API_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get the full URL for a Strapi media file
 * @param url - The URL from Strapi (can be relative or absolute)
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_API_URL}${url}`;
}

export { STRAPI_API_URL };
