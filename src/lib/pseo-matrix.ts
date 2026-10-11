export const ENTERPRISE_SERVICES = [
  'konsultan-integrasi-ai-korporat',
  'arsitektur-modernisasi-sistem-it',
  'pembuatan-erp-kustom-manufaktur',
  'arsitektur-headless-ecommerce',
  'vendor-portal-b2b-distributor'
];

export const UMKM_SERVICES = [
  'jasa-pembuatan-website-toko-online',
  'aplikasi-kasir-pos-waralaba',
  'sistem-antrean-klinik-kecantikan',
  'jasa-admin-whatsapp-ai-otomatis',
  'software-akuntansi-umkm-tanpa-langganan'
];

export interface PseoLocation {
  id: string;
  name: string;
  slug: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  tag: string;
  description: string;
}

export const LOCATIONS: PseoLocation[] = [
  {
    id: 'ciputat',
    name: 'Ciputat',
    slug: 'ciputat',
    district: 'Ciputat',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15411',
    tag: 'Sentra Bisnis & UMKM Komersial',
    description: 'Pusat perdagangan lokal dan UMKM berkembang pesat di Tangerang Selatan.'
  },
  {
    id: 'ciledug',
    name: 'Ciledug',
    slug: 'ciledug',
    district: 'Ciledug',
    city: 'Tangerang',
    province: 'Banten',
    postalCode: '15153',
    tag: 'Koridor Perdagangan & Ritel Padat',
    description: 'Kawasan pusat grosir, toko retail, dan sentra UMKM komersial bervolume tinggi.'
  },
  {
    id: 'bintaro-sektor-9',
    name: 'Bintaro Sektor 9',
    slug: 'bintaro-sektor-9',
    district: 'Pondok Aren',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15229',
    tag: 'Sentra Komersial & Kuliner Premium',
    description: 'Kawasan pusat F&B, kafe, dan ruko bisnis modern dengan penetrasi digital tinggi.'
  },
  {
    id: 'pamulang-barat',
    name: 'Pamulang Barat',
    slug: 'pamulang-barat',
    district: 'Pamulang',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15417',
    tag: 'Sentra Jasa & UMKM Lokal',
    description: 'Wilayah padat penduduk dengan ekosistem bisnis lokal dan jasa profesional.'
  },
  {
    id: 'serpong-utara',
    name: 'Serpong Utara',
    slug: 'serpong-utara',
    district: 'Serpong Utara',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15325',
    tag: 'Koridor Ruko & Komersial Alam Sutera',
    description: 'Sentra ruko bisnis, klinik kecantikan, dan showroom komersial premium.'
  },
  {
    id: 'pasar-modern-bsd',
    name: 'Pasar Modern BSD',
    slug: 'pasar-modern-bsd',
    district: 'Serpong',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15318',
    tag: 'Pusat Perdagangan & Kuliner Legendaris',
    description: 'Kawasan niaga harian dengan ratusan pedagang ritel, grosir, dan UMKM makanan.'
  },
  {
    id: 'citra-raya-cikupa',
    name: 'Citra Raya Cikupa',
    slug: 'citra-raya-cikupa',
    district: 'Cikupa',
    city: 'Kabupaten Tangerang',
    province: 'Banten',
    postalCode: '15710',
    tag: 'Kota Mandiri & Sentra UMKM Kabupaten',
    description: 'Pusat ekonomi mandiri dengan ribuan toko retail, ruko, dan sentra kuliner.'
  },
  {
    id: 'gading-serpong-ruko',
    name: 'Gading Serpong Ruko',
    slug: 'gading-serpong-ruko',
    district: 'Kelapa Dua',
    city: 'Kabupaten Tangerang',
    province: 'Banten',
    postalCode: '15810',
    tag: 'Pusat Ruko Komersial Terpadu',
    description: 'Koridor bisnis komersial dengan konsentrasi tertinggi franchise dan klinik kecantikan.'
  }
];
