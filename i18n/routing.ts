import type { ComponentProps } from 'react';
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Every public route of swisstechlaw.com with its localised slug.
 * English is the authoritative locale; the sitemap, hreflang alternates
 * and breadcrumbs are all derived from this table so they never drift.
 */
export const routing = defineRouting({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      fr: '/services',
      de: '/leistungen',
    },
    '/company-formation': {
      en: '/company-formation',
      fr: '/constitution-de-societe',
      de: '/firmengruendung',
    },
    '/domicile': {
      en: '/domicile',
      fr: '/domiciliation-zoug',
      de: '/domiziladresse-zug',
    },
    '/innovation': '/innovation',
    '/about': {
      en: '/about',
      fr: '/a-propos',
      de: '/ueber-uns',
    },
    '/contact': {
      en: '/contact',
      fr: '/contact',
      de: '/kontakt',
    },
    '/knowledge': {
      en: '/knowledge',
      fr: '/savoir',
      de: '/wissen',
    },
    '/knowledge/[slug]': {
      en: '/knowledge/[slug]',
      fr: '/savoir/[slug]',
      de: '/wissen/[slug]',
    },
    '/legal-notice': {
      en: '/legal-notice',
      fr: '/mentions-legales',
      de: '/impressum',
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      fr: '/protection-des-donnees',
      de: '/datenschutz',
    },
    '/terms': {
      en: '/terms',
      fr: '/conditions-generales',
      de: '/agb',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Route = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/** The typed `href` accepted by the localised Link (string routes or {pathname, params}). */
export type AppHref = ComponentProps<typeof Link>['href'];
