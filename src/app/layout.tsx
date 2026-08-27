import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/constants';
import { Footer } from '@/components/layout/Footer';
import WhatsAppWidget from '@/components/layout/WhatsAppWidget';
import { groupServicesByCategory } from '@/lib/services';
import Navbar from '@/components/layout/Navbar';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Team AutoTech',
  description: siteConfig.description,
};

// Common structure that surrounds every page (child of type React.Node) in application.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get all categories to pass as prop to navbar
  const categories = groupServicesByCategory();

  return (
    // Set font to Inter for full page
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground flex min-h-screen flex-col antialiased">
        <Navbar categories={categories} />
        <main className="flex-1">{children}</main>
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
