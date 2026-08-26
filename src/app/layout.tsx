import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/constants';
import { Footer } from '@/components/layout/Footer';
import WhatsAppWidget from '@/components/layout/WhatsAppWidget';

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
  return (
    // Set font to Inter for full page
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground flex min-h-screen flex-col antialiased">
        <main className="flex-1">{children}</main>
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}

// TODO: Add Navbar
