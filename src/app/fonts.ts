import { Playfair_Display, Inter } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--playfair',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--inter',
});

// Log the font objects to confirm they’re created
console.log('Playfair_Display Font Object:', playfair);
console.log('Inter Font Object:', inter);