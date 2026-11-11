import { useTranslations } from 'next-intl';
import { mailHref, site, telHref } from '@/lib/site';
import ContactForm from './ContactForm';

/** "Contact" section from the Squarespace home page: address left, form right, grey map below. */
export default function ContactSection() {
  const t = useTranslations('sq.contact');

  return (
    <section id="contact" className="bg-white text-black">
      <div className="px-[45px] pt-[60px] pb-[60px] md:sq-gutter md:pt-[63px] md:pb-[110px]">
        <h2 className="sq-h2 text-center text-ink-800">{t('title')}</h2>
        <div className="mx-auto mt-[50px] grid max-w-[1325px] gap-12 md:mt-[82px] md:grid-cols-[526px_1fr] md:gap-[44px] lg:grid-cols-[40%_1fr]">
          <address className="text-[length:var(--fs-body)] not-italic leading-[1.3]">
            <strong>{site.name}</strong>
            <br />
            <a href={mailHref} className="underline-offset-2 hover:underline">
              {site.email}
            </a>
            <br />
            <a href={telHref} className="underline-offset-2 hover:underline">
              {site.phone}
            </a>
            <br />
            <br />
            {site.address.street},
            <br />
            {site.address.locality} {site.address.postalCode}
            <br />
            {site.address.region},
            <br />
            {site.address.country}
          </address>
          <ContactForm />
        </div>
      </div>
      <iframe
        title={t('form.mapTitle')}
        src="https://www.google.com/maps?q=Hinterbergstrasse+53,+6312+Steinhausen,+Switzerland&z=8&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[406px] w-full border-0 grayscale"
      />
    </section>
  );
}
