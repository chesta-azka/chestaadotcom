import { motion } from 'motion/react';

const technologies = [
  {
    name: 'Next.js',
    logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    description: 'Framework React untuk performa kilat dan SEO optimal.'
  },
  {
    name: 'Firebase',
    logo: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg',
    description: 'Infrastruktur cloud yang skalabel dan aman.'
  },
  {
    name: 'Gemini AI',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png',
    description: 'Integrasi kecerdasan buatan mutakhir dari Google.'
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg',
    description: 'Desain responsif dengan estetika modern.'
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
    description: 'Kode yang kuat dan minim error untuk jangka panjang.'
  },
  {
    name: 'Framer Motion',
    logo: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg',
    description: 'Interaksi halus yang meningkatkan pengalaman pengguna.'
  }
];

export default function TechStackSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-bold text-purple-700 tracking-widest uppercase mb-6"
        >
          Powering Your Future
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight mb-6"
        >
          Teknologi Pilihan <br className="sm:hidden" /> Untuk Performa Maksimal
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-600 font-sans text-lg leading-relaxed"
        >
          Kami hanya menggunakan ekosistem teknologi terbaik yang terbukti mampu menangani skalabilitas tinggi dan keamanan tingkat enterprise.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12 items-center">
        {technologies.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex flex-col items-center"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center">
              <motion.img
                src={tech.logo}
                alt={tech.name}
                className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                whileHover={{ scale: 1.15, rotate: 5 }}
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-900 font-display mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tech.name}
              </h3>
              <p className="text-[10px] text-slate-500 font-sans leading-tight max-w-[120px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {tech.description}
              </p>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-purple-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
