import { useTranslations } from 'next-intl';
import { ArrowRight, Building2, Landmark, Lightbulb } from 'lucide-react';
import { Link, type AppHref } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import Section from '@/components/page/Section';

const ITEMS: { key: 'innovation' | 'formation' | 'domicile'; href: AppHref; Icon: typeof Lightbulb }[] = [
  { key: 'innovation', href: '/innovation', Icon: Lightbulb },
  { key: 'formation', href: '/company-formation', Icon: Landmark },
  { key: 'domicile', href: '/domicile', Icon: Building2 },
];

export default function EntryCards() {
  const t = useTranslations('home.entry');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-6 md:grid-cols-3">
        {ITEMS.map(({ key, href, Icon }, index) => (
          <AnimatedSection key={key} delay={index * 0.08} className="h-full">
            <Card className="flex h-full flex-col p-8">
              <Icon aria-hidden="true" strokeWidth={1.5} className="h-6 w-6 text-bronze-600" />
              <h3 className="mt-6 font-serif text-2xl font-normal leading-snug text-ink-900">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">{t(`items.${key}.description`)}</p>
              <Link
                href={href}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors duration-200 hover:text-bronze-700"
              >
                {t(`items.${key}.cta`)}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
