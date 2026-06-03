export interface Project {
  id: string;
  title: string;
  client?: string;
  duration?: string;
  category: 'Website' | 'Landing Page' | 'Company Profile';
  description: string;
  techStack: string[];
  features: string[];
  liveLink: string;
  thumbnail: string;
  overview?: string;
  challenges?: string;
  solution?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'sentra-publishing',
    title: 'Sentra Publishing Jurnal',
    client: 'Sentra Publishing',
    duration: '2 Minggu',
    category: 'Website',
    description: 'Transformasi digital website akademik publikasi jurnal. Dirancang minim distraksi, mempercepat proses submission naskah, dan 100% SEO-optimized untuk indek Google Scholar.',
    techStack: ['Next.js 15', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Academic Minimalist Interface',
      'Article Search & Filtering',
      'Submission Portal Integrations',
      'Mobile-First Layout',
      'Speed-Optimized Architecture'
    ],
    overview: 'Sentra Publishing membutuhkan sebuah ekosistem digital terpadu untuk menampilkan katalog jurnal dan paper secara bersih, terbaca, dan elegan. Tujuan utamanya adalah untuk mempermudah akses informasi penting bagi kalangan civitas akademika, sekaligus mengundang pemikir dan peneliti untuk menyerahkan naskahnya tanpa proses yang berbelit-belit. Menggunakan standar UI modern "Coding-Minimalist", sistem ini dibangun dari nol dengan arsitektur headless untuk memastikan keamanan dan kecepatan rute navigasi antar laman publikasi jurnal.',
    challenges: 'Dunia akademik sering identik dengan antarmuka portal jurnal yang usang, kaku, sulit dinavigasi, dan sangat lambat saat memuat data bervolume tinggi. Selain itu, penulis naskah sering kali merasa kebingungan dengan letak persyaratan submission atau bingung cara mengeksplor jurnal sebelumnya. Tantangannya adalah mengubah paradigma lama itu—mengubah portal yang berat menjadi layaknya platform majalah digital ultra-modern estetis yang secara psikologis meningkatkan trust issue positif serta mendongkrak persentase konversi submission penulis serta sitasi literatur harian secara drastis.',
    solution: 'Kami merombak total antarmukanya. Mengaplikasikan prinsip whitespace yang sangat lega khas Apple Minimalism dan memadukannya dengan tipografi yang jernih. Di balik layar, arsitektur website menggunakan fondasi Next.js 15 App Router menjamin server-side rendering (SSR) dengan loading lambai secepat 0.8 detik. Sebagai pelengkap pamungkas, setiap halaman jurnal otomatis disuntikkan struktur data Schema.org dinamis yang sangat ramah terhadap crawler SEO Google Scholar maupun mesin pencarian publik lainnya, membuat visibilitas kampus meroket di pencarian organik.',
    liveLink: 'https://www.dytama.com/portofolio/sentra-publishing-website-publikasi-jurnal',
    thumbnail: 'https://mczjhlevgmvtdndemjxw.supabase.co/storage/v1/object/public/dytamastorage/portofolio/kXTNQS3EzNpHyRbnCBzsG.png'
  },
  {
    id: 'y-not-tech',
    title: 'Y Not Tech Company Profile',
    client: 'Y Not Tech',
    duration: '1 Minggu',
    category: 'Company Profile',
    description: 'Website company profile agency digital dan IT solutions. Nuansa dark-mode eksklusif, micro-interactions, serta positioning copywriter yang super tajam untuk mengonversi prospek enterprise.',
    techStack: ['React', 'TypeScript', 'Lucide Icons'],
    features: [
      'Dark Mode Signature Design',
      'Services Bento-Grid',
      'Persuasive Copywriting Structure',
      'Responsive B2B Portfolio',
      'Direct WhatsApp Connect'
    ],
    overview: 'Sebagai software house & agensi IT baru yang sedang naik daun, Y Not Tech hadir meramaikan pasar digital B2B (Business-to-Business) dengan janji kualitas hasil kerja tingkat dewa. Bisnis model yang mengutamakan servis mahal tidak bisa direpresentasikan secara murahan; mereka membutuhkan etalase maya (company profile) kredibel yang berfungsi sebagai "silent-salesman". Web harus bisa mengagumkan klien dari detik pertama hingga penutupan kontak masuk WhatsApp tim sales mereka dalam mode autopilot 24 jam penuh tanpa lelah.',
    challenges: 'Realitanya, pain point pasar IT Agency lokal saat ini sudah terlampau jenuh (red ocean). Ribuan agensi menggunakan template yang serupa, bahasa penawaran yang monoton, dan layout yang klise. Y Not Tech membutuhkan distingsi pembeda ekstrem. Mereka harus mengomunikasikan prestise elit, kepercayaan solid enterprise-level, serta kemisteriusan elegan hanya dalam kurun waktu 3 detik evaluasi alam bawah sadar pengunjung begitu landing page di-render.',
    solution: 'Alih-alih menggunakan template biasa, kami mendisrupsi desain pasar dengan DNA visual "Coding-Minimalist Aesthetic" era masa depan. Mengusung skema warna "Black Carbon" dominan dipadukan tipografi tajam High-Contrast "Space Grotesk" yang berteriak lantang tentang inovasi mutakhir, ditambah bento box minimalis bersudut tipis. Hasilnya bukan sekadar website company profile biasa—melainkan senjata portofolio interaktif dengan animasi page-load mikro Framer Motion organik yang membuat setiap kursor mouse pengunjung merasa dihargai dengan baik, memaksa atensi klien elit untuk segera tekan tombol hubungi.',
    liveLink: 'https://www.dytama.com/portofolio/y-not-tech',
    thumbnail: 'https://mczjhlevgmvtdndemjxw.supabase.co/storage/v1/object/public/dytamastorage/portofolio/mV_cIbrn4g_3EvlKpyXGN.png'
  },
  {
    id: 'seino-indomobil',
    title: 'Website Perusahaan Logistik Seino Indomobil',
    client: 'PT Seino Indomobil Logistics',
    duration: '1 Minggu',
    category: 'Website',
    description: 'Pengembangan website corporate logistik dengan desain modern, atau yang sering Anda dengar sebagai Seino Mobil. Dilengkapi navigasi seksi, bento-grid, dan performa loading super responsif.',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Modern Hero Section & Visual Skala',
      'Company Overview & Profil',
      'Logistics Services Showcase',
      'Operational Statistics',
      'Nationwide Coverage Section',
      'Responsive Design & SEO Friendly'
    ],
    overview: 'PT Seino Indomobil Logistics, sang raksasa logistik hasil joint venture perusahaan raksasa Indonesia dan Jepang, sudah lama tidak menyegarkan infrastruktur digital publiknya. Proyek prestisius ini menugaskan revitalisasi total atas portal corporate (company profile website) mereka. Memastikan website baru merefleksikan keperkasaan luar biasa armada truk mereka yang tersebar melayani ekosistem distribusi bisnis di seluruh penjuru kepulauan Nusantara, sembari mempermudah prospek calon klien industrial memperoleh kontak dealing.',
    challenges: 'Bagaimana merangkum skala operasional fisik logistik berton-ton bobot, dari truk Hino raksasa hingga pergudangan (warehouse) massal, ke dalam layar datar smartphone 6 inci tanpa membuat layernya terlihat sesak berantakan? Selain itu, tantangan utamanya adalah mengemas image perusahaan otomotif (yang biasanya brutal, kaku, dan maskulin) menjadi profil digital premium rapi, bersih, namun tetap memancarkan kekuatan infrastruktur nasional di mata pimpinan pengambil kebijakan (CEO, Manager Supply Chain partner), serta memastikan loading-nya cepat meski padat grafis kompresi tinggi.',
    solution: 'Pendekatan kami difokuskan pada "Cinematic Corporate Presence". Kami menyingkirkan text-heavy bullet points peninggalan era web 2.0 dan menggantinya dengan layout Bento Grid dinamis. Semua operasional dan coverage map ditampilkan secara asimetris dengan interaksi hover halus tanpa layout shifts. Dibangun dengan Next.js modern dan Image Optimization tingkat dewa dari Vercel untuk menjaga resolusi citra hero armada tetap tajam dengan ukuran super ringkas. Setiap inci page didedikasikan untuk membangun impresi profesionalisme tanpa kompromi.',
    liveLink: 'https://www.dytama.com/portofolio/website-logistik-seino-indomobil',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'rumah-tropis',
    title: 'Rumah Tropis Architecture Profile',
    client: 'Rumah Tropis',
    duration: '2 Minggu',
    category: 'Website',
    description: 'Etalase portofolio arsitektur premium dengan fokus pada estetika hunian tropis berkelas. Desain imersif dengan transisi sinematik untuk memanjakan mata calon klien elit.',
    techStack: ['Next.js 15', 'Framer Motion', 'Tailwind CSS'],
    features: [
      'Cinematic Portfolio Showcase',
      'Smooth Page Transitions',
      'High-Res Image Optimization',
      'Immersive Full-Screen Galleries',
      'Conversion-Ready Contact Flows'
    ],
    overview: 'Rumah Tropis adalah biro arsitektur terkemuka yang memfokuskan karyanya pada desain hunian beriklim tropis mutakhir. Mereka memiliki segudang portofolio desain visual (render 3D & fotografi as-built) bernilai estetika sangat tinggi. Namun, website lama mereka gagal mencerminkan detail kemewahan tersebut—terlalu banyak whitespace yang tidak terkonsep, navigasi membingungkan, dan resolusi gambar yang hancur saat dikompresi. Proyek ini bertujuan untuk menciptakan kembali "digital showroom" yang secara instan mengomunikasikan masterpiece mahal kepada calon klien.',
    challenges: 'Klien arsitektur kelas atas membeli "rasa" dan "trust" sebelum mereka melihat harga. Tantangannya adalah, bagaimana membangun sebuah website dengan ratusan foto properti resolusi 4K tanpa membuat page load-time menjadi belasan detik (yang akan sangat merugikan bagi bounce rate). Arsitektur web juga harus memiliki layout selayaknya galeri seniman—cukup senyap untuk membuat karya visualnya menjerit, namun tetap memiliki journey funnel yang jelas menuju tombol konsultasi.',
    solution: 'Kami menerapkan "Invisible UI Architecture", di mana antarmuka didesain setipis mungkin (menggunakan garis grid 1px dan tipografi sans-serif geometris) agar seluruh atensi pengunjung tersedot 100% pada galeri proyek. Digabungkan dengan teknologi Image Optimization bawaan ekosistem Next.js dan lazy loading agresif, ribuan gambar high-res kini meluncur responsif dalam sepersekian detik. Hover-state pada setiap kartu proyek ditambahkan sentuhan 3D tilt tipis via Framer Motion untuk memberikan nuansa taktil premium khas brand mahal.',
    liveLink: 'https://rumahtropis.co.id',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'mep-contractor',
    title: 'MEP General Contractor Network',
    client: 'Dytama & Partner',
    duration: '1 Minggu',
    category: 'Company Profile',
    description: 'Website korporat B2B tingkat enterprise untuk perusahaan kontraktor Mekanikal & Elektrikal (MEP). Presisi, maskulin, dan difokuskan penuh pada akuisisi tender.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Industrial Dark Theme',
      'Tender-Ready Document Request',
      'Past Projects Infrastructure',
      'Technical Capability Matrix',
      'B2B SEO Optimized'
    ],
    overview: 'Sebagai kontraktor General, Mechanical, dan Electrical (MEP) yang berurusan langsung dengan tender proyek infrastruktur jutaan dolar (pabrik, gedung bertingkat, fasilitas industrial), klien membutuhkan profil perusahaan digital (company profile B2B) yang memancarkan otoritas teknis dan presisi engineering mutakhir. Kredibilitas adalah mata uang utama di industri konstruksi; direktur pengadaan tidak akan menekan tombol "Contact Us" jika presentasi profil perusahaannya terlihat berantakan.',
    challenges: 'Banyak kontraktor MEP terjebak dalam gaya website konservatif era 2010—dipenuhi warna kuning peringatan, font kaku, teks spesifikasi teknis yang bertumpuk tanpa hierarki, serta foto lapangan yang blur. Tantangannya adalah mentransformasikan profil teknikal engineering tingkat berat tersebut ke dalam bahasa desain modern, elegan, namun tetap memancarkan DNA industrial yang solid dan dipercaya tanpa harus terlihat kuno atau kaku secara brutal.',
    solution: 'Pendekatan desain mengambil inspirasi dari "Architectural Blueprint". Kami memadukan base background warna "Slate/Carbon" dengan aksen vibrant (Safety Yellow / Electric Blue) untuk memunculkan aura presisi tingkat insinyur. Kami merapikan ratusan line item layanan instalasi elektrikal dan HVAC mekanikal menjadi sistem Accordion dan Bento Grid yang sangat rapi. Portofolio proyek disajikan dengan indikator skala, memamerkan kapasitas kontraktor. Loading time di-press di bawah 1 detik untuk memberikan kesan "seamlessly reliable".',
    liveLink: 'https://www.dytama.com/portofolio/electrical-mechanical-general-contractor',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1200&auto=format&fit=crop'
  }
];
