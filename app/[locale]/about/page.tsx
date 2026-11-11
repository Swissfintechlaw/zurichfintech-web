import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { personJsonLd } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';

type Props = { params: Promise<{ locale: Locale }> };

interface Member {
  id: string;
  name: string;
  image: string;
  bio: string;
  education: { title: string; items: { school: string; degree: string }[] };
  admissions?: { title: string; items: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/about', metaKey: 'about' });
}

/** Team page with the layout of the original Squarespace page: photo and bio, alternating sides. */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sq = await getTranslations({ locale, namespace: 'sq.aboutPage' });
  const about = await getTranslations({ locale, namespace: 'about' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const members = sq.raw('members') as Member[];
  const legacy = about.raw('team.members') as { id: string; name: string; role: string; bio: string }[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: sq('title'), route: '/about' },
  ]);
  // The founder's Person entity is already emitted site-wide in the locale layout.
  const people = legacy.filter((m) => m.id !== 'gregory-aillaud').map((m) => personJsonLd(m.name, m.role, m.bio));

  const h4 = 'text-[length:var(--fs-h4)] leading-[1.082] tracking-[-0.02em] text-black';
  const small = 'text-[14.27px] leading-[1.3] text-ink-800';

  return (
    <>
      <JsonLd data={[trail.jsonLd, ...people]} />
      <main className="bg-white md:pb-[18vw]">
        <div className="sq-gutter pt-[50px] md:px-[8vw] md:pt-[52px]">
          <h1 className="sq-h2 text-center text-ink-800">{sq('title')}</h1>
        </div>

        {members.map((m, i) => {
          const photoRight = i % 2 === 1;
          return (
            <section
              key={m.id}
              id={m.id}
              className="sq-gutter scroll-mt-4 py-[40px] md:px-[8vw] md:py-[57px]"
            >
              <div className={`mx-auto grid max-w-[1210px] gap-10 md:gap-[8vw] ${photoRight ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-[1fr_2fr]'}`}>
                <div className={`flex items-start ${photoRight ? 'md:order-2 md:justify-center' : 'md:justify-start md:pl-[5px]'}`}>
                  <div className={`relative aspect-[3/4] w-full ${photoRight ? 'max-w-[243px]' : 'max-w-[234px]'}`}>
                    <Image src={m.image} alt={m.name} fill sizes="243px" className="object-cover" />
                  </div>
                </div>
                <div className={photoRight ? 'md:order-1' : ''}>
                  <h2 className={`${h4} font-bold`}>{m.name}</h2>
                  <p className={`${small} mt-8`}>{m.bio}</p>
                  <div className={`mt-10 grid gap-10 ${m.admissions ? 'sm:grid-cols-2 sm:gap-[115px]' : ''}`}>
                    <div>
                      <h3 className={h4}>{m.education.title}</h3>
                      <ul className="mt-8 space-y-4">
                        {m.education.items.map((e) => (
                          <li key={e.school} className={small}>
                            <strong>{e.school}</strong>
                            <br />
                            {e.degree}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {m.admissions && (
                      <div>
                        <h3 className={h4}>{m.admissions.title}</h3>
                        <ul className="mt-8 space-y-1">
                          {m.admissions.items.map((a) => (
                            <li key={a} className={small}>
                              •{a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
