import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OddOne — Spot the Odd One Out | BOT Chain',
  description: 'A simple Web3 mini-game. Four options. One doesn\'t belong. Spot the odd one out and record your instincts on BOT Chain.',
  icons: {
    icon: '/favicon.svg',
    apple: '/botchain-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0f0f13] text-zinc-200 antialiased selection:bg-purple-900 selection:text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
