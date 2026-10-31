import type { UnifiedAreaSeed } from './unified-areas-types';

export const UNIFIED_AREAS_GREATER_B: UnifiedAreaSeed[] = [
  // 23. CINERE (Kota Depok, Wave 4)
  {
    slug: 'cinere',
    nameId: 'Cinere',
    nameEn: 'Cinere',
    regionGroup: 'kota-depok',
    regionLabelId: 'Cinere, Kota Depok',
    regionLabelEn: 'Cinere, Depok City',
    schemaType: 'AdministrativeArea',
    wave: 4,
    publishAt: '2026-11-19',
    hasServiceAreaPages: false,
    nearbySlugs: ['lebak-bulus', 'pondok-cabe', 'cilandak', 'depok'],
    factsSummaryId:
      'Kawasan di Kota Depok yang berdekatan dengan Pondok Cabe dan Lebak Bulus, mencakup kawasan permukiman dan koridor komersial.',
    factsSummaryEn:
      'An area in Depok City adjacent to Pondok Cabe and Lebak Bulus, encompassing residential neighborhoods and commercial corridors.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow di Cinere, Kota Depok. Mulai Rp1.200.000 dengan audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and workflow automation in Cinere, Depok City. From IDR 1.2M with a free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di Cinere, Kota Depok. Cocok bagi klinik, kafe dan restoran, bimbel, toko online, kontraktor, maupun jasa profesional. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Cinere, Depok City. Built for clinics, cafes and restaurants, tutoring centers, online shops, contractors, and professional services. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di kawasan permukiman atau koridor komersial Cinere butuh website yang jelas di HP, balasan chat WhatsApp 24/7, atau sistem pencatatan kerja yang rapi.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan kebutuhan website atau alur operasional bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai jumlah halaman, aturan AI agent, dan integrasi sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Cinere’s residential areas or commercial corridors needs a clear mobile website, 24/7 WhatsApp chat replies, or structured work records.',
      mulaiDari:
        'A free 30-minute audit to map your website needs or operational workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page count, AI agent rules, and system integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Cinere butuh ini',
    whyNeedHeadingEn: 'Why businesses in Cinere need this',
    whyNeedParagraphsId: [
      'Cinere berada di bagian utara Kota Depok yang berdekatan dengan Pondok Cabe dan Lebak Bulus, dengan karakter kawasan permukiman keluarga serta koridor komersial. Di Cinere, umumnya beroperasi usaha seperti klinik kesehatan dan gigi, kafe dan restoran, bimbel, toko online, kos-kosan, kontraktor renovasi, serta jasa profesional.',
      'Warga di kawasan permukiman Cinere biasanya mencari layanan harian melalui pencarian Google di HP sebelum memutuskan berkunjung atau menghubungi admin. Website yang memuat daftar layanan, jam praktik atau operasional, kisaran harga awal, serta tombol WhatsApp yang langsung terhubung umumnya membantu calon pelanggan mengambil keputusan tanpa ragu.',
      'Ketika jumlah chat pertanyaan jadwal dokter, reservasi meja, atau survei renovasi meningkat di luar jam kerja, balasan manual sering terlambat dan pencatatan di buku agenda mudah terselip. Menggabungkan AI agent WhatsApp, aplikasi web custom, dan otomasi workflow membantu timmu di Cinere menjaga kecepatan respons sekaligus ketertiban data.',
    ],
    whyNeedParagraphsEn: [
      'Cinere is located in northern Depok City adjacent to Pondok Cabe and Lebak Bulus, featuring family residential neighborhoods and commercial corridors. Businesses operating in Cinere commonly include health and dental clinics, cafes and restaurants, tutoring centers, online shops, boarding houses, renovation contractors, and professional services.',
      'Residents across Cinere typically search for daily services on Google from their phones before visiting or messaging an admin. A website presenting service lists, operating hours, starting price ranges, and a direct WhatsApp button helps prospective customers decide with confidence.',
      'When chat inquiries about doctor schedules, table bookings, or renovation surveys spike outside office hours, manual replies often lag and paper agenda notes get lost. Combining a WhatsApp AI agent, custom web software, and workflow automation helps your Cinere team maintain fast responses and tidy data.',
    ],
    typicalBusinessMixId: [
      'Klinik kesehatan, gigi, dan perawatan keluarga di kawasan permukiman Cinere',
      'Kafe, restoran keluarga, dan katering rumahan di koridor komersial Cinere',
      'Bimbel, kursus anak, dan toko online yang melayani warga sekitar',
      'Jasa kontraktor renovasi rumah, properti, dan jasa profesional',
    ],
    typicalBusinessMixEn: [
      'Health, dental, and family care clinics across Cinere residential neighborhoods',
      'Cafes, family restaurants, and home catering along Cinere commercial corridors',
      'Tutoring centers, kids courses, and online shops serving nearby residents',
      'Home renovation contractors, property services, and professional firms',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website profil dokter, layanan poli, dan pendaftaran pasien klinik keluarga',
        titleEn: 'Doctor profile, clinic services, and patient booking website for a family clinic',
        businessTypeId: 'Klinik di Cinere',
        businessTypeEn: 'Clinic in Cinere',
        narrativeId:
          'Pasien keluarga di Cinere sering ingin mengecek jadwal praktik dokter anak atau dokter gigi sebelum datang. Kami merancang website yang ringan di HP dengan informasi jadwal terstruktur, estimasi biaya pemeriksaan dasar, dan tombol pendaftaran per poli yang langsung terarah ke WhatsApp klinik.',
        narrativeEn:
          'Family patients in Cinere frequently check pediatric or dental practice hours before visiting. We build a mobile-friendly website featuring structured schedules, baseline checkup fee estimates, and department booking buttons connected directly to the clinic’s WhatsApp.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp 24/7 untuk tanya jawab paket dan jadwal survei renovasi',
        titleEn: '24/7 WhatsApp assistant for package Q&A and renovation survey scheduling',
        businessTypeId: 'Kontraktor di Cinere',
        businessTypeEn: 'Contractor in Cinere',
        narrativeId:
          'Pemilik rumah di Cinere sering mengirim pesan malam hari untuk menanyakan perbaikan atap, renovasi dapur, atau ketersediaan jadwal survei tukang. AI agent menjawab cakupan layanan sesuai dokumen resmi, mengumpulkan alamat serta foto keluhan awal, lalu menjadwalkan kunjungan survei ke kalender tim.',
        narrativeEn:
          'Homeowners in Cinere often send late-evening messages asking about roof repairs, kitchen renovations, or survey slot availability. An AI agent answers service scope questions from official docs, collects addresses and initial issue photos, and books survey visits onto the team calendar.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pencatatan pesanan harian dan jadwal pengantaran katering rumahan',
        titleEn: 'Daily order logging and delivery route app for a home catering business',
        businessTypeId: 'Kafe dan restoran / katering di Cinere',
        businessTypeEn: 'Cafe, restaurant, and catering in Cinere',
        narrativeId:
          'Usaha katering langganan di Cinere sering kerepotan mencocokkan perubahan menu harian pelanggan, pantangan makanan, dan urutan pengantaran kurir pagi. Kami membangun web app operasional agar dapur dan kurir membaca daftar pesanan hari itu dari satu layar yang selalu mutakhir.',
        narrativeEn:
          'Subscription catering businesses in Cinere often struggle to match daily menu changes, dietary notes, and morning courier delivery sequences. We build an operational web app so kitchen and courier staff read the day’s orders from a single up-to-date screen.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pengingat jadwal les mingguan dan rekap perpanjangan SPP bimbel',
        titleEn: 'Automated weekly tutoring reminders and monthly tuition renewal recaps',
        businessTypeId: 'Bimbel di Cinere',
        businessTypeEn: 'Tutoring center in Cinere',
        narrativeId:
          'Admin bimbel di Cinere biasanya menghabiskan banyak waktu untuk mengingatkan jadwal kelas pengganti dan memeriksa status pembayaran SPP tiap awal bulan. Otomasi workflow mengirim pengingat WhatsApp terjadwal ke orang tua murid dan menyusun ringkasan tagihan lunas secara otomatis.',
        narrativeEn:
          'Tutoring admins in Cinere typically spend hours sending make-up class reminders and checking monthly tuition statuses. Workflow automation sends scheduled WhatsApp reminders to parents and compiles paid invoice summaries automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Cinere',
    howWeWorkHeadingEn: 'How we work with clients in Cinere',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Diskusi kebutuhan, tinjauan desain, hingga serah terima sistem bersama klien di Cinere dilakukan secara online melalui WhatsApp dan video call.',
      'Untuk klien yang membutuhkan diskusi tatap muka di area Tangerang Selatan, jadwal pertemuan dapat disepakati terlebih dahulu. Setiap proyek berjalan mengikuti empat tahapan berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Requirements discussions, design reviews, and system handovers with clients in Cinere take place online via WhatsApp and video call.',
      'For clients who prefer an in-person meeting within the South Tangerang area, sessions can be arranged by agreement. Every project follows four clear stages.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau alur kerja harian bisnismu di Cinere sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau rancangan struktur halaman, alur percakapan AI, atau skema aplikasi sebelum pengerjaan penuh dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun sistem secara bertahap dan mengujinya di berbagai perangkat serta skenario operasional nyata.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan ke domain atau nomor bisnismu lengkap dengan panduan operasional dan garansi perbaikan bug 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your webpage needs or daily business workflows in Cinere before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure, AI conversation flow, or application schema before full development starts.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system in stages and test it across real devices and operational scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system goes live on your domain or business number with operational guides and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang dapat kamu pilih sesuai prioritas bisnis di Cinere, mulai dari kehadiran website hingga otomasi operasional:',
    servicesIntroEn:
      'Four core services you can select based on your business priorities in Cinere, from web presence to operational automation:',
    faqsId: [
      {
        question: 'Apakah CHESTAADOTCOM melayani bisnis di Cinere meskipun berbasis di BSD?',
        answer:
          'Ya, kami melayani bisnis di Cinere, Kota Depok. Seluruh proses mulai dari audit gratis 30 menit, demo progres, hingga serah terima berjalan lancar via WhatsApp dan video call, atau tatap muka di area Tangerang Selatan dengan kesepakatan.',
      },
      {
        question: 'Berapa biaya pembuatan website dan sistem otomasi untuk usaha di Cinere?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000 dengan estimasi pengerjaan 1 sampai 3 minggu. Untuk AI agent WhatsApp, software custom, dan otomasi workflow, biayanya kami hitungkan secara transparan setelah sesi audit gratis 30 menit.',
      },
      {
        question: 'Apakah website atau aplikasi yang dibuat menjadi milik bisnis kami sepenuhnya?',
        answer:
          'Ya, seluruh kode sumber, akun domain, dan akses sistem diserahkan penuh kepadamu saat proyek selesai dan lunas. Tidak ada biaya sewa bulanan paksaan untuk mengunci aset website milikmu.',
      },
    ],
    faqsEn: [
      {
        question: 'Does CHESTAADOTCOM serve businesses in Cinere even though it is based in BSD?',
        answer:
          'Yes, we serve businesses in Cinere, Depok City. The entire process from the free 30-minute audit and progress demos to handover runs smoothly via WhatsApp and video call, or in person in the South Tangerang area by agreement.',
      },
      {
        question: 'How much do website development and automation systems cost for businesses in Cinere?',
        answer:
          'Website development starts at IDR 1,200,000 with an estimated timeline of 1 to 3 weeks. For WhatsApp AI agents, custom software, and workflow automation, pricing is calculated transparently after the free 30-minute audit.',
      },
      {
        question: 'Do we fully own the website or application once it is built?',
        answer:
          'Yes, all source code, domain accounts, and system access are handed over to you in full upon project completion and final payment. There are no forced monthly lock-in fees on your website assets.',
      },
    ],
    ctaHeadingId: 'Punya rencana merapikan website atau alur kerja bisnis di Cinere?',
    ctaHeadingEn: 'Planning to upgrade your business website or workflow in Cinere?',
    ctaBodyId:
      'Ceritakan proses kerja yang paling menyita waktu timmu di Cinere. Kita mulai dari audit gratis 30 menit via WhatsApp tanpa komitmen biaya di awal.',
    ctaBodyEn:
      'Tell us which workflow takes up the most time for your team in Cinere. Start with a free 30-minute audit via WhatsApp with no upfront commitment.',
  },

  // 24. DEPOK (Kota Depok, Wave 4)
  {
    slug: 'depok',
    nameId: 'Kota Depok',
    nameEn: 'Depok City',
    regionGroup: 'kota-depok',
    regionLabelId: 'Kota Depok',
    regionLabelEn: 'Depok City',
    schemaType: 'City',
    wave: 4,
    publishAt: '2026-11-19',
    hasServiceAreaPages: false,
    nearbySlugs: ['cinere', 'pondok-cabe', 'lebak-bulus', 'cilandak'],
    factsSummaryId:
      'Kota Depok mencakup kawasan permukiman, koridor komersial, serta area usaha pendidikan dan layanan warga.',
    factsSummaryEn:
      'Depok City encompasses residential neighborhoods, commercial corridors, and educational and community service business areas.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Kota Depok. Mulai Rp1.200.000 dengan audit alur kerja gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Depok City. Starting at IDR 1.2M with a free 30-minute workflow audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di Kota Depok. Dirancang bagi bimbel, kos-kosan, klinik, kafe dan restoran, toko online, properti, kontraktor, maupun jasa profesional. Harga mulai Rp1.200.000 untuk website, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Depok City. Designed for tutoring centers, boarding houses, clinics, cafes and restaurants, online shops, property, contractors, and professional services. Websites start at IDR 1,200,000, with other services quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Kota Depok menangani banyak chat pendaftaran atau pesanan setiap hari dan membutuhkan website resmi, asisten chat 24/7, atau sistem pencatatan terpusat.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk membedah alur akuisisi pelanggan dan pencatatan harian timmu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, skenario AI agent, dan fitur aplikasi.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Depok City handles daily registration or order chats and needs an official website, a 24/7 chat assistant, or centralized record-keeping.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to break down your customer intake and daily team recording flows.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, AI agent scenarios, and app features.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Kota Depok butuh ini',
    whyNeedHeadingEn: 'Why businesses in Depok City need this',
    whyNeedParagraphsId: [
      'Kota Depok memiliki perpaduan kawasan permukiman yang padat dan koridor komersial yang aktif. Di berbagai wilayah Kota Depok, umumnya tumbuh usaha seperti bimbel dan lembaga kursus, pengelolaan kos-kosan, klinik kesehatan, kafe dan restoran, toko online, properti, kontraktor, serta jasa profesional.',
      'Calon pelanggan di Kota Depok biasanya terbiasa mencari rincian program belajar, ketersediaan kamar sewa, atau katalog produk langsung dari layar HP. Tanpa halaman web yang jelas dan mudah dibaca, admin bisnis harus mengirim ulang penjelasan panjang yang sama puluhan kali sehari lewat chat.',
      'Selain itu, seiring bertambahnya jumlah siswa, penyewa kamar, atau transaksi harian, pencatatan di buku tulis dan lembar kerja yang terpisah-pisah biasanya mulai menimbulkan selisih tagihan dan keterlambatan rekap. Menerapkan website yang rapi bersama AI agent WhatsApp dan software operasional custom membuat alur kerja tim di Kota Depok jauh lebih terkendali.',
    ],
    whyNeedParagraphsEn: [
      'Depok City combines dense residential neighborhoods with active commercial corridors. Across Depok City, common businesses include tutoring centers and course institutes, boarding house management, health clinics, cafes and restaurants, online shops, property services, contractors, and professional firms.',
      'Prospective customers in Depok City typically look up study program details, room availability, or product catalogs directly on their phones. Without a clear, easy-to-read webpage, business admins end up resending the same long explanations dozens of times a day in chat.',
      'Moreover, as student counts, tenants, or daily transactions grow, keeping records in notebooks and scattered spreadsheets usually causes billing discrepancies and delayed recaps. Deploying a clean website alongside a WhatsApp AI agent and custom operational software makes team workflows in Depok City far more predictable.',
    ],
    typicalBusinessMixId: [
      'Lembaga bimbel, kursus keterampilan, dan layanan pendidikan di Kota Depok',
      'Pengelola kos-kosan, hunian sewa, dan agen properti di kawasan permukiman',
      'Klinik kesehatan, apotek, kafe, dan usaha kuliner di koridor komersial',
      'Toko online, jasa kontraktor bangunan, dan jasa profesional',
    ],
    typicalBusinessMixEn: [
      'Tutoring centers, skill courses, and educational services in Depok City',
      'Boarding house managers, rental housing, and property agencies in residential areas',
      'Health clinics, pharmacies, cafes, and culinary businesses along commercial corridors',
      'Online shops, building contractors, and professional services',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website kurikulum program belajar dan formulir pendaftaran bimbel',
        titleEn: 'Study program curriculum and enrollment form website for a tutoring center',
        businessTypeId: 'Bimbel di Kota Depok',
        businessTypeEn: 'Tutoring center in Depok City',
        narrativeId:
          'Orang tua dan pelajar di Kota Depok biasanya ingin membandingkan pilihan kelas reguler, intensif, serta rincian biaya sebelum mendaftar. Kami membangun website yang memuat informasi kurikulum secara terstruktur lengkap dengan formulir pendaftaran online yang langsung terhubung ke WhatsApp admin.',
        narrativeEn:
          'Parents and students in Depok City usually compare regular and intensive class options along with fee details before enrolling. We build a structured curriculum website complete with an online registration form linked directly to the admin’s WhatsApp.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp untuk info ketersediaan kamar dan jadwal survei kos-kosan',
        titleEn: 'WhatsApp assistant for room availability info and boarding house viewing slots',
        businessTypeId: 'Kos-kosan di Kota Depok',
        businessTypeEn: 'Boarding house in Depok City',
        narrativeId:
          'Pengelola kos-kosan di Kota Depok sering menerima chat pertanyaan tipe kamar kosong, fasilitas AC atau kamar mandi dalam, serta aturan jam bertamu pada malam hari. AI agent menjawab rincian tiap tipe kamar secara akurat dan menjadwalkan waktu survei lokasi bersama penjaga kos.',
        narrativeEn:
          'Boarding house managers in Depok City frequently receive late-night chats asking about vacant room types, AC or en-suite facilities, and visiting rules. An AI agent answers room details accurately and books viewing times with the on-site caretaker.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pengelolaan hunian, jatuh tempo sewa, dan tiket perbaikan kamar',
        titleEn: 'Occupancy, rent due date, and room maintenance ticket web app',
        businessTypeId: 'Kos-kosan dan properti sewa di Kota Depok',
        businessTypeEn: 'Boarding house and rental property in Depok City',
        narrativeId:
          'Ketika mengelola puluhan pintu kamar sewa di Kota Depok, memantau tanggal jatuh tempo tiap penghuni dan keluhan perbaikan keran atau AC lewat grup chat mudah terlewat. Kami merancang web app khusus untuk memantau status kamar, riwayat pembayaran, dan antrean perbaikan teknisi.',
        narrativeEn:
          'When managing dozens of rental rooms in Depok City, tracking individual tenant due dates and AC or plumbing repair requests in chat groups is error-prone. We build a custom web app to monitor room statuses, payment histories, and technician repair queues.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pengingat tagihan bulanan dan pencatatan bukti bayar otomatis',
        titleEn: 'Automated monthly invoice reminders and payment proof logging',
        businessTypeId: 'Bimbel dan kos-kosan di Kota Depok',
        businessTypeEn: 'Tutoring center and boarding house in Depok City',
        narrativeId:
          'Setiap awal bulan, admin biasanya harus mengirim pesan pengingat tagihan satu per satu dan memperbarui spreadsheet saat bukti transfer masuk. Otomasi workflow menjadwalkan pengiriman pengingat WhatsApp H-3 jatuh tempo dan merekap konfirmasi pembayaran secara otomatis.',
        narrativeEn:
          'At the start of every month, admins typically send invoice reminders one by one and update spreadsheets as transfer receipts arrive. Workflow automation schedules WhatsApp reminders three days before due dates and logs payment confirmations automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Kota Depok',
    howWeWorkHeadingEn: 'How we work with clients in Depok City',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Seluruh tahapan koordinasi, mulai dari pemetaan alur kerja hingga demo berkala bersama klien di Kota Depok, dijalankan secara online melalui WhatsApp dan video call.',
      'Jika diperlukan pertemuan langsung di area Tangerang Selatan, jadwalnya dapat kita sepakati terlebih dahulu. Setiap proyek dikerjakan mengikuti empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Every coordination stage, from workflow mapping to periodic demos with clients in Depok City, runs online via WhatsApp and video call.',
      'If an in-person meeting in the South Tangerang area is needed, we can schedule it by mutual agreement. Every project follows four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami mempelajari kebutuhan halaman web atau alur operasional bisnismu di Kota Depok sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau rancangan antarmuka, struktur informasi, dan alur sistem sebelum proses pengkodean dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami mengerjakan sistem secara bertahap dan melakukan pengujian menyeluruh agar siap dipakai timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan penuh beserta dokumentasi singkat untuk stafmu dan garansi perbaikan bug 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We study your webpage requirements or operational workflows in Depok City before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the interface design, information structure, and system flow before coding begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We develop the system in stages and run thorough tests so it is ready for your team.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system launches in full with concise staff documentation and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Berikut empat layanan yang kami sediakan untuk membantu perkembangan usaha di Kota Depok:',
    servicesIntroEn:
      'Here are the four services we provide to support business growth in Depok City:',
    faqsId: [
      {
        question: 'Bagaimana proses konsultasi awal untuk usaha yang berlokasi di Kota Depok?',
        answer:
          'Kamu cukup menghubungi kami lewat WhatsApp untuk menjadwalkan audit gratis 30 menit via chat atau video call. Dalam sesi tersebut, kita bahas kendala alur kerja atau kebutuhan website bisnismu dan kami susunkan estimasi biayanya.',
      },
      {
        question: 'Berapa biaya pembuatan website dan pengembangan software untuk UMKM di Kota Depok?',
        answer:
          'Biaya pembuatan website mulai dari Rp1.200.000. Sedangkan untuk AI agent WhatsApp, software custom, dan otomasi workflow, biayanya dihitung setelah audit gratis berdasarkan kompleksitas alur dan integrasi yang dibutuhkan.',
      },
      {
        question: 'Apakah staf kami di Kota Depok akan dibimbing cara menggunakan sistem barunya?',
        answer:
          'Ya, pada tahap rilis dan serah terima kami menyertakan panduan penggunaan yang praktis serta sesi penjelasan via video call. Kami juga memberikan garansi perbaikan bug selama 30 hari setelah sistem mengudara.',
      },
    ],
    faqsEn: [
      {
        question: 'How does the initial consultation work for a business located in Depok City?',
        answer:
          'Simply message us on WhatsApp to book a free 30-minute audit via chat or video call. During the session, we review your workflow bottlenecks or website needs and prepare a transparent cost estimate.',
      },
      {
        question: 'How much do website development and software projects cost for SMEs in Depok City?',
        answer:
          'Website development starts at IDR 1,200,000. For WhatsApp AI agents, custom software, and workflow automation, pricing is calculated after the free audit based on flow complexity and required integrations.',
      },
      {
        question: 'Will our staff in Depok City be guided on how to use the new system?',
        answer:
          'Yes, during launch and handover we include practical usage guides and a walkthrough session via video call. We also provide a 30-day bug-fix warranty after the system goes live.',
      },
    ],
    ctaHeadingId: 'Siap merapikan website dan operasional bisnis di Kota Depok?',
    ctaHeadingEn: 'Ready to streamline your business website and operations in Depok City?',
    ctaBodyId:
      'Diskusikan kebutuhan website, AI agent WhatsApp, atau aplikasi operasional bisnismu di Kota Depok melalui sesi audit gratis 30 menit.',
    ctaBodyEn:
      'Discuss your website, WhatsApp AI agent, or operational software needs in Depok City through a free 30-minute audit session.',
  },

  // 25. LEBAK BULUS (Jakarta Selatan, Wave 0 Live, hasServiceAreaPages: true)
  {
    slug: 'lebak-bulus',
    nameId: 'Lebak Bulus',
    nameEn: 'Lebak Bulus',
    regionGroup: 'jakarta-selatan',
    regionLabelId: 'Lebak Bulus, Jakarta Selatan',
    regionLabelEn: 'Lebak Bulus, South Jakarta',
    schemaType: 'AdministrativeArea',
    wave: 0,
    publishAt: '2026-10-22',
    hasServiceAreaPages: true,
    nearbySlugs: ['cilandak', 'tb-simatupang', 'pondok-indah', 'cinere', 'ciputat-timur'],
    factsSummaryId:
      'Kawasan di Jakarta Selatan tempat beroperasinya Stasiun MRT Lebak Bulus yang menghubungkan koridor komersial dan kawasan permukiman sekitar.',
    factsSummaryEn:
      'An area in South Jakarta home to Lebak Bulus MRT Station, connecting surrounding commercial corridors and residential neighborhoods.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Lebak Bulus, Jakarta Selatan. Mulai Rp1.200.000, audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Lebak Bulus, South Jakarta. From IDR 1.2M, free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di Lebak Bulus, Jakarta Selatan. Cocok bagi klinik, kafe dan restoran, jasa profesional, properti, maupun toko online di sekitar Stasiun MRT Lebak Bulus. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Lebak Bulus, South Jakarta. Built for clinics, cafes and restaurants, professional services, property, and online shops around Lebak Bulus MRT Station. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di sekitar Stasiun MRT Lebak Bulus atau koridor komersial sekitarnya butuh website cepat untuk komuter, respons chat WhatsApp instan, atau sistem kerja terpusat.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau alur operasional bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, aturan AI agent, dan integrasi sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business around Lebak Bulus MRT Station or nearby commercial corridors needs a fast commuter-ready website, instant WhatsApp replies, or centralized work systems.',
      mulaiDari:
        'A free 30-minute audit to inspect your current webpages or operational workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, AI agent rules, and system integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Lebak Bulus butuh ini',
    whyNeedHeadingEn: 'Why businesses in Lebak Bulus need this',
    whyNeedParagraphsId: [
      'Lebak Bulus di Jakarta Selatan merupakan kawasan tempat beroperasinya Stasiun MRT Lebak Bulus yang menjadi titik temu arus komuter dengan koridor komersial dan kawasan permukiman. Di sekitar kawasan ini, umumnya beroperasi usaha seperti kafe dan restoran, klinik kesehatan dan gigi, jasa profesional, properti, kos-kosan, bimbel, serta toko online.',
      'Pelanggan yang beraktivitas di sekitar Stasiun MRT Lebak Bulus biasanya mencari layanan secara cepat lewat HP saat sedang dalam perjalanan pagi atau sore hari. Halaman web yang ringan dibuka di jaringan seluler dan menampilkan daftar layanan, jam buka, kisaran harga awal, serta tombol WhatsApp yang jelas sangat membantu mereka memesan tanpa menunda.',
      'Di sisi operasional, lonjakan pesan WhatsApp pada jam berangkat dan pulang kerja sering membuat admin kewalahan menjawab pertanyaan ketersediaan jadwal atau pesanan ambil sendiri. Mengintegrasikan AI agent WhatsApp dengan sistem pencatatan custom dan otomasi workflow membantu timmu di Lebak Bulus melayani pelanggan dengan sigap tanpa tumpukan rekap manual.',
    ],
    whyNeedParagraphsEn: [
      'Lebak Bulus in South Jakarta is home to Lebak Bulus MRT Station, serving as a transit hub connecting commuter flows with commercial corridors and residential neighborhoods. Businesses operating around this area commonly include cafes and restaurants, health and dental clinics, professional services, property agencies, boarding houses, tutoring centers, and online shops.',
      'Customers commuting around Lebak Bulus MRT Station typically look up services on their phones during morning or evening transit hours. A webpage that loads quickly on mobile networks and clearly shows service lists, opening hours, starting prices, and a direct WhatsApp button helps them book on the spot.',
      'Behind the scenes, spikes in WhatsApp messages during rush hours often overwhelm staff answering slot availability or pickup order questions. Integrating a WhatsApp AI agent with custom recording software and workflow automation helps your Lebak Bulus team serve customers promptly without manual recap backlogs.',
    ],
    typicalBusinessMixId: [
      'Kafe, restoran, dan usaha kuliner di sekitar koridor Stasiun MRT Lebak Bulus',
      'Klinik gigi, kesehatan, dan perawatan yang melayani warga serta pekerja komuter',
      'Kantor jasa profesional, properti, dan pengelola kos-kosan di Lebak Bulus',
      'Toko online, bimbel, dan kontraktor di kawasan permukiman Lebak Bulus',
    ],
    typicalBusinessMixEn: [
      'Cafes, restaurants, and food outlets around the Lebak Bulus MRT Station corridor',
      'Dental, health, and care clinics serving residents and commuting workers',
      'Professional service offices, property agencies, and boarding house managers in Lebak Bulus',
      'Online shops, tutoring centers, and contractors across Lebak Bulus residential areas',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website daftar tindakan dan booking slot sore untuk klinik dekat stasiun',
        titleEn: 'Treatment list and evening slot booking website for a clinic near the station',
        businessTypeId: 'Klinik di Lebak Bulus',
        businessTypeEn: 'Clinic in Lebak Bulus',
        narrativeId:
          'Pekerja komuter yang turun di Stasiun MRT Lebak Bulus biasanya ingin menjadwalkan pemeriksaan gigi atau perawatan sepulang kerja. Kami merancang website cepat yang menampilkan daftar perawatan, durasi tindakan, dan formulir pilih jam kunjungan yang langsung diteruskan ke WhatsApp resepsionis.',
        narrativeEn:
          'Commuters alighting at Lebak Bulus MRT Station often want to book dental checkups or treatments on their way home. We build a fast website displaying treatment lists, session durations, and a time-slot selector routed directly to the receptionist’s WhatsApp.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'AI agent pre-order pesanan ambil sendiri dan reservasi ruang rapat kafe',
        titleEn: 'WhatsApp AI agent for pickup pre-orders and cafe meeting room bookings',
        businessTypeId: 'Kafe dan restoran di Lebak Bulus',
        businessTypeEn: 'Cafe and restaurant in Lebak Bulus',
        narrativeId:
          'Pada jam sibuk pagi, kasir kafe sering kesulitan membalas chat pelanggan yang ingin memesan minuman terlebih dahulu atau menanyakan ketersediaan ruang diskusi siang. AI agent memandu pemilihan menu, mengecek slot ruangan di tabel jadwal, dan mencatat pesanan secara otomatis.',
        narrativeEn:
          'During morning rush hours, cafe cashiers often struggle to reply to chats from customers wanting to pre-order drinks or check afternoon meeting room slots. An AI agent guides menu selection, checks room availability on the schedule sheet, and logs orders automatically.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pembukuan stok harian dan pelacakan barang gagal gerai F&B',
        titleEn: 'Daily stock bookkeeping and spoilage tracking web app for F&B outlets',
        businessTypeId: 'Usaha minuman dan kuliner di Lebak Bulus',
        businessTypeEn: 'Beverage and culinary business in Lebak Bulus',
        narrativeId:
          'Gerai minuman dan kuliner dengan perputaran cepat di Lebak Bulus memerlukan pencatatan suhu penyimpanan, stok bahan masuk-keluar, serta barang rusak setiap pergantian shift. Kami membangun web app operasional agar staf gerai menginput data langsung dari HP tanpa kertas tercecer.',
        narrativeEn:
          'Fast-moving beverage and food outlets in Lebak Bulus need reliable storage temperature logs, inbound-outbound ingredient counts, and spoilage records at every shift change. We build an operational web app so outlet staff input data directly from their phones without loose paper.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pencatatan prospek konsultasi dan pengingat jadwal pertemuan klien',
        titleEn: 'Automated consultation lead logging and client meeting reminders',
        businessTypeId: 'Jasa profesional di Lebak Bulus',
        businessTypeEn: 'Professional services in Lebak Bulus',
        narrativeId:
          'Kantor konsultan dan jasa profesional di Lebak Bulus sering kehilangan waktu saat menyalin data formulir web ke kalender tim dan mengirim pengingat satu per satu. Otomasi workflow mencatat jadwal baru ke kalender, mengirim pesan konfirmasi WhatsApp H-1, dan merekap prospek mingguan.',
        narrativeEn:
          'Consulting and professional offices in Lebak Bulus often lose time copying web form data into team calendars and sending individual reminders. Workflow automation logs new appointments to the calendar, sends day-before WhatsApp confirmations, and compiles weekly lead recaps.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Lebak Bulus',
    howWeWorkHeadingEn: 'How we work with clients in Lebak Bulus',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Kolaborasi dengan pemilik bisnis dan tim di Lebak Bulus dijalankan secara online melalui WhatsApp dan video call agar efisien di tengah kesibukan operasionalmu.',
      'Apabila diperlukan diskusi tatap muka di area Tangerang Selatan, jadwal pertemuan dapat disepakati bersama. Kami menjalankan setiap proyek melalui empat langkah kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Collaboration with business owners and teams in Lebak Bulus runs online via WhatsApp and video call to stay efficient around your daily operations.',
      'Whenever an in-person discussion in the South Tangerang area is needed, meetings can be scheduled by agreement. We run every project through four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau alur operasional bisnismu di Lebak Bulus sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau struktur halaman, alur percakapan AI agent, atau skema aplikasi sebelum pengerjaan teknis dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami mengembangkan sistem secara bertahap dan mengujinya pada perangkat nyata bersama timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan penuh lengkap dengan panduan penggunaan praktis dan garansi perbaikan bug 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We inspect your webpage needs or operational workflows in Lebak Bulus before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure, AI agent conversation flow, or application schema before technical work begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We develop the system in stages and test it on real devices alongside your team.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system launches in full complete with practical usage guides and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Pilih layanan yang paling dibutuhkan bisnismu di Lebak Bulus saat ini, termasuk halaman khusus pembuatan website dan AI agent untuk area Lebak Bulus:',
    servicesIntroEn:
      'Choose the service your business in Lebak Bulus needs most right now, including dedicated website development and AI agent pages for Lebak Bulus:',
    faqsId: [
      {
        question: 'Apakah Lebak Bulus memiliki halaman khusus untuk layanan Pembuatan Website dan AI Agent?',
        answer:
          'Ya, selain halaman ringkasan area Lebak Bulus ini, kamu dapat mengakses halaman khusus Pembuatan Website di Lebak Bulus dan AI Agent di Lebak Bulus melalui tautan pada bagian daftar layanan di atas.',
      },
      {
        question: 'Berapa biaya pembuatan website dan sistem otomasi untuk bisnis di Lebak Bulus?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000. Untuk layanan AI agent WhatsApp, software custom, dan otomasi workflow, biaya dihitung secara transparan setelah sesi audit gratis 30 menit bersama timmu.',
      },
      {
        question: 'Bagaimana koordinasi proyek dilakukan jika tempat usaha kami berada di sekitar Stasiun MRT Lebak Bulus?',
        answer:
          'Diskusi kebutuhan, tinjauan prototipe, dan serah terima panduan dilakukan secara praktis lewat WhatsApp dan video call. Jika diperlukan pertemuan langsung di area Tangerang Selatan, jadwalnya dapat disepakati bersama.',
      },
    ],
    faqsEn: [
      {
        question: 'Does Lebak Bulus have dedicated pages for Website Development and AI Agents?',
        answer:
          'Yes, in addition to this Lebak Bulus area overview page, you can visit the dedicated Website Development in Lebak Bulus and AI Agents in Lebak Bulus pages via the links in the services section above.',
      },
      {
        question: 'How much do website development and automation systems cost for businesses in Lebak Bulus?',
        answer:
          'Website development starts at IDR 1,200,000. For WhatsApp AI agents, custom software, and workflow automation, pricing is calculated transparently after a free 30-minute audit session with your team.',
      },
      {
        question: 'How does project coordination work if our business is near Lebak Bulus MRT Station?',
        answer:
          'Requirements discussions, prototype reviews, and guide handovers are conducted practically via WhatsApp and video call. If an in-person meeting in the South Tangerang area is needed, we can schedule it by agreement.',
      },
    ],
    ctaHeadingId: 'Ingin mempercepat respons chat dan operasional bisnismu di Lebak Bulus?',
    ctaHeadingEn: 'Want to speed up chat responses and operations for your business in Lebak Bulus?',
    ctaBodyId:
      'Mulai dari audit gratis 30 menit via WhatsApp untuk memetakan solusi website, AI agent, atau software yang paling tepat bagi usahamu di Lebak Bulus.',
    ctaBodyEn:
      'Start with a free 30-minute audit via WhatsApp to map out the right website, AI agent, or software solution for your business in Lebak Bulus.',
  },

  // 26. CILANDAK (Jakarta Selatan, Wave 4)
  {
    slug: 'cilandak',
    nameId: 'Cilandak',
    nameEn: 'Cilandak',
    regionGroup: 'jakarta-selatan',
    regionLabelId: 'Cilandak, Jakarta Selatan',
    regionLabelEn: 'Cilandak, South Jakarta',
    schemaType: 'AdministrativeArea',
    wave: 4,
    publishAt: '2026-11-19',
    hasServiceAreaPages: false,
    nearbySlugs: ['lebak-bulus', 'tb-simatupang', 'pondok-indah', 'cinere', 'jakarta-selatan'],
    factsSummaryId:
      'Kecamatan di Jakarta Selatan yang mencakup kawasan permukiman, koridor komersial, serta area perkantoran.',
    factsSummaryEn:
      'A subdistrict in South Jakarta encompassing residential neighborhoods, commercial corridors, and office areas.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Cilandak, Jakarta Selatan. Mulai Rp1.200.000 dengan audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Cilandak, South Jakarta. From IDR 1.2M with a free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di Kecamatan Cilandak, Jakarta Selatan. Dirancang bagi jasa profesional, kontraktor, klinik, kafe dan restoran, properti, maupun toko online. Harga mulai Rp1.200.000 untuk website, sedangkan layanan sistem lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Cilandak, South Jakarta. Built for professional services, contractors, clinics, cafes and restaurants, property, and online shops. Websites start at IDR 1,200,000, with other services quoted after a free 30-minute audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Cilandak membutuhkan website profil yang kredibel, asisten chat WhatsApp untuk menyaring prospek atau reservasi, serta aplikasi kerja yang rapi.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk memetakan alur kerja yang paling menyita waktu timmu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai ruang lingkup fitur dan integrasi.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Cilandak needs a credible profile website, a WhatsApp chat assistant to screen leads or bookings, and tidy operational software.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to map the workflows taking up the most time for your team.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on feature scope and integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Cilandak butuh ini',
    whyNeedHeadingEn: 'Why businesses in Cilandak need this',
    whyNeedParagraphsId: [
      'Cilandak merupakan kecamatan di Jakarta Selatan yang memadukan kawasan permukiman, koridor komersial, dan area perkantoran. Di wilayah ini, umumnya beroperasi beragam usaha seperti kantor jasa profesional, kontraktor dan studio arsitektur, klinik kesehatan dan terapi, kafe dan restoran, properti, bimbel, serta toko online.',
      'Calon klien dan pelanggan di Cilandak biasanya menilai kerapian kerja sebuah bisnis dari tampilan websitenya sebelum menghubungi lewat WhatsApp. Halaman web yang menjelaskan cakupan layanan, alur kerja, portofolio nyata, serta formulir konsultasi yang ringkas umumnya membuat prospek yang masuk jauh lebih terarah.',
      'Di sisi pengelolaan proyek dan layanan harian, usaha di Cilandak sering kali masih mengandalkan pengiriman file spreadsheet manual atau catatan yang tersebar di banyak grup chat. Menerapkan AI agent WhatsApp, software web custom, dan otomasi workflow membantu timmu memantau jadwal, progres pengerjaan, hingga tagihan klien tanpa tumpang tindih.',
    ],
    whyNeedParagraphsEn: [
      'Cilandak is a subdistrict in South Jakarta blending residential neighborhoods, commercial corridors, and office zones. Across this area, businesses commonly include professional service firms, contractors and architecture studios, health and therapy clinics, cafes and restaurants, property agencies, tutoring centers, and online shops.',
      'Prospective clients and customers in Cilandak usually judge a business’s operational neatness by its website before reaching out on WhatsApp. A webpage that clearly explains service scope, workflows, real project experience, and a concise consultation form brings in much better-qualified inquiries.',
      'On the daily project and service management side, businesses in Cilandak often still rely on manual spreadsheet sharing or notes scattered across chat groups. Deploying a WhatsApp AI agent, custom web software, and workflow automation helps your team track schedules, project milestones, and client invoices without overlap.',
    ],
    typicalBusinessMixId: [
      'Kantor jasa profesional, konsultan, dan studio desain atau kontraktor di Cilandak',
      'Klinik kesehatan, fisioterapi, dan perawatan keluarga di kawasan permukiman',
      'Kafe, restoran, dan ruang komersial di sepanjang koridor Cilandak',
      'Agen properti, bimbel, dan toko online yang melayani wilayah Jakarta Selatan',
    ],
    typicalBusinessMixEn: [
      'Professional service offices, consultants, and design or contractor studios in Cilandak',
      'Health, physiotherapy, and family care clinics across residential areas',
      'Cafes, restaurants, and commercial spaces along Cilandak corridors',
      'Property agencies, tutoring centers, and online shops serving South Jakarta',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website portofolio dan kuesioner kebutuhan proyek untuk kontraktor interior',
        titleEn: 'Portfolio and project brief questionnaire website for an interior contractor',
        businessTypeId: 'Kontraktor di Cilandak',
        businessTypeEn: 'Contractor in Cilandak',
        narrativeId:
          'Studio desain dan kontraktor renovasi di Cilandak sering menghabiskan waktu lama di chat hanya untuk menanyakan luas ruangan dan perkiraan anggaran calon klien. Kami merancang website dengan galeri proyek yang rapi serta formulir kuesioner awal sehingga pesan WhatsApp yang masuk sudah memuat data dasar proyek.',
        narrativeEn:
          'Design studios and renovation contractors in Cilandak often spend hours in chat just asking for room dimensions and rough budgets. We build a clean portfolio website with an initial brief questionnaire so incoming WhatsApp messages already contain baseline project specs.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp penjadwalan ulang sesi terapi dan tanya jawab layanan klinik',
        titleEn: 'WhatsApp assistant for therapy session rescheduling and clinic service Q&A',
        businessTypeId: 'Klinik di Cilandak',
        businessTypeEn: 'Clinic in Cilandak',
        narrativeId:
          'Pasien klinik terapi dan pemulihan di Cilandak sering menghubungi malam hari untuk mengubah jadwal kunjungan besok atau menanyakan persiapan sesi. AI agent memeriksa slot terapis yang kosong di kalender, memperbarui jadwal secara otomatis, dan memberi tahu admin bertugas.',
        narrativeEn:
          'Patients at therapy and recovery clinics in Cilandak often message at night to reschedule next-day visits or ask about session prep. An AI agent checks open therapist slots on the calendar, updates bookings automatically, and notifies the on-duty admin.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pemantauan progres lapangan dan laporan mingguan proyek renovasi',
        titleEn: 'Field progress tracking and weekly renovation report web application',
        businessTypeId: 'Kontraktor dan jasa profesional di Cilandak',
        businessTypeEn: 'Contractor and professional service in Cilandak',
        narrativeId:
          'Mengumpulkan foto progres harian dari pengawas lapangan lewat grup chat sering membuat dokumentasi proyek berantakan saat klien meminta laporan mingguan. Kami membangun web app operasional tempat tim lapangan mengunggah progres per tahap dan menyusun laporan rapi secara terstruktur.',
        narrativeEn:
          'Collecting daily progress photos from field supervisors via chat groups often leaves project documentation messy when clients ask for weekly updates. We build an operational web app where field teams upload stage-by-stage progress and generate structured reports.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pengiriman katalog B2B dan pengingat tindak lanjut tim sales',
        titleEn: 'Automated B2B catalog delivery and sales follow-up reminders',
        businessTypeId: 'Jasa profesional di Cilandak',
        businessTypeEn: 'Professional service firm in Cilandak',
        narrativeId:
          'Ketika calon klien mengisi formulir unduhan profil layanan di website, keterlambatan mengirim dokumen tindak lanjut dapat menurunkan minat mereka. Otomasi workflow langsung mengirimkan dokumen via WhatsApp, mencatat data prospek ke spreadsheet pipeline, dan menyetel pengingat tindak lanjut H+2 bagi tim sales.',
        narrativeEn:
          'When prospective clients fill out a service profile request form on the website, delayed follow-ups can cool their interest. Workflow automation immediately sends the document via WhatsApp, logs the lead to the pipeline sheet, and sets a 2-day follow-up reminder for sales.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Cilandak',
    howWeWorkHeadingEn: 'How we work with clients in Cilandak',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Seluruh diskusi teknis, tinjauan prototipe, dan koordinasi bersama klien di Cilandak dijalankan secara online melalui WhatsApp dan video call.',
      'Untuk kebutuhan pertemuan tatap muka di area Tangerang Selatan, jadwal dapat kita sepakati terlebih dahulu. Setiap proyek berjalan melalui empat langkah terstruktur berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. All technical discussions, prototype reviews, and coordination with clients in Cilandak take place online via WhatsApp and video call.',
      'Whenever an in-person meeting in the South Tangerang area is needed, we can arrange a schedule by mutual agreement. Every project follows four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan kebutuhan halaman web atau alur operasional bisnismu di Cilandak sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu memeriksa rancangan tampilan, struktur halaman, atau skema alur kerja sebelum pengembangan penuh dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun sistem secara bertahap dan mengujinya sesuai skenario penggunaan nyata di timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan penuh dengan dokumentasi operasional dan garansi perbaikan bug selama 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map your webpage needs or operational workflows in Cilandak before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the interface layout, page structure, or workflow schema before full development starts.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system in stages and test it against real usage scenarios with your team.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system goes live with operational documentation and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat dipilih sesuai kebutuhan bisnismu di Cilandak:',
    servicesIntroEn:
      'Four services you can choose from based on your business needs in Cilandak:',
    faqsId: [
      {
        question: 'Apakah software custom yang dibuat bisa mengikuti SOP unik perusahaan kami di Cilandak?',
        answer:
          'Ya, kami merancang alur input, pembagian hak akses staf, dan tampilan laporan mengikuti SOP nyata yang sudah berjalan di perusahaanmu. Pemetaan alur ini kita lakukan pada sesi audit gratis 30 menit di awal.',
      },
      {
        question: 'Berapa biaya pembuatan website dan layanan sistem lainnya di Cilandak?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000. Untuk pengembangan AI agent WhatsApp, software custom, dan otomasi workflow, rincian biayanya kami hitungkan setelah sesi audit gratis selesai.',
      },
      {
        question: 'Bagaimana jika setelah sistem rilis ada kendala teknis yang ditemukan oleh tim kami?',
        answer:
          'Setiap proyek dilengkapi dengan garansi perbaikan bug selama 30 hari setelah serah terima tanpa biaya tambahan. Apabila ke depannya kamu ingin menambah fitur baru, kita bisa menyusun cakupan pengembangan berikutnya.',
      },
    ],
    faqsEn: [
      {
        question: 'Can the custom software follow our company’s specific SOPs in Cilandak?',
        answer:
          'Yes, we design input forms, staff access roles, and report views around the real SOPs already running in your company. We map this flow together during the initial free 30-minute audit.',
      },
      {
        question: 'How much do website development and other system services cost in Cilandak?',
        answer:
          'Website development starts at IDR 1,200,000. For WhatsApp AI agents, custom software, and workflow automation, detailed pricing is calculated after the free audit session.',
      },
      {
        question: 'What happens if our team finds a technical issue after the system goes live?',
        answer:
          'Every project includes a 30-day bug-fix warranty after handover at no extra cost. If you later want to add new features, we can scope the next development phase cleanly.',
      },
    ],
    ctaHeadingId: 'Siap membenahi website dan alur kerja timmu di Cilandak?',
    ctaHeadingEn: 'Ready to upgrade your website and team workflows in Cilandak?',
    ctaBodyId:
      'Jadwalkan audit gratis 30 menit via WhatsApp untuk mendiskusikan kebutuhan website, AI agent, atau software custom bagi bisnismu di Cilandak.',
    ctaBodyEn:
      'Book a free 30-minute audit via WhatsApp to discuss website, AI agent, or custom software needs for your business in Cilandak.',
  },

  // 27. TB SIMATUPANG (Jakarta Selatan, Wave 4)
  {
    slug: 'tb-simatupang',
    nameId: 'TB Simatupang',
    nameEn: 'TB Simatupang',
    regionGroup: 'jakarta-selatan',
    regionLabelId: 'TB Simatupang, Jakarta Selatan',
    regionLabelEn: 'TB Simatupang, South Jakarta',
    schemaType: 'AdministrativeArea',
    wave: 4,
    publishAt: '2026-11-19',
    hasServiceAreaPages: false,
    nearbySlugs: ['cilandak', 'lebak-bulus', 'pondok-indah', 'jakarta-selatan'],
    factsSummaryId:
      'Kawasan koridor perkantoran dan komersial di Jakarta Selatan yang berdekatan dengan Cilandak, Lebak Bulus, dan Pondok Indah.',
    factsSummaryEn:
      'An office and commercial corridor in South Jakarta adjacent to Cilandak, Lebak Bulus, and Pondok Indah.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di TB Simatupang, Jakarta Selatan. Mulai Rp1.200.000, audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in TB Simatupang, South Jakarta. From IDR 1.2M, free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk perusahaan dan bisnis di koridor TB Simatupang, Jakarta Selatan. Cocok bagi jasa profesional, kontraktor, klinik, properti, maupun kafe dan restoran. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for companies and businesses along the TB Simatupang corridor, South Jakarta. Built for professional services, contractors, clinics, property, and cafes and restaurants. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Perusahaan atau usahamu di kawasan perkantoran TB Simatupang butuh website profil dua bahasa yang rapi, penyaringan prospek B2B via WhatsApp, atau aplikasi operasional.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk memetakan alur komunikasi klien dan administrasi timmu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai kompleksitas halaman, AI agent, dan integrasi data.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your company or business in the TB Simatupang office corridor needs a clean bilingual profile website, WhatsApp B2B lead screening, or operational web apps.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to map your client communication and team administration flows.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page complexity, AI agents, and data integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di TB Simatupang butuh ini',
    whyNeedHeadingEn: 'Why businesses in TB Simatupang need this',
    whyNeedParagraphsId: [
      'TB Simatupang merupakan salah satu kawasan perkantoran dan koridor komersial utama di Jakarta Selatan. Di sepanjang koridor ini, umumnya beroperasi perusahaan jasa profesional, konsultan, vendor kontraktor dan teknik, agen properti komersial, klinik spesialis, serta kafe dan restoran pendukung kawasan perkantoran.',
      'Bagi perusahaan B2B maupun penyedia jasa di TB Simatupang, calon klien korporat dan tim pengadaan biasanya memeriksa website resmi terlebih dahulu untuk memverifikasi kejelasan layanan serta kredibilitas vendor. Website yang lambat, tidak responsif di layar HP, atau tidak memiliki alur permintaan penawaran yang jelas sering menghambat langkah awal kerja sama.',
      'Pada proses operasional sehari-hari, tim sales dan operasional di TB Simatupang umumnya menangani banyak dokumen penawaran harga, jadwal presentasi klien, serta persetujuan berjenjang. Menggabungkan AI agent WhatsApp untuk kualifikasi prospek awal dengan software web custom dan otomasi workflow membantu timmu memangkas pekerjaan salin-tempel manual antar spreadsheet.',
    ],
    whyNeedParagraphsEn: [
      'TB Simatupang is one of the primary office districts and commercial corridors in South Jakarta. Along this corridor, common businesses include professional service firms, consultants, engineering and contractor vendors, commercial property agencies, specialist clinics, and office-supporting cafes and restaurants.',
      'For B2B companies and service providers in TB Simatupang, corporate prospects and procurement teams usually inspect the official website first to verify service clarity and vendor credibility. A website that loads slowly, breaks on mobile screens, or lacks a structured quotation request flow often slows down initial partnership discussions.',
      'In day-to-day operations, sales and operations teams in TB Simatupang typically manage numerous price quotations, client presentation schedules, and multi-step approvals. Combining a WhatsApp AI agent for initial lead screening with custom web software and workflow automation helps your team eliminate repetitive copy-pasting across spreadsheets.',
    ],
    typicalBusinessMixId: [
      'Perusahaan jasa profesional, konsultan hukum, pajak, dan manajemen di koridor perkantoran TB Simatupang',
      'Vendor kontraktor, penyedia peralatan B2B, dan pengelola properti komersial',
      'Klinik kesehatan, gigi, dan layanan medis bagi pekerja perkantoran',
      'Kafe, restoran, dan katering korporat di sepanjang TB Simatupang',
    ],
    typicalBusinessMixEn: [
      'Professional service firms, legal, tax, and management consultants along the TB Simatupang office corridor',
      'Contractor vendors, B2B equipment suppliers, and commercial property managers',
      'Health, dental, and medical clinics serving office workers',
      'Cafes, restaurants, and corporate catering businesses along TB Simatupang',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website profil korporat bilingual (/id dan /en) dan formulir permintaan proposal',
        titleEn: 'Bilingual corporate profile website (/id and /en) and RFP intake form',
        businessTypeId: 'Jasa profesional di TB Simatupang',
        businessTypeEn: 'Professional service firm in TB Simatupang',
        narrativeId:
          'Calon mitra bisnis dan klien perusahaan di koridor TB Simatupang membutuhkan informasi cakupan layanan yang lugas dalam bahasa Indonesia dan Inggris. Kami membangun website korporat yang cepat, rapi, dan dilengkapi formulir permintaan penawaran terstruktur yang langsung memberi tahu tim kemitraanmu.',
        narrativeEn:
          'Prospective business partners and corporate clients along the TB Simatupang corridor need clear service scope details in both Indonesian and English. We build a fast, structured corporate website with an RFP intake form that immediately notifies your partnership team.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'AI agent kualifikasi prospek B2B dan penjadwalan rapat pengenalan',
        titleEn: 'WhatsApp AI agent for B2B lead screening and discovery meeting booking',
        businessTypeId: 'Kontraktor dan vendor B2B di TB Simatupang',
        businessTypeEn: 'Contractor and B2B vendor in TB Simatupang',
        narrativeId:
          'Tim sales sering menerima pesan WhatsApp beragam, mulai dari pertanyaan spesifikasi dasar hingga permintaan proyek skala besar. AI agent menjawab spesifikasi teknis sesuai katalog resmi, menanyakan nama perusahaan serta estimasi kebutuhan volume, lalu menjadwalkan sesi rapat bersama account executive.',
        narrativeEn:
          'Sales teams frequently receive mixed WhatsApp messages ranging from basic spec questions to large project inquiries. An AI agent answers technical specs from the official catalog, collects company names and volume requirements, and books discovery calls with account executives.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pelacakan status penawaran harga, kontrak tahunan, dan jadwal kunjungan teknisi',
        titleEn: 'Quotation status, annual contract renewal, and technician visit tracking web app',
        businessTypeId: 'Jasa pemeliharaan dan kontraktor di TB Simatupang',
        businessTypeEn: 'Maintenance and contractor firm in TB Simatupang',
        narrativeId:
          'Perusahaan jasa pemeliharaan gedung atau peralatan kantor sering kesulitan memantau ratusan dokumen penawaran dan tanggal jatuh tempo perpanjangan kontrak klien. Kami merancang web app operasional agar tim sales dan teknisi memantau status kontrak serta jadwal pemeliharaan dari satu dashboard.',
        narrativeEn:
          'Facility or office equipment maintenance companies often struggle to track hundreds of quotation documents and contract renewal dates. We build an operational web app so sales and technical teams monitor contract statuses and maintenance schedules from one dashboard.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi persetujuan pengajuan operasional dan rekapitulasi laporan mingguan',
        titleEn: 'Automated operational request approvals and weekly management recaps',
        businessTypeId: 'Kantor jasa profesional di TB Simatupang',
        businessTypeEn: 'Professional office in TB Simatupang',
        narrativeId:
          'Meminta persetujuan biaya operasional lapangan lewat chat satu per satu lalu menyalinnya ke spreadsheet keuangan sering menghambat pelaporan akhir pekan. Otomasi workflow meneruskan pengajuan ke manajer terkait via WhatsApp dan langsung mencatat pengajuan yang disetujui ke tabel rekap keuangan.',
        narrativeEn:
          'Requesting field operational expense approvals via individual chats and copying them into financial sheets often delays weekend reporting. Workflow automation routes requests to the relevant manager via WhatsApp and automatically logs approved items to the finance sheet.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di TB Simatupang',
    howWeWorkHeadingEn: 'How we work with clients in TB Simatupang',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi bersama tim manajemen, pemasaran, maupun operasional di koridor TB Simatupang dijalankan secara online melalui WhatsApp dan video call.',
      'Apabila diperlukan sesi diskusi tatap muka di area Tangerang Selatan, jadwal dapat disepakati bersama terlebih dahulu. Setiap proyek berjalan melalui empat tahapan kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Coordination with management, marketing, or operations teams along the TB Simatupang corridor runs online via WhatsApp and video call.',
      'Whenever an in-person discussion in the South Tangerang area is needed, sessions can be scheduled by mutual agreement. Every project follows four structured stages.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan website korporat atau alur kerja operasional perusahaanmu di TB Simatupang sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Timmu meninjau rancangan antarmuka, struktur informasi, dan skema integrasi sebelum pengembangan penuh dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun sistem secara bertahap dan melakukan pengujian fungsi bersama penanggung jawab di timmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan ke lingkungan produksi lengkap dengan dokumentasi panduan dan garansi perbaikan bug 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your corporate website needs or operational workflows in TB Simatupang before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'Your team reviews the interface layout, information structure, and integration schema before full development starts.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system in stages and conduct functional testing with your designated team leads.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system launches to production complete with documentation guides and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang tersedia untuk perusahaan dan bisnis di koridor TB Simatupang:',
    servicesIntroEn:
      'Four core services available for companies and businesses along the TB Simatupang corridor:',
    faqsId: [
      {
        question: 'Apakah CHESTAADOTCOM dapat membangun website dua bahasa (/id dan /en) untuk perusahaan di TB Simatupang?',
        answer:
          'Ya, kami merancang website dengan struktur bahasa Indonesia dan Inggris yang rapi, kecepatan muat tinggi di perangkat seluler maupun desktop, serta penataan informasi yang memudahkan calon klien korporat memahami layananmu.',
      },
      {
        question: 'Berapa biaya pembuatan website dan pengembangan software custom di TB Simatupang?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000. Untuk pengembangan AI agent WhatsApp, software web app custom, dan otomasi workflow, estimasi biaya kami susun secara transparan setelah sesi audit gratis 30 menit bersama timmu.',
      },
      {
        question: 'Bagaimana proses serah terima kode dan akses sistem setelah proyek selesai?',
        answer:
          'Saat proyek selesai dan lunas, seluruh kode sumber, akses repositori atau server, serta dokumentasi operasional diserahkan sepenuhnya kepada perusahaanmu. Kamu juga mendapatkan garansi perbaikan bug selama 30 hari pasca-rilis.',
      },
    ],
    faqsEn: [
      {
        question: 'Can CHESTAADOTCOM build a bilingual (/id and /en) website for a company in TB Simatupang?',
        answer:
          'Yes, we build websites with clean Indonesian and English structures, fast load speeds on both mobile and desktop, and clear information architecture so corporate prospects understand your services immediately.',
      },
      {
        question: 'How much do website development and custom software projects cost in TB Simatupang?',
        answer:
          'Website development starts at IDR 1,200,000. For WhatsApp AI agents, custom web applications, and workflow automation, transparent cost estimates are prepared after a free 30-minute audit session with your team.',
      },
      {
        question: 'How does code and system access handover work once the project is finished?',
        answer:
          'Upon project completion and final payment, all source code, repository or server access, and operational documentation are handed over in full to your company. You also receive a 30-day post-launch bug-fix warranty.',
      },
    ],
    ctaHeadingId: 'Siap meningkatkan kredibilitas web dan efisiensi operasional timmu di TB Simatupang?',
    ctaHeadingEn: 'Ready to upgrade your web credibility and team operational efficiency in TB Simatupang?',
    ctaBodyId:
      'Hubungi kami via WhatsApp untuk menjadwalkan audit gratis 30 menit dan diskusikan solusi website, AI agent, atau software yang dibutuhkan perusahaanmu.',
    ctaBodyEn:
      'Contact us via WhatsApp to schedule a free 30-minute audit and discuss the website, AI agent, or software solution your company needs.',
  },

  // 28. PONDOK INDAH (Jakarta Selatan, Wave 4)
  {
    slug: 'pondok-indah',
    nameId: 'Pondok Indah',
    nameEn: 'Pondok Indah',
    regionGroup: 'jakarta-selatan',
    regionLabelId: 'Pondok Indah, Jakarta Selatan',
    regionLabelEn: 'Pondok Indah, South Jakarta',
    schemaType: 'AdministrativeArea',
    wave: 4,
    publishAt: '2026-11-19',
    hasServiceAreaPages: false,
    nearbySlugs: ['lebak-bulus', 'kebayoran-lama', 'cilandak', 'tb-simatupang', 'bintaro'],
    factsSummaryId:
      'Kawasan di Jakarta Selatan yang mencakup kawasan permukiman dan koridor komersial, berdekatan dengan Lebak Bulus, Kebayoran Lama, dan Cilandak.',
    factsSummaryEn:
      'An area in South Jakarta encompassing residential neighborhoods and commercial corridors, adjacent to Lebak Bulus, Kebayoran Lama, and Cilandak.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Pondok Indah, Jakarta Selatan. Mulai Rp1.200.000, audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Pondok Indah, South Jakarta. From IDR 1.2M, free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM melayani pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di kawasan Pondok Indah, Jakarta Selatan. Dirancang bagi klinik, properti, jasa profesional, bimbel dan kursus privat, kafe dan restoran, maupun kontraktor. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis 30 menit.',
    quickSummaryEn:
      'CHESTAADOTCOM provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Pondok Indah, South Jakarta. Built for clinics, property agencies, professional services, private courses, cafes and restaurants, and contractors. Websites start at IDR 1,200,000, with other services quoted after a free audit.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Pondok Indah mengutamakan tampilan website yang bersih dan kredibel, respons reservasi WhatsApp yang sopan 24/7, serta kerapian jadwal layanan.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman web atau alur reservasi dan operasional bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, aturan AI agent, dan fitur sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Pondok Indah prioritizes a clean, credible website, polite 24/7 WhatsApp booking responses, and orderly service scheduling.',
      mulaiDari:
        'A free 30-minute audit to inspect your current webpages or booking and operational flows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, AI agent rules, and system features.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Pondok Indah butuh ini',
    whyNeedHeadingEn: 'Why businesses in Pondok Indah need this',
    whyNeedParagraphsId: [
      'Pondok Indah di Jakarta Selatan merupakan kawasan yang menggabungkan kawasan permukiman dan koridor komersial. Di kawasan ini, umumnya beroperasi usaha seperti klinik kesehatan, gigi, dan estetika, agen properti, kantor jasa profesional, lembaga kursus dan bimbel privat, kafe dan restoran, serta jasa kontraktor interior.',
      'Pelanggan dan klien di Pondok Indah biasanya mengharapkan informasi layanan yang tertata rapi serta kepastian jadwal sebelum berkunjung. Ketika mereka membuka halaman web bisnismu dari HP, mereka ingin langsung melihat profil layanan, prosedur reservasi, dan tombol kontak yang jelas tanpa tampilan yang berantakan.',
      'Dalam operasional harian, usaha yang mengandalkan janji temu privat atau survei lokasi di Pondok Indah sering menghadapi kendala saat harus mencocokkan jadwal kosong dokter, pengajar, atau agen lewat chat manual. Mengintegrasikan AI agent WhatsApp dengan software penjadwalan custom dan otomasi pengingat membantu tim resepsionismu memberikan layanan yang tertib dan responsif.',
    ],
    whyNeedParagraphsEn: [
      'Pondok Indah in South Jakarta combines established residential neighborhoods with active commercial corridors. Across this area, businesses commonly include health, dental, and aesthetic clinics, property agencies, professional service offices, private tutoring and course centers, cafes and restaurants, and interior contractors.',
      'Customers and clients in Pondok Indah typically expect neatly structured service information and clear schedule confirmation before visiting. When they open your business webpage on their phones, they want to see service profiles, booking procedures, and direct contact buttons without visual clutter.',
      'In daily operations, businesses relying on private appointments or site viewings in Pondok Indah often run into friction when matching open slots across doctors, instructors, or agents through manual chat. Integrating a WhatsApp AI agent with custom scheduling software and automated reminders helps your front desk deliver orderly, responsive service.',
    ],
    typicalBusinessMixId: [
      'Klinik gigi, estetika, dan kesehatan keluarga di kawasan Pondok Indah',
      'Agen pemasaran properti, konsultan, dan kantor jasa profesional',
      'Lembaga kursus privat, bimbel, dan studio kebugaran',
      'Kafe, restoran, toko online, dan kontraktor desain interior',
    ],
    typicalBusinessMixEn: [
      'Dental, aesthetic, and family health clinics in the Pondok Indah area',
      'Property marketing agencies, consultants, and professional service offices',
      'Private course centers, tutoring institutes, and fitness studios',
      'Cafes, restaurants, online shops, and interior design contractors',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website penjelasan prosedur perawatan dan booking konsultasi privat klinik',
        titleEn: 'Treatment procedure guide and private consultation booking website for a clinic',
        businessTypeId: 'Klinik di Pondok Indah',
        businessTypeEn: 'Clinic in Pondok Indah',
        narrativeId:
          'Calon pasien klinik di Pondok Indah biasanya ingin membaca penjelasan prosedur perawatan dan profil tenaga medis secara tenang sebelum memesan jadwal. Kami merancang website dengan tipografi yang bersih, pemaparan layanan yang informatif, serta alur permintaan jadwal privat langsung ke WhatsApp resepsionis.',
        narrativeEn:
          'Prospective clinic patients in Pondok Indah usually prefer reading clear treatment procedure explanations and practitioner profiles before booking. We design a website with clean typography, informative service pages, and a private appointment request flow linked to reception’s WhatsApp.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp untuk info spesifikasi properti dan penjadwalan survei rumah',
        titleEn: 'WhatsApp assistant for property spec info and house viewing scheduling',
        businessTypeId: 'Properti di Pondok Indah',
        businessTypeEn: 'Property agency in Pondok Indah',
        narrativeId:
          'Calon pembeli atau penyewa properti di Pondok Indah sering menghubungi di akhir pekan untuk menanyakan luas tanah, jumlah kamar, status legalitas, dan jadwal kunjungan lokasi. AI agent menjawab rincian unit sesuai daftar resmi, mencatat kriteria anggaran, dan mengatur jadwal survei bersama agen.',
        narrativeEn:
          'Prospective property buyers or tenants in Pondok Indah often message on weekends asking about land size, bedroom counts, legal status, and viewing times. An AI agent answers unit details from the official listing sheet, records budget criteria, and coordinates viewing slots with the agent.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pengelolaan jadwal pengajar privat dan kuota sesi bulanan murid',
        titleEn: 'Private instructor schedule and student monthly session quota web app',
        businessTypeId: 'Bimbel dan kursus privat di Pondok Indah',
        businessTypeEn: 'Tutoring and private course center in Pondok Indah',
        narrativeId:
          'Lembaga kursus musik atau bahasa privat di Pondok Indah sering kesulitan memantau sisa kuota pertemuan tiap murid dan ketersediaan ruangan per jam. Kami membangun web app operasional yang mencatat kehadiran sesi secara langsung dan menghitung sisa kuota belajar tanpa rekap manual.',
        narrativeEn:
          'Private music or language course centers in Pondok Indah often struggle to track each student’s remaining session quota alongside hourly room availability. We build an operational web app that logs session attendance live and calculates remaining quotas without manual tallying.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi konfirmasi janji temu H-1 dan penawaran slot kosong ke daftar tunggu',
        titleEn: 'Automated day-before appointment confirmations and waitlist slot notifications',
        businessTypeId: 'Klinik dan jasa profesional di Pondok Indah',
        businessTypeEn: 'Clinic and professional service in Pondok Indah',
        narrativeId:
          'Pembatalan janji temu mendadak sering membuat slot jam praktik terbuang sia-sia jika resepsionis harus menghubungi pasien satu per satu. Otomasi workflow mengirim pesan konfirmasi WhatsApp H-1 secara terjadwal dan langsung memberi tahu admin apabila ada slot yang bisa dialihkan ke daftar tunggu.',
        narrativeEn:
          'Last-minute cancellations often leave prime appointment slots empty when receptionists have to message patients one by one. Workflow automation sends scheduled day-before WhatsApp confirmations and immediately alerts admins when a slot opens up for the waitlist.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Pondok Indah',
    howWeWorkHeadingEn: 'How we work with clients in Pondok Indah',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Diskusi perancangan, demo kemajuan proyek, dan serah terima panduan bersama klien di Pondok Indah dilakukan secara online melalui WhatsApp dan video call.',
      'Apabila diperlukan pertemuan tatap muka di area Tangerang Selatan, jadwal dapat kita sepakati terlebih dahulu. Setiap proyek dijalankan melalui empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Design discussions, project progress demos, and guide handovers with clients in Pondok Indah are conducted online via WhatsApp and video call.',
      'Whenever an in-person meeting in the South Tangerang area is needed, we can schedule it by mutual agreement. Every project runs through four clear steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami mempelajari kebutuhan tampilan web atau alur layanan pelanggan bisnismu di Pondok Indah sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau prototipe desain halaman, gaya bahasa AI agent, atau tata letak aplikasi sebelum pengerjaan penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun sistem secara bertahap dan menguji keakuratan alurnya bersama tim resepsionis atau operasionalmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan penuh lengkap dengan panduan praktis untuk stafmu serta garansi perbaikan bug 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We study your web layout needs or customer service flows in Pondok Indah before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page design prototype, AI agent tone of voice, or application layout before full build.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system in stages and test flow accuracy alongside your reception or operations team.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system launches in full with practical staff guides and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang dapat disesuaikan dengan kebutuhan bisnis dan layanan di Pondok Indah:',
    servicesIntroEn:
      'Four services tailored to the needs of businesses and service providers in Pondok Indah:',
    faqsId: [
      {
        question: 'Apakah gaya bahasa AI agent WhatsApp bisa diatur agar sopan dan sesuai standar layanan kami di Pondok Indah?',
        answer:
          'Ya, sapaan, gaya bahasa, dan batasan informasi AI agent diatur sepenuhnya mengikuti panduan komunikasi bisnismu. Untuk pertanyaan konsultasi mendalam atau permintaan khusus, AI agent akan langsung meneruskan percakapan ke staf manusia.',
      },
      {
        question: 'Berapa biaya pembuatan website dan sistem otomasi untuk usaha di Pondok Indah?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000. Sedangkan untuk AI agent WhatsApp, software custom, dan otomasi workflow, biayanya dihitung secara transparan setelah sesi audit gratis 30 menit bersama kamu.',
      },
      {
        question: 'Bagaimana proses koordinasi selama pembuatan website atau aplikasi berlangsung?',
        answer:
          'Seluruh pembaruan progres dan sesi demo dilakukan secara terjadwal lewat WhatsApp dan video call sehingga tidak mengganggu jam operasional bisnismu di Pondok Indah. Pertemuan langsung di area Tangerang Selatan juga dapat diatur dengan kesepakatan.',
      },
    ],
    faqsEn: [
      {
        question: 'Can the WhatsApp AI agent’s tone be configured to stay polite and match our service standards in Pondok Indah?',
        answer:
          'Yes, greetings, phrasing, and knowledge boundaries are fully configured around your business communication guidelines. For in-depth consultations or special requests, the AI agent smoothly hands the conversation over to your human staff.',
      },
      {
        question: 'How much do website development and automation systems cost for businesses in Pondok Indah?',
        answer:
          'Website development starts at IDR 1,200,000. For WhatsApp AI agents, custom software, and workflow automation, pricing is calculated transparently after a free 30-minute audit session with you.',
      },
      {
        question: 'How does coordination work while the website or application is being built?',
        answer:
          'All progress updates and demo sessions run on schedule via WhatsApp and video call so they never disrupt your operating hours in Pondok Indah. In-person meetings in the South Tangerang area can also be arranged by agreement.',
      },
    ],
    ctaHeadingId: 'Ingin merapikan website, reservasi chat, atau jadwal operasional di Pondok Indah?',
    ctaHeadingEn: 'Want to refine your website, chat bookings, or operational schedules in Pondok Indah?',
    ctaBodyId:
      'Mulai dari sesi audit gratis 30 menit via WhatsApp untuk memetakan solusi yang paling pas bagi bisnismu di Pondok Indah.',
    ctaBodyEn:
      'Start with a free 30-minute audit session via WhatsApp to map out the best-fit solution for your business in Pondok Indah.',
  },

  // 29. KEBAYORAN LAMA (Jakarta Selatan, Wave 4)
  {
    slug: 'kebayoran-lama',
    nameId: 'Kebayoran Lama',
    nameEn: 'Kebayoran Lama',
    regionGroup: 'jakarta-selatan',
    regionLabelId: 'Kebayoran Lama, Jakarta Selatan',
    regionLabelEn: 'Kebayoran Lama, South Jakarta',
    schemaType: 'AdministrativeArea',
    wave: 4,
    publishAt: '2026-11-19',
    hasServiceAreaPages: false,
    nearbySlugs: ['pondok-indah', 'bintaro', 'ciledug', 'jakarta-selatan'],
    factsSummaryId:
      'Kecamatan di Jakarta Selatan yang berdekatan dengan Pondok Indah, Bintaro, dan Ciledug, mencakup koridor komersial dan kawasan permukiman.',
    factsSummaryEn:
      'A subdistrict in South Jakarta adjacent to Pondok Indah, Bintaro, and Ciledug, encompassing commercial corridors and residential neighborhoods.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Kebayoran Lama, Jakarta Selatan. Mulai Rp1.200.000, audit gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in Kebayoran Lama, South Jakarta. From IDR 1.2M, free 30-minute audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di Kecamatan Kebayoran Lama, Jakarta Selatan. Cocok bagi toko online, klinik, kafe dan restoran, kos-kosan, kontraktor, maupun jasa profesional. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses in Kebayoran Lama, South Jakarta. Built for online shops, clinics, cafes and restaurants, boarding houses, contractors, and professional services. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Usahamu di Kebayoran Lama melayani transaksi harian yang ramai dan membutuhkan katalog web yang jelas, balasan chat pesanan 24/7, atau pembukuan stok gudang yang tertib.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan alur penerimaan pesanan atau pencatatan barang bisnismu sebelum kamu membayar apa pun.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai jumlah halaman, aturan AI agent, dan fitur aplikasi.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in Kebayoran Lama handles busy daily transactions and needs a clear web catalog, 24/7 order chat replies, or orderly warehouse stock records.',
      mulaiDari:
        'A free 30-minute audit to map your order intake or inventory recording workflows before you pay anything.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page count, AI agent rules, and app features.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Kebayoran Lama butuh ini',
    whyNeedHeadingEn: 'Why businesses in Kebayoran Lama need this',
    whyNeedParagraphsId: [
      'Kebayoran Lama merupakan kecamatan di bagian barat Jakarta Selatan yang berdekatan dengan Pondok Indah, Bintaro, dan Ciledug, dengan aktivitas koridor komersial dan kawasan permukiman yang padat. Di wilayah ini, umumnya beroperasi usaha seperti toko online dan gudang pemenuhan pesanan, kafe dan restoran, klinik kesehatan, kos-kosan, bimbel, kontraktor, serta jasa profesional.',
      'Pada usaha perdagangan dan jasa di Kebayoran Lama, calon pembeli biasanya menanyakan ketersediaan barang, ukuran, atau jadwal layanan hari itu juga lewat WhatsApp. Memiliki halaman web yang merangkum katalog produk beserta harga awal dan AI agent yang sigap menjawab di luar jam kerja mencegah calon pelanggan beralih ke tempat lain saat admin sedang sibuk mengemas pesanan.',
      'Tantangan lain yang sering dialami pemilik usaha di Kebayoran Lama adalah selisih catatan barang masuk, barang keluar, dan retur yang masih ditulis manual di kertas atau tercecer di grup chat. Membangun aplikasi web pencatatan stok dan mengotomasi pengiriman nomor resi maupun rekap harian membuat operasional gudang dan kasir jauh lebih terkontrol.',
    ],
    whyNeedParagraphsEn: [
      'Kebayoran Lama is a subdistrict in western South Jakarta adjacent to Pondok Indah, Bintaro, and Ciledug, featuring busy commercial corridors and dense residential neighborhoods. Across this area, common businesses include online shops and fulfillment warehouses, cafes and restaurants, health clinics, boarding houses, tutoring centers, contractors, and professional services.',
      'For retail and service businesses in Kebayoran Lama, prospective buyers typically ask about item availability, sizes, or same-day service slots via WhatsApp. Having a webpage that summarizes product catalogs with starting prices alongside an AI agent that replies after hours prevents buyers from leaving while admins are busy packing orders.',
      'Another challenge frequently faced by business owners in Kebayoran Lama is discrepancies across inbound stock, outbound shipments, and returns when logged on paper or scattered across chat groups. Building a stock-tracking web app and automating tracking number notifications and daily recaps keeps warehouse and cashier operations under control.',
    ],
    typicalBusinessMixId: [
      'Toko online, supplier grosir, dan gudang pengiriman barang di Kebayoran Lama',
      'Kafe, restoran, usaha kuliner, dan klinik kesehatan di koridor komersial',
      'Pengelola kos-kosan, properti sewa, dan bimbel di kawasan permukiman',
      'Jasa kontraktor renovasi, bengkel layanan, dan jasa profesional',
    ],
    typicalBusinessMixEn: [
      'Online shops, wholesale suppliers, and fulfillment warehouses in Kebayoran Lama',
      'Cafes, restaurants, food outlets, and health clinics along commercial corridors',
      'Boarding house managers, rental properties, and tutoring centers in residential areas',
      'Renovation contractors, service workshops, and professional firms',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website katalog produk dan ketentuan pemesanan grosir untuk toko online',
        titleEn: 'Product catalog and wholesale ordering terms website for an online shop',
        businessTypeId: 'Toko online di Kebayoran Lama',
        businessTypeEn: 'Online shop in Kebayoran Lama',
        narrativeId:
          'Pembeli eceran maupun reseller di Kebayoran Lama sering meminta daftar produk beserta spesifikasi ukuran dan syarat pembelian minimum. Kami merancang website katalog yang ringan dibuka di HP sehingga pelanggan dapat memilih kode barang dengan tepat sebelum menekan tombol pesan WhatsApp.',
        narrativeEn:
          'Retail buyers and resellers in Kebayoran Lama frequently ask for product lists, size specs, and minimum order terms. We build a fast mobile catalog website so customers select exact item codes before tapping the WhatsApp order button.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'Asisten WhatsApp cek stok ukuran dan pencatatan format order otomatis',
        titleEn: 'WhatsApp assistant for size stock checks and automated order formatting',
        businessTypeId: 'Toko online dan ritel di Kebayoran Lama',
        businessTypeEn: 'Online and retail shop in Kebayoran Lama',
        narrativeId:
          'Admin toko sering kewalahan membalas chat pertanyaan stok varian warna atau ukuran satu per satu saat jam pengiriman sore. AI agent memeriksa tabel stok terkini, menjawab pertanyaan pelanggan dalam hitungan detik, dan memandu pembeli mengisi format nama, alamat, serta pesanan secara rapi.',
        narrativeEn:
          'Shop admins often get overwhelmed replying to individual color or size availability chats during afternoon packing hours. An AI agent checks the live inventory sheet, replies within seconds, and guides buyers through submitting a clean name, address, and item order format.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Aplikasi pembukuan keluar-masuk barang gudang dan pelacakan retur',
        titleEn: 'Warehouse inbound-outbound bookkeeping and return tracking web app',
        businessTypeId: 'Gudang logistik dan toko online di Kebayoran Lama',
        businessTypeEn: 'Logistics warehouse and online shop in Kebayoran Lama',
        narrativeId:
          'Ketika volume paket harian meningkat, mencatat barang yang keluar ke kurir dan paket retur yang kembali lewat buku tulis sering menimbulkan selisih stok akhir bulan. Kami membangun web app operasional gudang agar staf mencatat mutasi barang dan kondisi barang retur secara terpusat dari HP.',
        narrativeEn:
          'As daily parcel volumes rise, logging outbound courier handovers and returned packages in paper notebooks often causes month-end stock discrepancies. We build a warehouse operational web app so staff record stock movements and return conditions centrally from their phones.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi notifikasi nomor resi ke pembeli dan rekap omzet harian',
        titleEn: 'Automated buyer tracking number notifications and daily revenue recaps',
        businessTypeId: 'Toko online dan kuliner di Kebayoran Lama',
        businessTypeEn: 'Online shop and food business in Kebayoran Lama',
        narrativeId:
          'Menyalin nomor resi pengiriman ke chat pembeli satu per satu setiap sore sangat menyita waktu admin. Otomasi workflow mengirim pesan WhatsApp berisi nomor resi begitu data diinput ke tabel pengiriman dan mengirimkan ringkasan total transaksi harian ke pemilik usaha setiap malam.',
        narrativeEn:
          'Copying shipping tracking numbers into individual buyer chats every afternoon takes up hours of admin time. Workflow automation sends a WhatsApp message with the tracking number as soon as it is entered into the shipping sheet and delivers a daily transaction summary to the owner each night.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Kebayoran Lama',
    howWeWorkHeadingEn: 'How we work with clients in Kebayoran Lama',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Koordinasi pengerjaan proyek bersama pemilik usaha dan tim di Kebayoran Lama dijalankan secara online melalui WhatsApp dan video call.',
      'Untuk klien yang membutuhkan diskusi tatap muka di area Tangerang Selatan, jadwal pertemuan dapat disepakati bersama. Setiap proyek kami jalankan dalam empat langkah berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Project coordination with business owners and teams in Kebayoran Lama runs online via WhatsApp and video call.',
      'For clients who prefer an in-person discussion in the South Tangerang area, meetings can be arranged by agreement. We run every project through four clear steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memeriksa kebutuhan halaman web atau alur operasional gudang dan kasir bisnismu di Kebayoran Lama sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau rancangan katalog web, alur chat AI agent, atau kolom pencatatan aplikasi sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami mengembangkan sistem secara bertahap dan menguji kemudahannya bersama admin atau staf gudangmu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan penuh dengan panduan operasional ringkas serta garansi perbaikan bug selama 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We inspect your webpage needs or warehouse and cashier workflows in Kebayoran Lama before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the web catalog layout, AI agent chat flow, or application recording fields before full build.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We develop the system in stages and test its usability alongside your admin or warehouse staff.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system launches in full with concise operational guides and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Empat layanan yang siap membantu merapikan penjualan dan operasional usaha di Kebayoran Lama:',
    servicesIntroEn:
      'Four services ready to help organize sales and operational workflows for businesses in Kebayoran Lama:',
    faqsId: [
      {
        question: 'Apakah tampilan aplikasi pencatatan stok bisa dibuat sederhana agar mudah dipakai staf gudang kami?',
        answer:
          'Ya, kami merancang tombol dan formulir aplikasi mengikuti istilah yang sudah biasa dipakai stafmu sehari-hari di Kebayoran Lama. Staf cukup membuka aplikasi dari browser HP tanpa harus mempelajari menu rumit yang tidak diperlukan.',
      },
      {
        question: 'Berapa biaya pembuatan website dan sistem otomasi untuk usaha di Kebayoran Lama?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000. Untuk layanan AI agent WhatsApp, software custom, dan otomasi workflow, biayanya kami hitungkan secara jelas setelah sesi audit gratis 30 menit.',
      },
      {
        question: 'Apakah kami bisa memulai dari pembuatan website atau AI agent dulu sebelum membuat aplikasi gudang?',
        answer:
          'Tentu bisa, banyak pemilik usaha memulai dari bagian yang paling mendesak terlebih dahulu, misalnya merapikan website katalog atau balasan chat WhatsApp. Sistem yang kami buat disiapkan agar mudah disambungkan ke tahap berikutnya saat usahamu siap.',
      },
    ],
    faqsEn: [
      {
        question: 'Can the stock-recording app interface be kept simple so our warehouse staff can use it easily?',
        answer:
          'Yes, we design buttons and forms using the everyday terms your staff in Kebayoran Lama already know. Staff simply open the web app from their phone browsers without navigating complicated, unnecessary menus.',
      },
      {
        question: 'How much do website development and automation systems cost for businesses in Kebayoran Lama?',
        answer:
          'Website development starts at IDR 1,200,000. For WhatsApp AI agents, custom software, and workflow automation, pricing is calculated clearly after the free 30-minute audit session.',
      },
      {
        question: 'Can we start with a website or AI agent first before building a warehouse application?',
        answer:
          'Certainly, many business owners start with their most urgent bottleneck first, such as tidying up a web catalog or WhatsApp chat replies. The systems we build are structured to connect smoothly to the next phase whenever you are ready.',
      },
    ],
    ctaHeadingId: 'Siap merapikan alur pesanan dan pencatatan stok usahamu di Kebayoran Lama?',
    ctaHeadingEn: 'Ready to streamline order flows and stock records for your business in Kebayoran Lama?',
    ctaBodyId:
      'Ceritakan kendala chat pelanggan atau pembukuan barang yang paling menyita waktumu di Kebayoran Lama lewat audit gratis 30 menit via WhatsApp.',
    ctaBodyEn:
      'Share the customer chat or inventory bookkeeping bottlenecks taking up your time in Kebayoran Lama through a free 30-minute WhatsApp audit.',
  },

  // 30. JAKARTA SELATAN (Jakarta Selatan, Wave 5)
  {
    slug: 'jakarta-selatan',
    nameId: 'Jakarta Selatan',
    nameEn: 'South Jakarta',
    regionGroup: 'jakarta-selatan',
    regionLabelId: 'Jakarta Selatan',
    regionLabelEn: 'South Jakarta',
    schemaType: 'AdministrativeArea',
    wave: 5,
    publishAt: '2026-11-26',
    hasServiceAreaPages: false,
    nearbySlugs: ['lebak-bulus', 'cilandak', 'tb-simatupang', 'pondok-indah', 'kebayoran-lama'],
    factsSummaryId:
      'Wilayah Jakarta Selatan mencakup kawasan perkantoran, koridor komersial, kawasan permukiman, serta simpul transit seperti Stasiun MRT Lebak Bulus.',
    factsSummaryEn:
      'South Jakarta encompasses office districts, commercial corridors, residential neighborhoods, and transit nodes such as Lebak Bulus MRT Station.',
    metaDescriptionId:
      'Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi bisnis di Jakarta Selatan. Mulai Rp1.200.000 dengan audit alur kerja gratis 30 menit.',
    metaDescriptionEn:
      'Website development, WhatsApp AI agents, custom software, and business automation in South Jakarta. Starting at IDR 1.2M with a free 30-minute workflow audit.',
    quickSummaryId:
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pembuatan website, AI agent WhatsApp, software custom, serta otomasi workflow untuk bisnis di seluruh wilayah Jakarta Selatan. Dirancang bagi jasa profesional, klinik, kafe dan restoran, properti, kontraktor, bimbel, maupun toko online. Website mulai Rp1.200.000, lainnya dihitung setelah audit gratis.',
    quickSummaryEn:
      'CHESTAADOTCOM is based in BSD, South Tangerang and provides website development, WhatsApp AI agents, custom software, and workflow automation for businesses across South Jakarta. Built for professional services, clinics, cafes and restaurants, property, contractors, tutoring centers, and online shops. Websites start at IDR 1,200,000.',
    cekCepatId: {
      cocokKalau:
        'Bisnismu di Jakarta Selatan membutuhkan website cepat untuk konversi pengunjung, AI agent WhatsApp untuk respons pelanggan 24/7, atau sistem operasional lintas cabang.',
      mulaiDari:
        'Audit gratis 30 menit via WhatsApp atau video call untuk membedah alur akuisisi pelanggan dan proses kerja harian timmu.',
      harga:
        'Harga mulai Rp1.200.000 untuk website, lainnya dihitung setelah audit gratis sesuai cakupan halaman, aturan AI agent, dan integrasi sistem.',
    },
    cekCepatEn: {
      cocokKalau:
        'Your business in South Jakarta needs a fast website for visitor conversion, a 24/7 WhatsApp AI agent for customer replies, or multi-branch operational software.',
      mulaiDari:
        'A free 30-minute audit via WhatsApp or video call to break down your customer acquisition and daily team workflows.',
      harga:
        'Pricing starts at IDR 1,200,000 for websites, others calculated after the free audit based on page scope, AI agent rules, and system integrations.',
    },
    whyNeedHeadingId: 'Kenapa bisnis di Jakarta Selatan butuh ini',
    whyNeedHeadingEn: 'Why businesses in South Jakarta need this',
    whyNeedParagraphsId: [
      'Jakarta Selatan memadukan kawasan perkantoran seperti koridor TB Simatupang, kawasan permukiman dan koridor komersial di Pondok Indah, Cilandak, serta Kebayoran Lama, hingga simpul komuter di Stasiun MRT Lebak Bulus. Di wilayah ini, umumnya beroperasi beragam usaha mulai dari kantor jasa profesional, klinik kesehatan, kafe dan restoran, properti, kontraktor, bimbel, kos-kosan, hingga toko online.',
      'Di tengah tingginya aktivitas digital di Jakarta Selatan, calon pelanggan maupun mitra perusahaan biasanya membandingkan beberapa penyedia layanan sekaligus dari layar HP. Halaman web yang lambat dibuka atau tidak menjelaskan cakupan layanan dan langkah pemesanan secara lugas sering membuat pengunjung langsung menutup halaman sebelum menghubungi timmu.',
      'Di sisi operasional, bisnis di Jakarta Selatan yang menangani puluhan chat harian atau memiliki beberapa titik layanan sering terhambat oleh pekerjaan administrasi berulang: membalas pertanyaan yang sama di WhatsApp, menyalin data prospek ke spreadsheet, hingga merekap laporan cabang secara manual. Menggabungkan website yang terstruktur, AI agent WhatsApp, dan software operasional custom membuat timmu bekerja jauh lebih efisien.',
    ],
    whyNeedParagraphsEn: [
      'South Jakarta blends major office districts like the TB Simatupang corridor, residential and commercial corridors across Pondok Indah, Cilandak, and Kebayoran Lama, and commuter hubs around Lebak Bulus MRT Station. Across this region, businesses commonly include professional service firms, health clinics, cafes and restaurants, property agencies, contractors, tutoring centers, boarding houses, and online shops.',
      'Amid South Jakarta’s fast-paced digital activity, prospective customers and corporate partners typically compare multiple providers side by side on their phones. A webpage that loads slowly or fails to explain service scopes and booking steps clearly often causes visitors to bounce before ever contacting your team.',
      'On the operational side, businesses in South Jakarta handling dozens of daily chats or running multiple service points are frequently slowed down by repetitive admin work: answering identical WhatsApp questions, copying lead data into spreadsheets, and compiling branch reports by hand. Combining a structured website, a WhatsApp AI agent, and custom operational software lets your team work far more efficiently.',
    ],
    typicalBusinessMixId: [
      'Perusahaan jasa profesional, konsultan B2B, dan kontraktor di kawasan perkantoran Jakarta Selatan',
      'Klinik kesehatan, gigi, dan estetika di koridor komersial serta kawasan permukiman',
      'Kafe, restoran, katering, dan toko online dengan volume pesanan harian tinggi',
      'Agen properti, pengelola kos-kosan, dan lembaga bimbel atau kursus',
    ],
    typicalBusinessMixEn: [
      'Professional service firms, B2B consultants, and contractors across South Jakarta office districts',
      'Health, dental, and aesthetic clinics along commercial corridors and residential neighborhoods',
      'Cafes, restaurants, catering businesses, and online shops with high daily order volumes',
      'Property agencies, boarding house managers, and tutoring or course institutes',
    ],
    scenarios: [
      {
        serviceSlug: 'pembuatan-website',
        serviceLabelId: 'Pembuatan Website',
        serviceLabelEn: 'Website Development',
        titleId: 'Website profil layanan, studi alur kerja, dan tangkapan prospek untuk perusahaan jasa',
        titleEn: 'Service profile, workflow study, and lead capture website for a service firm',
        businessTypeId: 'Jasa profesional di Jakarta Selatan',
        businessTypeEn: 'Professional service firm in South Jakarta',
        narrativeId:
          'Perusahaan jasa dan konsultan di Jakarta Selatan memerlukan website yang tidak sekadar menjadi brosur statis, melainkan mampu menjawab keraguan awal calon klien dan mengarahkan mereka ke diskusi konsultasi. Kami membangun website cepat dengan arsitektur informasi yang jelas serta formulir terstruktur ke WhatsApp.',
        narrativeEn:
          'Service and consulting firms in South Jakarta need a website that acts as more than a static brochure—answering initial client questions and guiding visitors toward a consultation. We build fast websites with clear information architecture and structured WhatsApp intake forms.',
      },
      {
        serviceSlug: 'ai-agent',
        serviceLabelId: 'AI Agent',
        serviceLabelEn: 'AI Agent',
        titleId: 'AI agent layanan pelanggan dan pengarah jadwal reservasi multi-cabang',
        titleEn: 'Multi-branch customer service and booking router WhatsApp AI agent',
        businessTypeId: 'Klinik dan studio layanan di Jakarta Selatan',
        businessTypeEn: 'Clinic and service studio in South Jakarta',
        narrativeId:
          'Usaha klinik atau studio layanan yang melayani pelanggan di beberapa lokasi Jakarta Selatan sering menerima ratusan chat yang menanyakan cabang terdekat dan jam kosong. AI agent membantu pelanggan memilih lokasi cabang, memeriksa slot di kalender cabang terkait, dan meneruskan data booking ke admin.',
        narrativeEn:
          'Clinics or service studios serving customers across multiple South Jakarta locations often receive hundreds of chats asking for the nearest branch and open slots. An AI agent helps customers pick a branch, checks that location’s live calendar, and routes booking details to the branch admin.',
      },
      {
        serviceSlug: 'software-custom',
        serviceLabelId: 'Software Custom',
        serviceLabelEn: 'Custom Software',
        titleId: 'Dashboard operasional terpusat untuk pencatatan stok, suhu, dan barang gagal',
        titleEn: 'Centralized operational dashboard for stock, temperature, and spoilage logs',
        businessTypeId: 'Kafe, restoran, dan brand minuman di Jakarta Selatan',
        businessTypeEn: 'Cafe, restaurant, and beverage brand in South Jakarta',
        narrativeId:
          'Pemilik usaha F&B di Jakarta Selatan sering kesulitan memantau konsistensi pencatatan suhu penyimpanan, pembukuan bahan baku, serta pelacakan barang gagal di tiap gerai. Kami merancang web app custom agar staf di setiap titik mencatat laporan harian dari HP ke satu sistem terpusat.',
        narrativeEn:
          'F&B business owners in South Jakarta often struggle to monitor storage temperature checks, ingredient bookkeeping, and spoilage tracking consistently across outlets. We design a custom web app so staff at every location log daily reports from their phones into one central system.',
      },
      {
        serviceSlug: 'otomasi-workflow',
        serviceLabelId: 'Otomasi Workflow',
        serviceLabelEn: 'Workflow Automation',
        titleId: 'Otomasi pipeline prospek, pengingat janji temu, dan ringkasan laporan mingguan',
        titleEn: 'Automated lead pipeline, appointment reminders, and weekly report summaries',
        businessTypeId: 'Properti, kontraktor, dan bimbel di Jakarta Selatan',
        businessTypeEn: 'Property, contractor, and tutoring business in South Jakarta',
        narrativeId:
          'Ketika data prospek dari iklan, jadwal survei atau kelas, serta rekap pembayaran dikelola secara terpisah, tim operasional mudah kehilangan jejak tindak lanjut. Otomasi workflow menghubungkan formulir web, WhatsApp, dan spreadsheet utama sehingga setiap perubahan status tercatat otomatis.',
        narrativeEn:
          'When ad leads, viewing or class schedules, and payment recaps are managed separately, operations teams easily lose track of follow-ups. Workflow automation connects web forms, WhatsApp, and master sheets so every status update is logged automatically.',
      },
    ],
    howWeWorkHeadingId: 'Cara kami bekerja dengan klien di Jakarta Selatan',
    howWeWorkHeadingEn: 'How we work with clients in South Jakarta',
    howWeWorkParagraphsId: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Kolaborasi bersama klien di seluruh wilayah Jakarta Selatan kami jalankan secara online melalui WhatsApp dan video call agar praktis dan hemat waktu.',
      'Untuk klien yang menginginkan diskusi tatap muka di area Tangerang Selatan, jadwal pertemuan dapat disepakati bersama terlebih dahulu. Setiap proyek dikerjakan mengikuti empat langkah kerja berikut.',
    ],
    howWeWorkParagraphsEn: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. Collaboration with clients across South Jakarta runs online via WhatsApp and video call to stay practical and time-efficient.',
      'For clients who prefer an in-person discussion in the South Tangerang area, meetings can be scheduled by mutual agreement. Every project follows four structured steps.',
    ],
    processStepsId: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami membedah kebutuhan website atau alur operasional bisnismu di Jakarta Selatan sebelum kamu membayar apa pun.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau struktur halaman, alur percakapan AI, atau rancangan aplikasi sebelum pengembangan penuh dimulai.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Kami membangun sistem secara bertahap dan mengujinya pada berbagai perangkat serta skenario kerja nyata.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan serah terima',
        sentence:
          'Sistem diluncurkan penuh lengkap dengan dokumentasi panduan untuk timmu dan garansi perbaikan bug 30 hari.',
      },
    ],
    processStepsEn: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We break down your website needs or operational workflows in South Jakarta before you pay anything.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure, AI conversation flow, or application design before full development begins.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'We build the system in stages and test it across devices and real operational scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Launch and handover',
        sentence:
          'The system launches in full with team documentation guides and a 30-day bug-fix warranty.',
      },
    ],
    servicesIntroId:
      'Empat layanan utama yang dapat kamu gunakan untuk mendukung pertumbuhan bisnis di Jakarta Selatan:',
    servicesIntroEn:
      'Four core services you can use to support your business growth in South Jakarta:',
    faqsId: [
      {
        question: 'Area mana saja di Jakarta Selatan yang dilayani oleh CHESTAADOTCOM?',
        answer:
          'Kami melayani bisnis di seluruh Jakarta Selatan, termasuk Lebak Bulus, Cilandak, koridor TB Simatupang, Pondok Indah, dan Kebayoran Lama. Seluruh proses konsultasi hingga rilis sistem dapat dilakukan secara online via WhatsApp dan video call, atau bertemu di area Tangerang Selatan dengan kesepakatan.',
      },
      {
        question: 'Berapa biaya pembuatan website dan pengembangan sistem untuk bisnis di Jakarta Selatan?',
        answer:
          'Harga pembuatan website mulai dari Rp1.200.000 dengan estimasi pengerjaan 1 sampai 3 minggu. Untuk AI agent WhatsApp, software custom, dan otomasi workflow, biayanya dihitung secara proporsional setelah sesi audit gratis 30 menit bersama timmu.',
      },
      {
        question: 'Apakah kami bisa mengintegrasikan website, AI agent WhatsApp, dan software operasional secara bertahap?',
        answer:
          'Ya, kamu bisa memulai dari satu layanan yang paling mendesak terlebih dahulu lalu menambahkan layanan lainnya secara bertahap. Fondasi teknis yang kami bangun disiapkan agar mudah terhubung tanpa harus membongkar ulang sistem dari nol.',
      },
    ],
    faqsEn: [
      {
        question: 'Which areas in South Jakarta are served by CHESTAADOTCOM?',
        answer:
          'We serve businesses across South Jakarta, including Lebak Bulus, Cilandak, the TB Simatupang corridor, Pondok Indah, and Kebayoran Lama. The entire process from consultation to launch runs online via WhatsApp and video call, or in person in the South Tangerang area by agreement.',
      },
      {
        question: 'How much do website development and system projects cost for businesses in South Jakarta?',
        answer:
          'Website development starts at IDR 1,200,000 with an estimated timeline of 1 to 3 weeks. For WhatsApp AI agents, custom software, and workflow automation, pricing is calculated proportionally after a free 30-minute audit session with your team.',
      },
      {
        question: 'Can we integrate a website, WhatsApp AI agent, and operational software in phases?',
        answer:
          'Yes, you can start with your most urgent priority first and add other services over time. The technical foundation we build is designed to connect cleanly without rebuilding your system from scratch.',
      },
    ],
    ctaHeadingId: 'Siap membangun website, AI agent, atau software operasional di Jakarta Selatan?',
    ctaHeadingEn: 'Ready to build a website, AI agent, or operational software in South Jakarta?',
    ctaBodyId:
      'Hubungi kami via WhatsApp untuk sesi audit gratis 30 menit dan temukan solusi teknologi yang paling berdampak bagi bisnismu di Jakarta Selatan.',
    ctaBodyEn:
      'Contact us via WhatsApp for a free 30-minute audit session and find the highest-impact technology solution for your business in South Jakarta.',
  },
];
