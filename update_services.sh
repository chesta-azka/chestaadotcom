#!/bin/bash
# Remove the ending "];"
sed -i '$d' src/data/ServicesData.ts
cat << 'DATA' >> src/data/ServicesData.ts
  ,
  {
    slug: 'ai-agentic-dan-automation',
    name: 'AI Agentic & Automation',
    title: 'Otomatisasi Bisnis dengan AI (Kecerdasan Buatan)',
    desc: 'Tingkatkan efisiensi bisnis Anda dengan agen AI cerdas yang mampu bekerja 24/7 dan mengotomatiskan tugas-tugas repetitif.',
    buttonText: 'Konsultasi Implementasi AI',
    icon: Database,
    points: [
      { title: 'AI Customer Service', desc: 'Chatbot pintar yang merespon pelanggan 24/7 seperti manusia.' },
      { title: 'Workflow Automation', desc: 'Otomatisasi pekerjaan repetitif antar aplikasi.' },
      { title: 'Data Analysis', desc: 'AI untuk menganalisa data bisnis dan memberikan insight strategis.' },
      { title: 'Agentic AI', desc: 'Sistem cerdas yang bisa mengambil tindakan mandiri sesuai aturan bisnis.' }
    ],
    comparison: {
      title: 'Kerja Manual vs Otomatisasi AI',
      theirs: {
        title: 'Manual',
        items: ['Jam kerja terbatas', 'Biaya operasional tinggi', 'Rentan human error', 'Proses lambat dan repetitif', 'Tergantung pada mood karyawan']
      },
      ours: {
        title: 'Otomatisasi AI',
        items: ['Siap bekerja 24/7 non-stop', 'Menghemat biaya operasional', 'Akurasi tinggi dan konsisten', 'Proses instan dan skalabel', 'Fokus pada pekerjaan strategis']
      }
    },
    benefits: [
      { title: 'Penghematan Waktu', desc: 'Bebaskan tim Anda dari tugas administratif repetitif.' },
      { title: 'Efisiensi Biaya', desc: 'Kurangi biaya operasional secara signifikan dalam jangka panjang.' },
      { title: 'Skalabilitas', desc: 'Siap menangani ratusan interaksi atau tugas secara bersamaan.' }
    ],
    faqs: [
      { q: 'Apakah AI bisa diintegrasikan dengan sistem yang sudah ada?', a: 'Sangat bisa. Kami merancang solusi AI yang terhubung langsung dengan sistem bisnis Anda seperti WhatsApp, CRM, atau ERP.' },
      { q: 'Berapa biaya untuk mengimplementasikan AI?', a: 'Biaya sangat bervariasi bergantung pada kompleksitas solusi. Mulai dari Rp 2.500.000 untuk AI sederhana.' },
      { q: 'Apakah data saya aman?', a: 'Ya, privasi dan keamanan data adalah prioritas kami dalam merancang solusi AI.' },
      { q: 'Apakah butuh keahlian khusus untuk menggunakan AI ini?', a: 'Tidak. Solusi kami didesain agar mudah dioperasikan oleh siapapun.' }
    ]
  }
];
DATA
