import { motion } from 'motion/react';

const clients = [
  { name: "RetailFashion ID", type: "text" },
  { name: "GudangLokal", type: "text" },
  { name: "Seino Indomobil", type: "text" },
  { name: "Delta Legal", type: "text" },
  { name: "Griya Cisauk", type: "text" },
  { name: "PT Prime Well Wireline", type: "text" },
  { name: "Fortanara Cybersecurity", type: "text" },
  { name: "Y-Not Tech", type: "text" },
];

const ClientTrack = () => (
  <div className="flex items-center gap-16 md:gap-24 shrink-0 px-8 md:px-12">
    {clients.map((client, i) => (
      <span key={`${client.name}-${i}`} className="text-xl md:text-2xl font-display font-bold text-slate-400 whitespace-nowrap">
        {client.name}
      </span>
    ))}
  </div>
);

export default function CompaniesSection() {
  return (
    <section className="py-12 bg-transparent overflow-hidden relative">
      <div className="text-center mb-8">
        <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Trusted By Industry Leaders</p>
      </div>
      
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradients for smooth fading at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex w-max shrink-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          <ClientTrack />
          <ClientTrack />
        </motion.div>
      </div>
    </section>
  );
}
