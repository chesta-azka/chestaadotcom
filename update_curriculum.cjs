const fs = require('fs');

const curriculum = {
  "tutorialContent": [
    {
      "id": "module-1",
      "title": "Modul 1: Persiapan Environment & Struktur Proyek (VS Code)",
      "content": "Selamat datang di Masterclass Full-Stack Music Streaming App. Pendekatan kita di sini adalah _Enterprise-grade_. Artinya, kita tidak akan mengkoding asal jalan, tapi membangun arsitektur yang bisa diskalakan (scalable) sejak awal.\n\nSebelum mulai, pastikan Anda menggunakan **Visual Studio Code (VS Code)** sebagai editor utama, karena kita akan sangat mengandalkan terminal terintegrasi (`` Ctrl + ` ``) dan ekstensi TypeScript.",
      "submodules": [
        {
          "id": "sub-1-1",
          "title": "1.1 Inisialisasi Next.js & Dependencies Utama",
          "content": "Langkah pertama adalah membuat proyek Next.js dengan App Router. Buka terminal di **VS Code** Anda, navigasikan ke folder workspace Anda (misal: `Documents/Projects`), lalu jalankan perintah berikut.<br/><br/><br/>**Penempatan File:** Jalankan di terminal VS Code.",
          "code": "npx create-next-app@latest vibe-music --typescript --tailwind --eslint\ncd vibe-music\nnpm install zustand howler lucide-react framer-motion",
          "lang": "bash"
        },
        {
          "id": "sub-1-2",
          "title": "1.2 Arsitektur Folder Musik Enterprise",
          "content": "Aplikasi musik sangat rentan terhadap *re-rendering* UI yang mematikan audio. Kita harus memisahkan folder khusus.<br/><br/>Buka sidebar explorer di **VS Code**, buat struktur folder ini di dalam `src/`:\n\n*   **`src/app/`**: (Otomatis dibuat) Untuk sistem routing halaman.\n*   **`src/components/audio/`**: Untuk komponen UI pemutar musik agar terisolasi.\n*   **`src/store/`**: Untuk Global State (Zustand) agar lagu tidak mati saat pindah halaman.\n*   **`src/hooks/`**: Untuk custom hooks Web Audio API.<br/><br/><br/>**Penempatan File:** Jalankan di terminal VS Code untuk membuat folder dengan cepat.",
          "code": "mkdir -p src/components/audio src/store src/hooks",
          "lang": "bash"
        },
        {
          "id": "sub-1-3",
          "title": "1.3 Pembersihan File Bawaan (Boilerplate)",
          "content": "Next.js membawa banyak gaya (styles) bawaan yang tidak kita butuhkan.<br/><br/>Buka file `src/app/page.tsx` di **VS Code**, hapus semua isinya, dan ganti dengan kode kerangka (skeleton) yang bersih.<br/><br/><br/>**Penempatan File:** Ganti seluruh (Replace All) isi file `src/app/page.tsx`.",
          "code": "export default function HomePage() {\n  return (\n    <main className=\"flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white\">\n      <h1 className=\"text-4xl font-bold\">Vibe Music Workspace</h1>\n      <p className=\"text-slate-400 mt-2\">Arsitektur aplikasi musik Anda siap digunakan.</p>\n    </main>\n  );\n}",
          "lang": "typescript"
        }
      ]
    },
    {
      "id": "module-2",
      "title": "Modul 2: Global State Management dengan Zustand",
      "content": "Jika kita meletakkan status pemutaran musik (Play/Pause) di `page.tsx`, lagunya akan terhenti saat user mengeklik halaman profil atau playlist. Solusinya adalah *Global State* di luar siklus hidup halaman. Kita menggunakan Zustand karena jauh lebih ringan dan ringkas daripada Redux.",
      "submodules": [
        {
          "id": "sub-2-1",
          "title": "2.1 Mendefinisikan Tipe Data Track",
          "content": "Karena kita menggunakan TypeScript, kita harus mendefinisikan bentuk data (interface) dari sebuah lagu terlebih dahulu sebelum membuat logic playernya.<br/><br/><br/>**Penempatan File:** Buat file baru bernama `types.ts` di dalam folder `src/store/`.",
          "code": "export interface Track {\n  id: string;\n  title: string;\n  artist: string;\n  coverUrl: string;\n  audioUrl: string;\n  duration: number;\n}",
          "lang": "typescript"
        },
        {
          "id": "sub-2-2",
          "title": "2.2 Membuat Player Store",
          "content": "Sekarang kita buat otaknya. Store ini akan diakses dari mana saja (Header, Sidebar, Player Bar) untuk mengetahui lagu apa yang sedang diputar.<br/><br/><br/>**Penempatan File:** Buat file baru `src/store/usePlayerStore.ts` di VS Code.",
          "code": "import { create } from 'zustand';\nimport { Track } from './types';\n\ninterface PlayerState {\n  currentTrack: Track | null;\n  isPlaying: boolean;\n  queue: Track[];\n  playTrack: (track: Track) => void;\n  togglePlay: () => void;\n}\n\nexport const usePlayerStore = create<PlayerState>((set) => ({\n  currentTrack: null,\n  isPlaying: false,\n  queue: [],\n  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),\n  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),\n}));",
          "lang": "typescript"
        },
        {
          "id": "sub-2-3",
          "title": "2.3 Menambahkan Fungsi Navigasi Antrean (Next/Prev)",
          "content": "Kita akan menyisipkan fungsi untuk lagu selanjutnya (Next) dan sebelumnya (Previous).<br/><br/><br/>**Penempatan File:** Buka kembali `src/store/usePlayerStore.ts`. Tambahkan fungsi ini **di dalam objek state `create`**, tepat di bawah definisi fungsi `togglePlay: ...`, sebelum kurung tutup `}));`.",
          "code": "  nextTrack: () => set((state) => {\n    if (!state.currentTrack) return state;\n    const currentIndex = state.queue.findIndex(t => t.id === state.currentTrack!.id);\n    if (currentIndex !== -1 && currentIndex < state.queue.length - 1) {\n      return { currentTrack: state.queue[currentIndex + 1], isPlaying: true };\n    }\n    return state;\n  }),\n  prevTrack: () => set((state) => {\n    if (!state.currentTrack) return state;\n    const currentIndex = state.queue.findIndex(t => t.id === state.currentTrack!.id);\n    if (currentIndex > 0) {\n      return { currentTrack: state.queue[currentIndex - 1], isPlaying: true };\n    }\n    return state;\n  }),",
          "lang": "typescript"
        }
      ]
    },
    {
      "id": "module-3",
      "title": "Modul 3: Desain UI Player Bar Persistent (Tidak Mati)",
      "content": "Tantangan terbesar aplikasi musik adalah membuat UI pemutar musik yang melayang (fixed) di bagian bawah layar dan tidak pernah di-render ulang (re-rendered) saat berpindah halaman.",
      "submodules": [
        {
          "id": "sub-3-1",
          "title": "3.1 Membuat Komponen GlobalPlayerBar",
          "content": "Kita akan membuat komponen visualnya terlebih dahulu menggunakan ikon dari Lucide React dan membaca state dari Zustand.<br/><br/><br/>**Penempatan File:** Buat file `src/components/audio/GlobalPlayerBar.tsx`.",
          "code": "import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';\nimport { usePlayerStore } from '@/store/usePlayerStore';\n\nexport default function GlobalPlayerBar() {\n  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = usePlayerStore();\n\n  if (!currentTrack) return null; // Sembunyikan jika tidak ada lagu\n\n  return (\n    <div className=\"fixed bottom-0 left-0 w-full h-24 bg-slate-900 border-t border-slate-800 text-white flex items-center px-6 z-50\">\n      {/* Info Lagu */}\n      <div className=\"flex items-center gap-4 w-1/3\">\n        <img src={currentTrack.coverUrl} alt=\"Cover\" className=\"w-14 h-14 rounded-md shadow-md\" />\n        <div>\n          <h4 className=\"font-semibold\">{currentTrack.title}</h4>\n          <p className=\"text-xs text-slate-400\">{currentTrack.artist}</p>\n        </div>\n      </div>\n      \n      {/* Kontrol Player */}\n      <div className=\"flex flex-col items-center justify-center w-1/3 gap-2\">\n        <div className=\"flex items-center gap-6\">\n          <button onClick={prevTrack} className=\"text-slate-400 hover:text-white\">\n            <SkipBack size={20} />\n          </button>\n          <button onClick={togglePlay} className=\"p-3 bg-white text-slate-900 rounded-full hover:scale-105 transition-transform\">\n            {isPlaying ? <Pause size={24} /> : <Play size={24} />}\n          </button>\n          <button onClick={nextTrack} className=\"text-slate-400 hover:text-white\">\n            <SkipForward size={20} />\n          </button>\n        </div>\n      </div>\n    </div>\n  );\n}",
          "lang": "tsx"
        },
        {
          "id": "sub-3-2",
          "title": "3.2 Menyisipkan Player Bar ke Root Layout",
          "content": "Agar `GlobalPlayerBar` ini tetap hidup (persistent) saat kita menavigasi halaman dari Home ke Playlist, kita harus meletakkannya di `layout.tsx` utama, BUKAN di `page.tsx`.<br/><br/><br/>**Penempatan File:** Buka file `src/app/layout.tsx`. Impor komponen tersebut dan letakkan tepat di atas tag `</body>` penutup.",
          "code": "import GlobalPlayerBar from '@/components/audio/GlobalPlayerBar';\n// ... import lainnya ...\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>\n        {/* Kotak Konten Utama */}\n        <div className=\"pb-24\">\n          {children}\n        </div>\n        \n        {/* PASANG DI SINI: Persistent Player Bar */}\n        <GlobalPlayerBar />\n      </body>\n    </html>\n  );\n}",
          "lang": "tsx"
        }
      ]
    },
    {
      "id": "module-4",
      "title": "Modul 4: Engine Audio Abstraksi (Howler.js)",
      "content": "Merender UI itu mudah, tetapi mengontrol decoding file `.mp3`, buffering, dan pengaturan volume audio murni di JavaScript cukup rumit. Kita akan membungkusnya menggunakan *Custom Hook* dengan `Howler.js`.",
      "submodules": [
        {
          "id": "sub-4-1",
          "title": "4.1 Membuat useAudioEngine Hook",
          "content": "Hook ini bertugas mendengarkan perubahan state di Zustand (seperti ketika user menekan tombol 'Play') dan menerjemahkannya ke perintah aktual di objek Howler (Audio Context browser).<br/><br/><br/>**Penempatan File:** Buat file `src/hooks/useAudioEngine.ts` di VS Code.",
          "code": "import { useEffect, useRef } from 'react';\nimport { Howl } from 'howler';\nimport { usePlayerStore } from '@/store/usePlayerStore';\n\nexport function useAudioEngine() {\n  const soundRef = useRef<Howl | null>(null);\n  const { currentTrack, isPlaying, nextTrack } = usePlayerStore();\n\n  useEffect(() => {\n    // Jika ada audio yang sedang jalan, matikan dulu (cleanup)\n    if (soundRef.current) {\n      soundRef.current.unload();\n    }\n\n    if (currentTrack) {\n      // Inisialisasi audio baru\n      soundRef.current = new Howl({\n        src: [currentTrack.audioUrl],\n        html5: true, // Wajib true untuk file besar agar bisa di-stream (tidak perlu download full dulu)\n        onend: () => {\n          nextTrack(); // Otomatis putar lagu selanjutnya kalau sudah habis\n        }\n      });\n\n      if (isPlaying) {\n        soundRef.current.play();\n      }\n    }\n\n    return () => {\n      if (soundRef.current) soundRef.current.unload();\n    };\n  }, [currentTrack]);\n\n  useEffect(() => {\n    if (!soundRef.current) return;\n    \n    if (isPlaying && !soundRef.current.playing()) {\n      soundRef.current.play();\n    } else if (!isPlaying && soundRef.current.playing()) {\n      soundRef.current.pause();\n    }\n  }, [isPlaying]);\n}",
          "lang": "typescript"
        },
        {
          "id": "sub-4-2",
          "title": "4.2 Memasang Engine secara Global",
          "content": "Hook `useAudioEngine` ini berjalan di background (tanpa UI). Kita perlu 'menghidupkannya' secara global.<br/><br/><br/>**Penempatan File:** Buka kembali komponen UI `src/components/audio/GlobalPlayerBar.tsx`. Tambahkan pemanggilan hook ini di bagian atas komponen (di bawah pengambilan state Zustand).",
          "code": "import { useAudioEngine } from '@/hooks/useAudioEngine';\n// ... import lainnya ...\n\nexport default function GlobalPlayerBar() {\n  // 1. Ambil state UI\n  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = usePlayerStore();\n  \n  // 2. AKTIFKAN ENGINE AUDIO DI BACKGROUND\n  useAudioEngine();\n\n  if (!currentTrack) return null;\n  // ... sisa kode return JSX ...",
          "lang": "tsx"
        }
      ]
    },
    {
      "id": "module-5",
      "title": "Modul 5: Animasi Progress Bar Real-Time",
      "content": "Progress bar yang mulus membutuhkan pembaruan status setiap frame (menggunakan `requestAnimationFrame`), BUKAN dengan `setInterval` atau state React biasa karena akan membuat seluruh aplikasi lag.",
      "submodules": [
        {
          "id": "sub-5-1",
          "title": "5.1 Komponen SeekBar Terisolasi",
          "content": "Kita pisahkan progress bar ke komponen sendiri agar saat *current time* (waktu berjalan) berubah setiap milidetik, hanya bar ini yang re-render, BUKAN seluruh Player Bar.<br/><br/><br/>**Penempatan File:** Buat file `src/components/audio/SeekBar.tsx`.",
          "code": "import { useState, useEffect, useRef } from 'react';\nimport { Howler } from 'howler';\nimport { usePlayerStore } from '@/store/usePlayerStore';\n\nexport default function SeekBar() {\n  const [progress, setProgress] = useState(0);\n  const { isPlaying, currentTrack } = usePlayerStore();\n  const rafRef = useRef<number>();\n\n  useEffect(() => {\n    const updateProgress = () => {\n      // Howler menyimpan context audio secara global di _howls[0]\n      const sound = Howler._howls[0];\n      if (sound && sound.playing()) {\n        const currentPos = sound.seek() as number;\n        const duration = sound.duration();\n        setProgress((currentPos / duration) * 100);\n      }\n      rafRef.current = requestAnimationFrame(updateProgress);\n    };\n\n    if (isPlaying) {\n      rafRef.current = requestAnimationFrame(updateProgress);\n    } else if (rafRef.current) {\n      cancelAnimationFrame(rafRef.current);\n    }\n\n    return () => {\n      if (rafRef.current) cancelAnimationFrame(rafRef.current);\n    };\n  }, [isPlaying]);\n\n  return (\n    <div className=\"w-full max-w-xl flex items-center gap-3 text-xs text-slate-400 font-mono\">\n      <div className=\"h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden cursor-pointer\">\n        <div \n          className=\"h-full bg-purple-500 rounded-full transition-all duration-75 ease-linear\"\n          style={{ width: `${progress}%` }}\n        />\n      </div>\n    </div>\n  );\n}",
          "lang": "tsx"
        }
      ]
    }
  ]
};

fs.writeFileSync('src/data/academy-curriculum.json', JSON.stringify(curriculum, null, 2));
console.log('Curriculum detailed update completed.');
