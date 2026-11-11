import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { websiteJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';
import Hero from '@/components/home/Hero';
import ServicesGrid from '@/components/home/ServicesGrid';
import TeamGrid from '@/components/home/TeamGrid';
import ContactSection from '@/components/home/ContactSection';

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
        <ServicesGrid />
        <TeamGrid />
        <ContactSection />
      </main>
    </>
  );
}
