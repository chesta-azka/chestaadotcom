import React from 'react';
import SEOMetadata from './atoms/SEOMetadata';

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  schemas?: any[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function SEO({
  title,
  description,
  path,
  noindex,
  schemas,
  breadcrumbs,
}: SEOProps) {
  return (
    <SEOMetadata
      title={title}
      description={description}
      path={path}
      noindex={noindex}
      breadcrumbs={breadcrumbs}
      jsonLd={schemas && schemas.length === 1 ? schemas[0] : undefined}
    />
  );
}

export default SEO;
