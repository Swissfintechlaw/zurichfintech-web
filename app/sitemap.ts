import type { MetadataRoute } from 'next';
import { routing, type Route } from '@/i18n/routing';
import { GUIDES } from '@/content/guides';
import { absoluteUrl, languageAlternates } from '@/lib/seo';

/** Content last reviewed; bump when copy changes materially. */
const CONTENT_DATE = new Date('2026-11-09');

const PRIORITY: Partial<Record<Route, number>> = {
  '/': 1,
  '/company-formation': 0.9,
  '/domicile': 0.9,
  '/innovation': 0.9,
  '/services': 0.8,
  '/about': 0.7,
  '/contact': 0.7,
  '/knowledge': 0.6,
  '/legal-notice': 0.3,
  '/privacy-policy': 0.3,
  '/terms': 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = (Object.keys(routing.pathnames) as Route[]).filter((r) => r !== '/knowledge/[slug]');

  const pages = staticRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(route, locale),
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: PRIORITY[route] ?? 0.5,
      alternates: { languages: languageAlternates(route) },
    })),
  );

  const guides = GUIDES.flatMap((guide) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl('/knowledge/[slug]', locale, { slug: guide.slug }),
      lastModified: new Date(guide.published),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: { languages: languageAlternates('/knowledge/[slug]', { slug: guide.slug }) },
    })),
  );

  return [...pages, ...guides];
}
