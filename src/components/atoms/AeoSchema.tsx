import React from 'react';

interface AeoSchemaProps {
  serviceName?: string;
  description?: string;
  serviceType?: string;
  url?: string;
  city?: string;
  industry?: string;
}

/**
 * Unified Schema.org @graph is handled centrally by SEOMetadata & buildStructuredDataGraph
 * to prevent duplicate Organization/LocalBusiness/FAQPage blocks or fictional branch addresses.
 */
export default function AeoSchema(_props: AeoSchemaProps) {
  return null;
}
