import type React from 'react';
import { JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const mono = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cvfolio.me'),
  title: 'CVFolio.Me - Resume to Website',
  description:
    'CVFolio.Me is a tool that helps you create a beautiful website from your resume in just a few clicks!',
  openGraph: {
    images: '/og.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* {process.env.NODE_ENV === "development" && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )} */}
        {/* rest of your scripts go under */}
      </head>
      <body className={`${instrumentSerif.variable} min-h-screen flex flex-col`} style={{ fontFamily: 'var(--font-primary)' }}>
        <PlausibleProvider domain="resume-seven-lovat.vercel.app">
          <ReactQueryClientProvider>
            <main className="flex-1 flex flex-col">{children}</main>
            <Toaster richColors position="bottom-center" />
          </ReactQueryClientProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
