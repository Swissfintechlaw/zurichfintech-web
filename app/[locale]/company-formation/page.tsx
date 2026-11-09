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
import Card from '@/components/ui/Card';

type Props = { params: Promise<{ locale: Locale }> };

interface Step {
  title: string;
  description: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/company-formation', metaKey: 'formation' });
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
          <Check aria-hidden="true" strokeWidth={1.5} className="mt-1 h-4 w-4 shrink-0 text-bronze-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CompanyFormationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'formation' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const faq = t.raw('faq') as FaqItem[];
  const steps = t.raw('timeline.steps') as Step[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/company-formation' },
  ]);

  return (
    <>
      <JsonLd data={[trail.jsonLd, faqJsonLd(faq)]} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />

        <Section id="forms" eyebrow={t('forms.eyebrow')} title={t('forms.title')} intro={t('forms.intro')}>
          <div className="grid gap-6 md:grid-cols-2">
            {(['gmbh', 'ag'] as const).map((form) => (
              <Card key={form} className="p-8">
                <h3 className="font-serif text-2xl font-normal leading-snug text-ink-900">{t(`forms.${form}.title`)}</h3>
                <div className="mt-6">
                  <CheckList items={t.raw(`forms.${form}.points`) as string[]} />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="included" tone="sunk" eyebrow={t('included.eyebrow')} title={t('included.title')}>
          <div className="max-w-3xl">
            <CheckList items={t.raw('included.items') as string[]} />
          </div>
        </Section>

        <Section id="timeline" eyebrow={t('timeline.eyebrow')} title={t('timeline.title')} intro={t('timeline.intro')}>
          <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-ink-300 pt-5">
                <p className="font-mono text-xs tracking-[0.12em] text-bronze-600">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-base font-bold leading-snug text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="documents" tone="sunk" eyebrow={t('documents.eyebrow')} title={t('documents.title')}>
          <div className="max-w-3xl">
            <CheckList items={t.raw('documents.items') as string[]} />
          </div>
        </Section>

        <Section id="foreign-founders" eyebrow={t('foreign.eyebrow')} title={t('foreign.title')}>
          <div className="max-w-3xl space-y-5">
            {(t.raw('foreign.paragraphs') as string[]).map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-ink-700">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12 max-w-3xl rounded-md border border-bronze-300 bg-bronze-100/50 px-6 py-5">
            <p className="eyebrow text-bronze-700">{t('fees.title')}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{t('fees.text')}</p>
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
