import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import fs from "fs";

const configPath = './firebase-applet-config.json';
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const faqs = [
  { serviceSlug: "web-development", order: 1, question: "Berapa lama waktu pembuatan website?", answer: "Waktu pembuatan sangat bergantung pada kompleksitas fitur. Untuk landing page standar (1-3 halaman) biasanya memakan waktu 1-2 minggu. Sementara custom web app atau e-commerce membutuhkan waktu 4-8 minggu." },
  { serviceSlug: "web-development", order: 2, question: "Apakah website sudah termasuk hosting dan domain?", answer: "Ya, seluruh paket pengembangan web kami sudah termasuk layanan cloud hosting premium dan pendaftaran domain (.com/.id) gratis untuk tahun pertama." },
  { serviceSlug: "web-development", order: 3, question: "Apakah saya bisa mengubah konten sendiri nantinya?", answer: "Tentu. Kami akan menyediakan sistem manajemen konten (CMS) yang intuitif serta panduan penggunaan agar Anda dan tim bisa memperbarui teks, gambar, atau artikel blog secara mandiri." },
  
  { serviceSlug: "ai-agents", order: 1, question: "Bagaimana AI Agent bisa membantu bisnis saya?", answer: "AI Agent dapat bekerja 24/7 mengotomasi dukungan pelanggan (customer support), memproses kualifikasi prospek (leads), dan menjalankan tugas-tugas administratif rutin tanpa lelah, menghemat waktu tim Anda hingga 70%." },
  { serviceSlug: "ai-agents", order: 2, question: "Apakah AI ini menggunakan ChatGPT/Gemini?", answer: "Ya, kami mengintegrasikan LLM terkemuka (seperti GPT-4 atau Gemini) yang kami latih secara khusus dengan data bisnis Anda agar jawabannya selalu akurat dan sesuai dengan standar operasi (SOP) perusahaan." },
];

async function seed() {
  const existing = await getDocs(collection(db, "faqs"));
  if (existing.empty) {
    for (const f of faqs) {
      await addDoc(collection(db, "faqs"), f);
    }
    console.log("Seeded FAQs");
  } else {
    console.log("FAQs already seeded.");
  }
  process.exit(0);
}
seed();
