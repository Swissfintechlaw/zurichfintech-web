import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Footer copied from the original Squarespace site: firm name, then three
 * centred columns (Category / Related / Legal information). The only
 * addition is a discreet language row, needed for the EN/FR/DE versions.
 */
const EXTRA_PAGES = [
  { href: '/company-formation', key: 'formation' },
  { href: '/domicile', key: 'domicile' },
  { href: '/innovation', key: 'innovation' },
  { href: '/knowledge', key: 'knowledge' },
] as const;

export default function Footer() {
  const t = useTranslations('sq.footer');
  const nav = useTranslations('nav');
  const link = 'text-[#dcdcdc] underline underline-offset-2 decoration-1 hover:opacity-70';

  return (
    <footer className="bg-[#242424] text-[#fafafa]">
      <div className="sq-gutter py-[40px] md:py-[38px]">
        <p className="text-center text-[22.72px] leading-[1.08] tracking-[-0.02em]">{site.legalName}</p>

        <div className="mt-[44px] grid gap-8 text-center md:grid-cols-3 md:gap-[11px]">
          <nav aria-label={t('category')}>
            <p className="text-[17.68px] font-bold leading-[1.3]">{t('category')}</p>
            <ul className="mt-4 text-[14.27px] leading-[1.3]">
              <li>
                <Link href="/services" className={link}>
                  {t('services')}
                </Link>
              </li>
              {/* Pages added for AI search; not in the Squarespace menu, linked here only. */}
              {EXTRA_PAGES.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className={link}>
                    {nav(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className={link}>
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={{ pathname: '/', hash: 'contact' }} className={link}>
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t('related')}>
            <p className="text-[17.68px] font-bold leading-[1.3]">{t('related')}</p>
            <ul className="mt-4 text-[14.27px] leading-[1.3]">
              <li>
                <a href="https://www.swissfintechlodge.com/" target="_blank" rel="noopener" className={link}>
                  {t('lodge')}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t('legal')}>
            <p className="text-[17.68px] font-bold leading-[1.3]">{t('legal')}</p>
            <ul className="mt-4 text-[14.27px] leading-[1.3]">
              <li>
                <Link href="/terms" className={link}>
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/legal-notice" className={link}>
                  {t('legalNotice')}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={link}>
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex justify-center text-[#dcdcdc]" aria-label={t('language')}>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
