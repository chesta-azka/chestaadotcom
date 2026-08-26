const fs = require('fs');

const code = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import SEOProvider from '../components/atoms/SEOProvider';
import { ArrowUpRight, CheckCircle2, ArrowRight, Code2, Rocket, Cpu, Layers, ChevronDown } from 'lucide-react';
import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';
import Breadcrumbs from '../components/atoms/Breadcrumbs';

const PROCESS_STEPS = [
  {
    title: '01. Discovery & Strategy',
    desc: 'We analyze your business objectives, target audience in BSD/Cisauk, and technical requirements to formulate a bulletproof digital strategy.',
    icon: SearchIcon
  },
  {
    title: '02. Architecture & Design',
    desc: 'Creating scalable system architectures and high-conversion UI/UX designs that align perfectly with enterprise standards.',
    icon: Layers
  },
  {
    title: '03. Agile Engineering',
    desc: 'Iterative, sprint-based development using cutting-edge stacks (React, Node, Cloud Native) ensuring robust and secure deliverables.',
    icon: Code2
  },
  {
    title: '04. Deployment & Scale',
    desc: 'Seamless launch protocols with zero-downtime deployment, followed by continuous monitoring and performance scaling.',
    icon: Rocket
  }
];

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

const FAQS = [
  {
    question: "Do you only serve clients in BSD City and Cisauk?",
    answer: "While we have a strong local focus and physical presence in the BSD/Cisauk area allowing for intensive offline collaborations, we also serve enterprise clients globally with the same standard of excellence."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary based on complexity. A standard corporate landing page might take 2-3 weeks, while a full-scale web application or ERP system can take 3-6 months of iterative engineering."
  },
  {
    question: "Do you provide post-launch maintenance?",
    answer: "Absolutely. We offer strict SLA-backed maintenance contracts, ensuring your digital assets remain secure, up-to-date, and performant 24/7."
  },
  {
    question: "What technology stack do you use?",
    answer: "We are framework-agnostic but heavily favor modern JavaScript ecosystems (React, Next.js, Node.js) and robust cloud infrastructures (AWS, GCP, Firebase) for maximum scalability."
  }
];

function FAQItem({ faq, index }: { faq: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <h4 className="text-lg md:text-xl font-medium text-slate-900 pr-8">{faq.question}</h4>
        <ChevronDown 
          size={24} 
          className={\`text-indigo-600 transition-transform duration-300 shrink-0 \${isOpen ? 'rotate-180' : ''}\`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-500 font-light leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-32 pb-24 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      <SEOProvider 
        title="Premium Services | CHESTADOTCOM"
        description="Explore our 10 distinct high-performance digital services targeting BSD City and Cisauk."
      />
      
      {/* 1. Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
        <Breadcrumbs items={[{ label: 'Layanan' }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-display font-medium tracking-tighter leading-[0.9] mb-8">
            Digital <br /> Excellence.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light tracking-wide leading-relaxed">
            Ten strictly engineered capabilities designed for profound impact in BSD City and Cisauk. Built with uncompromising standards.
          </p>
        </motion.div>
      </section>

      {/* 2. Services Grid Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
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
                to={\`/layanan/\${service.slug}\`}
                className="group block h-full p-8 md:p-12 rounded-[40px] bg-slate-50/50 border border-slate-200 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden relative"
              >
                <div className="flex justify-between items-start mb-24">
                  <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
                    <service.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 text-slate-400 transition-colors duration-500">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 group-hover:tracking-normal transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Methodology / Process Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
        <div className="mb-16">
          <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase mb-4 block">Our Methodology</span>
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight">How We Engineer Success.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 text-indigo-600">
                <step.icon size={24} />
              </div>
              <h4 className="text-xl font-medium mb-4">{step.title}</h4>
              <p className="text-slate-500 font-light leading-relaxed">{step.desc}</p>
              
              {/* Connector line for desktop */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[70px] right-[-30px] h-[1px] bg-slate-200"></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Tech Stack Section */}
      <section className="bg-slate-900 text-white py-32 mb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Cpu size={40} className="mx-auto text-indigo-400 mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">Enterprise-Grade Stack.</h2>
            <p className="text-slate-400 text-lg md:text-xl font-light">We leverage industry-leading technologies to build scalable, secure, and lightning-fast digital solutions.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Google Cloud', 'Firebase', 'PostgreSQL', 'Figma', 'Vite'].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-sm md:text-base font-mono tracking-wide">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Metrics / Why Choose Us Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase mb-4 block">By The Numbers</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-6">Built on Trust <br/>& Performance.</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light mb-8">
              We don't just write code; we engineer business value. Our rigorous standards ensure every project delivers measurable ROI and flawless performance from day one.
            </p>
            <ul className="space-y-4">
              {[
                'Strict SLA-backed guarantees',
                'Zero-downtime deployment architectures',
                'Dedicated local support in BSD City',
                'Comprehensive security auditing'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-indigo-600" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { label: 'Uptime SLA', value: '99.9%' },
              { label: 'Client Retention', value: '98%' },
              { label: 'Projects Delivered', value: '150+' },
              { label: 'Code Quality Score', value: 'A+' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-200 p-8 rounded-[32px] text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-medium text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-sm font-mono text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="max-w-[800px] mx-auto px-6 md:px-12 mb-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4">Frequently Asked.</h2>
          <p className="text-slate-500 font-light">Clear answers to common questions about working with us.</p>
        </div>
        
        <div className="border-t border-slate-200">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="bg-indigo-600 rounded-[40px] md:rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-black/10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 tracking-tight">Ready to Engineer Your Future?</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-light leading-relaxed">
              Let's discuss how our elite engineering team can transform your business operations and accelerate your digital growth.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-indigo-900 px-10 py-5 rounded-full font-sans font-medium text-[13px] uppercase tracking-widest hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Consult With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <FloatingQuoteTrigger />
    </div>
  );
}
`;
fs.writeFileSync('src/pages/ServicesPage.tsx', code);
