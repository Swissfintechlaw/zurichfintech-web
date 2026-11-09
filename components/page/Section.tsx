import type { ReactNode } from 'react';

type Tone = 'light' | 'sunk' | 'dark';

interface SectionProps {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  /** Tighter vertical padding for secondary sections */
  compact?: boolean;
  className?: string;
}

const TONES: Record<Tone, { section: string; eyebrow: string; title: string; intro: string }> = {
  light: {
    section: 'bg-canvas',
    eyebrow: 'text-bronze-600',
    title: 'text-ink-900',
    intro: 'text-ink-600',
  },
  sunk: {
    section: 'bg-surface-sunk',
    eyebrow: 'text-bronze-600',
    title: 'text-ink-900',
    intro: 'text-ink-600',
  },
  dark: {
    section: 'bg-surface-ink',
    eyebrow: 'text-bronze-500',
    title: 'text-sand-50',
    intro: 'text-ink-400',
  },
};

/**
 * A content band with the standard page rhythm: eyebrow, serif H2, intro,
 * then whatever the page needs. The `id` doubles as an in-page anchor.
 */
export default function Section({
  id,
  tone = 'light',
  eyebrow,
  title,
  intro,
  children,
  compact = false,
  className = '',
}: SectionProps) {
  const t = TONES[tone];
  const hasHeading = eyebrow || title || intro;

  return (
    <section
      id={id}
      className={`${t.section} ${compact ? 'py-16 lg:py-20' : 'py-20 lg:py-28'} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {hasHeading && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className={`flex items-center gap-4 ${t.eyebrow}`}>
                <span aria-hidden="true" className="h-px w-8 bg-bronze-500" />
                <span className="eyebrow">{eyebrow}</span>
              </p>
            )}
            {title && (
              <h2
                className={`${eyebrow ? 'mt-6' : ''} font-serif text-3xl font-normal leading-tight lg:text-4xl ${t.title}`}
              >
                {title}
              </h2>
            )}
            {intro && <p className={`mt-5 text-base leading-relaxed lg:text-lg ${t.intro}`}>{intro}</p>}
          </div>
        )}
        {children && <div className={hasHeading ? 'mt-12' : ''}>{children}</div>}
      </div>
    </section>
  );
}
