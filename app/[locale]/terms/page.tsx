import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import en from '@/i18n/messages/en.json';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Prose from '@/components/page/Prose';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/terms', metaKey: 'terms' });
}

/**
 * The terms exist in English only (migrated verbatim). Other locales show
 * the English text with a note that the English version prevails.
 */
export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const localised = t.raw('paragraphs') as string[];
  const paragraphs = localised.length > 0 ? localised : en.terms.paragraphs;
  const fallback = localised.length === 0 && locale !== 'en';

  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/terms' },
  ]);

  return (
    <>
      <JsonLd data={trail.jsonLd} />
      <main>
        <PageIntro eyebrow={t('title')} title={t('title')} intro={t('subtitle')} crumbs={trail.crumbs} />
        <Section compact>
          <Prose sections={[{ paragraphs }]} note={fallback ? common('englishPrevails') : undefined} />
        </Section>
      </main>
    </>
  );
}
