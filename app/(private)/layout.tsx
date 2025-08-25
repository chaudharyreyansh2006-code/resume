import type React from 'react';
import PrivateHeader from '../../components/PrivateHeader';
import { Footer } from '../../components/Footer';
import { GenerationProvider } from '@/components/generation-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GenerationProvider>
      <PrivateHeader />
      <section className="flex-1 flex flex-col min-h-[calc(100vh-200px)] pt-20">
        {children}
      </section>
      <Footer />
    </GenerationProvider>
  );
}
