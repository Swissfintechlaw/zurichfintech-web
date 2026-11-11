import { site } from '@/lib/site';

/**
 * Contact form endpoint. Sends the visitor's message to the firm's inbox
 * through the Resend email API (https://resend.com). Nothing is stored.
 *
 * Environment variables (set in the Vercel project, never in the repo):
 *   RESEND_API_KEY  – required; without it the endpoint answers 503 and the
 *                     form falls back to opening the visitor's email program.
 *   CONTACT_FROM    – sender, on a domain verified in Resend,
 *                     e.g. "Swiss Fintech Law website <website@swisstechlaw.com>".
 *   CONTACT_TO      – optional recipient; defaults to the public firm address.
 */

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light per-instance throttle: at most 5 messages per IP per 10 minutes.
const hits = new Map<string, number[]>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\r/g, '').trim().slice(0, max) : '';

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot field: real visitors never see or fill it.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const firstName = clean(body.fname, LIMITS.name).replace(/\n/g, ' ');
  const lastName = clean(body.lname, LIMITS.name).replace(/\n/g, ' ');
  const email = clean(body.email, LIMITS.email).replace(/\n/g, '');
  const subject = clean(body.subject, LIMITS.subject).replace(/\n/g, ' ');
  const message = clean(body.message, LIMITS.message);
  if (!firstName || !lastName || !subject || !message || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (throttled(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  const text = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Language: ${clean(body.locale, 5) || '-'}`,
    '',
    message,
    '',
    '— Sent from the contact form on swisstechlaw.com',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO || site.email],
      reply_to: email,
      subject: `Website: ${subject}`,
      text,
    }),
  });

  if (!res.ok) return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  return Response.json({ ok: true });
}
