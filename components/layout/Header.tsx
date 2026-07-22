'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Wordmark from '@/components/brand/Wordmark';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/knowledge', key: 'knowledge' },
  { href: '/docs', key: 'docs' },
] as const;

export default function Header() {
  const nav = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-200 bg-surface-warm/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link href="/" aria-label={`${nav('home')} — Swiss FinTech Law`}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(({ href, key }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm transition-colors duration-200 ${
                  isActive ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                {nav(key)}
              </Link>
            );
          })}

          <a
            href="#contact"
            className="text-sm text-ink-600 transition-colors duration-200 hover:text-ink-900"
          >
            {nav('contact')}
          </a>

          <span aria-hidden="true" className="h-4 w-px bg-ink-200" />

          <LanguageSwitcher />
        </nav>

        {/* On small screens the nav links collapse, but the language
            switcher stays reachable. */}
        <div className="md:hidden">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
