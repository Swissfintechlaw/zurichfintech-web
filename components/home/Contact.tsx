import { useTranslations } from 'next-intl';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ButtonLink from '@/components/ui/ButtonLink';
import { mailHref, site, telHref } from '@/lib/site';

export default function Contact() {
  const t = useTranslations('home.contact');
  const common = useTranslations('common');

  const details = [
    { key: 'phone', Icon: Phone, value: site.phone, href: telHref },
    { key: 'email', Icon: Mail, value: site.email, href: mailHref },
    { key: 'address', Icon: MapPin, value: site.addressLine, href: site.mapsUrl },
    { key: 'hours', Icon: Clock, value: site.openingHours.display, href: null },
  ] as const;

  return (
    <section id="contact" className="bg-surface-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection>
            <p className="flex items-center gap-4 text-bronze-500">
              <span aria-hidden="true" className="h-px w-8 bg-bronze-500" />
              <span className="eyebrow">{t('eyebrow')}</span>
            </p>
            <h2 className="mt-8 font-serif text-4xl font-normal leading-tight text-sand-50 lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-400">{t('intro')}</p>
            <div className="mt-10">
              <ButtonLink href="/contact">{t('cta')}</ButtonLink>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ul className="space-y-5 border-l border-ink-800 pl-8 lg:mt-20">
              {details.map(({ key, Icon, value, href }) => (
                <li key={key} className="flex items-start gap-3.5">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-bronze-500" />
                  <div>
                    <p className="eyebrow text-ink-500">{common(`labels.${key}`)}</p>
                    {href ? (
                      <a
                        href={href}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        className="mt-1 block font-mono text-sm text-ink-300 transition-colors duration-200 hover:text-sand-100"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-mono text-sm text-ink-300">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
