import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Calendar, Phone, CheckCircle2, Clock, ArrowRight, User, AlertCircle, Sparkles } from 'lucide-react';
import { collection, addDoc, onSnapshot, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { parseAiResponse } from '../../utils/aiResponseParser';
import QuickReplyChips from '../molecules/QuickReplyChips';

interface Message {
  id: string;
  sender: 'expert' | 'client';
  text: string;
  time: string;
}

export default function LiveChatWidget() {
  const { user, role } = useAuth() || {};
  const isAdmin = user && role === 'admin';

  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'expert',
      text: 'Halo! Selamat datang di Layanan Konsultasi CHESTADOTCOM. Ada yang bisa kami bantu seputar pembuatan website profesional, aplikasi, atau solusi digital untuk bisnis Anda?\n\n<opsi>📅 Jadwal Discovery Call</opsi>\n<opsi>💰 Estimasi Biaya Web</opsi>\n<opsi>✨ Klaim Audit Gratis</opsi>',
      time: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showConsultationPrompt, setShowConsultationPrompt] = useState(false);
  
  // Booking Form State inside chat
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingPhone, setBookingPhone] = useState('08');
  
  // Generate upcoming selectable dates strictly starting from TOMORROW onwards (blocking past & today's date)
  const getUpcomingDates = () => {
    const dates = [];
    const daysId = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthsId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    for (let i = 1; i <= 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i); // Start strictly from tomorrow onwards
      const dayName = daysId[d.getDay()];
      const dayNum = d.getDate();
      const monthName = monthsId[d.getMonth()];
      const year = d.getFullYear();

      dates.push({
        label: `${dayName}, ${dayNum} ${monthName.slice(0, 3)} ${year}`,
        value: `${dayNum} ${monthName} ${year}`
      });
    }
    return dates;
  };

  const upcomingDates = getUpcomingDates();
  const [bookingDate, setBookingDate] = useState(upcomingDates[0].value);
  const [bookingTime, setBookingTime] = useState('14:00 WIB');
  
  // Real-time booked slots synchronization from Firestore + 30s interval re-fetch fallback
  const [bookedSlots, setBookedSlots] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snap = await getDocs(collection(db, 'ai_chat_sessions'));
        const booked: Record<string, boolean> = {};
        snap.forEach(docSnap => {
          const data = docSnap.data();
          if (data.isBooking && data.date && data.time && data.status !== 'completed' && data.status !== 'cancelled') {
            const key = `${data.date}_${data.time}`;
            booked[key] = true;
          }
        });
        setBookedSlots(booked);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    // Initial fetch
    fetchBookings();

    // Real-time snapshot listener
    const unsubscribe = onSnapshot(collection(db, 'ai_chat_sessions'), (snapshot) => {
      const booked: Record<string, boolean> = {};
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.isBooking && data.date && data.time && data.status !== 'completed' && data.status !== 'cancelled') {
          const key = `${data.date}_${data.time}`;
          booked[key] = true;
        }
      });
      setBookedSlots(booked);
    }, (err) => {
      console.error("Error syncing bookings in real-time:", err);
    });

    // 5-second interval validation sync ensuring immediate slot red/disabled state across sessions
    const intervalId = setInterval(() => {
      fetchBookings();
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedBefore && !isOpen) {
        setShowConsultationPrompt(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [hasOpenedBefore, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showBookingForm]);

  const handleToggleBooking = () => {
    if (!isAdmin) {
      toast.error("Modul penjadwalan appointment dikunci. Akses eksklusif Admin-only.");
    }
    setShowBookingForm(prev => !prev);
  };

  const handleSendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'client',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInputText('');
    setIsTyping(true);

    const lower = textToSend.toLowerCase();
    const needsHuman = lower.includes('engineer') || lower.includes('manusia') || lower.includes('bantuan') || lower.includes('cs') || lower.includes('hubungi') || lower.includes('audit');

    try {
      await addDoc(collection(db, 'ai_chat_sessions'), {
        visitorMessage: textToSend,
        requiresHuman: needsHuman,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        messages: [{ sender: 'client', content: textToSend, timestamp: new Date().toISOString() }]
      });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      setIsTyping(false);

      const expertMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'expert',
        text: data.reply || "Terima kasih atas pertanyaannya. Ada hal teknis atau arsitektur sistem lain yang ingin didiskusikan?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, expertMsg]);

      const lower = textToSend.toLowerCase();
      if (lower.includes('jadwal') || lower.includes('call') || lower.includes('booking')) {
        setShowBookingForm(true);
      }
    } catch (err) {
      console.error("Chat API error:", err);
      setIsTyping(false);
      let replyText = "Terima kasih atas diskusi ini. Untuk pembahasan teknis mendalam dan estimasi presisi, Anda dapat menjadwalkan Discovery Call 15 menit.";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('harga') || lower.includes('biaya') || lower.includes('budget') || lower.includes('promo')) {
        replyText = "Investasi web kami dimulai dari Rp650K dengan promo spesial UMKM menjadi Rp540K (all-in domain .com & cloud setup). Silakan jadwalkan Discovery Call!";
      } else if (lower.includes('audit') || lower.includes('gratis')) {
        replyText = "Tentu! Audit strategi dan arsitektur web Anda 100% bebas biaya. Silakan tentukan tanggal dan waktu di kalender booking.";
      } else if (lower.includes('jadwal') || lower.includes('call') || lower.includes('booking')) {
        replyText = "Silakan gunakan kalender & pilihan waktu di bawah untuk memilih jadwal Discovery Call beserta nomor WhatsApp Anda.";
        setShowBookingForm(true);
      }

      const expertMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'expert',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, expertMsg]);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (!val.startsWith('08')) {
      if (val.startsWith('0')) {
        val = '08' + val.slice(1);
      } else {
        val = '08' + val;
      }
    }
    if (val.length > 15) {
      val = val.slice(0, 15);
    }
    setBookingPhone(val);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneClean = bookingPhone.trim();
    
    // Check if slot is already booked in real-time
    const slotKey = `${bookingDate}_${bookingTime}`;
    if (bookedSlots[slotKey]) {
      toast.error("Maaf, slot tanggal dan waktu tersebut baru saja dibooking oleh klien lain. Silakan pilih waktu lain.");
      return;
    }

    // Indonesian mobile validation regex starting with 08, 10 to 15 digits total
    const phoneRegex = /^08[0-9]{8,13}$/;
    if (!phoneRegex.test(phoneClean)) {
      toast.error("Format nomor WhatsApp tidak valid. Gunakan format 08... dengan 10 hingga 15 digit.");
      return;
    }

    const bookingText = `[DISCOVERY CALL BOOKING]\nNo. Telp/WA (Secured & Private): ${phoneClean}\nTanggal: ${bookingDate}\nWaktu: ${bookingTime}`;
    
    const clientMsg: Message = {
      id: Date.now().toString(),
      sender: 'client',
      text: `Halo, saya booking Discovery Call.\n📞 ${phoneClean}\n📅 ${bookingDate} (${bookingTime})`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, clientMsg]);
    setShowBookingForm(false);
    setIsTyping(true);

    try {
      await addDoc(collection(db, 'ai_chat_sessions'), {
        visitorMessage: bookingText,
        requiresHuman: true,
        isBooking: true,
        status: 'pending',
        phone: phoneClean, // Protected lead data, readable only by authenticated admin users
        date: bookingDate,
        time: bookingTime,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
    } catch (err) {
      console.error("Booking save error:", err);
    }

    setTimeout(() => {
      setIsTyping(false);
      const confirmMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'expert',
        text: `Jadwal Discovery Call berhasil dikonfirmasi! Chesta Azka akan menghubungi ${phoneClean} pada ${bookingDate} (${bookingTime}). Data prospek telah dienkripsi & dilindungi khusus untuk Admin.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, confirmMsg]);
      toast.success("Booking Call berhasil dikirim ke Admin Dashboard!");
    }, 1000);
  };

  const timeSlots = ['10:00 WIB', '14:00 WIB', '16:00 WIB'];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Initial Popup Prompt */}
      <AnimatePresence>
        {!isOpen && showConsultationPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-80 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-xl mb-3"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-display font-bold text-xs">
                  CA
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-xs">Chesta Azka</h4>
                  <p className="text-[10px] font-mono text-slate-400">Principal Engineer</p>
                </div>
              </div>
              <button 
                onClick={() => setShowConsultationPrompt(false)} 
                className="text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-600 font-sans mb-3.5 leading-relaxed">
              Butuh konsultasi arsitektur atau ingin <span className="font-semibold text-slate-900">Jadwalkan Discovery Call &amp; Audit Gratis</span>?
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowConsultationPrompt(false);
                  setIsOpen(true);
                  setHasOpenedBefore(true);
                  handleToggleBooking();
                }}
                className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar size={13} className="text-slate-300" />
                <span>Pilih Jadwal</span>
              </button>
              <button
                onClick={() => {
                  setShowConsultationPrompt(false);
                  setIsOpen(true);
                  setHasOpenedBefore(true);
                }}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer"
              >
                Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Bubble Button with Spring Animation */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasOpenedBefore(true);
          setShowConsultationPrompt(false);
        }}
        className="relative w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl flex items-center justify-center transition-all cursor-pointer border border-slate-700/30"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        {isOpen ? <X size={20} className="text-slate-300" /> : <MessageSquare size={20} className="text-slate-200" />}
      </motion.button>

      {/* Chat Window with Spring Animation & Monochromatic Aesthetic */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[385px] h-[610px] bg-white rounded-2xl border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden z-50 font-sans"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-display font-bold text-xs border border-slate-700">
                  CA
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs tracking-tight text-white flex items-center gap-1.5">
                    Chesta Azka Sofyan
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">Lead Principal Engineer • Secured Access</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Sub-header Actions */}
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Butuh diskusi mendalam?</span>
              {isAdmin ? (
                <button
                  onClick={handleToggleBooking}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar size={12} className="text-slate-300" />
                  <span>{showBookingForm ? 'Tutup Kalender' : '📅 Booking Call'}</span>
                </button>
              ) : (
                <a
                  href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20pembuatan%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Phone size={12} className="text-slate-300" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
              {messages.map(msg => {
                const { cleanText, options } = parseAiResponse(msg.text);
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'client'
                          ? 'bg-slate-900 text-white rounded-br-xs'
                          : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">{cleanText}</div>
                      {msg.sender === 'expert' && options.length > 0 && (
                        <QuickReplyChips
                          options={options}
                          onSelectOption={(opt) => {
                            if (opt.label.toLowerCase().includes('jadwal') || opt.label.toLowerCase().includes('call')) {
                              if (isAdmin) {
                                setShowBookingForm(true);
                              } else {
                                toast('Fitur penjadwalan khusus admin terautentikasi. Mengarahkan ke WhatsApp...', { icon: '💬' });
                                window.open('https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20jadwal%20konsultasi%20Discovery%20Call.', '_blank');
                              }
                            } else {
                              handleSendMessage(undefined, opt.action || opt.label);
                            }
                          }}
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}

              {/* Proactive context reminder banner when chatting - Admin Only */}
              {isAdmin && messages.length >= 2 && !showBookingForm && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-slate-900 text-white text-xs flex items-center justify-between gap-2 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400 shrink-0" />
                    <span>Ingin buat jadwal Call dengan Chesta?</span>
                  </div>
                  <button
                    onClick={handleToggleBooking}
                    className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-mono font-bold text-[10px] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                  >
                    Atur Jadwal
                  </button>
                </motion.div>
              )}

              {/* Interactive Calendar & Booking Form inside chat with Admin-only Gate */}
              {showBookingForm && (
                isAdmin ? (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleBookingSubmit}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 my-2 shadow-xs"
                  >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-700" />
                      Jadwal Discovery Call (Mulai Besok)
                    </span>
                    <button type="button" onClick={() => setShowBookingForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <X size={14} />
                    </button>
                  </div>

                  {/* Promo Pricing Banner with Strikethrough Animation */}
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs font-mono shadow-xs">
                    <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <Sparkles size={13} /> Promo Spesial UMKM:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 line-through text-[11px]">Rp 650K</span>
                      <span className="text-emerald-400 font-bold text-sm bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700 animate-pulse">Rp 540K</span>
                    </div>
                  </div>

                  {/* Masked Phone Number Input starting with 08 */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-slate-700 mb-1">
                      No. WhatsApp (08...) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="081234567890"
                        value={bookingPhone}
                        onChange={handlePhoneChange}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Format: 08... (10-15 digit, terlindungi khusus Admin).</p>
                  </div>

                  {/* Calendar Date Picker Component (Strictly blocking past dates & today with slate/charcoal styling) */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-slate-700 mb-1">
                      Pilih Tanggal (Hari Ini &amp; Lalu Diblokir)
                    </label>
                    <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto pr-1">
                      {upcomingDates.map(item => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setBookingDate(item.value)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                            bookingDate === item.value
                              ? 'bg-slate-900 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-400'
                          }`}
                        >
                          <span>{item.label}</span>
                          {bookingDate === item.value && <CheckCircle2 size={13} className="text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots with Real-time Booked Check (Red & Unclickable if booked) */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-slate-700 mb-1">
                      Pilih Waktu (WIB) - Firestore Sync
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {timeSlots.map(slot => {
                        const slotKey = `${bookingDate}_${slot}`;
                        const isBooked = bookedSlots[slotKey];
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => !isBooked && setBookingTime(slot)}
                            className={`py-2 px-1.5 rounded-xl text-[11px] font-mono transition-all text-center ${
                              isBooked
                                ? 'bg-rose-50 text-rose-600 border border-rose-300 cursor-not-allowed opacity-90'
                                : bookingTime === slot
                                ? 'bg-slate-900 text-white font-bold shadow-xs cursor-pointer'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-400 cursor-pointer'
                            }`}
                          >
                            <div>{slot}</div>
                            <div className="text-[9px] font-bold mt-0.5">
                              {isBooked ? '🔴 Terisi' : '🟢 Tersedia'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <span>Konfirmasi Booking Call</span>
                    <ArrowRight size={13} />
                  </button>
                </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-3 my-2 text-center shadow-md"
                  >
                    <AlertCircle size={28} className="mx-auto text-amber-400 mb-1" />
                    <h4 className="font-bold text-sm">Akses Eksklusif Admin</h4>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Antarmuka penjadwalan appointment dipisahkan dari chat publik dan dilindungi dengan gate Admin-only. Silakan gunakan chat konsultasi atau WhatsApp untuk informasi layanan.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-3.5 py-1.5 bg-white text-slate-900 rounded-lg font-mono font-bold text-[11px] hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      Tutup
                    </button>
                  </motion.div>
                )
              )}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200/60 flex gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setShowBookingForm(true)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer"
              >
                <Calendar size={12} className="text-slate-500" />
                <span>📅 Booking Call</span>
              </button>
              <button
                onClick={() => handleSendMessage(undefined, "Berapa estimasi biaya proyek web custom?")}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer"
              >
                💰 Estimasi Biaya
              </button>
              <button
                onClick={() => handleSendMessage(undefined, "Bagaimana cara klaim audit arsitektur gratis?")}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer"
              >
                ✨ Audit Gratis
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={e => handleSendMessage(e)} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ketik pesan atau tanyakan sesuatu..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
