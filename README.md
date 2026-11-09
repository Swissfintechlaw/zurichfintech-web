# swisstechlaw.com

Website of Swiss Fintech Law AG (Zug, Switzerland), built with Next.js 16 (App Router), next-intl 4 and Tailwind CSS v4. Published in English (authoritative), German and French.

## Development

```bash
npm install
npm run dev      # http://localhost:3000 -> redirects to /en
npm run build    # production build (standalone output)
npm run lint     # eslint
```

## Structure

- `app/[locale]/` — one folder per route; `generateMetadata` and JSON-LD per page.
- `i18n/routing.ts` — locales and localised pathnames (e.g. `/de/firmengruendung`, `/fr/constitution-de-societe`).
- `i18n/messages/{en,de,fr}.json` — all copy. `en.json` is the reference; the three files share one key schema.
- `content/guides.ts` — slugs and publication dates of the knowledge guides.
- `lib/site.ts` — firm facts used across pages and structured data.
- `lib/seo.ts`, `lib/jsonld.ts` — metadata, hreflang alternates, schema.org helpers.
- `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt` — crawler and AI-search files.
- `next.config.ts` — permanent redirects from legacy hosts to `https://www.swisstechlaw.com`.
- `proxy.ts` — next-intl locale middleware.

## Content rules

Lawyer advertising in Switzerland must be objective and factual: no superlatives, no unverifiable claims, no client names, no testimonials. Keep copy in the message files, never in components.
