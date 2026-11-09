import { useTranslations } from 'next-intl';
import { Link, type Route } from '@/i18n/routing';
import Wordmark from '@/components/brand/Wordmark';
import { mailHref, site, telHref } from '@/lib/site';

type FooterRoute = Exclude<Route, '/' | '/knowledge/[slug]'>;

const COLUMNS: { key: 'services' | 'firm' | 'legal'; links: { href: FooterRoute; label: string }[] }[] = [
  {
    key: 'services',
    links: [
      { href: '/services', label: 'nav.services' },
      { href: '/company-formation', label: 'nav.formation' },
      { href: '/domicile', label: 'nav.domicile' },
      { href: '/innovation', label: 'nav.innovation' },
    ],
  },
  {
    key: 'firm',
    links: [
      { href: '/about', label: 'nav.about' },
      { href: '/knowledge', label: 'nav.knowledge' },
      { href: '/contact', label: 'nav.contact' },
    ],
  },
  {
    key: 'legal',
    links: [
      { href: '/legal-notice', label: 'footer.legalNotice' },
      { href: '/privacy-policy', label: 'footer.privacy' },
      { href: '/terms', label: 'footer.terms' },
    ],
  },
];

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-surface-ink">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="inverse" underline className="max-w-xs" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">{t('footer.tagline')}</p>
            <address className="mt-8 space-y-2 font-mono text-xs not-italic leading-relaxed text-ink-400">
              <p>
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}, {site.address.country}
              </p>
              <p>
                <a href={telHref} className="transition-colors duration-200 hover:text-sand-100">
                  {site.phone}
                </a>
                <br />
                <a href={mailHref} className="transition-colors duration-200 hover:text-sand-100">
                  {site.email}
                </a>
              </p>
              <p>{t('footer.hours')}</p>
            </address>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.key} aria-label={t(`footer.columns.${column.key}`)} className="lg:col-span-2">
              <p className="eyebrow text-bronze-500">{t(`footer.columns.${column.key}`)}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-300 transition-colors duration-200 hover:text-sand-50"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-800 pt-6 font-sans text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {t('footer.rights')}
          </p>
          <p className="font-mono">{site.vatIdDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
