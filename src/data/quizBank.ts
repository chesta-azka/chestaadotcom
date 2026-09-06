export const QUIZ_BANK = [
  {
    question: "Next.js App Router (dengan folder `app`) menggunakan Server Components secara default.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Di App Router, semua komponen secara default adalah React Server Components kecuali ditandai dengan 'use client'."
  },
  {
    question: "Firebase Admin SDK aman digunakan di sisi klien (browser) asalkan API key disembunyikan.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Firebase Admin SDK memiliki akses tak terbatas ke seluruh database dan memerlukan service account key. Ia HANYA boleh dijalankan di sisi server."
  },
  {
    question: "Manakah metrik Core Web Vitals yang mengukur stabilitas visual (elemen yang bergeser tiba-tiba)?",
    options: ["LCP (Largest Contentful Paint)", "FID (First Input Delay)", "CLS (Cumulative Layout Shift)", "INP (Interaction to Next Paint)"],
    answer: 2,
    explanation: "CLS mengukur seberapa banyak pergeseran tak terduga pada elemen visual selama halaman dirender."
  },
  {
    question: "Dalam mendesain skema NoSQL (seperti Firestore) untuk efisiensi pembacaan (read), kita harus menggunakan prinsip normalisasi yang tinggi.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Di NoSQL, operasi baca dioptimalkan dengan cara denormalisasi (pengulangan data terencana) agar klien bisa mengambil data dalam satu kueri tanpa JOIN."
  },
  {
    question: "Route group di Next.js yang ditandai dengan tanda kurung, seperti `(auth)`, akan menambahkan '/auth' ke dalam struktur URL publik.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Route group digunakan murni untuk organisasi folder dan layout tanpa memengaruhi segmen URL publik."
  },
  {
    question: "Apa keuntungan utama menggunakan ID Token Firebase untuk membuat Session Cookie di sisi server?",
    options: ["Agar database Firebase tidak cepat penuh", "Mendukung SSR sehingga server mengetahui status login sebelum merender", "Mengubah tipe data NoSQL menjadi SQL", "Mengenkripsi password pengguna di database"],
    answer: 1,
    explanation: "Session cookie disertakan pada setiap request server (SSR), memungkinkan kita merender halaman spesifik pengguna atau memproteksi rute dari sisi server."
  },
  {
    question: "Pada Next.js, file `layout.tsx` akan me-re-render seluruh komponen anak (children) setiap kali kita berpindah halaman di dalam layout tersebut.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Layout di Next.js akan mempertahankan state dan tidak me-re-render dirinya sendiri saat navigasi antar halaman di dalamnya."
  },
  {
    question: "Menggunakan index komposit (composite index) di Firestore diwajibkan jika kita melakukan kueri pada lebih dari satu field (menggabungkan `==` dan `<`, misalnya).",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Firestore memerlukan indeks komposit eksplisit untuk mendukung kueri yang memfilter atau mengurutkan lebih dari satu field secara bersamaan."
  },
  {
    question: "Tailwind CSS secara default menyertakan semua utilitas kelas CSS di file production akhir meskipun tidak digunakan.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Tailwind CSS selalu memindai (purge) file sumber dan hanya menyertakan kelas CSS yang benar-benar digunakan dalam produksi."
  },
  {
    question: "Server Actions di Next.js memungkinkan Anda memanggil fungsi server secara langsung dari komponen klien tanpa membuat API Route terpisah.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Server Actions mengabstraksi pembuatan endpoint API, sehingga Anda dapat mengeksekusi mutasi server secara langsung."
  },
  {
    question: "Cloud Firestore menjamin konsistensi yang kuat (strong consistency) pada semua operasi pembacaan dokumen di seluruh dunia.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Berbeda dengan Realtime Database yang *eventual consistency*, Firestore menawarkan *strong consistency* secara default."
  },
  {
    question: "File `loading.tsx` di Next.js App Router dibuat berdasarkan fitur React Suspense.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Next.js secara otomatis membungkus `page.tsx` dengan `<Suspense>` yang menampilkan UI dari `loading.tsx` selama proses render asinkron berlangsung."
  },
  {
    question: "Jika kita ingin variabel environment (`.env`) terbaca oleh klien (browser) di Next.js, kita harus memberikan prefix:",
    options: ["CLIENT_PUBLIC_", "REACT_APP_", "NEXT_PUBLIC_", "VITE_"],
    answer: 2,
    explanation: "Di Next.js, hanya variabel environment yang diawali dengan `NEXT_PUBLIC_` yang akan di-ekspos ke bundle browser klien."
  },
  {
    question: "Vercel Analytics mengharuskan kita memasang script Google Analytics (`gtag.js`) agar bisa memantau Web Vitals.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Vercel Analytics adalah fitur bawaan dari platform Vercel yang tidak memerlukan Google Analytics atau script pihak ketiga lainnya."
  },
  {
    question: "Framer Motion (motion/react) hanya bisa menganimasikan komponen saat masuk (mount), tidak saat keluar (unmount).",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Framer Motion memiliki komponen `<AnimatePresence>` yang memungkinkan kita menganimasikan komponen saat proses unmount (exit)."
  },
  {
    question: "Di Firestore, koleksi (collection) dapat bersarang langsung di dalam koleksi lain (Collection -> Collection).",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Struktur Firestore harus Collection -> Document -> Collection (berselang-seling). Koleksi tidak bisa berisi koleksi langsung tanpa dokumen sebagai induknya."
  },
  {
    question: "Fungsi `revalidatePath` di Next.js digunakan untuk menghapus cache (purge) dari halaman statis (SSG/ISR) berdasarkan rute yang ditentukan.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Fungsi ini sangat berguna di dalam Server Actions untuk memutakhirkan tampilan setelah ada mutasi (misalnya membuat postingan baru)."
  },
  {
    question: "Menambahkan atribut `priority` pada komponen `<Image>` Next.js akan mendahulukan pengunduhan gambar (LCP optimization) di atas viewport fold.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Gambar LCP harus memiliki atribut `priority` agar di-*preload* oleh Next.js untuk mencegah penundaan render awal."
  },
  {
    question: "Aturan Keamanan Firebase (Firestore Rules) dapat melakukan request API HTTP eksternal untuk memvalidasi token dari pihak ketiga.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah. Firestore Rules tidak memiliki kemampuan untuk melakukan request HTTP ke luar. Semua validasi harus didasarkan pada data dokumen, auth token (JWT internal), atau fungsi internal Firebase."
  },
  {
    question: "Middleware Next.js dieksekusi di edge runtime, sehingga tidak semua modul Node.js (seperti `fs`) dapat digunakan di dalamnya.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar. Edge Runtime di Next.js didesain sangat cepat dengan API standar Web, sehingga pustaka khusus Node (fs, child_process) tidak didukung."
  }
];

export const getRandomQuestions = (count: number = 20) => {
  const shuffled = [...QUIZ_BANK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
