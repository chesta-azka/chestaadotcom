import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface LocationMeta {
  title: string;
  description: string;
  keywords: string;
}

const METADATA_BY_LOCATION: Record<string, LocationMeta> = {
  general: {
    title: 'chestaa.com | Premium Digital Architectural Agency',
    description: 'Digital Architectural Agency premium yang mendesain website berkecepatan tinggi dan berestetika modern untuk UMKM dan brand lokal di Jabodetabek.',
    keywords: 'jasa pembuatan website, website premium, web developer tangerang, web design jakarta'
  },
  cisauk: {
    title: 'Jasa Pembuatan Website Premium Cisauk & Tangerang | chestaa.com',
    description: 'Digital Architectural Agency berlokasi di Cisauk, Tangerang. Kami melayani desain website premium dengan estetika modern, performa super kilat, dan optimasi SEO lokal.',
    keywords: 'jasa website cisauk, bikin website tangerang, digital agency cisauk, web developer banten'
  },
  bsd: {
    title: 'Jasa Pembuatan Website BSD City & Gading Serpong | chestaa.com',
    description: 'Akselerasi digital bisnis Anda di BSD City & Gading Serpong dengan website berstandar premium, arsitektur code modern, dan SEO local saturation super optimal.',
    keywords: 'website bsd city, gading serpong web design, jasa website ruko bsd, modern developer bsd'
  },
  kebayoran: {
    title: 'Jasa Pembuatan Website Premium Kebayoran & Jakarta Selatan | chestaa.com',
    description: 'Layanan eksklusif pembuatan website premium & korporasi di Kebayoran dan Jakarta Selatan. Desain ultra-slick, clean, dan dioptimasi performa tinggi.',
    keywords: 'jasa website jakarta selatan, web design kebayoran, premium web developer jakarta, agensi website eksklusif'
  },
  bogor: {
    title: 'Jasa Pembuatan Website Bogor & Sekitarnya | chestaa.com',
    description: 'Solusi ekspansi dan digitalisasi produk unggulan lokal di kawasan Bogor. Dapatkan website dengan performa tinggi, desain modular, serta ramah pencarian Google.',
    keywords: 'jasa web bogor, pembuatan website di bogor, digitalisasi umkm bogor, seo lokal bogor'
  }
};

export default function DynamicLocationMeta() {
  const [activeLocation, setActiveLocation] = useState<string>('general');

  useEffect(() => {
    const handleLocationChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locationKey: string }>;
      if (customEvent.detail && customEvent.detail.locationKey) {
        const key = customEvent.detail.locationKey.toLowerCase();
        if (METADATA_BY_LOCATION[key]) {
          setActiveLocation(key);
        }
      }
    };

    window.addEventListener('chestaa-active-location', handleLocationChange);
    return () => {
      window.removeEventListener('chestaa-active-location', handleLocationChange);
    };
  }, []);

  const meta = METADATA_BY_LOCATION[activeLocation] || METADATA_BY_LOCATION.general;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
}
