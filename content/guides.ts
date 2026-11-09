/**
 * Knowledge guides. The slug is shared across locales; the text lives in
 * i18n/messages/<locale>.json under `knowledge.guides.<slug>`.
 * `published` is the date shown on the page and in the sitemap (ISO 8601).
 */
export const GUIDES = [
  { slug: 'domicile-revised-amla-2026', published: '2026-11-09' },
  { slug: 'gmbh-vs-ag-swiss-startup', published: '2026-11-09' },
  { slug: 'swiss-representative-revdsg', published: '2026-11-09' },
] as const;

export type GuideSlug = (typeof GUIDES)[number]['slug'];

export function isGuideSlug(slug: string): slug is GuideSlug {
  return GUIDES.some((g) => g.slug === slug);
}
