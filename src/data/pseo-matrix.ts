// Array of Elite Locations
export const GEO_LOCATIONS = ['bsd-city', 'jakarta-selatan', 'scbd', 'senopati', 'gading-serpong', 'alam-sutera', 'pik', 'surabaya-barat'];

// Array of B2B High-Ticket Keywords
export const AEO_SERVICES = ['konsultan-ai-automation', 'jasa-karyawan-digital', 'arsitektur-headless-ecommerce', 'pengembangan-erp-perusahaan', 'fractional-cto-agency', 'jasa-pembuatan-super-app'];

export const generatePseoSlugs = () => {
  const slugs: string[] = [];
  AEO_SERVICES.forEach((service) => {
    GEO_LOCATIONS.forEach((geo) => {
      slugs.push(service + '-' + geo);
    });
  });
  return slugs;
};
