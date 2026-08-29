import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaMarkup from './SchemaMarkup';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

export default function SEOMetadata({
  title = 'CHESTAADOTCOM - Arsitektur Digital & Agentic AI',
  description = 'Solusi rancang bangun digital premium dan otomatisasi bisnis menggunakan Agentic AI.',
  image = '/og-image.jpg',
  url = 'https://chestacode.com',
  type = 'website',
  schema,
}: SEOMetadataProps) {
  const fullTitle = title.includes('CHESTAADOTCOM') ? title : `${title} | CHESTAADOTCOM`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CHESTAADOTCOM',
    image: url + image,
    '@id': url,
    url: url,
    telephone: '+6282125447232',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID'
    },
    description: description,
    priceRange: '$$'
  };

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="canonical" href={url} />
      </Helmet>
      <SchemaMarkup schema={schema || defaultSchema} />
    </>
  );
}
