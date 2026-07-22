import { Spectral, Arimo, IBM_Plex_Mono } from 'next/font/google';

/**
 * SFL brand type stack:
 * - Spectral      — serif display, used for headlines and pull statements
 * - Arimo         — Arial-metric sans, used for all UI and body copy
 * - IBM Plex Mono — mono, used for references (contact details, labels)
 */

export const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-spectral',
});

export const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo',
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const fontVariables = `${spectral.variable} ${arimo.variable} ${ibmPlexMono.variable}`;
