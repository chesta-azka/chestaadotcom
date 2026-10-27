import { PRICING_PACKAGES } from './pricing';
import { PROCESS_PHASES } from './process';

export interface FAQThread {
  id: string; // Slug anchor id (e.g. 'boleh-nego-harga')
  category: 'pricing' | 'process' | 'website' | 'ai' | 'security' | 'partnership';
  questionId: string;
  questionEn: string;
  author: 'chesta' | 'zeeshan';
  answerId: string;
  answerEn: string;
  crossLinks?: {
    labelId: string;
    labelEn: string;
    href: string;
  }[];
}

export const FAQ_CATEGORIES = [
  { id: 'pricing', nameId: 'Harga dan pembayaran', nameEn: 'Pricing and payment' },
  { id: 'process', nameId: 'Proses dan waktu', nameEn: 'Process and timeframe' },
  { id: 'website', nameId: 'Website', nameEn: 'Website' },
  { id: 'ai', nameId: 'AI agent dan otomasi', nameEn: 'AI agents and automation' },
  { id: 'security', nameId: 'Data dan keamanan', nameEn: 'Data and security' },
  { id: 'partnership', nameId: 'Kerja sama', nameEn: 'Partnership & trust' },
] as const;

export const FAQ_THREADS: FAQThread[] = [
  // HARGA DAN PEMBAYARAN
  {
    id: 'harga-mulai-dari-berapa',
    category: 'pricing',
    questionId: 'Kak, harga mulai dari berapa?',
    questionEn: 'How much do services start at?',
    author: 'zeeshan',
    answerId:
      'Landing page mulai Rp1.200.000. Paket lain punya harga mulai dari masing-masing, semuanya ada di halaman Harga. Angka final kami tulis di proposal setelah audit gratis.',
    answerEn:
      'Landing pages start from IDR 1,200,000. Other packages have their own starting rates, detailed on the Pricing page. Final figures are written in your proposal after a free audit.',
    crossLinks: [
      {
        labelId: 'Lihat rincian paket di halaman Harga',
        labelEn: 'See full package breakdown on Pricing page',
        href: '/harga',
      },
    ],
  },
  {
    id: 'bayarnya-gimana-ada-dp',
    category: 'pricing',
    questionId: 'Bayarnya gimana, ada DP?',
    questionEn: 'How does payment work, is there a deposit?',
    author: 'zeeshan',
    answerId:
      'Ada. DP 50% sebelum pengerjaan dimulai, dan pelunasan sebelum handover. Semua tertulis di proposal, jadi tidak ada biaya yang muncul belakangan.',
    answerEn:
      'Yes. 50% deposit before construction begins, and final payment prior to handover. Everything is written in the proposal, so no surprise costs appear later.',
    crossLinks: [
      {
        labelId: 'Lihat alur pembayaran di halaman Cara Kerja',
        labelEn: 'See payment flow on How We Work page',
        href: '/cara-kerja',
      },
    ],
  },
  {
    id: 'boleh-nego-harga',
    category: 'pricing',
    questionId: 'Boleh nego harga?',
    questionEn: 'Can we negotiate prices?',
    author: 'zeeshan',
    answerId:
      'Kami tidak memberi diskon di depan. Kalau budgetmu lebih kecil, yang kami sesuaikan itu ruang lingkupnya, jadi kamu tetap mendapat pekerjaan yang dikerjakan dengan benar, hanya dengan fitur yang lebih sedikit dulu.',
    answerEn:
      'We do not offer upfront discounts. If your budget is tighter, we adjust the project scope so you still get properly executed work, starting with fewer features first.',
    crossLinks: [
      {
        labelId: 'Lihat penjelasan prinsip harga kami',
        labelEn: 'Read our pricing principles',
        href: '/harga#tanpa-diskon',
      },
    ],
  },
  {
    id: 'ada-biaya-lain-di-luar-paket',
    category: 'pricing',
    questionId: 'Ada biaya lain di luar paket?',
    questionEn: 'Are there external costs outside the package?',
    author: 'zeeshan',
    answerId:
      'Ada beberapa, dan kami sebut terbuka dari awal: domain dan hosting tahunan, revisi di atas batas paket, fitur tambahan, iklan berbayar yang kamu bayar langsung, dan biaya layanan pihak ketiga seperti WhatsApp Business Platform atau pemakaian model AI.',
    answerEn:
      'There are a few, disclosed openly upfront: annual domain and hosting, revisions beyond package limits, extra add-ons, ad spend paid directly by you, and third-party fees like WhatsApp Business Platform or AI model usage.',
    crossLinks: [
      {
        labelId: 'Daftar biaya di luar paket di halaman Harga',
        labelEn: 'List of external costs on Pricing page',
        href: '/harga#biaya-luar',
      },
    ],
  },
  {
    id: 'kalau-cuma-butuh-sebagian-boleh',
    category: 'pricing',
    questionId: 'Kalau aku cuma butuh sebagian, boleh?',
    questionEn: 'Can I request just a partial build?',
    author: 'zeeshan',
    answerId:
      'Boleh. Banyak yang mulai dari satu alur atau satu halaman, lalu menambah bertahap. Harga satuan tiap tambahan ada di halaman Harga.',
    answerEn:
      'Yes. Many clients start with a single workflow or landing page, then expand incrementally. Individual unit prices for add-ons are listed on the Pricing page.',
    crossLinks: [
      {
        labelId: 'Daftar harga satuan (add-on)',
        labelEn: 'List of add-on unit rates',
        href: '/harga#harga-satuan',
      },
    ],
  },

  // PROSES DAN WAKTU
  {
    id: 'berapa-lama-pengerjaannya',
    category: 'process',
    questionId: 'Berapa lama pengerjaannya?',
    questionEn: 'How long does development take?',
    author: 'chesta',
    answerId:
      'Tergantung layanannya. Landing page biasanya dalam hitungan hari, website dan otomasi beberapa hari sampai beberapa minggu, AI agent dan software custom hitungan minggu. Rentang tiap paket ada di halaman Harga, dan estimasi pastinya kami beri setelah audit.',
    answerEn:
      'It depends on the service. Landing pages take a few days, websites and automation take days to weeks, while AI agents and custom software take a few weeks. Specific ranges are on the Pricing page, and exact estimates are provided after audit.',
    crossLinks: [
      {
        labelId: 'Tabel estimasi waktu per paket',
        labelEn: 'Timeline breakdown per package',
        href: '/cara-kerja#tabel-waktu',
      },
    ],
  },
  {
    id: 'aku-nggak-ngerti-teknis-nggak-apa-apa',
    category: 'process',
    questionId: 'Aku nggak ngerti teknis, nggak apa-apa?',
    questionEn: "I'm not technical—is that okay?",
    author: 'chesta',
    answerId:
      'Nggak apa-apa. Kami menjelaskan dengan bahasa bisnis, bukan istilah teknis. Yang kami butuhkan darimu: tujuan, contoh yang kamu suka, dan akses yang diperlukan.',
    answerEn:
      'Not a problem. We explain everything in plain business terms, not technical jargon. All we need from you: your goals, examples you like, and necessary access.',
  },
  {
    id: 'kalau-hasilnya-nggak-sesuai-ekspektasi',
    category: 'process',
    questionId: 'Kalau hasilnya nggak sesuai ekspektasi?',
    questionEn: 'What if the result does not match expectations?',
    author: 'chesta',
    answerId:
      'Itu sebabnya ada prototipe sebelum dibangun penuh dan ruang lingkup yang tertulis. Kamu menyetujui bentuknya dulu, lalu revisi dalam batas paket kami kerjakan.',
    answerEn:
      'That is why we build a prototype before full construction and write down the scope. You approve the structure first, and revision rounds within your package refine the details.',
    crossLinks: [
      {
        labelId: 'Aturan revisi terstruktur',
        labelEn: 'Structured revision protocol',
        href: '/cara-kerja#revisi',
      },
    ],
  },
  {
    id: 'apa-yang-harus-disiapkan-sebelum-audit',
    category: 'process',
    questionId: 'Apa yang harus disiapkan sebelum audit?',
    questionEn: 'What should I prepare before the audit?',
    author: 'zeeshan',
    answerId:
      'Cukup gambaran kerjaan yang paling menyita waktu, aplikasi atau spreadsheet yang sekarang kamu pakai, dan hasil yang kamu inginkan. Kalau ada contoh chat atau data, samarkan informasi sensitifnya.',
    answerEn:
      'Just an overview of the daily tasks consuming the most time, current apps or spreadsheets used, and desired outcomes. Mask any sensitive customer details in chat or data samples.',
    crossLinks: [
      {
        labelId: 'Jadwalkan audit gratis 30 menit',
        labelEn: 'Schedule a free 30-minute audit',
        href: '/audit-gratis',
      },
    ],
  },
  {
    id: 'setelah-rilis-masih-dibantu-nggak',
    category: 'process',
    questionId: 'Setelah rilis masih dibantu nggak?',
    questionEn: 'Is there support after release?',
    author: 'zeeshan',
    answerId:
      'Setiap paket punya masa dukungan perbaikan setelah rilis, lamanya ada di halaman Harga. Setelah itu kamu bisa memakai paket rawat bulanan atau memegang sendiri.',
    answerEn:
      'Every package includes a post-release support window specified on the Pricing page. Afterward, you can choose an optional monthly care plan or manage it internally.',
    crossLinks: [
      {
        labelId: 'Lihat paket rawat bulanan',
        labelEn: 'View monthly care packages',
        href: '/harga#paket-rawat',
      },
    ],
  },

  // WEBSITE
  {
    id: 'bedanya-landing-page-dan-company-profile-apa',
    category: 'website',
    questionId: 'Bedanya landing page dan company profile apa?',
    questionEn: 'What is the difference between a landing page and company profile?',
    author: 'chesta',
    answerId:
      'Landing page punya satu tujuan, misalnya booking atau pesan WhatsApp, biasanya satu halaman. Company profile menampilkan bisnismu lebih lengkap dalam beberapa halaman: profil, layanan, galeri, dan kontak.',
    answerEn:
      'A landing page focuses on a single CTA goal (e.g., booking or WhatsApp message), usually 1 page. A company profile showcases your business across multiple pages: profile, services, gallery, and contact.',
  },
  {
    id: 'website-bisa-muncul-di-google',
    category: 'website',
    questionId: 'Website bisa muncul di Google?',
    questionEn: 'Will my website appear on Google search?',
    author: 'chesta',
    answerId:
      'Kami menyiapkan dasar SEO: judul dan deskripsi tiap halaman, struktur heading, sitemap, dan data terstruktur. Peringkat bergantung pada persaingan dan waktu, jadi kami tidak menjanjikan posisi tertentu.',
    answerEn:
      'We set up technical SEO foundations: title/description tags, heading structures, sitemaps, and JSON-LD schema. Search rankings depend on competition and time, so we guarantee standards without promising specific positions.',
  },
  {
    id: 'domain-dan-hosting-atas-nama-siapa',
    category: 'website',
    questionId: 'Domain dan hosting atas nama siapa?',
    questionEn: 'Whose name will the domain and hosting be under?',
    author: 'zeeshan',
    answerId:
      'Atas namamu. Kamu pemilik domain dan hostingnya, jadi kamu tidak terkunci pada kami.',
    answerEn:
      'Registered directly in your name. You retain 100% ownership of your domain and cloud hosting accounts, eliminating vendor lock-in.',
  },

  // AI AGENT DAN OTOMASI
  {
    id: 'ai-agent-itu-beda-dari-chatbot-biasa',
    category: 'ai',
    questionId: 'AI agent itu beda dari chatbot biasa?',
    questionEn: 'How is an AI agent different from a standard chatbot?',
    author: 'chesta',
    answerId:
      'Chatbot menjawab dari daftar jawaban yang disiapkan. AI agent membaca maksud pesan, memakai tool seperti kalender atau database, lalu mengerjakan tugasnya sampai selesai, dan menyerahkan ke staf saat kasusnya di luar aturan.',
    answerEn:
      'Traditional chatbots reply from fixed script rules. An AI agent understands intent, uses tools like calendars or databases, executes multi-step workflows to completion, and escalates to human staff when outside guidelines.',
  },
  {
    id: 'kalau-ai-nya-salah-jawab-gimana',
    category: 'ai',
    questionId: 'Kalau AI-nya salah jawab gimana?',
    questionEn: 'What happens if the AI agent makes a mistake?',
    author: 'chesta',
    answerId:
      'Agent punya batas tindakan dan aturan serah ke manusia. Kasus sensitif diteruskan ke stafmu dengan ringkasan, dan semua percakapan tercatat supaya bisa diperiksa dan diperbaiki.',
    answerEn:
      'The agent operates under strict action boundaries and escalation rules. Sensitive inquiries are handed off to human staff with a concise summary, and all chat logs are recorded for audit and tuning.',
  },
  {
    id: 'bisnis-kecil-kayak-aku-cocok-pakai-ai-agent',
    category: 'ai',
    questionId: 'Bisnis kecil kayak aku cocok pakai AI agent?',
    questionEn: 'Is an AI agent suitable for a small business like mine?',
    author: 'chesta',
    answerId:
      'Belum tentu, dan kami akan bilang terus terang. Kalau pesan yang masuk hanya beberapa per hari dan semuanya butuh sentuhan pribadi, agent belum perlu. Kalau pertanyaan yang sama berulang dan jadwal dicek manual, biasanya mulai masuk akal.',
    answerEn:
      'Not necessarily, and we speak candidly. If you receive only a few messages daily requiring personal touches, an agent is unnecessary. If repetitive inquiries drain staff hours and schedules are checked manually, it becomes very practical.',
  },
  {
    id: 'aku-masih-pakai-whatsapp-biasa-bisa',
    category: 'ai',
    questionId: 'Aku masih pakai WhatsApp biasa, bisa?',
    questionEn: 'Can I use an AI agent with standard WhatsApp?',
    author: 'chesta',
    answerId:
      'Agent berjalan lewat WhatsApp Business Platform resmi dari Meta, yang punya ketentuan akun dan nomor sendiri. Kami jelaskan opsinya dan membantu pendaftaran saat audit.',
    answerEn:
      'AI agents run via Meta’s official WhatsApp Business Platform, which has specific account and number rules. We explain options and assist with onboarding during your audit.',
  },

  // DATA DAN KEAMANAN
  {
    id: 'data-pelanggan-aku-aman',
    category: 'security',
    questionId: 'Data pelanggan aku aman?',
    questionEn: 'Is my customer data safe?',
    author: 'chesta',
    answerId:
      'Data tetap milikmu. Kami hanya mengakses yang diperlukan untuk membangun dan merawat sistem, dan aksesnya dicabut saat proyek atau kontrak rawat berakhir. Kebijakan lengkapnya ada di halaman kebijakan data klien.',
    answerEn:
      'Your data remains 100% yours. We access only what is required to build and maintain systems, and access credentials are revoked upon project/contract completion. Complete terms are in our data privacy policy.',
    crossLinks: [
      {
        labelId: 'Kebijakan privasi data klien',
        labelEn: 'Client data privacy policy',
        href: '/privasi',
      },
    ],
  },
  {
    id: 'siapa-pemilik-kode-dan-sistemnya',
    category: 'security',
    questionId: 'Siapa pemilik kode dan sistemnya?',
    questionEn: 'Who owns the codebase and system?',
    author: 'chesta',
    answerId:
      'Untuk software custom, kepemilikan kode kita sepakati tertulis di awal proyek. Untuk website, domain dan hostingnya atas namamu.',
    answerEn:
      'For custom software, IP and code ownership terms are agreed upon in writing at project start. For websites, domain and hosting are registered directly in your name.',
  },

  // KERJA SAMA
  {
    id: 'kalian-sudah-pernah-ngerjain-proyek-apa',
    category: 'partnership',
    questionId: 'Kalian sudah pernah ngerjain proyek apa?',
    questionEn: 'What past projects have you built?',
    author: 'chesta',
    answerId:
      'Chesta menulis kode sejak 2021 dan sudah membangun sistem untuk sebuah brand minuman (pencatatan suhu, barang, dan barang gagal), sebuah pondok pesantren, dan sebuah gudang logistik. Nama klien tidak kami tampilkan tanpa izin tertulis, dan studi kasus bernama kami tambahkan setelah klien mengizinkan. Kamu juga bisa melihat proyek internal kami sebagai contoh alurnya.',
    answerEn:
      'Chesta has written code since 2021 and built systems for a beverage brand (temperature logging, inventory, quality defect tracking), an Islamic boarding school, and a logistics warehouse. Client names are withheld without written consent, and named case studies are published once permitted. You can also inspect our internal systems as workflow examples.',
    crossLinks: [
      {
        labelId: 'Profil tim di halaman Tentang',
        labelEn: 'Team profile on About page',
        href: '/about',
      },
      {
        labelId: 'Portofolio sistem & proyek',
        labelEn: 'Portfolio of systems & projects',
        href: '/portfolio',
      },
      {
        labelId: 'Studi kasus pengerjaan',
        labelEn: 'Detailed case studies',
        href: '/case-studies',
      },
    ],
  },
  {
    id: 'kalian-di-mana-bisa-ketemu-langsung',
    category: 'partnership',
    questionId: 'Kalian di mana, bisa ketemu langsung?',
    questionEn: 'Where are you located, can we meet in person?',
    author: 'zeeshan',
    answerId:
      'Kami di BSD, Tangerang Selatan, dan melayani Tangerang Selatan serta Jabodetabek. Kami bekerja online lewat WhatsApp dan video call, dan tatap muka di area Tangerang Selatan dimungkinkan sesuai kesepakatan.',
    answerEn:
      'We are based in BSD, South Tangerang, serving South Tangerang and Greater Jakarta. We work online via WhatsApp and video calls, and in-person meetings in South Tangerang are possible by agreement.',
    crossLinks: [
      {
        labelId: 'Lokasi & area layanan BSD Tangerang Selatan',
        labelEn: 'BSD & South Tangerang service area',
        href: '/about#lokasi',
      },
    ],
  },
];
