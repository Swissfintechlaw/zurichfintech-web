import type { ReactNode } from 'react';
import { Link, type AppHref } from '@/i18n/routing';

interface ButtonLinkProps {
  href: AppHref;
  children: ReactNode;
  /** `primary`: black pill (Squarespace default); `light`: grey pill used on the hero image. */
  variant?: 'primary' | 'light' | 'secondary' | 'inverse';
  className?: string;
}

const VARIANTS = {
  primary: 'bg-black text-[#fafafa]',
  light: 'bg-[#dcdcdc] text-black',
  secondary: 'border border-black bg-transparent text-black',
  inverse: 'border border-[#fafafa] text-[#fafafa]',
} as const;

/** Pill button copied from the Squarespace site: uppercase, Roboto 500, 0.05em tracking. */
export default function ButtonLink({ href, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  return (
    <Link href={href} className={`btn-pill ${VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
