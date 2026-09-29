import React from 'react';
import { getAllGlossarySlugs, getGlossaryTerm } from '../../../lib/firebase-admin';

interface PageProps {
  params: {
    term: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllGlossarySlugs();
  return slugs.map((term) => ({ term }));
}

export async function generateMetadata({ params }: PageProps) {
  const termData: any = await getGlossaryTerm(params.term);
  const title = termData?.seo_title || `${params.term.replace(/-/g, ' ').toUpperCase()} - Definisi & Penerapan Bisnis | Chestaa`;
  const description = termData?.simple_definition || `Panduan teknis dan implementasi enterprise untuk ${params.term} oleh Chestaa B2B Digital Agency.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://chestaa.com/kamus-ai-teknologi/${params.term}`,
      type: 'article'
    }
  };
}

export default async function GlossaryServerPage({ params }: PageProps) {
  const termData: any = await getGlossaryTerm(params.term);
  const termName = termData?.term_name || params.term.replace(/-/g, ' ').toUpperCase();
  const definition = termData?.simple_definition || 'Definisi dan penerapan teknologi enterprise.';

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white p-12">
      <h1 className="text-4xl font-bold">{termName}</h1>
      <p className="mt-4 text-slate-400">{definition}</p>
    </main>
  );
}
