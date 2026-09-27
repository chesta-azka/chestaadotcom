'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Calendar, ArrowRight, 
  ExternalLink, RotateCcw, Sparkles, CheckCheck, Check,
  ShieldCheck, Bot, Copy
} from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';
import { parseAiResponse } from '../../utils/aiResponseParser';
import { usePathname } from 'next/navigation';
import { 
  useFirestoreChat, 
  sanitizeClientProse, 
  ChatMessage 
} from '../../hooks/useFirestoreChat';

/**
 * TypewriterText Component:
 * Reveals AI consulting prose character-by-character or word-by-word with staggered Framer Motion timing,
 * reinforcing the aesthetic of an elite consultant deep in thought, actively crafting bespoke strategy.
 */
interface TypewriterTextProps {
  text: string;
  isStreaming?: boolean;
  isNew?: boolean;
}

function TypewriterText({ text, isStreaming, isNew = false }: TypewriterTextProps) {
  const paragraphs = useMemo(() => {
    return text.split('\n\n').filter(p => p.trim().length > 0);
  }, [text]);

  const renderHtmlContent = (contentStr: string): React.ReactNode => {
    if (!contentStr) return '';

    // Matches <a> tags and <b> tags:
    const regex = /(<a\s+href=['"][^'"]+['"]>.*?<\/a>|<b>.*?<\/b>)/gi;
    const tokens = contentStr.split(regex);

    return (
      <>
        {tokens.map((token, idx) => {
          if (/^<a\s+/i.test(token)) {
            const hrefMatch = token.match(/href=['"]([^'"]+)['"]/i);
            const href = hrefMatch ? hrefMatch[1] : '#';

            const contentMatch = token.match(/>(.*?)<\/a>/i);
            const content = contentMatch ? contentMatch[1] : '';

            if (/^<b>/i.test(content)) {
              const innerBold = content.replace(/<\/?b>/gi, '');
              return (
                <a
                  key={idx}
                  href={href}
                  className="text-purple-700 font-semibold underline underline-offset-4 cursor-pointer hover:text-purple-900 transition-colors inline-block"
                >
                  <b className="font-bold text-slate-950">{innerBold}</b>
                </a>
              );
            }

            return (
              <a
                key={idx}
                href={href}
                className="text-purple-700 font-semibold underline underline-offset-4 cursor-pointer hover:text-purple-900 transition-colors inline-block"
              >
                {content}
              </a>
            );
          } else if (/^<b>/i.test(token)) {
            const content = token.replace(/<\/?b>/gi, '');
            return <b key={idx} className="font-bold text-slate-950">{content}</b>;
          }

          // Plain text token
          return <span key={idx}>{token}</span>;
        })}
      </>
    );
  };

  // If already loaded from previous sessions, render directly without artificial delay
  if (!isNew && !isStreaming) {
    return (
      <div className="space-y-3 text-sm sm:text-[14.5px] text-slate-800 font-normal leading-relaxed select-text font-sans">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{renderHtmlContent(p)}</p>
        ))}
      </div>
    );
  }

  // Active streaming state: display text with live pulsating vertical accent caret
  if (isStreaming) {
    return (
      <div className="space-y-3 text-sm sm:text-[14.5px] text-slate-800 font-normal leading-relaxed select-text font-sans">
        {paragraphs.map((p, idx) => {
          const isLastParagraph = idx === paragraphs.length - 1;
          return (
            <p key={idx}>
              {renderHtmlContent(p)}
              {isLastParagraph && (
                <span className="inline-block w-1.5 h-4 bg-emerald-600 ml-1.5 animate-pulse align-middle rounded-xs shrink-0" />
              )}
            </p>
          );
        })}
      </div>
    );
  }

  // Fade-in animation for paragraphs to avoid typewriter breaking/printing raw HTML tags
  return (
    <div className="space-y-3 text-sm sm:text-[14.5px] text-slate-800 font-normal leading-relaxed select-text font-sans">
      {paragraphs.map((p, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.15 }}
        >
          {renderHtmlContent(p)}
        </motion.p>
      ))}
    </div>
  );
}

// High-conversion suggested quick action prompts are now computed dynamically based on conversational context in dynamicChips.

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const pathname = usePathname() || '/';

  // Consulting State Machine Workflow: 'idle' -> 'analyzing' -> 'synthesizing' -> 'streaming'
  const [consultingStage, setConsultingStage] = useState<'idle' | 'analyzing' | 'synthesizing' | 'streaming'>('idle');

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('08');

  // Custom Firestore Chat Hook with Anonymous Session Persistence in localStorage
  const {
    sessionId,
    messages,
    isTyping,
    isStreaming,
    isLoadingHistory,
    sendMessage,
    resetConversation,
    setMessages,
    persistMessagesToFirestore
  } = useFirestoreChat();

  // Low-frequency 'pop' sound effect utilizing Web Audio API for 100% dependency-free reliability
  const playPopSound = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(150, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1); 
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (err) {
      console.warn("Audio Context blocked or not supported:", err);
    }
  };

  const prevStreamingRef = useRef(false);

  useEffect(() => {
    if (prevStreamingRef.current === true && !isStreaming) {
      // Just finished streaming! Play pop sound!
      playPopSound();
    }
    prevStreamingRef.current = isStreaming;
  }, [isStreaming]);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Smart Scroll Lock Architecture:
  // Tracks viewport proximity to bottom and whether user has actively scrolled up into history
  const isAtBottomRef = useRef<boolean>(true);
  const userIsReadingHistoryRef = useRef<boolean>(false);
  const isProgrammaticScrollingRef = useRef<boolean>(false);
  const lastScrollTopRef = useRef<number>(0);
  const [showScrollBottomPill, setShowScrollBottomPill] = useState<boolean>(false);

  // Smart scroll listener that checks if user is reading previous messages
  const handleScroll = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    // Strict bottom boundary threshold: 50px
    const isNearBottom = distanceFromBottom <= 50;

    if (isProgrammaticScrollingRef.current) {
      if (isNearBottom) {
        isProgrammaticScrollingRef.current = false;
        isAtBottomRef.current = true;
        userIsReadingHistoryRef.current = false;
        setShowScrollBottomPill(false);
      }
      return;
    }

    if (isNearBottom) {
      // User is at the bottom: allow auto-scroll
      isAtBottomRef.current = true;
      userIsReadingHistoryRef.current = false;
      setShowScrollBottomPill(false);
    } else {
      // User has scrolled up to read history: lock container scroll position
      isAtBottomRef.current = false;
      userIsReadingHistoryRef.current = true;
      lastScrollTopRef.current = el.scrollTop;
      if (isStreaming) {
        setShowScrollBottomPill(true);
      }
    }
  }, [isStreaming]);

  // Direct wheel/touch event listeners for instant zero-lag scroll lock detection
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        // User intentionally wheeled upwards to inspect history: lock immediately
        userIsReadingHistoryRef.current = true;
        isAtBottomRef.current = false;
        isProgrammaticScrollingRef.current = false;
      }
    };

    const handleTouchStart = () => {
      isProgrammaticScrollingRef.current = false;
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    const el = chatContainerRef.current;
    if (!el) return;

    // Stay completely flat and quiet if the user is typing/focusing the input console (unless forced by submit)
    if (isInputFocused && !force) {
      return;
    }

    if (force) {
      userIsReadingHistoryRef.current = false;
      isAtBottomRef.current = true;
      setShowScrollBottomPill(false);
      isProgrammaticScrollingRef.current = true;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
      setTimeout(() => {
        isProgrammaticScrollingRef.current = false;
      }, 350);
      return;
    }

    // Critical Smart Scroll Lock: If user is reading history, lock container scroll position completely
    if (userIsReadingHistoryRef.current || !isAtBottomRef.current) {
      if (isStreaming) {
        setShowScrollBottomPill(true);
      }
      return;
    }

    // If user is at the bottom, follow new content seamlessly
    // Use instant scroll during rapid streaming to eliminate choppy layout jumping
    if (isStreaming) {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [isStreaming, isInputFocused]);

  // Smart auto-scroll effect: only executes if user is not reading history
  useEffect(() => {
    scrollToBottom(false);
  }, [messages, isTyping, isStreaming, consultingStage, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Sync consulting state with streaming status
  useEffect(() => {
    if (isStreaming) {
      setConsultingStage('streaming');
    } else if (!isTyping && !isStreaming) {
      setConsultingStage('idle');
    }
  }, [isStreaming, isTyping]);

  // Booking slots availability listener
  const upcomingDates = [
    { label: 'Senin Besok', value: 'Senin 28 September 2026' },
    { label: 'Selasa', value: 'Selasa 29 September 2026' },
    { label: 'Rabu', value: 'Rabu 30 September 2026' },
    { label: 'Kamis', value: 'Kamis 1 Oktober 2026' }
  ];
  const [bookingDate, setBookingDate] = useState(upcomingDates[0].value);
  const [bookingTime, setBookingTime] = useState('14:00 WIB');
  const [bookedSlots, setBookedSlots] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'ai_chat_sessions'), (snapshot) => {
      const booked: Record<string, boolean> = {};
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.isBooking && data.date && data.time && data.status !== 'completed' && data.status !== 'cancelled') {
          booked[`${data.date}_${data.time}`] = true;
        }
      });
      setBookedSlots(booked);
    }, () => {});
    return () => unsub();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (!val.startsWith('08')) {
      val = val.startsWith('0') ? '08' + val.slice(1) : '08' + val;
    }
    if (val.length > 15) val = val.slice(0, 15);
    setBookingPhone(val);
  };

  // Submit User Message with Psychological Consulting State Machine Transitions
  const handleSubmit = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const raw = (textOverride || inputText).trim();
    if (!raw) return;

    if (!textOverride) setInputText('');

    const lower = raw.toLowerCase();
    if (lower.includes('jadwal') || lower.includes('call') || lower.includes('booking')) {
      setShowBookingForm(true);
    }

    // Force scroll to bottom when user explicitly sends a message
    userIsReadingHistoryRef.current = false;
    isAtBottomRef.current = true;
    setShowScrollBottomPill(false);
    setTimeout(() => scrollToBottom(true), 50);

    // Step 1: Psychological phase - Analyzing business context
    setConsultingStage('analyzing');

    // Step 2: Psychological phase - Synthesizing strategy
    const synthTimer = setTimeout(() => {
      setConsultingStage((current) => (current === 'analyzing' ? 'synthesizing' : current));
    }, 750);

    try {
      await sendMessage(raw);
    } finally {
      clearTimeout(synthTimer);
    }
  };

  // Submit Discovery Booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneClean = bookingPhone.trim();
    const nameClean = bookingName.trim() || 'Klien Eksekutif';

    const slotKey = `${bookingDate}_${bookingTime}`;
    if (bookedSlots[slotKey]) {
      toast.error("Slot waktu tersebut baru saja terisi. Silakan pilih waktu lain.");
      return;
    }

    const phoneRegex = /^08[0-9]{8,13}$/;
    if (!phoneRegex.test(phoneClean)) {
      toast.error("Format nomor WhatsApp tidak valid (Gunakan 08... 10-15 digit).");
      return;
    }

    const bookingClientText = `Permintaan Discovery Call:\nNama: ${nameClean}\nWhatsApp: ${phoneClean}\nTanggal: ${bookingDate} (${bookingTime})`;
    const clientMsg: ChatMessage = {
      id: 'client_book_' + Date.now(),
      sender: 'client',
      text: bookingClientText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      isNew: false
    };

    setShowBookingForm(false);

    const confirmationMsg: ChatMessage = {
      id: 'expert_confirm_' + (Date.now() + 1),
      sender: 'expert',
      text: `Jadwal Discovery Call telah dikonfirmasi. Chesta Azka akan menghubungi ${nameClean} via WhatsApp di nomor ${phoneClean} pada ${bookingDate} pukul ${bookingTime}.\n\nKami telah mencatat kebutuhan arsitektur Anda dan menyiapkan audit awal performa sistem.\n\n<opsi>⚡ Tanya Estimasi Fitur</opsi>\n<opsi>🔍 Pelajari Portofolio</opsi>`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      isNew: true,
      isBookingConfirmation: true,
      bookingData: {
        name: nameClean,
        phone: phoneClean,
        date: bookingDate,
        time: bookingTime
      }
    };

    const newMsgs = [...messages, clientMsg, confirmationMsg];
    setMessages(newMsgs);
    await persistMessagesToFirestore(newMsgs);
    toast.success("Jadwal Discovery Call berhasil dikonfirmasi!");
  };

  interface MessageGroup {
    sender: 'client' | 'expert';
    messages: ChatMessage[];
  }

  const groupedMessages = useMemo(() => {
    const groups: MessageGroup[] = [];
    if (messages.length === 0) return groups;

    let currentGroup: MessageGroup = {
      sender: messages[0].sender,
      messages: [messages[0]]
    };

    for (let i = 1; i < messages.length; i++) {
      const msg = messages[i];
      const prevMsg = messages[i - 1];
      const timeDiff = Math.abs((msg.timestamp || Date.now()) - (prevMsg.timestamp || Date.now()));

      // Check if same sender AND within 2 minutes (120,000 ms)
      if (msg.sender === currentGroup.sender && timeDiff <= 2 * 60 * 1000) {
        currentGroup.messages.push(msg);
      } else {
        groups.push(currentGroup);
        currentGroup = {
          sender: msg.sender,
          messages: [msg]
        };
      }
    }
    groups.push(currentGroup);
    return groups;
  }, [messages]);

  const dynamicChips = useMemo(() => {
    // 1. Conversation-aware check: If the last message is from the AI (expert) and ends with or contains a question mark "?"
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'expert') {
        const text = lastMsg.text.trim();
        if (text.endsWith('?') || text.includes('?')) {
          if (text.toLowerCase().includes('estimasi') || text.toLowerCase().includes('hitung') || text.toLowerCase().includes('roi')) {
            return ['Boleh, Hitung Sekarang', 'Nanti Saja', 'Berapa Biayanya?'];
          }
          if (text.toLowerCase().includes('booking') || text.toLowerCase().includes('jadwal') || text.toLowerCase().includes('call')) {
            return ['Jadwalkan Discovery Call', 'Tanya Portofolio', 'Nanti Saja'];
          }
          return ['Ya, Boleh', 'Tidak, Terima Kasih', 'Pelajari Lebih Lanjut'];
        }
      }
    }

    // 2. Active route-based check (Next.js usePathname logic)
    if (pathname.includes('/portfolio')) {
      return ['Lihat arsitektur rumah-tropis', 'Hitung ROI Project', 'Estimasi Biaya'];
    }
    if (pathname.includes('/blog') || pathname.includes('/seo')) {
      return ['Strategi TanyaSeo', 'Bedah Metrik SEO', 'Audit SEO Gratis'];
    }

    // 3. Dynamic route paths fallback for initial chips (before first user message)
    if (messages.length <= 1) {
      if (pathname.includes('/services/landing-page')) {
        return ['Hitung ROI Landing Page', 'Spesifikasi Desain', 'Konsultasi Proyek'];
      }
      if (pathname.includes('/services/ai-automation')) {
        return ['Hitung Penghematan Gaji', 'Alur Integrasi AI', 'Mulai Automatisasi'];
      }
      if (pathname.includes('/services/ecommerce')) {
        return ['Simulasi ROI Toko Online', 'Keamanan Pembayaran', 'Hubungi WhatsApp'];
      }
      return ['Simulasi Hemat Biaya', 'Proses Integrasi Otonom', 'Konsultasi Arsitektur'];
    }

    // 4. Fall back to previous user/AI message context keywords
    const lastMsg = messages[messages.length - 1];
    const text = lastMsg.text.toLowerCase();

    if (lastMsg.sender === 'client') {
      return ['Hitung ROI Otomatisasi', 'Proses Integrasi', 'Tanya Portofolio'];
    }

    if (text.includes('landing-page') || text.includes('landing page')) {
      return ['Hitung ROI Landing Page', 'Proses Pengerjaan', 'Mulai Project'];
    }
    if (text.includes('ecommerce') || text.includes('e-commerce') || text.includes('toko online')) {
      return ['Simulasi ROI Toko Online', 'Keamanan Transaksi', 'Mulai Kerja Sama'];
    }
    if (text.includes('automation') || text.includes('otomatisasi') || text.includes('payroll')) {
      return ['Hitung Penghematan Gaji', 'Alur Kerja Sistem', 'Jadwalkan Call'];
    }
    if (text.includes('seo') || text.includes('tanyaseo')) {
      return ['Audit SEO Lokal', 'Cara Kerja TanyaSeo', 'Pesan Audit SEO'];
    }
    if (text.includes('rumah-tropis') || text.includes('arsitektur')) {
      return ['Studi Kasus rumah-tropis', 'Pilihan Framework', 'Konsultasi Desain'];
    }
    if (lastMsg.isBookingConfirmation || text.includes('konfirmasi') || text.includes('jadwal')) {
      return ['Hubungi WhatsApp', 'Siapkan Bahan Audit', 'Mulai Sesi Baru'];
    }

    return ['Simulasi Hemat Biaya', 'Proses Integrasi Otonom', 'Konsultasi Arsitektur'];
  }, [messages, pathname]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Pristine Minimalist Floating Launcher */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Konsultasi Arsitektur"
        className="w-13 h-13 rounded-full bg-purple-900 text-white shadow-[0_12px_36px_rgba(147,51,234,0.35)] flex items-center justify-center cursor-pointer border border-white/20 transition-all active:scale-95"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        {isOpen ? <X size={20} className="text-white" strokeWidth={1.5} /> : <MessageSquare size={20} className="text-white" strokeWidth={1.5} />}
      </motion.button>

      {/* Modern WA-Style Glassmorphic Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-16 right-4 w-[94vw] sm:w-[500px] h-auto max-h-[85dvh] bg-white/95 backdrop-blur-3xl rounded-[24px] shadow-2xl shadow-purple-900/20 flex flex-col shrink min-h-0 overflow-hidden pb-[env(safe-area-inset-bottom)] z-50 selection:bg-purple-900 selection:text-white"
          >
            
            {/* 1. THE FOUNDER HEADER (WA-STYLE): sticky purple-950 header */}
            <div className="sticky top-0 z-20 px-5 py-3.5 bg-purple-950 text-white flex items-center justify-between shrink-0 shadow-sm rounded-t-[20px]">
              <div className="flex items-center gap-3">
                {/* Left side: A circular Avatar image placeholder with a subtle online green indicator dot on the bottom right of the image */}
                <div className="relative w-10 h-10 rounded-full bg-purple-900 border border-purple-800 flex items-center justify-center text-white font-bold select-none text-sm shrink-0 shadow-2xs">
                  CA
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-purple-950 animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold tracking-tight text-white font-sans">
                      Chestaa
                    </h2>
                  </div>
                  <p className="text-[11px] font-sans text-purple-200/90 tracking-normal font-normal flex items-center gap-1.5 h-4">
                    {isTyping || isStreaming ? (
                      <>
                        <span className="text-emerald-400 font-medium animate-pulse">Sedang mengetik...</span>
                        <span className="flex gap-0.5 items-center">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" />
                        </span>
                      </>
                    ) : (
                      "Asisten Digital · Sedang online..."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Reset Session Option */}
                <button
                  onClick={() => {
                    if (window.confirm("Mulai percakapan baru? Riwayat sebelumnya akan direset.")) {
                      resetConversation();
                      toast.success("Sesi baru dimulai.");
                    }
                  }}
                  className="p-1.5 rounded-full hover:bg-purple-900/50 text-purple-200 hover:text-white transition-colors cursor-pointer"
                  title="Mulai Sesi Baru"
                >
                  <RotateCcw size={15} strokeWidth={1.5} />
                </button>

                {/* Close Button: Monochrome white line icon */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-purple-900/50 text-purple-200 hover:text-white transition-colors cursor-pointer"
                  title="Tutup Chat"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Premium WA-Bubble Canvas with Smart Scroll Lock */}
            <div 
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 min-h-0 shrink px-5 py-6 overflow-y-auto space-y-4 scrollbar-thin bg-slate-50/70"
            >

              {groupedMessages.map((group, groupIdx) => {
                const isClient = group.sender === 'client';
                return (
                  <div
                    key={`group-${groupIdx}`}
                    className={`w-full flex flex-col ${isClient ? 'items-end' : 'items-start'} space-y-1.5`}
                  >
                    {group.messages.map((msg) => {
                      const { cleanText, options } = parseAiResponse(msg.text);
                      const sanitizedBody = sanitizeClientProse(cleanText);

                      return (
                        <div
                          key={msg.id}
                          className={`w-full flex ${isClient ? 'justify-end' : 'justify-start'} transition-opacity duration-200`}
                        >
                          {isClient ? (
                            /* User Message: Right-aligned. Deep solid purple bubble. Dynamic border radius rounded-2xl rounded-tr-sm */
                            <motion.div
                              whileHover={{ x: -2 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              className="bg-purple-900 text-white shadow-xs rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] sm:max-w-[78%] relative text-left cursor-default select-text"
                            >
                              <div className="text-sm sm:text-[14.5px] leading-relaxed font-normal select-text break-words font-sans">
                                {sanitizedBody}
                              </div>
                              
                              {/* Timestamps & Double-tick Read Receipts */}
                              <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-purple-200/80 font-mono select-none">
                                <span>{msg.time}</span>
                                {/* Read receipt: double tick turns purple if responded to, else light-gray (purple-300/40 opacity) */}
                                <CheckCheck 
                                  size={13} 
                                  strokeWidth={1.5}
                                  className={
                                    messages.some(
                                      (m) => m.sender === 'expert' && (m.timestamp || 0) > (msg.timestamp || 0)
                                    )
                                      ? "text-emerald-400" // Purple bubble contrast looks best with emerald read tick or bright purple tick
                                      : "text-white/40"
                                  } 
                                />
                              </div>
                            </motion.div>
                          ) : (
                            /* AI Message: Left-aligned. Crisp white bubble, soft shadow and border, rounded-2xl rounded-tl-sm */
                            (() => {
                              const parts = sanitizedBody.split('[SPLIT]').map(p => p.trim()).filter(Boolean);
                              const displayParts = parts.length === 0 ? [''] : parts;

                              return (
                                <div className="space-y-2 w-full flex flex-col items-start">
                                  {displayParts.map((part, partIdx) => {
                                    const isLastPart = partIdx === displayParts.length - 1;
                                    const partId = `${msg.id}-${partIdx}`;

                                    return (
                                      <motion.div
                                        key={partId}
                                        initial={msg.isNew ? { opacity: 0, y: 8, scale: 0.96 } : false}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        whileHover={{ x: 2 }}
                                        transition={{ duration: 0.28, delay: msg.isNew ? partIdx * 0.8 : 0, ease: "easeOut" }}
                                        className="bg-white text-slate-900 shadow-xs border border-slate-100 rounded-2xl rounded-tl-sm px-4.5 py-3 max-w-[88%] sm:max-w-[82%] relative text-left space-y-2 group cursor-default"
                                      >
                                        {/* Hidden Copy Action with sleek Micro-tooltip on hover/click */}
                                        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex items-center">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              navigator.clipboard.writeText(part);
                                              setCopiedId(partId);
                                              setTimeout(() => setCopiedId(null), 1800);
                                            }}
                                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-purple-900 border border-slate-200/50 shadow-3xs cursor-pointer transition-colors relative"
                                            title="Salin jawaban"
                                          >
                                            {copiedId === partId ? (
                                              <Check size={12} strokeWidth={1.5} className="text-emerald-600" />
                                            ) : (
                                              <Copy size={12} strokeWidth={1.5} />
                                            )}

                                            {/* Sleek Copied micro-tooltip */}
                                            <AnimatePresence>
                                              {copiedId === partId && (
                                                <motion.span
                                                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                                  className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-slate-950 text-white text-[10px] font-sans font-medium pointer-events-none whitespace-nowrap shadow-xs"
                                                >
                                                  Copied
                                                </motion.span>
                                              )}
                                            </AnimatePresence>
                                          </button>
                                        </div>

                                        <div className="text-sm sm:text-[14.5px] leading-relaxed font-normal select-text font-sans pr-6">
                                          <TypewriterText
                                            text={part}
                                            isStreaming={msg.isStreaming && isLastPart}
                                            isNew={msg.isNew && isLastPart}
                                          />
                                        </div>

                                        {/* Booking Confirmation details */}
                                        {isLastPart && msg.isBookingConfirmation && msg.bookingData && (
                                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-mono text-slate-700 space-y-1">
                                            <div className="text-purple-900 font-bold">Jadwal Discovery Call Terkonfirmasi</div>
                                            <div className="text-slate-800 font-sans">{msg.bookingData.date} ({msg.bookingData.time})</div>
                                            <div className="text-slate-400 text-[10.5px]">{msg.bookingData.name} · {msg.bookingData.phone}</div>
                                            <div className="pt-1.5">
                                              <a
                                                href={`https://wa.me/6282125447232?text=${encodeURIComponent(`Halo Mas Chesta, saya ${msg.bookingData.name} yang sudah booking Discovery Call untuk ${msg.bookingData.date} pukul ${msg.bookingData.time}.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-700 hover:text-purple-900 hover:underline inline-flex items-center gap-1 font-sans text-xs"
                                              >
                                                <span>Hubungi via WhatsApp</span>
                                                <ExternalLink size={12} strokeWidth={1.5} />
                                              </a>
                                            </div>
                                          </div>
                                        )}

                                        {/* WA-Style Interactive Quick Reply Button Links */}
                                        {isLastPart && !msg.isStreaming && options.length > 0 && (
                                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                                            {options.map((opt, i) => (
                                              <button
                                                key={i}
                                                onClick={() => {
                                                  if (opt.label.toLowerCase().includes('jadwal') || opt.label.toLowerCase().includes('call')) {
                                                    setShowBookingForm(true);
                                                  } else {
                                                    handleSubmit(undefined, opt.action || opt.label);
                                                  }
                                                }}
                                                className="w-full text-left px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-900 border border-slate-200/70 text-xs font-medium text-slate-800 transition-all flex items-center justify-between cursor-pointer group"
                                              >
                                                <span>{opt.label}</span>
                                                <ArrowRight size={12} strokeWidth={1.5} className="text-slate-400 group-hover:text-purple-900 group-hover:translate-x-0.5 transition-transform" />
                                              </button>
                                            ))}
                                          </div>
                                        )}

                                        {/* AI Subtle timestamp beneath the message inside the white bubble */}
                                        <div className="text-[9px] text-slate-400 font-mono select-none text-right pt-0.5">
                                          {msg.time}
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              );
                            })()
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Typing Indicators */}
              <AnimatePresence mode="wait">
                {(consultingStage === 'analyzing' || consultingStage === 'synthesizing') && (
                  <motion.div
                    key={consultingStage}
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.22 }}
                    className="flex justify-start animate-fade-in"
                  >
                    <div className="bg-white border border-slate-100 shadow-xs rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-2.5">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-900 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-900 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-900 animate-bounce" />
                      </div>
                      <span className="text-xs font-sans text-slate-500">
                        {consultingStage === 'analyzing' ? 'Chestaa sedang mengetik...' : 'Chestaa sedang merumuskan solusi...'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Discovery Booking Form */}
              {showBookingForm && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleBookingSubmit}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-md font-sans text-left"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-mono font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Calendar size={13} strokeWidth={1.5} className="text-purple-900" />
                      Jadwal Discovery Call (15 Menit)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-700 mb-1">
                      Nama / Perusahaan
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Budi (PT Sejahtera)"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-900 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="081234567890"
                      value={bookingPhone}
                      onChange={handlePhoneChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-hidden focus:border-purple-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-700 mb-1">
                      Pilih Tanggal
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {upcomingDates.map(item => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setBookingDate(item.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono text-center cursor-pointer transition-all ${
                            bookingDate === item.value
                              ? 'bg-purple-900 text-white font-medium shadow-2xs'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-mono font-medium transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>Konfirmasi Konsultasi</span>
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </button>
                </motion.form>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Smart Scroll Pill: Appears when new streaming text arrives while user is reading history */}
            <AnimatePresence>
              {showScrollBottomPill && (
                <div className="relative w-full flex justify-center pointer-events-none -mt-10 mb-2 z-30">
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.94 }}
                    onClick={() => scrollToBottom(true)}
                    className="pointer-events-auto px-4 py-1.5 rounded-full bg-purple-900/90 text-white text-[11px] font-mono backdrop-blur-md shadow-xl border border-purple-800/40 flex items-center gap-2 cursor-pointer hover:bg-purple-950 transition-colors active:scale-95"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span>Respon baru masuk • Lihat ke bawah ↓</span>
                  </motion.button>
                </div>
              )}
            </AnimatePresence>

            {/* Quick Action Chips: Above input console, scrollable row of pill suggestion chips */}
            <div className="px-4 py-2 bg-white border-t border-slate-150 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {dynamicChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isTyping || isStreaming}
                    onClick={() => {
                      userIsReadingHistoryRef.current = false;
                      isAtBottomRef.current = true;
                      setShowScrollBottomPill(false);
                      if (chip.toLowerCase().includes('jadwal') || chip.toLowerCase().includes('call')) {
                        setShowBookingForm(true);
                      } else {
                        handleSubmit(undefined, chip);
                      }
                    }}
                    className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-purple-900 hover:text-white border border-purple-200 text-purple-900 shadow-2xs transition-all duration-200 cursor-pointer disabled:opacity-40 active:scale-95 flex items-center justify-center"
                  >
                    <span className="whitespace-nowrap">{chip}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Console: Clean, flat pill-shape rounded-full containing text field and send icon */}
            <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center shrink-0 pb-[env(safe-area-inset-bottom)]">
              <div className="w-full rounded-full bg-slate-50 border border-slate-200/60 px-4 py-1.5 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(!showBookingForm)}
                  className="p-1 rounded-full text-slate-500 hover:text-purple-900 hover:bg-slate-200/50 transition-colors shrink-0 cursor-pointer"
                  title="Jadwalkan Discovery Call"
                >
                  <Calendar size={18} strokeWidth={1.5} />
                </button>

                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="flex-1 flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Tulis pesan..."
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-0 py-1"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    aria-label="Kirim"
                    className="p-1.5 rounded-full text-purple-900 hover:text-purple-950 disabled:opacity-30 transition-all cursor-pointer shrink-0 active:scale-95 flex items-center justify-center bg-transparent"
                  >
                    <Send size={16} strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
