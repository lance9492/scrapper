import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LiveChat from '@/components/live-chat';
import ThemeProvider from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MetalXchange - South Africa\'s Premier Scrap Metal Marketplace',
  description: 'Buy and sell scrap metal with real-time pricing, secure transactions, and verified users.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <LiveChat />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}