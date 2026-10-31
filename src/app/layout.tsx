import type { Metadata } from 'next';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';
import { Navbar } from '../components/Navbar';
import DynamicBreadcrumb from '../components/ui/dynamic-breadcrumb';
import '../index.css';

export const metadata: Metadata = {
  title: 'Jasa Website, AI Agent & Software di Tangsel | CHESTAADOTCOM',
  description: 'Pengembangan software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan dan Jabodetabek. Mulai Rp1.200.000.',
  openGraph: {
    title: 'Jasa Website, AI Agent & Software di Tangsel | CHESTAADOTCOM',
    description: 'Pengembangan software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan dan Jabodetabek. Mulai Rp1.200.000.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'CHESTAADOTCOM',
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
    "name": "CHESTAADOTCOM - Jasa Website, AI Agent, dan Software Custom",
    "image": "https://chestaa.com/images/og/id/index.png",
    "url": "https://chestaa.com",
    "telephone": "+6282125447232",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Breeze, BSD City",
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
      "Pamulang",
      "Jurang Mangu",
      "Lebak Bulus",
      "Jakarta Selatan",
      "Indonesia"
    ],
    "sameAs": [
      "https://instagram.com/softwaredev.aiagentic.agency",
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
      "target": "https://chestaa.com/id/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "CHESTAADOTCOM Navigation Hub",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Layanan AI & Website",
        "url": "https://chestaa.com/id#layanan"
      },
      {
        "@type": "WebPage",
        "name": "Area Jangkauan Regional",
        "url": "https://chestaa.com/id/area"
      },
      {
        "@type": "WebPage",
        "name": "Jurnal Strategis Blog",
        "url": "https://chestaa.com/id/blog"
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6A3FD0" />
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
      <body className="antialiased bg-white text-slate-900 min-h-screen selection:bg-purple-100 selection:text-purple-900">
        <ThemeProvider>
          <NextErrorBoundary>
            <Navbar />
            <main>
              <DynamicBreadcrumb />
              {children}
            </main>
          </NextErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
