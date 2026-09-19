import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbs, getBreadcrumbsForRoute, BreadcrumbItemSchema } from '../../lib/seo';

interface DynamicBreadcrumbSchemaProps {
  customBreadcrumbs?: BreadcrumbItemSchema[];
  currentTitle?: string;
}

export default function DynamicBreadcrumbSchema({ customBreadcrumbs, currentTitle }: DynamicBreadcrumbSchemaProps) {
  const location = useLocation();
  
  const breadcrumbs = customBreadcrumbs && customBreadcrumbs.length > 0
    ? customBreadcrumbs
    : getBreadcrumbsForRoute(location.pathname, currentTitle);
    
  const schema = generateBreadcrumbs(breadcrumbs);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
