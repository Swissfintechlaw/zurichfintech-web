import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface CtaBannerProps {
  title: string;
  text: string;
  cta: string;
}

/**
 * Closing call to action on the dark surface. The terracotta button is the
 * single CTA signal on the page, so nothing else on the band competes.
 */
export default function CtaBanner({ title, text, cta }: CtaBannerProps) {
  return (
    <section className="border-t border-ink-800 bg-surface-ink py-20 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-normal leading-tight text-sand-50 lg:text-4xl">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-400">{text}</p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-md bg-coral-500 px-7 py-3.5 text-sm font-medium text-ink-000 transition-colors duration-200 hover:bg-coral-600"
        >
          {cta}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
