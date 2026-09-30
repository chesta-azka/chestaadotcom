import type { Metadata } from 'next';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';
import { Navbar } from '../components/Navbar';
import CommandPalette from '../components/organisms/CommandPalette';
import '../index.css';

export const metadata: Metadata = {
  title: 'CHESTADOTCOM | Pembuatan Website Modern & Promo UMKM Rp540K',
  description: 'Jasa pembuatan website profesional berkecepatan tinggi dengan paket promo UMKM Rp540K domain .com, dan solusi digital terpercaya berbasis BSD Tangerang.',
  openGraph: {
    title: 'CHESTADOTCOM | Pembuatan Website Modern & Promo UMKM Rp540K',
    description: 'Jasa pembuatan website profesional berkecepatan tinggi dengan paket promo UMKM Rp540K domain .com, dan solusi digital terpercaya berbasis BSD Tangerang.',
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
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chestaa B2B Tech Agency",
    "image": "https://chestaa.com/favicon.ico",
    "url": "https://chestaa.com",
    "telephone": "+6281234567890",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Green Office Park, BSD City",
      "addressLocality": "Tangerang",
      "addressRegion": "Banten",
      "postalCode": "15345",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.3024,
      "longitude": 106.6522
    },
    "sameAs": [
      "https://instagram.com/chestaadotcom",
      "https://linkedin.com/company/chestaa",
      "https://github.com/chestacode"
    ]
  };

  const websiteSearchJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://chestaa.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://chestaa.com/insights?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSearchJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-slate-900 min-h-screen">
        <ThemeProvider>
          <NextErrorBoundary>
            <Navbar />
            <CommandPalette />
            <div className="w-full relative">
              {children}
            </div>
          </NextErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
