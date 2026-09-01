import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, X, Send, User, ShieldCheck, ArrowRight, 
  RefreshCw, Lightbulb, Lock, CreditCard 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import DirectTransferModal from './organisms/DirectTransferModal';

export interface EcosystemChatMessage {
  id?: string;
  role: 'ai' | 'user';
  content: string;
  feedback?: 'up' | 'down';
  isAdmin?: boolean;
  senderName?: string;
  timestamp?: any;
  isHandoffNotice?: boolean;
}

export const PRICING_INTENT_REGEX = /(harga|biaya|price|pricing|paket|cost|tarif|tagihan|rekening|transfer|quote|quotation|diskon|discount|bca|gopay|dana|bayar|pembayaran|budget|invoice|dp|principal engineer|nego|penawaran|order|beli|pesan)/i;

const QUICK_SUGGESTIONS = [
  {
    icon: '⚡',
    label: 'Estimasi Biaya & Waktu',
    prompt: 'Berapa estimasi biaya dan waktu pengerjaan untuk website enterprise modern dengan backend andal?'
  },
  {
    icon: '🛡️',
    label: 'Integrasi AI & Otomatisasi',
    prompt: 'Bagaimana cara mengintegrasikan AI chatbot dan otomatisasi workflow pada sistem bisnis kami?'
  },
  {
    icon: '👨‍💻',
    label: 'Hubungi Principal Engineer',
    prompt: 'Saya ingin konsultasi arsitektur langsung dengan Principal Engineer.'
  },
  {
    icon: '💳',
    label: 'Sistem Pembayaran Satset',
    prompt: 'Bagaimana alur pembayaran Direct Transfer & E-Wallet di CHESTADOTCOM?'
  },
  {
    icon: '📦',
    label: 'Live Kanban & Vault',
    prompt: 'Bagaimana cara memantau progres pengerjaan di Live Kanban & Client Vault?'
  }
];

const markdownComponents = {
  p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0 text-slate-800 leading-relaxed font-sans text-[13.5px]" {...props} />,
  a: ({ node, href, children, ...props }: any) => {
    const isSearchData = href && href.startsWith('http');
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 hover:underline transition-colors ${isSearchData ? 'bg-purple-50 text-purple-900 px-2 py-0.5 rounded-lg border border-purple-100 text-xs font-medium' : 'text-purple-900 font-medium'}`} 
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ node, ...props }: any) => <ul className="list-outside list-disc pl-5 mb-2.5 space-y-1 text-slate-800 marker:text-purple-600 text-[13px]" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="list-outside list-decimal pl-5 mb-2.5 space-y-1 text-slate-800 marker:text-purple-600 font-medium text-[13px]" {...props} />,
  li: ({ node, ...props }: any) => <li className="leading-relaxed pl-1" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-semibold text-slate-900" {...props} />,
  code: ({ node, inline, className, children, ...props }: any) => (
    <code className="bg-purple-50 text-purple-900 px-1.5 py-0.5 rounded text-[11.5px] font-mono border border-purple-100" {...props}>
      {children}
    </code>
  )
};

interface EcosystemChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  standalone?: boolean;
  className?: string;
}

export function EcosystemChat({ isOpen = true, onClose, standalone = false, className = '' }: EcosystemChatProps) {
  const [sessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'init_sess';
    let id = localStorage.getItem('ai_session_id');
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem('ai_session_id', id);
    }
    return id;
  });

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHumanTakeover, setIsHumanTakeover] = useState(false);
  const [hasPricingIntent, setHasPricingIntent] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const defaultMessages: EcosystemChatMessage[] = [
    {
      role: 'ai',
      content: 'Halo! Saya asisten AI CHESTADOTCOM (Bespoke Software & AI Architecture). Ada yang bisa kami bantu seputar arsitektur website, app, atau integrasi AI Anda?\n<opsi>Berapa Estimasi Harga Proyek?</opsi>\n<opsi>Konsultasi Arsitektur Web & AI</opsi>\n<opsi>Hubungi Principal Engineer 👨‍💻</opsi>'
    }
  ];

  const [chatHistory, setChatHistory] = useState<EcosystemChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultMessages;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { user } = useAuth() || {};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  useEffect(() => {
    localStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    if (!sessionId) return;
    const sessionRef = doc(db, 'ai_chat_sessions', sessionId);

    const unsubscribe = onSnapshot(sessionRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.humanTakeover === true || data.requiresHuman === true) {
          setIsHumanTakeover(true);
        } else {
          setIsHumanTakeover(false);
        }

        if (data.pricingIntent === true) {
          setHasPricingIntent(true);
        }

        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setChatHistory(prev => {
            if (data.messages.length >= prev.length) {
              return data.messages;
            }
            return prev;
          });
        }
      }
    }, (err) => {
      console.warn("EcosystemChat onSnapshot error:", err);
    });

    return () => unsubscribe();
  }, [sessionId]);

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const kbDoc = doc(db, 'knowledge_base', 'main');
        const kbUnsub = onSnapshot(
          kbDoc, 
          (snap) => {
            if (snap.exists()) {
              setKnowledgeBase(snap.data()?.content || '');
            }
          },
          (err) => {
            console.warn("Knowledge base snapshot notice:", err);
          }
        );

        return () => {
          kbUnsub();
        };
      } catch (e) {
        console.warn("Notice: Knowledge base doc:", e);
      }
    };
    fetchKnowledge();
  }, []);

  const saveSessionToFirestore = async (history: EcosystemChatMessage[], handoffRequired = false) => {
    if (!sessionId) return;
    try {
      const sessionRef = doc(db, 'ai_chat_sessions', sessionId);
      await setDoc(sessionRef, {
        sessionId,
        messages: history,
        lastUpdated: serverTimestamp(),
        pricingIntent: handoffRequired || hasPricingIntent,
        requiresHuman: handoffRequired || isHumanTakeover,
        humanTakeover: isHumanTakeover,
        path: location.pathname,
        userEmail: user?.email || 'Anonymous Visitor',
      }, { merge: true });
    } catch (e) {
      console.warn("Session save notice:", e);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const textToSend = customMsg || message;
    if (!textToSend.trim() || isTyping) return;

    setMessage('');
    const userMsg: EcosystemChatMessage = { role: 'user', content: textToSend.trim(), timestamp: new Date().toISOString() };
    const newHistory: EcosystemChatMessage[] = [...chatHistory, userMsg];
    setChatHistory(newHistory);

    const isPricingDetected = PRICING_INTENT_REGEX.test(textToSend);

    if (isPricingDetected && !isHumanTakeover) {
      setHasPricingIntent(true);
      const handoffMsg: EcosystemChatMessage = {
        role: 'ai',
        content: 'Connecting you to our Principal Engineer... Permintaan Anda telah kami prioritaskan dan Principal Engineer kami segera membalas di Comm-Link terenkripsi ini.',
        isHandoffNotice: true,
        timestamp: new Date().toISOString()
      };

      const updatedHistory = [...newHistory, handoffMsg];
      setChatHistory(updatedHistory);
      await saveSessionToFirestore(updatedHistory, true);

      toast.success('Pemberitahuan telah dikirim ke Principal Engineer!', { icon: '🛡️' });
      return;
    }

    if (isHumanTakeover) {
      await saveSessionToFirestore(newHistory, true);
      return;
    }

    setIsTyping(true);
    try {
      const systemPrompt = `Anda adalah Asisten AI Resmi untuk CHESTADOTCOM (Bespoke Software & AI Architecture).
Fokus: Web modern premium, Next.js, Cloud Run, arsitektur microservices, AI Automation, dan sistem pembayaran (Direct Transfer & E-Wallet satset).

Knowledge Base Tambahan:
${knowledgeBase}

Format Balasan:
- Berikan respon yang ramah, profesional, presisi arsitektur, dan ringkas.
- Selalu sertakan 2-3 opsi navigasi interaktif di bagian paling bawah jawaban Anda dengan format:
<opsi>Pilihan 1</opsi>
<opsi>Pilihan 2</opsi>
<opsi>Hubungi Principal Engineer 👨‍💻</opsi>`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...newHistory.map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.content
            }))
          ],
          stream: true
        })
      });

      if (!response.ok || !response.body) {
        const fallbackText = "Terima kasih atas pertanyaan Anda. CHESTADOTCOM merancang solusi perangkat lunak bespoke berkinerja tinggi dengan keamanan enterprise grade. Ada bagian spesifik yang ingin Anda eksplorasi?\n<opsi>Estimasi Biaya & Waktu</opsi>\n<opsi>Konsultasi Arsitektur Web & AI</opsi>\n<opsi>Hubungi Principal Engineer 👨‍💻</opsi>";
        const finalHistory = [...newHistory, { role: 'ai', content: fallbackText } as EcosystemChatMessage];
        setChatHistory(finalHistory);
        await saveSessionToFirestore(finalHistory);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedResponse = '';

      setChatHistory(prev => [...prev, { role: 'ai', content: '' }]);

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          streamedResponse += decoder.decode(value, { stream: true });
          setChatHistory(prev => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === 'ai') {
              updated[lastIdx] = { role: 'ai', content: streamedResponse };
            }
            return updated;
          });
        }
      }

      const finalHistory: EcosystemChatMessage[] = [...newHistory, { role: 'ai', content: streamedResponse }];
      setChatHistory(finalHistory);
      await saveSessionToFirestore(finalHistory);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: EcosystemChatMessage = {
        role: 'ai',
        content: 'Kami siap membantu merancang arsitektur web dan integrasi AI kustom untuk bisnis Anda. Silakan pilih opsi di bawah atau tanyakan apa saja.\n<opsi>Berapa Estimasi Harga Proyek?</opsi>\n<opsi>Konsultasi Arsitektur Web & AI</opsi>\n<opsi>Hubungi Principal Engineer 👨‍💻</opsi>'
      };
      const finalHistory = [...newHistory, fallbackMsg];
      setChatHistory(finalHistory);
      await saveSessionToFirestore(finalHistory);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setChatHistory(defaultMessages);
    localStorage.removeItem('ai_chat_history');
    toast.success('Percakapan telah direset');
  };

  const renderMessageContent = (msg: EcosystemChatMessage, index: number) => {
    let displayContent = msg.content;
    const choices: string[] = [];

    if (msg.role === 'ai') {
      const opsiRegex = /<opsi>(.*?)<\/opsi>/g;
      let match;
      while ((match = opsiRegex.exec(msg.content)) !== null) {
        if (match[1].trim()) choices.push(match[1].trim());
      }
      displayContent = displayContent.replace(/<opsi>.*?<\/opsi>\n?/g, '').trim();
    }

    const isUser = msg.role === 'user';
    const isHandoff = msg.isHandoffNotice || displayContent.includes("Connecting you to our Principal Engineer");
    const isAdminHuman = msg.isAdmin || msg.senderName === 'Principal Engineer';

    return (
      <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-2.5`}>
        <div className="flex items-center gap-1.5 mb-1 px-1">
          {isUser ? (
            <span className="text-[11px] font-semibold text-slate-500">Anda</span>
          ) : isAdminHuman ? (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Principal Engineer</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
              <Bot size={13} className="text-purple-900" />
              <span>Principal AI Consultant</span>
            </div>
          )}
        </div>

        <div
          className={`max-w-[88%] sm:max-w-[82%] px-4 py-3 rounded-2xl text-sm transition-all shadow-xs ${
            isUser
              ? 'bg-purple-900 text-white rounded-tr-xs shadow-sm'
              : isAdminHuman
              ? 'bg-emerald-50 border border-emerald-300 text-slate-900 rounded-tl-xs'
              : isHandoff
              ? 'bg-amber-50 border border-amber-300 text-amber-950 rounded-tl-xs'
              : 'bg-purple-50/40 border border-purple-100 text-slate-900 rounded-tl-xs'
          }`}
        >
          {isHandoff ? (
            <div className="flex items-center gap-3 py-1">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <ShieldCheck size={18} className="animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-[11px] tracking-wide uppercase text-amber-800">Comm-Link</p>
                <p className="text-xs font-medium text-amber-950 leading-relaxed mt-0.5">{displayContent}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <ReactMarkdown components={markdownComponents}>{displayContent}</ReactMarkdown>
            </div>
          )}

          {choices.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-purple-100 flex flex-wrap gap-1.5">
              {choices.map((choice, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => handleSendMessage(undefined, choice)}
                  className="text-left text-xs bg-white hover:bg-purple-50 hover:text-purple-900 text-slate-800 px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs transition-all font-semibold flex items-center gap-1.5 group active:scale-95 cursor-pointer"
                >
                  <span>{choice}</span>
                  <ArrowRight size={12} className="text-purple-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const containerContent = (
    <div className={`flex flex-col h-full bg-white border border-purple-100 rounded-3xl shadow-xl overflow-hidden font-sans ${className}`}>
      
      {/* Top Header */}
      <div className="px-5 py-3.5 border-b border-purple-100 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className={`relative w-9 h-9 rounded-2xl flex items-center justify-center transition-colors ${
            isHumanTakeover 
              ? 'bg-emerald-600 text-white shadow-xs' 
              : 'bg-purple-900 text-white shadow-xs'
          }`}>
            {isHumanTakeover ? <User size={18} /> : <Bot size={18} />}
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
              isHumanTakeover ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'
            }`} />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                {isHumanTakeover ? 'Principal Engineer' : 'CHESTADOTCOM AI'}
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-md bg-purple-50 text-purple-900 border border-purple-100">
                {isHumanTakeover ? 'Live Handoff' : 'Verified'}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              {isHumanTakeover ? (
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <Lock size={10} /> Comm-Link Active
                </span>
              ) : (
                <span>Fast response • Realtime AI consultation</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="p-1.5 px-2.5 text-[11px] font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-100 transition-colors flex items-center gap-1 cursor-pointer"
            title="Direct Transfer"
          >
            <CreditCard size={13} />
            <span className="hidden sm:inline">Direct Transfer</span>
          </button>
          <button
            onClick={handleResetChat}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-purple-50 rounded-full transition-colors cursor-pointer"
            title="Reset Percakapan"
          >
            <RefreshCw size={15} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-purple-50 rounded-full transition-colors cursor-pointer"
              aria-label="Tutup Chat"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2 scroll-smooth bg-white">
        {chatHistory.map((msg, i) => renderMessageContent(msg, i))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3">
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-medium text-[11px]">Asisten AI sedang menyusun respon arsitektur...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Persistent Section Suggestions Bar */}
      <div className="px-3.5 py-2 bg-purple-50/30 border-t border-purple-100 flex items-center gap-2 overflow-x-auto shrink-0">
        <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
          <Lightbulb size={12} className="text-amber-500" />
          <span>Saran:</span>
        </div>
        {QUICK_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(undefined, item.prompt)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-[11px] font-medium text-slate-700 border border-purple-100 hover:border-purple-300 hover:text-purple-900 hover:bg-purple-50 transition-all whitespace-nowrap shadow-2xs cursor-pointer active:scale-95"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3.5 bg-white border-t border-purple-100 shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isHumanTakeover ? "Ketik pesan langsung ke Principal Engineer..." : "Tanyakan arsitektur, estimasi harga, atau konsultasi..."}
              className="w-full bg-purple-50/30 border border-purple-100 rounded-full pl-4 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all font-sans"
              disabled={isTyping}
            />
            {message && (
              <button
                type="button"
                onClick={() => setMessage('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center shrink-0 shadow-xs ${
              message.trim() && !isTyping
                ? 'bg-purple-900 text-white hover:bg-purple-800 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-purple-100 text-purple-300 cursor-not-allowed opacity-50'
            }`}
            aria-label="Kirim Pesan"
          >
            <Send size={16} className="-ml-0.5" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
          <span>Tekan ↵ untuk mengirim</span>
          <span>⚡ Realtime AI Comm-Link</span>
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return containerContent;
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-32px)] sm:w-[420px] h-[640px] max-h-[calc(100vh-120px)] z-50"
          >
            {containerContent}
          </motion.div>
        )}
      </AnimatePresence>

      <DirectTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        initialService="Konsultasi & Direct Transfer"
      />
    </>
  );
}

export default EcosystemChat;
