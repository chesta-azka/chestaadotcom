import { Metadata } from 'next';
import { SERVICES_DATA } from '../../../data/servicesData';
import { SEO_SERVICES } from '../../../data/seo-services';
import generatedContentRaw from '../../../data/generated-service-content.json';

const generatedContent = generatedContentRaw as Record<string, { metaDescription: string, intro: string }>;

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const coreService = SERVICES_DATA[slug];
  if (coreService) {
    const canonicalUrl = `https://chestaa.com/services/${slug}`;
    const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(coreService.title)}&category=Services`;
    return {
      title: `${coreService.title} | CHESTAA Enterprise`,
      description: coreService.heroDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: coreService.title,
        description: coreService.heroDescription,
        url: canonicalUrl,
        type: 'website',
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: coreService.title }],
      },
    };
  }

  const pseoService = SEO_SERVICES.find(s => s.id === slug);
  if (pseoService) {
    const aiContent = generatedContent[slug];
    const title = `${pseoService.name} | Solusi Digital Enterprise Terbaik Indonesia`;
    const description = aiContent?.metaDescription || `${pseoService.description} Chestaa menghadirkan arsitektur ${pseoService.name} kelas dunia.`;
    return {
      title,
      description,
      openGraph: { title, description, locale: 'id_ID', type: 'website' },
    };
  }

  return { title: 'Layanan Tidak Ditemukan | Chestaa' };
}

export async function generateStaticParams() {
  const coreSlugs = Object.keys(SERVICES_DATA).map(slug => ({ slug }));
  const pseoSlugs = SEO_SERVICES.map(s => ({ slug: s.id }));
  return [...coreSlugs, ...pseoSlugs];
}

export default function ServiceLayout({ children }: Props) {
  return <>{children}</>;
}
