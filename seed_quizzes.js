import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-07319849-f721-4705-badf-87d9debdf6a5");

const MODULE_QUIZZES = {
  'module-1': {
    title: 'Evaluasi Modul 1: Setup & Environment',
    questions: [
      {
        question: 'File manakah yang tepat untuk menyimpan rahasia sisi server seperti FIREBASE_PRIVATE_KEY?',
        options: ['.env.local', '.env.production', 'next.config.js', 'package.json'],
        answer: 0
      }
    ]
  },
  'module-2': {
    title: 'Evaluasi Modul 2: Autentikasi',
    questions: [
      {
        question: 'Dalam arsitektur serverless, bagaimana cara menyimpan sesi otentikasi yang aman setelah login?',
        options: ['Menyimpan token di localStorage', 'Membuat session cookie dengan Firebase Admin SDK', 'Menyimpan kredensial di window.sessionStorage', 'Menggunakan state Redux'],
        answer: 1
      }
    ]
  },
  'module-3': {
    title: 'Evaluasi Modul 3: Database & State',
    questions: [
      {
        question: 'Apa tujuan dari pendekatan Optimistic UI saat melakukan mutasi data?',
        options: ['Meningkatkan keamanan data', 'Mengurangi biaya database', 'Memberikan ilusi seketika/zero-latency kepada pengguna', 'Menghindari kebutuhan caching server'],
        answer: 2
      }
    ]
  },
  'module-4': {
    title: 'Evaluasi Modul 4: Deployment & SEO',
    questions: [
      {
        question: 'Strategi rendering apa yang direkomendasikan untuk halaman pemasaran (landing page) untuk optimasi SEO yang maksimal?',
        options: ['SSR (Server-Side Rendering)', 'CSR (Client-Side Rendering)', 'SSG (Static Site Generation)', 'ISR (Incremental Static Regeneration)'],
        answer: 2
      }
    ]
  }
};

async function seed() {
  for (const [id, data] of Object.entries(MODULE_QUIZZES)) {
    await setDoc(doc(db, "quizzes", id), data);
    console.log(`Seeded quiz for ${id}`);
  }
  process.exit(0);
}

seed();
