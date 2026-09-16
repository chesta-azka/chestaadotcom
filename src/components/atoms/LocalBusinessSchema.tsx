import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  generateLocalBusinessSchema, 
  generateITServiceSchema, 
  generateWebDevServiceSchema 
} from '../../lib/seo';

/**
 * LocalBusinessSchema
 * 
 * Specifically embeds 'aggregateRating' and 'openingHoursSpecification' for 
 * the BSD/Cisauk physical presence, extended with explicit 'Service' JSON-LD markup
 * defining 'Jasa IT' and 'Website Development' service offerings to boost local 
 * search trust signals and service indexing in Google's Knowledge Graph.
 */
export default function LocalBusinessSchema() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const itServiceSchema = generateITServiceSchema();
  const webDevServiceSchema = generateWebDevServiceSchema();

  return (
    <Helmet>
      {/* Primary LocalBusiness Schema with embedded Catalog & Offers */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Explicit Service Schema: Jasa IT */}
      <script type="application/ld+json">
        {JSON.stringify(itServiceSchema)}
      </script>

      {/* Explicit Service Schema: Website Development */}
      <script type="application/ld+json">
        {JSON.stringify(webDevServiceSchema)}
      </script>
    </Helmet>
  );
}
