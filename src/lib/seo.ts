export const generateAgencyJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'chestaa - Jasa website oleh Chesta Azka Sofyan',
    image: 'https://chestaadotcom.com/og-image.png',
    logo: 'https://chestaadotcom.com/favicon.svg',
    '@id': 'https://chestaadotcom.com/',
    url: 'https://chestaadotcom.com/',
    telephone: '+6282125447232',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cisauk, Tangerang',
      addressLocality: 'Tangerang',
      addressRegion: 'Banten',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.3268875,
      longitude: 106.639352,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', 'name': 'Cisauk' },
      { '@type': 'AdministrativeArea', 'name': 'Bogor' },
      { '@type': 'AdministrativeArea', 'name': 'BSD City' },
      { '@type': 'AdministrativeArea', 'name': 'Gading Serpong' },
      { '@type': 'AdministrativeArea', 'name': 'Kebayoran' },
      { '@type': 'AdministrativeArea', 'name': 'Tangerang' },
      { '@type': 'AdministrativeArea', 'name': 'Jakarta' }
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: 'Rp450.000 - Rp5.000.000',
    description: 'CHESTADOTCOM by Chesta Azka Sofyan - Digital Architectural Agency offering premium website services for UMKM and corporate brands in Cisauk, BSD City, Gading Serpong, and Bogor.',
    founder: {
      '@type': 'Person',
      name: 'Chesta Azka Sofyan',
      jobTitle: 'Digital Architect & Web Developer',
      url: 'https://chestaadotcom.com/',
      sameAs: [
        'https://linkedin.com/in/chestaazkasofyan',
        'https://github.com/chestaazkasofyan',
        'https://instagram.com/chestaazkasofyan'
      ]
    },
    sameAs: [
      'https://instagram.com/chestaadotcom',
      'https://linkedin.com/company/chestaadotcom'
    ]
  };
};

export const generateSitelinksSearchBox = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'chestaa - Jasa website',
    url: 'https://chestaadotcom.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://chestaadotcom.com/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

export const generateSiteNavigationElement = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Beranda (Home)',
        description: 'Layanan konsultasi pembuatan website korporat dan UMKM.',
        url: 'https://chestaadotcom.com/'
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Project (Portofolio)',
        description: 'Kumpulan studi kasus karya arsitektur digital chestaa - Jasa website.',
        url: 'https://chestaadotcom.com/#projects'
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Blog (SEO & Bisnis)',
        description: 'Artikel seputar SEO, pembuatan website, dan tips bisnis UMKM oleh Chesta Azka Sofyan.',
        url: 'https://chestaadotcom.com/blog'
      }
    ]
  };
};

export const generateFAQSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Berapa lama waktu pengerjaan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Biasanya 3-5 hari kerja untuk website standar, tergantung kompleksitas fitur yang diinginkan.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah harga sudah termasuk domain dan hosting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kami dapat memberikan rekomendasi, namun biaya domain dan hosting biasanya dipisahkan agar Anda memiliki kontrol penuh atas aset digital Anda.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah bisa melakukan revisi setelah desain selesai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tentu, paket kami sudah mencakup hingga 2x sesi revisi minor untuk memastikan hasil akhir sesuai dengan ekspektasi Anda.'
        }
      },
      {
        '@type': 'Question',
        name: 'Bagaimana cara pembayarannya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Untuk menjaga komitmen kedua belah pihak, kami menerapkan sistem DP 50% di awal, dan pelunasan sisanya setelah website sudah live dan Anda terima.'
        }
      }
    ]
  };
};

