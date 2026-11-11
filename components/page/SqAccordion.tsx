interface Item {
  title: string;
  text: string[];
}

/**
 * Accordion in the Squarespace style: thin grey dividers, large row titles,
 * thin chevron on the right. Native <details>, so the answers are in the
 * server-rendered HTML and readable by search and answer engines.
 */
export default function SqAccordion({ items }: { items: Item[] }) {
  return (
    <div className="border-b border-[#c4c4c4]">
      {items.map((item) => (
        <details key={item.title} className="group border-t border-[#c4c4c4]">
          <summary className="flex min-h-[57px] cursor-pointer list-none items-center justify-between gap-6 py-3 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-[length:var(--fs-h4)] leading-[1.082] text-black">{item.title}</h3>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 9"
              className="h-[9px] w-[16px] shrink-0 transition-transform duration-200 group-open:rotate-180"
            >
              <path d="M1 1l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </summary>
          <div className="space-y-3 pb-6 text-[length:var(--fs-body)] leading-[1.3] text-ink-800">
            {item.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
