"use client";

import React from 'react';
import { generateLocalBusinessSchema } from '../../lib/seo';

export default function LocalSchema() {
  const schema = generateLocalBusinessSchema();
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
