import Wordmark from '@/components/brand/Wordmark';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-surface-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <Wordmark tone="inverse" underline />
        <p className="font-sans text-xs text-ink-500">
          © {year} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
