import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link, routing, type Locale } from '@/i18n/routing';
import { GUIDES, isGuideSlug } from '@/content/guides';
import { absoluteUrl, breadcrumbs, pageMetadata } from '@/lib/seo';
import { articleJsonLd } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Prose, { type ProseSection } from '@/components/page/Prose';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => GUIDES.map((guide) => ({ locale, slug: guide.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isGuideSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: 'knowledge' });
  const meta = await pageMetadata({
    locale,
    route: '/knowledge/[slug]',
    params: { slug },
    title: t(`guides.${slug}.title`),
    description: t(`guides.${slug}.summary`),
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article' } };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isGuideSlug(slug)) notFound();
  setRequestLocale(locale);

  const guide = GUIDES.find((g) => g.slug === slug)!;
  const t = await getTranslations({ locale, namespace: 'knowledge' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'long' });

  const title = t(`guides.${slug}.title`);
  const summary = t(`guides.${slug}.summary`);
  const sections: ProseSection[] = (t.raw(`guides.${slug}.sections`) as GuideSection[]).map((s) => ({
    title: s.heading,
    paragraphs: s.paragraphs,
  }));

  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/knowledge' },
    { label: title, route: '/knowledge/[slug]', params: { slug } },
  ]);

  return (
    <>
      <JsonLd
        data={[
          trail.jsonLd,
          articleJsonLd({
            url: absoluteUrl('/knowledge/[slug]', locale, { slug }),
            headline: title,
            description: summary,
            datePublished: guide.published,
            inLanguage: locale,
          }),
        ]}
      />
      <main>
        <PageIntro
          eyebrow={t('eyebrow')}
          title={title}
          intro={summary}
          crumbs={trail.crumbs}
          dateline={`${common('published')} ${dateFormat.format(new Date(guide.published))}`}
        />
        <Section compact>
          <article>
            <Prose sections={sections} />
          </article>
          <Link
            href="/knowledge"
            className="group mt-14 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors duration-200 hover:text-bronze-700"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {common('allGuides')}
          </Link>
        </Section>
      </main>
    </>
  );
}
