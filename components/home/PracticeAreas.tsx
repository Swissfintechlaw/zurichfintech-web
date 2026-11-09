import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Section from '@/components/page/Section';

const ITEMS = ['corporate', 'regulatory', 'venture', 'ma'] as const;

export default function PracticeAreas() {
  const t = useTranslations('home.practice');

  return (
    <Section id="practice" tone="sunk" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {ITEMS.map((key, index) => (
          <AnimatedSection key={key} delay={index * 0.06}>
            <div className="border-t border-ink-300 pt-6">
              <p className="font-mono text-xs tracking-[0.12em] text-bronze-600">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-normal leading-snug text-ink-900">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{t(`items.${key}.description`)}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <Link
        href="/services"
        className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors duration-200 hover:text-bronze-700"
      >
        {t('cta')}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </Section>
  );
}
