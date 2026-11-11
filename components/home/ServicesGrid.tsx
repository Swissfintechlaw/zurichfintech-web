import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ButtonLink from '@/components/ui/ButtonLink';

interface Card {
  id: string;
  title: string;
  text: string;
  image: string;
}

/** "Services" list section from the Squarespace home page: four columns, image, title, text, button. */
export default function ServicesGrid() {
  const t = useTranslations('sq.services');
  const cards = t.raw('cards') as Card[];

  return (
    <section id="services" className="sq-gutter bg-white py-[60px] text-black md:py-[6.6vw]">
      <h2 className="sq-h2 text-center">{t('title')}</h2>
      <ul className="mx-auto mt-[50px] grid max-w-[1325px] gap-[60px] sm:grid-cols-2 md:mt-[70px] lg:grid-cols-4 lg:gap-[4.17vw]">
        {cards.map((card) => (
          <li key={card.id} className="flex flex-col text-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
            </div>
            <h3 className="mt-[22px] text-[length:var(--fs-h3)] leading-[1.034] tracking-[-0.02em]">{card.title}</h3>
            <p className="mt-3 flex-1 text-[length:var(--fs-card)] leading-[1.3]">{card.text}</p>
            <div className="mt-6">
              <ButtonLink href={{ pathname: '/services', hash: card.id }}>{t('learnMore')}</ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
