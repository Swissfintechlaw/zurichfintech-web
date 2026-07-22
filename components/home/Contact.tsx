import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { site } from '@/lib/site';

export default function Contact() {
  const t = useTranslations('contact');

  const details = [
    {
      key: 'phone',
      Icon: Phone,
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, '')}`,
    },
    {
      key: 'email',
      Icon: Mail,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      key: 'address',
      Icon: MapPin,
      value: site.address,
      href: null,
    },
  ] as const;

  return (
    <section id="contact" className="bg-surface-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection>
            <p className="flex items-center gap-4 text-bronze-500">
              <span aria-hidden="true" className="h-px w-8 bg-bronze-500" />
              <span className="eyebrow">{t('eyebrow')}</span>
            </p>

            <h2 className="mt-8 font-serif text-4xl font-normal leading-tight text-sand-50 lg:text-5xl">
              {t('title')}
            </h2>

            <ul className="mt-10 space-y-4">
              {details.map(({ key, Icon, value, href }) => (
                <li key={key} className="flex items-center gap-3.5">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-4 w-4 shrink-0 text-bronze-500"
                  />
                  {href ? (
                    <a
                      href={href}
                      className="font-mono text-sm text-ink-400 transition-colors duration-200 hover:text-sand-100"
                    >
                      <span className="sr-only">{t(`labels.${key}`)}: </span>
                      {value}
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-ink-400">
                      <span className="sr-only">{t(`labels.${key}`)}: </span>
                      {value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Placeholder panel — awaiting the real contact photography. */}
          <AnimatedSection delay={0.1}>
            <div
              aria-hidden="true"
              className="aspect-[4/3] w-full rounded-md border border-ink-800 bg-gradient-to-br from-ink-800 via-ink-900 to-sand-600/20"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
