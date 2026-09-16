export interface GeoServicePage {
  url: string;
  title: string;
  description: string;
  keyword: string;
  location: string;
}

/**
 * Programmatically generates SEO-optimized Geo Service Pages metadata
 * based on hyper-local sub-districts. These can be used to feed sitemaps
 * or display directories of local landing pages.
 */
export function generateGeoServicePages(baseService: string = 'Jasa Pembuatan Website'): GeoServicePage[] {
  // Core target areas around BSD & Cisauk
  const localDistricts = [
    "CISAUK", "SERPONG", "SAMPORA", "MEDANG", "PAGEDANGAN",
    "SETU", "PAMULANG", "CIPUTAT", "BINTARO", "ALAM-SUTERA",
    "KARAWACI", "CILENGGANG", "RAWABUNTU", "CUKANGGALIH"
  ];

  return localDistricts.map(district => {
    const formattedLocation = district.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    
    return {
      url: `/area/${district.toLowerCase()}`,
      location: formattedLocation,
      keyword: `${baseService} di ${formattedLocation}`,
      title: `${baseService} & Solusi IT Terbaik di ${formattedLocation}`,
      description: `CHESTAADOTCOM menyediakan layanan ${baseService}, pengembangan aplikasi web performa tinggi, dan automasi AI khusus untuk ekosistem bisnis di ${formattedLocation}.`
    };
  });
}
