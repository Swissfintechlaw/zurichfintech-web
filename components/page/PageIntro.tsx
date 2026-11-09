import type { ComponentProps } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

type Href = ComponentProps<typeof Link>['href'];

export interface BreadcrumbItem {
  label: string;
  href?: Href;
}

interface PageIntroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Visible breadcrumb trail; the last item is the current page */
  crumbs: BreadcrumbItem[];
  /** Optional dated line, e.g. "Last updated 5 October 2026" */
  dateline?: string;
}

/**
 * Opening band of every inner page: breadcrumb, eyebrow with the signature
 * hairline, serif H1 and a short intro. Same vertical rhythm as the home hero
 * so the fixed header clears it.
 */
export default function PageIntro({ eyebrow, title, intro, crumbs, dateline }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-surface-warm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sand-50 via-surface-warm to-sand-200"
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-500">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={index} className="flex items-center gap-1.5">
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="uppercase transition-colors duration-200 hover:text-ink-900"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="uppercase text-ink-700" aria-current={isLast ? 'page' : undefined}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <ChevronRight aria-hidden="true" className="h-3 w-3 text-ink-300" strokeWidth={1.5} />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="mt-10 flex items-center gap-4 text-bronze-600">
          <span aria-hidden="true" className="h-px w-8 bg-bronze-500" />
          <span className="eyebrow">{eyebrow}</span>
        </p>

        <h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] text-ink-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{intro}</p>
        )}

        {dateline && (
          <p className="mt-6 font-mono text-xs tracking-[0.08em] text-ink-500">{dateline}</p>
        )}
      </div>
    </section>
  );
}
