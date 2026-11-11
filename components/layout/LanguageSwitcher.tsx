'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  de: 'DE',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center gap-3">
      {routing.locales.map((loc) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() =>
              // @ts-expect-error -- next-intl validates params per pathname; they always match the current route.
              router.push({ pathname, params }, { locale: loc })
            }
            aria-current={isActive ? 'true' : undefined}
            className={`text-[12.6px] tracking-[0.05em] transition-opacity duration-200 ${
              isActive ? 'underline underline-offset-4' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {LANGUAGE_NAMES[loc]}
          </button>
        );
      })}
    </div>
  );
}
