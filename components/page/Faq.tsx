import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/jsonld';

interface FaqProps {
  items: FaqItem[];
}

/**
 * Native disclosure list: the answers are in the server-rendered HTML, so
 * search and answer engines read them without running any script.
 */
export default function Faq({ items }: FaqProps) {
  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((item, index) => (
        <details key={index} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-bold leading-snug text-ink-900">{item.q}</h3>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.5}
              className="mt-0.5 h-4 w-4 shrink-0 text-bronze-600 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-sm leading-relaxed text-ink-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
