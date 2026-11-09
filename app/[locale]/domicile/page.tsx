import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { faqJsonLd, type FaqItem } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Faq from '@/components/page/Faq';
import CtaBanner from '@/components/page/CtaBanner';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/domicile', metaKey: 'domicile' });
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {items.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-ink-700">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
          <Check aria-hidden="true" strokeWidth={1.5} className="mt-1 h-4 w-4 shrink-0 text-bronze-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function DomicilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'domicile' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const faq = t.raw('faq') as FaqItem[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/domicile' },
  ]);

  return (
    <>
      <JsonLd data={[trail.jsonLd, faqJsonLd(faq)]} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />

        <Section id="who" eyebrow={t('who.eyebrow')} title={t('who.title')}>
          <Paragraphs items={t.raw('who.paragraphs') as string[]} />
        </Section>

        <Section id="amla" tone="sunk" eyebrow={t('amla.eyebrow')} title={t('amla.title')}>
          <Paragraphs items={t.raw('amla.paragraphs') as string[]} />
        </Section>

        <Section id="included" eyebrow={t('included.eyebrow')} title={t('included.title')}>
          <CheckList items={t.raw('included.items') as string[]} />
        </Section>

        <Section id="onboarding" tone="sunk" eyebrow={t('supply.eyebrow')} title={t('supply.title')}>
          <CheckList items={t.raw('supply.items') as string[]} />
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-600">{common('feesOnRequest')}</p>
        </Section>

        <Section eyebrow="FAQ" title={common('faqTitle')}>
          <Faq items={faq} />
        </Section>

        <CtaBanner title={t('cta.title')} text={t('cta.text')} cta={t('cta.cta')} />
      </main>
    </>
  );
}
