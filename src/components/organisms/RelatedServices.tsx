import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICE_DEFINITIONS } from '../../data/ServiceDefinition';
import { ArrowRight } from 'lucide-react';

interface Props {
  currentSlug: string;
}

export default function RelatedServices({ currentSlug }: Props) {
  // Leverage existing SEO meta tag logic implicitly by offering relevant internal links
  // Filter out the current service and randomly pick or sequentially pick 3 related ones
  const related = SERVICE_DEFINITIONS.filter(s => s.slug !== currentSlug).slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400 mb-2">Related Services</h3>
      <div className="flex flex-col gap-4">
        {related.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/layanan/${service.slug}`}
              className="group block p-6 rounded-3xl bg-white/70 backdrop-blur-[16px] backdrop-saturate-[180%] border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <service.icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className="font-display font-medium text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h4>
              </div>
              <p className="text-sm text-slate-500 font-light line-clamp-2 mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-purple-600 group-hover:gap-3 transition-all">
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
