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
  intro: string;
  items: { title: string; description: string }[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/services', metaKey: 'services' });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const areas = t.raw('areas') as Area[];
  const faq = t.raw('faq') as FaqItem[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/services' },
  ]);

  return (
    <>
      <JsonLd data={[trail.jsonLd, faqJsonLd(faq)]} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />

        {areas.map((area, index) => (
          <Section
            key={area.id}
            id={area.id}
            tone={index % 2 === 0 ? 'light' : 'sunk'}
            eyebrow={String(index + 1).padStart(2, '0')}
            title={area.title}
            intro={area.intro}
          >
            <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
              {area.items.map((item) => (
                <div key={item.title} className="border-t border-ink-300 pt-5">
                  <h3 className="text-base font-bold leading-snug text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>
        ))}

        <Section tone={areas.length % 2 === 0 ? 'light' : 'sunk'} eyebrow="FAQ" title={common('faqTitle')}>
          <Faq items={faq} />
        </Section>

        <CtaBanner title={t('cta.title')} text={t('cta.text')} cta={t('cta.cta')} />
      </main>
    </>
  );
}
