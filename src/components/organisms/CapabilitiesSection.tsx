import { motion } from 'motion/react';
import { Server, PenTool, CloudLightning, Database, Bot, Zap } from 'lucide-react';

const capabilities = [
  {
    title: 'API Integration',
    description: 'Seamlessly connect third-party services, payment gateways, and enterprise systems with robust REST and GraphQL APIs.',
    icon: Server,
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive, highly engaging user experiences with pixel-perfect modern interfaces and responsive layouts.',
    icon: PenTool,
  },
  {
    title: 'Serverless Hosting',
    description: 'Scalable, low-latency deployment on cloud edges like Vercel and Cloud Run for maximum global availability.',
    icon: CloudLightning,
  },
  {
    title: 'Custom Backend Systems',
    description: 'Designing highly resilient data structures and business logic using PostgreSQL, Node.js, and Firebase.',
    icon: Database,
  },
  {
    title: 'AI Automation',
    description: 'Integrating intelligent agentic workflows and LLM-powered generative features into your business applications.',
    icon: Bot,
  },
  {
    title: 'Performance Tuning',
    description: 'Optimizing Core Web Vitals for lightning-fast sub-second load times, improving both conversions and SEO.',
    icon: Zap,
  }
];

export default function CapabilitiesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-100 rounded-full blur-[80px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold text-purple-600 uppercase tracking-widest block mb-3">
            Our Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
            Core Technical Strengths
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-sans text-sm sm:text-base">
            We leverage cutting-edge technologies to build highly scalable, performant, and secure digital architectures that drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-purple-300 group-hover:text-purple-600 transition-transform duration-300 shadow-sm text-slate-700">
                <cap.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-purple-900 transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm font-sans text-slate-600 leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
