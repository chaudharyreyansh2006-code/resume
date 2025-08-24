import type React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const mono = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://resume-seven-lovat.vercel.app'),
  title: 'Folio.Me - Resume to Website',
  description:
    'Resume to Website in one click!',
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
      <body className={`${mono.className} min-h-screen flex flex-col`}>
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
