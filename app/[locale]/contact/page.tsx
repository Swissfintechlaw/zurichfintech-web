import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, ExternalLink, Languages, Mail, MapPin, Phone } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { mailHref, site, telHref } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import Card from '@/components/ui/Card';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/contact', metaKey: 'contact' });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const footer = await getTranslations({ locale, namespace: 'footer' });

  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/contact' },
  ]);

  const rows = [
    { key: 'phone', Icon: Phone, value: site.phone, href: telHref, external: false },
    { key: 'email', Icon: Mail, value: site.email, href: mailHref, external: false },
    { key: 'hours', Icon: Clock, value: t('hoursValue'), href: null, external: false },
    { key: 'languages', Icon: Languages, value: common('languagesValue'), href: null, external: false },
  ] as const;

  return (
    <>
      <JsonLd data={trail.jsonLd} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />

        <Section>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-8 lg:p-10">
              <p className="flex items-center gap-3 text-bronze-600">
                <MapPin aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                <span className="eyebrow">{t('office')}</span>
              </p>
              <address className="mt-6 font-serif text-2xl font-normal not-italic leading-snug text-ink-900">
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}
                <br />
                {site.address.region}, {site.address.country}
              </address>
              <p className="mt-6 text-sm leading-relaxed text-ink-600">{t('directions')}</p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors duration-200 hover:text-bronze-700"
              >
                {t('mapCta')}
                <ExternalLink aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              </a>
            </Card>

            <Card className="p-8 lg:p-10">
              <dl className="space-y-6">
                {rows.map(({ key, Icon, value, href }) => (
                  <div key={key} className="flex items-start gap-3.5">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-bronze-600" />
                    <div>
                      <dt className="eyebrow text-ink-500">{common(`labels.${key}`)}</dt>
                      <dd className="mt-1.5 text-base text-ink-800">
                        {href ? (
                          <a href={href} className="font-mono text-sm transition-colors duration-200 hover:text-bronze-700">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              <a
                href={mailHref}
                className="group mt-10 inline-flex items-center justify-center gap-2.5 rounded-md bg-coral-500 px-7 py-3.5 text-sm font-medium text-ink-000 transition-colors duration-200 hover:bg-coral-600"
              >
                <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                {t('emailCta')}
              </a>
            </Card>
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-600">
            {t('note')}{' '}
            <Link href="/privacy-policy" className="underline decoration-ink-300 underline-offset-4 hover:text-ink-900">
              {footer('privacy')}
            </Link>
          </p>
        </Section>
      </main>
    </>
  );
}
