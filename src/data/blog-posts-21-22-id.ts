import { SITE_IMAGES } from '../config/images';
import type { RawBlogPostInput } from './blog-posts';

export const BLOG_POSTS_21_22_ID_RAW: RawBlogPostInput[] = [
  // ==========================================================================
  // ARTIKEL 21: Panduan Lengkap: Cara Kerja Agentic AI untuk Pemula
  // Penulis: Chesta Azka
  // ==========================================================================
  {
    slug: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
    alternateSlug: 'a-complete-guide-to-how-agentic-ai-works-for-beginners',
    locale: 'id',
    clusterId: 'agentic-ai',
    title: 'Panduan Lengkap: Cara Kerja Agentic AI untuk Pemula',
    seoTitle: 'Panduan Lengkap Cara Kerja Agentic AI Pemula | CHESTA',
    excerpt:
      'Pelajari cara kerja agentic AI dari konsep dasar hingga implementasi: perbedaan dengan chatbot biasa, anatomi 4 pilar, siklus kerja, batasan teknis, dan skenario nyata klinik BSD.',
    metaDescription:
      'Pelajari cara kerja agentic AI untuk pemula di Tangerang Selatan: 4 pilar anatomi, siklus observe-act, batas token, dan skenario nyata klinik BSD.',
    category: 'Otomasi AI & Workflow',
    categorySlug: 'otomasi-ai',
    tags: [
      'Agentic AI',
      'AI Agent',
      'Cara Kerja AI',
      'Otomasi Bisnis',
      'Klinik BSD',
      'Panduan Pemula',
    ],
    author: 'chesta',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: true,
    draft: false,
    coverImageKey: 'clusterAgenticAi',
    cover: SITE_IMAGES.clusterAgenticAi.src,
    coverAlt: SITE_IMAGES.clusterAgenticAi.alt,
    beforeIntroSnapshot:
      'Banyak pemilik bisnis mengira agentic AI hanyalah chatbot WhatsApp dengan gaya bahasa lebih luwes. Kenyataannya, perbedaan mendasar terletak pada kemampuan mengambil inisiatif tindakan: chatbot hanya merangkai kalimat jawaban, sedangkan agent mampu membaca konteks, memanggil software eksternal, dan menyelesaikan tugas multi-langkah tanpa arahan manusia di setiap detik.',
    founderNote: {
      author: 'chesta',
      title: 'Catatan Arsitektur · Mengapa Menjawab Pertanyaan Berbeda dengan Menyelesaikan Tugas',
      text: 'Model bahasa besar bekerja dengan memprediksi token teks berikutnya. Saat kamu memberinya akses ke sistem database dan kalender melalui arsitektur agentic, model tersebut bertransformasi dari sekadar mesin penjawab menjadi pengambil keputusan yang terikat aturan bisnis.',
    },
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Agentic AI berbeda secara fundamental dari chatbot tradisional karena memiliki otonomi untuk merencanakan langkah berurutan, memanggil program eksternal melalui tool use, dan menyimpan konteks jangka panjang.',
          'Anatomi sebuah agent terdiri dari empat pilar saling terkait: modul persepsi pemecah pesan, mesin perencanaan penentu prioritas, antarmuka eksekusi software nyata, serta sistem memori multi-tingkat.',
          'Implementasi agent pada bisnis lokal harus dibatasi oleh wewenang yang ketat, batas token panggilan berulang, validasi data masukan, serta mekanisme eskalasi langsung ke staf manusia saat mendeteksi keraguan.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sebuah pesan WhatsApp masuk ke nomor kontak bisnis pukul 23.15: "Halo admin, gigi geraham belakang saya patah tadi sore dan ngilu sekali. Besok sore dokter gigi yang bisa cabut ada jam berapa ya? Saya mau daftar langsung." Bagi bisnis yang hanya memasang bot menu tombol biasa, pesan tersebut akan dibalas dengan pilihan kaku: "Tekan 1 untuk jadwal, Tekan 2 untuk dokter". Pasien yang sedang kesakitan biasanya langsung menutup obrolan dan mencari klinik lain.',
      },
      {
        type: 'paragraph',
        text: 'Sebaliknya, jika kamu mengintegrasikan arsitektur agentic pada alur komunikasi tersebut, sistem tidak sekadar membalas kalimat empati. Program membaca maksud pasien, memeriksa ketersediaan slot tindakan bedah mulut pada kalender dokter di database, memverifikasi tidak ada jadwal ganda, menyiapkan draft formulir pendaftaran pasien, lalu memberikan konfirmasi jadwal dalam hitungan detik. Semua langkah ini berlangsung mandiri tanpa staf admin harus membuka laptop di tengah malam.',
      },
      {
        type: 'paragraph',
        text: 'Memahami bagaimana teknologi ini bekerja dari dalam sangat penting bagi pemilik usaha dan pengembang aplikasi. Melalui panduan pilar ini, kita akan membongkar arsitektur internal agentic AI secara transparan dan menghubungkan seluruh topik inti dalam klaster ini—mulai dari [tool use dan function calling](/id/blog/tool-use-function-calling-ai-agent-bisnis), [arsitektur memori dan privasi data](/id/blog/memori-ai-agent-bisnis-retensi-dan-privasi), [perbandingan multi-agent vs single-agent](/id/blog/multi-agent-vs-single-agent-arsitektur-bisnis), [merancang alur percakapan WhatsApp](/id/blog/merancang-alur-percakapan-whatsapp-ai-agent), [keamanan prompt injection](/id/blog/keamanan-ai-agent-prompt-injection), [Model Context Protocol (MCP)](/id/blog/mcp-model-context-protocol-bisnis), [kepatuhan UU PDP di WhatsApp](/id/blog/uu-pdp-whatsapp-ai-bisnis), hingga [penerapan AI agent untuk bisnis kecil](/id/blog/cara-kerja-ai-agent-untuk-bisnis-kecil).',
      },
      {
        type: 'h2',
        id: 'apa-itu-agentic-ai-dan-bedanya-dengan-chatbot-biasa',
        text: 'Apa itu agentic AI dan bedanya dengan chatbot biasa',
      },
      {
        type: 'paragraph',
        text: 'Agentic AI adalah sistem berbasis model bahasa besar yang dirancang untuk bertindak secara mandiri demi mencapai tujuan tertentu, dengan kemampuan mengevaluasi kondisi awal, menyusun rencana kerja, menjalankan perintah ke perangkat lunak lain, serta menilai apakah hasil tindakannya sudah tepat.',
      },
      {
        type: 'paragraph',
        text: 'Untuk membedakannya dari teknologi yang ada sebelumnya, mari bandingkan tiga tingkatan sistem komunikasi otomatis yang lazim ditemukan di pasar. Tingkat pertama adalah chatbot berbasis aturan kaku (rule-based bot). Bot ini mengandalkan pohon keputusan percabangan (if-then) dan tombol angka. Jika pengguna mengetik kata di luar skrip yang diprogram programmer, bot akan langsung gagal paham.',
      },
      {
        type: 'paragraph',
        text: 'Tingkat kedua adalah chatbot generatif (conversational AI). Chatbot ini memakai model bahasa untuk menghasilkan teks yang sangat natural dan luwes. Namun, kemampuannya berhenti pada kata-kata. Saat pasien meminta reservasi jadwal, chatbot generatif hanya bisa menjawab: "Tentu, klinik kami buka besok pukul 09.00 sampai 17.00, silakan hubungi resepsionis kami besok pagi." Bot tersebut tidak memiliki wewenang atau sambungan teknis untuk membuka kalender klinik.',
      },
      {
        type: 'paragraph',
        text: 'Tingkat ketiga inilah yang disebut agentic AI. Sistem tidak berhenti pada percakapan informatif. Agent diberikan peran (role), tujuan spesifik (goal), batasan wewenang (guardrails), serta sekumpulan fungsi pemrograman (tools). Ketika pasien meminta jadwal, agent memformulasikan serangkaian tindakan terstruktur untuk mengubah status data di server klinik.',
      },
      {
        type: 'table',
        caption: 'Tabel perbandingan mendasar antara chatbot aturan, chatbot generatif, dan agentic AI',
        headers: ['Karakteristik Sistem', 'Chatbot Aturan (Rule-Based)', 'Chatbot Generatif Teks', 'Agentic AI Sistemik'],
        rows: [
          [
            'Format Masukan Pengguna',
            'Pilihan tombol atau kata kunci persis',
            'Teks bebas berbahasa alami',
            'Teks bebas, audio suara, atau dokumen',
          ],
          [
            'Pengambilan Keputusan',
            'Pohon percabangan kaku yang diketik programmer',
            'Prediksi kata berikutnya dari bobot model',
            'Perencanaan dinamis multi-langkah berbasis tujuan',
          ],
          [
            'Akses ke Database & API',
            'Hanya data statis yang di-embed langsung',
            'Tidak ada koneksi eksekusi langsung',
            'Membaca dan menulis data via tool calling resmi',
          ],
          [
            'Penanganan Kesalahan',
            'Menampilkan pesan eror standar lalu berhenti',
            'Berdalih dengan kalimat sopan tanpa solusi',
            'Mengevaluasi hasil (reflect) dan mencoba cara alternatif',
          ],
          [
            'Peran Staf Manusia',
            'Mengambil alih jika pelanggan frustrasi tombol',
            'Mengecek riwayat chat untuk input data manual',
            'Menjadi supervisor dan menangani kasus eskalasi khusus',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Dengan memahami matriks perbandingan di atas, kamu dapat melihat bahwa agentic AI bukan sekadar alat obrolan kosmetik. Ini adalah lapisan kecerdasan komputasi yang menghubungkan bahasa manusia dengan logika aplikasi bisnis yang kaku.',
      },
      {
        type: 'h2',
        id: 'anatomi-sebuah-agent-persepsi-perencanaan-tool-use-dan-memori',
        text: 'Anatomi sebuah agent: persepsi, perencanaan, tool use, dan memori',
      },
      {
        type: 'paragraph',
        text: 'Arsitektur internal agentic AI modern ditopang oleh empat modul inti yang bekerja secara sinkron: persepsi untuk menafsirkan sinyal masukan, perencanaan untuk memecah masalah besar menjadi urutan instruksi kecil, tool use untuk berinteraksi dengan API eksternal, dan memori untuk menjaga kontinuitas konteks operasional.',
      },
      {
        type: 'paragraph',
        text: 'Mari kita telusuri peran masing-masing komponen internal ini secara mendalam agar kamu memahami bagaimana instruksi teks di layar ponsel dapat bertransformasi menjadi tindakan digital yang akurat:',
      },
      {
        type: 'ol',
        title: 'Empat pilar fondasi arsitektur agentic AI',
        items: [
          'Modul Persepsi (Perception Layer): Lapisan ini menerima teks mentah dari WhatsApp atau formulir website. Tugasnya mengekstraksi entitas kunci seperti nama orang, nomor kontak, tanggal yang diminta, gejala keluhan, serta mengukur tingkat kedaruratan (intent classification).',
          'Modul Perencanaan (Planning & Reasoning): Model mengevaluasi kondisi saat ini terhadap tujuan akhir. Model menyusun graf rencana: apakah harus mengecek data pasien lama terlebih dahulu, memeriksa jadwal dokter yang tersedia, atau meminta konfirmasi ulang sebelum menyimpan jadwal.',
          'Modul Tool Use (Action Interface): Inilah jembatan teknis yang mengubah niat model menjadi pemanggilan fungsi standar industri (seperti HTTP POST request atau database query). Model menghasilkan parameter terstruktur berformat JSON yang dieksekusi oleh runtime server aman.',
          'Modul Memori (Short-term & Long-term Memory): Memori jangka pendek menyimpan konteks percakapan yang sedang aktif di sesi tersebut. Memori jangka panjang terhubung ke basis data vektor atau relational database untuk mengingat riwayat medis lampau atau preferensi layanan pelanggan.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Keempat pilar ini diikat oleh instruksi sistem utama (system prompt) yang bertindak layaknya buku standar operasional prosedur (SOP) digital. SOP ini mengatur nada bicara, batasan etika, serta hierarki otoritas yang tidak boleh dilanggar oleh agent dalam situasi apa pun.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Pemisahan Konteks Menurut Standar Arsitektur Software',
        text: 'Modul perencanaan tidak boleh memiliki akses langsung ke kredensial database master. Seluruh pemanggilan fungsi wajib melewati lapisan proxy API internal yang memvalidasi otorisasi dan parameter sebelum menyentuh data produksi.',
      },
      {
        type: 'h2',
        id: 'siklus-kerja-agent-observe-think-act-reflect',
        text: 'Siklus kerja agent: observe, think, act, reflect',
      },
      {
        type: 'paragraph',
        text: 'Siklus eksekusi agentic AI berjalan melalui putaran logika empat fase yang dikenal sebagai Observe, Think, Act, dan Reflect, di mana setiap fase memvalidasi data sebelum melangkah ke fase berikutnya demi memastikan tindakan yang diambil benar-benar tepat sasaran.',
      },
      {
        type: 'paragraph',
        text: 'Pada fase pertama, yaitu Observe (Mengamati), agent mengumpulkan seluruh informasi yang tersedia. Informasi ini mencakup pesan terakhir dari pasien, data sesi obrolan sebelumnya, serta variabel lingkungan seperti jam operasional saat ini. Agent memastikan tidak ada data wajib yang ambigu sebelum mulai berpikir.',
      },
      {
        type: 'paragraph',
        text: 'Fase kedua adalah Think (Berpikir). Di sini, model bahasa besar mencerna observasi dan menentukan langkah logis berikutnya. Jika informasi sudah lengkap, model merumuskan keputusan: "Saya perlu memanggil fungsi cek_jadwal_dokter dengan parameter tanggal=2026-11-04 dan spesialisasi=gigi". Jika informasi masih kurang, model memutuskan untuk bertanya kembali secara sopan kepada pasien.',
      },
      {
        type: 'paragraph',
        text: 'Fase ketiga adalah Act (Bertindak). Runtime server menjalankan perintah yang dirumuskan pada fase berpikir. Kode sistem mengirim permintaan ke database klinik dan menerima jawaban mentah (raw payload), misalnya berupa daftar slot kosong: [16.00, 17.30, 19.00]. Pada fase ini, agent tidak berbicara kepada pengguna, melainkan berkomunikasi antar-mesin.',
      },
      {
        type: 'paragraph',
        text: 'Fase keempat yang membedakan agent modern adalah Reflect (Mengevaluasi). Begitu menerima hasil dari sistem, agent memeriksa kembali: "Apakah slot yang diterima sesuai dengan batasan waktu yang diminta pasien? Apakah ada benturan waktu istirahat dokter?" Jika hasil valid, agent menyusun pesan jawaban akhir kepada pasien. Jika terjadi benturan, agent mengulang siklus untuk mencari alternatif jadwal sebelum membalas.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Bahaya Melewatkan Tahap Evaluasi (Reflect)',
        text: 'Sistem yang tidak memiliki tahap refleksi rentan memberikan konfirmasi palsu kepada pelanggan. Jangan pernah mengizinkan agent mengirim pesan kepastian sebelum status reservasi diverifikasi kembali ke database backend.',
      },
      {
        type: 'h2',
        id: 'contoh-skenario-agent-pendaftaran-klinik-di-bsd',
        text: 'Contoh skenario: agent pendaftaran klinik di BSD',
      },
      {
        type: 'paragraph',
        text: 'Sebagai contoh skenario nyata di lapangan, sebuah klinik gigi dan estetika di kawasan BSD, Tangerang Selatan menerapkan agentic AI pada saluran WhatsApp bisnis mereka untuk mengotomatiskan reservasi pasien baru tanpa menambah beban giliran kerja staf resepsionis malam.',
      },
      {
        type: 'paragraph',
        text: 'Sebelum sistem diterapkan, klinik sering kehilangan pasien potensial yang menghubungi di atas pukul 21.00 WIB. Resepsionis baru merespons pesan tersebut pada pukul 08.30 keesokan harinya. Dalam rentang sebelas jam tersebut, sebagian besar pasien sudah mencari alternatif klinik lain di seputaran Serpong atau Bintaro yang merespons lebih tanggap.',
      },
      {
        type: 'paragraph',
        text: 'Klinik kemudian membangun alur agentic AI terintegrasi dengan arsitektur berikut:',
      },
      {
        type: 'ol',
        title: 'Alur kerja agent pendaftaran klinik gigi BSD',
        items: [
          'Pasien mengirim keluhan via WhatsApp: "Halo, saya mau periksa gigi berlubang besok siang sekitar jam dua. Apakah drg. Anita praktek?"',
          'Agent mengeksekusi tool `get_doctor_schedule` untuk memeriksa jam dinas dokter yang bersangkutan pada tanggal yang diminta.',
          'Sistem mengembalikan data bahwa drg. Anita baru memulai jadwal praktik pukul 15.00 WIB, namun terdapat dokter rekanan lain yang bertugas pukul 14.00 WIB.',
          'Agent merespons dengan pilihan jelas: menjelaskan bahwa drg. Anita tersedia di jam 15.00 atau menawarkan drg. Budi yang siap di jam 14.00.',
          'Pasien memilih jam 15.00 bersama drg. Anita. Agent meminta nama lengkap, tanggal lahir untuk rekam medis, dan nomor identitas kependudukan.',
          'Agent memvalidasi format data, mengeksekusi tool `create_appointment`, dan mencatatkan data ke software klinik sekaligus memicu pengingat kalender otomatis.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Kamu dapat melihat rincian arsitektur implementasi serupa pada layanan [jasa AI agent](/id/jasa/ai-agent) dan telaah teknis lengkap di [studi kasus pendaftaran klinik estetika](/id/studi-kasus/wa-concierge-klinik) yang telah kami uji coba di lingkungan kerja nyata.',
      },
      {
        type: 'h2',
        id: 'batasan-dan-risiko-agent-loop-tak-hingga-halusinasi-tindakan-biaya-token',
        text: 'Batasan dan risiko agent: loop tak hingga, halusinasi tindakan, biaya token',
      },
      {
        type: 'paragraph',
        text: 'Mengoperasikan agentic AI dalam bisnis nyata membawa risiko teknis yang wajib dimitigasi sejak tahap desain, terutama risiko perulangan tanpa henti (infinite loops), eksekusi tindakan berhalusinasi, pembengkakan tagihan komputasi token, serta kebocoran data pengguna.',
      },
      {
        type: 'paragraph',
        text: 'Risiko pertama adalah loop eksekusi tak berujung. Ketika agent menerima respons gagal dari sebuah API (misalnya server database timeout), model yang tidak dirancang dengan batas toleransi ketat bisa terus-menerus mencoba memanggil fungsi yang sama puluhan kali dalam hitungan detik. Ini tidak hanya menghabiskan saldo token API kamu, tetapi juga dapat membebani server database internal.',
      },
      {
        type: 'paragraph',
        text: 'Risiko kedua adalah halusinasi parameter tindakan. Berbeda dengan halusinasi teks biasa di mana chatbot hanya mengarang cerita dongeng, halusinasi tindakan terjadi ketika agent memanggil tool dengan parameter yang tidak pernah disetujui pengguna, seperti memesankan jadwal di hari yang keliru atau memicu pengiriman pesan promosi massal tanpa izin.',
      },
      {
        type: 'paragraph',
        text: 'Risiko ketiga menyangkut efisiensi biaya operasional token. Setiap kali agent menjalankan satu putaran observe-think-act-reflect, seluruh riwayat percakapan dan deskripsi fungsi dikirim ulang ke model bahasa besar. Jika sesi percakapan berlangsung terlalu panjang tanpa mekanisme pemangkasan konteks (context pruning), biaya satu reservasi pasien bisa melonjak berkali-kali lipat dari estimasi awal.',
      },
      {
        type: 'table',
        caption: 'Tabel mitigasi risiko teknis operasional agentic AI',
        headers: ['Jenis Risiko Teknis', 'Dampak pada Operasional Bisnis', 'Langkah Pencegahan Wajib di Kode'],
        rows: [
          [
            'Infinite Execution Loop',
            'Biaya API melonjak drastis dan respon pengguna macet',
            'Terapkan hard limit maksimal 4 iterasi per pesan masuk',
          ],
          [
            'Action Hallucination',
            'Data reservasi atau pesanan ganda di database',
            'Validasi skema ketat menggunakan Zod/JSON Schema di backend',
          ],
          [
            'Context Window Bloat',
            'Waktu respon melambat di atas 8 detik',
            'Kompres riwayat lama menjadi ringkasan status terstruktur',
          ],
          [
            'Prompt Injection',
            'Instruksi SOP dibongkar atau dialihkan oleh penyerang',
            'Pisahkan input pengguna dari instruksi sistem (system prompt)',
          ],
          [
            'Kegagalan API Pihak Ketiga',
            'Pengguna tidak mendapat kepastian konfirmasi',
            'Pasang mekanisme fallback otomatis ke notifikasi WhatsApp staf',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Untuk mempelajari strategi pengamanan sistem terhadap manipulasi perintah dari luar, kamu dapat membaca ulasan teknis kami mengenai [keamanan AI agent dan mitigasi prompt injection](/id/blog/keamanan-ai-agent-prompt-injection).',
      },
      {
        type: 'h2',
        id: 'kapan-bisnis-kamu-butuh-agent-dan-kapan-cukup-otomasi-biasa',
        text: 'Kapan bisnis kamu butuh agent dan kapan cukup otomasi biasa',
      },
      {
        type: 'paragraph',
        text: 'Bisnis kamu membutuhkan agentic AI hanya ketika ada variasi masukan yang tidak terduga dan membutuhkan pertimbangan fleksibel sebelum mengeksekusi serangkaian software; jika urutan langkah kerja bisnismu sudah pasti dan deterministik, otomasi alur kerja biasa jauh lebih murah, cepat, dan stabil.',
      },
      {
        type: 'paragraph',
        text: 'Sebagai prinsip rekayasa perangkat lunak yang sehat, jangan pernah menggunakan kecerdasan buatan untuk menyelesaikan masalah yang bisa dituntaskan dengan kode logika biasa (if-else logic). Contoh: jika kamu hanya ingin mengirimkan nota tagihan dalam format PDF setiap kali ada baris baru di Google Sheets, kamu cukup menggunakan webhook atau platform integrasi kerja biasa.',
      },
      {
        type: 'paragraph',
        text: 'Gunakan panduan keputusan berikut untuk menentukan pilihan arsitektur yang paling hemat biaya bagi usahamu:',
      },
      {
        type: 'ol',
        title: 'Panduan evaluasi kebutuhan sistem bisnis kamu',
        items: [
          'Apakah masukan dari pelanggan bervariasi tinggi? Jika pelanggan mengetik pesan dengan gaya bahasa acak, dialek lokal, atau menyertakan foto rontgen, kamu membutuhkan lapisan penalaran model bahasa.',
          'Apakah urutan tindakannya bergantung pada hasil langkah sebelumnya secara dinamis? Jika ya, arsitektur agentic sangat tepat karena agent dapat menentukan tool mana yang dipanggil berdasarkan data yang baru diterima.',
          'Apakah proses bisnis memiliki aturan kepatuhan kaku tanpa toleransi deviasi? Jika kesalahan sekecil apa pun berdampak fatal pada hukum keuangan, serahkan proses eksekusi akhir pada program deterministik dengan supervisi manusia.',
          'Berapa anggaran biaya per transaksi? Evaluasi apakah margin bisnismu mampu menopang biaya token per percakapan dibandingkan dengan nilai penjualan rata-rata produkmu.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Jika kamu menjalankan usaha rintisan atau jasa profesional di wilayah [layanan BSD](/area/bsd) dan ingin memetakan arsitektur yang tepat, kamu dapat berkonsultasi mengenai batasan teknis ini melalui tim rekayasa kami.',
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi',
        text: 'Sumber rujukan resmi',
      },
      {
        type: 'paragraph',
        text: 'Dokumentasi teknis dan standar industri berikut menjadi rujukan ilmiah dalam perancangan arsitektur agentic AI; cek dokumentasi resmi untuk angka dan ketentuan terbaru mengenai batas kuota, harga model, dan spesifikasi protokol:',
      },
      {
        type: 'ul',
        items: [
          '[Dokumentasi Model Context Protocol dari Anthropic](https://modelcontextprotocol.io/) memuat spesifikasi standar terbuka untuk menghubungkan model bahasa dengan sumber data dan antarmuka tool eksternal; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[Google AI for Developers Function Calling Guide](https://ai.google.dev/gemini-api/docs/function-calling) menyajikan panduan implementasi tool use dan deklarasi skema JSON pada Gemini API; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) merinci risiko keamanan arsitektur agent termasuk excessive agency dan insecure output handling; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[Peraturan Perundang-undangan JDIH BPK RI terkait UU PDP No. 27 Tahun 2022](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) menjadi pedoman wajib kepatuhan pemrosesan data identitas pasien dan pelanggan di Indonesia; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[W3C Semantic Web and Agent Standards](https://www.w3.org/standards/) memuat prinsip dasar interoperabilitas data mesin yang menjadi dasar arsitektur web cerdas; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
        ],
      },
    ],
    conclusion: [
      'Agentic AI bukanlah pengganti staf manusia seutuhnya, melainkan sistem asisten cerdas yang membebaskan bisnismu dari pekerjaan repetitif tanpa mengorbankan kualitas dan kecepatan layanan kepada pelanggan.',
      'Kunci keberhasilan implementasi terletak pada kejelasan batasan wewenang (guardrails), kebersihan arsitektur tool yang dipanggil, serta evaluasi rutin terhadap efisiensi token dan akurasi data di lapangan.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Rancang Arsitektur AI Agent Aman untuk Alur Kerja Bisnis Kamu',
      description:
        'Kami membangun agent cerdas WhatsApp dan sistem internal dengan kontrol validasi ketat, integrasi API langsung ke database tokomu, serta pengawasan manusia.',
      href: '/id/jasa/ai-agent',
      label: 'Konsultasi Implementasi AI Agent',
    },
    faq: [
      {
        question: 'Apakah agentic AI dapat menggantikan seluruh admin WhatsApp di bisnis saya?',
        answer:
          'Tidak sepenuhnya. Agentic AI menangani 70 hingga 80 persen pertanyaan rutin dan proses reservasi standar, sedangkan kasus komplain rumit atau transaksi bernilai tinggi tetap dialihkan ke staf manusia.',
      },
      {
        question: 'Bagaimana cara mencegah agent mengarang janji atau memberikan harga diskon palsu?',
        answer:
          'Pencegahan dilakukan dengan membatasi agent hanya membaca data dari tool database resmi dan melarang model memunculkan angka di luar respon API melalui instruksi sistem (guardrails) serta validasi skema keluaran di backend.',
      },
      {
        question: 'Berapa biaya rata-rata yang dikeluarkan per percakapan untuk menjalankan agentic AI?',
        answer:
          'Biaya token komputasi model bahasa modern umumnya berkisar antara puluhan hingga ratusan rupiah per percakapan lengkap, tergantung panjang riwayat sesi dan frekuensi pemanggilan tool yang dieksekusi.',
      },
      {
        question: 'Apakah data medis pasien di klinik aman jika diproses oleh agent WhatsApp?',
        answer:
          'Keamanan data terjamin jika sistem menerapkan enkripsi data transit dan diam yang ketat, token otorisasi sementara, dan pembatasan penyimpanan data sensitif sesuai kaidah Undang-Undang Perlindungan Data Pribadi (UU PDP).',
      },
      {
        question: 'Berapa lama waktu yang dibutuhkan untuk mengembangkan agentic AI siap pakai untuk bisnis?',
        answer:
          'Pengembangan alur agentic AI spesifik dengan integrasi ke 2 hingga 3 sistem database umumnya membutuhkan waktu 2 hingga 4 minggu kerja termasuk tahap pengujian skenario ekstrem.',
      },
      {
        question: 'Di mana saya bisa melihat istilah teknis lain terkait arsitektur sistem ini?',
        answer:
          'Kamu dapat membuka halaman glosarium teknologi kami di /id/glosarium untuk memahami konsep-konsep seperti vector embeddings, RAG, tool calling, dan context window secara mendalam.',
      },
    ],
    relatedSlugs: [
      'keamanan-ai-agent-prompt-injection',
      'mcp-model-context-protocol-bisnis',
      'otomasi-workflow-bisnis-n8n-make-tanpa-ganti-sistem',
    ],
  },

  // ==========================================================================
  // ARTIKEL 22: Tool Use dan Function Calling: Cara AI Agent Mengakses Sistem Nyata
  // Penulis: Chesta Azka
  // ==========================================================================
  {
    slug: 'tool-use-function-calling-ai-agent-bisnis',
    alternateSlug: 'tool-use-function-calling-ai-agents-business',
    locale: 'id',
    clusterId: 'agentic-ai',
    title: 'Tool Use dan Function Calling: Cara AI Agent Mengakses Sistem Nyata',
    seoTitle: 'Tool Use & Function Calling AI Agent Bisnis | CHESTA',
    excerpt:
      'Pahami cara AI agent mengendalikan software bisnis nyata melalui tool use dan function calling: skema JSON, alur bolak-balik API, keamanan hak akses, dan contoh stok kafe di Pamulang.',
    metaDescription:
      'Panduan teknis tool use dan function calling AI agent bisnis di Tangerang Selatan: skema JSON, akses database aman, dan skenario kafe di Pamulang.',
    category: 'Otomasi AI & Workflow',
    categorySlug: 'otomasi-ai',
    tags: [
      'Function Calling',
      'Tool Use',
      'AI Agent',
      'Integrasi API',
      'Keamanan AI',
      'Kafe Pamulang',
    ],
    author: 'chesta',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: false,
    draft: false,
    coverImageKey: 'clusterAgenticAi',
    cover: SITE_IMAGES.clusterAgenticAi.src,
    coverAlt: SITE_IMAGES.clusterAgenticAi.alt,
    beforeIntroSnapshot:
      'Tanpa kemampuan tool use, model bahasa secanggih apa pun terkunci di dalam batas ruang percakapan: ia tidak tahu apakah stok susu di gudang kafe kamu masih tersisa tiga karton atau sudah habis tadi siang. Function calling memberi model bahasa kemampuan mengetuk pintu sistem luar secara terukur melalui antarmuka data terstruktur.',
    founderNote: {
      author: 'chesta',
      title: 'Catatan Rekayasa · Mengapa AI Sebenarnya Tidak Menjalankan Kode Sendiri',
      text: 'Banyak orang salah paham mengira model AI mengeksekusi kode Python atau SQL langsung di server mereka. Faktanya, model hanya mengeluarkan teks berformat JSON berisi argumen yang diminta. Server aplikasi kamulah yang membaca JSON tersebut, menjalankan logika aman, dan mengembalikan hasilnya ke model.',
    },
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Function calling adalah mekanisme di mana model bahasa besar menghasilkan struktur data JSON valid untuk memanggil fungsi eksternal, alih-alih mengeksekusi kode secara mandiri tanpa pengawasan.',
          'Siklus bolak-balik function calling melibatkan empat langkah: pengiriman skema deskripsi tool ke model, pembuatan argumen JSON oleh model, eksekusi kode aman di backend server, dan pengiriman respon balik ke model.',
          'Keamanan integrasi tool wajib mematuhi prinsip hak akses terendah (least privilege), validasi skema masukan, pencatatan audit log mutlak, serta konfirmasi manusia untuk aksi yang mengubah data kritis.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Pernahkah kamu bertanya-tanya bagaimana sebuah asisten pintar WhatsApp bisa mengetahui bahwa kamar kos tipe deluxe di lantai dua sudah terisi, lalu langsung mengunci tanggal kedatangan calon penyewa berikutnya? Secara naluriah, kita tahu bahwa model bahasa buatan tidak memiliki indra fisik untuk melihat buku catatan resepsionis.',
      },
      {
        type: 'paragraph',
        text: 'Jawabannya terletak pada teknik komputasi modern yang disebut tool use atau function calling. Sebagaimana diperkenalkan pada [panduan lengkap cara kerja agentic AI untuk pemula](/id/blog/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula), fitur ini menjembatani jurang pemisah antara penalaran fleksibel berbasis bahasa manusia dengan kekakuan sistem database perusahaan yang menuntut angka presisi dan tipe data mutlak.',
      },
      {
        type: 'paragraph',
        text: 'Bagi pengusaha maupun teknisi perangkat lunak, menguasai cara kerja function calling adalah kunci mengubah bot percakapan yang pasif menjadi sistem operasional yang mampu menyelesaikan transaksi nyata. Mari kita telaah arsitekturnya secara mendalam dan terstruktur.',
      },
      {
        type: 'h2',
        id: 'mengapa-model-bahasa-butuh-tangan-dan-mata-batasan-teks-murni',
        text: 'Mengapa model bahasa butuh tangan dan mata: batasan teks murni',
      },
      {
        type: 'paragraph',
        text: 'Model bahasa besar secara teknis terisolasi dari dunia nyata karena hanya dilatih berdasarkan data masa lampau dan tidak dapat mengamati kondisi detik ini maupun mengubah status sistem eksternal tanpa bantuan antarmuka program khusus.',
      },
      {
        type: 'paragraph',
        text: 'Ada tiga kelemahan mendasar jika kamu memaksa model bahasa bekerja tanpa integrasi tool. Pertama, ketidaktahuan informasi terkini (knowledge cutoff). Model tidak tahu apakah hari ini tanggal merah, berapa kurs rupiah terhadap dolar siang ini, atau apakah dokter jaga di klinikmu sedang cuti mendadak.',
      },
      {
        type: 'paragraph',
        text: 'Kedua, ketidakmampuan berhitung deterministik. Model bahasa dilatih memprediksi pola kata, bukan menghitung matematika presisi. Saat diminta menghitung total tagihan sepuluh item pesanan beserta diskon kupon dan pajak 11%, model rentan membuat kesalahan aritmetika kecil yang merugikan pembeli atau penjual.',
      },
      {
        type: 'paragraph',
        text: 'Ketiga, ketiadaan wewenang tindakan (lack of agency). Model yang hanya memproses teks dapat merangkai kalimat "Pesanan kamu nomor 1045 sudah berhasil dibatalkan dan uang telah dikembalikan", padahal di sistem kasir dan mutasi bank tidak terjadi transaksi apa pun. Tanpa tool, pernyataan tersebut murni halusinasi.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Mata dan Tangan Digital AI',
        text: 'Tool bertindak sebagai mata (membaca data real-time dari sensor, database, atau web API) dan tangan (mengubah data, memicu webhook, atau mengirimkan invoice PDF resmi) bagi model kecerdasan buatan.',
      },
      {
        type: 'h2',
        id: 'apa-itu-tool-use-dan-function-calling-definisi-teknis-sederhana',
        text: 'Apa itu tool use dan function calling: definisi teknis sederhana',
      },
      {
        type: 'paragraph',
        text: 'Function calling adalah protokol standar pada antarmuka pemrograman aplikasi (API) model bahasa di mana pengembang mendefinisikan sekumpulan fungsi beserta parameternya, dan model secara cerdas memutuskan kapan harus memanggil fungsi tersebut serta menghasilkan argumen berformat JSON yang tepat.',
      },
      {
        type: 'paragraph',
        text: 'Penting untuk ditegaskan: model bahasa tidak menjalankan fungsi itu sendiri. Model tidak membuka koneksi jaringan internet ke server bankmu secara langsung. Yang dilakukan model adalah menghentikan sementara pembuatan teks narasi biasa, lalu mengeluarkan blok data terstruktur yang memberi tahu server aplikasimu: "Tolong jalankan fungsi ini dengan parameter berikut."',
      },
      {
        type: 'paragraph',
        text: 'Server aplikasi milikmu memegang kendali penuh. Server membaca permintaan JSON dari model, memvalidasi apakah pengguna memiliki hak akses, mengeksekusi kode lokal di server (misalnya perintah `SELECT` ke database PostgreSQL), dan kemudian memberikan data jawaban mentah kembali ke model bahasa.',
      },
      {
        type: 'h2',
        id: 'anatomi-sebuah-function-call-schema-json-parameter-respon-sistem',
        text: 'Anatomi sebuah function call: schema JSON, parameter, respon sistem',
      },
      {
        type: 'paragraph',
        text: 'Struktur sebuah function call tersusun dari tiga komponen utama: deklarasi skema JSON yang mendeskripsikan kegunaan dan tipe parameter fungsi, muatan argumen keluaran model yang berisi nilai terisi, serta dokumen respon balik dari sistem eksternal.',
      },
      {
        type: 'paragraph',
        text: 'Mari kita bedah anatomi teknis ini melalui contoh fungsi pengecekan persediaan bahan baku pada aplikasi kedai kopi:',
      },
      {
        type: 'ol',
        title: 'Komponen anatomi deklarasi function call',
        items: [
          'Nama Fungsi (Function Name): Penanda unik pengenal perintah, misalnya `cek_stok_bahan_baku`. Nama harus ringkas dan menggunakan konvensi penamaan baku.',
          'Deskripsi Semantik (Semantic Description): Penjelasan bahasa alami yang dibaca model bahasa untuk memahami kapan fungsi ini relevan dipanggil, misalnya "Gunakan fungsi ini ketika barista atau manajer menanyakan sisa stok bahan seperti susu, sirup, atau biji kopi".',
          'Spesifikasi Parameter (Parameters Object): Skema berbasis JSON Schema standar yang mendefinisikan nama variabel (contoh: `nama_bahan`), tipe data (string/integer), apakah wajib diisi, serta daftar opsi pilihan jika dibatasi.',
          'Respon Eksternal (Tool Output Payload): Nilai kembalian berupa JSON ringkas dari server backend yang mengonfirmasi kondisi nyata sistem, misalnya `{"status": "sukses", "sisa_unit": 4, "satuan": "liter"}`.',
        ],
      },
      {
        type: 'table',
        caption: 'Tabel contoh pemetaan pesan percakapan menjadi argumen function call terstruktur',
        headers: ['Kalimat Pesan Pengguna', 'Fungsi yang Dipilih Model', 'Parameter JSON yang Dihasilkan', 'Tindakan Nyata Backend'],
        rows: [
          [
            '"Cek sisa sirup karamel di bar utama dong"',
            '`cek_stok_bahan`',
            '{"bahan": "sirup_karamel", "lokasi": "bar_utama"}',
            'Query database stok gudang cabang',
          ],
          [
            '"Tolong buatkan pesanan 5 cup kopi susu gula aren"',
            '`buat_draft_transaksi`',
            '{"item_id": "kopi_aren", "jumlah": 5}',
            'Mencatat order baru ke sistem POS kasir',
          ],
          [
            '"Berapa total omzet kafe kemarin malam?"',
            '`hitung_rekap_penjualan`',
            '{"tanggal": "2026-11-02", "shift": "malam"}',
            'Mengagregasi nilai transaksi dari server',
          ],
          [
            '"Kirim rekap PDF ke WhatsApp manajer"',
            '`kirim_laporan_dokumen`',
            '{"format": "pdf", "tujuan": "+62812xxxx"}',
            'Membuat file laporan dan memicu WhatsApp API',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Kerapian pendefinisian skema parameter ini sangat menentukan tingkat keberhasilan eksekusi. Deskripsi fungsi yang ambigu akan membuat model salah memilih tool atau memasukkan parameter dengan format yang salah.',
      },
      {
        type: 'h2',
        id: 'alur-bolak-balik-dari-pesan-pengguna-sampai-hasil-dieksekusi',
        text: 'Alur bolak-balik: dari pesan pengguna sampai hasil dieksekusi',
      },
      {
        type: 'paragraph',
        text: 'Alur bolak-balik function calling berjalan dalam sebuah siklus orkestrasi tertutup yang melibatkan pengguna, server aplikasi perantara, model bahasa besar, dan basis data operasional bisnis kamu.',
      },
      {
        type: 'paragraph',
        text: 'Berikut adalah urutan kronologis yang terjadi dalam hitungan beberapa ratus milidetik ketika sebuah pesan diproses oleh sistem:',
      },
      {
        type: 'ol',
        title: 'Kronologi siklus orkestrasi function calling',
        items: [
          'Pengguna mengirim pesan teks melalui antarmuka (misalnya WhatsApp Webhook atau aplikasi kasir internal).',
          'Server aplikasi kamu membungkus pesan tersebut bersama daftar tool yang tersedia, lalu meneruskannya ke API model bahasa.',
          'Model bahasa menganalisis teks, menyimpulkan bahwa tool diperlukan, dan mengembalikan respon berstatus `tool_calls` berisi nama fungsi dan argumen JSON.',
          'Server aplikasi kamu mencegat respon tersebut, membaca nama fungsinya, lalu menjalankan kode fungsi di sistem internal (misalnya query SQL ke PostgreSQL).',
          'Server aplikasi menerima hasil dari database, membungkus hasil tersebut ke dalam pesan baru dengan peran `tool`, dan mengirimkannya kembali ke model bahasa.',
          'Model bahasa membaca data nyata tersebut dan menyusun kalimat akhir yang ramah dan mudah dipahami untuk dikirimkan kembali ke ponsel pengguna.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Waspada Waktu Tunggu Jaringan (Latency Stacking)',
        text: 'Karena melibatkan dua kali pemanggilan API model bahasa dan satu kali query database internal, pastikan query database kamu dioptimalkan dengan indeks yang tepat agar total waktu tunggu tidak melampaui 3 detik.',
      },
      {
        type: 'h2',
        id: 'contoh-skenario-pengecekan-stok-kafe-di-pamulang',
        text: 'Contoh skenario: pengecekan stok kafe di Pamulang',
      },
      {
        type: 'paragraph',
        text: 'Sebagai gambaran penerapan nyata di lapangan, sebuah kedai kopi independen di kawasan Pamulang, Tangerang Selatan memanfaatkan function calling untuk membantu barista dan manajer mengelola stok bahan baku langsung melalui grup WhatsApp operasional mereka.',
      },
      {
        type: 'paragraph',
        text: 'Pada jam sibuk sore hari, barista sering tidak sempat membuka aplikasi laptop di ruang belakang hanya untuk memeriksa apakah pasokan susu UHT di gudang cadangan masih mencukupi untuk akhir pekan. Mereka cukup mengirim pesan suara atau teks singkat ke nomor asisten kafe.',
      },
      {
        type: 'paragraph',
        text: 'Ketika barista mengirim chat: "Min, tolong cek susu segar di gudang tinggal berapa krat ya?", sistem menjalankan langkah terstruktur:',
      },
      {
        type: 'ol',
        title: 'Langkah eksekusi stok di kafe Pamulang',
        items: [
          'Model memetakan istilah "susu segar" menjadi identifier barang `SKU-MILK-FRESH-1L` melalui parameter fungsi `cek_inventaris`.',
          'Server menjalankan query ke database sistem stok dan mendapati hasil: sisa 4 krat (48 liter), dengan catatan tanggal kedaluwarsa terdekat 5 hari lagi.',
          'Hasil tersebut dibaca oleh model dan dirangkum menjadi pesan WhatsApp: "Stok susu segar di gudang cadangan tersisa 4 krat (48 liter). Catatan: 1 krat mendekati masa kedaluwarsa tanggal 8 November."',
          'Jika barista melanjutkan dengan perintah: "Tolong buatkan draft purchase order 5 krat ke pemasok biasa", model memicu fungsi `buat_draft_po` yang memerlukan konfirmasi tombol persetujuan dari manajer kafe.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Penerapan ini selaras dengan arsitektur yang kami dokumentasikan di [studi kasus dashboard operasional kafe](/studi-kasus/dashboard-operasional-kafe) dan pengembangan [software custom](/id/jasa/software-custom) untuk efisiensi bisnis lokal di kawasan [Pamulang dan sekitarnya](/area/pamulang).',
      },
      {
        type: 'h2',
        id: 'keamanan-tool-batas-wewenang-konfirmasi-manusia-audit-log',
        text: 'Keamanan tool: batas wewenang, konfirmasi manusia, audit log',
      },
      {
        type: 'paragraph',
        text: 'Menghubungkan model kecerdasan buatan dengan sistem produksi nyata menuntut tata kelola keamanan berlapis guna mencegah manipulasi masukan jahat (prompt injection), penghapusan data sepihak, serta transaksi tanpa otoritas pemilik bisnis.',
      },
      {
        type: 'paragraph',
        text: 'Prinsip pertama yang wajib dipegang adalah pemisahan hak baca dan hak tulis (Read-Write Separation). Tool yang hanya bertugas membaca informasi (seperti cek ketersediaan meja, baca jadwal dokter, atau cek katalog harga) dapat dieksekusi secara otomatis oleh agent. Namun, tool yang bersifat mengubah status permanen atau melibatkan uang (seperti menghapus reservasi, mengubah harga menu, atau mentransfer dana) tidak boleh dieksekusi tanpa persetujuan manusia (human-in-the-loop).',
      },
      {
        type: 'paragraph',
        text: 'Prinsip kedua adalah pencatatan jejak audit (audit trail) yang tidak dapat dimanipulasi. Setiap kali ada fungsi yang dipanggil oleh model bahasa, simpan log lengkap yang memuat nomor identitas sesi, waktu pemanggilan, nama tool, nilai parameter masukan, dan respon balik server. Log ini menjadi bukti otentik saat terjadi perselisihan data stok atau jadwal.',
      },
      {
        type: 'paragraph',
        text: 'Prinsip ketiga adalah validasi skema masukan di sisi server backend (server-side validation). Jangan pernah mempercayai parameter JSON yang dihasilkan model bahasa begitu saja. Gunakan pustaka validator seperti Zod atau Pydantic untuk memastikan bahwa nomor telepon memiliki format yang benar dan nilai kuantitas pesanan bukanlah angka negatif.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Bahaya Akses Direct Database Execution',
        text: 'Jangan pernah membuat tool generic bernama `run_sql_query` yang mengizinkan model bahasa merangkai dan mengeksekusi sintaks SQL mentah ke basis data produksimu. Buatlah fungsi spesifik dan berikan hak akses terkecil pada user database aplikasi.',
      },
      {
        type: 'paragraph',
        text: 'Untuk pemahaman lebih mendalam tentang protokol koneksi tool standar industri terbuka, kamu dapat membaca panduan kami tentang [Model Context Protocol (MCP) untuk integrasi bisnis](/id/blog/mcp-model-context-protocol-bisnis) serta ulasan pengamanan sistem di [mitigasi serangan prompt injection pada AI agent](/id/blog/keamanan-ai-agent-prompt-injection).',
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi',
        text: 'Sumber rujukan resmi',
      },
      {
        type: 'paragraph',
        text: 'Berikut adalah sumber rujukan dokumentasi rekayasa dan spesifikasi standar keamanan untuk implementasi tool use dan function calling; cek dokumentasi resmi untuk angka dan ketentuan terbaru mengenai batas kapasitas payload dan skema parameter:',
      },
      {
        type: 'ul',
        items: [
          '[Dokumentasi Resmi OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling) menjelaskan format payload deklarasi tools dan penanganan parameter JSON; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[Google Gemini API Structured Outputs & Tool Use](https://ai.google.dev/gemini-api/docs/function-calling) merinci integrasi pemanggilan fungsi pada arsitektur Gemini 1.5 dan 2.0; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[Spesifikasi Standar JSON Schema](https://json-schema.org/specification) mengatur sintaks validasi struktur data objek dan tipe data pemrograman; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[OWASP Application Security Verification Standard (ASVS)](https://owasp.org/www-project-application-security-verification-standard/) menjadi acuan audit integritas input dan otorisasi kontrol akses backend; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
          '[Undang-Undang Pelindungan Data Pribadi No. 27 Tahun 2022 di JDIH BPK RI](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) mengatur batas kerahasiaan penyimpanan rekaman interaksi pengguna di Indonesia; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
        ],
      },
    ],
    conclusion: [
      'Function calling dan tool use adalah fondasi yang mengubah model bahasa besar dari sekadar lawan bicara teks menjadi asisten digital yang mampu menggerakkan roda operasional bisnis sehari-hari.',
      'Kunci keberhasilan implementasi terletak pada pendefinisian skema yang presisi, validasi parameter di backend, pembatasan wewenang dengan persetujuan manusia, serta pencatatan audit log yang transparan.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Integrasikan Tool Use & Database Bisnismu Bersama Tim CHESTAADOTCOM',
      description:
        'Kami membangun sambungan API aman dari WhatsApp dan aplikasi web ke sistem inventaris, kasir, atau kalender bisnismu dengan standar keamanan enterprise.',
      href: '/id/jasa/ai-agent',
      label: 'Konsultasi Integrasi Tool AI',
    },
    faq: [
      {
        question: 'Apakah function calling berarti AI bisa mengakses semua file di komputer server saya?',
        answer:
          'Tidak. Model bahasa hanya mengetahui fungsi-fungsi spesifik yang didaftarkan secara eksplisit oleh developer di dalam kode aplikasi. Model tidak memiliki akses ke sistem berkas atau perintah terminal server.',
      },
      {
        question: 'Bagaimana jika model menghasilkan format JSON yang rusak atau tidak valid?',
        answer:
          'API model modern sudah memiliki mode output terstruktur yang menjamin validitas sintaks JSON. Jika nilai parameter di dalamnya tidak sesuai aturan bisnis, backend server akan menolak panggilan dan meminta model mengoreksi nilainya.',
      },
      {
        question: 'Apakah penggunaan function calling membuat biaya token API menjadi lebih mahal?',
        answer:
          'Ya, ada penambahan biaya token karena definisi skema semua tool yang aktif ikut dikirimkan pada setiap panggilan API. Oleh karena itu, batasi jumlah tool yang relevan pada setiap alur percakapan.',
      },
      {
        question: 'Apakah saya bisa menggunakan function calling dengan database lokal tanpa koneksi internet luar?',
        answer:
          'Bisa, asalkan server aplikasi lokal kamu dapat menjangkau endpoint API model bahasa, atau jika kamu menjalankan model open-source secara lokal di infrastruktur internal bisnismu.',
      },
      {
        question: 'Apa perbedaan antara function calling biasa dan protokol MCP (Model Context Protocol)?',
        answer:
          'Function calling adalah mekanisme internal antar-API satu penyedia model, sedangkan MCP adalah protokol standar terbuka lintas platform yang memungkinkan satu tool digunakan oleh berbagai model AI tanpa menulis ulang kode integrasi.',
      },
      {
        question: 'Di mana saya dapat membaca glosarium istilah teknis terkait API dan integrasi software?',
        answer:
          'Kamu bisa mengunjungi halaman glosarium kami di /id/glosarium untuk memahami istilah seperti webhook, endpoint REST API, schema validation, dan JSON serialization secara lengkap.',
      },
    ],
    relatedSlugs: [
      'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
      'mcp-model-context-protocol-bisnis',
      'keamanan-ai-agent-prompt-injection',
    ],
  },
];
