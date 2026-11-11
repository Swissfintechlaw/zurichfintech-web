import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ButtonLink from '@/components/ui/ButtonLink';

/** Full-height hero copied from the Squarespace home page: photo, 50 % black overlay, centred text. */
export default function Hero() {
  const t = useTranslations('sq.hero');

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black text-[#fafafa]">
      <Image
        src="/images/site/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="sq-gutter relative w-full pb-32 pt-32 text-center md:pt-[208px] md:px-[11.7vw]">
        <h1 className="sq-h1">{t('title')}</h1>
        <p className="mt-[0.9em] text-[length:var(--fs-large)] leading-[1.3] tracking-[-0.02em] md:mt-8">
          {t('subtitle')}
        </p>
        <ButtonLink href={{ pathname: '/', hash: 'contact' }} variant="light" className="mt-[50px] md:mt-[118px]">
          {t('cta')}
        </ButtonLink>
      </div>
    </section>
  );
}
