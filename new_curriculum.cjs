const fs = require('fs');

const curriculum = {
  "tutorialContent": [
    {
      "id": "module-1",
      "title": "Modul 1: Arsitektur & Fondasi Proyek Musik",
      "content": "Modul ini membahas langkah pertama dalam membangun platform streaming musik kelas enterprise. Kita akan menyiapkan Next.js, struktur folder yang tepat untuk menangani file media yang berat, dan mengkonfigurasi environment.",
      "submodules": [
        {
          "id": "sub-1-1",
          "title": "1.1 Inisialisasi Next.js & Dependencies Utama",
          "content": "Mulai dengan setup Next.js App Router terbaru. Kita akan menggunakan Tailwind CSS untuk styling, Zustand untuk state management (sangat penting untuk audio player global), dan Lucide React untuk ikon kontrol musik.<br/><br/><br/>**Penempatan File:** Instal dependensi ini pada root direktori proyek Anda.",
          "code": "npx create-next-app@latest vibe-music --typescript --tailwind --eslint\ncd vibe-music\nnpm install zustand howler lucide-react framer-motion",
          "lang": "bash"
        },
        {
          "id": "sub-1-2",
          "title": "1.2 Struktur Folder Aplikasi Musik",
          "content": "Penempatan file yang benar adalah kunci. Dalam aplikasi audio, kita harus memisahkan logika UI dengan engine pemutar musik agar performa tidak terganggu oleh re-render.<br/><br/><br/>### Panduan Penempatan File (Folder Architecture)\n\n*   **`src/app/`**: Berisi halaman-halaman utama (Home, Explore, Playlist, Album).\n*   **`src/components/audio/`**: Khusus komponen audio seperti `AudioPlayer.tsx`, `VolumeSlider.tsx`, `ProgressBar.tsx`.\n*   **`src/store/`**: Tempat state global.\n*   **`src/hooks/`**: Custom hooks seperti `useAudioEngine.ts`.\n*   **`public/audio/`**: (Hanya untuk testing) Tempat menyimpan file mock `.mp3`.",
          "code": "mkdir -p src/components/audio src/store src/hooks",
          "lang": "bash"
        },
        {
          "id": "sub-1-3",
          "title": "1.3 Konfigurasi Environment & Keamanan",
          "content": "Jangan pernah hardcode API Key atau URL Database. Gunakan `.env` untuk keamanan tingkat lanjut pada env production.<br/><br/><br/>**Penempatan File:** Buat file `.env.local` di root proyek.",
          "code": "NEXT_PUBLIC_API_URL=https://api.domain.com\nDATABASE_URL=postgres://user:pass@localhost:5432/db",
          "lang": "env"
        }
      ]
    },
    {
      "id": "module-2",
      "title": "Modul 2: Global Audio State Management (Zustand)",
      "content": "Aplikasi musik butuh Audio Player yang terus berjalan meskipun user pindah halaman. Ini berarti kita tidak bisa menyimpan state di dalam komponen lokal. Kita butuh arsitektur Global State yang kokoh.",
      "submodules": [
        {
          "id": "sub-2-1",
          "title": "2.1 Membuat Zustand Player Store",
          "content": "Kita akan membuat store menggunakan Zustand. Store ini akan menyimpan track saat ini, daftar putar (queue), dan status pemutaran.<br/><br/><br/>**Penempatan File:** Buat file ini di `src/store/usePlayerStore.ts`",
          "code": "import { create } from 'zustand';\n\ninterface PlayerState {\n  currentTrack: Track | null;\n  isPlaying: boolean;\n  queue: Track[];\n  playTrack: (track: Track) => void;\n  togglePlay: () => void;\n}\n\nexport const usePlayerStore = create<PlayerState>((set) => ({\n  currentTrack: null,\n  isPlaying: false,\n  queue: [],\n  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),\n  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),\n}));",
          "lang": "typescript"
        },
        {
          "id": "sub-2-2",
          "title": "2.2 Sinkronisasi Antrean (Queue System)",
          "content": "Sistem antrean (queue) yang baik bisa menangani event 'Next' dan 'Previous'. Kita perlu memanipulasi array di dalam state secara efisien.<br/><br/><br/>**Penempatan File:** Tambahkan fungsi ini di dalam `src/store/usePlayerStore.ts`.",
          "code": "nextTrack: () => set((state) => {\n  const currentIndex = state.queue.findIndex(t => t.id === state.currentTrack?.id);\n  if (currentIndex < state.queue.length - 1) {\n    return { currentTrack: state.queue[currentIndex + 1] };\n  }\n  return state;\n}),",
          "lang": "typescript"
        }
      ]
    },
    {
      "id": "module-3",
      "title": "Modul 3: Desain UI Player Bar (Persistent)",
      "content": "Player Bar harus selalu menempel di bawah layar aplikasi. Kita akan memanfaatkan Layout Next.js.",
      "submodules": [
        {
          "id": "sub-3-1",
          "title": "3.1 Integrasi Player Bar ke Root Layout",
          "content": "Agar Player Bar tidak mati saat pindah route, pasang komponennya di `src/app/layout.tsx` (Root Layout). Jangan pasang di setiap halaman!<br/><br/><br/>**Penempatan File:** Tambahkan import dan komponen `GlobalPlayerBar` di `src/app/layout.tsx` tepat sebelum tag `</body>` ditutup."
        },
        {
          "id": "sub-3-2",
          "title": "3.2 SeekBar & Volume Controls (Interaktif)",
          "content": "Kita perlu membuat range slider khusus untuk merender posisi durasi saat ini. Kita akan menggunakan HTML5 Input Range yang distyle dengan Tailwind CSS.<br/><br/><br/>**Penempatan File:** Buat file komponen `src/components/audio/SeekBar.tsx`."
        }
      ]
    },
    {
      "id": "module-4",
      "title": "Modul 4: Integrasi Database & CDN (Object Storage)",
      "content": "File musik sangat besar. Kita tidak boleh menyimpannya di database relasional. Kita butuh Object Storage (S3/Firebase Storage) dan CDN.",
      "submodules": [
        {
          "id": "sub-4-1",
          "title": "4.1 Arsitektur Penyimpanan & Metadata",
          "content": "Pemisahan Data:\n1. **Cloud SQL / Firestore**: Simpan metadata lagu (Judul, Artis, Cover, Audio URL, Durasi).\n2. **Cloud Storage / CDN**: Simpan file fisik `.mp3`.<br/><br/><br/>**Penempatan File:** Definisikan skema Prisma atau Mongoose di `src/db/schema.ts`."
        },
        {
          "id": "sub-4-2",
          "title": "4.2 Implementasi Upload API Route",
          "content": "Endpoint khusus di backend Next.js untuk menerima file dan memindahkannya ke Cloud Storage dengan aman, lengkap dengan verifikasi tipe file (MIME type).<br/><br/><br/>**Penempatan File:** Buat file rute API di `src/app/api/upload/route.ts`."
        }
      ]
    },
    {
      "id": "module-5",
      "title": "Modul 5: Sistem Autentikasi & Proteksi Rute",
      "content": "User butuh login untuk menyimpan playlist dan riwayat putaran lagu favorit mereka.",
      "submodules": [
        {
          "id": "sub-5-1",
          "title": "5.1 Setup Firebase Auth / NextAuth",
          "content": "Kita akan menggunakan Firebase Auth (atau NextAuth.js) untuk memfasilitasi integrasi single sign-on (SSO) instan dengan Google.<br/><br/><br/>**Penempatan File:** Buat wrapper context di `src/components/providers/AuthProvider.tsx`."
        },
        {
          "id": "sub-5-2",
          "title": "5.2 Middleware untuk Rute Premium",
          "content": "Batas pengguna gratis agar tidak bisa mengakses fitur premium menggunakan Next.js Middleware Edge.<br/><br/><br/>**Penempatan File:** Buat file `src/middleware.ts` pada root aplikasi."
        }
      ]
    },
    {
      "id": "module-6",
      "title": "Modul 6: Manajemen Playlist (Relasi Database)",
      "content": "Playlist adalah fitur krusial. User bisa membuat, mengedit, dan menambah lagu ke playlist dengan relasi data yang rumit.",
      "submodules": [
        {
          "id": "sub-6-1",
          "title": "6.1 Skema Database Relasi Many-to-Many",
          "content": "Satu playlist punya banyak lagu, satu lagu bisa ada di banyak playlist. Gunakan Join Table untuk merepresentasikannya secara efisien.<br/><br/><br/>**Penempatan File:** Tambahkan entitas `PlaylistSong` pada `src/db/schema.ts`."
        },
        {
          "id": "sub-6-2",
          "title": "6.2 Mutasi Data Menggunakan Server Actions",
          "content": "Next.js Server Actions memungkinkan kita mengupdate database langsung dari komponen klien tanpa membuat boilerplate API Route.<br/><br/><br/>**Penempatan File:** Buat file utilitas mutasi di `src/actions/playlist.ts`."
        }
      ]
    },
    {
      "id": "module-7",
      "title": "Modul 7: Kurasi Musik AI (Gemini Integration)",
      "content": "Gunakan kecerdasan buatan Gemini API untuk menganalisis mood pengguna berdasarkan aktivitas, lalu menyarankan track musik dinamis.",
      "submodules": [
        {
          "id": "sub-7-1",
          "title": "7.1 Merancang Prompt AI Playlist Generator",
          "content": "Prompt engineering sangat krusial. Sistem AI harus mengembalikan respons yang strictly berbentuk array ID lagu JSON agar mudah di-parse UI.<br/><br/><br/>**Penempatan File:** Buat endpoint handler Next.js di `src/app/api/ai/recommend/route.ts`."
        },
        {
          "id": "sub-7-2",
          "title": "7.2 Menampilkan Hasil ke UI (Skeleton Loading)",
          "content": "Proses AI membutuhkan waktu (latensi). Gunakan Skeleton Loading atau Suspense Next.js untuk menjaga kenyamanan user (UX).<br/><br/><br/>**Penempatan File:** Modifikasi halaman kurasi pada `src/app/explore/page.tsx`."
        }
      ]
    },
    {
      "id": "module-8",
      "title": "Modul 8: Lirik Real-Time & Sinkronisasi",
      "content": "Bangun fitur pembacaan lirik karaoke ala Spotify dengan menyesuaikan timestamp dan pemutaran audio secara real-time.",
      "submodules": [
        {
          "id": "sub-8-1",
          "title": "8.1 Format LRC & Algoritma Parsing",
          "content": "Lirik disimpan dalam format `.lrc` (berisi timestamp dan teks). Kita harus mengubah format ini menjadi struktur JSON/Array yang mudah di-loop oleh React.<br/><br/><br/>**Penempatan File:** Buat file utilitas `src/lib/lrcParser.ts` (Murni Typescript)."
        },
        {
          "id": "sub-8-2",
          "title": "8.2 Sinkronisasi Hook (useLyricSync)",
          "content": "Membuat custom hook yang memantau nilai `currentTime` di store, dan menyorot (highlight) lirik yang sesuai dengan waktu berjalannya lagu.<br/><br/><br/>**Penempatan File:** Tulis logika hook pada `src/hooks/useLyricSync.ts`."
        }
      ]
    },
    {
      "id": "module-9",
      "title": "Modul 9: Web Audio API & Visualizer Grafis",
      "content": "Memberikan kesan premium dengan meng-render sinyal audio secara dinamis di atas elemen canvas HTML5.",
      "submodules": [
        {
          "id": "sub-9-1",
          "title": "9.1 Setup AnalyserNode",
          "content": "Koneksikan tag `<audio>` HTML dengan `AudioContext` browser untuk meretas (intercept) frekuensi lagunya menggunakan API `AnalyserNode`.<br/><br/><br/>**Penempatan File:** Taruh logic context ini di komponen audio inti `src/components/audio/AudioContextWrapper.tsx`."
        },
        {
          "id": "sub-9-2",
          "title": "9.2 Merender Frame ke Canvas (requestAnimationFrame)",
          "content": "Loop frekuensi secara konsisten di angka 60FPS. Tampilkan sebagai bar equalizer atau lingkaran riak visual.<br/><br/><br/>**Penempatan File:** Bangun grafis UI-nya di `src/components/audio/VisualizerCanvas.tsx`."
        }
      ]
    },
    {
      "id": "module-10",
      "title": "Modul 10: Optimasi Caching & Performansi Pemuatan",
      "content": "Jaga agar aplikasi ringan dan bandwith efisien. Lagu yang sering diputar tidak boleh di-download ulang terus menerus.",
      "submodules": [
        {
          "id": "sub-10-1",
          "title": "10.1 IndexedDB Audio Caching",
          "content": "Sistem penyimpanan internal di browser bisa kita pakai untuk mencache berkas Blob audio besar (hingga hitungan puluhan MB).<br/><br/><br/>**Penempatan File:** Tulis skema wrapper IndexedDB pada `src/lib/audioCache.ts`."
        },
        {
          "id": "sub-10-2",
          "title": "10.2 Prefetching Metadata Lagu",
          "content": "Gunakan properti komponen `<Link prefetch>` dari Next.js dipadukan dengan pemuatan awal sampul (cover art) lagu yang ada di antrean selanjutnya.<br/><br/><br/>**Penempatan File:** Optimasi file kartu lagu pada `src/components/molecules/SongCard.tsx`."
        }
      ]
    },
    {
      "id": "module-11",
      "title": "Modul 11: Progressive Web App (PWA) & Mode Offline",
      "content": "Jadikan aplikasi dapat di-install dan mampu memutar musik secara offline dari lagu yang telah disimpan.",
      "submodules": [
        {
          "id": "sub-11-1",
          "title": "11.1 Mendaftarkan Service Worker",
          "content": "Kita butuh package `next-pwa` atau set-up manual Service Worker untuk mendengarkan permintaan jaringan (network fetch) dan merutekannya ke cache.<br/><br/><br/>**Penempatan File:** Sesuaikan konfigurasinya di `next.config.mjs`."
        },
        {
          "id": "sub-11-2",
          "title": "11.2 Web App Manifest & Desain Ikon (Homescreen)",
          "content": "Manifest memberitahu browser bahwa aplikasi ini memiliki warna tema, layar sapaan (splash screen), dan mendukung standalone mode (beroperasi seperti aplikasi HP native).<br/><br/><br/>**Penempatan File:** Buat manifest pada `public/manifest.json`."
        }
      ]
    },
    {
      "id": "module-12",
      "title": "Modul 12: Deployment, Skalabilitas & Produksi",
      "content": "Fase akhir: memastikan platform streaming aman, cepat, dan siap melayani puluhan ribu pendengar bersamaan.",
      "submodules": [
        {
          "id": "sub-12-1",
          "title": "12.1 Konfigurasi Build & Environment",
          "content": "Sematkan environment variables produksi, kurangi bundle size JS dari package pihak ketiga yang tak perlu (tree shaking), dan uji performansi statis SSR.<br/><br/><br/>**Penempatan File:** Sesuaikan skrip di `package.json` dan cek hasil `.next/`."
        },
        {
          "id": "sub-12-2",
          "title": "12.2 Deploy Frontend Edge Network (Vercel)",
          "content": "Distribusikan antarmuka dan API Route (Backend-for-Frontend) kita melintasi jaringan Edge berskala global untuk mendapatkan latency sekecil mungkin.<br/><br/><br/>**Penempatan File:** Konfigurasi rule Vercel jika diperlukan di `vercel.json`."
        }
      ]
    }
  ]
};

fs.writeFileSync('src/data/academy-curriculum.json', JSON.stringify(curriculum, null, 2));
console.log('Curriculum fully fleshed out with multiple submodules');
