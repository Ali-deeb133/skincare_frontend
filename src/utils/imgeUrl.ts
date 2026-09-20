export function getOptimizedImageUrl(originalUrl: string, width: number = 400): string {
  const cleanUrl = originalUrl.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}`;
}