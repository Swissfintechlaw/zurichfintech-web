import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/knowledge': {
      en: '/knowledge',
      fr: '/savoir',
      de: '/wissen'
    },
    '/docs': {
      en: '/docs',
      fr: '/documentation',
      de: '/dokumentation'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
