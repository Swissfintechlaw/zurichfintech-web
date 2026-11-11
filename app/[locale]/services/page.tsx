import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { faqJsonLd, type FaqItem } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import SqAccordion from '@/components/page/SqAccordion';

type Props = { params: Promise<{ locale: Locale }> };

interface SqSection {
  id: string;
  title: string;
  intro?: string;
  image: string;
  items: { title: string; text: string[] }[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, route: '/services', metaKey: 'services' });
}

/** Services page with the layout of the original Squarespace page: accordion + image, alternating sides. */
export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sq = await getTranslations({ locale, namespace: 'sq.servicesPage' });
  const t = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const sections = sq.raw('sections') as SqSection[];
  const faq = t.raw('faq') as FaqItem[];
  const trail = breadcrumbs(locale, [
    { label: common('home'), route: '/' },
    { label: sq('title'), route: '/services' },
  ]);

  return (
    <>
      <JsonLd data={[trail.jsonLd, faqJsonLd(faq)]} />
      <main className="bg-white text-ink-800">
        <div className="sq-gutter pt-[60px] md:pt-[6.6vw]">
          <h1 className="sq-h1 text-center">{sq('title')}</h1>
        </div>

        {sections.map((s, i) => {
          const imageLeft = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} className="sq-gutter scroll-mt-4 py-[50px] md:py-[6.6vw]">
              <div className="mx-auto grid max-w-[1325px] gap-x-[8.5vw] gap-y-[40px] md:grid-cols-2 md:gap-y-[76px]">
                <div className={s.intro ? 'md:col-span-2' : imageLeft ? 'md:col-start-2 md:row-start-1' : 'md:col-start-1 md:row-start-1'}>
                  <h2 className="sq-h2">{s.title}</h2>
                  {s.intro && <p className="mt-8 text-[length:var(--fs-body)] leading-[1.3]">{s.intro}</p>}
                </div>
                <div className={imageLeft ? 'md:col-start-2 md:row-start-2' : 'md:col-start-1 md:row-start-2'}>
                  <SqAccordion items={s.items} />
                </div>
                <div className={`relative aspect-[601/384] w-full overflow-hidden ${imageLeft ? 'md:col-start-1 md:row-start-2' : 'md:col-start-2 md:row-start-2'}`}>
                  <Image src={s.image} alt="" fill sizes="(min-width: 768px) 42vw, 90vw" className="object-cover" />
                </div>
              </div>
            </section>
          );
        })}

        <section id="faq" className="sq-gutter pb-[60px] md:pb-[6.6vw]">
          <div className="mx-auto max-w-[1325px]">
            <h2 className="sq-h2 mb-[40px] md:mb-[60px]">{common('faqTitle')}</h2>
            <SqAccordion items={faq.map((f) => ({ title: f.q, text: [f.a] }))} />
          </div>
        </section>
      </main>
    </>
  );
}
