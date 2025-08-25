import type React from 'react';
import { JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const mono = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cvfolio.me'),
  title: 'CVFolio - Resume PDF to Stunning Website in 60 seconds',
  description: 'Create a professional resume website that stands out. No coding, no design skills needed. Just upload your PDF and watch the magic happen.',
  keywords: ['resume website', 'PDF to website', 'professional resume', 'online portfolio', 'resume builder', 'CV website'],
  authors: [{ name: 'CVFolio.Me' }],
  creator: 'CVFolio.Me',
  publisher: 'CVFolio.Me',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cvfolio.me',
    title: 'CVFolio - Resume PDF to Stunning Portfolio Website in 60 seconds',
    description: 'Create a professional resume website that stands out. No coding, no design skills needed. Just upload your PDF and watch the magic happen.',
    siteName: 'CVFolio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'CVFolio.Me - Resume to Website Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVFolio - Resume PDF to Stunning Portfolio Website in 60 seconds',
    description: 'Create a professional resume website that stands out. No coding, no design skills needed.',
    images: ['/og.png'],
    creator: '@cvfolio',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://cvfolio.me',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CVFolio - Resume PDF to Stunning Portfolio Website in 60 seconds',
    description: 'Create a professional resume website that stands out. No coding, no design skills needed. Just upload your PDF and watch the magic happen.',
    url: 'https://cvfolio.me',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '9',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'CVFolio.Me',
      url: 'https://cvfolio.me',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CVFolio.Me',
      url: 'https://cvfolio.me',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cvfolio.me/logo.png',
      },
    },
    featureList: [
      'PDF to Website Conversion',
      'Professional Resume Templates',
      'No Coding Required',
      'Instant Website Generation',
      'Mobile Responsive Design',
      'SEO Optimized',
    ],
    screenshot: 'https://cvfolio.me/og.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CVFolio',
    url: 'https://cvfolio.me',
    logo: 'https://cvfolio.me/logo.png',
    description: 'Professional resume website builder that converts PDF resumes into stunning websites.',
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CVFolio',
    url: 'https://cvfolio.me',
    description: 'Create a professional resume website that stands out. No coding, no design skills needed.',
    publisher: {
      '@type': 'Organization',
      name: 'CVFolio.Me',
    },
    potentialAction: {
      '@type': 'CreateAction',
      target: 'https://cvfolio.me/upload',
      object: {
        '@type': 'WebPage',
        name: 'Resume Website',
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLd,
              organizationSchema,
              websiteSchema,
            ]),
          }}
        />
        {/* {process.env.NODE_ENV === "development" && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )} */}
        {/* rest of your scripts go under */}
      </head>
      <body className={`${instrumentSerif.variable} min-h-screen flex flex-col`} style={{ fontFamily: 'var(--font-primary)' }}>
          <ReactQueryClientProvider>
            <main className="flex-1 flex flex-col">{children}</main>
            <Toaster richColors position="bottom-center" />
          </ReactQueryClientProvider>
        
      </body>
    </html>
  );
}
