/**
 * Single source of truth for firm details that are NOT translated —
 * they read the same in every locale.
 *
 * Source: Commercial Register of the Canton of Zug and the firm's legal
 * notice (verified 9 November 2026).
 */
export const site = {
  /** Short brand name used in the wordmark */
  name: 'Swiss Fintech Law',
  legalName: 'Swiss Fintech Law AG',
  /** Canonical origin — no trailing slash */
  url: 'https://www.swisstechlaw.com',
  phone: '+41 77 962 50 22',
  email: 'contact@swisstechlaw.com',
  /** UID / VAT number as registered */
  vatId: 'CHE-201.843.628',
  vatIdDisplay: 'CHE-201.843.628 MWST',
  address: {
    street: 'Hinterbergstrasse 53',
    postalCode: '6312',
    locality: 'Steinhausen',
    region: 'Canton Zug',
    regionCode: 'ZG',
    country: 'Switzerland',
    countryCode: 'CH',
  },
  /** One-line postal address for display */
  addressLine: 'Hinterbergstrasse 53, 6312 Steinhausen, Canton Zug, Switzerland',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Hinterbergstrasse+53%2C+6312+Steinhausen%2C+Switzerland',
  /** Managing director and authorised representative */
  founder: {
    name: 'Grégory Aillaud',
    givenName: 'Grégory',
    familyName: 'Aillaud',
    jobTitle: 'Senior Lawyer, Managing Director',
  },
  /** Office hours, local time (Europe/Zurich) */
  openingHours: {
    display: 'Mon–Fri 09:00–18:00',
    schema: 'Mo-Fr 09:00-18:00',
  },
  /** Working languages, in the order offered on the site */
  languages: ['English', 'German', 'French'],
} as const;

export const telHref = `tel:${site.phone.replace(/\s/g, '')}`;
export const mailHref = `mailto:${site.email}`;
