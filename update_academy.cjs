const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

const hubSections = `
        {/* Unified Hub Sections */}
        <div className="mt-20 pt-16 border-t border-slate-100">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 tracking-tight">Eksplorasi Resource Hub</h2>
            <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">Selain course mendalam, akses juga kumpulan catatan teknis, analisis studi kasus nyata, dan uji kemampuan coding Anda melalui technical quiz engine kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Blog & Insights */}
            <Link to="/blog" className="group p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Blog & Insights</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">Artikel teknis, panduan praktis, dan insight seputar tren web architecture terbaru.</p>
              <div className="text-sm font-semibold text-amber-600 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Baca Jurnal <ArrowRight size={16} />
              </div>
            </Link>

            {/* Case Studies */}
            <Link to="/case-studies" className="group p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Case Studies</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">Analisis mendalam bagaimana kami membantu klien mencapai KPI mereka melalui engineering.</p>
              <div className="text-sm font-semibold text-emerald-600 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Pelajari Studi Kasus <ArrowRight size={16} />
              </div>
            </Link>

            {/* Technical Quiz Engine */}
            <Link to="/academy/quiz" className="group p-6 sm:p-8 bg-gradient-to-b from-purple-900 to-indigo-900 text-white border border-purple-800 rounded-2xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all">
              <div className="w-12 h-12 bg-white/10 text-purple-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">Technical Quiz</h3>
              <p className="text-sm text-purple-200 leading-relaxed mb-6">Uji kemampuan teknis Anda dan dapatkan roadmap belajar custom langsung di kotak masuk Anda.</p>
              <div className="text-sm font-semibold text-purple-200 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Mulai Asesmen <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
`;

code = code.replace(/<\/main>/, hubSections + '\n      </main>');

fs.writeFileSync('src/pages/AcademyPage.tsx', code);
