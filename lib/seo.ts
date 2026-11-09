import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type AppHref, type Locale, type Route } from '@/i18n/routing';
import { site } from '@/lib/site';
import { breadcrumbJsonLd, type JsonLd } from '@/lib/jsonld';
import type { BreadcrumbItem } from '@/components/page/PageIntro';

type Params = Record<string, string>;

/** Locale-prefixed path for a route, e.g. `/de/firmengruendung`. */
export function localizedPath(route: Route, locale: Locale, params?: Params): string {
  const entry = routing.pathnames[route];
  let path: string = typeof entry === 'string' ? entry : entry[locale];
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`[${key}]`, value);
    }
  }
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Absolute canonical URL for a route in a locale. */
export function absoluteUrl(route: Route, locale: Locale, params?: Params): string {
  return `${site.url}${localizedPath(route, locale, params)}`;
}

/** hreflang map for a route: every locale plus x-default (English). */
export function languageAlternates(route: Route, params?: Params): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(route, locale, params);
  }
  languages['x-default'] = absoluteUrl(route, routing.defaultLocale, params);
  return languages;
}

interface PageMetadataInput {
  locale: Locale;
  route: Route;
  /** Key under `meta` in the message files; ignored when title/description are given */
  metaKey?: string;
  title?: string;
  description?: string;
  params?: Params;
}

/**
 * Builds the per-page metadata: title (the layout template appends
 * " | Swiss Fintech Law AG"), description, canonical and hreflang alternates.
 */
export async function pageMetadata({
  locale,
  route,
  metaKey,
  title,
  description,
  params,
}: PageMetadataInput): Promise<Metadata> {
  let resolvedTitle = title;
  let resolvedDescription = description;
  if (metaKey) {
    const t = await getTranslations({ locale, namespace: 'meta' });
    resolvedTitle ??= t(`${metaKey}.title`);
    resolvedDescription ??= t(`${metaKey}.description`);
  }
  const canonical = absoluteUrl(route, locale, params);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: languageAlternates(route, params),
    },
    openGraph: {
      title: resolvedTitle ? `${resolvedTitle} | ${site.legalName}` : site.legalName,
      description: resolvedDescription,
      url: canonical,
      siteName: site.legalName,
      locale,
      type: 'website',
    },
  };
}

export interface TrailItem {
  label: string;
  route: Route;
  params?: Params;
}

/**
 * One breadcrumb definition, two outputs: the visible trail for PageIntro
 * and the matching BreadcrumbList JSON-LD, so the two never disagree.
 */
export function breadcrumbs(locale: Locale, items: TrailItem[]): { crumbs: BreadcrumbItem[]; jsonLd: JsonLd } {
  const crumbs: BreadcrumbItem[] = items.map((item) => ({
    label: item.label,
    href: (item.params ? { pathname: item.route, params: item.params } : item.route) as AppHref,
  }));
  const jsonLd = breadcrumbJsonLd(
    items.map((item) => ({ name: item.label, url: absoluteUrl(item.route, locale, item.params) })),
  );
  return { crumbs, jsonLd };
}
