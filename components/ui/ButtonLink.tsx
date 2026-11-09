import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, type AppHref } from '@/i18n/routing';

interface ButtonLinkProps {
  href: AppHref;
  children: ReactNode;
  /** `primary` is the single terracotta CTA per view; `secondary` is the quiet outline. */
  variant?: 'primary' | 'secondary' | 'inverse';
  className?: string;
}

const VARIANTS = {
  primary:
    'group bg-coral-500 text-ink-000 hover:bg-coral-600',
  secondary:
    'border border-ink-300 bg-surface text-ink-800 hover:border-ink-400 hover:bg-sand-50',
  inverse:
    'border border-ink-600 text-sand-100 hover:border-ink-400 hover:text-sand-50',
} as const;

export default function ButtonLink({ href, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 rounded-md px-7 py-3.5 text-sm font-medium transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {variant === 'primary' && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
