import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';
import { Navbar } from '../components/Navbar';
import DynamicBreadcrumb from '../components/ui/dynamic-breadcrumb';
import CommandPalette from '../components/organisms/CommandPalette';
import AIConcierge from '../components/organisms/AIConcierge';
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../index.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Jasa Website, AI Agent, dan Software Custom di Tangsel | CHESTAADOTCOM',
  description: 'Jasa pembuatan website, AI agent WhatsApp, dan software custom di BSD, Tangerang Selatan & Jabodetabek. Performa cepat, harga transparan mulai Rp1.200.000.',
  openGraph: {
    title: 'Jasa Website, AI Agent, dan Software Custom di Tangsel | CHESTAADOTCOM',
    description: 'Jasa pembuatan website, AI agent WhatsApp, dan software custom di BSD, Tangerang Selatan & Jabodetabek. Performa cepat, harga transparan mulai Rp1.200.000.',
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
    "image": "https://chestaa.com/favicon.svg",
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
      "Cisauk",
      "Pemalang",
      "Rawa Buntu",
      "Tangerang Selatan",
      "Jakarta Selatan",
      "Indonesia"
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
      "target": "https://chestaa.com/blog?q={search_term_string}",
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
      .replace/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/favicon.svg" as="image" />
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L0TSZYYPXL" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L0TSZYYPXL');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 min-h-screen selection:bg-purple-100 selection:text-purple-900`}>
        <ThemeProvider>
          <NextErrorBoundary>
            <Navbar />
            <CommandPalette />
            <AIConcierge />
            <main>
              <DynamicBreadcrumb />
              {children}
            </main>
            <SpeedInsights />
          </NextErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
