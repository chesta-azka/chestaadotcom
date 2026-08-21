const fs = require('fs');
let content = fs.readFileSync('src/pages/AreaDetailPage.tsx', 'utf-8');

const targetMeta = `<MetaTags 
        title={\`Jasa Pembuatan Website \${formattedCityName} - Web Developer Profesional\`}
        description={\`Tingkatkan penjualan bisnis Anda di \${formattedCityName} dengan website profesional & SEO. Kemitraan pembuatan aplikasi web dan solusi AI untuk korporasi.\`}
      />`;
      
const replaceMeta = `<MetaTags 
        title={\`Jasa Pembuatan Website \${formattedCityName} - Web Developer Profesional\`}
        description={\`Tingkatkan penjualan bisnis Anda di \${formattedCityName} dengan website profesional & SEO. Kemitraan pembuatan aplikasi web dan solusi AI untuk korporasi.\`}
        cityName={formattedCityName}
        path={\`/area/\${cityName.toLowerCase()}\`}
      />`;

content = content.replace(targetMeta, replaceMeta);

const targetInsights = `{/* Map & Services Section */}`;

const replaceInsights = `
      {/* Local Insights & SEO Metrics Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 mt-16 border border-slate-100 rounded-3xl p-8 md:p-12 bg-white/[0.01] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
            Area Insights
          </span>
          <h2 className="text-3xl font-display font-medium tracking-tight text-slate-900 mb-4">
            Potensi Bisnis Digital di {formattedCityName}
          </h2>
          <p className="text-slate-600 font-sans max-w-2xl mx-auto">
            Berdasarkan analisis data search intent lokal, memiliki arsitektur website yang SEO-optimized sangat krusial untuk mendominasi pasar lokal di {formattedCityName}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <Search className="w-8 h-8 text-indigo-500 mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-medium text-xl mb-2 text-slate-900">{stats.searchVolume}</h3>
            <p className="text-sm font-sans text-slate-500">Pencarian lokal bulanan terkait jasa/produk di area {formattedCityName}.</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <ArrowUpRight className="w-8 h-8 text-emerald-500 mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-medium text-xl mb-2 text-slate-900">{stats.businessGrowth}</h3>
            <p className="text-sm font-sans text-slate-500">Pertumbuhan adopsi digital bisnis lokal dalam 1 tahun terakhir.</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <Target className="w-8 h-8 text-rose-500 mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-medium text-xl mb-2 text-slate-900">Industri Kunci</h3>
            <p className="text-sm font-sans text-slate-500">{stats.localNiche}</p>
          </div>
        </div>
      </motion.div>

      {/* Map & Services Section */}`;

content = content.replace(targetInsights, replaceInsights);

// Need to import Target if not imported
if (!content.includes('Target')) {
  content = content.replace('ArrowRight,', 'ArrowRight, Target,');
}

fs.writeFileSync('src/pages/AreaDetailPage.tsx', content);
console.log('Patched AreaDetailPage.tsx');
