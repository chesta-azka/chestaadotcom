import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import SEOProvider from '../components/atoms/SEOProvider';
import { ArrowUpRight } from 'lucide-react';
import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';
import Breadcrumbs from '../components/atoms/Breadcrumbs';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 font-sans selection:bg-white selection:text-black">
      <SEOProvider 
        title="Premium Services | CHESTADOTCOM"
        description="Explore our 10 distinct high-performance digital services targeting BSD City and Cisauk."
      />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Breadcrumbs items={[{ label: 'Layanan' }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-display font-medium tracking-tighter leading-[0.9] mb-8">
            Digital <br /> Excellence.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light tracking-wide leading-relaxed">
            Ten strictly engineered capabilities designed for profound impact in BSD City and Cisauk. Built with uncompromising standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SERVICE_DEFINITIONS.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                to={`/layanan/${service.slug}`}
                className="group block h-full p-8 md:p-12 rounded-[40px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 overflow-hidden relative"
              >
                <div className="flex justify-between items-start mb-24">
                  <div className="p-4 rounded-2xl bg-white/10 text-white backdrop-blur-md">
                    <service.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 group-hover:tracking-normal transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <FloatingQuoteTrigger />
    </div>
  );
}
