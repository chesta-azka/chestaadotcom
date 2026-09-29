import React from 'react';
import { getPseoTargets } from '../../../../lib/firebase-admin';
import { generateServiceMetadata, generateDynamicCopy } from '../../../../lib/seo-utils';

interface PageProps {
  params: {
    industry: string;
    city: string;
  };
}

export async function generateStaticParams() {
  const { industries, cities } = await getPseoTargets();

  const paths = [];
  for (const industry of industries) {
    for (const city of cities) {
      paths.push({ industry, city });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps) {
  return generateServiceMetadata(params.industry, params.city);
}

export default async function ProgrammaticSEOPage({ params }: PageProps) {
  const { industry, city } = params;
  const copy = generateDynamicCopy(industry, city);

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white p-12">
      <h1 className="text-4xl font-bold">{copy.title}</h1>
      <p className="mt-4 text-slate-400">
        {copy.description}
      </p>
    </main>
  );
}
