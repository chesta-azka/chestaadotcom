const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

if (!code.includes('import QuizEngine')) {
  code = code.replace(
    /(import .*?;)/,
    `$1\nimport QuizEngine, { QuizQuestion } from '../components/organisms/QuizEngine';`
  );
  
  // Define mock questions at the top of the file
  const mockQuestions = `
const courseQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Mengapa arsitektur Server Components (RSC) di Next.js 14+ secara drastis meningkatkan performa aplikasi berskala besar?',
    options: [
      'Karena mengeksekusi semua Javascript di browser klien.',
      'Karena RSC memangkas pengiriman bundle JavaScript ke browser dan memindahkan beban rendering berat ke server.',
      'Karena RSC mengandalkan Redux untuk manajemen state global.',
      'RSC hanya berfungsi untuk merender gambar statis.'
    ],
    correctAnswer: 1,
    explanation: 'RSC memungkinkan komponen dirender sepenuhnya di server, mengirimkan HTML dan payload ringan ke klien tanpa membebani browser dengan JavaScript tambahan.'
  },
  {
    id: 'q2',
    question: 'Dalam pengembangan aplikasi berkinerja tinggi, mengapa kita sebaiknya menghindari Client-Side Rendering (CSR) penuh pada halaman pertama (Initial Load)?',
    options: [
      'CSR terlalu cepat sehingga server tidak sempat merespon.',
      'CSR mengakibatkan blank screen yang lama pada jaringan lambat karena browser harus mengunduh dan mengeksekusi JS sebelum merender UI.',
      'CSR mengharuskan kita membayar biaya server lebih mahal.',
      'Google sangat menyukai CSR untuk indexing SEO.'
    ],
    correctAnswer: 1,
    explanation: 'CSR (terutama di aplikasi besar) memblokir rendering awal sampai seluruh JS selesai di-load (Time to Interactive memburuk), yang merugikan baik user experience maupun SEO.'
  },
  {
    id: 'q3',
    question: 'Manakah pola arsitektur yang paling tepat untuk mengelola data streaming audio (Music App) tanpa mengganggu rendering navigasi utama (Layout)?',
    options: [
      'Menyimpan file mp3 langsung di localStorage.',
      'Menjadikan seluruh aplikasi sebagai Client Component menggunakan "use client" di layout.tsx.',
      'Memanfaatkan Next.js Nested Layouts dengan menempatkan Global Player UI di Layout level terluar dan membiarkan konten navigasi berubah di dalam page.',
      'Me-reload window.location setiap berpindah lagu.'
    ],
    correctAnswer: 2,
    explanation: 'Nested Layouts di Next.js memungkinkan Player Audio berjalan secara persisten di root/parent layout tanpa mengalami re-render saat user bernavigasi melintasi halaman lain.'
  }
];
`;

  code = code.replace(
    /(const PremiumCodeBlock =)/,
    mockQuestions + '\n$1'
  );
  
  // Replace the end message
  const quizInjection = `
            <div className="py-20 flex flex-col items-center">
              <QuizEngine 
                title="Asesmen Teknis: Arsitektur Modern"
                description="Uji pemahaman Anda terhadap arsitektur web mutakhir dari studi kasus ini. Dapatkan roadmap belajar gratis di akhir sesi!"
                questions={courseQuizQuestions}
                onComplete={(score) => console.log('Quiz completed with score:', score)}
              />
            </div>`;
            
  code = code.replace(
    /<div className="py-20 text-center flex flex-col items-center">[\s\S]*?Kembali ke Dashboard Academy[\s\S]*?<\/Link>\s*<\/div>/,
    quizInjection
  );
  
  fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
}
