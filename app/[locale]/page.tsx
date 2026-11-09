import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { websiteJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';
import Hero from '@/components/home/Hero';
import EntryCards from '@/components/home/EntryCards';
import PracticeAreas from '@/components/home/PracticeAreas';
import TeamTeaser from '@/components/home/TeamTeaser';
import Contact from '@/components/home/Contact';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/', metaKey: 'home' });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });

  return (
    <>
      <JsonLd data={websiteJsonLd(site.legalName, t('siteDescription'), locale)} />
      <main>
        <Hero />
        <EntryCards />
        <PracticeAreas />
        <TeamTeaser />
        <Contact />
      </main>
    </>
  );
}
