/**
 * Single source of truth for firm details that are NOT translated —
 * they read the same in every locale.
 *
 * NOTE: these values came from the design mockup and are unconfirmed.
 * Verify against the real firm records before going to production.
 */
export const site = {
  name: 'Swiss FinTech Law',
  legalName: 'Swiss Fintech Law AG',
  phone: '+41 77 962 50 22',
  email: 'contact@swisstechlaw.com',
  address: 'Hinterbergstrasse 53, 6312 Steinhausen',
} as const;
