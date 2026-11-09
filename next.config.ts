import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const CANONICAL_HOST = 'www.swisstechlaw.com';

/**
 * Hosts that must 301 to the canonical www.swisstechlaw.com. These run in
 * next.config, i.e. before the next-intl proxy, so the locale redirect only
 * ever happens on the canonical host.
 */
const LEGACY_HOSTS = [
  'swisstechlaw.com',
  'zurichfintech.com',
  'www.zurichfintech.com',
  'swissbl.com',
  'www.swissbl.com',
];

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return LEGACY_HOSTS.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: `https://${CANONICAL_HOST}/:path*`,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
