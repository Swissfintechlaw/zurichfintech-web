import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Prose, { type ProseSection } from '@/components/page/Prose';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/legal-notice', metaKey: 'legalNotice' });
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legalNotice' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/legal-notice' },
  ]);

  return (
    <>
      <JsonLd data={trail.jsonLd} />
      <main>
        <PageIntro eyebrow={t('title')} title={t('title')} crumbs={trail.crumbs} />
        <Section compact>
          <Prose sections={t.raw('sections') as ProseSection[]} />
        </Section>
      </main>
    </>
  );
}
