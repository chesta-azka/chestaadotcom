import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 'project-timeline',
    question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan satu proyek IT atau pembuatan website?',
    answer: 'Timeline proyek sangat bergantung pada kompleksitas dan skala sistem yang dibangun. Untuk company profile atau landing page premium, biasanya memakan waktu 1-2 minggu. Sementara untuk aplikasi web kustom (seperti dashboard admin, integrasi AI, atau e-commerce) dapat memakan waktu 4-8 minggu. Kami selalu memberikan timeline yang transparan dan terukur sejak fase konsultasi awal.'
  },
  {
    id: 'pricing-structure',
    question: 'Bagaimana struktur harga dan biaya untuk layanan pembuatan website premium?',
    answer: 'Kami mengadopsi model penetapan harga berbasis nilai (value-based pricing) yang transparan. Harga awal untuk proyek landing page premium dimulai dari paket dasar, sementara sistem enterprise dengan integrasi AI dan backend kustom disesuaikan dengan ruang lingkup. Anda akan menerima proposal terperinci yang memecah investasi berdasarkan fitur, jam pengembangan, dan lisensi infrastruktur tanpa biaya tersembunyi.'
  },
  {
    id: 'maintenance-fees',
    question: 'Apakah ada biaya bulanan atau pemeliharaan (maintenance) tersembunyi?',
    answer: 'Tidak ada biaya tersembunyi. Setelah proyek selesai dan diserahterimakan, source code sepenuhnya menjadi milik Anda. Kami menyediakan opsi paket maintenance bulanan (opsional) untuk pembaruan keamanan, optimasi server, dan dukungan teknis berkelanjutan. Anda bebas memilih untuk mengelolanya sendiri atau mempercayakannya kepada tim kami.'
  },
  {
    id: 'api-integration-process',
    question: 'Apakah Anda dapat mengintegrasikan website dengan sistem atau endpoint yang sudah kami miliki?',
    answer: 'Tentu. Keahlian inti kami mencakup integrasi sistem yang kompleks. Kami dapat menghubungkan website atau aplikasi web baru Anda dengan ERP, CRM, payment gateway, atau endpoint pihak ketiga lainnya untuk memastikan sinkronisasi data real-time dan alur kerja yang mulus.'
  }
];

export default function ProjectFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200" id="project-faq">
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Pertanyaan umum seputar timeline pengerjaan, struktur harga, dan proses pengembangan proyek IT bersama CHESTAADOTCOM.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.id}
                initial={false}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-purple-200 bg-white shadow-md' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className={`text-base sm:text-lg font-display font-bold pr-4 transition-colors ${
                    isOpen ? 'text-purple-700' : 'text-slate-900'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-slate-600 font-sans text-sm sm:text-base leading-relaxed border-t border-slate-50 mx-5 sm:mx-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
