export const generateAgencyJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CHESTADOTCOM',
    image: 'https://chestacod.com/og-image.png',
    '@id': 'https://chestacod.com/',
    url: 'https://chestacod.com/',
    telephone: '+6282125447232',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088,
      longitude: 106.8456,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: 'Rp450.000 - Rp5.000.000',
    description: 'CHESTADOTCOM - Digital Architectural Agency providing premium website services for UMKM and local brands.',
  };
};
