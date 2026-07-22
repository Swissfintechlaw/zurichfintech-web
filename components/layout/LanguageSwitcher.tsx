'use client';

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

  return (
    <div className="flex items-center gap-3">
      {routing.locales.map((loc) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.push(pathname, { locale: loc })}
            aria-current={isActive ? 'true' : undefined}
            className={`font-mono text-[0.6875rem] tracking-[0.12em] transition-colors duration-200 ${
              isActive ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
            }`}
          >
            {LANGUAGE_NAMES[loc]}
          </button>
        );
      })}
    </div>
  );
}
