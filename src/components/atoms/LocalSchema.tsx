"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema } from '../../lib/seo';

export default function LocalSchema() {
  const schema = generateLocalBusinessSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
