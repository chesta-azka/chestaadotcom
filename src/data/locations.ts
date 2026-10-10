export interface HyperLocalLocation {
  id: string;
  name: string;
  slug: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tier: 'tier-1' | 'tier-2';
  tag: string;
  description: string;
  commercialHubs: string[];
}

export const HYPER_LOCAL_LOCATIONS: HyperLocalLocation[] = [
  {
    id: 'bsd-city',
    name: 'BSD City',
    slug: 'bsd-city',
    district: 'Serpong',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15345',
    coordinates: { lat: -6.3006, lng: 106.6527 },
    tier: 'tier-1',
    tag: 'Digital Hub & Green Office Park',
    description: 'Pusat teknologi terdepan dan ekosistem perkantoran enterprise terbesar di barat Jakarta.',
    commercialHubs: ['Digital Hub', 'The Breeze', 'Green Office Park', 'ICE BSD']
  },
  {
    id: 'serpong',
    name: 'Serpong',
    slug: 'serpong',
    district: 'Serpong',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15310',
    coordinates: { lat: -6.3158, lng: 106.6717 },
    tier: 'tier-1',
    tag: 'Koridor Bisnis & Komersial',
    description: 'Kawasan pusat komersial dan bisnis multisektor strategis Tangerang Selatan.',
    commercialHubs: ['ITC BSD', 'BSD Square', 'Ruko Tol Boulevard']
  },
  {
    id: 'gading-serpong',
    name: 'Gading Serpong',
    slug: 'gading-serpong',
    district: 'Kelapa Dua',
    city: 'Kabupaten Tangerang',
    province: 'Banten',
    postalCode: '15810',
    coordinates: { lat: -6.2413, lng: 106.6285 },
    tier: 'tier-1',
    tag: 'Pusat Retail & Sentra Bisnis',
    description: 'Kawasan ekonomi berkembang pesat dengan ribuan entitas F&B, hospitality, dan ruko komersial.',
    commercialHubs: ['Summarecon Mall Serpong', 'Bez Walk', 'Scientia Square Park']
  },
  {
    id: 'alam-sutera',
    name: 'Alam Sutera',
    slug: 'alam-sutera',
    district: 'Pinang & Serpong Utara',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15325',
    coordinates: { lat: -6.2238, lng: 106.6534 },
    tier: 'tier-1',
    tag: 'Kawasan Perkantoran & Finansial',
    description: 'Pusat gedung pencakar langit korporat, universitas ternama, dan jaringan ritel skala besar.',
    commercialHubs: ['Mall @ Alam Sutera', 'Synergy Building', 'Prominence Tower']
  },
  {
    id: 'bintaro-jaya',
    name: 'Bintaro Jaya',
    slug: 'bintaro-jaya',
    district: 'Pondok Aren',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15224',
    coordinates: { lat: -6.2841, lng: 106.7262 },
    tier: 'tier-1',
    tag: 'CBD Bintaro & Smart District',
    description: 'Sentra industri kreatif, perbankan, dan residensial premium terintegrasi transportasi massal.',
    commercialHubs: ['Bintaro Jaya Xchange', 'CBD Bintaro Sektor 7', 'Titan Center']
  },
  {
    id: 'pamulang',
    name: 'Pamulang',
    slug: 'pamulang',
    district: 'Pamulang',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15417',
    coordinates: { lat: -6.3424, lng: 106.7383 },
    tier: 'tier-2',
    tag: 'Sentra UMKM & Pendidikan',
    description: 'Wilayah dengan kepadatan bisnis komersial tinggi dan pertumbuhan UMKM jasa digital yang dinamis.',
    commercialHubs: ['Pamulang Square', 'Pusat Pemerintahan Tangsel', 'Jalan Surya Kencana']
  },
  {
    id: 'ciputat',
    name: 'Ciputat',
    slug: 'ciputat',
    district: 'Ciputat',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15411',
    coordinates: { lat: -6.3121, lng: 106.7497 },
    tier: 'tier-2',
    tag: 'Pusat Perdagangan & Akses Tol',
    description: 'Pintu gerbang penghubung Jakarta Selatan dan Banten dengan ribuan titik komersial aktif.',
    commercialHubs: ['Pasar Ciputat Modern', 'Plaza Ciputat', 'Koridor Juanda']
  },
  {
    id: 'pondok-aren',
    name: 'Pondok Aren',
    slug: 'pondok-aren',
    district: 'Pondok Aren',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15220',
    coordinates: { lat: -6.2692, lng: 106.7027 },
    tier: 'tier-2',
    tag: 'Koridor Bisnis & Hunian Berkembang',
    description: 'Kawasan strategis yang berbatasan langsung dengan Bintaro dan Jakarta Barat.',
    commercialHubs: ['Plaza Bintaro Satoe', 'Pondok Aren Business Park']
  },
  {
    id: 'cisauk',
    name: 'Cisauk',
    slug: 'cisauk',
    district: 'Cisauk',
    city: 'Kabupaten Tangerang',
    province: 'Banten',
    postalCode: '15341',
    coordinates: { lat: -6.3439, lng: 106.6432 },
    tier: 'tier-1',
    tag: 'Transit Oriented Development (TOD)',
    description: 'Kawasan transit utama yang terintegrasi langsung dengan BSD City dan jalur commuterline Jabodetabek.',
    commercialHubs: ['Pasar Modern Intermoda BSD', 'Stasiun Cisauk TOD', 'Ruko Griya Cisauk']
  },
  {
    id: 'rawa-buntu',
    name: 'Rawa Buntu',
    slug: 'rawa-buntu',
    district: 'Serpong',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15318',
    coordinates: { lat: -6.3197, lng: 106.6783 },
    tier: 'tier-1',
    tag: 'Akses Tol & Komersial Ring-1',
    description: 'Hub mobilitas utama komuter eksekutif dengan akses gerbang tol Serpong-Jakarta.',
    commercialHubs: ['Stasiun Rawa Buntu', 'Ruko Rawa Buntu Sentra', 'Kawasan Niaga Ciater']
  },
  {
    id: 'setu',
    name: 'Setu',
    slug: 'setu',
    district: 'Setu',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15314',
    coordinates: { lat: -6.3498, lng: 106.6775 },
    tier: 'tier-2',
    tag: 'Pusat Riset Teknologi Nasional',
    description: 'Pusat kawasan riset ilmiah dan teknologi tinggi dengan fasilitas Puspiptek.',
    commercialHubs: ['Kawasan Puspiptek', 'Taman Tekno Selatan', 'Jalan Raya Puspiptek']
  },
  {
    id: 'muncul',
    name: 'Muncul',
    slug: 'muncul',
    district: 'Setu',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15314',
    coordinates: { lat: -6.3547, lng: 106.6669 },
    tier: 'tier-2',
    tag: 'Koridor Bisnis & Pendidikan Tinggi',
    description: 'Simpul penghubung Tangsel dan Bogor dengan lalu lintas komersial dan kampus yang padat.',
    commercialHubs: ['Simpang Muncul Commercial Center', 'Area Kampus ITI']
  },
  {
    id: 'babakan',
    name: 'Babakan',
    slug: 'babakan',
    district: 'Setu',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15315',
    coordinates: { lat: -6.3389, lng: 106.6841 },
    tier: 'tier-2',
    tag: 'Zona Logistik & Industri Hijau',
    description: 'Kawasan berkembang dengan gudang penyimpanan logistik dan sentra distribusi e-commerce.',
    commercialHubs: ['Sentra Pergudangan Babakan', 'Akses Lingkar Luar Ciater']
  },
  {
    id: 'tangerang-selatan',
    name: 'Tangerang Selatan',
    slug: 'tangerang-selatan',
    district: 'Pusat Kota',
    city: 'Tangerang Selatan',
    province: 'Banten',
    postalCode: '15311',
    coordinates: { lat: -6.2888, lng: 106.7179 },
    tier: 'tier-1',
    tag: 'Kota Cerdas & Pusat Ekonomi Kreatif',
    description: 'Metropolis mandiri dengan indeks daya beli tinggi dan adopsi transformasi digital terpesat di Banten.',
    commercialHubs: ['Pusat Kota Tangsel', 'Puspitek Road', 'Boulevard Utama Tangsel']
  },
  {
    id: 'jakarta-selatan',
    name: 'Jakarta Selatan',
    slug: 'jakarta-selatan',
    district: 'Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12160',
    coordinates: { lat: -6.2615, lng: 106.8106 },
    tier: 'tier-1',
    tag: 'Pusat Korporasi & Lembaga Finansial',
    description: 'Kawasan ekonomi bernilai tertinggi dengan kantor pusat konglomerasi dan modal ventura.',
    commercialHubs: ['Senopati', 'Blok M Hub', 'Cilandak Commercial Estate']
  },
  {
    id: 'scbd',
    name: 'SCBD',
    slug: 'scbd',
    district: 'Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    coordinates: { lat: -6.2251, lng: 106.8098 },
    tier: 'tier-1',
    tag: 'Distrik Finansial Utama Indonesia',
    description: 'Pusat bursa efek, bank multinasional, tech-unicorn, dan holding komersial papan atas.',
    commercialHubs: ['Pacific Place', 'Treasury Tower', 'District 8 SCBD', 'Equity Tower']
  },
  {
    id: 'pondok-indah',
    name: 'Pondok Indah',
    slug: 'pondok-indah',
    district: 'Kebayoran Lama',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12310',
    coordinates: { lat: -6.2774, lng: 106.7825 },
    tier: 'tier-1',
    tag: 'Kawasan Elit & Koridor Bisnis TB Simatupang',
    description: 'Sentra perkantoran minyak, gas, dan korporat multinasional terhubung hunian paling prestisius.',
    commercialHubs: ['Pondok Indah Mall 1-3', 'Pondok Indah Office Tower', 'Wisma Pondok Indah']
  },
  {
    id: 'kemang',
    name: 'Kemang',
    slug: 'kemang',
    district: 'Mampang Prapatan',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12730',
    coordinates: { lat: -6.2618, lng: 106.8152 },
    tier: 'tier-1',
    tag: 'Pusat Agensi Kreatif & Lifestyle Eksekutif',
    description: 'Kantung sentra agensi periklanan, startup studio kreatif, dan ruko butik kelas dunia.',
    commercialHubs: ['Kemang Raya', 'Kemang Village', 'Bangka Commercial Strip']
  }
];

export const LOCATIONS = HYPER_LOCAL_LOCATIONS;

export function getLocationBySlug(slug: string): HyperLocalLocation | undefined {
  return HYPER_LOCAL_LOCATIONS.find(loc => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return HYPER_LOCAL_LOCATIONS.map(loc => loc.slug);
}
