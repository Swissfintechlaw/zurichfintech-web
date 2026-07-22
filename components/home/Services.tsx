import { useTranslations } from 'next-intl';
import { Scale, Cpu, Landmark, Handshake } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';

/** Lucide stands in for a bespoke icon set — swap if a real one exists. */
const SERVICES = [
  { key: 'legal', Icon: Scale },
  { key: 'innovation', Icon: Cpu },
  { key: 'compliance', Icon: Landmark },
  { key: 'advisory', Icon: Handshake },
] as const;

export default function Services() {
  const t = useTranslations('home.services');

  return (
    <section id="services" className="bg-surface-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-bronze-500">{t('title')}</p>
          <h2 className="mt-6 font-serif text-4xl font-normal leading-tight text-sand-50 lg:text-5xl">
            {t('subtitle')}
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ key, Icon }, index) => (
            <AnimatedSection key={key} delay={index * 0.08}>
              <Card className="h-full p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-sand-200">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-5 w-5 text-bronze-700"
                  />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug text-ink-900">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {t(`${key}.description`)}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
