import type { UnifiedAreaSeed } from './unified-areas-types';

export const UNIFIED_AREAS_GREATER_A: UnifiedAreaSeed[] = [
  // 15. GADING SERPONG (Kabupaten Tangerang, Wave 1 Live)
  {
    slug: 'gading-serpong',
    nameId: 'Gading Serpong',
    nameEn: 'Gading Serpong',
    regionGroup: 'kabupaten-tangerang',
    regionLabelId: 'Gading Serpong, Kabupaten Tangerang',
    regionLabelEn: 'Gading Serpong, Tangerang Regency',
    schemaType: 'AdministrativeArea',
    wave: 1,
    publishAt: '2026-10-29',
    hasServiceAreaPages: false,
    nearbySlugs: ['bsd-city', 'serpong', 'alam-sutera', 'tangerang-selatan'],
    factsSummaryId:
      'Kawasan di Kabupaten Tangerang yang berdekatan dengan Serpong dan BSD City, mencakup koridor komersial dan kawasan permukiman.',
    factsSummaryEn:
      'An area in Tangerang Regency adjacent to Serpong and BSD City, encompassing commercial corridors and residential neighborhoods.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Gading Serpong. Cepat dibuka di HP, mulai Rp1.200.000, audit gratis.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Gading Serpong. Fast mobile pages from IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di kawasan Gading Serpong, Kabupaten Tangerang. Cocok bagi kafe dan restoran, klinik, toko online, bimbel, properti, maupun jasa profesional. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Gading Serpong, Tangerang Regency. Built for cafes and restaurants, clinics, online shops, tutoring centers, property, and professional services. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di koridor komersial atau kawasan permukiman Gading Serpong butuh halaman web yang cepat dibuka di HP, ingin merespons chat reservasi secara otomatis, atau merapikan pencatatan tim.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau alur operasional bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, aturan AI agent, dan integrasi tool.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Gading Serpong’s commercial corridors or residential areas needs a fast mobile webpage, automated reservation chat handling, or structured team records.',
      mulaiDari:
        'A free 30-minute audit to inspect your current webpages or operational workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, AI agent rules, and tool integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Gading Serpong butuh ini',
    whyNeedHeadingEn: 'Why businesses in Gading Serpong need this',
    whyNeedParagraphsId: [
      'Gading Serpong di Kabupaten Tangerang merupakan kawasan dengan koridor komersial yang padat serta kawasan permukiman yang bersebelahan langsung dengan Serpong dan BSD City. Di kawasan ini, umumnya beroperasi beragam usaha seperti kafe dan restoran, klinik perawatan, bimbel, toko online, agen properti, kontraktor, serta jasa profesional.',
      'Persaingan antar usaha sejenis di koridor komersial Gading Serpong membuat calon pelanggan biasanya membandingkan beberapa tempat lewat layar HP sebelum memutuskan datang atau memesan. Halaman web yang ringan dan langsung menampilkan daftar menu, paket layanan, kisaran harga awal, serta tombol WhatsApp umumnya membantu pengunjung mengambil keputusan lebih cepat.',
      'Di sisi operasional, tingginya volume chat pertanyaan meja kosong, jadwal perawatan, atau stok produk pada akhir pekan biasanya membuat admin kewalahan jika harus membalas dan mencatat manual. Menerapkan AI agent WhatsApp, aplikasi operasional custom, atau otomasi workflow menjaga kecepatan layanan sekaligus kerapian data.',
    ],
    whyNeedParagraphsEn: [
      'Gading Serpong in Tangerang Regency features busy commercial corridors and residential neighborhoods directly adjacent to Serpong and BSD City. Across this area, businesses commonly include cafes and restaurants, care clinics, tutoring centers, online shops, property agencies, contractors, and professional services.',
      'Because similar businesses operate side by side along Gading Serpong’s commercial corridors, prospective customers usually compare several options on their phones before visiting or ordering. A lightweight webpage displaying menus, service packages, starting prices, and a direct WhatsApp button helps visitors decide faster.',
      'On the operational side, high weekend chat volumes asking about table availability, treatment slots, or product stock often overwhelm staff replying and logging by hand. Deploying a WhatsApp AI agent, custom operational software, or workflow automation keeps service fast and records accurate.',
    ],
    typicalBusinessMixId: [
      'Kafe, restoran, dan usaha kuliner di koridor komersial Gading Serpong',
      'Klinik kesehatan, gigi, dan estetika yang mengandalkan booking jadwal harian',
      'Bimbel, tempat kursus, dan toko online di sekitar kawasan permukiman Gading Serpong',
      'Agen properti, kontraktor interior, dan jasa profesional',
    ],
    typicalBusinessMixEn: [
      'Cafes, restaurants, and food businesses along Gading Serpong commercial corridors',
      'Health, dental, and aesthetic clinics relying on daily appointment bookings',
      'Tutoring centers, courses, and online shops around Gading Serpong residential areas',
      'Property agencies, interior contractors, and professional services',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website menu digital, informasi ruang privat, dan reservasi restoran',
        titleEn: 'Digital menu, private room info, and reservation website for a restaurant',
        businessTypeId: 'Kafe dan restoran di Gading Serpong',
        businessTypeEn: 'Cafe and restaurant in Gading Serpong',
        narrativeId:
          'Calon tamu yang ingin mengadakan makan bersama keluarga atau rekan kerja biasanya mencari informasi kapasitas ruangan, minimum pemesanan, dan daftar menu. Kami merancang website yang cepat di HP dengan informasi paket yang jelas dan tombol reservasi langsung ke WhatsApp.',
        narrativeEn:
          'Guests planning family or team dinners usually look up room capacities, minimum spend terms, and menus on their phones. We build a fast mobile website presenting clear package details and a direct WhatsApp reservation button.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Pencatatan daftar tunggu dan booking jadwal perawatan klinik',
        titleEn: 'Waitlist logging and treatment slot booking for a clinic',
        businessTypeId: 'Klinik di Gading Serpong',
        businessTypeEn: 'Clinic in Gading Serpong',
        narrativeId:
          'Pada jam ramai, pesan WhatsApp yang menanyakan slot kosong sore hari sering baru terbalas beberapa jam kemudian. AI agent memeriksa kalender praktik secara langsung, mengunci jadwal pasien di slot yang tersedia, dan meneruskan pertanyaan konsultasi khusus ke admin.',
        narrativeEn:
          'During busy hours, WhatsApp messages asking for afternoon slots often wait hours for a reply. An AI agent checks the live practice calendar, locks patient bookings into open slots, and forwards specialized questions to the front desk.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi kontrol suhu penyimpanan dan pembukuan bahan baku F&B',
        titleEn: 'Storage temperature log and ingredient inventory app for F&B',
        businessTypeId: 'Usaha minuman dan kuliner di Gading Serpong',
        businessTypeEn: 'Beverage and food business in Gading Serpong',
        narrativeId:
          'Usaha minuman dan kuliner multi-gerai membutuhkan pencatatan suhu penyimpanan, pembukuan barang masuk-keluar, serta pelacakan bahan yang gagal atau kedaluwarsa. Kami membangun web app khusus agar staf gerai mencatat pengecekan harian dari HP secara seragam.',
        narrativeEn:
          'Multi-outlet beverage and food businesses need reliable temperature logging, inbound-outbound stock bookkeeping, and spoilage tracking. We build a custom web app so outlet staff record daily checks consistently from their phones.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pembagian prospek iklan properti dan pengingat jadwal survei',
        titleEn: 'Automated property ad lead routing and viewing reminders',
        businessTypeId: 'Properti di Gading Serpong',
        businessTypeEn: 'Property agency in Gading Serpong',
        narrativeId:
          'Prospek yang mengisi formulir iklan sering dingin karena terlambat dibagikan ke agen yang bertugas. Otomasi workflow mencatat data prospek ke spreadsheet utama, meneruskannya ke WhatsApp agen sesuai giliran, dan mengirim pengingat jadwal survei ke calon pembeli.',
        narrativeEn:
          'Leads submitting ad forms often go cold when manual distribution to agents is delayed. Workflow automation logs leads to the master sheet, routes them to the on-duty agent’s WhatsApp, and sends viewing reminders to buyers.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Gading Serpong',
    howWeWorkHeadingEn: 'How we work with clients in Gading Serpong',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan—bersebelahan langsung dengan kawasan Gading Serpong. Koordinasi harian seperti diskusi alur kerja, pengiriman materi, dan peninjauan prototipe dilakukan secara online lewat WhatsApp dan video call.',
      'Pertemuan tatap muka di area Tangerang Selatan juga dapat dijadwalkan sesuai kesepakatan bersama apabila diperlukan. Seluruh proyek dikerjakan langsung bersama Chesta Azka dan Zeeshan melalui empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang—right next to Gading Serpong. Daily coordination such as workflow discussions, material handoffs, and prototype reviews runs online via WhatsApp and video call.',
      'In-person meetings in the South Tangerang area can also be scheduled by agreement when needed. Every project is handled directly with Chesta Azka and Zeeshan across four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan website atau alur operasional bisnismu di Gading Serpong sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Gading Serpong before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screens before full development starts.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang dapat kamu pilih untuk mendukung bisnismu di kawasan Gading Serpong:',
    servicesIntroEn:
      'Four core services you can choose to support your business in Gading Serpong:',
    faqsId: [
      {
        question: 'Apakah CHESTAADOTCOM memiliki kantor di Gading Serpong?',
        answer:
          'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan yang bersebelahan dengan Gading Serpong. Pekerjaan harian dilakukan secara online lewat WhatsApp dan video call, dan pertemuan tatap muka di area Tangerang Selatan bisa dijadwalkan sesuai kesepakatan.',
      },
      {
        question: 'Berapa biaya pembuatan website dan sistem untuk bisnis di Gading Serpong?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah saya mendapatkan akses penuh atas domain dan database sistem?',
        answer:
          'Ya, domain, hosting, dan seluruh data bisnismu terdaftar langsung atas namamu sendiri. Akses teknis kami dicabut ketika proyek atau masa perawatan selesai.',
      },
    ],
    faqsEn: [
      {
        question: 'Does CHESTAADOTCOM have an office in Gading Serpong?',
        answer:
          'CHESTAADOTCOM is based in BSD, South Tangerang, right next to Gading Serpong. Daily work runs online via WhatsApp and video call, and in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
      {
        question: 'How much do websites and custom systems cost for businesses in Gading Serpong?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Do I get full ownership of the domain and system database?',
        answer:
          'Yes, your domain, hosting, and business data are registered directly under your own name. Our technical access is revoked once the project or maintenance term concludes.',
      },
    ],
    ctaHeadingId: 'Mulai dengan audit gratis 30 menit untuk bisnismu di Gading Serpong',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Gading Serpong',
    ctaBodyId:
      'Ceritakan kebutuhan website, AI agent, atau sistem operasional bisnismu di Gading Serpong lewat WhatsApp bersama Chesta Azka dan Zeeshan.',
    ctaBodyEn:
      'Tell us about your website, AI agent, or operational software needs in Gading Serpong via WhatsApp with Chesta Azka and Zeeshan.',
  },

  // 16. SUMMARECON SERPONG (Kabupaten Tangerang, Wave 2 Scheduled)
  {
    slug: 'summarecon-serpong',
    nameId: 'Summarecon Serpong',
    nameEn: 'Summarecon Serpong',
    regionGroup: 'kabupaten-tangerang',
    regionLabelId: 'Summarecon Serpong, Kabupaten Tangerang',
    regionLabelEn: 'Summarecon Serpong, Tangerang Regency',
    schemaType: 'AdministrativeArea',
    wave: 2,
    publishAt: '2026-11-05',
    hasServiceAreaPages: false,
    nearbySlugs: ['gading-serpong', 'bsd-city', 'serpong', 'alam-sutera'],
    factsSummaryId:
      'Kawasan di Kabupaten Tangerang dengan koridor komersial dan kawasan permukiman.',
    factsSummaryEn:
      'An area in Tangerang Regency featuring commercial corridors and residential neighborhoods.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Summarecon Serpong. Mulai Rp1.200.000 dengan audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Summarecon Serpong. From IDR 1.2M with a free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di kawasan Summarecon Serpong, Kabupaten Tangerang. Dirancang untuk kafe dan restoran, klinik, properti, kontraktor, bimbel, maupun jasa profesional. Website mulai Rp1.200.000, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Summarecon Serpong, Tangerang Regency. Built for cafes and restaurants, clinics, property, contractors, tutoring centers, and professional services. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di kawasan Summarecon Serpong ingin punya halaman web yang jelas untuk pengunjung iklan, mengotomasi balasan chat reservasi, atau merapikan pencatatan tim.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau alur kerja harian bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai jumlah halaman, aturan AI agent, dan integrasi sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Summarecon Serpong wants a clear webpage for ad visitors, automated reservation chat replies, or structured team record-keeping.',
      mulaiDari:
        'A free 30-minute audit to inspect your existing webpages or daily workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page count, AI agent rules, and system integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Summarecon Serpong butuh ini',
    whyNeedHeadingEn: 'Why businesses in Summarecon Serpong need this',
    whyNeedParagraphsId: [
      'Summarecon Serpong merupakan kawasan di Kabupaten Tangerang yang mencakup koridor komersial dan kawasan permukiman. Di kawasan ini, umumnya beroperasi beragam usaha seperti kafe dan restoran, klinik, properti, kontraktor interior, bimbel, toko online, serta jasa profesional.',
      'Calon pelanggan yang mencari layanan atau tempat makan di Summarecon Serpong biasanya membuka beberapa halaman sekaligus di HP untuk mengecek menu, paket layanan, dan kisaran harga. Halaman web yang lambat atau tidak mencantumkan cara pemesanan dengan terang umumnya membuat pengunjung beralih ke pilihan lain.',
      'Selain itu, tim admin di koridor komersial Summarecon Serpong biasanya harus melayani pelanggan yang datang langsung sembari membalas chat WhatsApp. Menghubungkan AI agent, aplikasi pencatatan custom, atau otomasi workflow membantu menjaga respons tetap cepat dan jadwal reservasi tidak berbenturan.',
    ],
    whyNeedParagraphsEn: [
      'Summarecon Serpong is an area in Tangerang Regency encompassing commercial corridors and residential neighborhoods. Businesses operating here commonly include cafes and restaurants, clinics, property agencies, interior contractors, tutoring centers, online shops, and professional services.',
      'Prospective customers searching for services or dining spots in Summarecon Serpong typically open several tabs on their phones to compare menus, service packages, and price ranges. A slow webpage that hides booking steps usually causes visitors to move on.',
      'Additionally, front-desk teams along Summarecon Serpong’s commercial corridors usually assist walk-in guests while replying to WhatsApp chats. Connecting an AI agent, custom tracking software, or workflow automation keeps responses fast and prevents double-booked schedules.',
    ],
    typicalBusinessMixId: [
      'Kafe, restoran, dan usaha kuliner di koridor komersial Summarecon Serpong',
      'Klinik kesehatan, perawatan, dan kebugaran yang melayani reservasi jadwal',
      'Agen properti, studio interior, dan kontraktor di sekitar kawasan permukiman',
      'Bimbel, kursus, toko online, dan jasa profesional',
    ],
    typicalBusinessMixEn: [
      'Cafes, restaurants, and food businesses along Summarecon Serpong commercial corridors',
      'Health, aesthetic, and wellness clinics handling scheduled appointments',
      'Property agencies, interior studios, and contractors around residential areas',
      'Tutoring centers, courses, online shops, and professional services',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Landing page paket layanan dan booking sesi untuk klinik perawatan',
        titleEn: 'Service package and session booking landing page for a care clinic',
        businessTypeId: 'Klinik di Summarecon Serpong',
        businessTypeEn: 'Clinic in Summarecon Serpong',
        narrativeId:
          'Calon pelanggan yang mengklik iklan perawatan biasanya ingin melihat rincian tahapan sesi, durasi, dan kisaran biaya sebelum menghubungi admin. Kami membangun halaman web yang cepat dibuka di HP dengan penjelasan per paket dan tombol booking WhatsApp.',
        narrativeEn:
          'Prospective clients clicking care ads usually want to check session steps, durations, and price ranges before messaging the front desk. We build a fast mobile landing page with clear package details and a direct WhatsApp booking button.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp untuk tanya jawab kelas kursus dan pendaftaran uji coba',
        titleEn: 'WhatsApp assistant for course class Q&A and trial enrollment',
        businessTypeId: 'Bimbel dan kursus di Summarecon Serpong',
        businessTypeEn: 'Tutoring and course center in Summarecon Serpong',
        narrativeId:
          'Orang tua murid sering menanyakan jadwal kelas akhir pekan dan biaya per level di malam hari. AI agent menjawab rincian program sesuai aturan, memeriksa sisa kuota kelas di tabel jadwal, dan mencatat pendaftaran kelas uji coba secara otomatis.',
        narrativeEn:
          'Parents often ask about weekend class schedules and level fees late in the evening. An AI agent answers program details accurately, checks open class seats on the schedule sheet, and logs trial registrations automatically.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Sistem pengelolaan daftar unit dan jadwal kunjungan agen properti',
        titleEn: 'Unit listing and viewing schedule management app for a property team',
        businessTypeId: 'Properti di Summarecon Serpong',
        businessTypeEn: 'Property agency in Summarecon Serpong',
        narrativeId:
          'Kantor pemasaran properti sering kesulitan memastikan apakah sebuah unit sewa atau jual masih tersedia ketika catatan tersebar di chat masing-masing agen. Kami merancang web app operasional tim untuk memantau status ketersediaan unit dan jadwal kunci survei.',
        narrativeEn:
          'Property offices often struggle to verify whether a rental or sale unit is still available when notes sit in individual agent chats. We build a team web app to track unit availability statuses and key-handover viewing schedules.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi rekap penutupan kasir harian dan peringatan bahan baku restoran',
        titleEn: 'Automated daily cashier closing summaries and restaurant stock alerts',
        businessTypeId: 'Kafe dan restoran di Summarecon Serpong',
        businessTypeEn: 'Cafe and restaurant in Summarecon Serpong',
        narrativeId:
          'Setiap malam setelah restoran tutup, manajer shift biasanya harus menyalin laporan penjualan dan sisa bahan ke grup WhatsApp pemilik. Otomasi workflow menarik data dari spreadsheet tutup kasir dan mengirimkan ringkasan harian secara otomatis.',
        narrativeEn:
          'Every night after closing, shift managers typically copy sales totals and remaining stock counts into the owner’s WhatsApp group. Workflow automation pulls data from the closing sheet and sends a daily summary automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Summarecon Serpong',
    howWeWorkHeadingEn: 'How we work with clients in Summarecon Serpong',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi pengerjaan proyek bersama klien di Summarecon Serpong dijalankan secara online melalui WhatsApp dan video call agar ringkas.',
      'Apabila diperlukan pertemuan tatap muka di area Tangerang Selatan, jadwal dapat disepakati bersama. Kami menjalankan setiap proyek melalui empat langkah kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Project coordination with clients in Summarecon Serpong runs online via WhatsApp and video call for convenience.',
      'Whenever an in-person meeting in the South Tangerang area is needed, sessions can be scheduled by agreement. We run every project through four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau alur operasional bisnismu di Summarecon Serpong sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau rancangan layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Summarecon Serpong before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screen designs before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat dipilih untuk mendukung bisnismu di kawasan Summarecon Serpong:',
    servicesIntroEn:
      'Four services you can choose to support your business in Summarecon Serpong:',
    faqsId: [
      {
        question: 'Dimana basis operasional CHESTAADOTCOM?',
        answer:
          'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Kami melayani bisnis di Summarecon Serpong secara online lewat WhatsApp dan video call, serta dapat bertemu tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Berapa biaya awal pembuatan website untuk usaha di Summarecon Serpong?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah saya mendapatkan estimasi waktu pengerjaan sebelum proyek dimulai?',
        answer:
          'Ya, setelah sesi audit gratis 30 menit selesai, kami menyampaikan rincian cakupan kerja, biaya, serta estimasi waktu pengerjaan secara tertulis sebelum kamu membayar apa pun.',
      },
    ],
    faqsEn: [
      {
        question: 'Where is CHESTAADOTCOM based?',
        answer:
          'CHESTAADOTCOM is based in BSD, South Tangerang. We serve businesses in Summarecon Serpong online via WhatsApp and video call, and can meet in person in the South Tangerang area by agreement.',
      },
      {
        question: 'What is the starting cost for website development in Summarecon Serpong?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Will I receive a timeline estimate before the project begins?',
        answer:
          'Yes, right after the free 30-minute audit session, we share a written breakdown of scope, pricing, and estimated timeline before you pay anything.',
      },
    ],
    ctaHeadingId: 'Jadwalkan audit gratis 30 menit untuk bisnismu di Summarecon Serpong',
    ctaHeadingEn: 'Schedule a free 30-minute audit for your business in Summarecon Serpong',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk mendiskusikan kebutuhan website, AI agent, atau sistem kerja usahamu di Summarecon Serpong.',
    ctaBodyEn:
      'Message us on WhatsApp to discuss your website, AI agent, or operational system needs in Summarecon Serpong.',
  },

  // 17. CISAUK (Kabupaten Tangerang, Wave 3 Scheduled)
  {
    slug: 'cisauk',
    nameId: 'Cisauk',
    nameEn: 'Cisauk',
    regionGroup: 'kabupaten-tangerang',
    regionLabelId: 'Kecamatan Cisauk, Kabupaten Tangerang',
    regionLabelEn: 'Cisauk District, Tangerang Regency',
    schemaType: 'AdministrativeArea',
    wave: 3,
    publishAt: '2026-11-12',
    hasServiceAreaPages: false,
    nearbySlugs: ['bsd-city', 'serpong', 'tangerang-selatan', 'gading-serpong'],
    factsSummaryId:
      'Wilayah di Kabupaten Tangerang yang berbatasan dekat dengan BSD City dan Serpong.',
    factsSummaryEn:
      'An area in Tangerang Regency bordering closely with BSD City and Serpong.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Cisauk, Kabupaten Tangerang. Mulai Rp1.200.000 dengan audit gratis.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Cisauk, Tangerang Regency. From IDR 1.2M with a free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk pelaku usaha di Cisauk, Kabupaten Tangerang. Cocok bagi kos-kosan, toko online, kafe dan restoran, kontraktor, klinik, maupun bimbel di kawasan permukiman. Website mulai Rp1.200.000, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for business owners in Cisauk, Tangerang Regency. Built for boarding houses, online shops, cafes and restaurants, contractors, clinics, and tutoring centers. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Cisauk ingin mudah ditemukan warga sekitar lewat HP, membalas chat pertanyaan harga secara otomatis, atau merapikan pencatatan pesanan dan sewa.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau alur kerja harian usahamu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai kebutuhan halaman, aturan AI agent, dan integrasi tool.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Cisauk wants to be easily found by local residents on mobile, automate pricing chat replies, or organize order and rental records.',
      mulaiDari:
        'A free 30-minute audit to inspect your current webpages or daily workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on pages, AI agent rules, and tool integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Cisauk butuh ini',
    whyNeedHeadingEn: 'Why businesses in Cisauk need this',
    whyNeedParagraphsId: [
      'Cisauk di Kabupaten Tangerang berbatasan langsung dengan BSD City dan Serpong, dengan pertumbuhan kawasan permukiman baru serta usaha harian warga. Di wilayah ini, umumnya berjalan usaha seperti kos-kosan, toko online, kafe dan restoran, kontraktor renovasi rumah, bimbel, serta klinik.',
      'Warga yang baru menempati kawasan permukiman di Cisauk biasanya mencari layanan sekitar—mulai dari jasa pemasangan interior, tempat makan, hingga klinik dan tempat kursus—melalui pencarian Google di HP. Memiliki halaman web yang ringan dan mencantumkan rincian layanan serta kisaran harga secara jelas umumnya membuat usahamu lebih mudah dipilih.',
      'Di sisi operasional, pemilik usaha di Cisauk biasanya menangani chat pelanggan sekaligus mengawasi pengerjaan atau pengemasan barang. Menghubungkan AI agent WhatsApp, aplikasi pencatatan custom, atau otomasi workflow membantu menjaga kerapian catatan pesanan tanpa harus menyalin chat satu per satu.',
    ],
    whyNeedParagraphsEn: [
      'Cisauk in Tangerang Regency borders directly with BSD City and Serpong, featuring growing residential neighborhoods and daily local commerce. Businesses operating here commonly include boarding houses, online shops, cafes and restaurants, home renovation contractors, tutoring centers, and clinics.',
      'Residents moving into Cisauk neighborhoods usually search for nearby services—from interior contractors and eateries to clinics and tutoring—on Google from their phones. Having a lightweight webpage presenting clear service details and starting prices makes your business much easier to choose.',
      'On the operational side, business owners in Cisauk typically handle customer chats while supervising field work or packing orders. Connecting a WhatsApp AI agent, custom tracking software, or workflow automation keeps order logs tidy without manual copy-pasting.',
    ],
    typicalBusinessMixId: [
      'Kontraktor renovasi rumah, bengkel kanopi/interior, dan penyedia jasa di Cisauk',
      'Kos-kosan dan properti sewa di sekitar kawasan permukiman Cisauk',
      'Toko online, kafe dan restoran, serta usaha kuliner harian',
      'Klinik kesehatan keluarga dan bimbel bagi warga Cisauk',
    ],
    typicalBusinessMixEn: [
      'Home renovation contractors, canopy/interior workshops, and service providers in Cisauk',
      'Boarding houses and rental properties around Cisauk residential neighborhoods',
      'Online shops, cafes and restaurants, and daily food businesses',
      'Family health clinics and tutoring centers serving Cisauk residents',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website paket renovasi dan pengajuan survei untuk kontraktor perumahan',
        titleEn: 'Renovation package and survey request website for a residential contractor',
        businessTypeId: 'Kontraktor di Cisauk',
        businessTypeEn: 'Contractor in Cisauk',
        narrativeId:
          'Pemilik rumah baru di Cisauk biasanya mencari informasi paket pembuatan dapur, kanopi, atau taman beserta estimasi biaya awal. Kami merancang halaman web yang cepat dibuka di HP dengan penjelasan tahapan kerja dan tombol WhatsApp untuk jadwal ukur lokasi.',
        narrativeEn:
          'New homeowners in Cisauk usually search for kitchen, canopy, or garden packages with initial cost estimates. We build a fast mobile webpage outlining work stages and a direct WhatsApp button to book an on-site measurement.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Penjawab ketersediaan kamar kos dan pencatatan jadwal kunjungan',
        titleEn: 'Boarding room availability responder and viewing scheduler',
        businessTypeId: 'Kos-kosan di Cisauk',
        businessTypeEn: 'Boarding house in Cisauk',
        narrativeId:
          'Calon penyewa kos sering mengirim pesan di malam hari untuk menanyakan sisa kamar kosong dan fasilitasnya. AI agent WhatsApp menjawab rincian kamar sesuai tabel terkini, menjadwalkan waktu survei lokasi, dan mengirim ringkasan data calon penyewa ke pemilik.',
        narrativeEn:
          'Prospective tenants often message late at night asking about open rooms and facilities. A WhatsApp AI agent answers room details from the live sheet, schedules a viewing time, and sends a tenant summary to the owner.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pencatatan pesanan harian dan stok kemasan untuk toko online',
        titleEn: 'Daily order and packaging stock tracker for an online shop',
        businessTypeId: 'Toko online di Cisauk',
        businessTypeEn: 'Online shop in Cisauk',
        narrativeId:
          'Usaha toko online rumahan sering kehabisan stok barang atau bahan kemas karena belum ada pencatatan keluar-masuk yang terpusat. Kami membangun aplikasi web ringan agar tim pengemasan memotong stok langsung dari HP setiap kali pesanan dikirim.',
        narrativeEn:
          'Home-based online shops often run out of product or packaging stock unexpectedly without centralized tracking. We build a lightweight web app so packing staff deduct stock directly from their phones whenever orders ship.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pengingat jadwal servis berkala dan rekap teknisi lapangan',
        titleEn: 'Automated periodic maintenance reminders and field technician logs',
        businessTypeId: 'Jasa servis dan perawatan rumah di Cisauk',
        businessTypeEn: 'Home maintenance service in Cisauk',
        narrativeId:
          'Pelanggan servis AC atau perawatan rumah biasanya lupa menjadwalkan pencucian rutin tiga bulanan. Otomasi workflow membaca tanggal servis terakhir dari spreadsheet dan mengirimkan pesan pengingat jadwal perawatan via WhatsApp secara otomatis.',
        narrativeEn:
          'Home maintenance and AC cleaning customers usually forget to book quarterly servicing. Workflow automation reads the last service date from the spreadsheet and sends a WhatsApp maintenance reminder automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Cisauk',
    howWeWorkHeadingEn: 'How we work with clients in Cisauk',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan—sangat dekat dengan wilayah Cisauk. Koordinasi harian seperti diskusi alur kerja, pengiriman materi, dan peninjauan prototipe dilakukan secara online lewat WhatsApp dan video call.',
      'Apabila diperlukan pertemuan tatap muka di area Tangerang Selatan, jadwal dapat disepakati bersama. Seluruh pengerjaan ditangani langsung oleh Chesta Azka dan Zeeshan melalui empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang—right next to Cisauk. Daily coordination such as workflow discussions, material handoffs, and prototype reviews takes place online via WhatsApp and video call.',
      'Whenever an in-person meeting in the South Tangerang area is helpful, sessions can be scheduled by agreement. All work is handled directly by Chesta Azka and Zeeshan through four clear steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau proses operasional usahamu di Cisauk sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Cisauk before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screens before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat kamu pilih sesuai kebutuhan usahamu di Cisauk:',
    servicesIntroEn:
      'Four services you can choose based on your business needs in Cisauk:',
    faqsId: [
      {
        question: 'Berapa biaya pembuatan website untuk usaha di Cisauk?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah CHESTAADOTCOM memiliki kantor di Cisauk?',
        answer:
          'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Kami melayani pelaku usaha di Cisauk secara online lewat WhatsApp dan video call, serta dapat bertemu tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Apakah website yang dibuat sudah ramah tampilan HP?',
        answer:
          'Ya, setiap halaman kami rancang agar ringan dan nyaman dibaca di layar HP karena mayoritas pelanggan lokal mencari layanan langsung dari ponsel.',
      },
    ],
    faqsEn: [
      {
        question: 'How much does website development cost for a business in Cisauk?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Does CHESTAADOTCOM have an office in Cisauk?',
        answer:
          'CHESTAADOTCOM is based in BSD, South Tangerang. We serve business owners in Cisauk online via WhatsApp and video call, and can meet in person in the South Tangerang area by agreement.',
      },
      {
        question: 'Are the websites built to be fast and mobile-friendly?',
        answer:
          'Yes, every page is engineered to load quickly and read cleanly on mobile screens since most local customers search directly from their phones.',
      },
    ],
    ctaHeadingId: 'Mulai dengan audit gratis 30 menit untuk usahamu di Cisauk',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Cisauk',
    ctaBodyId:
      'Kirim pesan WhatsApp untuk mendiskusikan kebutuhan website, AI agent, atau sistem kerja usahamu di Cisauk.',
    ctaBodyEn:
      'Send a WhatsApp message to discuss your website, AI agent, or operational system needs in Cisauk.',
  },

  // 18. PAGEDANGAN (Kabupaten Tangerang, Wave 3 Scheduled)
  {
    slug: 'pagedangan',
    nameId: 'Pagedangan',
    nameEn: 'Pagedangan',
    regionGroup: 'kabupaten-tangerang',
    regionLabelId: 'Kecamatan Pagedangan, Kabupaten Tangerang',
    regionLabelEn: 'Pagedangan District, Tangerang Regency',
    schemaType: 'AdministrativeArea',
    wave: 3,
    publishAt: '2026-11-12',
    hasServiceAreaPages: false,
    nearbySlugs: ['bsd-city', 'gading-serpong', 'serpong', 'tangerang-selatan'],
    factsSummaryId:
      'Wilayah di Kabupaten Tangerang di sekitar kawasan BSD City dan Gading Serpong.',
    factsSummaryEn:
      'An area in Tangerang Regency around BSD City and Gading Serpong.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Pagedangan, Kabupaten Tangerang. Mulai Rp1.200.000, audit gratis.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Pagedangan, Tangerang Regency. From IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di Pagedangan, Kabupaten Tangerang. Cocok bagi kafe dan restoran, properti, klinik, kontraktor, kos-kosan, maupun jasa profesional. Website mulai Rp1.200.000, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Pagedangan, Tangerang Regency. Built for cafes and restaurants, property, clinics, contractors, boarding houses, and professional services. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Pagedangan ingin punya halaman web yang cepat dibuka di HP, menangani reservasi pelanggan lewat WhatsApp secara terstruktur, atau merapikan pencatatan tim.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau proses operasional bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, aturan AI agent, dan integrasi sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Pagedangan wants a fast mobile webpage, structured WhatsApp reservation handling, or organized team record-keeping.',
      mulaiDari:
        'A free 30-minute audit to inspect your current webpages or operational workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, AI agent rules, and system integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Pagedangan butuh ini',
    whyNeedHeadingEn: 'Why businesses in Pagedangan need this',
    whyNeedParagraphsId: [
      'Pagedangan di Kabupaten Tangerang mencakup kawasan permukiman, koridor komersial, serta aktivitas usaha yang berdekatan langsung dengan BSD City dan Gading Serpong. Di wilayah ini, umumnya beroperasi beragam usaha seperti kafe dan restoran, agen properti, klinik, kontraktor, kos-kosan, bimbel, serta toko online.',
      'Pengunjung maupun warga di Pagedangan biasanya mencari informasi tempat makan, hunian, atau jasa melalui layar HP sebelum berkunjung. Halaman web yang ringan dan menyajikan rincian layanan, kisaran harga awal, serta petunjuk lokasi yang jelas umumnya membantu calon pelanggan langsung menghubungi lewat WhatsApp.',
      'Di sisi operasional, lonjakan chat pertanyaan jadwal atau ketersediaan tempat pada jam sibuk biasanya membuat staf kewalahan apabila semua dicatat manual. Menghubungkan AI agent WhatsApp, software pencatatan custom, atau otomasi workflow membantu menjaga ketertiban jadwal dan rekap harian.',
    ],
    whyNeedParagraphsEn: [
      'Pagedangan in Tangerang Regency encompasses residential neighborhoods, commercial corridors, and business activity directly adjacent to BSD City and Gading Serpong. Across this area, businesses commonly include cafes and restaurants, property agencies, clinics, contractors, boarding houses, tutoring centers, and online shops.',
      'Visitors and residents in Pagedangan typically search for dining spots, housing, or services on their phones before visiting. A lightweight webpage presenting clear service details, starting prices, and location directions helps prospective customers reach out right away on WhatsApp.',
      'On the operational side, spikes in schedule or availability inquiries during peak hours often overwhelm staff logging everything by hand. Connecting a WhatsApp AI agent, custom tracking software, or workflow automation keeps schedules and daily summaries organized.',
    ],
    typicalBusinessMixId: [
      'Kafe, restoran, dan ruang acara di koridor komersial Pagedangan',
      'Agen properti, pengelola kos-kosan, dan kontraktor interior di sekitar kawasan permukiman',
      'Klinik kesehatan, perawatan, dan layanan kebugaran',
      'Toko online, bimbel, dan jasa profesional di wilayah Pagedangan',
    ],
    typicalBusinessMixEn: [
      'Cafes, restaurants, and event venues along Pagedangan commercial corridors',
      'Property agencies, boarding house operators, and interior contractors around residential areas',
      'Health, care, and wellness clinics',
      'Online shops, tutoring centers, and professional services in Pagedangan',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website katalog tipe unit dan penjadwalan survei untuk pemasaran properti',
        titleEn: 'Unit catalog and viewing scheduler website for property marketing',
        businessTypeId: 'Properti di Pagedangan',
        businessTypeEn: 'Property agency in Pagedangan',
        narrativeId:
          'Calon pembeli atau penyewa properti di Pagedangan biasanya ingin memeriksa spesifikasi unit, kisaran harga, dan simulasi pembayaran di HP sebelum mengatur jadwal kunjungan. Kami merancang halaman web yang ringan dan langsung mengarahkan prospek ke WhatsApp.',
        narrativeEn:
          'Prospective property buyers or renters in Pagedangan usually want to review unit specs, price ranges, and payment outlines on mobile before booking a visit. We build a fast webpage that routes qualified prospects directly to WhatsApp.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Pencatatan reservasi tempat dan paket acara untuk kafe & restoran',
        titleEn: 'Table reservation and event package booking for a cafe & restaurant',
        businessTypeId: 'Kafe dan restoran di Pagedangan',
        businessTypeEn: 'Cafe and restaurant in Pagedangan',
        narrativeId:
          'Tamu sering menanyakan ketersediaan meja untuk akhir pekan atau paket acara komunitas di luar jam kerja admin. AI agent menjawab rincian paket, memeriksa jadwal reservasi, mencatat pemesanan meja, dan menyerahkan permintaan khusus ke tim restoran.',
        narrativeEn:
          'Guests frequently ask about weekend table availability or community event packages after hours. An AI agent answers package details, checks the reservation calendar, logs bookings, and hands special requests over to restaurant staff.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pemantauan inventaris peralatan dan jadwal kru acara',
        titleEn: 'Equipment inventory and crew scheduling app for event contractors',
        businessTypeId: 'Kontraktor dan vendor acara di Pagedangan',
        businessTypeEn: 'Event contractor and vendor in Pagedangan',
        narrativeId:
          'Vendor perlengkapan dan kontraktor pameran sering kehilangan jejak barang keluar-masuk saat menangani beberapa jadwal sekaligus. Kami membangun aplikasi web untuk mencatat daftar barang yang dibawa ke lokasi, pemeriksaan saat kembali, dan jadwal tugas kru.',
        narrativeEn:
          'Equipment vendors and exhibition contractors easily lose track of gear when handling multiple events at once. We build a web app to log outbound equipment lists, return inspections, and crew shift schedules.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pengingat kedatangan pasien dan rekap harian klinik',
        titleEn: 'Automated patient arrival reminders and daily clinic summaries',
        businessTypeId: 'Klinik di Pagedangan',
        businessTypeEn: 'Clinic in Pagedangan',
        narrativeId:
          'Pasien yang sudah memesan jadwal pemeriksaan terkadang lupa hadir karena tidak ada pengingat di hari H. Otomasi workflow membaca daftar jadwal harian dari kalender klinik lalu mengirimkan pesan pengingat WhatsApp otomatis beserta tautan konfirmasi kehadiran.',
        narrativeEn:
          'Patients who book appointments in advance sometimes miss their slot without a same-day reminder. Workflow automation reads the daily schedule from the clinic calendar and sends automated WhatsApp reminders with a confirmation prompt.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Pagedangan',
    howWeWorkHeadingEn: 'How we work with clients in Pagedangan',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan—berbatasan langsung dengan Pagedangan. Koordinasi harian seperti diskusi alur kerja, pengiriman materi, dan peninjauan prototipe dilakukan secara online lewat WhatsApp dan video call.',
      'Pertemuan tatap muka di area Tangerang Selatan juga dapat dijadwalkan sesuai kesepakatan bersama. Seluruh pengerjaan ditangani langsung bersama Chesta Azka dan Zeeshan melalui empat langkah kerja.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang—directly bordering Pagedangan. Daily coordination such as workflow discussions, material handoffs, and prototype reviews runs online via WhatsApp and video call.',
      'In-person meetings in the South Tangerang area can also be scheduled by agreement. All work is handled directly with Chesta Azka and Zeeshan across four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan website atau alur operasional bisnismu di Pagedangan sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Pagedangan before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screens before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat dipilih untuk mendukung bisnismu di Pagedangan:',
    servicesIntroEn:
      'Four services you can choose to support your business in Pagedangan:',
    faqsId: [
      {
        question: 'Apakah tim CHESTAADOTCOM dekat dengan wilayah Pagedangan?',
        answer:
          'Ya, kami berbasis di BSD, Tangerang Selatan yang bersebelahan langsung dengan Pagedangan. Koordinasi harian berjalan online via WhatsApp dan video call, dan pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan.',
      },
      {
        question: 'Berapa biaya awal pembuatan website untuk bisnis di Pagedangan?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Siapa yang memiliki domain dan data pelanggan setelah sistem rilis?',
        answer:
          'Domain, akun hosting, dan seluruh data bisnismu sepenuhnya terdaftar atas namamu sendiri. Akses kami dicabut saat proyek atau masa rawat berakhir.',
      },
    ],
    faqsEn: [
      {
        question: 'Is the CHESTAADOTCOM team located near Pagedangan?',
        answer:
          'Yes, we are based in BSD, South Tangerang, directly adjacent to Pagedangan. Daily coordination runs online via WhatsApp and video call, and in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
      {
        question: 'What is the starting cost for website development in Pagedangan?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Who owns the domain and customer data after launch?',
        answer:
          'Your domain, hosting accounts, and business data are registered directly under your own name. Our access is revoked when the project or maintenance term ends.',
      },
    ],
    ctaHeadingId: 'Mulai dengan audit gratis 30 menit untuk bisnismu di Pagedangan',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Pagedangan',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk memetakan kebutuhan website, AI agent, atau sistem kerja usahamu di Pagedangan.',
    ctaBodyEn:
      'Contact us on WhatsApp to map out your website, AI agent, or operational system needs in Pagedangan.',
  },

  // 19. CILEDUG (Kota Tangerang, Wave 3 Scheduled)
  {
    slug: 'ciledug',
    nameId: 'Ciledug',
    nameEn: 'Ciledug',
    regionGroup: 'kota-tangerang',
    regionLabelId: 'Kecamatan Ciledug, Kota Tangerang',
    regionLabelEn: 'Ciledug District, Tangerang City',
    schemaType: 'AdministrativeArea',
    wave: 3,
    publishAt: '2026-11-12',
    hasServiceAreaPages: false,
    nearbySlugs: ['pondok-aren', 'bintaro', 'alam-sutera', 'tangerang-selatan'],
    factsSummaryId:
      'Wilayah di Kota Tangerang yang berbatasan dekat dengan Pondok Aren, Tangerang Selatan.',
    factsSummaryEn:
      'An area in Tangerang City bordering closely with Pondok Aren, South Tangerang.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Ciledug, Kota Tangerang. Mulai Rp1.200.000 dengan audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Ciledug, Tangerang City. From IDR 1.2M with a free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk pelaku usaha di Ciledug, Kota Tangerang. Cocok bagi toko online, klinik, kafe dan restoran, bimbel, kontraktor, maupun jasa profesional. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for business owners in Ciledug, Tangerang City. Built for online shops, clinics, cafes and restaurants, tutoring centers, contractors, and professional services. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Ciledug ingin punya halaman katalog atau layanan yang cepat dibuka di HP, merapikan balasan chat pesanan grosir maupun eceran, atau menertibkan stok barang.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk membedah kebutuhan website atau alur operasional usahamu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, aturan AI agent, dan integrasi tool.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Ciledug wants a fast mobile catalog or service webpage, structured wholesale and retail chat handling, or organized inventory records.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to review your website or operational workflow needs.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on pages, AI agent rules, and tool integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Ciledug butuh ini',
    whyNeedHeadingEn: 'Why businesses in Ciledug need this',
    whyNeedParagraphsId: [
      'Ciledug di Kota Tangerang berbatasan langsung dengan Pondok Aren, Tangerang Selatan, serta mencakup kawasan permukiman dan koridor perdagangan yang ramai. Di wilayah ini, umumnya berjalan usaha seperti toko online dan pedagang grosir, klinik kesehatan, kafe dan restoran, bimbel, kos-kosan, serta kontraktor.',
      'Pelanggan maupun reseller yang mencari produk atau layanan di Ciledug biasanya mengakses informasi dari layar HP dan ingin langsung mengetahui ketersediaan barang, harga, serta cara pemesanan. Halaman web yang ringan dan terstruktur memudahkan calon pembeli melihat penawaran tanpa harus menunggu admin membalas satu per satu.',
      'Pada saat pesanan sedang ramai, admin toko online atau klinik di Ciledug biasanya kewalahan menyalin data pesanan dari chat WhatsApp ke buku atau spreadsheet pengemasan. Menggunakan AI agent WhatsApp, aplikasi pencatatan custom, atau otomasi workflow membantu mempercepat layanan sekaligus menekan salah catat.',
    ],
    whyNeedParagraphsEn: [
      'Ciledug in Tangerang City borders directly with Pondok Aren, South Tangerang, encompassing dense residential neighborhoods and active commercial corridors. Businesses operating here commonly include online shops and wholesale traders, health clinics, cafes and restaurants, tutoring centers, boarding houses, and contractors.',
      'Customers and resellers looking for products or services in Ciledug typically browse on their phones and want immediate clarity on availability, pricing, and ordering steps. A lightweight, structured webpage lets prospective buyers review your offer without waiting for manual replies.',
      'During busy order periods, online shop or clinic admins in Ciledug often struggle to copy order details from WhatsApp chats into packing sheets. Deploying a WhatsApp AI agent, custom tracking software, or workflow automation speeds up service while reducing data-entry errors.',
    ],
    typicalBusinessMixId: [
      'Toko online, usaha konveksi/grosir, dan reseller di wilayah Ciledug',
      'Klinik kesehatan keluarga, praktik dokter gigi, dan layanan perawatan',
      'Kafe, restoran, dan usaha kuliner harian di koridor Ciledug',
      'Bimbel, tempat kursus, kos-kosan, dan kontraktor renovasi rumah',
    ],
    typicalBusinessMixEn: [
      'Online shops, apparel/wholesale traders, and resellers in Ciledug',
      'Family health clinics, dental practices, and care services',
      'Cafes, restaurants, and daily food businesses along Ciledug corridors',
      'Tutoring centers, courses, boarding houses, and home renovation contractors',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website katalog produk dan ketentuan reseller untuk toko online',
        titleEn: 'Product catalog and reseller terms website for an online shop',
        businessTypeId: 'Toko online di Ciledug',
        businessTypeEn: 'Online shop in Ciledug',
        narrativeId:
          'Calon pembeli dan reseller sering menanyakan daftar seri produk, tabel ukuran, serta syarat pembelian minimal lewat chat. Kami membangun website yang cepat dibuka di HP agar pengunjung dapat memilih produk dan langsung mengirim daftar pesanan ke WhatsApp.',
        narrativeEn:
          'Prospective buyers and resellers frequently ask for product series, size charts, and minimum order rules in chat. We build a fast mobile website so visitors can select items and send a formatted order list straight to WhatsApp.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Pengecekan stok otomatis dan rekap pesanan masuk di WhatsApp',
        titleEn: 'Automated stock checks and incoming order logging on WhatsApp',
        businessTypeId: 'Toko online dan grosir di Ciledug',
        businessTypeEn: 'Online shop and wholesaler in Ciledug',
        narrativeId:
          'Ketika ratusan chat masuk menanyakan stok warna atau ukuran tertentu, admin sering terlambat membalas. AI agent membaca tabel stok terkini, menjawab pertanyaan pembeli secara instan, mencatat pesanan ke spreadsheet, dan meneruskan konfirmasi bayar ke admin.',
        narrativeEn:
          'When dozens of chats arrive asking about specific colors or sizes, manual replies slow down. An AI agent reads the live stock sheet, answers buyer questions instantly, logs orders into the spreadsheet, and forwards payment proofs to the admin.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Sistem pembukuan barang gudang dan pelacakan barang retur',
        titleEn: 'Warehouse inventory bookkeeping and return tracking system',
        businessTypeId: 'Gudang toko online di Ciledug',
        businessTypeEn: 'Online shop warehouse in Ciledug',
        narrativeId:
          'Selisih antara stok di catatan dan stok fisik di rak sering terjadi akibat barang keluar dan retur tidak tercatat pada hari yang sama. Kami merancang aplikasi web ringan agar staf gudang mencatat mutasi barang dan barang gagal langsung dari ponsel.',
        narrativeEn:
          'Discrepancies between recorded and physical shelf stock often happen when outbound items and returns are not logged the same day. We build a lightweight web app so warehouse staff log stock movements and defective items from their phones.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi jadwal periksa pasien dan pengingat kontrol ulang klinik',
        titleEn: 'Automated patient appointment scheduling and follow-up reminders',
        businessTypeId: 'Klinik di Ciledug',
        businessTypeEn: 'Clinic in Ciledug',
        narrativeId:
          'Resepsionis klinik biasanya harus mencatat pendaftaran pasien dari WhatsApp lalu mengingatkan jadwal kontrol satu per satu. Otomasi workflow menyinkronkan jadwal pasien ke kalender klinik dan mengirim pesan pengingat WhatsApp H-1 secara otomatis.',
        narrativeEn:
          'Clinic receptionists usually copy WhatsApp patient bookings manually and send follow-up reminders one by one. Workflow automation syncs patient bookings to the clinic calendar and sends automated day-before WhatsApp reminders.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Ciledug',
    howWeWorkHeadingEn: 'How we work with clients in Ciledug',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Seluruh koordinasi harian bersama pelaku usaha di Ciledug dijalankan secara online melalui WhatsApp dan video call agar hemat waktu.',
      'Apabila kamu ingin berdiskusi tatap muka, pertemuan di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan bersama. Kami menerapkan empat tahapan kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. All daily coordination with business owners in Ciledug runs online via WhatsApp and video call to save travel time.',
      'If you prefer an in-person discussion, meetings in the South Tangerang area can be scheduled by agreement. We follow four structured stages.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan website atau kendala pencatatan usahamu di Ciledug sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan balasan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or record-keeping bottlenecks in Ciledug before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent reply rules, or app screens before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat dipilih untuk mendukung operasional usahamu di Ciledug:',
    servicesIntroEn:
      'Four services you can choose to support your business operations in Ciledug:',
    faqsId: [
      {
        question: 'Apakah CHESTAADOTCOM melayani bisnis di Ciledug meskipun berbasis di BSD?',
        answer:
          'Ya. Dari basis kami di BSD, Tangerang Selatan, kami melayani pelaku usaha di Ciledug secara online lewat WhatsApp dan video call, serta dapat bertemu tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Berapa biaya pembuatan website untuk toko online atau klinik di Ciledug?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah data pelanggan dan stok barang saya tetap aman?',
        answer:
          'Ya, seluruh data disimpan di akun atau database milikmu sendiri. Kami hanya menggunakan akses selama tahap pembangunan dan perawatan, lalu mencabut akses tersebut saat kontrak berakhir.',
      },
    ],
    faqsEn: [
      {
        question: 'Does CHESTAADOTCOM serve businesses in Ciledug while based in BSD?',
        answer:
          'Yes. From our base in BSD, South Tangerang, we serve business owners in Ciledug online via WhatsApp and video call, and can meet in person in the South Tangerang area by agreement.',
      },
      {
        question: 'How much does a website cost for an online shop or clinic in Ciledug?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Do my customer and inventory records remain private and under my control?',
        answer:
          'Yes, all data is stored in accounts or databases registered under your own name. We only use access during build and maintenance, and revoke it when the contract ends.',
      },
    ],
    ctaHeadingId: 'Mulai dari audit gratis 30 menit untuk usahamu di Ciledug',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Ciledug',
    ctaBodyId:
      'Kirim pesan WhatsApp untuk menceritakan kebutuhan website, AI agent, atau sistem kerja usahamu di Ciledug.',
    ctaBodyEn:
      'Send a WhatsApp message to share your website, AI agent, or operational system needs in Ciledug.',
  },

  // 20. KARANG TENGAH (Kota Tangerang, Wave 3 Scheduled)
  {
    slug: 'karang-tengah',
    nameId: 'Karang Tengah',
    nameEn: 'Karang Tengah',
    regionGroup: 'kota-tangerang',
    regionLabelId: 'Kecamatan Karang Tengah, Kota Tangerang',
    regionLabelEn: 'Karang Tengah District, Tangerang City',
    schemaType: 'AdministrativeArea',
    wave: 3,
    publishAt: '2026-11-12',
    hasServiceAreaPages: false,
    nearbySlugs: ['alam-sutera', 'pondok-aren', 'bintaro', 'tangerang-selatan'],
    factsSummaryId:
      'Wilayah di Kota Tangerang dengan kawasan permukiman dan usaha harian.',
    factsSummaryEn:
      'An area in Tangerang City with residential neighborhoods and daily businesses.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Karang Tengah, Kota Tangerang. Mulai Rp1.200.000, audit gratis.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Karang Tengah, Tangerang City. From IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk pelaku usaha di Karang Tengah, Kota Tangerang. Cocok bagi klinik, kafe dan restoran, toko online, kontraktor, bimbel, maupun jasa profesional. Website mulai Rp1.200.000, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for business owners in Karang Tengah, Tangerang City. Built for clinics, cafes and restaurants, online shops, contractors, tutoring centers, and professional services. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Karang Tengah ingin memiliki halaman web yang jelas di layar HP, merapikan balasan chat pelanggan di luar jam kerja, atau menyatukan catatan pesanan harian.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk memeriksa halaman web atau alur kerja timmu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai jumlah halaman, aturan AI agent, dan integrasi tool.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Karang Tengah wants a clear mobile webpage, automated after-hours customer chat replies, or unified daily order records.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to review your website or team workflow before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on pages, AI agent rules, and tool integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Karang Tengah butuh ini',
    whyNeedHeadingEn: 'Why businesses in Karang Tengah need this',
    whyNeedParagraphsId: [
      'Karang Tengah di Kota Tangerang mencakup kawasan permukiman keluarga dan koridor komersial yang melayani aktivitas harian warga. Di wilayah ini, umumnya beroperasi beragam usaha seperti klinik kesehatan, kafe dan restoran, toko online, kontraktor renovasi, bimbel, serta jasa profesional.',
      'Warga di Karang Tengah biasanya mencari informasi jam praktik klinik, daftar layanan kontraktor, atau menu kuliner melalui ponsel sebelum menghubungi lewat WhatsApp. Halaman web yang ringan dan langsung menjawab pertanyaan dasar tersebut umumnya membuat calon pelanggan lebih yakin untuk memesan.',
      'Di sisi operasional, banyak usaha di Karang Tengah biasanya masih mencatat jadwal janji temu dan pesanan di grup chat atau buku tulis. Menerapkan AI agent WhatsApp, aplikasi pencatatan custom, atau otomasi workflow membantu menjaga kerapian data tanpa membebani staf dengan pekerjaan berulang.',
    ],
    whyNeedParagraphsEn: [
      'Karang Tengah in Tangerang City encompasses family residential neighborhoods and commercial corridors serving daily local needs. Across this area, businesses commonly include health clinics, cafes and restaurants, online shops, renovation contractors, tutoring centers, and professional services.',
      'Residents in Karang Tengah typically look up clinic hours, contractor service lists, or food menus on their phones before messaging on WhatsApp. A lightweight webpage that answers those baseline questions right away helps prospective customers book with confidence.',
      'On the operational side, many businesses in Karang Tengah still record appointments and orders in group chats or notebooks. Deploying a WhatsApp AI agent, custom tracking software, or workflow automation keeps records accurate without burdening staff with repetitive manual entry.',
    ],
    typicalBusinessMixId: [
      'Klinik kesehatan, praktik dokter, dan perawatan di Karang Tengah',
      'Kafe, restoran, dan katering harian di kawasan permukiman serta koridor komersial',
      'Toko online, kontraktor renovasi rumah, dan penyedia jasa panggilan',
      'Bimbel, kursus, dan jasa profesional yang melayani warga Karang Tengah',
    ],
    typicalBusinessMixEn: [
      'Health clinics, medical practices, and care services in Karang Tengah',
      'Cafes, restaurants, and daily catering across residential areas and commercial corridors',
      'Online shops, home renovation contractors, and on-call repair services',
      'Tutoring centers, courses, and professional services serving Karang Tengah residents',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website informasi layanan dan jadwal praktik untuk klinik keluarga',
        titleEn: 'Service guide and practice schedule website for a family clinic',
        businessTypeId: 'Klinik di Karang Tengah',
        businessTypeEn: 'Clinic in Karang Tengah',
        narrativeId:
          'Warga sekitar biasanya ingin mengecek jam praktik dokter, jenis pemeriksaan yang tersedia, dan kisaran biaya sebelum datang. Kami merancang halaman web statis yang cepat dibuka di HP dengan tombol pendaftaran WhatsApp langsung per layanan.',
        narrativeEn:
          'Local residents usually want to check doctor hours, available examinations, and fee ranges before visiting. We build a fast static mobile webpage with direct WhatsApp registration buttons per service.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp untuk pemesanan katering acara dan cek jadwal dapur',
        titleEn: 'WhatsApp assistant for event catering orders and kitchen slot checks',
        businessTypeId: 'Kafe dan katering di Karang Tengah',
        businessTypeEn: 'Cafe and catering business in Karang Tengah',
        narrativeId:
          'Pelanggan yang ingin memesan katering akhir pekan sering bertanya soal pilihan menu dan batas minimal porsi di malam hari. AI agent menjawab rincian paket, memeriksa kuota produksi tanggal tersebut di tabel, dan mencatat pesanan awal secara otomatis.',
        narrativeEn:
          'Customers planning weekend catering orders often ask about menu options and minimum portion rules at night. An AI agent answers package details, checks production capacity on the date sheet, and logs initial orders automatically.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pemantauan jadwal tukang dan progres pekerjaan kontraktor',
        titleEn: 'Crew schedule and job progress tracker for a contractor',
        businessTypeId: 'Kontraktor di Karang Tengah',
        businessTypeEn: 'Contractor in Karang Tengah',
        narrativeId:
          'Mengatur penugasan tukang di beberapa lokasi renovasi sekaligus sering membingungkan jika hanya mengandalkan telepon dan chat. Kami membangun web app sederhana agar mandor melaporkan progres harian dan pemilik memantau jadwal kerja tiap tim.',
        narrativeEn:
          'Coordinating crews across multiple renovation sites at once gets confusing when relying only on calls and chats. We build a clean web app so site leads report daily progress and owners monitor each crew’s schedule.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi rekap pesanan masuk dan pengingat pembayaran toko online',
        titleEn: 'Automated incoming order logging and payment reminders for an online shop',
        businessTypeId: 'Toko online di Karang Tengah',
        businessTypeEn: 'Online shop in Karang Tengah',
        narrativeId:
          'Sebagian pembeli yang sudah memesan barang lewat chat terkadang lupa menyelesaikan pembayaran sehingga stok tertahan. Otomasi workflow mencatat pesanan baru, mengirimkan satu kali pengingat pembayaran sopan via WhatsApp, dan membebaskan stok jika batal.',
        narrativeEn:
          'Some buyers who place orders via chat forget to complete payment, holding up stock. Workflow automation logs new orders, sends a polite one-time WhatsApp payment reminder, and releases reserved stock if canceled.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Karang Tengah',
    howWeWorkHeadingEn: 'How we work with clients in Karang Tengah',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi pengerjaan proyek bersama pelaku usaha di Karang Tengah dilakukan secara online lewat WhatsApp dan video call.',
      'Jika kamu membutuhkan diskusi tatap muka, pertemuan di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan bersama. Kami menjalankan empat tahapan kerja berikut bersama Chesta Azka dan Zeeshan.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Project coordination with business owners in Karang Tengah runs online via WhatsApp and video call.',
      'If you prefer an in-person discussion, meetings in the South Tangerang area can be scheduled by agreement. We follow four structured stages with Chesta Azka and Zeeshan.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau alur operasional usahamu di Karang Tengah sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Karang Tengah before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screens before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang dapat kamu pilih untuk mendukung usahamu di Karang Tengah:',
    servicesIntroEn:
      'Four core services you can choose to support your business in Karang Tengah:',
    faqsId: [
      {
        question: 'Berapa biaya awal pembuatan website untuk usaha di Karang Tengah?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah koordinasi pengerjaan bisa dilakukan sepenuhnya secara online?',
        answer:
          'Bisa. Seluruh proses mulai dari audit gratis, pengiriman materi, hingga rilis dapat dilakukan secara online lewat WhatsApp dan video call, atau tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Apakah domain website didaftarkan atas nama bisnis saya sendiri?',
        answer:
          'Ya, domain dan hosting didaftarkan langsung atas namamu sendiri sehingga sepenuhnya menjadi milikmu.',
      },
    ],
    faqsEn: [
      {
        question: 'What is the starting cost for website development in Karang Tengah?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Can project coordination be handled completely online?',
        answer:
          'Yes. The entire process from the free audit and material handoff to launch can run online via WhatsApp and video call, or in person in the South Tangerang area by agreement.',
      },
      {
        question: 'Is the website domain registered under my own business name?',
        answer:
          'Yes, your domain and hosting are registered directly under your own name so they remain completely yours.',
      },
    ],
    ctaHeadingId: 'Jadwalkan audit gratis 30 menit untuk usahamu di Karang Tengah',
    ctaHeadingEn: 'Schedule a free 30-minute audit for your business in Karang Tengah',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk memetakan kebutuhan website, AI agent, atau otomasi kerja usahamu di Karang Tengah.',
    ctaBodyEn:
      'Contact us via WhatsApp to map out your website, AI agent, or workflow automation needs in Karang Tengah.',
  },

  // 21. KARAWACI (Kota Tangerang, Wave 3 Scheduled)
  {
    slug: 'karawaci',
    nameId: 'Karawaci',
    nameEn: 'Karawaci',
    regionGroup: 'kota-tangerang',
    regionLabelId: 'Karawaci, Kota Tangerang',
    regionLabelEn: 'Karawaci, Tangerang City',
    schemaType: 'AdministrativeArea',
    wave: 3,
    publishAt: '2026-11-12',
    hasServiceAreaPages: false,
    nearbySlugs: ['gading-serpong', 'alam-sutera', 'bsd-city', 'serpong'],
    factsSummaryId:
      'Wilayah di Kota Tangerang dengan kawasan permukiman dan koridor komersial.',
    factsSummaryEn:
      'An area in Tangerang City with residential neighborhoods and commercial corridors.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Karawaci, Kota Tangerang. Mulai Rp1.200.000 dengan audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Karawaci, Tangerang City. From IDR 1.2M with a free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk pelaku usaha di Karawaci, Kota Tangerang. Cocok bagi klinik, kafe dan restoran, kos-kosan, jasa profesional, properti, maupun toko online. Website mulai Rp1.200.000, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for business owners in Karawaci, Tangerang City. Built for clinics, cafes and restaurants, boarding houses, professional services, property, and online shops. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Karawaci membutuhkan halaman web yang cepat dibuka di HP, ingin mengotomasi penjadwalan janji temu atau sewa, atau merapikan pencatatan operasional.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk memeriksa halaman web dan alur kerja harianmu sebelum membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai kompleksitas fitur, jumlah tool, dan aturan bisnis.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Karawaci needs a fast mobile webpage, wants to automate appointment or rental scheduling, or needs structured operational records.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to inspect your webpages and daily workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on feature complexity, connected tools, and business rules.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Karawaci butuh ini',
    whyNeedHeadingEn: 'Why businesses in Karawaci need this',
    whyNeedParagraphsId: [
      'Karawaci di Kota Tangerang memadukan kawasan permukiman, kawasan perkantoran, dan koridor komersial yang aktif. Di wilayah ini, umumnya beroperasi beragam usaha seperti klinik kesehatan dan perawatan, kafe dan restoran, kos-kosan dan hunian sewa, jasa profesional, agen properti, bimbel, serta toko online.',
      'Calon pelanggan di Karawaci biasanya memeriksa ketersediaan layanan, daftar tarif, dan lokasi langsung dari HP sebelum mengirim pesan. Apabila halaman web sebuah usaha lambat dimuat atau tidak menyajikan informasi penawaran dengan jelas, pengunjung umumnya berpindah ke penyedia lain.',
      'Di sisi operasional, mengelola jadwal booking pasien, ketersediaan kamar sewa, atau pesanan harian lewat chat manual biasanya menyita banyak waktu admin. Menghubungkan AI agent WhatsApp, aplikasi pencatatan custom, atau otomasi workflow membantu tim melayani pelanggan lebih cepat dan tertata.',
    ],
    whyNeedParagraphsEn: [
      'Karawaci in Tangerang City combines residential neighborhoods, office districts, and active commercial corridors. Businesses operating here commonly include healthcare and aesthetic clinics, cafes and restaurants, boarding houses and rental units, professional services, property agencies, tutoring centers, and online shops.',
      'Prospective customers in Karawaci typically check service availability, pricing, and locations directly on their phones before messaging. When a business webpage loads slowly or fails to present its offer clearly, visitors usually move on to another option.',
      'On the operational side, managing patient appointments, rental unit availability, or daily orders through manual chat threads often consumes hours of admin time. Connecting a WhatsApp AI agent, custom tracking software, or workflow automation helps your team serve customers faster and more reliably.',
    ],
    typicalBusinessMixId: [
      'Klinik kesehatan, gigi, dan estetika di koridor komersial Karawaci',
      'Kos-kosan, hunian sewa, dan agen properti di sekitar kawasan permukiman Karawaci',
      'Kafe, restoran, dan usaha katering yang melayani warga serta pekerja kantor',
      'Jasa profesional, bimbel, kontraktor, dan toko online di wilayah Karawaci',
    ],
    typicalBusinessMixEn: [
      'Health, dental, and aesthetic clinics along Karawaci commercial corridors',
      'Boarding houses, rental units, and property agencies around Karawaci neighborhoods',
      'Cafes, restaurants, and catering businesses serving residents and office workers',
      'Professional services, tutoring centers, contractors, and online shops in Karawaci',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website informasi tipe kamar dan fasilitas untuk pengelola hunian sewa',
        titleEn: 'Room type and facility guide website for a rental accommodation operator',
        businessTypeId: 'Kos-kosan dan properti sewa di Karawaci',
        businessTypeEn: 'Boarding house and rental operator in Karawaci',
        narrativeId:
          'Calon penyewa di Karawaci biasanya ingin melihat foto unit yang rapi, daftar fasilitas, ketentuan sewa bulanan, dan titik lokasi sebelum menjadwalkan survei. Kami membangun halaman web yang ringan di HP dengan tombol WhatsApp untuk cek unit kosong.',
        narrativeEn:
          'Prospective tenants in Karawaci usually want to see clear unit photos, facility lists, monthly rental terms, and location details before booking a viewing. We build a fast mobile webpage with a direct WhatsApp availability button.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Penjadwalan konsultasi dan tindakan perawatan untuk klinik di Karawaci',
        titleEn: 'Consultation and treatment slot booking for a clinic in Karawaci',
        businessTypeId: 'Klinik di Karawaci',
        businessTypeEn: 'Clinic in Karawaci',
        narrativeId:
          'Pesan yang menanyakan slot dokter atau terapis sering masuk di malam hari. AI agent WhatsApp menjawab rincian layanan dan kisaran biaya, memeriksa kalender praktik klinik, mengunci jadwal pasien, serta menyerahkan pertanyaan khusus ke staf.',
        narrativeEn:
          'Messages asking for doctor or therapist slots frequently arrive in the evening. A WhatsApp AI agent answers service details and fee ranges, checks the clinic calendar, locks appointments, and hands specialized questions over to staff.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pengelolaan kontrak sewa, inventaris kamar, dan keluhan penghuni',
        titleEn: 'Lease contract, room inventory, and tenant request management app',
        businessTypeId: 'Pengelola kos-kosan dan properti di Karawaci',
        businessTypeEn: 'Boarding house and property manager in Karawaci',
        narrativeId:
          'Ketika mengelola puluhan unit sewa, catatan masa habis kontrak dan permintaan perbaikan AC atau air sering tercecer di chat. Kami merancang web app terpusat untuk memantau masa sewa tiap penghuni, inventaris per kamar, dan status tiket perbaikan.',
        narrativeEn:
          'When managing dozens of rental units, lease expiration dates and repair requests easily get lost in chat. We build a centralized web app to monitor tenant lease terms, room inventories, and maintenance ticket statuses.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi rekap pesanan langganan katering dan rute pengantaran harian',
        titleEn: 'Automated catering subscription summaries and daily delivery routing',
        businessTypeId: 'Kafe dan katering di Karawaci',
        businessTypeEn: 'Cafe and catering business in Karawaci',
        narrativeId:
          'Admin katering harian biasanya harus menyalin daftar alamat kirim dan catatan pantangan makan pelanggan setiap pagi ke lembar kurir. Otomasi workflow menyusun lembar produksi dapur dan daftar pengantaran per rute secara otomatis dari tabel langganan aktif.',
        narrativeEn:
          'Daily catering admins typically copy delivery addresses and dietary notes every morning into driver sheets. Workflow automation generates kitchen prep lists and route-sorted delivery sheets automatically from active subscriptions.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Karawaci',
    howWeWorkHeadingEn: 'How we work with clients in Karawaci',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi pengerjaan proyek bersama klien di Karawaci dilakukan secara online lewat WhatsApp dan video call agar efisien dan fleksibel.',
      'Apabila kamu ingin menjadwalkan pertemuan tatap muka di area Tangerang Selatan, jadwal dapat disepakati bersama. Kami menjalankan setiap proyek melalui empat langkah kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Project coordination with clients in Karawaci runs online via WhatsApp and video call for flexibility and efficiency.',
      'Whenever you want to schedule an in-person meeting in the South Tangerang area, sessions can be arranged by agreement. We run every project through four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan halaman web atau proses operasional bisnismu di Karawaci sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Karawaci before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screens before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat dipilih untuk mendukung bisnismu di wilayah Karawaci:',
    servicesIntroEn:
      'Four services you can choose to support your business in the Karawaci area:',
    faqsId: [
      {
        question: 'Dimana lokasi CHESTAADOTCOM dan bagaimana cara koordinasinya untuk klien di Karawaci?',
        answer:
          'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi harian berjalan online melalui WhatsApp dan video call, sementara pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan.',
      },
      {
        question: 'Berapa biaya pembuatan website untuk bisnis di Karawaci?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah saya mendapatkan rincian cakupan kerja secara tertulis sebelum membayar?',
        answer:
          'Ya, seusai sesi audit gratis 30 menit, kami mengirimkan ringkasan cakupan fitur, estimasi waktu, dan rincian biaya secara tertulis sebelum kamu membayar apa pun.',
      },
    ],
    faqsEn: [
      {
        question: 'Where is CHESTAADOTCOM located and how does coordination work for clients in Karawaci?',
        answer:
          'CHESTAADOTCOM is based in BSD, South Tangerang. Daily coordination runs online via WhatsApp and video call, while in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
      {
        question: 'How much does website development cost for a business in Karawaci?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'Do I receive a written scope breakdown before paying anything?',
        answer:
          'Yes, right after the free 30-minute audit session, we send a written summary of feature scope, timeline estimate, and exact pricing before you pay anything.',
      },
    ],
    ctaHeadingId: 'Mulai dengan audit gratis 30 menit untuk bisnismu di Karawaci',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Karawaci',
    ctaBodyId:
      'Ceritakan kebutuhan website, AI agent, atau sistem operasional bisnismu di Karawaci lewat WhatsApp bersama Chesta Azka dan Zeeshan.',
    ctaBodyEn:
      'Tell us about your website, AI agent, or operational software needs in Karawaci via WhatsApp with Chesta Azka and Zeeshan.',
  },

  // 22. KOTA TANGERANG (Kota di Banten, Wave 3 Scheduled)
  {
    slug: 'kota-tangerang',
    nameId: 'Kota Tangerang',
    nameEn: 'Tangerang City',
    regionGroup: 'kota-tangerang',
    regionLabelId: 'Kota Tangerang, Banten',
    regionLabelEn: 'Tangerang City, Banten',
    schemaType: 'City',
    wave: 3,
    publishAt: '2026-11-12',
    hasServiceAreaPages: false,
    nearbySlugs: ['alam-sutera', 'gading-serpong', 'pondok-aren', 'tangerang-selatan'],
    factsSummaryId:
      'Kota di Provinsi Banten yang berbatasan langsung dengan Tangerang Selatan.',
    factsSummaryEn:
      'A city in Banten Province bordering directly with South Tangerang.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Kota Tangerang. Cepat di HP, mulai Rp1.200.000, audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Tangerang City. Fast mobile pages from IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di Kota Tangerang. Cocok bagi jasa profesional, kontraktor, klinik, kafe dan restoran, toko online, maupun pengelola gudang. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Tangerang City. Built for professional services, contractors, clinics, cafes and restaurants, online shops, and warehouse operators. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Kota Tangerang membutuhkan halaman web yang meyakinkan calon klien, ingin merapikan balasan chat WhatsApp, atau membutuhkan sistem operasional gudang dan stok.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk membedah alur kerja dan kebutuhan sistemmu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, fitur aplikasi, dan integrasi tool.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Tangerang City needs a credible website for prospective clients, structured WhatsApp chat handling, or custom warehouse and inventory software.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to review your workflow and system requirements before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, app features, and tool integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Kota Tangerang butuh ini',
    whyNeedHeadingEn: 'Why businesses in Tangerang City need this',
    whyNeedParagraphsId: [
      'Kota Tangerang di Provinsi Banten berbatasan langsung dengan Tangerang Selatan dan mencakup kawasan permukiman, koridor komersial, serta kawasan perkantoran dan pergudangan. Di wilayah ini, umumnya beroperasi beragam usaha seperti jasa profesional, kontraktor, distributor dan toko online, klinik kesehatan, kafe dan restoran, hingga bimbel.',
      'Calon pelanggan maupun mitra usaha di Kota Tangerang biasanya memeriksa profil layanan, cakupan kerja, dan kontak melalui pencarian Google di HP sebelum meminta penawaran. Halaman web yang ringan, rapi, dan langsung menjelaskan keunggulan layanan umumnya memudahkan calon klien untuk menghubungi.',
      'Di sisi operasional, perusahaan distribusi, gudang logistik, maupun penyedia jasa di Kota Tangerang biasanya masih menghadapi kendala pencatatan stok manual di berbagai file spreadsheet yang tidak sinkron. Membangun software custom untuk operasional, AI agent WhatsApp, atau otomasi workflow membantu menyatukan data lapangan secara akurat.',
    ],
    whyNeedParagraphsEn: [
      'Tangerang City in Banten Province borders directly with South Tangerang and encompasses residential neighborhoods, commercial corridors, office districts, and warehousing zones. Businesses operating here commonly include professional services, contractors, distributors and online shops, health clinics, cafes and restaurants, and tutoring centers.',
      'Prospective customers and business partners in Tangerang City typically review service profiles, work scopes, and contact details on Google from their phones before requesting a quote. A fast, structured webpage that clearly explains your services makes it easy for prospects to reach out.',
      'On the operational side, distribution companies, logistics warehouses, and service providers in Tangerang City often struggle with manual inventory logs spread across unsynchronized spreadsheets. Building custom operational software, a WhatsApp AI agent, or workflow automation unifies field data accurately.',
    ],
    typicalBusinessMixId: [
      'Perusahaan jasa profesional, kontraktor, dan pemasok B2B di Kota Tangerang',
      'Gudang distribusi, ekspedisi lokal, dan toko online dengan volume kiriman harian',
      'Klinik kesehatan, kafe dan restoran, serta layanan ritel di koridor komersial',
      'Bimbel, kursus, dan kos-kosan di kawasan permukiman Kota Tangerang',
    ],
    typicalBusinessMixEn: [
      'Professional service firms, contractors, and B2B suppliers in Tangerang City',
      'Distribution warehouses, local logistics operators, and high-volume online shops',
      'Health clinics, cafes and restaurants, and retail services along commercial corridors',
      'Tutoring centers, courses, and boarding houses in Tangerang City residential areas',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website company profile dan pengajuan penawaran untuk kontraktor & pemasok',
        titleEn: 'Company profile and quote request website for a contractor & supplier',
        businessTypeId: 'Kontraktor dan jasa profesional di Kota Tangerang',
        businessTypeEn: 'Contractor and professional service in Tangerang City',
        narrativeId:
          'Calon klien bisnis maupun perorangan umumnya ingin melihat daftar layanan, spesifikasi pekerjaan, dan alur pengajuan penawaran sebelum menghubungi. Kami membangun website yang cepat dibuka di HP maupun desktop dengan formulir permintaan penawaran langsung ke WhatsApp.',
        narrativeEn:
          'Business and individual clients usually want to review service lists, technical scopes, and quotation steps before reaching out. We build a fast mobile and desktop website with a direct WhatsApp quote request flow.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp untuk pengecekan status pesanan dan jadwal kirim pelanggan',
        titleEn: 'WhatsApp assistant for order status checks and delivery scheduling',
        businessTypeId: 'Toko online dan distributor di Kota Tangerang',
        businessTypeEn: 'Online shop and distributor in Tangerang City',
        narrativeId:
          'Pelanggan sering mengirim chat menanyakan apakah barang sudah dikirim dan kapan sampai. AI agent memeriksa tabel pengiriman terkini berdasarkan nomor pesanan, memberikan status pengantaran secara instan, dan meneruskan kendala khusus ke staf admin.',
        narrativeEn:
          'Customers frequently message asking whether their order has shipped and when it will arrive. An AI agent checks the live dispatch sheet by order number, provides instant delivery updates, and escalates exceptions to admin staff.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Sistem operasional gudang untuk pencatatan barang masuk, keluar, dan selisih stok',
        titleEn: 'Warehouse operational system for inbound, outbound, and stock variance tracking',
        businessTypeId: 'Gudang dan distribusi di Kota Tangerang',
        businessTypeEn: 'Warehouse and distribution business in Tangerang City',
        narrativeId:
          'Pencatatan stok gudang di kertas jalan dan spreadsheet terpisah sering menyebabkan selisih jumlah barang saat audit bulanan. Kami merancang aplikasi web operasional gudang dengan pembagian hak akses staf lapangan dan laporan stok langsung bagi manajemen.',
        narrativeEn:
          'Recording warehouse stock on paper slips and separate spreadsheets often causes inventory discrepancies during monthly audits. We build a warehouse operational web app with role-based floor access and live stock reports for management.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pembacaan dokumen surat jalan dan rekap tagihan pemasok',
        titleEn: 'Automated delivery note extraction and supplier invoice logging',
        businessTypeId: 'Jasa profesional dan distribusi di Kota Tangerang',
        businessTypeEn: 'Professional service and distributor in Tangerang City',
        narrativeId:
          'Staf administrasi biasanya mengetik ulang rincian surat jalan dan faktur ke dalam tabel pembukuan satu per satu. Otomasi workflow mengekstrak data utama dari dokumen yang masuk, menyusunnya ke tabel verifikasi, dan memberi tahu staf keuangan untuk pemeriksaan akhir.',
        narrativeEn:
          'Admin staff typically retype delivery notes and invoices into bookkeeping sheets one by one. Workflow automation extracts key fields from incoming documents, formats them into the verification sheet, and alerts finance staff for final review.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Kota Tangerang',
    howWeWorkHeadingEn: 'How we work with clients in Tangerang City',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi pengerjaan proyek bersama klien di Kota Tangerang dilakukan secara online melalui WhatsApp dan video call supaya efisien.',
      'Apabila diperlukan diskusi tatap muka, pertemuan di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan bersama. Seluruh pengerjaan ditangani langsung bersama Chesta Azka dan Zeeshan melalui empat langkah kerja.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Project coordination with clients in Tangerang City runs online via WhatsApp and video call for efficiency.',
      'Whenever an in-person discussion is needed, meetings in the South Tangerang area can be scheduled by agreement. All work is handled directly with Chesta Azka and Zeeshan across four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan website atau alur operasional bisnismu di Kota Tangerang sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Tangerang City before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent action rules, or app screens before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama kami untuk mendukung pelaku usaha di Kota Tangerang:',
    servicesIntroEn:
      'Our four core services to support business owners in Tangerang City:',
    faqsId: [
      {
        question: 'Apakah CHESTAADOTCOM memiliki pengalaman membangun sistem operasional gudang dan pencatatan?',
        answer:
          'Ya, pengalaman proyek nyata kami mencakup pembangunan sistem untuk operasional gudang logistik, sistem pencatatan suhu dan pembukuan barang untuk brand minuman, serta sistem operasional pondok pesantren.',
      },
      {
        question: 'Berapa biaya pembuatan website dan sistem untuk bisnis di Kota Tangerang?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Bagaimana proses komunikasi selama proyek berlangsung?',
        answer:
          'Koordinasi harian berjalan online lewat WhatsApp dan video call bersama Chesta Azka dan Zeeshan, dan pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan.',
      },
    ],
    faqsEn: [
      {
        question: 'Does CHESTAADOTCOM have experience building warehouse and operational tracking systems?',
        answer:
          'Yes, our real project experience includes building a system for logistics warehouse operations, a temperature logging and inventory bookkeeping system for a beverage brand, and an operational system for an Islamic boarding school.',
      },
      {
        question: 'How much do websites and custom systems cost for businesses in Tangerang City?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free 30-minute audit.',
      },
      {
        question: 'How does communication work during the project?',
        answer:
          'Daily coordination runs online via WhatsApp and video call directly with Chesta Azka and Zeeshan, and in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
    ],
    ctaHeadingId: 'Jadwalkan audit gratis 30 menit untuk bisnismu di Kota Tangerang',
    ctaHeadingEn: 'Schedule a free 30-minute audit for your business in Tangerang City',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk memetakan kebutuhan website, AI agent, atau sistem operasional bisnismu di Kota Tangerang.',
    ctaBodyEn:
      'Contact us via WhatsApp to map out your website, AI agent, or operational software needs in Tangerang City.',
  },
];
