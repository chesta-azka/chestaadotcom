import { motion } from 'motion/react';
import { Compass, ArrowDownRight, Sparkles } from 'lucide-react';

// Real-world high-fidelity copy of the navbar logo double-diamond emblem
const NavbarLogoIcon = () => (
  <span className="inline-flex items-center justify-center mx-6 sm:mx-10 md:mx-12 shrink-0 select-none">
    <span className="relative flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-white border border-purple-200 shadow-md group-hover:scale-105 transition-transform duration-500">
      <img 
        src="/chesta.png" 
        alt="Chestaa Logo" 
        className="w-full h-full object-cover object-top" 
        onError={(e) => {
          const target = e.currentTarget;
          target.src = '/favicon.svg';
        }}
      />
    </span>
  </span>
);

const DecorativeDivider = () => (
  <span className="inline-flex items-center gap-3 px-8 md:px-14 shrink-0 text-[#6b21a8]/20 select-none font-mono text-sm">
    <span>/</span>
    <span>/</span>
  </span>
);

const MarqueeTrack = () => (
  <div className="flex items-center shrink-0">
    <div className="flex items-center font-display font-semibold uppercase text-5xl sm:text-7xl md:text-[7rem] tracking-tighter text-slate-900 shrink-0 leading-none">
      <span>BRING</span>
      <span className="font-serif italic font-normal text-purple-700 ml-4 lowercase tracking-normal">creatifity</span>
    </div>

    <NavbarLogoIcon />

    <div className="flex items-center font-display font-semibold uppercase text-5xl sm:text-7xl md:text-[7rem] tracking-tighter text-slate-900 shrink-0 leading-none">
      <span>TO YOUR</span>
      <span className="font-serif italic font-normal text-slate-900 underline decoration-[#6b21a8] decoration-[4px] underline-offset-8 ml-4 lowercase tracking-normal">business</span>
    </div>

    <NavbarLogoIcon />

    <DecorativeDivider />
  </div>
);

export default function CreativityMarquee() {
  return (
    <section className="py-24 md:py-32 w-full overflow-hidden bg-transparent border-y border-slate-100 relative z-10 select-none">
      {/* Absolute clean backdrop grid lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />

      {/* Cinematic Left & Right "Cutout" opening visual overlay gradients (the "ktkout and ipening" effect) */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 md:w-64 bg-gradient-to-r from-[#05060E] via-[#05060E]/90 to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 md:w-64 bg-gradient-to-l from-[#05060E] via-[#05060E]/90 to-transparent pointer-events-none z-20" />

      {/* Main Track container with progressive CSS Masking as hardware accelerator helper */}
      <div className="w-full max-w-[100vw] overflow-hidden">
        <motion.div
          className="flex w-max shrink-0 whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          whileHover={{ transition: { ease: "linear", duration: 50, repeat: Infinity } }} // Smoothens speed dynamically on hover
        >
          {/* Half Part 1 */}
          <div className="flex items-center shrink-0 w-max group">
            <MarqueeTrack />
            <MarqueeTrack />
          </div>
          {/* Half Part 2 with perfectly synced continuous content */}
          <div className="flex items-center shrink-0 w-max group">
            <MarqueeTrack />
            <MarqueeTrack />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
