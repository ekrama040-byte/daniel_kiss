import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Anton, Permanent_Marker } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const marker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
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
    <html
      lang="en"
      className={`${jetbrains.variable} ${anton.variable} ${marker.variable} dark`}
    >
      <body className="bg-[#0D0D0D] text-[#EAEAEA] font-mono antialiased overflow-x-hidden selection:bg-[#E63222] selection:text-white">
        {children}
      </body>
    </html>
  );
}
