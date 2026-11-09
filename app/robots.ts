import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * Every crawler is welcome, including the AI answer engines, which are
 * named explicitly so a future per-bot rule has somewhere to go.
 */
const CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Claude-SearchBot',
  'Claude-User',
  '*',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
