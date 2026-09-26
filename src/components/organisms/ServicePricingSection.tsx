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

const COMPARISON_FEATURES = [
  { name: 'Landing Page / Halaman Web', starter: '1 Halaman', essential: '3 Halaman', growth: 'Hingga 7 Halaman', enterprise: 'Tanpa Batas (Custom)' },
  { name: 'Desain Psikologi Marketing', starter: true, essential: true, growth: true, enterprise: true },
  { name: 'Domain Resmi (.com / .id)', starter: false, essential: true, growth: true, enterprise: true },
  { name: 'Formulir Order Cerdas (API)', starter: false, essential: false, growth: true, enterprise: true },
  { name: 'Dashboard Admin Mandiri', starter: false, essential: false, growth: true, enterprise: true },
  { name: 'Sistem Pembayaran Otomatis (PG)', starter: false, essential: false, growth: false, enterprise: true },
  { name: 'Rekayasa Database & Workflow Custom', starter: false, essential: false, growth: false, enterprise: true },
  { name: 'Dukungan Prioritas VIP 24/7', starter: false, essential: false, growth: false, enterprise: true },
];

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
              className={`relative flex flex-col justify-between p-8 rounded-xl transition-all ${
                isHighlighted
                  ? 'bg-gray-950 text-white shadow-2xl border-2 border-purple-500 ring-4 ring-purple-500/20'
                  : 'bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200/90 shadow-sm'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-[11px] font-mono font-medium uppercase tracking-wider shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-display font-semibold tracking-tight ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                    {tier.name}
                  </h3>
                </div>

                <p className={`text-xs font-sans mb-6 ${isHighlighted ? 'text-purple-200' : 'text-slate-500'}`}>
                  {tier.subtitle}
                </p>

                <div className="mb-8 pb-6 border-b border-slate-200/20">
                  <span className={`text-3xl sm:text-4xl font-display font-semibold tracking-tight ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                    {tier.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check 
                        size={18} 
                        className={`mt-1 shrink-0 ${isHighlighted ? 'text-purple-400' : 'text-purple-600'}`} 
                        strokeWidth={2.5}
                      />
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold font-sans tracking-tight ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                          {feat.title}
                        </span>
                        <span className={`block text-xs mt-0.5 font-sans leading-relaxed ${isHighlighted ? 'text-purple-200' : 'text-slate-500'}`}>
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
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/30'
                    : 'bg-slate-900 hover:bg-purple-900 text-white'
                }`}
              >
                <span>Amankan Slot Ini</span>
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          );
        })}
      </div>

      {/* FEATURE COMPARISON TABLE FOR HIGH-INTENT B2B VISITORS */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-medium uppercase tracking-wider mb-3">
            <Sparkles size={13} /> Matriks Perbandingan Detail
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-slate-900">
            Komparasi Spesifikasi Teknis &amp; Fitur
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
            Bandingkan keunggulan infrastruktur Growth dan Enterprise untuk kebutuhan ekspansi bisnis jangka panjang Anda.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-4">Fitur &amp; Spesifikasi</th>
                <th className="py-4 px-4 text-center">Starter</th>
                <th className="py-4 px-4 text-center">Essential</th>
                <th className="py-4 px-4 text-center bg-purple-50/60 text-purple-900">Growth (Rekomendasi)</th>
                <th className="py-4 px-4 text-center bg-slate-900 text-white">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-sans">
              {COMPARISON_FEATURES.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{row.name}</td>
                  <td className="py-4 px-4 text-center text-slate-600 font-medium">
                    {typeof row.starter === 'boolean' ? (
                      row.starter ? <Check size={16} className="mx-auto text-emerald-600" /> : <X size={16} className="mx-auto text-slate-300" />
                    ) : (
                      row.starter
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600 font-medium">
                    {typeof row.essential === 'boolean' ? (
                      row.essential ? <Check size={16} className="mx-auto text-emerald-600" /> : <X size={16} className="mx-auto text-slate-300" />
                    ) : (
                      row.essential
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-purple-900 font-bold bg-purple-50/30">
                    {typeof row.growth === 'boolean' ? (
                      row.growth ? <Check size={18} className="mx-auto text-purple-700" strokeWidth={2.5} /> : <X size={16} className="mx-auto text-slate-300" />
                    ) : (
                      row.growth
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-900 font-bold bg-slate-900/5">
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? <Check size={18} className="mx-auto text-slate-900" strokeWidth={2.5} /> : <X size={16} className="mx-auto text-slate-300" />
                    ) : (
                      row.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-500 font-sans">
          Butuh penyesuaian fitur khusus atau integrasi enterprise bersekala masif? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-purple-700 font-bold hover:underline">Diskusikan langsung dengan Principal Engineer kami &rarr;</a>
        </p>
      </div>
    </div>
  );
}
