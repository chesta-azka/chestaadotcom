export interface DynamicCopyResult {
  industry: string;
  city: string;
  title: string;
  description: string;
  hook: string;
  body: string;
  metric: string;
  metricLabel: string;
}

export function generateDynamicCopy(industryParam: string, cityParam: string): DynamicCopyResult {
  const industry = industryParam ? industryParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Enterprise";
  const city = cityParam ? cityParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Jakarta";

  return {
    industry,
    city,
    title: `Jasa Web & AI Khusus ${industry} di ${city} | Chestaa`,
    description: `Jujurly, kompetisi bisnis ${industry} di ${city} lagi red ocean banget. Kalau lo masih pakai cara manual, operasional lo literally bakal boncos. Waktunya migrasi ke sistem otonom.`,
    hook: `Jujurly, kompetisi bisnis ${industry} di ${city} lagi red ocean banget. Kalau lo masih pakai cara manual, operasional lo literally bakal boncos. Waktunya migrasi ke sistem otonom.`,
    body: `Chestaa menghadirkan arsitektur digital Next.js berkecepatan sub-detik dan otomatisasi AI khusus untuk mendominasi pasar ${industry} di ${city}. Tidak ada lagi ketergantungan pada agensi lambat atau vendor yang tidak transparan.`,
    metric: "Hingga 5.2x",
    metricLabel: `Peningkatan efisiensi operasional dan ROAS ${industry} di ${city}`
  };
}

export function generateServiceMetadata(industry: string, city: string) {
  const copy = generateDynamicCopy(industry, city);
  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `https://chestaa.com/services/${industry}/${city}`,
      type: 'website',
      images: [
        {
          url: 'https://picsum.photos/seed/chestaa-pseo/1200/630',
          width: 1200,
          height: 630,
          alt: copy.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@chestaadotcom',
      creator: '@chestaadotcom',
      title: copy.title,
      description: copy.description,
      images: ['https://picsum.photos/seed/chestaa-pseo/1200/630']
    }
  };
}
