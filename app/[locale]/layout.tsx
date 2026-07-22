import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Swiss Fintech Law AG - Building the Future of Tech in Switzerland',
  description: 'Comprehensive knowledge hub and technical documentation for innovative financial technology and legal frameworks in Swiss jurisdiction',
  keywords: 'fintech, blockchain, swiss law, financial technology, regulation, compliance',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    // Fonts are self-hosted by next/font — no preconnect or <link> needed.
    <html lang={locale} className={fontVariables}>
      <body className="antialiased bg-canvas text-ink-800 font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
