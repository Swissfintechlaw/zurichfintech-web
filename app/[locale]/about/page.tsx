import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { personJsonLd } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageIntro from '@/components/page/PageIntro';
import Section from '@/components/page/Section';
import CtaBanner from '@/components/page/CtaBanner';
import Card from '@/components/ui/Card';

type Props = { params: Promise<{ locale: Locale }> };

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  education: { title: string; items: string[] };
  admissions?: { title: string; items: string[] };
}

interface Fact {
  label: string;
  value: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/about', metaKey: 'about' });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const facts = t.raw('firm.facts') as Fact[];
  const members = t.raw('team.members') as Member[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: t('title'), route: '/about' },
  ]);
  // The founder's Person entity is already emitted site-wide in the locale layout.
  const people = members.filter((m) => m.id !== 'gregory-aillaud').map((m) => personJsonLd(m.name, m.role, m.bio));

  return (
    <>
      <JsonLd data={[trail.jsonLd, ...people]} />
      <main>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} crumbs={trail.crumbs} />

        <Section id="firm" eyebrow={t('firm.eyebrow')} title={t('firm.title')}>
          <dl className="grid max-w-4xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-ink-300 pt-4">
                <dt className="eyebrow text-ink-500">{fact.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-800">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="team" tone="sunk" eyebrow={t('team.eyebrow')} title={t('team.title')}>
          <div className="grid gap-6 lg:grid-cols-2">
            {members.map((member) => (
              <Card key={member.id} className="p-8 lg:p-10">
                <h3 className="font-serif text-3xl font-normal leading-snug text-ink-900">{member.name}</h3>
                <p className="eyebrow mt-3 text-bronze-600">{member.role}</p>
                <p className="mt-6 text-base leading-relaxed text-ink-700">{member.bio}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-ink-500">{member.education.title}</p>
                    <ul className="mt-3 space-y-2">
                      {member.education.items.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-ink-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {member.admissions && (
                    <div>
                      <p className="eyebrow text-ink-500">{member.admissions.title}</p>
                      <ul className="mt-3 space-y-2">
                        {member.admissions.items.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-ink-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-500">{t('note')}</p>
        </Section>

        <CtaBanner title={t('cta.title')} text={t('cta.text')} cta={t('cta.cta')} />
      </main>
    </>
  );
}
