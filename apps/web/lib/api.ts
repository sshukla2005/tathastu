const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Helper to fetch from Strapi.
 * Automatically handles populates, headers, and caches.
 */
export async function fetchStrapi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${path.startsWith("/") ? path : `/${path}`}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch from Strapi: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const json = await response.json();
  return json as T;
}

/**
 * Get the full URL for a Strapi media asset.
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}
