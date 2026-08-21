import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, Clock, Code2, TrendingUp, ClipboardList, MessageCircle } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const QUIZ_STEPS = [
  {
    question: "Mari kita mulai Assessment Proyek Anda. Apa objektif utama dari inisiatif digital ini?",
    options: ["Peningkatan Skala Konversi", "Automasi Proses Bisnis", "Transformasi Digital Enterprise"]
  },
  {
    question: "Dipahami. Bagaimana dengan proyeksi timeline go-live untuk arsitektur ini?",
    options: ["Agresif (1-2 Bulan)", "Terencana (3-6 Bulan)", "Eksplorasi Skalabilitas"]
  },
  {
    question: "Terakhir, untuk menentukan topologi cloud dan tingkat redundansi, di rentang manakah alokasi investasi Anda?",
    options: ["Standard Scale (< 50 Juta)", "Enterprise Grade (50 - 150 Juta)", "Custom / High-Availability (> 150 Juta)"]
  }
];

type ChatMessage = {
  role: 'ai' | 'user';
  content: string;
  isEndConsultation?: boolean;
};

export default function FloatingAIAssistant() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'ai', content: 'Halo! Saya AI Assistant chestaadotcom. Ada yang bisa saya bantu terkait layanan website premium atau solusi automasi kami?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [consultationStep, setConsultationStep] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  // Interest Tracking via LocalStorage
  useEffect(() => {
    const currentPath = location.pathname;
    let interest = localStorage.getItem('user_interest') || 'general';
    let newInterest = interest;

    if (currentPath.includes('/services') || currentPath.includes('/layanan')) {
      newInterest = 'services';
    } else if (currentPath.includes('/portfolio')) {
      newInterest = 'portfolio';
    } else if (currentPath.includes('/blog')) {
      newInterest = 'blog';
    }

    if (newInterest !== interest) {
      localStorage.setItem('user_interest', newInterest);
    }
    
    // Dynamic greeting based on persisted interest
    let greeting = 'Halo! Saya AI Assistant chestaadotcom. Ada yang bisa saya bantu terkait layanan website premium atau solusi automasi kami?';
    
    if (newInterest === 'services') {
      greeting = 'Halo! Sepertinya Anda tertarik dengan layanan kami. Ingin berdiskusi tentang integrasi Agentic AI atau arsitektur cloud untuk bisnis Anda?';
    } else if (newInterest === 'portfolio') {
      greeting = 'Halo! Saya melihat Anda tertarik dengan hasil kerja (portofolio) kami. Ingin kami merancang solusi premium serupa untuk enterprise Anda?';
    } else if (newInterest === 'blog') {
      greeting = 'Halo! Semoga Anda menemukan insight menarik di blog kami. Ingin konsultasi lebih dalam tentang strategi transformasi digital terbaru?';
    }
    
    // Only update initial greeting if no active conversation exists
    setChatHistory(prev => {
      if (prev.length <= 1) {
        return [{ role: 'ai', content: greeting }];
      }
      return prev;
    });

  }, [location.pathname]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsExpanded(false); // Collapse when scrolling
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsExpanded(true); // Expand when pause
      }, 1500); // 1.5s pause
    };

    const handleOpenChat = (e: Event) => {
      setIsOpen(true);
      if (e instanceof CustomEvent) {
        if (e.detail?.message) {
          // Option to prefill message
          setMessage(e.detail.message);
        }
        if (e.detail?.consultation) {
          setConsultationStep(0);
          setQuizAnswers([]);
          setChatHistory([{ role: 'ai', content: QUIZ_STEPS[0].question }]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('open-ai-chat', handleOpenChat);
    
    // Initial expansion
    scrollTimeout = setTimeout(() => setIsExpanded(true), 1500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-ai-chat', handleOpenChat);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSendMessage = (e?: React.FormEvent, customMessage?: string) => {
    if (e) e.preventDefault();
    const msgToSend = customMessage || message;
    if (!msgToSend.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', content: msgToSend }]);
    const currentMessage = msgToSend;
    if (!customMessage || message === customMessage) setMessage('');

    // If currently in consultation mode and user types something manually, we could cancel or just ignore.
    // For simplicity, let's just let it act as a normal message and not advance the quiz.
    
    // Simulate AI response
    setTimeout(() => {
      let reply = "Terima kasih! Tim kami akan segera menindaklanjuti pesan Anda. Untuk respon instan, silakan hubungi WhatsApp kami.";
      const lowerMsg = currentMessage.toLowerCase();
      if (lowerMsg.includes('harga') || lowerMsg.includes('biaya')) {
        reply = "Untuk informasi harga, Anda dapat melihat paket standar kami di bagian Pricing, atau hubungi kami langsung untuk custom quote enterprise.";
      } else if (lowerMsg.includes('ai') || lowerMsg.includes('automasi')) {
        reply = "Kami menyediakan solusi Agentic AI dan Automasi Bisnis yang dirancang khusus untuk meningkatkan efisiensi operasional Anda.";
      } else if (lowerMsg.includes('web') || lowerMsg.includes('website')) {
        reply = "Kami spesialis dalam membangun website premium dengan arsitektur modern (React, Tailwind) untuk performa dan desain kelas dunia.";
      } else if (lowerMsg.includes('estimate') || lowerMsg.includes('timeline')) {
        reply = "Estimasi waktu pengembangan untuk sebuah arsitektur enterprise biasanya berkisar antara 4-8 minggu, mencakup fase Discovery hingga final Deployment.";
      } else if (lowerMsg.includes('tech stack')) {
        reply = "Tech stack standar kami melibatkan React/Next.js di frontend, Tailwind CSS untuk visual presisi, serta infrastruktur cloud terskalakan yang diperkuat integrasi Agentic AI.";
      } else if (lowerMsg.includes('scalability')) {
        reply = "Kami merancang arsitektur cloud tanpa server (serverless) yang dapat terskala secara eksponensial. Sistem ini memastikan latensi <0.8 detik tanpa down-time bahkan pada lonjakan trafik tinggi.";
      }
      setChatHistory(prev => [...prev, { role: 'ai', content: reply }]);
    }, 1000);
  };

  const handleStartConsultation = () => {
    setConsultationStep(0);
    setQuizAnswers([]);
    setChatHistory(prev => [...prev, { role: 'ai', content: QUIZ_STEPS[0].question }]);
  };

  const handleQuizAnswer = (answer: string) => {
    setChatHistory(prev => [...prev, { role: 'user', content: answer }]);
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    
    setTimeout(() => {
      if (consultationStep !== null && consultationStep < QUIZ_STEPS.length - 1) {
        setConsultationStep(consultationStep + 1);
        setChatHistory(prev => [...prev, { role: 'ai', content: QUIZ_STEPS[consultationStep + 1].question }]);
      } else {
        // Quiz finished
        setConsultationStep(null);
        const summary = `Terima kasih atas informasinya. Berdasarkan kebutuhan "${newAnswers[0]}", timeline "${newAnswers[1]}", dan skala "${newAnswers[2]}", kami merekomendasikan Topologi Cloud Serverless & Edge-Network untuk menjamin latensi <0.8s dan uptime 99.99%.\n\nBlueprint proyek Anda telah siap. Klik tombol di bawah untuk mendiskusikan implementasi teknis ini langsung dengan Principal Architect kami via WhatsApp.`;
        setChatHistory(prev => [...prev, { role: 'ai', content: summary, isEndConsultation: true }]);
      }
    }, 600);
  };

  const handleDirectToWhatsApp = () => {
    let text = 'Halo chestaadotcom, saya ingin konsultasi lebih lanjut.\n';
    
    if (quizAnswers.length === 3) {
      text += `\n*=== PROJECT BLUEPRINT ===*\n`;
      text += `🎯 *Objektif:* ${quizAnswers[0]}\n`;
      text += `⏱️ *Timeline:* ${quizAnswers[1]}\n`;
      text += `💰 *Skala:* ${quizAnswers[2]}\n`;
      text += `\nMohon informasi ketersediaan waktu untuk meeting awal.`;
    } else {
      const chatContext = chatHistory.filter(c => c.role === 'user').map(c => c.content).join('\n- ');
      if (chatContext.length > 0) {
        text += `\n*Topik Minat:*\n- ${chatContext}\n\nMohon panduannya.`;
      }
    }
    
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 sm:right-8 w-[calc(100vw-3rem)] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200/60 z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 8rem)', height: '500px' }}
          >
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-white font-sans font-medium text-sm">chestaadotcom AI</h3>
                  <p className="text-indigo-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDirectToWhatsApp}
                  className="text-slate-400 hover:text-[#25D366] transition-colors p-2 flex items-center gap-1"
                  title="Lanjutkan obrolan ke Admin via WhatsApp"
                >
                  <MessageCircle size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Consultation Progress Bar */}
            {consultationStep !== null && (
              <div className="bg-white px-6 py-3 border-b border-slate-100 shadow-sm z-10 relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest">
                    Project Assessment
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-medium">
                    Step {consultationStep + 1} of {QUIZ_STEPS.length}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
                    initial={{ width: `${(consultationStep / QUIZ_STEPS.length) * 100}%` }}
                    animate={{ width: `${((consultationStep + 1) / QUIZ_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
              {chatHistory.map((chat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-sans leading-relaxed flex flex-col gap-2 ${
                      chat.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : 'bg-white text-slate-700 border border-slate-200/60 shadow-sm rounded-bl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {chat.role === 'ai' && (
                        <div className="flex items-center gap-1.5 mb-1 text-indigo-600">
                          <Sparkles size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">AI Agent</span>
                        </div>
                      )}
                      {chat.content}
                    </div>
                    {chat.isEndConsultation && (
                      <button
                        onClick={handleDirectToWhatsApp}
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white text-[11px] font-bold uppercase tracking-wider py-2 px-3 rounded-lg transition-colors mt-2"
                      >
                        <MessageCircle size={14} />
                        Lanjutkan ke Admin WA
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {chatHistory.length === 1 && consultationStep === null && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-2 pt-2"
                >
                  <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1 ml-1">Saran Topik:</div>
                  {[
                    "Bagaimana Agentic AI bisa memangkas biaya operasional?",
                    "Berapa estimasi waktu pembuatan website enterprise?",
                    "Apa bedanya web biasa dengan arsitektur cloud kalian?"
                  ].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(undefined, prompt)}
                      className="text-left bg-white border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-600 text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}
              {consultationStep !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 pt-2"
                >
                  <div className="text-[10px] font-mono uppercase text-indigo-500 tracking-wider mb-1 ml-1 font-semibold">Opsi Jawaban:</div>
                  {QUIZ_STEPS[consultationStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(opt)}
                      className="text-left bg-white border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 text-xs font-medium py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-between group"
                    >
                      {opt}
                      <span className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <span className="text-[10px]">+</span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {consultationStep === null && (
              <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3">
                {/* Quick Actions */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button
                  onClick={handleStartConsultation}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] font-sans font-medium text-indigo-700 hover:text-indigo-800 hover:bg-indigo-100 transition-colors"
                >
                  <ClipboardList size={12} />
                  Start Consultation
                </button>
                {[
                  { label: "Estimate Timeline", icon: Clock },
                  { label: "Generate Tech Stack", icon: Code2 },
                  { label: "Explain Scalability", icon: TrendingUp }
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(undefined, action.label)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                  >
                    <action.icon size={12} />
                    {action.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm font-sans text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white disabled:bg-slate-300 disabled:text-slate-500 transition-colors"
                >
                  <Send size={14} className={message.trim() ? "translate-x-[1px]" : ""} />
                </button>
              </form>
            </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Proactive Tooltip */}
      <AnimatePresence>
        {!isOpen && chatHistory.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 2, duration: 0.5, type: 'spring' }}
            className="fixed bottom-24 right-6 sm:right-8 z-40 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 max-w-[250px] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full shrink-0">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Hi! Saya AI Assistant. Ingin diskusi tentang <strong>Cloud Architecture</strong> atau <strong>Automasi Bisnis</strong>?
                </p>
              </div>
            </div>
            {/* Triangle tail */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button Wrapper */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center">
        {/* Pulsing subtle rings behind the button for 'ready to help' engagement */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2.5,
                delay: 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center rounded-full bg-slate-900 p-4 text-white shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:text-indigo-400 transition-colors" />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            )}
          </div>
          
          <AnimatePresence>
            {!isOpen && (
              <motion.span 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                exit={{ width: 0, opacity: 0 }}
                className="font-mono text-xs font-bold uppercase overflow-hidden whitespace-nowrap"
              >
                <span className="ml-3 mr-3 text-indigo-300">Tanya AI</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

