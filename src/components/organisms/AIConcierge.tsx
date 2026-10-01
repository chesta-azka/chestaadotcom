'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, X, Bot, User, Sparkles, ArrowRight } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo Eksekutif. Saya adalah AI Enterprise Architect dari Chestaa. Ada tantangan arsitektur, latensi server, atau otomatisasi AI di area Tangerang/BSD yang ingin kita selesaikan hari ini?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Sebagai Chestaa Enterprise Architect, saya sarankan agar perusahaan Anda segera migrasi ke arsitektur Next.js 15 sub-detik dan Karyawan AI 24/7. Sistem lama di BSD atau Jakarta Selatan yang sering down hanya akan membakar ROAS iklan Anda. Mari jadwalkan konsultasi langsung dengan Principal Architect kami untuk bedah sistem.";
      
      const lower = userText.toLowerCase();
      if (lower.includes('harga') || lower.includes('biaya') || lower.includes('cost') || lower.includes('tarif')) {
        reply = "Investasi arsitektur otonom Chestaa dirancang khusus untuk memangkas biaya operasional dan gaji admin hingga 100%. Dibandingkan menyewa software house tradisional yang lambat, solusi kami menghasilkan ROI instan. Mari diskusikan kebutuhan spesifik perusahaan Anda di BSD/Jakarta.";
      } else if (lower.includes('lambat') || lower.includes('down') || lower.includes('error') || lower.includes('502')) {
        reply = "Itu adalah tanda klasik kebocoran konversi. Setiap detik keterlambatan memangkas 20 persen conversion rate Anda. Chestaa menyediakan layanan Tech Rescue dan infrastruktur Edge berkecepatan di bawah 0.8 detik. Segera jadwalkan audit arsitektur!";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-indigo-400/40 backdrop-blur-xl font-mono text-xs font-bold uppercase tracking-wider cursor-pointer group"
        >
          <Terminal size={18} className="animate-pulse text-indigo-200 group-hover:rotate-12 transition-transform" />
          <span>Tanya AI Chestaa</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </motion.button>
      </div>

      {/* Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] rounded-3xl bg-[#0d0d12]/95 border border-indigo-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,0.3)] flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Chestaa Enterprise Architect</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>AI Online • BSD / Tangerang Node</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm font-sans">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 border border-indigo-500/30 text-indigo-400'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                  </div>
                  <div className={`max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none font-sans'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                    <Sparkles size={14} className="animate-spin" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-mono">
                    Chestaa AI sedang menganalisis arsitektur...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* CTA Quick Action & Input */}
            <div className="p-4 border-t border-white/10 bg-black/40 space-y-3">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-950/60 border border-indigo-500/40 hover:border-indigo-500 text-indigo-300 hover:text-white font-mono text-xs flex items-center justify-between transition-all cursor-pointer group"
              >
                <span>Jadwalkan Konsultasi Arsitektur</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tanya tentang latensi, AI, atau biaya..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 font-sans"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer flex items-center justify-center"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
