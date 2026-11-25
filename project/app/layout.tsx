import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Daniel Kiss - Frontend Developer | Creative Web Development',
  description:
    'Daniel Kiss — Frontend Developer specializing in JavaScript, WordPress, GSAP, and Three.js. Code / Motion / WebGL.',
  openGraph: {
    images: [{ url: 'https://danielkiss.hu/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://danielkiss.hu/og-image.jpg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <body
        className="font-mono-display bg-background text-foreground antialiased"
        style={{ fontFamily: 'var(--font-mono), monospace' }}
      >
        {children}
      </body>
    </html>
  );
}
