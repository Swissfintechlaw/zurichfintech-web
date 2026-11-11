'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { site } from '@/lib/site';

/**
 * Contact form with the Squarespace layout. Messages are sent to the firm's
 * inbox by /api/contact (Resend); nothing is stored by the site. If the mail
 * service is not configured yet, it falls back to the visitor's email program.
 */
export default function ContactForm() {
  const t = useTranslations('sq.contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const input =
    'w-full rounded-[23px] border border-black bg-transparent px-[15px] py-2 text-[length:var(--fs-body)] leading-[1.3] text-black outline-none focus:border-2';
  const label = 'mb-1 block text-[length:var(--fs-body)] leading-[1.3] pl-1';
  const req = <span className="ml-1 text-[12px] opacity-70">{t('required')}</span>;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(f), locale }),
      });
      if (res.ok) {
        form.reset();
        setStatus('sent');
        return;
      }
      if (res.status !== 503) {
        setStatus('error');
        return;
      }
    } catch {
      setStatus('error');
      return;
    }
    // 503: mail service not configured yet, so open the visitor's email program.
    setStatus('idle');
    const name = `${f.get('fname') ?? ''} ${f.get('lname') ?? ''}`.trim();
    const body = `${f.get('message') ?? ''}\n\n${name}\n${f.get('email') ?? ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(String(f.get('subject') ?? ''))}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <fieldset>
        <legend className={label}>
          {t('name')}
          {req}
        </legend>
        <div className="grid grid-cols-2 gap-[10px]">
          <label className="block">
            <span className="mb-1 block text-[12px]">
              {t('firstName')} <span className="opacity-70">{t('required')}</span>
            </span>
            <input name="fname" required autoComplete="given-name" className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[12px]">
              {t('lastName')} <span className="opacity-70">{t('required')}</span>
            </span>
            <input name="lname" required autoComplete="family-name" className={input} />
          </label>
        </div>
      </fieldset>
      <label className="block">
        <span className={label}>
          {t('email')}
          {req}
        </span>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </label>
      <label className="block">
        <span className={label}>
          {t('subject')}
          {req}
        </span>
        <input name="subject" required className={input} />
      </label>
      <label className="block">
        <span className={label}>
          {t('message')}
          {req}
        </span>
        <textarea name="message" required className={`${input} h-[100px] resize-y`} />
      </label>
      {/* Honeypot against spam bots; hidden from people and screen readers */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-pill bg-black text-[#fafafa] disabled:opacity-60"
        >
          {status === 'sending' ? t('sending') : t('send')}
        </button>
        <p role="status" className="mt-3 text-[length:var(--fs-small)] leading-[1.3]">
          {status === 'sent' && t('sent')}
          {status === 'error' && t('error')}
        </p>
      </div>
    </form>
  );
}
