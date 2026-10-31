import type { UnifiedAreaSeed } from './unified-areas-types';

export const UNIFIED_AREAS_TANGSEL_A: UnifiedAreaSeed[] = [
  // 1. TANGERANG SELATAN (Kota, Baseline Live)
  {
    slug: 'tangerang-selatan',
    nameId: 'Tangerang Selatan',
    nameEn: 'South Tangerang',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'Kota Tangerang Selatan',
    regionLabelEn: 'South Tangerang City',
    schemaType: 'City',
    wave: 0,
    publishAt: '2026-10-22',
    hasServiceAreaPages: true,
    nearbySlugs: ['bsd-city', 'serpong', 'pamulang', 'ciputat', 'pondok-aren'],
    factsSummaryId:
      'Kota di Provinsi Banten yang terdiri dari tujuh kecamatan dengan kawasan permukiman, kawasan kampus, dan koridor komersial.',
    factsSummaryEn:
      'A city in Banten Province spanning seven districts with residential neighborhoods, campus areas, and commercial corridors.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di Tangerang Selatan. Mulai Rp1.200.000, audit gratis.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and workflow automation for businesses in South Tangerang. From IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk pelaku usaha di ketujuh kecamatan Kota Tangerang Selatan. Halaman web dimulai dari Rp1.200.000 tergantung kompleksitas, sedangkan layanan sistem dan otomasi dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for business owners across all seven districts of South Tangerang City. Websites start at IDR 1,200,000 depending on complexity, while software and automation are quoted after a free 30-minute audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Tangerang Selatan ingin punya halaman web yang jelas dan cepat dibuka di HP, merapikan balasan chat pelanggan, atau menyatukan pencatatan operasional harian.',
      mulaiDari:
        'Audit gratis 30 menit untuk membedah alur kerjamu saat ini, halaman yang sudah ada, serta kebutuhan yang paling mendesak sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai jumlah halaman, fitur, tool yang dihubungkan, dan kompleksitas aturan.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in South Tangerang wants a fast mobile website with a clear offer, structured customer chat handling, or unified daily operational records.',
      mulaiDari:
        'A free 30-minute audit to review your current workflow, existing pages, and highest-priority operational bottleneck before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on pages, features, connected tools, and business rules.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Tangerang Selatan butuh ini',
    whyNeedHeadingEn: 'Why businesses in South Tangerang need this',
    whyNeedParagraphsId: [
      'Tangerang Selatan adalah kota yang terdiri dari tujuh kecamatan—Serpong, Serpong Utara, Setu, Pamulang, Ciputat, Ciputat Timur, dan Pondok Aren—yang memadukan kawasan permukiman, kawasan kampus, kawasan perkantoran, dan koridor komersial. Di wilayah ini, umumnya tumbuh beragam usaha mulai dari klinik, kafe dan restoran, kos-kosan, toko online, bimbel, jasa profesional, properti, hingga kontraktor.',
      'Warga maupun pelanggan lintas kecamatan biasanya mencari layanan langsung dari HP dan menghubungi lewat WhatsApp di sela aktivitas harian. Apabila halaman web sebuah usaha lambat dimuat atau tidak menjelaskan kisaran biaya serta cara pemesanan dengan terang, calon pelanggan umumnya langsung menutup halaman dan beralih ke pilihan lain.',
      'Di sisi operasional, banyak tim di Tangerang Selatan biasanya masih menyalin jadwal booking, pesanan harian, atau rekap pembayaran secara manual dari chat ke berbagai file spreadsheet. Menggabungkan halaman web yang ringan dengan AI agent, software custom, atau otomasi workflow membantu bisnismu melayani pelanggan lebih tertata tanpa menambah tumpukan pekerjaan berulang bagi staf.',
    ],
    whyNeedParagraphsEn: [
      'South Tangerang is a city spanning seven districts—Serpong, North Serpong, Setu, Pamulang, Ciputat, East Ciputat, and Pondok Aren—combining residential neighborhoods, campus areas, office districts, and commercial corridors. Across this area, businesses commonly include clinics, cafes and restaurants, boarding houses, online shops, tutoring centers, professional services, property agencies, and contractors.',
      'Residents and cross-district customers usually search for services directly on their phones and reach out via WhatsApp between daily routines. When a business website loads slowly or fails to explain pricing ranges and booking steps clearly, prospective customers typically close the page and move to another option.',
      'On the operational side, many teams in South Tangerang still copy booking schedules, daily orders, or payment summaries manually from chat threads into multiple spreadsheets. Pairing a lightweight website with an AI agent, custom software, or workflow automation helps your business serve customers cleanly without piling repetitive manual entry onto your staff.',
    ],
    typicalBusinessMixId: [
      'Klinik dan layanan kesehatan di kawasan permukiman serta koridor komersial',
      'Kafe dan restoran yang membutuhkan halaman menu, jam buka, dan reservasi',
      'Bimbel dan kursus di sekitar kawasan kampus serta permukiman keluarga',
      'Jasa profesional, properti, kontraktor, kos-kosan, dan toko online di ketujuh kecamatan',
    ],
    typicalBusinessMixEn: [
      'Clinics and healthcare practices across residential areas and commercial corridors',
      'Cafes and restaurants needing mobile menu pages, opening hours, and table reservations',
      'Tutoring centers (bimbel) and courses near campus areas and family neighborhoods',
      'Professional services, property agencies, contractors, boarding houses, and online shops across all seven districts',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Klinik keluarga lintas kecamatan dengan halaman per layanan',
        titleEn: 'Multi-service family clinic with dedicated treatment pages',
        businessTypeId: 'Klinik di kawasan permukiman Tangerang Selatan',
        businessTypeEn: 'Clinic in a South Tangerang residential neighborhood',
        narrativeId:
          'Calon pasien umumnya mencari jadwal dokter, daftar tindakan, dan kisaran biaya lewat HP sebelum mengirim pesan. Kami merancang website statis yang ringan dengan halaman terpisah per layanan, petunjuk lokasi, serta tombol WhatsApp yang langsung mencantumkan jenis pemeriksaan yang dipilih pengunjung.',
        narrativeEn:
          'Prospective patients usually look up doctor schedules, treatment lists, and fee ranges on their phones before messaging. We build a lightweight static website with dedicated service pages, clear location details, and a WhatsApp button pre-filled with the selected consultation type.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Penyaringan pendaftaran bimbel dan pengecekan kuota kelas',
        titleEn: 'Tutoring center enrollment screening and class quota checks',
        businessTypeId: 'Bimbel di Tangerang Selatan',
        businessTypeEn: 'Tutoring center (bimbel) in South Tangerang',
        narrativeId:
          'Saat periode masuk sekolah baru, orang tua siswa biasanya menanyakan jadwal kelas dan biaya di malam hari. AI agent WhatsApp membaca pertanyaan orang tua, mengecek sisa kursi di tabel jadwal, mencatat data calon siswa, dan menyerahkan konfirmasi pembayaran akhir ke admin bimbel.',
        narrativeEn:
          'During new school terms, parents frequently ask about class schedules and tuition fees late in the evening. A WhatsApp AI agent answers program questions, checks seat availability on the schedule sheet, records student details, and hands final payment confirmation over to the admin.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi progres proyek dan termin tagihan untuk kontraktor',
        titleEn: 'Project milestone and billing tracker for a contractor',
        businessTypeId: 'Kontraktor renovasi di Tangerang Selatan',
        businessTypeEn: 'Renovation contractor in South Tangerang',
        narrativeId:
          'Tim lapangan dan admin kantor sering kesulitan mencocokkan catatan belanja material serta jatuh tempo termin di banyak grup chat. Kami membangun web app khusus dengan hak akses per peran agar mandor mencatat progres dari HP dan pemilik usaha memantau arus tagihan di satu layar.',
        narrativeEn:
          'Field supervisors and office admins often struggle to reconcile material purchases and billing milestones scattered across chat groups. We build a role-based web app so site leads log progress from their phones while the owner tracks payment stages on one screen.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Sinkronisasi pesanan toko online ke rekap gudang dan pengingat kurir',
        titleEn: 'Syncing online shop orders to warehouse logs and courier alerts',
        businessTypeId: 'Toko online di Tangerang Selatan',
        businessTypeEn: 'Online shop in South Tangerang',
        narrativeId:
          'Admin toko online biasanya menyalin alamat pengiriman dan status bayar satu per satu ke lembar kerja pengemasan. Dengan otomasi workflow, setiap formulir pesanan yang terverifikasi otomatis tercatat di database pengiriman, memotong stok barang, dan mengirimkan daftar paket siap kirim ke tim gudang.',
        narrativeEn:
          'Online shop admins typically copy shipping addresses and payment statuses one by one into packing sheets. With workflow automation, every verified order form automatically logs into the dispatch database, deducts inventory, and sends a ready-to-pack list to the warehouse team.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Tangerang Selatan',
    howWeWorkHeadingEn: 'How we work with clients in South Tangerang',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi harian seperti diskusi alur kerja, pengiriman materi, dan peninjauan prototipe kami jalankan secara online lewat WhatsApp dan video call agar praktis bagi jadwalmu.',
      'Untuk klien di wilayah Tangerang Selatan, pertemuan tatap muka juga dapat dijadwalkan sesuai kesepakatan bersama apabila kamu ingin membedah alur operasional secara langsung. Seluruh proyek dikerjakan langsung oleh co-founder kami, Chesta Azka dan Zeeshan, melalui empat langkah kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Day-to-day coordination—including workflow mapping, content handoff, and prototype reviews—runs online via WhatsApp and video call so it fits smoothly into your schedule.',
      'For clients in the South Tangerang area, in-person meetings can also be scheduled by agreement whenever you prefer to walk through your operational flow together. Every project is handled directly by our co-founders, Chesta Azka and Zeeshan, through four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami mempelajari proses bisnismu di Tangerang Selatan dan memetakan solusi yang paling tepat sebelum kamu mengeluarkan biaya apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, alur percakapan AI agent, atau rancangan layar aplikasi lebih dulu sebelum tahap pembangunan dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun secara bertahap dan diuji langsung pada perangkat HP serta skenario operasional harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Setelah sistem tayang di akun milikmu sendiri, kami mendampingi pemantauan log dan penyesuaian berkala sesuai kebutuhan.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your business workflow in South Tangerang and map out the right approach before you spend anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure, AI agent conversation rules, or application screen wireframes before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system in clear stages and test it directly on mobile devices and against your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Once live on your own accounts, we support log monitoring and periodic adjustments as your operations grow.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang dapat kamu pilih sesuai prioritas bisnis di Tangerang Selatan, lengkap dengan halaman khusus area untuk pembuatan website dan AI agent:',
    servicesIntroEn:
      'Four core services you can choose based on your business priorities in South Tangerang, complete with area-specific pages for website development and AI agents:',
    faqsId: [
      {
        question: 'Apakah tim CHESTAADOTCOM bisa diajak bertemu tatap muka di Tangerang Selatan?',
        answer:
          'Bisa. Kami berbasis di BSD, Tangerang Selatan. Pekerjaan harian berjalan online lewat WhatsApp dan video call, dan pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan.',
      },
      {
        question: 'Berapa kisaran biaya pembuatan website dan sistem untuk usaha di Tangerang Selatan?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman serta fitur. Untuk AI agent, software custom, dan otomasi workflow, rincian biayanya kami hitung setelah audit gratis 30 menit sebelum kamu membayar apa pun.',
      },
      {
        question: 'Siapa yang memegang kepemilikan domain, kode, dan data pelanggan?',
        answer:
          'Domain, akun hosting, dan seluruh data bisnismu sepenuhnya terdaftar atas namamu sendiri. Kami hanya menggunakan akses seperlunya selama pengerjaan dan mencabut akses tersebut ketika proyek atau masa rawat berakhir.',
      },
    ],
    faqsEn: [
      {
        question: 'Can we schedule an in-person meeting with CHESTAADOTCOM in South Tangerang?',
        answer:
          'Yes. We are based in BSD, South Tangerang. Day-to-day work runs online via WhatsApp and video call, and in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
      {
        question: 'How much do websites and custom systems cost for businesses in South Tangerang?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, exact pricing is calculated after the free 30-minute audit before you pay anything.',
      },
      {
        question: 'Who owns the domain, source code, and customer data?',
        answer:
          'Your domain, hosting accounts, and business data are registered directly under your own name. We only use the access required during development and revoke our access when the project or maintenance term ends.',
      },
    ],
    ctaHeadingId: 'Mulai dari audit gratis 30 menit untuk bisnismu di Tangerang Selatan',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in South Tangerang',
    ctaBodyId:
      'Ceritakan kebutuhan website, AI agent, software custom, atau otomasi kerjamu lewat WhatsApp. Chesta Azka dan Zeeshan akan membedahnya bersamamu tanpa biaya awal.',
    ctaBodyEn:
      'Tell us about your website, AI agent, custom software, or workflow automation needs via WhatsApp. Chesta Azka and Zeeshan will review it with you at no upfront cost.',
  },

  // 2. BSD CITY (Kawasan di Serpong, Baseline Live)
  {
    slug: 'bsd-city',
    nameId: 'BSD City',
    nameEn: 'BSD City',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'BSD City, Tangerang Selatan',
    regionLabelEn: 'BSD City, South Tangerang',
    schemaType: 'AdministrativeArea',
    wave: 0,
    publishAt: '2026-10-22',
    hasServiceAreaPages: true,
    nearbySlugs: ['serpong', 'tangerang-selatan', 'gading-serpong', 'alam-sutera', 'pamulang'],
    factsSummaryId:
      'Kawasan di Serpong, Tangerang Selatan dengan AEON Mall BSD City, The Breeze, dan ICE BSD serta koridor komersial dan kawasan perkantoran.',
    factsSummaryEn:
      'An area in Serpong, South Tangerang featuring AEON Mall BSD City, The Breeze, and ICE BSD alongside commercial corridors and office districts.',
    metaDescriptionId:
      'Jasa website, AI agent WhatsApp, software custom, dan otomasi bisnis di BSD City, Serpong. Cepat di HP, mulai Rp1.200.000 dengan audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and automation in BSD City, Serpong. Fast mobile pages from IDR 1.2M with a free 30m audit.',
    quickSummaryId:
      'Berbasis langsung di BSD, Tangerang Selatan, CHESTAADOTCOM membangun website cepat, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di BSD City. Cocok bagi klinik, kafe dan restoran, jasa profesional, properti, maupun kontraktor. Website mulai Rp1.200.000, sementara sistem dan otomasi dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'Based directly in BSD, South Tangerang, CHESTAADOTCOM builds fast websites, WhatsApp AI agents, custom software, and workflow automation for businesses in BSD City. Ideal for clinics, cafes and restaurants, professional services, property, and contractors. Websites start at IDR 1,200,000, while systems are quoted after a free 30-minute audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di koridor komersial atau kawasan perkantoran BSD City membutuhkan halaman web yang langsung menjawab calon pelanggan, atau ingin mengotomasi jadwal reservasi dan pencatatan tim.',
      mulaiDari:
        'Audit gratis 30 menit untuk meninjau halaman yang ada, alur chat pelanggan, dan titik kerja manual yang paling menyita waktu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis berdasarkan cakupan fitur dan integrasi tool yang dibutuhkan.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in BSD City’s commercial corridors or office districts needs a clear website that converts visitors, or wants to automate reservations and team records.',
      mulaiDari:
        'A free 30-minute audit to inspect your current pages, customer chat flow, and the manual tasks taking up the most time.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on feature scope and required tool integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di BSD City butuh ini',
    whyNeedHeadingEn: 'Why businesses in BSD City need this',
    whyNeedParagraphsId: [
      'BSD City di Serpong, Tangerang Selatan dikenal dengan titik aktivitas seperti AEON Mall BSD City, The Breeze, dan pusat pameran ICE BSD, serta perpaduan kawasan perkantoran, koridor komersial, dan kawasan permukiman. Di lingkungan ini, umumnya beroperasi berbagai klinik, kafe dan restoran, jasa profesional, agen properti, hingga kontraktor yang melayani warga lokal maupun pengunjung dari luar kawasan.',
      'Karena banyaknya pilihan usaha di koridor komersial yang berdekatan, calon pelanggan biasanya membandingkan beberapa penyedia jasa sekaligus lewat layar HP sebelum memutuskan berkunjung atau mengirim pesan. Halaman web yang lambat dibuka atau tidak memuat informasi harga mulai dari dan jadwal layanan umumnya membuat pengunjung berpindah dalam hitungan detik.',
      'Selain itu, lonjakan pesan WhatsApp pada jam makan siang, akhir pekan, atau saat berlangsung acara di sekitar ICE BSD biasanya membuat admin kewalahan menjawab pertanyaan berulang sambil mencatat jadwal secara manual. Menyiapkan AI agent, software operasional, atau otomasi workflow membantu timmu menjaga kecepatan respons dan kerapian data tanpa harus lembur menyalin chat.',
    ],
    whyNeedParagraphsEn: [
      'BSD City in Serpong, South Tangerang features landmarks such as AEON Mall BSD City, The Breeze, and the ICE BSD exhibition center, alongside a mix of office districts, commercial corridors, and residential neighborhoods. Across this environment, businesses commonly include clinics, cafes and restaurants, professional services, property agencies, and contractors serving both residents and visitors.',
      'Because many competing options operate along nearby commercial corridors, prospective customers typically compare several providers on their phones before deciding to visit or message. A webpage that loads slowly or omits starting prices and service schedules usually causes visitors to bounce within seconds.',
      'Furthermore, spikes in WhatsApp inquiries during lunch hours, weekends, or major events around ICE BSD often overwhelm staff who must answer repetitive questions while logging bookings by hand. Deploying an AI agent, custom operational software, or workflow automation keeps response times fast and records accurate without manual copy-pasting.',
    ],
    typicalBusinessMixId: [
      'Klinik perawatan dan kesehatan di koridor komersial BSD City',
      'Kafe dan restoran di sekitar pusat aktivitas seperti AEON Mall BSD City dan The Breeze',
      'Jasa profesional, konsultan, dan kantor di kawasan perkantoran BSD',
      'Agen properti dan kontraktor yang melayani kawasan permukiman sekitar',
    ],
    typicalBusinessMixEn: [
      'Healthcare and aesthetic clinics along BSD City commercial corridors',
      'Cafes and restaurants around activity centers such as AEON Mall BSD City and The Breeze',
      'Professional services, consultants, and offices in BSD office districts',
      'Property agencies and contractors serving surrounding residential neighborhoods',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Landing page per tindakan untuk klinik di koridor komersial BSD',
        titleEn: 'Dedicated treatment landing pages for a clinic in BSD',
        businessTypeId: 'Klinik di BSD City',
        businessTypeEn: 'Clinic in BSD City',
        narrativeId:
          'Pengunjung dari iklan pencarian biasanya ingin tahu tahapan perawatan, kisaran harga awal, dan ketersediaan jam dokter sebelum menghubungi admin. Kami membangun halaman terpisah per layanan yang cepat dibuka di jaringan seluler dan langsung mengarahkan calon pasien ke WhatsApp dengan format booking yang rapi.',
        narrativeEn:
          'Visitors clicking search ads usually want to know treatment steps, starting prices, and doctor availability before messaging the front desk. We build fast mobile landing pages per treatment that guide prospective patients straight to WhatsApp with a structured booking message.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Pencatatan reservasi meja restoran dan penyaringan jadwal survei properti',
        titleEn: 'Restaurant table booking and property viewing qualification',
        businessTypeId: 'Restoran dan properti di BSD City',
        businessTypeEn: 'Restaurant and property agency in BSD City',
        narrativeId:
          'Pada akhir pekan atau saat ada pameran di sekitar ICE BSD, pesan reservasi meja maupun permintaan jadwal lihat unit properti sering menumpuk. AI agent menjawab pertanyaan ketersediaan, memeriksa slot di kalender, mencatat reservasi secara otomatis, dan meneruskan permintaan khusus ke staf.',
        narrativeEn:
          'On weekends or during exhibitions near ICE BSD, table reservation messages and property viewing requests often pile up. An AI agent answers availability questions, checks calendar slots, logs bookings automatically, and forwards special requests to human staff.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Portal persetujuan RAB dan dokumentasi lapangan untuk studio kontraktor',
        titleEn: 'Budget approval and site documentation portal for a contractor studio',
        businessTypeId: 'Kontraktor dan studio desain di BSD City',
        businessTypeEn: 'Contractor and design studio in BSD City',
        narrativeId:
          'Revisi gambar dan persetujuan biaya tambahan sering tercecer apabila hanya dikirim lewat chat. Kami merancang aplikasi web tempat tim proyek mengunggah laporan mingguan, melacak status persetujuan tiap tahapan, dan menyimpan riwayat perubahan anggaran secara terpusat.',
        narrativeEn:
          'Drawing revisions and cost-change approvals easily get lost when sent only through chat. We build a web application where project teams upload weekly reports, track stage approvals, and store budget change histories in one central place.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi rekap prospek pameran dan pengingat tindak lanjut konsultan',
        titleEn: 'Automated exhibition lead capture and consultant follow-up reminders',
        businessTypeId: 'Jasa profesional di kawasan perkantoran BSD City',
        businessTypeEn: 'Professional service firm in a BSD City office district',
        narrativeId:
          'Setelah mengikuti pameran atau menjalankan kampanye iklan, data prospek biasanya tertumpuk di formulir tanpa tindak lanjut cepat. Otomasi workflow mengirim pesan sambutan instan via WhatsApp, membagi tugas ke konsultan yang bertugas, dan mengingatkan tim bila prospek belum dihubungi.',
        narrativeEn:
          'After exhibitions or ad campaigns, incoming leads often sit in forms without prompt follow-up. Workflow automation sends an instant WhatsApp greeting, assigns the lead to the right consultant, and reminds the team if a prospect has not been contacted.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di BSD City',
    howWeWorkHeadingEn: 'How we work with clients in BSD City',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Diskusi alur kerja, pengiriman materi, dan peninjauan prototipe sehari-hari dilakukan secara online melalui WhatsApp dan video call supaya efisien.',
      'Karena kami berada di area yang sama, pertemuan tatap muka di BSD City dan wilayah Tangerang Selatan dapat dijadwalkan sesuai kesepakatan bersama. Pengerjaan dilakukan langsung bersama Chesta Azka dan Zeeshan melalui empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Daily workflow discussions, material handoffs, and prototype reviews take place online via WhatsApp and video call for efficiency.',
      'Because we are based in the same area, in-person meetings in BSD City and across South Tangerang can be scheduled by agreement. All work is carried out directly with Chesta Azka and Zeeshan across four clear steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa halaman, alur chat, atau proses kerja bisnismu di BSD City sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau rancangan struktur halaman, aturan tindakan agent, atau alur layar sistem sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun sistem dan mengujinya pada perangkat seluler serta skenario pemakaian nyata bersama timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Sistem dirilis di atas akun dan domain milikmu sendiri, disertai opsi perawatan dan pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We inspect your current pages, chat flows, or operational processes in BSD City before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, agent action rules, or system screen flows before full development begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system and test it on mobile devices and against practical daily scenarios with your team.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'The system launches on your own domain and accounts, with optional ongoing maintenance and monitoring.',
      },
    ],
    servicesIntroId:
      'Pilih layanan sesuai kebutuhan bisnismu di BSD City, termasuk halaman khusus pembuatan website dan AI agent untuk area BSD City:',
    servicesIntroEn:
      'Choose the service that fits your business in BSD City, including dedicated BSD City pages for website development and AI agents:',
    faqsId: [
      {
        question: 'Apakah kita bisa berdiskusi tatap muka langsung di area BSD City?',
        answer:
          'Ya, CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Selain komunikasi harian via WhatsApp dan video call, kita bisa menjadwalkan pertemuan tatap muka di BSD City sesuai kesepakatan.',
      },
      {
        question: 'Berapa lama waktu pengerjaan landing page dibanding sistem custom?',
        answer:
          'Landing page sederhana umumnya selesai dalam hitungan hari kerja setelah materi disepakati. Sedangkan pembuatan AI agent, software custom, atau otomasi workflow membutuhkan hitungan minggu dengan estimasi waktu pasti yang kami sampaikan seusai audit gratis 30 menit.',
      },
      {
        question: 'Apakah website saya akan mengunci akses domain di pihak vendor?',
        answer:
          'Tidak. Domain dan hosting didaftarkan langsung atas namamu sendiri sehingga kamu memegang kendali penuh kapan saja tanpa biaya tebusan.',
      },
    ],
    faqsEn: [
      {
        question: 'Can we meet in person in the BSD City area?',
        answer:
          'Yes, CHESTAADOTCOM is based in BSD, South Tangerang. In addition to daily communication via WhatsApp and video call, we can schedule in-person meetings in BSD City by agreement.',
      },
      {
        question: 'How long does a landing page take compared to a custom system?',
        answer:
          'A simple landing page is typically completed within a few days once materials are confirmed. Building an AI agent, custom software, or workflow automation takes a matter of weeks, with a firm timeline provided after the free 30-minute audit.',
      },
      {
        question: 'Will my website lock domain ownership under the vendor?',
        answer:
          'No. Your domain and hosting are registered directly under your own name so you retain full ownership and control at all times.',
      },
    ],
    ctaHeadingId: 'Jadwalkan audit gratis 30 menit untuk bisnismu di BSD City',
    ctaHeadingEn: 'Schedule a free 30-minute audit for your business in BSD City',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk mendiskusikan kebutuhan website, AI agent, atau sistem operasional bisnismu di BSD City.',
    ctaBodyEn:
      'Reach out via WhatsApp to discuss your website, AI agent, or operational software needs in BSD City.',
  },

  // 3. PAMULANG (Kecamatan di Tangsel, Baseline Live)
  {
    slug: 'pamulang',
    nameId: 'Pamulang',
    nameEn: 'Pamulang',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'Kecamatan Pamulang, Tangerang Selatan',
    regionLabelEn: 'Pamulang District, South Tangerang',
    schemaType: 'AdministrativeArea',
    wave: 0,
    publishAt: '2026-10-22',
    hasServiceAreaPages: true,
    nearbySlugs: ['ciputat', 'tangerang-selatan', 'bsd-city', 'serpong', 'lebak-bulus'],
    factsSummaryId:
      'Kecamatan di Kota Tangerang Selatan tempat Universitas Pamulang berada, dengan kawasan permukiman, kawasan kampus, dan koridor komersial.',
    factsSummaryEn:
      'A district in South Tangerang City where Universitas Pamulang is located, featuring residential neighborhoods, campus areas, and commercial corridors.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent, software custom, dan otomasi bisnis di Pamulang, Tangerang Selatan. Mulai Rp1.200.000 dengan sesi audit gratis.',
    metaDescriptionEn:
      'Website development, AI agents, custom software, and business automation in Pamulang, South Tangerang. Starting at IDR 1.2M with a free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk usaha di Kecamatan Pamulang, Tangerang Selatan. Cocok bagi kos-kosan, bimbel, kafe dan restoran, toko online, maupun klinik di sekitar kawasan kampus dan permukiman. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Pamulang District, South Tangerang. Built for boarding houses, tutoring centers, cafes and restaurants, online shops, and clinics around campus and residential areas. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Pamulang sering menerima pertanyaan ketersediaan kamar, jadwal kursus, atau stok barang yang berulang di WhatsApp dan butuh halaman web maupun pencatatan yang rapi.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan pertanyaan pelanggan harian dan alur pencatatan yang saat ini masih dikerjakan manual.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai jumlah halaman, aturan percakapan, atau fitur aplikasi.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Pamulang frequently receives repetitive WhatsApp questions about room availability, course schedules, or product stock and needs a clear website or structured records.',
      mulaiDari:
        'A free 30-minute audit to map out daily customer questions and the manual record-keeping steps slowing your team down.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on pages, conversation rules, or application features.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Pamulang butuh ini',
    whyNeedHeadingEn: 'Why businesses in Pamulang need this',
    whyNeedParagraphsId: [
      'Pamulang adalah kecamatan di Kota Tangerang Selatan tempat Universitas Pamulang berada, sehingga memadukan kawasan kampus, kawasan permukiman keluarga, dan koridor komersial harian. Di wilayah ini, umumnya berjalan usaha seperti kos-kosan, bimbel dan tempat kursus, kafe dan restoran, toko online, klinik, hingga kontraktor.',
      'Mahasiswa, orang tua, dan warga sekitar biasanya mencari informasi harga sewa kamar kos, jadwal kelas bimbel, atau daftar menu langsung lewat layar HP. Tanpa halaman web yang ringan dan memuat rincian fasilitas serta biaya secara terbuka, pemilik usaha biasanya harus mengirim foto dan penjelasan yang sama puluhan kali sehari di WhatsApp.',
      'Ketika jumlah penghuni kos, siswa kursus, atau pesanan toko online bertambah, pencatatan di buku tulis dan chat pribadi umumnya mulai menimbulkan selisih tagihan atau jadwal yang terlewat. Menerapkan AI agent WhatsApp, aplikasi pencatatan custom, atau otomasi pengingat tagihan membantu usaha di Pamulang tetap tertib meski dikelola oleh tim yang ramping.',
    ],
    whyNeedParagraphsEn: [
      'Pamulang is a district in South Tangerang City home to Universitas Pamulang, blending a busy campus area with family residential neighborhoods and daily commercial corridors. Businesses here commonly include boarding houses (kos-kosan), tutoring centers, cafes and restaurants, online shops, clinics, and contractors.',
      'Students, parents, and local residents usually look up room rental rates, tutoring schedules, or food menus directly on their phones. Without a fast website displaying clear facilities and pricing, business owners typically end up sending the same photos and explanations dozens of times a day on WhatsApp.',
      'As boarding house tenants, course students, or online shop orders grow, tracking everything in notebooks and personal chats usually leads to missed bills or overlapping schedules. Adding a WhatsApp AI agent, custom tracking software, or automated billing reminders helps Pamulang businesses stay organized even with a lean team.',
    ],
    typicalBusinessMixId: [
      'Usaha kos-kosan dan hunian sewa di sekitar kawasan kampus Universitas Pamulang',
      'Bimbel dan lembaga kursus keterampilan bagi pelajar serta mahasiswa',
      'Kafe, restoran, dan toko online yang melayani warga di kawasan permukiman Pamulang',
      'Klinik, jasa profesional, dan kontraktor renovasi rumah tinggal',
    ],
    typicalBusinessMixEn: [
      'Boarding houses (kos-kosan) and rental properties around the Universitas Pamulang campus area',
      'Tutoring centers (bimbel) and skill courses for school and university students',
      'Cafes, restaurants, and online shops serving residents across Pamulang neighborhoods',
      'Clinics, professional services, and home renovation contractors',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website informasi kamar dan fasilitas untuk usaha kos-kosan',
        titleEn: 'Room availability and facility website for a boarding house',
        businessTypeId: 'Kos-kosan di kawasan kampus Pamulang',
        businessTypeEn: 'Boarding house near the Pamulang campus area',
        narrativeId:
          'Calon penghuni kos umumnya ingin melihat foto kamar asli, rincian fasilitas, aturan kos, harga sewa bulanan, dan jarak ke kampus sebelum survei lokasi. Kami membuat halaman web yang ringan di HP dengan tombol WhatsApp untuk menjadwalkan kunjungan.',
        narrativeEn:
          'Prospective tenants usually want to see real room photos, facility lists, house rules, monthly rent, and campus proximity before visiting. We build a fast mobile website with a direct WhatsApp button to schedule a room viewing.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Penjawab otomatis katalog dan cek ongkir untuk toko online',
        titleEn: 'Automated catalog responder and shipping check for an online shop',
        businessTypeId: 'Toko online di Pamulang',
        businessTypeEn: 'Online shop in Pamulang',
        narrativeId:
          'Toko online dan reseller sering kewalahan membalas chat ketersediaan ukuran atau warna satu per satu di jam sibuk. AI agent memeriksa tabel stok terkini, menjawab pertanyaan produk di WhatsApp, mencatat pesanan ke spreadsheet, dan meneruskan bukti bayar ke admin.',
        narrativeEn:
          'Online shops and resellers often struggle to reply to size and color availability chats one by one during peak hours. An AI agent checks the live stock sheet, answers product questions on WhatsApp, logs orders, and forwards payment proofs to the admin.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Sistem pencatatan kamar kosong dan jatuh tempo sewa kos multi-pintu',
        titleEn: 'Vacancy and rent due-date tracker for a multi-unit boarding house',
        businessTypeId: 'Pengelola kos-kosan di Pamulang',
        businessTypeEn: 'Boarding house operator in Pamulang',
        narrativeId:
          'Saat mengelola puluhan kamar kos dengan tanggal masuk yang berbeda-beda, pemilik sering lupa siapa yang belum memperpanjang sewa. Kami membangun aplikasi web sederhana untuk memantau status tiap kamar, riwayat pembayaran penghuni, dan catatan perawatan fasilitas.',
        narrativeEn:
          'When managing dozens of rooms with staggered move-in dates, owners easily lose track of upcoming renewals. We build a clean web app to monitor room occupancy, tenant payment history, and maintenance notes in one place.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Pengingat jadwal les dan rekap absensi otomatis untuk bimbel',
        titleEn: 'Automated lesson reminders and attendance logs for a tutoring center',
        businessTypeId: 'Bimbel di kawasan permukiman Pamulang',
        businessTypeEn: 'Tutoring center in a Pamulang residential area',
        narrativeId:
          'Admin bimbel biasanya menghabiskan waktu mengirim pengingat jadwal kelas dan tagihan bulanan ke orang tua siswa satu per satu. Otomasi workflow membaca jadwal dari Google Sheets lalu mengirimkan pengingat WhatsApp terjadwal serta merekap kehadiran pengajar secara otomatis.',
        narrativeEn:
          'Tutoring admins typically spend hours sending class reminders and monthly tuition notices to parents individually. Workflow automation reads the schedule from Google Sheets, sends scheduled WhatsApp reminders, and compiles tutor attendance automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Pamulang',
    howWeWorkHeadingEn: 'How we work with clients in Pamulang',
    howWeWorkParagraphsId: [
      'Dari basis kami di BSD, Tangerang Selatan, kami melayani pelaku usaha di Kecamatan Pamulang secara online lewat WhatsApp dan video call untuk diskusi harian, pengiriman konten, serta demonstrasi sistem.',
      'Karena Pamulang berada di dalam wilayah Kota Tangerang Selatan, pertemuan tatap muka juga dapat dijadwalkan sesuai kesepakatan apabila diperlukan. Seluruh tahap pengerjaan dijalankan melalui empat langkah terstruktur bersama Chesta Azka dan Zeeshan.',
    ],
    howWeWorkParagraphsEn: [
      'From our base in BSD, South Tangerang, we work with business owners in Pamulang District online via WhatsApp and video call for daily discussions, content delivery, and system demos.',
      'Because Pamulang is within South Tangerang City, in-person meetings can also be scheduled by agreement when needed. Every engagement follows four structured steps directly with Chesta Azka and Zeeshan.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami mendengarkan kendala operasional atau kebutuhan halaman web usahamu di Pamulang sebelum kamu mengeluarkan biaya.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau draf susunan halaman, alur percakapan AI, atau tampilan aplikasi sebelum kami mulai membangun.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun halaman atau sistem tersebut dan mengujinya langsung di layar HP agar siap dipakai timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Sistem diserahkan di atas akun milikmu sendiri, disertai dukungan pemantauan dan penyesuaian berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We listen to your operational bottlenecks or website needs in Pamulang before you spend anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the draft page structure, AI conversation flow, or app screens before we start building.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the website or system and test it directly on mobile screens so it is ready for your team.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'The system launches on your own accounts, backed by ongoing monitoring and periodic adjustments.',
      },
    ],
    servicesIntroId:
      'Berikut empat layanan kami untuk usaha di Pamulang, beserta tautan ke halaman khusus pembuatan website dan AI agent di Pamulang:',
    servicesIntroEn:
      'Here are our four services for businesses in Pamulang, along with links to our dedicated Pamulang website development and AI agent pages:',
    faqsId: [
      {
        question: 'Apakah usaha kecil seperti kos-kosan atau toko online di Pamulang cocok mulai dari landing page?',
        answer:
          'Sangat cocok. Landing page mulai Rp1.200.000 sudah cukup untuk menampilkan foto kamar atau katalog produk, daftar harga, titik lokasi, dan tombol WhatsApp agar calon pelanggan tidak perlu bertanya dari nol.',
      },
      {
        question: 'Apakah saya harus mengerti teknis pemrograman untuk memakai AI agent atau otomasi?',
        answer:
          'Tidak perlu. Kami menyiapkan seluruh penghubung teknisnya sehingga kamu dan admin cukup melihat hasil pencatatan di Google Sheets, kalender, atau dashboard yang mudah dipahami.',
      },
      {
        question: 'Apakah kita bisa bertemu langsung di sekitar Pamulang atau Tangerang Selatan?',
        answer:
          'Bisa. Koordinasi sehari-hari berjalan online via WhatsApp dan video call agar hemat waktu, dan pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan.',
      },
    ],
    faqsEn: [
      {
        question: 'Is a landing page suitable for a small boarding house or online shop in Pamulang?',
        answer:
          'Yes. A landing page starting at IDR 1,200,000 is ideal for showcasing room photos or product catalogs, pricing, location details, and a WhatsApp button so customers do not have to ask basic questions from scratch.',
      },
      {
        question: 'Do I need technical programming knowledge to use an AI agent or workflow automation?',
        answer:
          'Not at all. We set up all technical integrations so you and your admin simply view organized records in Google Sheets, calendars, or a straightforward dashboard.',
      },
      {
        question: 'Can we meet in person around Pamulang or South Tangerang?',
        answer:
          'Yes. Daily coordination runs online via WhatsApp and video call to save time, and in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
    ],
    ctaHeadingId: 'Diskusikan kebutuhan usahamu di Pamulang lewat audit gratis 30 menit',
    ctaHeadingEn: 'Discuss your business needs in Pamulang with a free 30-minute audit',
    ctaBodyId:
      'Kirim pesan WhatsApp untuk menceritakan alur kerja atau kebutuhan website usahamu di Pamulang. Kami bantu petakan solusinya secara jujur.',
    ctaBodyEn:
      'Send a WhatsApp message to share your workflow or website needs in Pamulang. We will help map out a practical solution honestly.',
  },

  // 4. JURANG MANGU (Kelurahan di Pondok Aren, Baseline Live)
  {
    slug: 'jurang-mangu',
    nameId: 'Jurang Mangu',
    nameEn: 'Jurang Mangu',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'Kelurahan Jurang Mangu, Pondok Aren, Tangerang Selatan',
    regionLabelEn: 'Jurang Mangu Subdistrict, Pondok Aren, South Tangerang',
    schemaType: 'AdministrativeArea',
    wave: 0,
    publishAt: '2026-10-22',
    hasServiceAreaPages: true,
    nearbySlugs: ['pondok-aren', 'bintaro', 'ciputat', 'tangerang-selatan', 'pamulang'],
    factsSummaryId:
      'Kelurahan di Kecamatan Pondok Aren, Kota Tangerang Selatan dengan kawasan permukiman dan usaha harian warga.',
    factsSummaryEn:
      'A subdistrict in Pondok Aren District, South Tangerang City with residential neighborhoods and daily local businesses.',
    metaDescriptionId:
      'Jasa website, AI agent WhatsApp, software custom, dan otomasi kerja untuk usaha di Jurang Mangu, Pondok Aren. Mulai Rp1.200.000, audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and automation for businesses in Jurang Mangu, Pondok Aren. From IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM membantu pelaku usaha di Kelurahan Jurang Mangu, Kecamatan Pondok Aren, Tangerang Selatan membangun website cepat, AI agent WhatsApp, software custom, dan otomasi workflow. Dirancang untuk klinik, kafe dan restoran, kontraktor, bimbel, maupun kos-kosan. Harga website mulai Rp1.200.000, sedangkan layanan lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM helps business owners in Jurang Mangu Subdistrict, Pondok Aren, South Tangerang build fast websites, WhatsApp AI agents, custom software, and workflow automation. Designed for clinics, cafes and restaurants, contractors, tutoring centers, and boarding houses. Websites start at IDR 1,200,000, with other services quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Jurang Mangu mengandalkan pelanggan dari kawasan permukiman sekitar dan butuh halaman web yang meyakinkan atau pencatatan jadwal yang tidak berantakan di chat.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk mengecek kebutuhan halaman web maupun alur kerja timmu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai fitur dan tool yang perlu dihubungkan.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Jurang Mangu serves nearby residential neighborhoods and needs a credible mobile website or structured scheduling that does not get lost in chat.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to review your website needs and team workflow.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on features and connected tools.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Jurang Mangu butuh ini',
    whyNeedHeadingEn: 'Why businesses in Jurang Mangu need this',
    whyNeedParagraphsId: [
      'Jurang Mangu merupakan kelurahan di Kecamatan Pondok Aren, Kota Tangerang Selatan yang didominasi kawasan permukiman serta aktivitas komersial warga. Di wilayah ini, umumnya beroperasi usaha seperti klinik dan praktik medis, kafe dan restoran, kontraktor renovasi, bimbel, kos-kosan, serta toko online.',
      'Warga di kawasan permukiman Jurang Mangu biasanya mencari layanan terdekat—seperti jadwal dokter, jasa perbaikan rumah, atau tempat kursus anak—melalui pencarian Google dan rekomendasi WhatsApp. Ketika sebuah usaha punya halaman web yang ringan, mencantumkan alamat jelas, dan menyajikan kisaran harga secara transparan, calon pelanggan umumnya lebih cepat percaya untuk menghubungi.',
      'Bagi usaha yang dikelola langsung oleh pemilik bersama satu atau dua staf, membalas chat pelanggan sambil mengatur jadwal kunjungan teknisi atau janji temu pasien biasanya menyita banyak perhatian. Penggunaan AI agent dan otomasi workflow membantu menangkap setiap pesan yang masuk dan mencatatnya ke kalender kerja secara tertib.',
    ],
    whyNeedParagraphsEn: [
      'Jurang Mangu is a subdistrict in Pondok Aren, South Tangerang City characterized by residential neighborhoods and daily local commerce. Businesses operating here commonly include clinics and medical practices, cafes and restaurants, renovation contractors, tutoring centers, boarding houses, and online shops.',
      'Residents in Jurang Mangu neighborhoods usually search for nearby services—such as doctor hours, home renovation contractors, or children’s tutoring—through Google search and WhatsApp recommendations. When a business has a lightweight website with a clear address and transparent starting prices, prospective customers typically reach out with much higher confidence.',
      'For owner-operated businesses supported by one or two staff members, replying to customer chats while coordinating technician visits or patient appointments often splits focus. Using an AI agent and workflow automation captures every incoming inquiry and logs it cleanly onto the work calendar.',
    ],
    typicalBusinessMixId: [
      'Klinik dan praktik kesehatan keluarga di kawasan permukiman Jurang Mangu',
      'Kontraktor renovasi rumah dan penyedia jasa panggilan lokal',
      'Kafe, restoran, dan katering harian yang melayani pesanan warga sekitar',
      'Bimbel, kursus privat, kos-kosan, dan toko online di Pondok Aren',
    ],
    typicalBusinessMixEn: [
      'Family health clinics and medical practices in Jurang Mangu residential areas',
      'Home renovation contractors and local on-call service providers',
      'Cafes, restaurants, and daily catering services serving nearby residents',
      'Tutoring centers, private courses, boarding houses, and online shops in Pondok Aren',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Halaman portofolio dan rincian layanan untuk kontraktor renovasi',
        titleEn: 'Portfolio and service scope page for a renovation contractor',
        businessTypeId: 'Kontraktor di Jurang Mangu',
        businessTypeEn: 'Contractor in Jurang Mangu',
        narrativeId:
          'Pemilik rumah di kawasan permukiman biasanya ingin melihat contoh hasil kerja, cakupan garansi, dan alur survei sebelum memanggil kontraktor. Kami membangun website cepat dengan galeri foto yang terkompresi rapi dan formulir pengajuan survei langsung ke WhatsApp.',
        narrativeEn:
          'Homeowners in residential neighborhoods usually want to inspect work examples, warranty terms, and survey steps before calling a contractor. We build a fast website with optimized photo galleries and a direct WhatsApp survey request form.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Pendaftaran janji temu pasien untuk klinik dan praktik dokter',
        titleEn: 'Patient appointment booking for a neighborhood clinic',
        businessTypeId: 'Klinik di Jurang Mangu',
        businessTypeEn: 'Clinic in Jurang Mangu',
        narrativeId:
          'Pasien sering menanyakan jam praktik dokter sore atau akhir pekan saat resepsionis sedang melayani pasien di tempat. AI agent WhatsApp menjawab jadwal dokter, memeriksa slot kosong di kalender klinik, mencatat booking pasien, dan mengirimkan pengingat sebelum jadwal periksa.',
        narrativeEn:
          'Patients often ask about evening or weekend doctor hours while the receptionist is busy assisting walk-in visitors. A WhatsApp AI agent answers schedule questions, checks open slots on the clinic calendar, logs bookings, and sends appointment reminders.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Sistem antrean pesanan dan langganan mingguan untuk usaha katering',
        titleEn: 'Order queue and weekly subscription system for a catering kitchen',
        businessTypeId: 'Kafe dan kuliner di Jurang Mangu',
        businessTypeEn: 'Cafe and catering business in Jurang Mangu',
        narrativeId:
          'Usaha kuliner yang melayani pesanan rantangan atau katering keluarga sering bingung melacak perubahan menu dan alamat kirim tiap hari. Kami merancang aplikasi web tempat admin mencetak daftar masak harian per menu dan kurir melihat urutan pengantaran dari HP.',
        narrativeEn:
          'Catering kitchens serving daily family meals often struggle to track menu swaps and delivery addresses day by day. We build a web app where admins print daily prep counts per menu and drivers view their delivery sequence on their phones.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Rekap otomatis pengajuan jadwal survei dan pembuatan draf penawaran',
        titleEn: 'Automated survey request logging and quotation draft generation',
        businessTypeId: 'Jasa profesional dan kontraktor di Jurang Mangu',
        businessTypeEn: 'Professional service and contractor in Jurang Mangu',
        narrativeId:
          'Setiap kali calon pelanggan mengisi detail ukuran ruangan dan jenis pekerjaan, otomasi workflow langsung menyimpannya ke tabel prospek, membuat draf dokumen estimasi awal, dan memberi notifikasi ke pemilik usaha di WhatsApp.',
        narrativeEn:
          'Whenever a prospective client submits room dimensions and work types, workflow automation logs the entry into the lead sheet, generates a draft estimate document, and notifies the business owner on WhatsApp.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Jurang Mangu',
    howWeWorkHeadingEn: 'How we work with clients in Jurang Mangu',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Seluruh komunikasi harian untuk proyek di Jurang Mangu berjalan secara online melalui WhatsApp dan video call agar kamu tetap bisa fokus menjalankan usaha.',
      'Apabila diperlukan diskusi langsung, pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan. Pengerjaan dilakukan melalui empat tahap yang jelas bersama Chesta Azka dan Zeeshan.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. All day-to-day communication for projects in Jurang Mangu runs online via WhatsApp and video call so you can stay focused on running your business.',
      'Whenever an in-person discussion is helpful, meetings in the South Tangerang area can be scheduled by agreement. Every project follows four clear stages with Chesta Azka and Zeeshan.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan kebutuhan halaman web atau titik kerja manual di usahamu di Jurang Mangu tanpa biaya awal.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau struktur halaman, alur chat, atau tampilan sistem sebelum kami mulai menulis kode penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji coba langsung di perangkat HP serta skenario operasional harianmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di akun milikmu sendiri dan dipantau agar berjalan lancar.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map out your website needs or manual workflow bottlenecks in Jurang Mangu at no upfront cost.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, chat flow, or system screens before full coding begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile devices and against your daily operational scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or application goes live on your own accounts and is monitored for smooth operation.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang tersedia untuk bisnis di Jurang Mangu, lengkap dengan halaman khusus pembuatan website dan AI agent di Jurang Mangu:',
    servicesIntroEn:
      'Four services available for businesses in Jurang Mangu, complete with dedicated Jurang Mangu pages for website development and AI agents:',
    faqsId: [
      {
        question: 'Berapa biaya awal untuk membuat website usaha di Jurang Mangu?',
        answer:
          'Pembuatan website dan landing page dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Angka pastinya kami sampaikan secara transparan setelah audit gratis 30 menit, sebelum kamu membayar apa pun.',
      },
      {
        question: 'Apakah AI agent bisa menyerahkan chat ke admin manusia kalau ada pertanyaan khusus?',
        answer:
          'Ya, setiap AI agent yang kami bangun memiliki batas aturan yang jelas. Jika pelanggan menanyakan negosiasi harga khusus atau kondisi medis di luar aturan, agent langsung menyerahkan chat ke adminmu beserta ringkasannya.',
      },
      {
        question: 'Bagaimana jika saya belum punya materi tulisan atau struktur halaman?',
        answer:
          'Saat sesi audit dan tahap perancangan, kami membantu menyusun struktur halaman serta merapikan tulisan penawaran berdasarkan fakta layanan usahamu agar mudah dipahami calon pelanggan.',
      },
    ],
    faqsEn: [
      {
        question: 'What is the starting cost for a business website in Jurang Mangu?',
        answer:
          'Website and landing page development starts at IDR 1,200,000 depending on page and feature complexity. We share the exact figure transparently after the free 30-minute audit, before you pay anything.',
      },
      {
        question: 'Can the AI agent hand chats over to a human admin for special questions?',
        answer:
          'Yes, every AI agent we build operates within strict guardrails. If a customer asks for custom price negotiations or medical advice outside the rules, the agent immediately hands the chat to your admin with a clear summary.',
      },
      {
        question: 'What if I do not have page copy or structure prepared yet?',
        answer:
          'During the audit and design phase, we help structure the page and organize clear copy based on your actual service facts so prospective customers understand your offer right away.',
      },
    ],
    ctaHeadingId: 'Mulai dengan audit gratis 30 menit untuk usahamu di Jurang Mangu',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Jurang Mangu',
    ctaBodyId:
      'Ceritakan kebutuhan website atau otomasi alur kerja usahamu di Jurang Mangu lewat WhatsApp bersama Chesta Azka dan Zeeshan.',
    ctaBodyEn:
      'Share your website or workflow automation needs in Jurang Mangu via WhatsApp with Chesta Azka and Zeeshan.',
  },

  // 5. SERPONG (Kecamatan di Tangsel, Wave 1 Live)
  {
    slug: 'serpong',
    nameId: 'Serpong',
    nameEn: 'Serpong',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'Kecamatan Serpong, Tangerang Selatan',
    regionLabelEn: 'Serpong District, South Tangerang',
    schemaType: 'AdministrativeArea',
    wave: 1,
    publishAt: '2026-10-29',
    hasServiceAreaPages: false,
    nearbySlugs: ['bsd-city', 'tangerang-selatan', 'alam-sutera', 'gading-serpong', 'pamulang'],
    factsSummaryId:
      'Kecamatan di Kota Tangerang Selatan yang mencakup kawasan permukiman dan koridor komersial.',
    factsSummaryEn:
      'A district in South Tangerang City covering residential neighborhoods and commercial corridors.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow di Kecamatan Serpong, Tangerang Selatan. Website mulai Rp1.200.000.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and workflow automation in Serpong District, South Tangerang. Websites from IDR 1,200,000.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di Kecamatan Serpong. Cocok bagi klinik, kafe dan restoran, kontraktor, properti, maupun jasa profesional. Harga website mulai Rp1.200.000, sedangkan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and delivers website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Serpong District. Tailored for clinics, cafes and restaurants, contractors, property agencies, and professional services. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Kecamatan Serpong ingin tampil jelas saat dicari warga di HP, membalas chat reservasi di luar jam kerja, atau merapikan pencatatan stok dan proyek.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan halaman web atau proses operasional yang paling butuh dirapikan terlebih dahulu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai kompleksitas fitur dan integrasi sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Serpong District wants to appear clearly on mobile searches, reply to after-hours booking chats, or organize inventory and project records.',
      mulaiDari:
        'A free 30-minute audit to map out the webpage or operational workflow that needs attention first.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on feature complexity and system integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Serpong butuh ini',
    whyNeedHeadingEn: 'Why businesses in Serpong need this',
    whyNeedParagraphsId: [
      'Serpong merupakan kecamatan di Kota Tangerang Selatan yang mencakup kawasan permukiman serta koridor komersial yang aktif. Di wilayah Kecamatan Serpong ini, umumnya beroperasi berbagai usaha seperti klinik, kafe dan restoran, kontraktor, agen properti, bimbel, toko online, dan jasa profesional yang melayani kebutuhan harian warga maupun pelaku bisnis.',
      'Pelanggan di Serpong biasanya mencari penyedia layanan lewat ponsel dan mengharapkan informasi yang ringkas: apa saja cakupan jasanya, berapa kisaran harganya, dan bagaimana cara memesan jadwal. Apabila sebuah usaha hanya mengandalkan unggahan media sosial yang tertumpuk tanpa halaman web yang terstruktur, calon pelanggan umumnya kesulitan menemukan informasi penting.',
      'Pada saat yang sama, tim operasional di Serpong biasanya harus mengelola komunikasi pelanggan di WhatsApp sambil mengurus jadwal lapangan atau ketersediaan barang. Membangun AI agent, software pencatatan custom, atau otomasi workflow membantu tim menyatukan data pesanan dan jadwal di satu alur yang rapi.',
    ],
    whyNeedParagraphsEn: [
      'Serpong is a district in South Tangerang City encompassing active residential neighborhoods and commercial corridors. Across Serpong District, businesses commonly include clinics, cafes and restaurants, contractors, property agencies, tutoring centers, online shops, and professional services serving daily resident and commercial needs.',
      'Customers in Serpong typically search for service providers on their phones and expect concise details: what the service covers, starting price ranges, and how to book. When a business relies solely on buried social media posts without a structured website, prospective customers usually struggle to find key information.',
      'At the same time, operational teams in Serpong typically juggle WhatsApp customer inquiries while coordinating field schedules or stock availability. Building an AI agent, custom tracking software, or workflow automation helps unify order data and schedules into one reliable flow.',
    ],
    typicalBusinessMixId: [
      'Klinik kesehatan dan perawatan di sepanjang koridor komersial Serpong',
      'Kafe, restoran, dan usaha kuliner yang melayani makan di tempat maupun pesanan antar',
      'Kontraktor, bengkel interior, dan agen properti di kawasan permukiman Serpong',
      'Jasa profesional, bimbel, dan toko online yang beroperasi di wilayah Serpong',
    ],
    typicalBusinessMixEn: [
      'Health and care clinics along Serpong commercial corridors',
      'Cafes, restaurants, and food businesses serving dine-in and delivery orders',
      'Contractors, interior workshops, and property agencies across Serpong neighborhoods',
      'Professional services, tutoring centers, and online shops operating in Serpong',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website katalog layanan dan booking survei untuk kontraktor interior',
        titleEn: 'Service catalog and survey booking website for an interior contractor',
        businessTypeId: 'Kontraktor di Kecamatan Serpong',
        businessTypeEn: 'Contractor in Serpong District',
        narrativeId:
          'Calon klien yang baru membeli atau merenovasi hunian di Serpong umumnya ingin melihat tahapan pengerjaan, jenis material, dan cara pengajuan survei. Kami membuat website cepat dibuka di HP yang menampilkan alur kerja kontraktor serta tombol WhatsApp dengan pesan terformat.',
        narrativeEn:
          'Prospective clients renovating homes in Serpong usually want to see work stages, material options, and how to request a site survey. We build a fast mobile website presenting the contractor’s process and a pre-filled WhatsApp inquiry button.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp untuk penjadwalan konsultasi jasa profesional',
        titleEn: 'WhatsApp assistant for professional service consultation scheduling',
        businessTypeId: 'Jasa profesional di Serpong',
        businessTypeEn: 'Professional service firm in Serpong',
        narrativeId:
          'Kantor konsultan dan jasa profesional sering menerima pertanyaan awal di luar jam kantor. AI agent menanyakan kebutuhan dasar calon klien, memeriksa slot kosong di kalender konsultan, mengunci jadwal pertemuan online atau tatap muka, dan mengirim ringkasannya ke tim.',
        narrativeEn:
          'Consulting and professional service offices frequently receive initial inquiries outside business hours. An AI agent gathers baseline client needs, checks open calendar slots, locks in an online or in-person meeting, and sends a summary to the team.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Sistem pencatatan stok bahan baku dan pengeluaran dapur untuk kafe',
        titleEn: 'Raw ingredient inventory and kitchen expense system for a cafe',
        businessTypeId: 'Kafe dan restoran di Serpong',
        businessTypeEn: 'Cafe and restaurant in Serpong',
        narrativeId:
          'Selisih stok bahan baku harian sering baru ketahuan di akhir bulan ketika rekap masih dicatat di kertas. Kami merancang aplikasi web ringan agar staf dapur mencatat pemakaian bahan dari HP setiap tutup operasional dan pemilik melihat peringatan stok menipis.',
        narrativeEn:
          'Daily ingredient discrepancies often go unnoticed until month-end when logs are kept on paper. We build a lightweight web app so kitchen staff log ingredient usage from their phones at closing and owners receive low-stock alerts.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pengingat kontrol ulang pasien dan rekap kunjungan klinik',
        titleEn: 'Automated patient follow-up reminders and clinic visit summaries',
        businessTypeId: 'Klinik di kawasan permukiman Serpong',
        businessTypeEn: 'Clinic in a Serpong residential area',
        narrativeId:
          'Admin klinik biasanya harus memeriksa daftar pasien minggu lalu satu per satu untuk mengingatkan jadwal kontrol berikutnya. Dengan otomasi workflow, sistem membaca tanggal kontrol dari tabel rekam jadwal lalu mengirim pesan pengingat WhatsApp secara terjadwal.',
        narrativeEn:
          'Clinic admins usually review last week’s patient list manually to send follow-up visit reminders. With workflow automation, the system reads follow-up dates from the schedule table and sends scheduled WhatsApp reminders automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Serpong',
    howWeWorkHeadingEn: 'How we work with clients in Serpong',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan—tepat di wilayah Serpong. Koordinasi harian seperti diskusi rancangan, pengiriman materi, dan pengujian sistem berjalan secara online lewat WhatsApp dan video call.',
      'Pertemuan tatap muka di area Serpong dan Tangerang Selatan juga dapat dijadwalkan sesuai kesepakatan bersama. Setiap proyek ditangani langsung oleh Chesta Azka dan Zeeshan melalui empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang—right within the Serpong area. Daily coordination such as design discussions, content handoffs, and system testing runs online via WhatsApp and video call.',
      'In-person meetings in Serpong and across South Tangerang can also be scheduled by agreement. Every project is handled directly by Chesta Azka and Zeeshan through four clear steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan kebutuhan website atau alur operasional bisnismu di Serpong sebelum kamu mengeluarkan biaya.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu memeriksa rancangan tampilan halaman atau alur kerja sistem sebelum tahap pembangunan penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Halaman atau aplikasi dibangun dan diuji langsung di HP serta skenario kerja timmu sehari-hari.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Sistem tayang di atas domain dan akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map out your website or operational workflow needs in Serpong before you spend anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout or system workflow design before full development begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The website or application is built and tested on mobile phones and against your daily team scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'The system launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang dapat disesuaikan dengan kebutuhan bisnis di Kecamatan Serpong:',
    servicesIntroEn:
      'Four core services tailored to the needs of businesses in Serpong District:',
    faqsId: [
      {
        question: 'Apakah lokasi CHESTAADOTCOM dekat dengan Kecamatan Serpong?',
        answer:
          'Ya, kami berbasis di BSD, Tangerang Selatan. Komunikasi harian dilakukan secara online via WhatsApp dan video call, dan kita bisa menjadwalkan pertemuan tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Apakah saya bisa memesan pembuatan website dulu lalu menambah AI agent belakangan?',
        answer:
          'Tentu bisa. Banyak pelaku usaha memulai dari website mulai Rp1.200.000 agar informasi layanan rapi terlebih dahulu, lalu menambahkan AI agent atau otomasi setelah alur chat pelanggannya semakin ramai.',
      },
      {
        question: 'Kapan saya mengetahui rincian biaya pasti untuk pembuatan sistem?',
        answer:
          'Kamu menerima rincian biaya dan cakupan kerja secara tertulis setelah sesi audit gratis 30 menit selesai, sebelum kamu membayar atau menyepakati proyek apa pun.',
      },
    ],
    faqsEn: [
      {
        question: 'Is CHESTAADOTCOM located close to Serpong District?',
        answer:
          'Yes, we are based in BSD, South Tangerang. Daily communication runs online via WhatsApp and video call, and we can schedule in-person meetings in the South Tangerang area by agreement.',
      },
      {
        question: 'Can I start with a website first and add an AI agent later?',
        answer:
          'Certainly. Many business owners start with a website from IDR 1,200,000 to organize their service information first, then add an AI agent or workflow automation once customer chat volume grows.',
      },
      {
        question: 'When will I know the exact cost for building a custom system?',
        answer:
          'You receive a written breakdown of pricing and scope right after the free 30-minute audit session, before you pay or commit to anything.',
      },
    ],
    ctaHeadingId: 'Mulai dari audit gratis 30 menit untuk bisnismu di Serpong',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Serpong',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk membedah kebutuhan website, AI agent, atau sistem operasional usahamu di Serpong.',
    ctaBodyEn:
      'Contact us on WhatsApp to review your website, AI agent, or operational system needs in Serpong.',
  },

  // 6. CIPUTAT (Kecamatan di Tangsel, Wave 1 Live)
  {
    slug: 'ciputat',
    nameId: 'Ciputat',
    nameEn: 'Ciputat',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'Kecamatan Ciputat, Tangerang Selatan',
    regionLabelEn: 'Ciputat District, South Tangerang',
    schemaType: 'AdministrativeArea',
    wave: 1,
    publishAt: '2026-10-29',
    hasServiceAreaPages: false,
    nearbySlugs: ['pamulang', 'tangerang-selatan', 'lebak-bulus', 'pondok-aren', 'bintaro'],
    factsSummaryId:
      'Kecamatan di Kota Tangerang Selatan dengan kawasan permukiman dan usaha harian warga.',
    factsSummaryEn:
      'A district in South Tangerang City with residential neighborhoods and daily local businesses.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Kecamatan Ciputat, Tangerang Selatan. Website mulai Rp1.200.000.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Ciputat District, South Tangerang. Websites from IDR 1,200,000.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk pelaku usaha di Kecamatan Ciputat, Tangerang Selatan. Dirancang bagi klinik, kafe dan restoran, kos-kosan, bimbel, toko online, maupun kontraktor. Website mulai Rp1.200.000, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for business owners in Ciputat District, South Tangerang. Built for clinics, cafes and restaurants, boarding houses, tutoring centers, online shops, and contractors. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Kecamatan Ciputat ingin mempermudah pelanggan mengecek layanan lewat HP, menanggapi chat WhatsApp dengan cepat, atau merapikan pembukuan pesanan harian.',
      mulaiDari:
        'Audit gratis 30 menit untuk melihat halaman atau alur kerja yang ada saat ini sebelum kamu memutuskan langkah berikutnya.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai kebutuhan halaman, tool, dan aturan bisnis.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Ciputat District wants to make it easy for customers to check services on mobile, respond quickly on WhatsApp, or organize daily order records.',
      mulaiDari:
        'A free 30-minute audit to inspect your current pages or workflow before you decide on the next step.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on pages, tools, and business rules.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Ciputat butuh ini',
    whyNeedHeadingEn: 'Why businesses in Ciputat need this',
    whyNeedParagraphsId: [
      'Ciputat adalah kecamatan di Kota Tangerang Selatan yang memiliki banyak kawasan permukiman serta jalur aktivitas harian warga. Di wilayah Kecamatan Ciputat ini, umumnya berjalan beragam usaha seperti klinik, kafe dan restoran, kos-kosan, bimbel, toko online, jasa profesional, dan kontraktor.',
      'Calon pelanggan di Ciputat biasanya mengandalkan pencarian di HP untuk memeriksa jam buka, rincian harga, serta lokasi usaha sebelum datang atau memesan. Ketika informasi tersebut tersebar di banyak unggahan lama atau belum memiliki halaman web tersendiri, sebagian besar pengunjung umumnya ragu dan menunda menghubungi.',
      'Dalam operasional sehari-hari, pemilik usaha di Ciputat biasanya merangkap banyak peran sekaligus—mulai dari melayani pelanggan hingga mengecek stok dan tagihan. Mengotomatiskan balasan awal WhatsApp dengan AI agent atau menyatukan rekap transaksi di aplikasi web custom membuat waktu tim tidak habis untuk pekerjaan salin-tempel.',
    ],
    whyNeedParagraphsEn: [
      'Ciputat is a district in South Tangerang City with extensive residential neighborhoods and daily commuter activity. Across Ciputat District, businesses commonly include clinics, cafes and restaurants, boarding houses, tutoring centers, online shops, professional services, and contractors.',
      'Prospective customers in Ciputat usually rely on mobile searches to check opening hours, pricing details, and business locations before visiting or ordering. When that information is scattered across old social posts without a dedicated webpage, many visitors hesitate to reach out.',
      'In day-to-day operations, business owners in Ciputat typically wear multiple hats—handling customer chats while checking stock and invoices. Automating initial WhatsApp replies with an AI agent or consolidating transaction logs in a custom web app frees your team from repetitive copy-pasting.',
    ],
    typicalBusinessMixId: [
      'Kafe, restoran, dan usaha kuliner harian di koridor komersial Ciputat',
      'Kos-kosan dan properti sewa di kawasan permukiman Kecamatan Ciputat',
      'Bimbel, kursus, dan klinik kesehatan keluarga yang melayani warga sekitar',
      'Toko online, jasa profesional, dan kontraktor renovasi di wilayah Ciputat',
    ],
    typicalBusinessMixEn: [
      'Cafes, restaurants, and daily food businesses along Ciputat commercial corridors',
      'Boarding houses and rental properties across Ciputat residential neighborhoods',
      'Tutoring centers, courses, and family health clinics serving local residents',
      'Online shops, professional services, and renovation contractors in Ciputat',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website menu paket dan pemesanan katering untuk usaha kuliner',
        titleEn: 'Package menu and catering order website for a food business',
        businessTypeId: 'Kafe dan restoran di Ciputat',
        businessTypeEn: 'Cafe and restaurant in Ciputat',
        narrativeId:
          'Pelanggan yang ingin memesan paket nasi kotak atau katering acara keluarga biasanya meminta daftar menu dan harga berulang kali lewat chat. Kami merancang halaman web yang ringan di HP berisi pilihan paket, ketentuan pemesanan, dan tombol WhatsApp yang langsung merangkum pesanan pelanggan.',
        narrativeEn:
          'Customers ordering meal boxes or family event catering usually ask for menu lists and pricing repeatedly in chat. We build a lightweight mobile webpage showing package options, ordering terms, and a WhatsApp button that summarizes their selection.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Penyaringan calon penyewa kos dan penjadwalan lihat kamar',
        titleEn: 'Prospective tenant screening and room viewing scheduler',
        businessTypeId: 'Kos-kosan di Ciputat',
        businessTypeEn: 'Boarding house in Ciputat',
        narrativeId:
          'Pemilik kos sering menerima pesan menanyakan sisa kamar di tengah kesibukan lain. AI agent WhatsApp menjawab ketersediaan tipe kamar, menjelaskan aturan dan tarif bulanan, mencatat jadwal kunjungan calon penyewa ke kalender, dan memberi tahu penjaga kos.',
        narrativeEn:
          'Boarding house owners frequently receive room availability messages while busy with other tasks. A WhatsApp AI agent answers room type availability, explains rules and monthly rates, books viewing times on the calendar, and notifies the caretaker.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pencatatan jadwal pengajar dan pembayaran iuran bimbel',
        titleEn: 'Tutor schedule and tuition payment tracker for a tutoring center',
        businessTypeId: 'Bimbel di Kecamatan Ciputat',
        businessTypeEn: 'Tutoring center in Ciputat District',
        narrativeId:
          'Mencocokkan jam mengajar tutor paruh waktu dengan status pembayaran bulanan siswa sering memicu salah hitung jika memakai banyak file terpisah. Kami membangun aplikasi web terpusat agar admin bimbel mencatat kehadiran kelas dan memantau iuran siswa dengan mudah.',
        narrativeEn:
          'Matching part-time tutor hours with student monthly tuition statuses often causes errors when spread across separate files. We build a centralized web app so tutoring admins log class attendance and track tuition payments effortlessly.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi rekap penjualan harian toko online ke laporan keuangan',
        titleEn: 'Automated daily online shop sales sync to financial summaries',
        businessTypeId: 'Toko online di Ciputat',
        businessTypeEn: 'Online shop in Ciputat',
        narrativeId:
          'Setiap malam, admin toko online biasanya merekap pesanan yang sudah lunas satu per satu untuk menghitung omzet harian. Otomasi workflow mengumpulkan data pesanan terkonfirmasi secara otomatis ke tabel laporan harian dan mengirimkan ringkasannya ke WhatsApp pemilik usaha.',
        narrativeEn:
          'Every evening, online shop admins typically tally paid orders one by one to calculate daily revenue. Workflow automation gathers confirmed order data into the daily report sheet automatically and sends a summary to the owner’s WhatsApp.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Ciputat',
    howWeWorkHeadingEn: 'How we work with clients in Ciputat',
    howWeWorkParagraphsId: [
      'Berbasis di BSD, Tangerang Selatan, CHESTAADOTCOM mendampingi pelaku usaha di Kecamatan Ciputat secara online melalui WhatsApp dan video call untuk seluruh tahapan diskusi hingga rilis.',
      'Karena masih berada di dalam Kota Tangerang Selatan, pertemuan tatap muka juga dapat dijadwalkan sesuai kesepakatan apabila dibutuhkan. Empat langkah kerja kami memastikan setiap proyek berjalan terukur.',
    ],
    howWeWorkParagraphsEn: [
      'Based in BSD, South Tangerang, CHESTAADOTCOM supports business owners in Ciputat District online via WhatsApp and video call across every stage from initial discussion to launch.',
      'Because Ciputat is within South Tangerang City, in-person meetings can also be scheduled by agreement when needed. Our four-step process keeps every project predictable.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan website atau kendala operasional harian usahamu di Ciputat sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, aturan balasan AI agent, atau rancangan layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung di layar HP serta skenario percakapan atau pencatatan nyata.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di akun milikmu sendiri, dengan dukungan pemantauan dan perawatan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website needs or daily operational bottlenecks in Ciputat before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page layout, AI agent reply rules, or application screen designs before full build begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile screens and practical conversation or logging scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or application launches on your own accounts, backed by ongoing monitoring and maintenance.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat kamu gunakan untuk mengembangkan usaha di Kecamatan Ciputat:',
    servicesIntroEn:
      'Four services you can use to streamline and grow your business in Ciputat District:',
    faqsId: [
      {
        question: 'Apakah audit gratis 30 menit mengharuskan saya langsung memesan layanan?',
        answer:
          'Tidak sama sekali. Sesi audit 30 menit bertujuan melihat apakah masalah di usahamu di Ciputat memang cocok diselesaikan dengan website, AI agent, atau otomasi sebelum kamu memutuskan apa pun.',
      },
      {
        question: 'Berapa biaya pembuatan landing page untuk usaha di Ciputat?',
        answer:
          'Landing page mulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur yang dibutuhkan. Untuk AI agent, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis.',
      },
      {
        question: 'Apakah komunikasi pengerjaan harus selalu tatap muka?',
        answer:
          'Tidak harus. Kerja sehari-hari berlangsung online lewat WhatsApp dan video call supaya praktis, sementara pertemuan tatap muka di area Tangerang Selatan dapat dijadwalkan sesuai kesepakatan.',
      },
    ],
    faqsEn: [
      {
        question: 'Does the free 30-minute audit obligate me to order a service right away?',
        answer:
          'Not at all. The 30-minute audit is designed to check whether your business challenge in Ciputat is genuinely worth solving with a website, AI agent, or automation before you make any decision.',
      },
      {
        question: 'How much does a landing page cost for a business in Ciputat?',
        answer:
          'A landing page starts at IDR 1,200,000 depending on page and feature complexity. For AI agents, custom software, and workflow automation, pricing is calculated after the free audit.',
      },
      {
        question: 'Does project communication always require in-person meetings?',
        answer:
          'No. Day-to-day work runs online via WhatsApp and video call for convenience, while in-person meetings in the South Tangerang area can be scheduled by agreement.',
      },
    ],
    ctaHeadingId: 'Jadwalkan audit gratis 30 menit untuk usahamu di Ciputat',
    ctaHeadingEn: 'Schedule a free 30-minute audit for your business in Ciputat',
    ctaBodyId:
      'Kirim pesan WhatsApp ke tim kami untuk mendiskusikan kebutuhan website, AI agent, atau sistem kerja usahamu di Ciputat.',
    ctaBodyEn:
      'Send a WhatsApp message to our team to discuss your website, AI agent, or operational system needs in Ciputat.',
  },

  // 7. PONDOK AREN (Kecamatan di Tangsel, Wave 1 Live)
  {
    slug: 'pondok-aren',
    nameId: 'Pondok Aren',
    nameEn: 'Pondok Aren',
    regionGroup: 'tangerang-selatan',
    regionLabelId: 'Kecamatan Pondok Aren, Tangerang Selatan',
    regionLabelEn: 'Pondok Aren District, South Tangerang',
    schemaType: 'AdministrativeArea',
    wave: 1,
    publishAt: '2026-10-29',
    hasServiceAreaPages: false,
    nearbySlugs: ['bintaro', 'jurang-mangu', 'ciputat', 'tangerang-selatan', 'serpong'],
    factsSummaryId:
      'Kecamatan di Kota Tangerang Selatan yang mencakup kawasan permukiman dan koridor komersial.',
    factsSummaryEn:
      'A district in South Tangerang City covering residential neighborhoods and commercial corridors.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Pondok Aren, Tangerang Selatan. Mulai Rp1.200.000, audit gratis.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Pondok Aren, South Tangerang. From IDR 1.2M, free 30m audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di Kecamatan Pondok Aren, Tangerang Selatan. Cocok bagi klinik, kafe dan restoran, kontraktor, bimbel, properti, maupun jasa profesional. Website mulai Rp1.200.000, sedangkan sistem dan otomasi dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Pondok Aren District, South Tangerang. Built for clinics, cafes and restaurants, contractors, tutoring centers, property agencies, and professional services. Websites start at IDR 1,200,000, with systems quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Kecamatan Pondok Aren ingin punya halaman web yang cepat dibuka di HP, menangani chat reservasi di luar jam kerja, atau merapikan pencatatan tim.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau alur operasional bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, integrasi tool, dan aturan bisnis.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Pondok Aren District wants a fast mobile website, automated after-hours booking chat handling, or cleaner team record-keeping.',
      mulaiDari:
        'A free 30-minute audit to review your current website or operational flow before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, tool integrations, and business rules.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Pondok Aren butuh ini',
    whyNeedHeadingEn: 'Why businesses in Pondok Aren need this',
    whyNeedParagraphsId: [
      'Pondok Aren adalah kecamatan di Kota Tangerang Selatan yang mencakup kawasan permukiman luas serta koridor komersial yang ramai. Di wilayah Kecamatan Pondok Aren, umumnya beroperasi berbagai klinik, kafe dan restoran, kontraktor, bimbel, toko online, properti, serta jasa profesional.',
      'Warga di Pondok Aren biasanya mencari layanan keluarga maupun kebutuhan rumah tangga melalui ponsel dan membandingkan kejelasan informasi antar penyedia jasa. Jika sebuah usaha belum memiliki halaman web yang merangkum daftar layanan, kisaran harga, serta tombol kontak yang mudah diakses, calon pelanggan umumnya beralih ke penyedia lain yang informasinya lebih siap.',
      'Di sisi pengelolaan harian, banyak usaha di Pondok Aren biasanya masih mengandalkan satu admin WhatsApp untuk menjawab pertanyaan berulang sambil mencatat jadwal ke tabel manual. Menghubungkan AI agent, software custom, atau otomasi workflow membantu menjaga respons tetap sigap dan pencatatan tetap akurat.',
    ],
    whyNeedParagraphsEn: [
      'Pondok Aren is a district in South Tangerang City encompassing broad residential neighborhoods and active commercial corridors. Across Pondok Aren District, businesses commonly include clinics, cafes and restaurants, contractors, tutoring centers, online shops, property agencies, and professional services.',
      'Residents in Pondok Aren typically search for family and household services on their phones and compare how clearly each provider presents its information. When a business lacks a webpage summarizing its services, starting price ranges, and direct contact buttons, prospective customers usually move on to a clearer alternative.',
      'On the daily management side, many businesses in Pondok Aren rely on a single WhatsApp admin to answer repetitive questions while entering schedules into manual sheets. Connecting an AI agent, custom software, or workflow automation keeps responses prompt and records accurate.',
    ],
    typicalBusinessMixId: [
      'Klinik kesehatan, praktik dokter gigi, dan perawatan di kawasan permukiman Pondok Aren',
      'Kafe, restoran, dan usaha kuliner di sepanjang koridor komersial Pondok Aren',
      'Kontraktor renovasi, bengkel interior, dan agen properti lokal',
      'Bimbel, kursus, toko online, dan jasa profesional di wilayah Pondok Aren',
    ],
    typicalBusinessMixEn: [
      'Health clinics, dental practices, and care services across Pondok Aren residential areas',
      'Cafes, restaurants, and food businesses along Pondok Aren commercial corridors',
      'Renovation contractors, interior workshops, and local property agencies',
      'Tutoring centers, courses, online shops, and professional services in Pondok Aren',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Halaman jadwal kelas dan pendaftaran uji coba untuk tempat kursus',
        titleEn: 'Class schedule and trial registration page for a course center',
        businessTypeId: 'Bimbel dan kursus di Pondok Aren',
        businessTypeEn: 'Tutoring and course center in Pondok Aren',
        narrativeId:
          'Orang tua yang mencari tempat les atau kursus bagi anaknya di Pondok Aren biasanya ingin mengetahui kelompok usia, jadwal hari belajar, dan biaya pendaftaran sebelum menghubungi. Kami membuat halaman web yang ringan di HP dengan tombol pengajuan kelas uji coba langsung ke WhatsApp.',
        narrativeEn:
          'Parents looking for tutoring or courses for their children in Pondok Aren usually want to check age groups, class days, and registration fees before messaging. We build a lightweight mobile webpage with a direct WhatsApp trial-class booking button.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Penanganan tanya jawab layanan dan jadwal survei untuk kontraktor',
        titleEn: 'Service Q&A and site survey scheduling for a contractor',
        businessTypeId: 'Kontraktor di Kecamatan Pondok Aren',
        businessTypeEn: 'Contractor in Pondok Aren District',
        narrativeId:
          'Calon pelanggan yang ingin merenovasi atap, dapur, atau ruangan sering mengirim pesan di malam hari. AI agent WhatsApp mengumpulkan lokasi kelurahan di Pondok Aren, jenis pekerjaan yang dibutuhkan, serta foto kondisi awal, lalu menjadwalkan waktu survei ke kalender tim.',
        narrativeEn:
          'Homeowners planning roof, kitchen, or room renovations often message late in the evening. A WhatsApp AI agent collects the subdistrict location in Pondok Aren, work type, and initial condition photos, then books a survey slot on the team calendar.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Dashboard riwayat servis dan pengingat perawatan berkala pelanggan',
        titleEn: 'Service history and periodic maintenance reminder dashboard',
        businessTypeId: 'Jasa perawatan dan servis di Pondok Aren',
        businessTypeEn: 'Maintenance and repair service in Pondok Aren',
        narrativeId:
          'Usaha jasa perawatan rumah tangga sering kehilangan pesanan berulang karena riwayat servis pelanggan hanya tersimpan di nota kertas. Kami membangun aplikasi web untuk mencatat tanggal pengerjaan tiap rumah, teknisi yang bertugas, dan daftar pelanggan yang sudah waktunya dihubungi kembali.',
        narrativeEn:
          'Home maintenance businesses often miss repeat orders because customer service histories sit only on paper receipts. We build a web app to log service dates per household, assigned technicians, and a list of customers due for periodic maintenance.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi konfirmasi booking klinik dan rekap pembayaran harian',
        titleEn: 'Automated clinic booking confirmation and daily payment summary',
        businessTypeId: 'Klinik di Pondok Aren',
        businessTypeEn: 'Clinic in Pondok Aren',
        narrativeId:
          'Setiap kali resepsionis menginput jadwal pasien baru, otomasi workflow langsung mengirimkan pesan konfirmasi beserta petunjuk lokasi via WhatsApp, menandai slot kalender dokter, dan menyusun rekap kunjungan harian secara otomatis di sore hari.',
        narrativeEn:
          'Whenever the front desk enters a new patient appointment, workflow automation sends a WhatsApp confirmation with location directions, marks the doctor’s calendar slot, and compiles a daily visit summary automatically each evening.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Pondok Aren',
    howWeWorkHeadingEn: 'How we work with clients in Pondok Aren',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Seluruh proses koordinasi harian bersama pelaku usaha di Kecamatan Pondok Aren dilakukan secara online lewat WhatsApp dan video call agar ringkas dan hemat waktu.',
      'Pertemuan tatap muka di area Pondok Aren maupun Tangerang Selatan juga bisa dijadwalkan sesuai kesepakatan bersama. Kami menjalankan setiap proyek melalui empat langkah kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. All daily coordination with business owners in Pondok Aren District takes place online via WhatsApp and video call to keep things fast and convenient.',
      'In-person meetings in Pondok Aren or across South Tangerang can also be scheduled by agreement. We run every project through four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau alur operasional bisnismu di Pondok Aren sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau rancangan struktur halaman, aturan tindakan AI agent, atau layar aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Sistem dibangun dan diuji langsung pada perangkat HP serta skenario kerja harian timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman atau aplikasi tayang di atas domain serta akun milikmu sendiri, disertai opsi pemantauan berkala.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your website or operational workflow needs in Pondok Aren before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure, AI agent action rules, or app screens before full development starts.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The system is built and tested directly on mobile devices and your team’s daily scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and maintain',
        sentence:
          'Your website or app launches on your own domain and accounts, with optional ongoing monitoring.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat dipilih sesuai kebutuhan bisnismu di Kecamatan Pondok Aren:',
    servicesIntroEn:
      'Four services you can choose based on your business needs in Pondok Aren District:',
    faqsId: [
      {
        question: 'Apakah tim CHESTAADOTCOM melayani kelurahan-kelurahan di dalam Kecamatan Pondok Aren?',
        answer:
          'Ya, kami melayani seluruh wilayah Kecamatan Pondok Aren—termasuk Jurang Mangu dan kawasan sekitarnya—baik secara online lewat WhatsApp dan video call maupun tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Berapa biaya awal untuk membuat website usaha di Pondok Aren?',
        answer:
          'Pembuatan website dimulai dari Rp1.200.000 tergantung kompleksitas halaman dan fitur. Layanan AI agent, software custom, dan otomasi workflow dihitung setelah audit gratis 30 menit.',
      },
      {
        question: 'Apakah data pelanggan yang masuk lewat website atau AI agent aman?',
        answer:
          'Data pelanggan sepenuhnya menjadi milik bisnismu dan disimpan di akun atau database atas namamu sendiri. Akses kami hanya digunakan selama pembangunan dan perawatan, lalu dicabut saat kontrak berakhir.',
      },
    ],
    faqsEn: [
      {
        question: 'Does CHESTAADOTCOM serve subdistricts across Pondok Aren District?',
        answer:
          'Yes, we serve all of Pondok Aren District—including Jurang Mangu and surrounding neighborhoods—both online via WhatsApp and video call and in person in the South Tangerang area by agreement.',
      },
      {
        question: 'What is the starting cost for a business website in Pondok Aren?',
        answer:
          'Website development starts at IDR 1,200,000 depending on page and feature complexity. AI agents, custom software, and workflow automation are quoted after the free 30-minute audit.',
      },
      {
        question: 'Is customer data collected through the website or AI agent kept secure?',
        answer:
          'Customer data belongs entirely to your business and is stored in accounts or databases under your own name. Our access is used strictly during build and maintenance, and revoked when the contract ends.',
      },
    ],
    ctaHeadingId: 'Mulai dengan audit gratis 30 menit untuk bisnismu di Pondok Aren',
    ctaHeadingEn: 'Start with a free 30-minute audit for your business in Pondok Aren',
    ctaBodyId:
      'Hubungi kami lewat WhatsApp untuk memetakan kebutuhan website, AI agent, atau sistem kerja usahamu di Pondok Aren.',
    ctaBodyEn:
      'Message us on WhatsApp to map out your website, AI agent, or operational system needs in Pondok Aren.',
  },
];
