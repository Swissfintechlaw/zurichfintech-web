import { useTranslations } from 'next-intl';
import { BadgeCheck, Lightbulb, Lock, Globe } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const FEATURES = [
  { key: 'swiss', Icon: BadgeCheck },
  { key: 'innovation', Icon: Lightbulb },
  { key: 'security', Icon: Lock },
  { key: 'global', Icon: Globe },
] as const;

const PILLARS = ['vision', 'approach'] as const;

export default function Mission() {
  const t = useTranslations('home.mission');

  return (
    <section className="bg-ink-900 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection>
          <p className="eyebrow text-bronze-500">{t('title')}</p>
          <p className="mt-8 max-w-4xl font-serif text-3xl font-light leading-[1.3] text-sand-50 lg:text-[2.75rem]">
            {t('description')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
            {PILLARS.map((pillar) => (
              <div key={pillar}>
                {/* Signature hairline, in bronze on dark */}
                <span
                  aria-hidden="true"
                  className="block h-px w-full bg-bronze-700"
                />
                <h3 className="mt-6 font-serif text-2xl text-sand-50">
                  {t(`${pillar}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  {t(`${pillar}.description`)}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex items-center gap-3 rounded-md border border-ink-800 px-5 py-4"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 text-bronze-500"
                />
                <span className="text-sm text-sand-100">
                  {t(`features.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
