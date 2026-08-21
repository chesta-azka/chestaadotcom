const fs = require('fs');
let content = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf-8');

const targetStr = `
      {/* Benefits */}
`;

const replaceStr = `
      {/* Mid-Page CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32 relative overflow-hidden rounded-3xl border border-[#4f46e5]/20 bg-gradient-to-r from-slate-900 to-indigo-950 p-8 md:p-12 text-center"
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <h3 className="relative z-10 text-2xl md:text-3xl font-display font-medium text-white tracking-tight mb-4">
          Siap Meningkatkan Kualitas {service.name} Anda?
        </h3>
        <p className="relative z-10 text-indigo-200 font-sans mb-8 max-w-2xl mx-auto">
          Dapatkan blueprint strategi digital eksklusif dan konsultasi gratis langsung dengan tim ahli kami untuk menganalisis kebutuhan bisnis Anda.
        </p>
        <button 
          onClick={handleWhatsAppClick}
          className="relative z-10 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4f46e5] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
        >
          <MessageCircle size={16} />
          <span>Get a Free Consultation</span>
        </button>
      </motion.div>

      {/* Benefits */}
`;

content = content.replace(targetStr.trim(), replaceStr.trim());
fs.writeFileSync('src/pages/ServiceDetailPage.tsx', content);
console.log("Patched CTA in ServiceDetailPage");
