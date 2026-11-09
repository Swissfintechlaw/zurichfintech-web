import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { site } from '@/lib/site';
import { founderJsonLd, organizationJsonLd } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(site.url),
    title: {
      template: `%s | ${site.legalName}`,
      default: site.legalName,
    },
    description: t('siteDescription'),
    applicationName: site.legalName,
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  // Client components only need the navigation and shared labels; the long
  // page copy stays on the server.
  const clientMessages = { nav: messages.nav, common: messages.common };

  const t = await getTranslations({ locale, namespace: 'meta' });
  const about = await getTranslations({ locale, namespace: 'about' });
  const founderBio = (
    about.raw('team.members') as { id: string; bio: string }[]
  ).find((m) => m.id === 'gregory-aillaud')?.bio;

  return (
    // Fonts are self-hosted by next/font — no preconnect or <link> needed.
    <html lang={locale as Locale} className={fontVariables}>
      <body className="antialiased bg-canvas text-ink-800 font-sans">
        <JsonLd
          data={[organizationJsonLd(t('siteDescription')), founderJsonLd(founderBio ?? site.founder.jobTitle)]}
        />
        <NextIntlClientProvider messages={clientMessages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
