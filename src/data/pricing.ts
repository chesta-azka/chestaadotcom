export interface PricingPackage {
  id: 'starter' | 'growth' | 'custom-web' | 'otomasi' | 'ai-agent' | 'software';
  nameId: string;
  nameEn: string;
  forId: string;
  forEn: string;
  from: number;
  unitId?: string;
  unitEn?: string;
  timeId: string;
  timeEn: string;
  revisions: number;
  supportId: string;
  supportEn: string;
}

export interface PricingCarePackage {
  id: 'basic' | 'plus';
  nameId: string;
  nameEn: string;
  perMonth: number;
  descId: string;
  descEn: string;
}

export interface PricingAddon {
  id: string;
  nameId: string;
  nameEn: string;
  price: number;
  unitId?: string;
  unitEn?: string;
  prefixId?: string;
  prefixEn?: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    nameId: 'Starter',
    nameEn: 'Starter',
    forId: 'Bisnis baru atau yang butuh halaman cepat',
    forEn: 'New businesses or those needing a fast landing page',
    from: 1200000,
    timeId: '2-4 hari kerja',
    timeEn: '2-4 working days',
    revisions: 1,
    supportId: '7 hari',
    supportEn: '7 days',
  },
  {
    id: 'growth',
    nameId: 'Growth',
    nameEn: 'Growth',
    forId: 'Bisnis yang rutin beriklan',
    forEn: 'Businesses running regular ad campaigns',
    from: 3500000,
    timeId: '5-7 hari kerja',
    timeEn: '5-7 working days',
    revisions: 2,
    supportId: '14 hari',
    supportEn: '14 days',
  },
  {
    id: 'custom-web',
    nameId: 'Custom Web',
    nameEn: 'Custom Web',
    forId: 'Website dengan banyak halaman atau fitur khusus',
    forEn: 'Multi-page websites or custom web features',
    from: 8500000,
    timeId: '2-4 minggu',
    timeEn: '2-4 weeks',
    revisions: 3,
    supportId: '30 hari',
    supportEn: '30 days',
  },
  {
    id: 'otomasi',
    nameId: 'Otomasi Workflow',
    nameEn: 'Workflow Automation',
    forId: 'Kerja berulang yang ingin dihemat',
    forEn: 'Repetitive tasks you want to save time on',
    from: 3500000,
    unitId: 'per alur',
    unitEn: 'per workflow',
    timeId: '3-7 hari kerja',
    timeEn: '3-7 working days',
    revisions: 2,
    supportId: '14 hari',
    supportEn: '14 days',
  },
  {
    id: 'ai-agent',
    nameId: 'AI Agent WhatsApp',
    nameEn: 'WhatsApp AI Agent',
    forId: 'Balasan chat, booking, dan follow-up yang berulang',
    forEn: 'Repetitive chat replies, booking, and follow-ups',
    from: 7500000,
    unitId: 'per alur',
    unitEn: 'per workflow',
    timeId: '3-4 minggu',
    timeEn: '3-4 weeks',
    revisions: 2,
    supportId: '30 hari',
    supportEn: '30 days',
  },
  {
    id: 'software',
    nameId: 'Software Custom',
    nameEn: 'Custom Software',
    forId: 'Sistem internal, dashboard, atau aplikasi web',
    forEn: 'Internal systems, operational dashboards, or web apps',
    from: 15000000,
    timeId: '4-12 minggu',
    timeEn: '4-12 weeks',
    revisions: 3,
    supportId: '30 hari',
    supportEn: '30 days',
  },
];

export const PRICING_CARE_PACKAGES: PricingCarePackage[] = [
  {
    id: 'basic',
    nameId: 'Rawat Basic',
    nameEn: 'Basic Care',
    perMonth: 500000,
    descId: 'Pembaruan rutin, cadangan bulanan, dan pengecekan keamanan.',
    descEn: 'Routine updates, monthly backups, and security checks.',
  },
  {
    id: 'plus',
    nameId: 'Rawat Plus',
    nameEn: 'Care Plus',
    perMonth: 1500000,
    descId: 'Pembaruan rutin, cadangan mingguan, optimasi performa, dan jam dukungan prioritas.',
    descEn: 'Routine updates, weekly backups, performance optimization, and priority support hours.',
  },
];

export const PRICING_ADDONS: PricingAddon[] = [
  {
    id: 'halaman-tambahan',
    nameId: 'Halaman tambahan',
    nameEn: 'Additional page',
    price: 350000,
    unitId: 'per halaman',
    unitEn: 'per page',
  },
  {
    id: 'copywriting',
    nameId: 'Copywriting',
    nameEn: 'Copywriting',
    price: 300000,
    unitId: 'per halaman',
    unitEn: 'per page',
  },
  {
    id: 'versi-en',
    nameId: 'Versi bahasa Inggris (terjemahan 1:1)',
    nameEn: 'English version (1:1 translation)',
    price: 250000,
    unitId: 'per halaman',
    unitEn: 'per page',
  },
  {
    id: 'integrasi-form-sheets',
    nameId: 'Integrasi formulir atau WhatsApp ke Google Sheets',
    nameEn: 'Form or WhatsApp integration to Google Sheets',
    price: 500000,
  },
  {
    id: 'tracking-klik',
    nameId: 'Tracking klik WhatsApp dan formulir',
    nameEn: 'WhatsApp and form click tracking',
    price: 500000,
  },
  {
    id: 'otomasi-tambahan',
    nameId: 'Alur otomasi tambahan',
    nameEn: 'Additional automation workflow',
    price: 1500000,
    prefixId: 'mulai',
    prefixEn: 'starting from',
  },
  {
    id: 'integrasi-api',
    nameId: 'Integrasi API pihak ketiga',
    nameEn: 'Third-party API integration',
    price: 1000000,
    prefixId: 'mulai',
    prefixEn: 'starting from',
  },
  {
    id: 'revisi-tambahan',
    nameId: 'Revisi tambahan',
    nameEn: 'Additional revision round',
    price: 250000,
    unitId: 'per putaran',
    unitEn: 'per round',
  },
  {
    id: 'perubahan-kecil',
    nameId: 'Perubahan kecil di luar paket rawat',
    nameEn: 'Minor changes outside maintenance package',
    price: 150000,
    unitId: 'per jam',
    unitEn: 'per hour',
  },
  {
    id: 'konsultasi-teknologi',
    nameId: 'Konsultasi teknologi',
    nameEn: 'Technology consultation',
    price: 300000,
    unitId: 'per sesi 60 menit',
    unitEn: 'per 60-minute session',
  },
];

/**
 * Single source of truth currency formatter
 * Indonesian: Rp1.200.000 (no space)
 * English: IDR 1,200,000 (space)
 */
export function formatCurrency(amount: number, locale: 'id' | 'en' = 'id'): string {
  if (locale === 'en') {
    const formatted = new Intl.NumberFormat('en-US').format(amount);
    return `IDR ${formatted}`;
  }
  const formatted = new Intl.NumberFormat('id-ID').format(amount);
  return `Rp${formatted}`;
}

export function getPricingPackage(id: PricingPackage['id']): PricingPackage {
  const pkg = PRICING_PACKAGES.find((p) => p.id === id);
  if (!pkg) {
    throw new Error(`Pricing package with id '${id}' not found`);
  }
  return pkg;
}

export function getPricingCarePackage(id: PricingCarePackage['id']): PricingCarePackage {
  const care = PRICING_CARE_PACKAGES.find((c) => c.id === id);
  if (!care) {
    throw new Error(`Pricing care package with id '${id}' not found`);
  }
  return care;
}
