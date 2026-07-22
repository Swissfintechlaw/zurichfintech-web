import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '50+', key: 'clients' },
  { value: '15+', key: 'years' },
  { value: '100%', key: 'swiss' },
] as const;

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-surface-warm">
      {/* Warm alpine wash. Stands in for the hero photography until a real
          asset is supplied — see README notes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sand-50 via-surface-warm to-sand-200"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sand-300/50 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 lg:px-8 lg:pb-28 lg:pt-48">
        <div>
          {/* Eyebrow, prefixed by the signature hairline */}
          <p className="flex items-center gap-4 text-bronze-600">
            <span aria-hidden="true" className="h-px w-8 bg-bronze-500" />
            <span className="eyebrow">{t('badge')}</span>
          </p>

          {/* max-w-4xl keeps the two authored lines from wrapping a third time */}
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-normal leading-[1.05] tracking-[-0.01em] text-ink-900 sm:text-6xl lg:text-7xl">
            {t('title.line1')}
            <br />
            {t('title.line2')}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
            {t('subtitle')}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Terracotta is the single-CTA signal — only one per view */}
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-md bg-coral-500 px-7 py-3.5 text-sm font-medium text-ink-000 transition-colors duration-200 hover:bg-coral-600"
            >
              {t('cta.primary')}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-md border border-ink-300 bg-surface px-7 py-3.5 text-sm font-medium text-ink-800 transition-colors duration-200 hover:border-ink-400 hover:bg-sand-50"
            >
              {t('cta.secondary')}
            </a>
          </div>

          <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-8">
            {STATS.map(({ value, key }) => (
              <div key={key}>
                <dt className="sr-only">{t(`stats.${key}`)}</dt>
                <dd>
                  <span className="block font-serif text-4xl text-ink-900">
                    {value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="eyebrow mt-2 block text-ink-500"
                  >
                    {t(`stats.${key}`)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
