import { site } from '@/lib/site';

export type JsonLd = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const FOUNDER_ID = `${site.url}/#gregory-aillaud`;

/**
 * The firm as a LegalService (a subtype of Organization). Emitted on every
 * page from the locale layout; the description is the only translated part.
 */
export function organizationJsonLd(description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Organization'],
    '@id': ORG_ID,
    name: site.legalName,
    legalName: site.legalName,
    alternateName: site.name,
    url: site.url,
    description,
    telephone: site.phone,
    email: site.email,
    vatID: site.vatId,
    taxID: site.vatId,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.regionCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: { '@type': 'Country', name: 'Switzerland', identifier: 'CH' },
    openingHours: site.openingHours.schema,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    knowsLanguage: ['en', 'de', 'fr'],
    founder: { '@id': FOUNDER_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.phone,
      email: site.email,
      availableLanguage: ['English', 'German', 'French'],
    },
  };
}

/** The site itself, emitted on the home page only. */
export function websiteJsonLd(name: string, description: string, inLanguage: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name,
    description,
    inLanguage,
    publisher: { '@id': ORG_ID },
  };
}

/** Grégory Aillaud as a Person, linked to the organisation. */
export function founderJsonLd(description: string, sameAs: string[] = []): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: site.founder.name,
    givenName: site.founder.givenName,
    familyName: site.founder.familyName,
    jobTitle: site.founder.jobTitle,
    description,
    worksFor: { '@id': ORG_ID },
    affiliation: { '@id': ORG_ID },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** A team member who is not the founder. */
export function personJsonLd(name: string, jobTitle: string, description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    worksFor: { '@id': ORG_ID },
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqJsonLd(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export interface ArticleInput {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  inLanguage: string;
}

export function articleJsonLd(input: ArticleInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: input.inLanguage,
    mainEntityOfPage: input.url,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}
