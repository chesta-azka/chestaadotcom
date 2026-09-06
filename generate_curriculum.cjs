const fs = require('fs');

const curriculum = {
  tutorialContent: [
    {
      id: 'module-1',
      title: 'Modul 1: Fondasi Arsitektur Web Modern',
      content: 'Selamat datang di Academy. Modul ini membekali Anda dengan konsep dasar dan setup lingkungan kerja profesional standar Enterprise.',
      submodules: [
        {
          id: 'sub-1-1',
          title: '1.1. Paradigma Web: CSR, SSR, SSG, dan ISR',
          content: 'Pahami perbedaan mendasar antara Client-Side Rendering, Server-Side Rendering, Static Site Generation, dan Incremental Static Regeneration. Kapan harus menggunakan masing-masing strategi ini untuk performa optimal.',
        },
        {
          id: 'sub-1-2',
          title: '1.2. Setup Lingkungan Kerja (Node.js & NVM)',
          content: 'Langkah pertama adalah memastikan versi Node.js yang konsisten di seluruh tim menggunakan NVM (Node Version Manager).',
          code: 'nvm install 20\nnvm use 20\nnode -v',
          lang: 'bash'
        },
        {
          id: 'sub-1-3',
          title: '1.3. Inisialisasi Project dengan Next.js App Router',
          content: 'Gunakan create-next-app untuk menginisialisasi proyek baru dengan dukungan penuh untuk TypeScript, Tailwind CSS, dan App Router terbaru.',
          code: 'npx create-next-app@latest enterprise-saas --typescript --tailwind --eslint\ncd enterprise-saas\nnpm run dev',
          lang: 'bash'
        },
        {
          id: 'sub-1-4',
          title: '1.4. Konvensi Struktur Folder Enterprise',
          content: 'Menjaga kode tetap terorganisir sangat penting saat aplikasi bertambah besar. Gunakan struktur folder yang memisahkan UI, logika bisnis, state, dan utilitas.',
          code: 'src/\n├── app/          // Routing & Pages (App Router)\n├── components/   // UI Components (Atomic Design)\n│   ├── ui/       // Base UI (Buttons, Inputs)\n│   └── shared/   // Complex shared components\n├── lib/          // Utils, helpers, configuration\n├── hooks/        // Custom React Hooks\n├── store/        // Global State (Zustand/Redux)\n├── types/        // TypeScript interfaces\n└── server/       // Server Actions & Backend logic',
          lang: 'text'
        },
        {
          id: 'sub-1-5',
          title: '1.5. Konfigurasi Linter dan Formatter',
          content: 'Pastikan seluruh tim mengikuti standar kode yang sama dengan mengkonfigurasi ESLint dan Prettier.',
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Modul 2: UI/UX & Tailwind CSS Lanjutan',
      content: 'Membangun antarmuka pengguna yang indah, responsif, dan dapat diakses (accessible) menggunakan Tailwind CSS dan prinsip desain modern.',
      submodules: [
        {
          id: 'sub-2-1',
          title: '2.1. Konfigurasi Tema Kustom (Tailwind Config)',
          content: 'Sesuaikan palet warna, tipografi, dan breakpoints bawaan Tailwind agar sesuai dengan identitas merek (brand identity) Anda.'
        },
        {
          id: 'sub-2-2',
          title: '2.2. Membangun Sistem Desain (Design System)',
          content: 'Buat komponen dasar yang dapat digunakan kembali secara luas, seperti Button, Card, dan Modal, menggunakan varian CVA (Class Variance Authority).'
        },
        {
          id: 'sub-2-3',
          title: '2.3. Animasi Tingkat Lanjut dengan Framer Motion',
          content: 'Tambahkan interaksi yang mulus (micro-interactions) untuk meningkatkan User Experience (UX).',
          code: 'import { motion } from "motion/react";\n\nexport const FadeIn = ({ children }) => (\n  <motion.div\n    initial={{ opacity: 0, y: 20 }}\n    animate={{ opacity: 1, y: 0 }}\n    transition={{ duration: 0.5, ease: "easeOut" }}\n  >\n    {children}\n  </motion.div>\n);',
          lang: 'tsx'
        },
        {
          id: 'sub-2-4',
          title: '2.4. Aksesibilitas (a11y) dan Dukungan Keyboard',
          content: 'Aplikasi Enterprise harus dapat digunakan oleh semua orang. Pelajari penggunaan ARIA attributes dan manajemen fokus (focus management).'
        },
        {
          id: 'sub-2-5',
          title: '2.5. Implementasi Dark Mode',
          content: 'Kelola tema aplikasi (Light/Dark mode) menggunakan CSS variables dan sinkronisasi dengan preferensi sistem pengguna.'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Modul 3: Autentikasi & Otorisasi Sistem',
      content: 'Mengamankan aplikasi Anda dengan sistem autentikasi modern, manajemen sesi, dan kontrol akses berbasis peran (RBAC).',
      submodules: [
        {
          id: 'sub-3-1',
          title: '3.1. Pengenalan Firebase Auth & JWT',
          content: 'Memahami cara kerja JSON Web Tokens (JWT) dan alur autentikasi tanpa kata sandi (passwordless) atau via OAuth.'
        },
        {
          id: 'sub-3-2',
          title: '3.2. Implementasi OAuth (Google & GitHub)',
          content: 'Membangun antarmuka login sekali klik menggunakan provider OAuth untuk mengurangi friksi saat pendaftaran.',
          code: 'import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";\nimport { auth } from "@/lib/firebase";\n\nexport const loginWithGoogle = async () => {\n  const provider = new GoogleAuthProvider();\n  try {\n    const result = await signInWithPopup(auth, provider);\n    return result.user;\n  } catch (error) {\n    console.error("Login failed", error);\n  }\n};',
          lang: 'typescript'
        },
        {
          id: 'sub-3-3',
          title: '3.3. Session Cookies di Next.js Route Handlers',
          content: 'Tingkatkan keamanan dengan memindahkan kredensial dari localStorage ke HttpOnly Cookies menggunakan Firebase Admin SDK.'
        },
        {
          id: 'sub-3-4',
          title: '3.4. Middleware untuk Proteksi Halaman',
          content: 'Gunakan Next.js Middleware untuk mencegat (intercept) request dan me-redirect pengguna yang belum login (unauthorized).',
          code: 'import { NextResponse } from "next/server";\nimport type { NextRequest } from "next/server";\n\nexport function middleware(request: NextRequest) {\n  const session = request.cookies.get("session")?.value;\n  \n  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {\n    return NextResponse.redirect(new URL("/login", request.url));\n  }\n  \n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: ["/dashboard/:path*"],\n};',
          lang: 'typescript',
          filename: 'middleware.ts'
        },
        {
          id: 'sub-3-5',
          title: '3.5. Role-Based Access Control (RBAC)',
          content: 'Konfigurasi Firebase Custom Claims untuk membedakan antara pengguna biasa, editor, dan administrator.'
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Modul 4: Integrasi Database & State Management',
      content: 'Mengelola siklus hidup data: dari penyimpanan persisten di Firestore hingga state lokal di klien dengan React Context & Zustand.',
      submodules: [
        {
          id: 'sub-4-1',
          title: '4.1. Desain Skema Firestore (NoSQL)',
          content: 'Pelajari pola desain data NoSQL seperti denormalisasi, koleksi bersarang (sub-collections), dan batasan dokumen.'
        },
        {
          id: 'sub-4-2',
          title: '4.2. Operasi CRUD (Create, Read, Update, Delete)',
          content: 'Praktik langsung mengeksekusi operasi database dari klien maupun server.'
        },
        {
          id: 'sub-4-3',
          title: '4.3. React Server Components untuk Data Fetching',
          content: 'Gunakan arsitektur komponen sisi server untuk mengambil data langsung dari database tanpa mengirimkan kode fetch ke klien.',
          code: 'import { db } from "@/lib/firebase-admin";\n\nexport default async function DashboardPage() {\n  // Fetching data langsung di server komponen\n  const snapshot = await db.collection("users").get();\n  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));\n\n  return (\n    <div>\n      <h1>Total Users: {users.length}</h1>\n      {/* Render list of users */}\n    </div>\n  );\n}',
          lang: 'tsx'
        },
        {
          id: 'sub-4-4',
          title: '4.4. Optimistic UI Updates',
          content: 'Meningkatkan persepsi kecepatan dengan memperbarui UI seketika saat data dikirim ke server, sebelum konfirmasi sukses diterima.'
        },
        {
          id: 'sub-4-5',
          title: '4.5. Realtime Subscriptions (onSnapshot)',
          content: 'Bangun fitur reaktif seperti chat atau notifikasi langsung (live notifications) menggunakan websocket.'
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Modul 5: AI & Otomatisasi (Gemini API)',
      content: 'Tingkatkan kecerdasan aplikasi Anda dengan mengintegrasikan model AI generatif (Generative AI) menggunakan Google Gemini API.',
      submodules: [
        {
          id: 'sub-5-1',
          title: '5.1. Pengenalan LLM & Prompt Engineering Dasar',
          content: 'Pahami cara kerja Large Language Models dan teknik merangkai prompt (Zero-shot, Few-shot) untuk mendapatkan respon yang akurat.'
        },
        {
          id: 'sub-5-2',
          title: '5.2. Setup Google Gen AI SDK',
          content: 'Instalasi dan inisialisasi SDK resmi @google/genai di sisi server (Node.js/Next.js Route Handlers).',
          code: 'import { GoogleGenAI } from "@google/genai";\n\nexport const ai = new GoogleGenAI({\n  apiKey: process.env.GEMINI_API_KEY\n});',
          lang: 'typescript',
          filename: 'lib/gemini.ts'
        },
        {
          id: 'sub-5-3',
          title: '5.3. Pembuatan Endpoint Chat AI (Text Generation)',
          content: 'Membangun rute API untuk memproses pertanyaan pengguna dan mengembalikan jawaban cerdas dari model Gemini 2.5 Flash.',
          code: 'import { ai } from "@/lib/gemini";\nimport { NextResponse } from "next/server";\n\nexport async function POST(req: Request) {\n  const { prompt } = await req.json();\n  \n  const response = await ai.models.generateContent({\n    model: "gemini-3.5-flash",\n    contents: prompt,\n  });\n  \n  return NextResponse.json({ text: response.text });\n}',
          lang: 'typescript',
          filename: 'app/api/chat/route.ts'
        },
        {
          id: 'sub-5-4',
          title: '5.4. Structured Outputs (JSON Schema)',
          content: 'Memaksa AI untuk mengembalikan data dalam format JSON yang ketat sehingga langsung dapat digunakan dalam logika aplikasi (misalnya untuk mengekstrak entitas data).'
        },
        {
          id: 'sub-5-5',
          title: '5.5. AI Vision & Multimodal Capabilities',
          content: 'Pelajari cara mengirim gambar bersamaan dengan prompt teks untuk analisis visual otomatis.'
        }
      ]
    },
    {
      id: 'module-6',
      title: 'Modul 6: Optimasi, Testing & Deployment',
      content: 'Persiapan rilis produksi: dari pengujian terotomatisasi hingga metrik pemantauan performa Web Vitals.',
      submodules: [
        {
          id: 'sub-6-1',
          title: '6.1. Unit Testing dengan Vitest & React Testing Library',
          content: 'Tulis pengujian (tests) untuk memastikan fungsi utilitas dan komponen UI bekerja dengan benar meskipun ada perubahan kode.'
        },
        {
          id: 'sub-6-2',
          title: '6.2. End-to-End (E2E) Testing dengan Playwright',
          content: 'Simulasikan alur pengguna yang lengkap (seperti proses login dan checkout) menggunakan browser automation.'
        },
        {
          id: 'sub-6-3',
          title: '6.3. Optimasi SEO & Metadata Generation',
          content: 'Konfigurasi dynamic routing untuk menghasilkan tag metdata Open Graph dan sitemap.xml otomatis.'
        },
        {
          id: 'sub-6-4',
          title: '6.4. CI/CD Pipeline (GitHub Actions)',
          content: 'Otomatisasi proses pengecekan kode (linting), testing, dan deployment setiap kali ada push ke branch utama.'
        },
        {
          id: 'sub-6-5',
          title: '6.5. Deployment Vercel & Observability',
          content: 'Langkah terakhir: mengkonfigurasi project Vercel, menyetel Environment Variables, dan memasang custom domain.'
        }
      ]
    }
  ]
};

fs.writeFileSync('src/data/academy-curriculum.json', JSON.stringify(curriculum, null, 2));
console.log('Successfully generated extensive curriculum JSON.');
