import type { Metadata } from 'next';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';
import { Navbar } from '../components/Navbar';
import CommandPalette from '../components/organisms/CommandPalette';
import AIConcierge from '../components/organisms/AIConcierge';
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
    "@type": "ProfessionalService",
    "name": "Chestaa - Jasa AI Automation & IT B2B BSD Tangerang",
    "image": "https://chestaa.com/favicon.ico",
    "url": "https://chestaa.com",
    "telephone": "+6281234567890",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Green Office Park, BSD City",
      "addressLocality": "Tangerang Selatan",
      "addressRegion": "Banten",
      "postalCode": "15345",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.3006,
      "longitude": 106.6527
    },
    "areaServed": [
      "BSD City",
      "Tangerang Selatan",
      "Alam Sutera",
      "Gading Serpong",
      "Jakarta Selatan"
    ],
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

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Chestaa Enterprise Navigation Hub",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Services & AI Architecture",
        "url": "https://chestaa.com/services"
      },
      {
        "@type": "WebPage",
        "name": "Enterprise Portfolio",
        "url": "https://chestaa.com/portfolio"
      },
      {
        "@type": "WebPage",
        "name": "Case Studies & Proof",
        "url": "https://chestaa.com/case-studies"
      },
      {
        "@type": "WebPage",
        "name": "AI & Tech Insights",
        "url": "https://chestaa.com/insights"
      }
    ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteNavigationJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-slate-900 min-h-screen">
        <ThemeProvider>
          <NextErrorBoundary>
            <Navbar />
            <CommandPalette />
            <AIConcierge />
            <div className="w-full relative">
              {children}
            </div>
          </NextErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
