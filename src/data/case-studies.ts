export interface CaseStudyData {
  slug: string;
  title: string;
  clientIndustry: string;
  location: string;
  problem: string;
  architectureUsed: string;
  roiMetrics: string;
  implementationTime: string;
  summary: string;
  keyTakeaways: string[];
  metrics: { label: string; value: string; change: string }[];
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: 'eliminasi-excel-logistik-surabaya',
    title: 'Transformasi Operasional Logistik: Dari Kekacauan Excel Menuju Real-Time Fleet Automation',
    clientIndustry: 'Logistik & Supply Chain',
    location: 'Rungkut Surabaya',
    problem: 'Perusahaan logistik skala menengah di Surabaya mengalami inefisiensi masif akibat pengelolaan manifest pengiriman dan pelacakan armada yang masih menggunakan spreadsheet Excel manual secara terdistribusi. Hal ini memicu kesalahan input data hingga 18%, keterlambatan rekap penagihan, dan kebocoran biaya operasional bahan bakar sebesar Rp 450 juta per tahun.',
    architectureUsed: 'Next.js 15 App Router, PostgreSQL on Private Cloud, Real-time WebSocket Dispatch Engine, & Automated WhatsApp Gateway API.',
    roiMetrics: 'Penghematan Operasional Rp 1.2 Miliar per Tahun',
    implementationTime: '4 Minggu',
    summary: 'Dengan mengimplementasikan arsitektur web aplikasi kustom berbasis Next.js 15 dan pemrosesan data real-time, manajemen operasional Surabaya berhasil menghilangkan ketergantungan pada file Excel yang rentan korupsi data. Dispatcher kini dapat memantau posisi armada dan status pengiriman secara instan dengan latensi sub-detik.',
    keyTakeaways: [
      'Penghapusan total entri data manual berbasis Excel yang rentan human error.',
      'Otomatisasi pembuatan surat jalan dan rekap penagihan berbasis AI.',
      'Visibilitas armada secara real-time mengurangi waktu idle kendaraan hingga 42%.'
    ],
    metrics: [
      { label: 'Efisiensi Waktu Admin', value: '-85%', change: 'Positif' },
      { label: 'Akurasi Pengiriman', value: '99.8%', change: 'Meningkat' },
      { label: 'ROI Tahunan', value: 'Rp 1.2 Miliar', change: 'Penghematan' }
    ]
  },
  {
    slug: 'migrasi-erp-pabrik-cikarang',
    title: 'Migrasi ERP Pabrik Manufaktur Cikarang: Keluar dari Jebakan Biaya Lisensi SaaS Global',
    clientIndustry: 'Manufaktur & Industrial',
    location: 'Jababeka Cikarang',
    problem: 'Pabrik komponen otomotif di Cikarang terbebani biaya langganan software ERP asing berstandar per-user pricing yang melonjak hingga USD 75,000 per tahun seiring penambahan 350 karyawan operasional pabrik. Sistem lama sering mengalami kelambatan saat jam pergantian shift akibat arsitektur client-side rendering yang berat.',
    architectureUsed: 'On-Premise Private Server Deployment, Next.js 15 Server-Side Rendering (SSR), Modular Microservices ERP, & Encrypted Database Isolation.',
    roiMetrics: 'Penurunan Biaya Lisensi 100% (Hemat USD 75,000/Tahun)',
    implementationTime: '6 Minggu',
    summary: 'Chestaadotcom merancang arsitektur ERP kustom yang di-deploy pada server lokal perusahaan di Cikarang. Pabrik kini memiliki kepemilikan data penuh tanpa batasan jumlah pengguna, menghilangkan pajak langganan bulanan selamanya sambil mendongkrak kecepatan transaksi inventaris gudang hingga 5x lipat.',
    keyTakeaways: [
      'Bebas dari beban biaya per-user pricing selamanya.',
      'Keamanan data pabrik terisolasi di dalam negeri tanpa ketergantungan cloud asing.',
      'Performa inventaris gudang real-time dengan latensi di bawah 50 milidetik.'
    ],
    metrics: [
      { label: 'Biaya Lisensi SaaS', value: 'Rp 0', change: 'Hemat 100%' },
      { label: 'Kecepatan Sistem ERP', value: '5x Lebih Cepat', change: 'Optimal' },
      { label: 'Kepemilikan Data', value: '100% In-House', change: 'Aman' }
    ]
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
