import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Flat white card on a hairline rule. Lift is a shadow transition rather
 * than motion — quiet, no scale.
 */
export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-md border border-ink-200 bg-surface shadow-xs transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
