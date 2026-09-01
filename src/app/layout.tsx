import type { Metadata } from 'next';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';
import { Navbar } from '../components/Navbar';
import '../index.css';

export const metadata: Metadata = {
  title: 'CHESTADOTCOM | Pembuatan Website Modern Next.js & Promo UMKM Rp540K',
  description: 'Jasa pembuatan website profesional berkecepatan tinggi dengan Next.js, paket promo UMKM Rp540K domain .com, dan solusi digital terpercaya berbasis BSD Tangerang.',
  openGraph: {
    title: 'CHESTADOTCOM | Pembuatan Website Modern Next.js & Promo UMKM Rp540K',
    description: 'Jasa pembuatan website profesional berkecepatan tinggi dengan Next.js, paket promo UMKM Rp540K domain .com, dan solusi digital terpercaya berbasis BSD Tangerang.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'CHESTADOTCOM',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900 min-h-screen">
        <ThemeProvider>
          <NextErrorBoundary>
            <Navbar />
            <div className="w-full relative">
              {children}
            </div>
          </NextErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
