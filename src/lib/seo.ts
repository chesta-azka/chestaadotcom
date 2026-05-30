export const generateAgencyJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'chestaa.com',
    image: 'https://chestaa.com/og-image.png',
    '@id': 'https://chestaa.com/',
    url: 'https://chestaa.com/',
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
    description: 'chestaa.com - Digital Architectural Agency providing premium website services for UMKM and local brands in Cisauk, Bogor, BSD, Gading Serpong, and Kebayoran.',
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

