import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { faqJsonLd, type FaqItem } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Faq from '@/components/page/Faq';
import CtaBanner from '@/components/page/CtaBanner';

type Props = { params: Promise<{ locale: Locale }> };

interface Area {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/innovation', metaKey: 'innovation' });
}

export default async function InnovationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'innovation' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const areas = t.raw('areas') as Area[];
  const faq = t.raw('faq') as FaqItem[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/innovation' },
  ]);

  return (
    <>
      <JsonLd data={[trail.jsonLd, faqJsonLd(faq)]} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />

        <Section>
          <div className="divide-y divide-ink-200 border-t border-ink-200">
            {areas.map((area, index) => (
              <article key={area.id} id={area.id} className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="font-mono text-xs tracking-[0.12em] text-bronze-600">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl font-normal leading-snug text-ink-900 lg:text-3xl">
                    {area.title}
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-base leading-relaxed text-ink-700">{area.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-bronze-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="sunk" eyebrow="FAQ" title={common('faqTitle')}>
          <Faq items={faq} />
        </Section>

        <CtaBanner title={t('cta.title')} text={t('cta.text')} cta={t('cta.cta')} />
      </main>
    </>
  );
}
