import type { JsonLd as JsonLdData } from '@/lib/jsonld';

/**
 * Emits one or more schema.org objects as application/ld+json.
 * `<` is escaped so no string in the data can close the script tag.
 */
export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
