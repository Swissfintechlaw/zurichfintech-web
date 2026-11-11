'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { site } from '@/lib/site';

/**
 * Header copied from the original Squarespace site: wordmark left, four menu
 * items right, "Services" opens a dropdown of the four practice areas.
 * It is not sticky (it scrolls away with the page). On the home page it sits
 * transparently over the hero image; elsewhere it is white with a soft shadow.
 */
const SERVICE_LINKS = [
  { hash: 'corporate', key: 'corporate' },
  { hash: 'fintech', key: 'fintech' },
  { hash: 'venture-capital', key: 'venture' },
  { hash: 'manda', key: 'ma' },
] as const;

export default function Header() {
  const t = useTranslations('sq.nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  const isHome = pathname === '/';
  const onDark = isHome && !open;
  const textColor = onDark ? 'text-[#fafafa]' : 'text-ink-800';
  const current = (href: string) => (pathname === href ? 'page' : undefined);
  const linkCls =
    'border-b border-transparent pb-px leading-[1.3] transition-opacity duration-200 hover:opacity-70 aria-[current=page]:border-current';

  return (
    <header
      className={`inset-x-0 top-0 z-50 ${
        isHome ? 'absolute' : 'relative bg-white shadow-[0_2px_20px_rgba(0,0,0,0.12)]'
      } ${textColor}`}
    >
      <div className="sq-gutter flex h-[74px] items-center justify-between md:h-[88px]">
        <Link
          href="/"
          className="relative z-50 text-[length:var(--fs-logo)] leading-[1.1] tracking-[-0.02em]"
          aria-label={`${site.legalName}, ${t('home')}`}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-[2vw] text-[14.27px]">
            <li>
              <Link href="/" aria-current={current('/')} className={linkCls}>
                {t('home')}
              </Link>
            </li>
            <li className="group relative">
              <Link
                href="/services"
                aria-current={current('/services')}
                aria-haspopup="true"
                className={linkCls}
              >
                {t('services')}
              </Link>
              {/* Dropdown: opens on hover and on keyboard focus */}
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="min-w-[190px] bg-white px-5 py-3 text-ink-800 shadow-[0_2px_20px_rgba(0,0,0,0.12)]">
                  {SERVICE_LINKS.map(({ hash, key }) => (
                    <li key={hash}>
                      <Link
                        href={{ pathname: '/services', hash }}
                        className="block py-1.5 whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
                      >
                        {t(key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="/about" aria-current={current('/about')} className={linkCls}>
                {t('team')}
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/', hash: 'contact' }} className={linkCls}>
                {t('contact')}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile: two-line burger, full-screen menu */}
        <button
          type="button"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('closeMenu') : t('openMenu')}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[7px] md:hidden"
        >
          <span
            className={`block h-px w-7 bg-current transition-transform duration-200 ${open ? 'translate-y-[4px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-7 bg-current transition-transform duration-200 ${open ? '-translate-y-[4px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="fixed inset-0 z-40 overflow-y-auto bg-white pt-[110px] md:hidden">
          <ul className="flex flex-col items-center gap-5 text-[28px] leading-tight tracking-[-0.02em] text-ink-800">
            <li>
              <Link href="/">{t('home')}</Link>
            </li>
            <li>
              <Link href="/services">{t('services')}</Link>
              <ul className="mt-3 flex flex-col items-center gap-2 text-[18px]">
                {SERVICE_LINKS.map(({ hash, key }) => (
                  <li key={hash}>
                    <Link href={{ pathname: '/services', hash }} onClick={() => setOpen(false)}>
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href="/about">{t('team')}</Link>
            </li>
            <li>
              <Link href={{ pathname: '/', hash: 'contact' }} onClick={() => setOpen(false)}>
                {t('contact')}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
