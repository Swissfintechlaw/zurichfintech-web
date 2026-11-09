export interface ProseSection {
  title?: string;
  paragraphs: string[];
}

interface ProseProps {
  sections: ProseSection[];
  /** Optional note shown above the text, e.g. "The English version prevails." */
  note?: string;
}

/**
 * Long-form legal text (legal notice, privacy policy, terms). Plain
 * paragraphs under H2 headings, readable measure, no decoration.
 */
export default function Prose({ sections, note }: ProseProps) {
  return (
    <div className="max-w-3xl">
      {note && (
        <p className="mb-10 rounded-md border border-bronze-300 bg-bronze-100/50 px-5 py-4 text-sm leading-relaxed text-ink-700">
          {note}
        </p>
      )}
      {sections.map((section, index) => (
        <div key={index} className={index > 0 ? 'mt-10' : ''}>
          {section.title && (
            <h2 className="font-serif text-2xl font-normal leading-snug text-ink-900">{section.title}</h2>
          )}
          {section.paragraphs.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className={`${section.title || pIndex > 0 ? 'mt-4' : ''} text-base leading-relaxed text-ink-700`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
