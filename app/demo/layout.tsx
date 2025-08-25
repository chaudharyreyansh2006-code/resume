import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo Portfolio - CVFolio.Me',
  description: 'See how your portfolio website will look with different themes. Interactive demo showcasing all available designs.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing the demo
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}