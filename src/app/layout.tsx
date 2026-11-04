import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/constants';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget';
import { groupServicesByCategory } from '@/lib/services';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

const SITE_TITLE = 'Team AutoTech';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
  description: siteConfig.description,
};

// Shell shared by every page
export default function RootLayout({ children }: { children: ReactNode }) {
  const categories = groupServicesByCategory();

  return (
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
