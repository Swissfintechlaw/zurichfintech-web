import { Roboto } from 'next/font/google';

/**
 * Type stack copied from the original Squarespace site: Roboto throughout,
 * regular weight for headings, 500 for buttons, 700 for bold inline text.
 */
export const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const fontVariables = roboto.variable;
