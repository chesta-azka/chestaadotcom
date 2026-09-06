const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

const resourceSection = `
        {/* Academy Resource Section */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Development Lifecycle</h2>
            <p className="text-slate-500 max-w-2xl">Panduan langkah demi langkah dari persiapan awal instalasi hingga aplikasi berhasil di-deploy ke produksi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <Terminal size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">1. Setup VS Code & Git</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Persiapkan ruang kerja dengan instalasi Visual Studio Code, Git, dan ekstensi penting seperti ESLint, Prettier, serta Tailwind IntelliSense untuk produktivitas maksimal.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">2. Pengembangan Next.js</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bangun arsitektur modern menggunakan Next.js App Router, integrasikan UI dengan Tailwind CSS, dan kelola state secara efisien menggunakan library seperti Zustand.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">3. Deploy ke Vercel/GitHub</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Simpan kode sumber di repository GitHub sebagai portofolio, dan sambungkan langsung ke platform serverless Vercel untuk deployment otomatis ke publik.
              </p>
            </div>
          </div>
        </div>
`;

code = code.replace(/      <\/main>/, `${resourceSection}      </main>`);
fs.writeFileSync('src/pages/AcademyPage.tsx', code);
console.log('Added Resource Section to AcademyPage');
