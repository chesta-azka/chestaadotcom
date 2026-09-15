import React from 'react';
import { Helmet } from 'react-helmet-async';
import seoConfig from '../../data/seo-config.json';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEOMetadata({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type 
}: SEOMetadataProps) {
  const defaults = seoConfig.default;
  
  const seoTitle = title ? defaults.titleTemplate.replace('%s', title) : defaults.title;
  const seoDescription = description || defaults.description;
  const seoKeywords = keywords || defaults.keywords;
  const seoImage = image || defaults.openGraph.image;
  const seoUrl = url || defaults.openGraph.url;
  const seoType = type || defaults.openGraph.type;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={defaults.author} />

      {/* OpenGraph */}
      <meta property="og:type" content={seoType} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content={defaults.openGraph.imageWidth} />
      <meta property="og:image:height" content={defaults.openGraph.imageHeight} />
      <meta property="og:site_name" content={defaults.openGraph.site_name} />
      <meta property="og:locale" content={defaults.openGraph.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={defaults.twitter.cardType} />
      <meta name="twitter:site" content={defaults.twitter.site} />
      <meta name="twitter:creator" content={defaults.twitter.handle} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
}
