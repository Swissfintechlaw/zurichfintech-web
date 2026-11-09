'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, type Route } from '@/i18n/routing';
import Wordmark from '@/components/brand/Wordmark';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS: { href: Exclude<Route, '/' | '/knowledge/[slug]'>; key: string }[] = [
  { href: '/services', key: 'services' },
  { href: '/company-formation', key: 'formation' },
  { href: '/domicile', key: 'domicile' },
  { href: '/innovation', key: 'innovation' },
  { href: '/knowledge', key: 'knowledge' },
  { href: '/about', key: 'about' },
];

export default function Header() {
  const nav = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu whenever the route changes (state adjusted during render, no effect needed).
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-200 bg-surface-warm/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link href="/" aria-label={nav('wordmarkLabel')}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`text-sm transition-colors duration-200 ${
                isActive(href) ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {nav(key)}
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-md border border-ink-300 px-4 py-2 text-sm text-ink-800 transition-colors duration-200 hover:border-ink-400 hover:bg-sand-50"
          >
            {nav('contact')}
          </Link>

          <span aria-hidden="true" className="h-4 w-px bg-ink-200" />

          <LanguageSwitcher />
        </nav>

        {/* Small screens: language switcher stays reachable, links collapse
            behind a single toggle. */}
        <div className="flex items-center gap-5 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav('closeMenu') : nav('openMenu')}
            className="text-ink-800 transition-colors duration-200 hover:text-ink-900"
          >
            {open ? (
              <X aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-ink-200 bg-surface-warm lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {[...NAV_ITEMS, { href: '/contact' as const, key: 'contact' }].map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`block border-b border-ink-100 py-3.5 text-base ${
                    isActive(href) ? 'text-ink-900' : 'text-ink-700'
                  }`}
                >
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
