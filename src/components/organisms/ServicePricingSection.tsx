import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, X } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  badge?: string;
  highlighted?: boolean;
  features: { title: string; impact: string }[];
}

interface ServicePricingSectionProps {
  pricingTiers: PricingTier[];
  whatsappUrl: string;
  onWhatsAppClick: () => void;
}

export default function ServicePricingSection({ pricingTiers, whatsappUrl, onWhatsAppClick }: ServicePricingSectionProps) {
  return (
    <div id="pricing" className="mb-28">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono font-medium text-purple-700 uppercase tracking-widest block mb-2">Transparansi Investasi Bisnis</span>
        <h2 className="text-3xl sm:text-5xl font-display font-semibold text-slate-900 tracking-tight mb-4">
          Pilih Paket Sesuai Skala Ambisi Anda
        </h2>
        <p className="text-slate-600 font-sans text-base leading-relaxed">
          Setiap tingkat dirancang khusus untuk memberikan lompatan ROI nyata, mulai dari uji coba kilat UMKM hingga infrastruktur enterprise tanpa batas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
        {pricingTiers.map((tier, idx) => {
          const isHighlighted = tier.highlighted;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all ${
                isHighlighted
                  ? 'bg-purple-50/80 text-slate-950 shadow-xl border-2 border-purple-400 ring-4 ring-purple-500/10'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-[11px] font-mono font-medium uppercase tracking-wider shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-semibold tracking-tight text-slate-900">
                    {tier.name}
                  </h3>
                </div>

                <p className="text-xs font-sans mb-6 text-slate-600">
                  {tier.subtitle}
                </p>

                <div className="mb-8 pb-6 border-b border-slate-200">
                  <span className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-slate-900">
                    {tier.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check 
                        size={18} 
                        className="mt-1 shrink-0 text-purple-600" 
                        strokeWidth={2.5}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold font-sans tracking-tight text-slate-900">
                          {feat.title}
                        </span>
                        <span className="block text-xs mt-0.5 font-sans leading-relaxed text-slate-600">
                          {feat.impact}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 px-4 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isHighlighted
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                }`}
              >
                <span><b>Pilih Paket Ini</b></span>
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
