import React from 'react';
import { getPseoTargets } from '../../../../lib/firebase-admin';
import { generateServiceMetadata, generateDynamicCopy } from '../../../../lib/seo-utils';
import ProgrammaticPageContent, { ProgrammaticFaqItem } from '../../../../components/organisms/ProgrammaticPageContent';

type PageProps = {
  params: Promise<{
    industry: string;
    city: string;
  }>;
};

export async function generateStaticParams() {
  try {
    const { industries, cities } = await getPseoTargets();

    const paths = [];
    for (const industry of industries) {
      for (const city of cities) {
        paths.push({ industry, city });
      }
    }
    return paths;
  } catch (error) {
    console.error('Failed to generate static params for PSEO:', error);
    return [
      { industry: 'manufaktur', city: 'jakarta' },
      { industry: 'kesehatan', city: 'bsd-city' },
      { industry: 'logistik', city: 'tangerang' },
      { industry: 'retail', city: 'jakarta-selatan' },
    ];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  return generateServiceMetadata(resolvedParams.industry, resolvedParams.city);
}

export default async function ProgrammaticSEOPage({ params }: PageProps) {
  const { industry, city } = await params;
  const copy = generateDynamicCopy(industry, city);

  // Dynamic FAQs extracted from the programmatic content
  const programmaticFaqs: ProgrammaticFaqItem[] = [
    {
      question: `Mengapa bisnis ${copy.industry} di ${copy.city} membutuhkan arsitektur digital dan otomatisasi AI?`,
      answer: copy.hook || `Kompetisi bisnis ${copy.industry} di ${copy.city} membutuhkan sistem otonom berkecepatan tinggi untuk menekan biaya operasional manual dan mendominasi pasar lokal.`,
    },
    {
      question: `Bagaimana pendekatan solusi Chestaa untuk sektor ${copy.industry} di wilayah ${copy.city}?`,
      answer: copy.body || `Chestaa menghadirkan arsitektur web modern berkecepatan sub-detik dan agen AI khusus untuk mengeliminasi inefisiensi tim operasional serta melipatgandakan konversi di ${copy.city}.`,
    },
    {
      question: `Berapa estimasi peningkatan efisiensi yang dapat dicapai ${copy.industry} di ${copy.city}?`,
      answer: `Berdasarkan metrik implementasi arsitektur kami, efisiensi operasional dan pertumbuhan konversi dapat melonjak hingga ${copy.metric} (${copy.metricLabel}).`,
    },
    {
      question: `Bagaimana cara memulai konsultasi arsitektur digital dan audit sistem di ${copy.city}?`,
      answer: `Anda dapat mengajukan audit arsitektur digital gratis dan sesi konsultasi prioritas langsung dengan Principal System Architect Chestaa untuk menganalisis alur kerja spesifik bisnis ${copy.industry} Anda.`,
    },
  ];

  // 1. Dynamic BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://chestaa.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://chestaa.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${copy.industry} di ${copy.city}`,
        item: `https://chestaa.com/services/${encodeURIComponent(industry)}/${encodeURIComponent(city)}`,
      },
    ],
  };

  // 3. Localized Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: copy.title,
    description: copy.description,
    provider: {
      '@type': 'Organization',
      name: 'Chestaa Enterprise AI',
      url: 'https://chestaa.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chestaa.com/chesta.png',
      },
    },
    areaServed: [
      {
        '@type': 'City',
        name: copy.city,
      },
      {
        '@type': 'Country',
        name: 'Indonesia',
      },
    ],
    serviceType: `Enterprise Digital Architecture & AI Automation for ${copy.industry}`,
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  return (
    <>
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />

      {/* Programmatic SEO Animated Content Container */}
      <ProgrammaticPageContent
        copy={copy}
        faqs={programmaticFaqs}
        industry={industry}
        city={city}
      />
    </>
  );
}
