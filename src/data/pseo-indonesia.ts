// Centralized database of targeted cities and core services for national programmatic SEO (pSEO) matrix

export const INDONESIA_CITIES = [
  'Jakarta', 
  'Surabaya', 
  'Bandung', 
  'Medan', 
  'Semarang', 
  'Tangerang', 
  'Depok', 
  'Bekasi', 
  'BSD City',
  'Gading Serpong',
  'SCBD',
  'Mega Kuningan',
  'Kelapa Gading',
  'Pantai Indah Kapuk',
  'Sudirman',
  'Thamrin',
  'Kuningan',
  'Cisauk',
  'Rawa Buntu',
  'Pemalang',
];

export const CORE_PSEO_SERVICES = [
  { id: 'konsultan-ai', name: 'Konsultan AI Enterprise' },
  { id: 'jasa-karyawan-digital', name: 'Karyawan Digital & Automasi' },
  { id: 'web-ecommerce-b2b', name: 'Web E-Commerce B2B' },
  { id: 'infrastruktur-erp', name: 'Infrastruktur ERP Custom' }
];

// Helper to generate exact slug, e.g., 'jasa-karyawan-digital-surabaya'
export const generateSlug = (serviceId: string, city: string): string => {
  return serviceId + '-' + city.toLowerCase().replace(/\s+/g, '-');
};
