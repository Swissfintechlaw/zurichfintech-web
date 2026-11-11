import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ButtonLink from '@/components/ui/ButtonLink';

interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
}

/** "Team" section from the Squarespace home page: two portraits with name, role and bio button. */
export default function TeamGrid() {
  const t = useTranslations('sq.team');
  const members = t.raw('members') as Member[];

  return (
    <section id="team" className="sq-gutter bg-[#fafafa] py-[60px] text-black md:py-[6.6vw]">
      <h2 className="sq-h2 text-center">{t('title')}</h2>
      <ul className="mx-auto mt-[50px] grid max-w-[1325px] gap-[60px] md:mt-[70px] md:grid-cols-2 md:gap-[4.17vw]">
        {members.map((m) => (
          <li key={m.id} className="flex flex-col items-center text-center">
            <div className="relative aspect-[3/4] w-full max-w-[182px] overflow-hidden md:max-w-[316px]">
              <Image src={m.image} alt={m.name} fill sizes="316px" className="object-cover" />
            </div>
            <h3 className="mt-[50px] text-[length:var(--fs-h3)] leading-[1.034] tracking-[-0.02em]">{m.name}</h3>
            <p className="mt-6 text-[length:var(--fs-small)] leading-[1.3]">{m.role}</p>
            <ButtonLink href={{ pathname: '/about', hash: m.id }} className="mt-[38px]">
              {t('readBio')}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
