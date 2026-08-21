const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/ServicesSection.tsx', 'utf-8');

const targetStr = `
        {/* High Fidelity Minimalist List (exactly matching the user mockup) */}
        <div className="border border-slate-200/60 mb-20 bg-white/50 rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] backdrop-blur-xl">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <Link
                to={\`/layanan/\${service.slug}\`}
                onClick={() => window.scrollTo(0, 0)}
                className="relative flex flex-col md:flex-row md:items-center justify-between py-10 px-8 sm:px-12 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-all duration-500 overflow-hidden"
              >
`;

const replaceStr = `
        {/* High Fidelity Minimalist List (Cards) */}
        <div className="mb-20 space-y-4">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group block"
            >
              <Link
                to={\`/layanan/\${service.slug}\`}
                onClick={() => window.scrollTo(0, 0)}
                className="relative flex flex-col md:flex-row md:items-center justify-between py-8 px-8 sm:px-12 bg-white/60 border border-slate-200/80 rounded-[2.5rem] hover:bg-white hover:border-[#4f46e5]/30 transition-all duration-500 overflow-hidden transform hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:z-20"
              >
`;

content = content.replace(targetStr.trim(), replaceStr.trim());
fs.writeFileSync('src/components/organisms/ServicesSection.tsx', content);
console.log("Patched ServicesSection");
