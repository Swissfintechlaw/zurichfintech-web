import { site } from '@/lib/site';

interface WordmarkProps {
  /** 'ink' for light backgrounds, 'inverse' for dark ones */
  tone?: 'ink' | 'inverse';
  /** Draw the bronze rule beneath the wordmark (used in the footer) */
  underline?: boolean;
  className?: string;
}

/**
 * The SFL logo is typographic — never redraw it as a glyph or icon.
 * Monogram + hairline divider + full name.
 */
export default function Wordmark({
  tone = 'ink',
  underline = false,
  className = '',
}: WordmarkProps) {
  const monogram = tone === 'ink' ? 'text-ink-900' : 'text-ink-000';
  const name = tone === 'ink' ? 'text-ink-700' : 'text-sand-100';
  const divider = tone === 'ink' ? 'bg-ink-300' : 'bg-ink-600';

  return (
    <span className={`inline-flex flex-col gap-1.5 ${className}`}>
      <span className="inline-flex items-center gap-3">
        <span className={`font-sans font-bold tracking-tight ${monogram}`}>
          SFL
        </span>
        <span aria-hidden="true" className={`h-4 w-px ${divider}`} />
        <span className={`font-sans text-[0.9375rem] ${name}`}>{site.name}</span>
      </span>
      {underline && (
        <span aria-hidden="true" className="h-px w-full bg-bronze-500" />
      )}
    </span>
  );
}
