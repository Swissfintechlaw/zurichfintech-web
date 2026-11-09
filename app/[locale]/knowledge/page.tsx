import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import { GUIDES } from '@/content/guides';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Card from '@/components/ui/Card';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/knowledge', metaKey: 'knowledge' });
}

export default async function KnowledgePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'knowledge' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'long' });

  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/knowledge' },
  ]);

  return (
    <>
      <JsonLd data={trail.jsonLd} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />
        <Section>
          <div className="grid gap-6 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <Card key={guide.slug} className="flex h-full flex-col p-8">
                <p className="font-mono text-xs tracking-[0.08em] text-ink-500">
                  {common('published')}{' '}
                  <time dateTime={guide.published}>{dateFormat.format(new Date(guide.published))}</time>
                </p>
                <h2 className="mt-4 font-serif text-2xl font-normal leading-snug text-ink-900">
                  {t(`guides.${guide.slug}.title`)}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">{t(`guides.${guide.slug}.summary`)}</p>
                <Link
                  href={{ pathname: '/knowledge/[slug]', params: { slug: guide.slug } }}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors duration-200 hover:text-bronze-700"
                >
                  {common('readGuide')}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
