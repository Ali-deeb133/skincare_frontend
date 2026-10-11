import { API_BASE_URL } from '../config';

export function getOptimizedImageUrl(originalUrl: string, width: number = 400): string {
  const cleanUrl = originalUrl.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}`;
}

// `path` is the product's `url` field, a file path inside the backend's
// /media/ folder.
export function getProductImageUrl(path: string, width: number = 400): string {
  return getOptimizedImageUrl(`${API_BASE_URL}/media/${path}`, width);
}
