const fs = require('fs');

let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

const oldSnippet = `function DidYouKnowSnippet({ text, delay = 0.2, dark = false }: { text: string, delay?: number, dark?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay }}
      className={\`mt-12 mx-auto max-w-2xl border rounded-2xl p-4 flex items-start gap-4 relative overflow-hidden group \${
        dark 
          ? 'bg-indigo-900/20 border-indigo-500/30' 
          : 'bg-indigo-50/50 border-indigo-100'
      }\`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      <div className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${
        dark ? 'bg-indigo-900/50' : 'bg-indigo-100'
      }\`}>
        <Sparkles size={16} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
      </div>
      <div className="text-left">
        <span className={\`text-[10px] font-bold uppercase tracking-widest mb-1 block \${
          dark ? 'text-indigo-400' : 'text-indigo-600'
        }\`}>Did you know?</span>
        <p className={\`text-sm leading-relaxed \${
          dark ? 'text-slate-300' : 'text-slate-700'
        }\`}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}`;

const newSnippet = `function DidYouKnowSnippet({ sectionTitle, delay = 0.2, dark = false }: { sectionTitle: string, delay?: number, dark?: boolean }) {
  const [fact, setFact] = useState("Loading AI insights...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFact = async () => {
      try {
        const res = await fetch('/api/ai/did-you-know', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceTitle: sectionTitle })
        });
        const data = await res.json();
        if (isMounted && data.fact) {
          setFact(data.fact);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFact();
    return () => { isMounted = false; };
  }, [sectionTitle]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay }}
      className={\`mt-12 mx-auto max-w-2xl border rounded-2xl p-4 flex items-start gap-4 relative overflow-hidden group \${
        dark 
          ? 'bg-indigo-900/20 border-indigo-500/30' 
          : 'bg-indigo-50/50 border-indigo-100'
      }\`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      <div className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${
        dark ? 'bg-indigo-900/50' : 'bg-indigo-100'
      }\`}>
        {loading ? (
           <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        ) : (
           <Sparkles size={16} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
        )}
      </div>
      <div className="text-left">
        <span className={\`text-[10px] font-bold uppercase tracking-widest mb-1 block \${
          dark ? 'text-indigo-400' : 'text-indigo-600'
        }\`}>Did you know? (AI Generated)</span>
        <p className={\`text-sm leading-relaxed \${
          dark ? 'text-slate-300' : 'text-slate-700'
        }\`}>
          {fact}
        </p>
      </div>
    </motion.div>
  );
}`;

code = code.replace(oldSnippet, newSnippet);

code = code.replace(
  '<DidYouKnowSnippet dark text="75% pengguna menilai kredibilitas sebuah bisnis berdasarkan kualitas arsitektur dan desain antarmuka website mereka." />',
  '<DidYouKnowSnippet dark sectionTitle="Digital Architecture & Premium Web Services" />'
);

code = code.replace(
  '<DidYouKnowSnippet text="Keterlambatan respon server 1 detik saja dapat mengakibatkan penurunan 7% dalam rasio konversi pelanggan secara langsung." />',
  '<DidYouKnowSnippet sectionTitle="High Performance Web Optimization" />'
);

code = code.replace(
  '<DidYouKnowSnippet text="Bisnis yang mengadopsi integrasi AI dan otomatisasi web modern mengalami peningkatan efisiensi operasional hingga 40%." />',
  '<DidYouKnowSnippet sectionTitle="Enterprise Web Catalog & End-to-end Solutions" />'
);

code = code.replace(
  '<DidYouKnowSnippet dark text="Penggunaan AI untuk scoping arsitektur proyek dapat meminimalkan kesalahan estimasi biaya dan waktu hingga 60%." />',
  '<DidYouKnowSnippet dark sectionTitle="AI Driven Project Scoping and Estimation" />'
);

code = code.replace(
  '<DidYouKnowSnippet text="React dan Next.js yang kami gunakan saat ini memberikan tenaga pada lebih dari 40% website dengan trafik tertinggi di dunia." />',
  '<DidYouKnowSnippet sectionTitle="Modern Tech Stack (React, Next.js, Node.js)" />'
);

code = code.replace(
  '<DidYouKnowSnippet text="Metodologi pengembangan agile yang transparan mampu mempercepat waktu peluncuran produk ke pasar (Time-to-Market) sebesar 37%." />',
  '<DidYouKnowSnippet sectionTitle="Agile Execution Process for Web Projects" />'
);

code = code.replace(
  '<DidYouKnowSnippet dark text="Perusahaan berbasis data (Data-driven) memiliki probabilitas 23x lebih tinggi untuk mengakuisisi dan mempertahankan pelanggan." />',
  '<DidYouKnowSnippet dark sectionTitle="Business Metrics and Performance Analytics" />'
);

code = code.replace(
  '<DidYouKnowSnippet text="Dukungan pelanggan yang proaktif dan transparan dapat meningkatkan skor kepuasan klien hingga lebih dari 50%." />',
  '<DidYouKnowSnippet sectionTitle="Customer Support & Project Guarantees" />'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
