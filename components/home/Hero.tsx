import { useTranslations } from 'next-intl';
import { Clock, Languages, MapPin } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import { site } from '@/lib/site';

export default function Hero() {
  const t = useTranslations('home.hero');
  const common = useTranslations('common');

  const facts = [
    { key: 'address', Icon: MapPin, value: `${site.address.street}, ${site.address.postalCode} ${site.address.locality}` },
    { key: 'hours', Icon: Clock, value: site.openingHours.display },
    { key: 'languages', Icon: Languages, value: common('languagesValue') },
  ] as const;

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-surface-warm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sand-50 via-surface-warm to-sand-200"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sand-300/50 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 lg:px-8 lg:pb-28 lg:pt-48">
        <p className="flex items-center gap-4 text-bronze-600">
          <span aria-hidden="true" className="h-px w-8 bg-bronze-500" />
          <span className="eyebrow">{t('eyebrow')}</span>
        </p>

        <h1 className="mt-8 max-w-5xl text-balance font-serif text-5xl font-normal leading-[1.05] tracking-[-0.01em] text-ink-900 sm:text-6xl lg:text-7xl">
          {t('title.line1')}
          <br />
          {t('title.line2')}
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">{t('subtitle')}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contact">{t('cta.primary')}</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            {t('cta.secondary')}
          </ButtonLink>
        </div>

        {/* Verifiable facts in place of marketing figures (BGFA Art. 12 lit. d). */}
        <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-5">
          {facts.map(({ key, Icon, value }) => (
            <div key={key} className="flex items-center gap-3">
              <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-bronze-600" />
              <dt className="sr-only">{common(`labels.${key}`)}</dt>
              <dd className="font-mono text-xs tracking-[0.04em] text-ink-600">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
