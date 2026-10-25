import { SITE_IMAGES } from '../config/images';
import { ServiceSlug } from './services';
import { NEW_BLOG_POSTS_ID_RAW } from './new-blog-posts-id';
import { NEW_BLOG_POSTS_EN_RAW } from './new-blog-posts-en';
import { EARLIER_BLOG_POSTS_EN_RAW } from './earlier-blog-posts-en';

export type BlogAuthorId = 'chesta' | 'zeeshan';

export interface BlogAuthorProfile {
  id: BlogAuthorId;
  name: string;
  role: string;
  bio: string;
  roleEn?: string;
  bioEn?: string;
  avatar?: string;
  initials: string;
}

export const BLOG_AUTHORS: Record<BlogAuthorId, BlogAuthorProfile> = {
  chesta: {
    id: 'chesta',
    name: 'Chesta Azka',
    role: 'Co-Founder · Arsitektur, Produk, dan Teknologi',
    bio: 'Menangani rekayasa software custom, optimasi Core Web Vitals, struktur teknis SEO/AEO, serta integrasi tool AI agent di CHESTAADOTCOM.',
    roleEn: 'Co-Founder · Architecture, Product, and Technology',
    bioEn:
      'Leads custom software engineering, Core Web Vitals optimization, technical SEO/AEO architecture, and AI agent tool integrations at CHESTAADOTCOM.',
    avatar: '/chesta.png',
    initials: 'CA',
  },
  zeeshan: {
    id: 'zeeshan',
    name: 'Zeeshan',
    role: 'Co-Founder · Operasional dan Client Success',
    bio: 'Menangani pemetaan alur kerja operasional klien, efisiensi biaya proyek, kepatuhan SOP admin, dan pendampingan implementasi di CHESTAADOTCOM.',
    roleEn: 'Co-Founder · Operations and Client Success',
    bioEn:
      'Leads client operational workflow mapping, project cost efficiency, admin SOP compliance, and rollout onboarding at CHESTAADOTCOM.',
    initials: 'ZS',
  },
};

export function getAuthorProfile(
  author: BlogAuthorId,
  locale: 'id' | 'en' = 'id'
): BlogAuthorProfile {
  const base = BLOG_AUTHORS[author] || BLOG_AUTHORS.chesta;
  if (locale === 'en') {
    return {
      ...base,
      role: base.roleEn || base.role,
      bio: base.bioEn || base.bio,
    };
  }
  return base;
}

export interface BlogCategoryMeta {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  nameEn?: string;
  shortLabelEn?: string;
  descriptionEn?: string;
}

export const BLOG_CATEGORIES: BlogCategoryMeta[] = [
  {
    slug: 'performa-web',
    name: 'Performa Web & Konversi',
    shortLabel: 'Performa Web',
    description:
      'Catatan teknis tentang kecepatan muat halaman, Core Web Vitals, dan efisiensi anggaran iklan digital untuk bisnis.',
    nameEn: 'Web Performance & Conversion',
    shortLabelEn: 'Web Performance',
    descriptionEn:
      'Technical notes on page load speed, Core Web Vitals, and digital ad budget efficiency for businesses.',
  },
  {
    slug: 'investasi-web',
    name: 'Strategi & Investasi Web',
    shortLabel: 'Investasi Web',
    description:
      'Panduan terbuka mengenai struktur biaya pembuatan website bisnis, ruang lingkup kerja, dan cara memilih arsitektur yang tepat.',
    nameEn: 'Web Strategy & Software Investment',
    shortLabelEn: 'Strategy & Cost',
    descriptionEn:
      'Transparent guides on website and custom software cost structures, project scoping, and choosing safe production architecture.',
  },
  {
    slug: 'otomasi-ai',
    name: 'Otomasi AI & Workflow',
    shortLabel: 'Otomasi & AI',
    description:
      'Penerapan nyata AI agent WhatsApp, sinkronisasi jadwal, dan otomasi alur kerja operasional untuk klinik, F&B, serta bisnis jasa.',
    nameEn: 'AI & Workflow Automation',
    shortLabelEn: 'AI & Automation',
    descriptionEn:
      'Real-world implementation of WhatsApp AI agents, Model Context Protocol (MCP), calendar syncing, and n8n workflow automation.',
  },
  {
    slug: 'konversi-ux',
    name: 'Konversi & UI/UX',
    shortLabel: 'Konversi & UX',
    description:
      'Struktur halaman, tata letak mobile-first, dan penyusunan penawaran agar pengunjung website lebih mudah menghubungi tim kamu.',
    nameEn: 'Conversion & UI/UX',
    shortLabelEn: 'Conversion & UX',
    descriptionEn:
      'Page hierarchy, mobile-first layouts, and offer copywriting so visitors contact your team effortlessly.',
  },
  {
    slug: 'seo-lokal',
    name: 'SEO Lokal & Pertumbuhan',
    shortLabel: 'SEO Lokal',
    description:
      'Langkah praktis mengoptimalkan Google Business Profile, schema LocalBusiness, dan pencarian organik di BSD City, Tangerang Selatan, serta Jabodetabek.',
    nameEn: 'Local SEO, GEO & AEO Growth',
    shortLabelEn: 'Local SEO & AI',
    descriptionEn:
      'Practical steps to optimize Google Business Profile, LocalBusiness schema, and AI search visibility (GEO/AEO) in BSD, South Tangerang, and Greater Jakarta.',
  },
];

export function getLocalizedBlogCategories(locale: 'id' | 'en' = 'id'): BlogCategoryMeta[] {
  if (locale !== 'en') return BLOG_CATEGORIES;
  return BLOG_CATEGORIES.map((cat) => ({
    ...cat,
    name: cat.nameEn || cat.name,
    shortLabel: cat.shortLabelEn || cat.shortLabel,
    description: cat.descriptionEn || cat.description,
  }));
}

export type BlogCalloutVariant = 'info' | 'tip' | 'warning';

export type BlogContentBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'h2';
      id: string;
      text: string;
    }
  | {
      type: 'h3';
      id: string;
      text: string;
    }
  | {
      type: 'ul';
      title?: string;
      items: string[];
    }
  | {
      type: 'ol';
      title?: string;
      items: string[];
    }
  | {
      type: 'blockquote';
      quote: string;
      attribution?: string;
    }
  | {
      type: 'callout';
      variant: BlogCalloutVariant;
      title: string;
      text: string;
    }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'code';
      language: string;
      filename?: string;
      code: string;
      caption?: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption: string;
      width?: number;
      height?: number;
    };

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogFounderNote {
  author: BlogAuthorId;
  title: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  alternateSlug?: string;
  slugAliases?: string[];
  locale?: 'id' | 'en';
  title: string;
  seoTitle: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: BlogAuthorId;
  date: string;
  updatedAt: string;
  readTime: string;
  readTimeMinutes: number;
  wordCount: number;
  featured?: boolean;
  draft: boolean;
  cover: string;
  coverImage: string;
  coverImageKey: string;
  coverAlt: string;
  beforeIntroSnapshot: string;
  founderNote?: BlogFounderNote;
  content: BlogContentBlock[];
  conclusion: string[];
  serviceLink: {
    slug: ServiceSlug;
    title: string;
    description: string;
    href: string;
    label: string;
  };
  faq: BlogFAQItem[];
  relatedSlugs: string[];
}

function stripInlineMarkup(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

function countWordsInString(str: string): number {
  const cleaned = stripInlineMarkup(str).trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

export function calculateBlogPostWordCount(
  content: BlogContentBlock[],
  conclusion: string[],
  faq: BlogFAQItem[],
  beforeIntroSnapshot?: string,
  founderNote?: BlogFounderNote
): number {
  let total = 0;

  if (beforeIntroSnapshot) {
    total += countWordsInString(beforeIntroSnapshot);
  }
  if (founderNote) {
    total += countWordsInString(founderNote.title) + countWordsInString(founderNote.text);
  }

  for (const block of content) {
    switch (block.type) {
      case 'paragraph':
      case 'h2':
      case 'h3':
        total += countWordsInString(block.text);
        break;
      case 'ul':
      case 'ol':
        if (block.title) total += countWordsInString(block.title);
        for (const item of block.items) total += countWordsInString(item);
        break;
      case 'blockquote':
        total += countWordsInString(block.quote);
        if (block.attribution) total += countWordsInString(block.attribution);
        break;
      case 'callout':
        total += countWordsInString(block.title) + countWordsInString(block.text);
        break;
      case 'table':
        if (block.caption) total += countWordsInString(block.caption);
        for (const h of block.headers) total += countWordsInString(h);
        for (const row of block.rows) {
          for (const cell of row) total += countWordsInString(cell);
        }
        break;
      case 'code':
        if (block.caption) total += countWordsInString(block.caption);
        total += countWordsInString(block.code);
        break;
      case 'image':
        total += countWordsInString(block.caption);
        break;
    }
  }

  for (const p of conclusion) {
    total += countWordsInString(p);
  }

  for (const item of faq) {
    total += countWordsInString(item.question) + countWordsInString(item.answer);
  }

  return total;
}

export type RawBlogPostInput = Omit<
  BlogPost,
  'readTime' | 'readTimeMinutes' | 'wordCount' | 'coverImage'
>;

export function defineBlogPost(raw: RawBlogPostInput): BlogPost {
  const locale = raw.locale || 'id';
  const wordCount = calculateBlogPostWordCount(
    raw.content,
    raw.conclusion,
    raw.faq,
    raw.beforeIntroSnapshot,
    raw.founderNote
  );
  // Standard reading speed in technical/business prose: ~190 words per minute
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 190));
  return {
    ...raw,
    locale,
    coverImage: raw.cover,
    wordCount,
    readTimeMinutes,
    readTime: locale === 'en' ? `${readTimeMinutes} min read` : `${readTimeMinutes} menit baca`,
  };
}

export const EXISTING_INDONESIAN_BLOG_POSTS: BlogPost[] = [
  // ==========================================================================
  // 1. PILLAR POST (1.600+ WORDS)
  // ==========================================================================
  defineBlogPost({
    slug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    alternateSlug: 'why-slow-landing-pages-waste-ad-spend',
    title: 'Kenapa Landing Page Lambat Bisa Bikin Iklan Boncos (dan Cara Memperbaikinya)',
    seoTitle: 'Landing Page Lambat Bikin Iklan Boncos | CHESTAADOTCOM',
    excerpt:
      'Saldo iklan Meta Ads dan Google Ads sudah terpotong saat jari pengunjung mengetuk tautan, bukan saat halaman selesai dimuat. Pelajari cara menutup kebocoran klik di 3 detik pertama.',
    metaDescription:
      'Pelajari mengapa landing page lambat memangkas rasio klik ke tayangan halaman di Meta & Google Ads, cara membaca Core Web Vitals, dan langkah perbaikannya.',
    category: 'Performa Web & Konversi',
    categorySlug: 'performa-web',
    tags: ['Landing Page', 'Core Web Vitals', 'Kecepatan Website', 'Iklan Digital', 'Konversi'],
    author: 'chesta',
    date: '2026-10-15',
    updatedAt: '2026-10-23',
    featured: true,
    draft: false,
    coverImageKey: 'blogLandingPageSpeed',
    cover: SITE_IMAGES.blogLandingPageSpeed.src,
    coverAlt: SITE_IMAGES.blogLandingPageSpeed.alt,
    beforeIntroSnapshot:
      'Pernahkah kamu melihat dashboard iklan Meta Ads atau Google Ads yang mencatat ratusan klik, tetapi jumlah pesan yang benar-benar masuk ke WhatsApp admin bisa dihitung dengan jari? Banyak pemilik bisnis langsung menyalahkan materi video iklan, mengganti target audiens berkali-kali, atau bahkan menaikkan anggaran harian karena mengira jangkauannya kurang luas.',
    content: [
      {
        type: 'paragraph',
        text: 'Saldo iklan Meta Ads atau Google Ads kamu sudah terpotong pada detik jari calon pelanggan menyentuh tautan iklan, bukan saat halaman website selesai terbuka di layar ponsel mereka. Jika halaman tujuan baru menampilkan judul penawaran dan tombol WhatsApp setelah lima detik, separuh pengunjung dari jaringan seluler sudah lebih dulu menekan tombol kembali.',
      },
      {
        type: 'paragraph',
        text: 'Saat jumlah chat harian terasa sepi padahal anggaran iklan terus jalan, reaksi paling umum adalah mengganti video materi iklan atau mengubah pengaturan target audiens. Padahal, kebocoran paling mahal sering terjadi di jembatan antara klik iklan dan tampilan pertama halaman. Sebelum kamu menambah anggaran harian, kamu perlu memeriksa berapa banyak klik berbayar yang hilang di layar putih kosong sebelum halaman sempat terbaca.',
      },
      {
        type: 'h2',
        id: 'kebocoran-antara-link-clicks-dan-landing-page-views',
        text: '1. Kebocoran di Antara Link Clicks dan Landing Page Views',
      },
      {
        type: 'paragraph',
        text: 'Buka dashboard Meta Ads Manager atau Google Ads kamu, lalu sandingkan dua kolom metrik ini: `Link Clicks` (jumlah klik tautan) dan `Landing Page Views` (jumlah halaman yang benar-benar berhasil dimuat hingga kode pelacak aktif). Banyak pemilik bisnis kaget ketika melihat angka `Landing Page Views` mereka jauh lebih rendah dibandingkan jumlah klik yang sudah mereka bayar.',
      },
      {
        type: 'paragraph',
        text: 'Mayoritas trafik iklan untuk bisnis lokal di kawasan seperti BSD City, Alam Sutera, Bintaro, dan Gading Serpong berasal dari aplikasi Instagram atau pencarian Google di ponsel. Calon pelanggan membuka iklan saat sedang di kendaraan, di sela jam makan siang, atau memakai sinyal 4G dalam ruangan yang kecepatannya naik-turun. Ketika halaman tujuan membawa beban gambar mentah beberapa megabita, koneksi seluler membutuhkan waktu lama hanya untuk merender layar paling atas.',
      },
      {
        type: 'h3',
        id: 'hitungan-sederhana-anggaran-iklan-yang-menguap',
        text: 'Hitungan Ilustratif Anggaran Iklan yang Menguap',
      },
      {
        type: 'paragraph',
        text: 'Untuk melihat dampaknya secara nyata pada biaya akuisisi prospek, mari kita gunakan simulasi angka sederhana. Misalnya kamu menjalankan kampanye iklan dengan anggaran Rp400.000 per hari dan biaya per klik rata-rata Rp2.000, sehingga kamu mendapatkan 200 klik per hari.',
      },
      {
        type: 'table',
        caption: 'Ilustrasi perbandingan efisiensi anggaran iklan harian (misalnya anggaran Rp400.000/hari untuk 200 klik)',
        headers: [
          'Indikator Tahapan',
          'Halaman Lambat (Muat 5,8 Detik)',
          'Halaman Cepat (Muat 1,4 Detik)',
        ],
        rows: [
          ['Jumlah Link Clicks (Dibayar)', '200 klik', '200 klik'],
          ['Rasio Halaman Terbuka Utuh (Landing Page View)', 'Misalnya 45% (90 pengunjung)', 'Misalnya 88% (176 pengunjung)'],
          ['Anggaran Klik yang Hilang di Layar Kosong', 'Rp220.000 / hari', 'Rp48.000 / hari'],
          ['Konversi ke Chat WhatsApp (Misalnya 10% dari LPV)', '9 prospek masuk', '17–18 prospek masuk'],
          ['Biaya per Prospek WhatsApp (Cost Per Lead)', 'Rp44.444 / chat', 'Rp22.857 / chat'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Dari tabel ilustrasi di atas, kamu bisa melihat bahwa menurunkan waktu muat halaman dari hampir enam detik ke bawah dua detik dapat menggandakan jumlah pesan WhatsApp yang masuk tanpa menambah saldo iklan harian. Selain itu, algoritma Google Ads (melalui komponen `Landing Page Experience` pada Quality Score) dan Meta Ads akan memberi penalti biaya lelang yang lebih mahal pada halaman yang ditinggalkan pengunjung dalam hitungan detik.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Aturan Keputusan Audit Iklan',
        text: 'Jika rasio Landing Page Views dibagi Link Clicks di akun iklanmu berada di bawah 70%, hentikan dulu rencana mengganti materi video iklan. Perbaiki kecepatan muat halaman tujuan terlebih dahulu karena masalah utamanya ada pada pipa halaman, bukan pada umpan iklannya.',
      },
      {
        type: 'h2',
        id: 'memahami-core-web-vitals-untuk-pemilik-bisnis',
        text: '2. Memahami Core Web Vitals (LCP, INP, CLS) Tanpa Rumus Rumit',
      },
      {
        type: 'paragraph',
        text: 'Saat mengecek performa website menggunakan alat pengujian Google, kamu akan bertemu tiga metrik utama bernama Core Web Vitals. Kamu tidak perlu menghafal istilah pemrogramannya; cukup gunakan ketiganya sebagai indikator kenyamanan calon pelanggan saat mengetuk halaman bisnismu.',
      },
      {
        type: 'h3',
        id: 'lcp-seberapa-cepat-etalase-utama-terbaca',
        text: 'LCP (Largest Contentful Paint): Seberapa Cepat Penawaran Utama Terlihat',
      },
      {
        type: 'paragraph',
        text: '`LCP` mengukur waktu sejak tautan diketuk hingga elemen terbesar di layar pertama (biasanya judul utama atau foto sampul hero) tampil penuh di layar ponsel. Standar sehat Google adalah di bawah `2,5 detik`. Jika LCP halamanmu mencapai 5 detik, pengunjung hanya menatap layar kosong saat niat beli mereka sedang tinggi.',
      },
      {
        type: 'h3',
        id: 'inp-seberapa-gesit-tombol-merespons-jari',
        text: 'INP (Interaction to Next Paint): Seberapa Gesit Tombol Merespons Sentuhan',
      },
      {
        type: 'paragraph',
        text: '`INP` mengukur jeda waktu antara ketukan jari pengunjung pada tombol (seperti tombol "Konsultasi via WhatsApp" atau menu accordion harga) hingga layar memberikan respons visual. Target idealnya berada di bawah `200 milidetik`. Jeda tombol yang membeku selama satu-dua detik biasanya terjadi karena prosesor ponsel sedang tercekik menjalankan belasan skrip pelacak dan animasi berat di latar belakang.',
      },
      {
        type: 'h3',
        id: 'cls-apakah-tata-letak-melompat-saat-dimuat',
        text: 'CLS (Cumulative Layout Shift): Stabilitas Tata Letak Saat Gambar Muncul',
      },
      {
        type: 'paragraph',
        text: '`CLS` mengukur seberapa sering teks atau tombol bergeser mendadak ketika gambar di atasnya baru selesai diunduh. Jika pengunjung hendak menekan tombol WhatsApp lalu tiba-tiba banner promo muncul dan mendorong tombol ke bawah, pengalaman tersebut langsung merusak kesan rapi bisnismu. Target `CLS` wajib di bawah `0,1`.',
      },
      {
        type: 'h2',
        id: 'lima-penyebab-teknis-landing-page-berat',
        text: '3. Lima Penyebab Teknis yang Membuat Landing Page Berat di Ponsel',
      },
      {
        type: 'paragraph',
        text: 'Ketika kami membedah halaman kampanye klien dalam sesi audit untuk [jasa pembuatan website](/jasa/pembuatan-website), kelambatan halaman hampir selalu bersumber dari lima masalah berulang di bawah ini.',
      },
      {
        type: 'ol',
        title: 'Lima sumber beban utama pada halaman iklan:',
        items: [
          'Gambar beresolusi mentah tanpa kompresi: Mengunggah foto klinik, hidangan restoran, atau brosur properti langsung dalam format PNG/JPEG berukuran 3 MB hingga 7 MB per file tanpa mengubahnya ke WebP atau AVIF.',
          'Gambar Hero yang ikut terkena lazy-load: Memasang atribut loading="lazy" secara membabi buta pada seluruh gambar, termasuk gambar paling atas layar, sehingga browser menunda pengunduhan visual utama.',
          'Tumpukan skrip pihak ketiga di jalur utama: Memuat Meta Pixel, Google Tag Manager, TikTok Pixel, widget live chat pihak ketiga, dan skrip heatmap secara sinkron di bagian atas dokumen.',
          'Tema page-builder serbaguna yang gemuk: Menggunakan tema CMS serbaguna yang memuat puluhan file CSS dan pustaka slider bawaan padahal halaman hanya membutuhkan teks penawaran, bukti kerja, dan tombol CTA.',
          'File font kustom yang memblokir teks: Memuat empat hingga enam variasi ketebalan huruf dari server luar tanpa pengaturan font-display: swap, sehingga layar menampilkan kotak kosong tanpa teks selama beberapa detik.',
        ],
      },
      {
        type: 'h3',
        id: 'contoh-kode-optimasi-gambar-hero-dan-cls',
        text: 'Contoh Konfigurasi HTML Gambar Hero agar LCP Cepat & CLS Nol',
      },
      {
        type: 'paragraph',
        text: 'Perbaikan sederhana pada cara memanggil gambar utama di bagian atas halaman sering kali memangkas waktu muat hingga lebih dari satu detik. Pastikan gambar utama memakai `fetchpriority="high"`, `loading="eager"`, serta dimensi `width` dan `height` eksplisit seperti contoh berikut:',
      },
      {
        type: 'code',
        language: 'html',
        filename: 'hero-image-optimization.html',
        code: `<!-- SALAH: Gambar hero tanpa dimensi (memicu CLS) dan ditunda dengan lazy load -->
<img src="/uploads/foto-klinik-mentah-4mb.png" loading="lazy" alt="Banner" />

<!-- BENAR: Format modern (WebP/AVIF), dimensi eksplisit, dan prioritas unduh tinggi -->
<picture>
  <source srcset="/images/hero-klinik-bsd.avif" type="image/avif" />
  <source srcset="/images/hero-klinik-bsd.webp" type="image/webp" />
  <img
    src="/images/hero-klinik-bsd.webp"
    alt="Ruang tindakan klinik estetika dengan jadwal dokter terintegrasi WhatsApp"
    width="1280"
    height="720"
    fetchpriority="high"
    decoding="async"
    class="w-full h-auto rounded-3xl object-cover"
  />
</picture>`,
        caption: 'Perbandingan pemanggilan gambar hero yang menghambat LCP vs konfigurasi HTML yang memprioritaskan layar pertama.',
      },
      {
        type: 'h2',
        id: 'langkah-perbaikan-cepat-vs-pembenahan-fondasi',
        text: '4. Langkah Perbaikan: Pertolongan Pertama 48 Jam vs Pembenahan Fondasi',
      },
      {
        type: 'paragraph',
        text: 'Jika kampanye iklanmu sedang berjalan minggu ini, kamu tidak perlu mematikan iklan selama sebulan penuh untuk memperbaiki halaman. Bagi tindakan perbaikan ke dalam dua tahap berdasarkan urgensinya.',
      },
      {
        type: 'h3',
        id: 'pertolongan-pertama-dalam-48-jam',
        text: 'Tahap A: Pertolongan Pertama dalam 24–48 Jam',
      },
      {
        type: 'ul',
        items: [
          'Konversi seluruh gambar di halaman iklan ke format WebP dengan ukuran maksimal 120–180 KB per gambar.',
          'Matikan efek animasi muncul (fade-in atau slide-up) pada judul H1 dan tombol CTA di layar pertama agar pengunjung bisa langsung membaca dan mengetuk tombol.',
          'Hapus widget chat mengambang pihak ketiga yang memuat file JavaScript besar, lalu ganti dengan tautan langsung `wa.me` berformat pesan otomatis.',
          'Tambahkan atribut `defer` pada skrip analitik non-esensial agar peramban ponsel menggambar tampilan halaman lebih dulu.',
        ],
      },
      {
        type: 'h3',
        id: 'pembenahan-fondasi-jangka-panjang',
        text: 'Tahap B: Pembenahan Arsitektur Halaman Khusus Iklan & Pre-rendering Server',
      },
      {
        type: 'paragraph',
        text: 'Apabila website utamamu saat ini dibangun di atas tema lama yang sudah telanjur mengikat banyak plugin internal, memaksakan optimasi di halaman tersebut sering kali mentok di skor seluler 50–60. Langkah yang jauh lebih hemat adalah memisahkan halaman khusus kampanye iklan menggunakan arsitektur ringan yang mengirim HTML matang langsung dari server (Server-Side Pre-rendering).',
      },
      {
        type: 'paragraph',
        text: 'Pada halaman web biasa yang hanya mengandalkan rendering di sisi peramban (Client-Side Rendering murni tanpa prarender), ponsel pengunjung awalnya hanya menerima kerangka HTML kosong `<div id="root"></div>`. Ponsel kemudian harus mengunduh ratusan kilobita bundel JavaScript, menguraikannya di memori, baru kemudian menampilkan judul penawaran. Di ponsel kelas menengah dengan sinyal 4G yang sedang padat, proses tersebut memakan waktu tiga hingga empat detik ekstra. Sebaliknya, dengan mengirim HTML yang sudah terisi teks judul dan gambar hero sejak respons pertama server (Time to First Byte di bawah 200 milidetik), mata pengunjung langsung membaca penawaranmu bahkan sebelum skrip interaktif selesai dimuat.',
      },
      {
        type: 'paragraph',
        text: 'Kamu juga perlu memastikan bahwa setelah pengunjung mengetuk tombol WhatsApp di halaman yang sudah cepat tersebut, pesan mereka tidak mengantre berjam-jam di ponsel admin. Pada [studi kasus klinik estetika](/case-studies/otomasi-reservasi-klinik-estetika), perbaikan kecepatan halaman dipadukan langsung dengan [jasa AI agent](/jasa/ai-agent) supaya prospek yang masuk pukul 9 malam langsung mendapatkan informasi jadwal dokter dalam hitungan detik.',
      },
      {
        type: 'h2',
        id: 'cara-membaca-pagespeed-insights-dan-lighthouse',
        text: '5. Cara Membaca Laporan Google PageSpeed Insights & Lighthouse Tanpa Bingung',
      },
      {
        type: 'paragraph',
        text: 'Kamu tidak perlu menunggu laporan bulanan dari agensi iklan untuk mengetahui apakah halaman tujuanmu sehat atau sedang menghambat konversi. Google menyediakan alat uji terbuka bernama PageSpeed Insights yang bisa kamu jalankan sendiri dalam dua menit.',
      },
      {
        type: 'ol',
        title: 'Langkah demi langkah menguji halaman iklanmu:',
        items: [
          'Salin tautan lengkap halaman yang kamu pasang di kolom Website URL pada iklan Meta Ads atau Google Ads.',
          'Buka pagespeed.web.dev di peramban, tempelkan tautan tersebut, lalu tekan tombol Analyze.',
          'Pastikan kamu melihat tab "Seluler (Mobile)" terlebih dahulu, bukan tab Desktop. Lebih dari delapan puluh persen klik iklan media sosial dibuka dari ponsel, dan simulasi jaringan seluler jauh lebih jujur mencerminkan kondisi pelanggan di lapangan.',
          'Periksa bagian "Diagnostics" untuk melihat baris "Largest Contentful Paint element". Baris tersebut memberi tahu kamu secara persis elemen gambar atau teks mana yang paling lambat muncul di layar atas.',
          'Periksa baris "Reduce unused JavaScript" untuk melihat daftar skrip pihak ketiga (seperti widget chat, pemutar video, atau tag lama) yang menyumbang beban antrean terbesar.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cara Menguji Sendiri di Ponsel dalam 2 Menit',
        text: 'Buka pagespeed.web.dev di browser, masukkan URL yang kamu pasang di iklan Meta/Google Ads, dan lihat tab "Seluler (Mobile)". Fokuskan perhatian pada angka Largest Contentful Paint (target < 2,5 detik) dan Cumulative Layout Shift (target < 0,1).',
      },
      {
        type: 'h2',
        id: 'skenario-lapangan-klinik-dan-fnb-bsd-tangsel',
        text: '6. Skenario Lapangan: Dampak Kecepatan Halaman bagi Klinik & Bisnis F&B di BSD / Tangsel',
      },
      {
        type: 'paragraph',
        text: 'Untuk melihat bagaimana angka milidetik di atas berdampak langsung pada arus kas harian, perhatikan dua skenario operasional yang sering terjadi pada bisnis lokal di kawasan BSD City, Alam Sutera, Bintaro, dan Gading Serpong.',
      },
      {
        type: 'paragraph',
        text: 'Skenario pertama adalah klinik perawatan kulit atau klinik gigi yang mengiklankan paket perawatan musiman di Instagram. Calon pasien mengetuk iklan saat sedang istirahat makan siang di perkantoran Green Office Park BSD. Pada halaman versi lama yang memuat lima foto banner PNG mentah berukuran total 12 MB, layar ponsel pasien hanya menampilkan latar putih selama lima detik. Sebagian besar calon pasien langsung menutup layar dan kembali menggulir feed Instagram. Setelah foto dikompres ke format WebP berukuran 110 KB dan struktur halaman diringkas, halaman terbuka dalam 1,3 detik. Dengan anggaran iklan harian yang sama persis, jumlah pasien yang membaca rincian paket hingga menekan tombol konsultasi WhatsApp meningkat tajam.',
      },
      {
        type: 'paragraph',
        text: 'Skenario kedua adalah restoran atau katering di Gading Serpong yang mempromosikan paket reservasi ruang makan privat dan pesanan acara kantor. Banyak restoran menaruh tautan Google Drive berisi file PDF buku menu berukuran 18 MB sebagai halaman tujuan iklan. Mengunduh file PDF belasan megabita di jaringan seluler membuat pelanggan batal memesan. Mengganti PDF tersebut dengan halaman katalog menu web yang ringan, lengkap dengan tabel paket per orang dan tombol pre-order WhatsApp, memangkas langkah pemesanan dari empat menit menjadi kurang dari tiga puluh detik.',
      },
      {
        type: 'h2',
        id: 'checklist-audit-mandiri-sebelum-menyalakan-iklan',
        text: '7. Checklist Audit Mandiri Sebelum Menyalakan Kampanye Baru',
      },
      {
        type: 'paragraph',
        text: 'Sebelum kamu menekan tombol Publish pada kampanye iklan berikutnya, jalankan pemeriksaan 7 poin ini bersama tim pemasaran atau pengembang web kamu:',
      },
      {
        type: 'ul',
        items: [
          'Waktu muat LCP pada pengujian PageSpeed Insights tab Seluler berada di bawah 2,5 detik.',
          'Ukuran total halaman (total byte weight) beserta seluruh gambar di layar pertama tidak melebihi 1,5 MB.',
          'Seluruh tag gambar dan video memiliki atribut width dan height eksplisit sehingga nilai CLS berada di bawah 0,1.',
          'Judul utama (H1) dan tombol CTA WhatsApp langsung terlihat tanpa harus menunggu file JavaScript selesai dieksekusi.',
          'Tautan tombol WhatsApp sudah menyertakan parameter teks pembuka spesifik sesuai kampanye iklan agar kamu tahu iklan mana yang menghasilkan chat.',
          'Server mengirimkan header kompresi teks (Brotli atau Gzip) dan aturan cache aset statis minimal 30 hari.',
          'Halaman sudah diuji langsung menggunakan ponsel nyata pada jaringan 4G biasa, bukan hanya diuji di laptop kantor dengan Wi-Fi cepat.',
        ],
      },
      {
        type: 'blockquote',
        quote:
          'Memperbaiki kecepatan landing page dari 5 detik menjadi di bawah 2 detik adalah cara paling terukur untuk memangkas biaya per prospek tanpa menambah anggaran iklan sepeser pun.',
        attribution: 'Chesta Azka · Co-Founder CHESTAADOTCOM',
      },
    ],
    conclusion: [
      'Iklan yang bagus hanya bertugas mengantarkan calon pelanggan sampai ke depan pintu halamanmu. Kecepatan muat dan kejelasan struktur halamanlah yang menentukan apakah klik berbayar tersebut berubah menjadi percakapan bisnis di WhatsApp atau menguap begitu saja.',
      'Mulailah dengan membandingkan angka Link Clicks dan Landing Page Views di laporan iklanmu hari ini, kompres aset visual di layar pertama, dan pastikan halaman tujuanmu terbuka gesit di perangkat seluler.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Bangun Landing Page Cepat & Siap Konversi Mulai Rp1.200.000',
      description:
        'Kami merancang dan membangun landing page ringan dengan LCP di bawah 2,5 detik, tampilan rapi di layar 375px, dan alur langsung ke WhatsApp bisnismu.',
      href: '/jasa/pembuatan-website',
      label: 'Lihat Jasa Pembuatan Website',
    },
    faq: [
      {
        question: 'Berapa kecepatan loading landing page yang sehat untuk iklan Meta Ads dan Google Ads?',
        answer:
          'Elemen utama di layar pertama (Largest Contentful Paint) idealnya tampil utuh di bawah 2,5 detik pada jaringan seluler 4G, dengan stabilitas tata letak (CLS) di bawah 0,1. Semakin cepat halaman terbuka, semakin tinggi persentase klik iklan yang benar-benar membaca penawaranmu.',
      },
      {
        question: 'Apakah saya harus merombak seluruh website perusahaan jika hanya halaman iklan yang lambat?',
        answer:
          'Tidak harus. Jika masalahnya hanya gambar yang belum dikompres atau skrip yang menumpuk, optimasi pada halaman yang ada sudah cukup. Namun jika tema website lama terlalu berat, membangun satu landing page khusus yang ringan untuk menerima trafik iklan sering kali jauh lebih cepat dan hemat biaya.',
      },
      {
        question: 'Apakah memasang Meta Pixel dan Google Tag pasti membuat halaman menjadi lambat?',
        answer:
          'Memasang satu Meta Pixel dan satu Google Tag tidak akan membuat halaman berat selama dimuat secara asinkron (async/defer). Yang membuat halaman lambat adalah menumpuk banyak skrip lama yang sudah tidak dipakai, widget chat berat, atau perekam layar pihak ketiga secara bersamaan.',
      },
      {
        question: 'Bagaimana cara meminta audit kecepatan landing page dari tim CHESTAADOTCOM?',
        answer:
          'Kamu cukup menekan tombol konsultasi WhatsApp di halaman ini dan mengirimkan tautan halaman yang sedang kamu iklankan. Kami akan membantu membedah titik penghambat kecepatannya dan memberikan saran perbaikan yang jujur.',
      },
    ],
    relatedSlugs: [
      'checklist-landing-page-konversi-tinggi-bisnis-jasa',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    ],
  }),

  // ==========================================================================
  // 2. WEBSITE COST GUIDE
  // ==========================================================================
  defineBlogPost({
    slug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    alternateSlug: 'how-much-does-a-business-website-cost-pricing-guide',
    title: 'Berapa Biaya Bikin Website untuk Bisnis? Panduan Harga Jujur',
    seoTitle: 'Biaya Bikin Website Bisnis: Panduan Harga | CHESTAADOTCOM',
    excerpt:
      'Penawaran pembuatan website di pasaran membentang dari Rp300.000 hingga puluhan juta rupiah. Pahami komponen biaya di balik layar agar kamu tidak salah memilih spesifikasi.',
    metaDescription:
      'Panduan jujur rincian biaya bikin website bisnis di Indonesia: beda spesifikasi landing page mulai Rp1.200.000, company profile, hingga aplikasi web custom.',
    category: 'Strategi & Investasi Web',
    categorySlug: 'investasi-web',
    tags: ['Biaya Website', 'Harga Landing Page', 'Web Development', 'Tips Bisnis', 'UMKM & B2B'],
    author: 'zeeshan',
    date: '2026-10-16',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogWebsiteCost',
    cover: SITE_IMAGES.blogWebsiteCost.src,
    coverAlt: SITE_IMAGES.blogWebsiteCost.alt,
    beforeIntroSnapshot:
      'Salah satu pertanyaan paling membingungkan bagi pemilik bisnis saat ingin membuat website adalah lebarnya rentang harga di pasaran. Di satu sisi, kamu mungkin melihat iklan di media sosial yang menawarkan jasa pembuatan website seharga Rp250.000. Di sisi lain, agensi digital atau software house mengajukan proposal senilai belasan hingga puluhan juta rupiah untuk kebutuhan yang terdengar mirip.',
    content: [
      {
        type: 'paragraph',
        text: 'Saat meminta penawaran pembuatan website bisnis, kamu mungkin menerima dua angka yang terpaut jauh: satu pihak menawarkan paket Rp300.000 selesai besok, sementara pihak lain mengajukan proposal Rp15.000.000 untuk kebutuhan yang sekilas terdengar sama. Tanpa memahami apa yang sebenarnya dikerjakan di balik layar, kamu berisiko membayar terlalu mahal untuk fitur yang belum dibutuhkan, atau justru membeli website murah yang tidak bisa dipakai menerima trafik iklan.',
      },
      {
        type: 'paragraph',
        text: 'Biaya pembuatan website tidak ditentukan oleh "berapa banyak halaman" semata, melainkan oleh empat komponen kerja: penyusunan struktur pesan penawaran (copywriting), kualitas rekayasa tampilan dan kecepatan di ponsel, kelengkapan fondasi SEO teknis, serta ada tidaknya logika sistem atau database di belakangnya.',
      },
      {
        type: 'h2',
        id: 'peta-perbandingan-tiga-kategori-website-bisnis',
        text: '1. Perbandingan Tiga Kategori Website Bisnis Beserta Kisaran Investasinya',
      },
      {
        type: 'paragraph',
        text: 'Supaya kamu memiliki patokan objektif sebelum berdiskusi dengan vendor mana pun, tabel di bawah ini memetakan tiga jenis kebutuhan website yang paling sering kami temui beserta cakupan teknisnya.',
      },
      {
        type: 'table',
        caption: 'Perbandingan spesifikasi, target bisnis, dan kisaran biaya pembuatan website',
        headers: [
          'Kategori Sistem',
          'Peruntukan Utama',
          'Cakupan Pekerjaan Inti',
          'Patokan Investasi & Waktu',
        ],
        rows: [
          [
            '1. Landing Page Fokus Konversi',
            'Kampanye iklan Meta/Google Ads untuk 1 layanan utama (klinik, F&B, properti, jasa)',
            'Struktur copywriting 1 halaman utuh, kecepatan LCP < 2,5 detik, integrasi CTA WhatsApp & Pixel',
            'Mulai Rp1.200.000 (3–7 hari kerja)',
          ],
          [
            '2. Website Company Profile & Katalog SEO',
            'Perusahaan B2B, kontraktor, arsitek, atau bisnis multi-layanan yang mengejar pencarian Google',
            'Multi-halaman (Layanan, Portofolio, Tentang, Blog), JSON-LD Schema, sitemap dinamis, optimasi lokal',
            'Menyesuaikan jumlah halaman & struktur konten (1–3 minggu)',
          ],
          [
            '3. Aplikasi Web Custom & Otomasi AI',
            'Operasional internal, portal klien, sistem booking jadwal dokter, atau dashboard logistik',
            'Database PostgreSQL, hak akses staf (RBAC), API backend, integrasi WhatsApp Cloud API / n8n',
            'Berdasarkan ruang lingkup setelah audit 30 menit (2–4 minggu)',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Jika kamu baru ingin menguji pasar atau menjalankan iklan untuk mendatangkan prospek WhatsApp, kamu tidak perlu langsung membangun website besar dengan belasan halaman. Memulai dari satu halaman melalui [jasa pembuatan website](/jasa/pembuatan-website) jauh lebih terfokus dan cepat balik modal. Sebaliknya, jika masalah utamamu adalah pencatatan surat jalan dan rekap keuangan yang berantakan seperti pada [studi kasus dashboard logistik](/case-studies/sentralisasi-operasional-armada-logistik), maka yang kamu butuhkan adalah [jasa software custom](/jasa/software-custom).',
      },
      {
        type: 'h2',
        id: 'empat-komponen-yang-membedakan-kualitas-website',
        text: '2. Empat Komponen Kerja yang Membedakan Website Produktif dan Brosur Mati',
      },
      {
        type: 'paragraph',
        text: 'Mengapa dua website dengan jumlah halaman yang sama bisa memberikan hasil konversi yang sangat berbeda? Berikut adalah empat detail pengerjaan yang sering dipangkas pada paket pembuatan web instan:',
      },
      {
        type: 'ul',
        items: [
          'Penyusunan alur pesan (Copywriting): Apakah pembuat web membantu menyusun kalimat judul, mengatasi keberatan pembeli, dan merapikan daftar paket, atau hanya menyalin-tempel teks mentah dari brosur lama kamu?',
          'Kerapian di layar ponsel 375px: Mayoritas pengunjung membuka website dari ponsel. Tata letak harus dirancang khusus agar ukuran teks nyaman dibaca dan tombol tidak saling berhimpitan.',
          'Struktur data mesin pencari & AI: Website yang rapi menyertakan skema JSON-LD, pengaturan OpenGraph untuk pratinjau tautan WhatsApp, serta peta situs otomatis.',
          'Kepemilikan akses penuh: Kamu wajib memegang kendali atas domain resmi perusahaan dan kode sumber tanpa dikunci sepihak oleh vendor.',
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Transparansi Harga di CHESTAADOTCOM',
        text: 'Untuk pembuatan website dan landing page, harga kami mulai dari Rp1.200.000. Untuk pengembangan AI agent dan software custom, biaya dihitung secara terbuka berdasarkan ruang lingkup integrasi setelah sesi diskusi dan audit alur 30 menit.',
      },
      {
        type: 'h2',
        id: 'rincian-biaya-tahunan-yang-wajib-ditanyakan-di-awal',
        text: '3. Rincian Biaya Tahunan yang Wajib Kamu Tanyakan Sebelum Deal',
      },
      {
        type: 'paragraph',
        text: 'Salah satu sumber kekecewaan pemilik bisnis adalah munculnya tagihan tahun kedua yang tidak pernah dijelaskan di awal proyek. Sebelum menyetujui penawaran, pastikan kamu menerima rincian tertulis seperti contoh struktur anggaran berikut:',
      },
      {
        type: 'code',
        language: 'yaml',
        filename: 'contoh-rincian-komponen-biaya-web.yaml',
        code: `# Contoh checklist transparansi biaya tahun ke-1 vs tahun ke-2
biaya_awal_pembuatan:
  desain_dan_pengembangan_halaman: "Termasuk (Satu kali bayar sesuai scope)"
  penyusunan_copywriting_dasar: "Termasuk"
  optimasi_kecepatan_dan_seo_teknis: "Termasuk"
  pemasangan_meta_pixel_dan_analytics: "Termasuk"

biaya_rutin_tahunan_atau_infrastruktur:
  perpanjangan_domain_com_atau_id: "Sekitar Rp200.000 - Rp350.000 / tahun (Atas nama bisnis kamu)"
  cloud_hosting_dan_ssl: "Disesuaikan trafik (Pastikan jelas sejak hari pertama)"
  kepemilikan_kode_sumber: "100% milik klien, bebas dipindahkan kapan saja"`,
        caption: 'Format rincian komponen biaya yang sehat agar tidak ada tagihan tersembunyi di tahun kedua.',
      },
      {
        type: 'h2',
        id: 'tanda-bahaya-penawaran-website-terlalu-murah',
        text: '4. Empat Tanda Bahaya (Red Flags) Penawaran Website yang Terlalu Murah',
      },
      {
        type: 'paragraph',
        text: 'Berhemat itu penting, tetapi memilih jasa pembuatan website seharga Rp150.000–Rp300.000 sering kali menimbulkan biaya perbaikan yang jauh lebih besar beberapa bulan kemudian. Waspadai empat risiko nyata ini:',
      },
      {
        type: 'ol',
        items: [
          'Penggunaan tema atau plugin bajakan (nulled): File bajakan hampir selalu disisipi celah keamanan (backdoor) yang beberapa minggu kemudian berubah menjadi halaman spam atau judi online di bawah nama domain resmi bisnismu.',
          'Domain didaftarkan atas nama pribadi vendor: Saat kamu ingin pindah layanan di tahun kedua, domain bisnismu ditahan atau diminta biaya tebusan tinggi.',
          'Server patungan yang padat dan lambat: Halaman tampak bisa dibuka saat diuji sendirian, tetapi langsung gagal dimuat (error 502/504) ketika menerima klik serentak dari iklan Instagram.',
          'Tanpa garansi perbaikan tampilan mobile: Teks meluber ke samping di layar HP dan tombol WhatsApp tertutup elemen lain tanpa ada dukungan perbaikan.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Jangan Serahkan Hak Milik Domain Bisnis Kamu',
        text: 'Nama domain (.com atau .id) adalah identitas hukum dan digital perusahaanmu. Pastikan kamu memiliki akses ke akun registrar domain atau kesepakatan tertulis bahwa domain tersebut adalah milik penuh bisnismu.',
      },
    ],
    conclusion: [
      'Website bisnis yang baik adalah investasi alat kerja yang bertugas meyakinkan calon pelanggan 24 jam sehari, bukan sekadar pengeluaran dekorasi.',
      'Pilihlah kategori website yang paling sesuai dengan target terdekat bisnismu saat ini, pastikan kepemilikan domain dan rincian biaya tahunannya transparan sejak hari pertama, dan utamakan kecepatan serta kejelasan pesan di atas hiasan visual yang tidak perlu.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Diskusikan Kebutuhan Website & Estimasi Biaya Bisnismu',
      description:
        'Ceritakan target yang ingin kamu capai. Kami bantu rekomendasikan spesifikasi yang paling masuk akal, dengan layanan web mulai dari Rp1.200.000.',
      href: '/jasa/pembuatan-website',
      label: 'Pelajari Jasa Pembuatan Website & Harga',
    },
    faq: [
      {
        question: 'Berapa biaya pembuatan landing page atau website di CHESTAADOTCOM?',
        answer:
          'Pembuatan landing page dan website dimulai dari Rp1.200.000, menyesuaikan jumlah halaman, kedalaman materi, dan kebutuhan integrasi. Sebelum mulai, kamu selalu mendapatkan rincian ruang lingkup kerja tertulis tanpa biaya tersembunyi.',
      },
      {
        question: 'Apakah saya harus menyiapkan seluruh naskah tulisan dan desain sendiri?',
        answer:
          'Tidak perlu. Kamu cukup menceritakan layanan utama, keunggulan bisnismu, dan mengirimkan foto dokumentasi yang tersedia. Tim kami akan menyusun alur kalimat penawaran (copywriting) dan tata letaknya agar siap memikat calon pelanggan.',
      },
      {
        question: 'Berapa lama waktu pengerjaan website sampai siap dipublikasikan?',
        answer:
          'Untuk landing page fokus konversi, pengerjaan berkisar 3 hingga 7 hari kerja sejak materi dasar disepakati. Untuk website multi-halaman atau aplikasi web custom, durasinya berkisar antara 2 hingga 4 minggu.',
      },
      {
        question: 'Apakah saya mendapatkan akses penuh ke website setelah selesai dibuat?',
        answer:
          'Ya. Kami menyerahkan akses pengelolaan secara transparan dan memastikan domain serta aset digital tetap berada di bawah kendali bisnismu.',
      },
    ],
    relatedSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'checklist-landing-page-konversi-tinggi-bisnis-jasa',
      'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    ],
  }),

  // ==========================================================================
  // 3. WHATSAPP & AI AUTOMATION FOR CLINICS & F&B
  // ==========================================================================
  defineBlogPost({
    slug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    alternateSlug: 'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
    title: 'Otomasi WhatsApp & AI untuk Klinik dan F&B: Contoh Alur Kerja Nyata',
    seoTitle: 'Otomasi WhatsApp & AI Klinik dan F&B | CHESTAADOTCOM',
    excerpt:
      'Pesan pasien atau reservasi pelanggan sering masuk pukul 20.30 malam saat admin sudah pulang. Pelajari 5 alur kerja WhatsApp & AI beserta batasan aman serah terima ke manusia.',
    metaDescription:
      'Contoh nyata alur kerja otomasi WhatsApp & AI agent untuk klinik kecantikan, gigi, dan bisnis F&B: balasan instan, cek jadwal dokter, reminder H-1, dan rekap POS.',
    category: 'Otomasi AI & Workflow',
    categorySlug: 'otomasi-ai',
    tags: ['Otomasi WhatsApp', 'AI untuk Bisnis', 'Klinik Kecantikan', 'Bisnis F&B', 'CRM'],
    author: 'zeeshan',
    date: '2026-10-18',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogWhatsappAiClinicFnb',
    cover: SITE_IMAGES.blogWhatsappAiClinicFnb.src,
    coverAlt: SITE_IMAGES.blogWhatsappAiClinicFnb.alt,
    beforeIntroSnapshot:
      'Bagi pemilik klinik kecantikan, klinik gigi, maupun bisnis F&B di kawasan ramai seperti BSD City, Bintaro, dan Gading Serpong, WhatsApp adalah jalur urat nadi transaksi harian. Hampir semua calon pasien atau pelanggan memulai interaksi dengan pesan singkat: "Kak, kalau treatment facial ini harganya berapa?", "Hari Sabtu jam 2 siang ada jadwal kosong?", atau "Bisa kirim buku menu untuk acara makan malam 20 orang?".',
    content: [
      {
        type: 'paragraph',
        text: 'Pukul 20.45 malam adalah jam sibuk bagi calon pasien klinik maupun pelanggan restoran untuk mencari informasi di ponsel, tetapi pada jam yang sama staf admin kamu sudah selesai bertugas. Ketika pertanyaan sesederhana "Sabtu sore jam 4 ada slot dokter kosong?" baru dijawab keesokan paginya pukul 09.30, sebagian besar calon pelanggan sudah lebih dulu memesan jadwal di tempat lain.',
      },
      {
        type: 'paragraph',
        text: 'Menambah shift admin malam khusus untuk menunggu chat sering kali tidak efisien secara biaya operasional. Sebaliknya, memasang pesan balasan otomatis kaku seperti "Ketik 1 untuk harga, Ketik 2 untuk alamat" justru membuat pelanggan malas melanjutkan percakapan. Solusi yang bekerja nyata di lapangan adalah memadukan [jasa AI agent](/jasa/ai-agent) untuk menangani pengecekan informasi rutin dan menyerahkan kasus sensitif ke staf manusia.',
      },
      {
        type: 'h2',
        id: 'lima-alur-kerja-otomasi-klinik-dan-fnb',
        text: '1. Lima Alur Kerja (Workflow) Otomasi yang Langsung Memangkas Beban Admin',
      },
      {
        type: 'paragraph',
        text: 'Alih-alih merombak seluruh cara kerja staf sekaligus, kamu bisa menerapkan otomasi secara bertahap pada lima titik yang paling sering menyita waktu admin setiap hari:',
      },
      {
        type: 'ol',
        items: [
          'Tanya-jawab layanan dan harga berbasis dokumen resmi: AI membaca daftar perawatan klinik atau paket menu grup F&B milikmu, lalu menjawab pertanyaan harga, durasi tindakan, dan lokasi parkir dalam waktu kurang dari 10 detik.',
          'Pengecekan slot jadwal dan pencatatan reservasi: Saat pasien ingin menjadwalkan kedatangan, agent mengecek tabel ketersediaan kursi/dokter secara langsung dan mengunci jadwal sementara tanpa resiko jadwal ganda.',
          'Pengingat otomatis (H-1 dan H-3 jam) untuk menekan angka batal datang: Sistem mengirimkan pesan pengingat sopan ke WhatsApp pasien lengkap dengan opsi konfirmasi hadir atau ubah jadwal.',
          'Penyaringan pesanan grup atau katering acara kantor: Untuk bisnis F&B, agent menanyakan tanggal acara, jumlah porsi, dan anggaran per orang sebelum meneruskan ringkasannya ke tim sales.',
          'Rekonsiliasi laporan harian otomatis ke ponsel owner: Melalui [jasa otomasi workflow](/jasa/otomasi-workflow), data kasir cabang ditarik setiap jam tutup toko dan dikirim sebagai rangkuman laba bersih ke WhatsApp pemilik bisnis.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Kamu bisa membaca bagaimana alur pertama hingga ketiga diterapkan secara utuh pada [studi kasus otomasi reservasi klinik estetika](/case-studies/otomasi-reservasi-klinik-estetika), serta bagaimana alur penarikan laporan kasir malam hari bekerja pada [studi kasus rekonsiliasi POS F&B multi-cabang](/case-studies/sinkronisasi-rekap-pos-fnb-multi-cabang).',
      },
      {
        type: 'h2',
        id: 'aturan-batas-tugas-ai-vs-staf-manusia',
        text: '2. Matriks Pembagian Tugas: Apa yang Dijawab AI vs Staf Manusia',
      },
      {
        type: 'paragraph',
        text: 'Kesalahan paling berbahaya saat memasang AI di WhatsApp bisnis adalah membiarkan sistem menjawab semua hal tanpa pagar pembatas (guardrails). Di klinik kesehatan maupun restoran, ada garis tegas antara informasi administratif dan keputusan yang wajib ditangani manusia.',
      },
      {
        type: 'table',
        caption: 'Aturan pembagian tugas antara AI Agent dan staf manusia (Human-in-the-Loop)',
        headers: [
          'Jenis Situasi / Pesan Masuk',
          'Penanggung Jawab',
          'Tindakan Sistem yang Benar',
        ],
        rows: [
          [
            'Tanya daftar harga tindakan, menu paket, jam buka, & titik parkir',
            'AI Agent (24/7)',
            'Menjawab langsung dari basis data resmi tanpa mengarang harga',
          ],
          [
            'Cek jadwal kosong dokter / meja & kunci slot reservasi awal',
            'AI Agent + Database',
            'Mengecek slot real-time di database & mencatat data pasien',
          ],
          [
            'Pasien mengirim foto keluhan kulit/medis & meminta diagnosis obat',
            'Wajib Dokter / Perawat',
            'AI menolak memberi diagnosis medis & langsung mengalihkan chat ke tim medis',
          ],
          [
            'Pelanggan komplain pesanan terlambat atau minta pengembalian dana',
            'Wajib Manajer / Admin Senior',
            'AI menandai status prioritas, membungkam balasan bot, & mengirim notifikasi ke admin',
          ],
          [
            'Negosiasi kontrak katering korporat atau sewa ruang VIP khusus',
            'Staf Sales Manusia',
            'AI merangkum jumlah tamu & tanggal, lalu menyerahkan ruang chat ke sales',
          ],
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Guardrail Wajib untuk Klinik Kesehatan & Estetika',
        text: 'AI agent di klinik tidak boleh pernah memberikan diagnosis medis atau meresepkan tindakan klinis. Sistem harus dikunci hanya untuk menjelaskan daftar layanan resmi dan menjadwalkan sesi konsultasi dengan dokter.',
      },
      {
        type: 'h2',
        id: 'contoh-payload-webhook-dan-handover-ke-admin',
        text: '3. Contoh Struktur Konfigurasi Aturan & Serah Terima (Handover)',
      },
      {
        type: 'paragraph',
        text: 'Agar staf admin kamu tidak bingung saat mengambil alih percakapan dari AI, sistem wajib mengirimkan ringkasan singkat (handover summary) ke ruang kerja admin. Berikut adalah contoh skema logika penyaringan dan oper percakapan yang kami terapkan di produksi:',
      },
      {
        type: 'code',
        language: 'json',
        filename: 'whatsapp-agent-routing-rule.json',
        code: `{
  "channel": "whatsapp_cloud_api",
  "knowledge_source": "postgres_verified_catalog_only",
  "strict_guardrails": {
    "forbid_medical_diagnosis": true,
    "forbid_unlisted_price_estimation": true,
    "human_handover_triggers": [
      "keluhan_medis_spesifik",
      "komplain_layanan",
      "permintaan_bicara_dengan_admin",
      "pesanan_korporat_di_atas_50_pax"
    ]
  },
  "handover_notification_payload": {
    "target_group": "Admin_Resepsionis_BSD",
    "summary_template": "Pasien {{nama}} ingin konsultasi {{layanan}} untuk {{jadwal}}. Alasan oper: {{alasan_handover}}."
  }
}`,
        caption: 'Contoh konfigurasi aturan batas tindakan AI agent dan format oper percakapan ke staf manusia.',
      },
      {
        type: 'h2',
        id: 'empat-langkah-memulai-tanpa-mengganggu-operasional',
        text: '4. Empat Langkah Memulai Otomasi Tanpa Mengganggu Operasional Harian',
      },
      {
        type: 'paragraph',
        text: 'Kamu tidak perlu menghentikan pelayanan WhatsApp yang sedang berjalan untuk memasang sistem ini. Terapkan urutan empat langkah berikut agar transisi berjalan mulus bagi admin maupun pelangganmu:',
      },
      {
        type: 'ul',
        items: [
          'Kumpulkan 20 pertanyaan paling berulang dari riwayat chat WhatsApp sebulan terakhir beserta jawaban paling rapi dari admin terbaikmu.',
          'Rapikan satu tabel daftar layanan, harga resmi, durasi pengerjaan, dan aturan pembatalan sebagai sumber kebenaran tunggal.',
          'Uji coba agent di nomor internal selama 3–5 hari dengan berbagai skenario pertanyaan menjebak untuk memastikan guardrails bekerja disiplin.',
          'Aktifkan di nomor utama dengan mode pendampingan, di mana staf admin bisa melihat seluruh log percakapan dan mengambil alih tombol kendali kapan saja.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Mulai dari Satu Alur Paling Menyita Waktu',
        text: 'Jangan mencoba mengotomasi sepuluh hal di minggu pertama. Mulailah dari balasan tanya-jawab luar jam kerja dan pengingat jadwal H-1; dua alur ini langsung terasa manfaatnya bagi tim admin kamu.',
      },
    ],
    conclusion: [
      'Otomasi WhatsApp dan AI agent bukan bertujuan menggantikan keramahan staf manusia di klinik atau restoranmu, melainkan mengambil alih tugas ketik berulang agar timmu fokus melayani pelanggan yang sudah hadir di lokasi.',
      'Dengan pembagian tugas yang jelas antara AI dan manusia, bisnis kamu tetap merespons prospek dalam hitungan detik di malam hari tanpa mengorbankan keamanan informasi.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Rancang AI Agent WhatsApp & Otomasi Jadwal untuk Bisnismu',
      description:
        'Kami membangun AI agent dengan batasan SOP yang ketat, terhubung ke kalender dan database bisnismu. Jadwalkan audit alur 30 menit gratis.',
      href: '/jasa/ai-agent',
      label: 'Lihat Jasa AI Agent & Otomasi',
    },
    faq: [
      {
        question: 'Apakah balasan AI di WhatsApp akan terasa kaku seperti mesin penjawab otomatis?',
        answer:
          'Tidak. Sistem menggunakan gaya sapaan Bahasa Indonesia yang sopan dan natural sesuai kebiasaan brand kamu, namun tetap dibatasi secara ketat agar hanya mengambil fakta harga dan jadwal dari database resmi bisnismu.',
      },
      {
        question: 'Apakah admin manusia tetap bisa membalas chat dari nomor WhatsApp yang sama?',
        answer:
          'Bisa setiap saat. Begitu staf admin masuk ke ruang percakapan atau ketika sistem mendeteksi pertanyaan sensitif, bot otomatis berhenti membalas di nomor tersebut agar admin manusia bisa berdiskusi langsung dengan pelanggan.',
      },
      {
        question: 'Berapa biaya pembuatan sistem AI agent WhatsApp di CHESTAADOTCOM?',
        answer:
          'Karena setiap klinik atau bisnis F&B memiliki jumlah cabang dan aturan jadwal yang berbeda, biaya pembuatan AI agent dihitung berdasarkan ruang lingkup integrasi setelah sesi audit alur gratis selama 30 menit.',
      },
      {
        question: 'Apakah sistem ini bisa dihubungkan ke Google Sheets atau Google Calendar yang sudah dipakai admin?',
        answer:
          'Bisa. Untuk bisnis yang belum ingin menggunakan database khusus, agent dapat membaca dan menulis jadwal langsung ke Google Calendar serta mencatat rekap prospek ke Google Sheets yang sudah akrab dipakai stafmu.',
      },
    ],
    relatedSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'checklist-landing-page-konversi-tinggi-bisnis-jasa',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
    ],
  }),

  // ==========================================================================
  // 4. HIGH-CONVERTING LANDING PAGE CHECKLIST
  // ==========================================================================
  defineBlogPost({
    slug: 'checklist-landing-page-konversi-tinggi-bisnis-jasa',
    alternateSlug: 'high-converting-landing-page-checklist-for-service-businesses',
    title: 'Checklist Landing Page Konversi Tinggi untuk Bisnis Jasa',
    seoTitle: 'Checklist Landing Page Bisnis Jasa | CHESTAADOTCOM',
    excerpt:
      'Desain visual yang rapi belum tentu menghasilkan chat WhatsApp jika urutan informasinya membuat calon klien ragu. Gunakan daftar periksa ini sebelum halamanmu diberi trafik iklan.',
    metaDescription:
      'Checklist praktis merancang landing page konversi tinggi untuk bisnis jasa di BSD & Jabodetabek: struktur layar pertama, transparansi harga, bukti kerja, dan CTA.',
    category: 'Konversi & UI/UX',
    categorySlug: 'konversi-ux',
    tags: ['Checklist Landing Page', 'Optimasi Konversi', 'Bisnis Jasa', 'Desain Web', 'Copywriting'],
    author: 'chesta',
    date: '2026-10-19',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogLandingPageChecklist',
    cover: SITE_IMAGES.blogLandingPageChecklist.src,
    coverAlt: SITE_IMAGES.blogLandingPageChecklist.alt,
    beforeIntroSnapshot:
      'Banyak halaman website terlihat rapi secara estetika, namun gagal menghasilkan pesan masuk ketika diberi trafik pengunjung. Penyebabnya sering kali bukan karena layanan yang ditawarkan kurang bagus, melainkan karena urutan informasi di halaman tersebut tidak menjawab keraguan calon pelanggan secara runtut.',
    content: [
      {
        type: 'paragraph',
        text: 'Calon klien yang membuka halaman bisnis jasa membutuhkan jawaban atas tiga pertanyaan dalam lima detik pertama: apa persisnya layanan yang kamu kerjakan, apakah kamu pernah menangani masalah serupa, dan berapa kisaran biaya serta langkah memulainya. Jika layar pertama halamanmu justru dipenuhi kalimat abstrak seperti "Mitra Strategis Terpercaya Masa Depan", pengunjung akan menutup halaman karena malas menebak-nebak.',
      },
      {
        type: 'paragraph',
        text: 'Bagi bisnis jasa seperti klinik perawatan, studio arsitektur dan interior, konsultan pajak, bengkel spesialis, maupun penyedia layanan B2B, keputusan menghubungi admin sangat bergantung pada kejelasan informasi. Berikut adalah urutan anatomi halaman dan daftar periksa yang kami terapkan pada [jasa pembuatan website](/jasa/pembuatan-website) di CHESTAADOTCOM.',
      },
      {
        type: 'h2',
        id: 'anatomi-urutan-seksi-landing-page-bisnis-jasa',
        text: '1. Urutan Seksi Landing Page yang Menjawab Keraguan Pembeli Secara Runtut',
      },
      {
        type: 'paragraph',
        text: 'Jangan menyusun bagian halaman berdasarkan selera dekorasi semata. Susunlah bagian dari atas ke bawah mengikuti alur berpikir calon klien saat mempertimbangkan penyedia jasa:',
      },
      {
        type: 'table',
        caption: 'Urutan bagian (section) landing page bisnis jasa dari atas ke bawah beserta fungsinya',
        headers: [
          'Urutan Bagian',
          'Pertanyaan di Kepala Pengunjung',
          'Isi Wajib di Dalam Bagian Tersebut',
        ],
        rows: [
          [
            '1. Layar Pertama (Hero)',
            '"Apakah tempat ini melayani kebutuhan saya di lokasi saya?"',
            'Judul H1 spesifik layanan + area, subjudul hasil nyata, 1 tombol CTA WhatsApp, & visual asli',
          ],
          [
            '2. Masalah & Solusi Spesifik',
            '"Apakah mereka paham kendala yang sedang saya alami?"',
            '3 situasi masalah nyata pelanggan dan bagaimana layananmu menyelesaikannya tanpa jargon',
          ],
          [
            '3. Paket Layanan & Patokan Harga',
            '"Kira-kira masuk ke anggaran saya atau tidak?"',
            '2–4 pilihan layanan utama lengkap dengan rincian yang didapat dan informasi harga mulai',
          ],
          [
            '4. Bukti Kerja & Studi Kasus',
            '"Bagaimana hasil kerja mereka sebelumnya?"',
            'Dokumentasi proyek asli, perbandingan sebelum-sesudah, dan profil penanggung jawab',
          ],
          [
            '5. Alur Kerja (3–4 Langkah)',
            '"Kalau saya hubungi sekarang, proses berikutnya bagaimana?"',
            'Urutan langkah dari konsultasi awal, survei/audit, pengerjaan, hingga serah terima',
          ],
          [
            '6. FAQ & Panggilan Aksi Penutup',
            '"Bagaimana dengan garansi, revisi, atau jadwalnya?"',
            '4–6 jawaban lugas atas keberatan umum pembeli + tombol CTA penutup ke WhatsApp',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'area-layar-pertama-above-the-fold',
        text: '2. Layar Pertama (Above-the-Fold): Uji Kejelasan 5 Detik',
      },
      {
        type: 'paragraph',
        text: 'Area paling atas layar tanpa menggulir adalah bagian paling menentukan. Pastikan kamu menggunakan rumus penulisan judul utama yang menyebutkan **Layanan Inti + Target/Lokasi + Hasil Konkret**. Misalnya, gantilah judul samar "Jasa Interior Impian" menjadi "Jasa Desain & Renovasi Interior Kantor Terima Beres di BSD & Tangerang Selatan".',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cara Melakukan Uji 5 Detik',
        text: 'Buka halamanmu di ponsel, tunjukkan kepada seseorang yang belum mengenal bisnismu selama 5 detik, lalu kunci layar. Tanyakan apa yang kamu jual dan bagaimana cara memesannya. Jika mereka ragu menjawab, perbaiki judul H1 kamu.',
      },
      {
        type: 'h2',
        id: 'transparansi-harga-mulai-sebagai-penyaring-prospek',
        text: '3. Mengapa Mencantumkan "Harga Mulai" Menghemat Waktu Admin Kamu',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik bisnis jasa takut mencantumkan patokan harga di halaman web karena khawatir kompetitor mengintip atau takut biaya akhirnya bervariasi tergantung ukuran proyek. Padahal, menyembunyikan informasi harga sama sekali justru menimbulkan dua kerugian: calon klien beranggaran layak ragu menghubungi karena takut ditembak harga mahal, sementara admin kamu habis waktunya melayani ratusan chat yang hanya menanyakan harga dasar lalu menghilang.',
      },
      {
        type: 'paragraph',
        text: 'Solusinya adalah mencantumkan **patokan harga mulai (starting price)** disertai penjelasan faktor apa yang memengaruhi biaya akhir. Sebagai contoh, di CHESTAADOTCOM kami mencantumkan dengan jelas bahwa pembuatan website dimulai dari Rp1.200.000, sedangkan sistem custom seperti pada [studi kasus dashboard logistik](/case-studies/sentralisasi-operasional-armada-logistik) dihitung berdasarkan ruang lingkup modul setelah sesi audit 30 menit.',
      },
      {
        type: 'h2',
        id: 'format-tautan-whatsapp-dan-pelacakan-konversi',
        text: '4. Struktur Tautan WhatsApp Otomatis & Kenyamanan Layar 375px',
      },
      {
        type: 'paragraph',
        text: 'Untuk pasar Indonesia, tombol langsung menuju WhatsApp menghasilkan konversi jauh lebih tinggi dibandingkan formulir email panjang. Agar calon pelanggan tidak bingung harus mengetik kalimat pembuka apa, dan supaya admin kamu langsung tahu dari halaman mana mereka berasal, gunakan format URL dengan pesan terisi otomatis serta pemicu pelacakan seperti contoh kode berikut:',
      },
      {
        type: 'code',
        language: 'tsx',
        filename: 'WhatsAppConversionButton.tsx',
        code: `const WHATSAPP_NUMBER = '6282125447232';

export function buildServiceWaLink(serviceName: string, pagePath: string): string {
  const message = \`Halo, saya membaca halaman \${serviceName} (\${pagePath}) dan ingin konsultasi mengenai kebutuhan bisnis saya.\`;
  return \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(message)}\`;
}

// Pastikan tombol memiliki tinggi minimal 44px agar nyaman disentuh ibu jari di layar 375px
<a
  href={buildServiceWaLink('Renovasi Interior Kantor', '/layanan/interior-kantor')}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-medium"
>
  Konsultasi Gratis via WhatsApp
</a>`,
        caption: 'Contoh pembuatan tautan WhatsApp dengan pesan pembuka otomatis yang menyertakan konteks halaman asal prospek.',
      },
      {
        type: 'h2',
        id: 'checklist-final-sebelum-publikasi',
        text: '5. Daftar Periksa Final Sebelum Halaman Dipublikasikan',
      },
      {
        type: 'ul',
        items: [
          'Judul H1 menyebutkan layanan dan target pelanggan secara lugas tanpa kata klise.',
          'Terdapat patokan harga awal atau penjelasan cara perhitungan biaya yang jujur.',
          'Bukti kerja menampilkan dokumentasi asli atau studi kasus nyata, bukan testimoni karangan.',
          'Tampilan di layar ponsel 375px bebas dari teks terpotong atau pergeseran ke samping (horizontal overflow).',
          'Seluruh tombol CTA memiliki tinggi area sentuh minimal 44px dan langsung membuka WhatsApp dengan teks terisi.',
          'Waktu muat halaman berada di bawah 2,5 detik pada jaringan seluler.',
        ],
      },
    ],
    conclusion: [
      'Landing page berkonversi tinggi tidak membutuhkan efek animasi rumit yang memusingkan mata. Ia bekerja karena menghargai waktu pengunjung: menyajikan penawaran yang jelas, bukti kerja yang jujur, patokan harga yang terbuka, dan jalur komunikasi WhatsApp yang instan.',
      'Gunakan daftar periksa di atas untuk mengevaluasi halaman bisnismu hari ini sebelum kamu menambah anggaran iklan bulanan.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Ingin Halaman Bisnismu Dirancang dengan Struktur Konversi Ini?',
      description:
        'Kami merancang landing page lengkap dengan penyusunan copywriting, tata letak mobile 375px, dan integrasi WhatsApp mulai dari Rp1.200.000.',
      href: '/jasa/pembuatan-website',
      label: 'Konsultasi Landing Page Sekarang',
    },
    faq: [
      {
        question: 'Mana yang lebih efektif untuk bisnis jasa: tombol langsung ke WhatsApp atau formulir isian?',
        answer:
          'Untuk mayoritas bisnis jasa di Indonesia, tombol langsung ke WhatsApp dengan teks pembuka otomatis menghasilkan jumlah chat yang lebih tinggi karena pelanggan ingin mendapat kepastian cepat. Jika kamu butuh menyaring data awal, kamu bisa memasang pemilih singkat 2–3 klik di halaman yang meneruskan pilihannya ke teks WhatsApp.',
      },
      {
        question: 'Berapa jumlah bagian (section) yang pas untuk satu landing page bisnis jasa?',
        answer:
          'Enam hingga delapan bagian yang mengalir runtut (Hero, Masalah & Solusi, Paket Layanan & Harga, Portofolio/Studi Kasus, Cara Kerja, Profil Tim, dan FAQ) sudah sangat cukup untuk menjawab keraguan calon klien tanpa membuat halaman terasa bertele-tele.',
      },
      {
        question: 'Apakah satu landing page bisa dipakai untuk mempromosikan lima layanan yang berbeda jauh?',
        answer:
          'Sebaiknya tidak jika dipakai untuk menerima klik iklan berbayar. Satu iklan spesifik sebaiknya mendarat di satu halaman yang membahas layanan tersebut secara mendalam agar pengunjung langsung merasa berada di halaman yang tepat.',
      },
    ],
    relatedSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    ],
  }),

  // ==========================================================================
  // 5. LOCAL SEO BSD & TANGERANG SELATAN
  // ==========================================================================
  defineBlogPost({
    slug: 'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    alternateSlug: 'local-seo-guide-for-bsd-and-south-tangerang-businesses',
    title: 'SEO Lokal untuk Bisnis di BSD & Tangerang Selatan: Cara Muncul di Google Maps dan Pencarian',
    seoTitle: 'SEO Lokal Bisnis BSD & Tangerang Selatan | CHESTAADOTCOM',
    excerpt:
      'Saat warga di BSD City, Bintaro, atau Gading Serpong mencari klinik, restoran, atau jasa terdekat di Google, pastikan bisnismu muncul di tiga teratas peta lokal dan halaman pertama.',
    metaDescription:
      'Panduan praktis SEO lokal untuk bisnis di BSD City, Alam Sutera, Bintaro & Tangerang Selatan: optimasi Google Business Profile, schema JSON-LD, dan ulasan.',
    category: 'SEO Lokal & Pertumbuhan',
    categorySlug: 'seo-lokal',
    tags: ['SEO Lokal', 'Google Business Profile', 'BSD City', 'Tangerang Selatan', 'Pemasaran Lokal'],
    author: 'chesta',
    date: '2026-10-20',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogLocalSeoBsd',
    cover: SITE_IMAGES.blogLocalSeoBsd.src,
    coverAlt: SITE_IMAGES.blogLocalSeoBsd.alt,
    beforeIntroSnapshot:
      'Coba bayangkan apa yang dilakukan warga di BSD City, Bintaro, Alam Sutera, atau Gading Serpong ketika mereka membutuhkan layanan terdekat, seperti klinik gigi keluarga, studio pilates, jasa renovasi interior rumah, bengkel AC mobil, atau tempat makan untuk acara kantor. Mereka hampir pasti membuka Google atau Google Maps lalu mengetikkan kata kunci layanan diikuti nama kawasan.',
    content: [
      {
        type: 'paragraph',
        text: 'Ketika seseorang di BSD City, Bintaro, Alam Sutera, atau Gading Serpong mengetik pencarian seperti "klinik gigi anak terdekat di BSD" atau "jasa desain interior kantor Tangerang Selatan" di Google, mereka tidak sedang mencari bacaan hiburan. Mereka adalah calon pembeli dengan niat transaksi tinggi yang sedang memilih tempat mana yang akan mereka hubungi minggu ini.',
      },
      {
        type: 'paragraph',
        text: 'Keuntungan terbesar dari SEO lokal adalah kamu tidak perlu bersaing melawan situs nasional raksasa di seluruh Indonesia. Selama profil Google Business Profile (Google Maps) dan halaman website bisnismu memiliki sinyal lokasi yang konsisten, cepat, dan terstruktur rapi, kamu bisa mengamankan posisi tiga teratas peta lokal (Local Map Pack) maupun hasil organik halaman pertama.',
      },
      {
        type: 'h2',
        id: 'tiga-pilar-peringkat-seo-lokal-google',
        text: '1. Tiga Pilar Penentu Peringkat Pencarian Lokal di Google & Mesin Jawaban AI',
      },
      {
        type: 'paragraph',
        text: 'Baik algoritma pencarian lokal Google maupun mesin pencari berbasis AI (seperti ChatGPT Search, Perplexity, dan Google AI Overviews) menilai kelayakan bisnismu berdasarkan tiga pilar utama:',
      },
      {
        type: 'table',
        caption: 'Tiga sinyal utama SEO lokal dan langkah teknis yang harus kamu lengkapi',
        headers: [
          'Sinyal Algoritma',
          'Apa yang Diperiksa Mesin Pencari',
          'Langkah Konkret di Bisnis Kamu',
        ],
        rows: [
          [
            '1. Relevansi (Relevance)',
            'Kecocokan antara kata kunci pencari dengan kategori dan isi halaman bisnismu',
            'Pilih Primary Category yang spesifik di Google Maps & cantumkan layanan + lokasi di tag H1/Title web',
          ],
          [
            '2. Jarak & Area Layanan (Distance / Area Served)',
            'Kejelasan titik lokasi ruko/kantor atau cakupan wilayah layanan (service area)',
            'Konsistensi alamat NAP di footer web, peta, serta properti areaServed pada JSON-LD LocalBusiness',
          ],
          [
            '3. Kredibilitas & Bukti (Prominence)',
            'Keaslian ulasan pelanggan, kelengkapan foto lokasi, dan kualitas teknis website',
            'Kumpulkan ulasan nyata berdetail layanan, unggah foto ruko/tim asli, dan jaga kecepatan web',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'optimasi-google-business-profile-secara-menyeluruh',
        text: '2. Melengkapi Google Business Profile (Google Maps) Secara Menyeluruh',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik ruko atau kantor di Tangerang Selatan hanya memverifikasi titik pin peta lalu membiarkan profilnya setengah kosong. Agar profilmu unggul dari kompetitor di blok ruko yang sama, lengkapi empat bagian ini:',
      },
      {
        type: 'ul',
        items: [
          'Kategori utama yang presisi: Jangan hanya memilih "Klinik" jika kamu adalah "Klinik Perawatan Kulit (Skin Care Clinic)" atau "Klinik Gigi (Dental Clinic)".',
          'Daftar layanan beserta kisaran harga: Isi menu Services/Layanan di dalam dashboard Google Business Profile lengkap dengan deskripsi singkat.',
          'Deskripsi dengan patokan kawasan nyata: Sebutkan lokasi ruko atau gedungmu secara natural, misalnya berada di kawasan Ruko Golden Madrid BSD, Foresta Business Loft, Bintaro Sektor 7, atau sekitar Alam Sutera.',
          'Foto asli dari lapangan: Unggah foto tampak depan bangunan dari pinggir jalan (agar mudah dikenali saat pelanggan menyetir), ruang tunggu, dan aktivitas tim.',
        ],
      },
      {
        type: 'h2',
        id: 'schema-json-ld-localbusiness-untuk-seo-dan-aeo',
        text: '3. Memasang Schema JSON-LD LocalBusiness agar Mudah Dikutip Mesin AI (GEO / AEO)',
      },
      {
        type: 'paragraph',
        text: 'Saat ini semakin banyak calon pelanggan yang bertanya langsung ke asisten AI: "Rekomendasikan vendor software atau klinik terpercaya di daerah BSD dan Tangerang Selatan". Mesin AI membaca struktur data di dalam kode HTML website kamu untuk memverifikasi alamat, nomor kontak, rentang harga, dan wilayah jangkauan.',
      },
      {
        type: 'paragraph',
        text: 'Setiap situs yang kami bangun melalui [jasa pembuatan website](/jasa/pembuatan-website) selalu menyertakan blok JSON-LD `LocalBusiness` / `ProfessionalService` seperti contoh di bawah ini:',
      },
      {
        type: 'code',
        language: 'json',
        filename: 'local-business-schema-bsd.json',
        code: `{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "name": "Nama Bisnis Kamu",
  "url": "https://namabisniskamu.com",
  "telephone": "+6282125447232",
  "priceRange": "Mulai dari Rp1.200.000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "BSD City, Tangerang Selatan",
    "addressRegion": "Banten",
    "addressCountry": "ID"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "BSD City" },
    { "@type": "AdministrativeArea", "name": "Alam Sutera" },
    { "@type": "AdministrativeArea", "name": "Bintaro" },
    { "@type": "AdministrativeArea", "name": "Gading Serpong" },
    { "@type": "AdministrativeArea", "name": "Tangerang Selatan" }
  ]
}`,
        caption: 'Contoh struktur JSON-LD LocalBusiness yang memperjelas cakupan wilayah layanan bagi Google dan mesin jawaban AI.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Konsistensi Data NAP (Name, Address, Phone)',
        text: 'Pastikan penulisan nama bisnis, alamat kawasan, dan nomor WhatsApp di bagian footer website persis sama dengan yang tertulis di Google Maps dan bio Instagram resmi bisnismu.',
      },
      {
        type: 'h2',
        id: 'strategi-mengumpulkan-ulasan-asli-tanpa-spam',
        text: '4. Cara Mengumpulkan Ulasan Pelanggan Asli Secara Otomatis',
      },
      {
        type: 'paragraph',
        text: 'Jangan pernah membeli ulasan palsu dari akun bot karena algoritma Google mudah mendeteksi lonjakan ulasan tidak wajar dan dapat menangguhkan profil peta bisnismu. Lima belas ulasan asli dari pelanggan nyata yang menyebutkan jenis layanan yang mereka beli jauh lebih kuat mengangkat peringkatmu dibandingkan seratus bintang lima kosong.',
      },
      {
        type: 'paragraph',
        text: 'Cara paling konsisten untuk mengumpulkan ulasan asli adalah menyelipkan pesan tindak lanjut (follow-up) otomatis satu hari setelah layanan selesai. Seperti yang kami bahas pada [studi kasus otomasi klinik estetika](/case-studies/otomasi-reservasi-klinik-estetika) dan [jasa AI agent](/jasa/ai-agent), sistem dapat mengirimkan pesan ramah ke pasien untuk menanyakan kabar pasca-perawatan sekaligus menyertakan tautan singkat menuju halaman ulasan Google Maps.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Hindari Menumpuk Nama Kelurahan Tanpa Konteks (Keyword Stuffing)',
        text: 'Menulis deretan puluhan nama kecamatan secara berulang di bawah halaman hanya akan membuat website terlihat seperti spam. Tulislah studi kasus atau contoh pengerjaan nyata di kawasan yang memang sering kamu layani.',
      },
    ],
    conclusion: [
      'SEO lokal di kawasan berkembang seperti BSD City dan Tangerang Selatan adalah aset jangka panjang yang terus mendatangkan prospek organik setiap minggu tanpa biaya per klik.',
      'Mulailah dengan merapikan Google Business Profile bisnismu, pasang struktur halaman serta schema LocalBusiness yang bersih di website, dan bangun kebiasaan meminta ulasan asli dari setiap pelanggan yang puas.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Bangun Website Bisnis dengan Fondasi SEO Lokal & AEO Lengkap',
      description:
        'Setiap website yang kami rancang sudah dilengkapi struktur HTML semantik, JSON-LD LocalBusiness, sitemap dinamis, dan kecepatan tinggi mulai dari Rp1.200.000.',
      href: '/jasa/pembuatan-website',
      label: 'Konsultasi Website & SEO Lokal',
    },
    faq: [
      {
        question: 'Berapa lama waktu yang dibutuhkan sampai optimasi SEO lokal mulai terlihat hasilnya?',
        answer:
          'Perbaikan kelengkapan Google Business Profile dan penambahan ulasan asli biasanya mulai meningkatkan jumlah tayangan peta dan klik telepon dalam 2 hingga 4 minggu. Untuk peringkat halaman website di hasil pencarian organik, pertumbuhan stabil umumnya terlihat dalam 1 hingga 3 bulan.',
      },
      {
        question: 'Apakah bisnis jasa yang melayani kunjungan ke lokasi klien (tanpa ruko fisik) tetap bisa memakai SEO lokal?',
        answer:
          'Sangat bisa. Google Business Profile memiliki pengaturan Service-Area Business untuk penyedia jasa yang mendatangi rumah atau kantor klien, dan website kamu tetap dapat dioptimalkan untuk kata kunci wilayah jangkauan seperti BSD, Bintaro, atau Tangerang Selatan.',
      },
      {
        question: 'Apakah website dari CHESTAADOTCOM sudah langsung memiliki pengaturan schema LocalBusiness dan sitemap?',
        answer:
          'Ya. Seluruh halaman website yang kami bangun sudah dilengkapi meta title, meta description, OpenGraph, JSON-LD LocalBusiness/ProfessionalService, serta terdaftar otomatis di /sitemap.xml dan /llms.txt.',
      },
    ],
    relatedSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'checklist-landing-page-konversi-tinggi-bisnis-jasa',
    ],
  }),
];

export const NEW_INDONESIAN_BLOG_POSTS: BlogPost[] = NEW_BLOG_POSTS_ID_RAW.map(defineBlogPost);
export const ENGLISH_BLOG_POSTS: BlogPost[] = [
  ...NEW_BLOG_POSTS_EN_RAW.map(defineBlogPost),
  ...EARLIER_BLOG_POSTS_EN_RAW.map(defineBlogPost),
];

export const BLOG_POSTS: BlogPost[] = [
  ...NEW_INDONESIAN_BLOG_POSTS,
  ...EXISTING_INDONESIAN_BLOG_POSTS,
];

export const ALL_BILINGUAL_BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS,
  ...ENGLISH_BLOG_POSTS,
];

export function getPublishedBlogPosts(locale: 'id' | 'en' = 'id'): BlogPost[] {
  const source = locale === 'en' ? ENGLISH_BLOG_POSTS : BLOG_POSTS;
  return source.filter((post) => !post.draft);
}

export function getBlogPostBySlug(
  slug: string,
  preferredLocale?: 'id' | 'en'
): BlogPost | undefined {
  const normalized = (slug || '').trim().toLowerCase();
  if (!normalized) return undefined;

  const publishedAll = ALL_BILINGUAL_BLOG_POSTS.filter((p) => !p.draft);

  // 1. Direct or alias match
  const matched = publishedAll.find(
    (post) =>
      post.slug.toLowerCase() === normalized ||
      (post.slugAliases && post.slugAliases.some((a) => a.toLowerCase() === normalized))
  );

  if (!matched) return undefined;

  // 2. If preferredLocale is requested and matched post has a counterpart in that locale, return it
  if (
    preferredLocale &&
    matched.locale &&
    matched.locale !== preferredLocale &&
    matched.alternateSlug
  ) {
    const counterpart = publishedAll.find(
      (p) => p.slug.toLowerCase() === matched.alternateSlug!.toLowerCase()
    );
    if (counterpart) return counterpart;
  }

  return matched;
}

export function getBlogAlternateSlugs(slug: string): {
  idSlug: string;
  enSlug?: string;
} | undefined {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;

  if (post.locale === 'en') {
    return {
      idSlug: post.alternateSlug || post.slug,
      enSlug: post.slug,
    };
  }

  return {
    idSlug: post.slug,
    enSlug: post.alternateSlug,
  };
}

export function getBlogCategoryBySlug(
  categorySlug: string,
  locale: 'id' | 'en' = 'id'
): BlogCategoryMeta | undefined {
  const normalized = categorySlug.toLowerCase().trim();
  const categories = getLocalizedBlogCategories(locale);
  return categories.find(
    (cat) =>
      cat.slug === normalized ||
      cat.name.toLowerCase() === normalized ||
      cat.shortLabel.toLowerCase() === normalized ||
      (cat.nameEn && cat.nameEn.toLowerCase() === normalized) ||
      (cat.shortLabelEn && cat.shortLabelEn.toLowerCase() === normalized)
  );
}

export function getBlogPostsByCategorySlug(
  categorySlug: string,
  locale: 'id' | 'en' = 'id'
): BlogPost[] {
  const cat = getBlogCategoryBySlug(categorySlug, locale);
  if (!cat) return [];
  return getPublishedBlogPosts(locale).filter((post) => post.categorySlug === cat.slug);
}

export function getAdjacentBlogPosts(
  slug: string,
  locale?: 'id' | 'en'
): {
  prev: BlogPost | undefined;
  next: BlogPost | undefined;
} {
  const current = getBlogPostBySlug(slug, locale);
  const resolvedLocale = locale || current?.locale || 'id';
  const published = getPublishedBlogPosts(resolvedLocale);
  const targetSlug = current?.slug || slug;
  const idx = published.findIndex((p) => p.slug === targetSlug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? published[idx - 1] : published[published.length - 1];
  const next = idx < published.length - 1 ? published[idx + 1] : published[0];
  return {
    prev: prev?.slug !== targetSlug ? prev : undefined,
    next: next?.slug !== targetSlug ? next : undefined,
  };
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatInlineHtml(raw: string): string {
  const escaped = escapeHtml(raw);
  return escaped
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#6A3FD0] underline font-medium">$1</a>'
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-[#EFEAFB] text-[#5230B0] font-mono text-[13px]">$1</code>'
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/**
 * Helper to convert structured content blocks into semantic HTML string
 * for server-side pre-rendering (SSR), RSS feeds, and AI crawlers.
 */
export function renderBlogPostHtml(post: BlogPost): string {
  const isEn = post.locale === 'en';
  const founderNoteHtml = post.founderNote
    ? `<aside class="my-6 p-5 rounded-xl bg-[#F8F6FE] border-l-4 border-[#6A3FD0]"><strong>${escapeHtml(
        post.founderNote.title
      )}:</strong><p class="mt-1">${formatInlineHtml(post.founderNote.text)}</p></aside>`
    : '';

  const blocksHtml = post.content
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return `<p class="mb-4">${formatInlineHtml(block.text)}</p>`;
        case 'h2':
          return `<h2 id="${escapeHtml(block.id)}" class="text-2xl font-bold mt-8 mb-3">${escapeHtml(
            block.text
          )}</h2>`;
        case 'h3':
          return `<h3 id="${escapeHtml(block.id)}" class="text-xl font-semibold mt-6 mb-2">${escapeHtml(
            block.text
          )}</h3>`;
        case 'ul':
          return `<div class="my-4">${
            block.title ? `<p class="font-semibold mb-2">${escapeHtml(block.title)}</p>` : ''
          }<ul class="list-disc pl-5 space-y-1.5">${block.items
            .map((item) => `<li>${formatInlineHtml(item)}</li>`)
            .join('')}</ul></div>`;
        case 'ol':
          return `<div class="my-4">${
            block.title ? `<p class="font-semibold mb-2">${escapeHtml(block.title)}</p>` : ''
          }<ol class="list-decimal pl-5 space-y-1.5">${block.items
            .map((item) => `<li>${formatInlineHtml(item)}</li>`)
            .join('')}</ol></div>`;
        case 'blockquote':
          return `<blockquote class="my-6 p-5 rounded-xl bg-[#F8F6FE] border-l-4 border-[#6A3FD0]"><p>${formatInlineHtml(
            block.quote
          )}</p>${
            block.attribution
              ? `<cite class="block mt-2 text-xs font-mono text-[#5B5675]">— ${escapeHtml(
                  block.attribution
                )}</cite>`
              : ''
          }</blockquote>`;
        case 'callout':
          return `<aside class="my-6 p-5 rounded-xl bg-[#F8F6FE] border-l-4 border-[#6A3FD0]"><strong>${escapeHtml(
            block.title
          )}:</strong> <p class="mt-1">${formatInlineHtml(block.text)}</p></aside>`;
        case 'table':
          return `<div class="my-6 overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr>${block.headers
            .map((h) => `<th class="border-b p-2 font-semibold">${escapeHtml(h)}</th>`)
            .join('')}</tr></thead><tbody>${block.rows
            .map(
              (row) =>
                `<tr>${row
                  .map((cell) => `<td class="border-b p-2">${formatInlineHtml(cell)}</td>`)
                  .join('')}</tr>`
            )
            .join('')}</tbody></table></div>`;
        case 'code':
          return `<pre class="my-6 p-4 rounded-xl bg-[#17122B] text-[#F8F6FE] overflow-x-auto text-xs font-mono"><code>${escapeHtml(
            block.code
          )}</code></pre>`;
        case 'image':
          return `<figure class="my-6"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(
            block.alt
          )}" width="${block.width || 1280}" height="${
            block.height || 720
          }" loading="lazy" /><figcaption class="text-xs text-[#5B5675] mt-2">${escapeHtml(
            block.caption
          )}</figcaption></figure>`;
      }
    })
    .join('\n');

  const conclusionHeading = isEn ? 'Conclusion' : 'Kesimpulan';
  const conclusionHtml = `<section id="kesimpulan" class="mt-8"><h2 class="text-2xl font-bold mb-3">${conclusionHeading}</h2>${post.conclusion
    .map((p) => `<p class="mb-4">${formatInlineHtml(p)}</p>`)
    .join('\n')}</section>`;

  return `${founderNoteHtml}\n${blocksHtml}\n${conclusionHtml}`;
}
