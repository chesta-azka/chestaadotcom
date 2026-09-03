import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Bot, X, Send, MessageCircle, ArrowRight, Sparkles, HelpCircle, ChevronRight } from 'lucide-react';
import { db, logAnalyticsEvent } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const floatingSpringTransition = {
  type: 'spring' as const,
  mass: 1.3,
  stiffness: 150,
  damping: 28, // High damping factor for weighty, premium movement
};

const assistantButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...floatingSpringTransition,
      delay: 0.35,
    },
  },
};

export interface ActionButton {
  label: string;
  actionType: 'prompt' | 'whatsapp' | 'link';
  value: string;
  variant?: 'whatsapp' | 'primary' | 'secondary';
}

export interface FloatingChatMessage {
  id?: string;
  role: 'system' | 'admin' | 'user';
  content: string;
  timestamp: string;
  actions?: ActionButton[];
}

// Quick AI suggestion starters always visible above input
const QUICK_AI_SUGGESTIONS = [
  {
    label: '💰 Promo Web Rp540K',
    prompt: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
  },
  {
    label: '⏱️ Waktu Pengerjaan',
    prompt: 'Berapa lama waktu pengerjaan website sampai siap online?',
  },
  {
    label: '📋 Alur Pemesanan',
    prompt: 'Bagaimana langkah mudah memesan website di CHESTADOTCOM?',
  },
  {
    label: '⚡ Keunggulan Next.js',
    prompt: 'Mengapa website Next.js lebih cepat dan aman dibanding platform biasa?',
  },
  {
    label: '🎨 Lihat Portofolio',
    prompt: 'Boleh lihat contoh portofolio website yang pernah dibuat?',
  },
  {
    label: '💬 Chat WA Mas Chesta',
    whatsapp: 'Halo Mas Chesta! Saya ingin konsultasi seputar pembuatan website di CHESTADOTCOM.',
  },
];

function getStructuredAIResponse(userInput: string): { content: string; actions: ActionButton[] } {
  const q = userInput.toLowerCase();

  // Biaya / Harga / Paket / Promo
  if (/(harga|biaya|price|pricing|paket|promo|diskon|tarif|cost|budget|murah|bayar|nominal)/.test(q)) {
    return {
      content: `### Paket Pembuatan Website

Kami menyediakan solusi website siap pakai dengan harga transparan tanpa biaya tersembunyi:

• **Paket Promo UMKM**: **Rp540.000** *(Harga normal Rp650.000)*
  - Termasuk domain resmi **.com** selama 1 tahun.
  - Server cloud cepat & sertifikat SSL HTTPS (aman).
  - Desain modern, responsif untuk smartphone & laptop.
  - Tombol WhatsApp terhubung langsung ke nomor Anda.
  - Pengerjaan kilat dalam **1–3 hari kerja**.

• **Paket Custom / Bisnis**: Untuk kebutuhan fitur khusus seperti katalog produk, integrasi database, form pemesanan, atau portal artikel.

Seluruh paket berstatus **100% hak milik penuh** tanpa sistem sewa terkunci.`,
      actions: [
        {
          label: '💬 Klaim Promo Rp540K via WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta, saya tertarik klaim Paket Promo Website Rp540K (.com + hosting + pengerjaan 1-3 hari).',
          variant: 'whatsapp',
        },
        {
          label: '⏱️ Berapa hari pengerjaan?',
          actionType: 'prompt',
          value: 'Berapa lama waktu pengerjaan paket promo ini?',
          variant: 'secondary',
        },
        {
          label: '📋 Bagaimana cara pesannya?',
          actionType: 'prompt',
          value: 'Bagaimana langkah mudah memesan website di CHESTADOTCOM?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Waktu / Durasi / Deadline
  if (/(lama|waktu|durasi|hari|kapan|jadwal|deadline|cepat|berapa hari)/.test(q)) {
    return {
      content: `### Estimasi Waktu Pengerjaan

• **Paket Standar & Promo**: Selesai dalam **1 hingga 3 hari kerja**.
• **Paket Kustom**: Estimasi **3 hingga 7 hari kerja** tergantung kompleksitas fitur.

Pengerjaan langsung dimulai setelah materi dasar (nama bisnis, deskripsi, & kontak) kami terima. Kami akan mengirimkan **link live preview** sebelum website resmi diluncurkan.`,
      actions: [
        {
          label: '💬 Konsultasi Jadwal di WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta, saya ingin konsultasi estimasi jadwal pembuatan website untuk bisnis saya.',
          variant: 'whatsapp',
        },
        {
          label: '💰 Berapa rincian biayanya?',
          actionType: 'prompt',
          value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
          variant: 'secondary',
        },
        {
          label: '🎨 Boleh lihat contoh portofolio?',
          actionType: 'prompt',
          value: 'Boleh lihat contoh portofolio website yang pernah dibuat?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Alur / Langkah Pemesanan
  if (/(alur|cara|langkah|pesan|order|proses|workflow|tahap|mulai|step)/.test(q)) {
    return {
      content: `### Alur Pemesanan Website

1. **Konsultasi Kebutuhan**
   Sampaikan konsep, referensi tampilan, atau produk bisnis Anda.

2. **Pemilihan Paket & Domain**
   Pilih paket yang diinginkan dan tentukan nama domain .com Anda.

3. **Pengerjaan & Live Review**
   Website dirakit dengan teknologi Next.js. Kami kirimkan tautan preview untuk Anda tinjau.

4. **Peluncuran (Go-Live)**
   Website resmi dihubungkan ke domain .com dan siap digunakan untuk promosi.`,
      actions: [
        {
          label: '💬 Mulai Order via WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta, saya ingin mulai proses pemesanan website baru.',
          variant: 'whatsapp',
        },
        {
          label: '💰 Rincian Paket Promo Rp540K',
          actionType: 'prompt',
          value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
          variant: 'secondary',
        },
        {
          label: '⚡ Kenapa pakai Next.js?',
          actionType: 'prompt',
          value: 'Mengapa website Next.js lebih cepat dan aman dibanding platform biasa?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Keunggulan Teknologi / Next.js
  if (/(teknologi|tech|next\.?js|stack|kecepatan|speed|pagespeed|wordpress|keunggulan|fitur)/.test(q)) {
    return {
      content: `### Keunggulan Arsitektur Next.js

• **Loading Super Cepat (<1 Detik)**
  Skor Google PageSpeed 95–100 memastikan pengunjung tidak meninggalkan website karena lambat.

• **Keamanan Tinggi**
  Bebas dari celah plugin rentan malware yang sering terjadi pada WordPress biasa.

• **Optimasi SEO Google**
  Struktur HTML otomatis ramah mesin pencari Google agar bisnis lebih mudah ditemukan.

• **Tampilan Responsif**
  Presisi dan nyaman diakses di semua ukuran layar smartphone.`,
      actions: [
        {
          label: '💬 Tanya Teknis di WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta, saya ingin tanya lebih lanjut tentang pembuatan website kustom dengan Next.js.',
          variant: 'whatsapp',
        },
        {
          label: '💰 Berapa Biaya Pembuatannya?',
          actionType: 'prompt',
          value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
          variant: 'secondary',
        },
        {
          label: '⏱️ Berapa lama pengerjaannya?',
          actionType: 'prompt',
          value: 'Berapa lama waktu pengerjaan website sampai siap online?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Domain & Server
  if (/(domain|hosting|server|perpanjang|renewal|tahun kedua|ssl|https|\.com)/.test(q)) {
    return {
      content: `### Domain & Infrastruktur Cloud

• **Tahun Pertama**: Sudah termasuk domain **.com** dan cloud hosting berkecepatan tinggi.
• **Sertifikat SSL**: Otomatis aktif untuk menjamin keamanan transaksi dan reputasi web.
• **Tahun Berikutnya**: Perpanjangan sangat terjangkau mengikuti tarif dasar resmi domain .com tanpa markup memberatkan.
• **Kepemilikan**: Akses dan domain didaftarkan penuh atas nama Anda.`,
      actions: [
        {
          label: '💬 Cek Domain via WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta, saya ingin cek ketersediaan nama domain .com untuk bisnis saya.',
          variant: 'whatsapp',
        },
        {
          label: '📋 Langkah Pemesanan',
          actionType: 'prompt',
          value: 'Bagaimana langkah mudah memesan website di CHESTADOTCOM?',
          variant: 'secondary',
        },
      ],
    };
  }

  // WhatsApp / Kontak Langsung
  if (/(whatsapp|wa|kontak|hubungi|chat|nomor|telepon|admin|mas chesta|chesta)/.test(q)) {
    return {
      content: `### Kontak Langsung Tim CHESTADOTCOM

Anda dapat berdiskusi atau mengirim referensi langsung melalui:

• **WhatsApp**: **0821-2544-7232** *(Respon Cepat)*
• **Email**: chestacode@gmail.com
• **Instagram**: @chestaadotcom

Silakan klik tombol di bawah untuk langsung terhubung ke WhatsApp.`,
      actions: [
        {
          label: '💬 Buka WhatsApp Sekarang (0821-2544-7232)',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta! Saya ingin konsultasi seputar pembuatan website di CHESTADOTCOM.',
          variant: 'whatsapp',
        },
        {
          label: '💰 Lihat Paket Promo Rp540K',
          actionType: 'prompt',
          value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Portofolio / Jenis Website
  if (/(portofolio|contoh|hasil|project|karya|jenis|kategori)/.test(q)) {
    return {
      content: `### Ragam Jenis Website

Kami melayani berbagai kebutuhan website profesional:

• **Company Profile**: Profil perusahaan, kantor jasa, & konsultan.
• **Katalog UMKM**: Toko produk kuliner, fashion, jasa servis, & kerajinan.
• **Landing Page Penjualan**: Halaman promosi khusus dengan konversi tinggi ke WhatsApp.
• **Personal Branding**: Portofolio praktisi, konsultan, & kreator.

Anda juga dapat melihat contoh hasil pengerjaan pada halaman Portofolio.`,
      actions: [
        {
          label: '💬 Konsultasi Desain via WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta, saya ingin konsultasi rekomendasi desain website yang cocok untuk usaha saya.',
          variant: 'whatsapp',
        },
        {
          label: '💰 Rincian Harga Paket',
          actionType: 'prompt',
          value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
          variant: 'secondary',
        },
        {
          label: '⏱️ Berapa lama pengerjaannya?',
          actionType: 'prompt',
          value: 'Berapa lama waktu pengerjaan website sampai siap online?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Konsultan IT
  if (/(konsultan it|it consultant|it consulting|strategi digital|audit sistem|arsitektur it)/.test(q)) {
    return {
      content: `### Konsultan IT & Strategi Digital

Kami menyediakan layanan pendampingan dan audit untuk mentransformasi infrastruktur teknologi bisnis Anda secara profesional:

• **Audit & Roadmap IT**: Menilai kelemahan infrastruktur yang ada dan merancang cetak biru (blueprint) masa depan.
• **Transformasi Cloud & AI**: Panduan migrasi ke sistem awan terpusat (Cloud) dan integrasi agen AI untuk otomasi bisnis.
• **Otomatisasi Alur Kerja**: Memangkas pekerjaan manual rutin lewat solusi ERP mini, API, dan skrip integrasi cerdas.

Jadwalkan sesi konsultasi teknis pertama (gratis) untuk mendiskusikan bottleneck di perusahaan Anda!`,
      actions: [
        {
          label: '💬 Konsultasi IT via WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Tim CHESTA, saya ingin menjadwalkan konsultasi terkait Audit Arsitektur IT dan Strategi Digital perusahaan saya.',
          variant: 'whatsapp',
        },
        {
          label: '📂 Layanan Lainnya',
          actionType: 'prompt',
          value: 'Layanan apa saja yang ditawarkan selain itu?',
          variant: 'secondary',
        },
      ],
    };
  }

  // Default Fallback
  return {
    content: `### Asisten Layanan CHESTADOTCOM

Terima kasih atas pertanyaan Anda. CHESTADOTCOM menyediakan layanan pembuatan website modern dengan arsitektur **Next.js** berkecepatan tinggi.

• **Paket Promo UMKM**: Rp540.000 all-in (Domain .com + Cloud Server + Desain Responsif).
• **Pengerjaan Cepat**: 1–3 hari kerja dengan 100% kepemilikan penuh.
• **Garansi Teknis**: Website bebas error dan didukung tim berpengalaman.

Silakan pilih opsi tombol di bawah agar tidak perlu repot mengetik:`,
    actions: [
      {
        label: '💬 Konsultasi Lanjutan via WhatsApp',
        actionType: 'whatsapp',
        value: `Halo Mas Chesta! Saya ingin konsultasi seputar: "${userInput}"`,
        variant: 'whatsapp',
      },
      {
        label: '💰 Paket Promo Rp540K',
        actionType: 'prompt',
        value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
        variant: 'secondary',
      },
      {
        label: '⏱️ Waktu Pengerjaan (1-3 Hari)',
        actionType: 'prompt',
        value: 'Berapa lama waktu pengerjaan website sampai siap online?',
        variant: 'secondary',
      },
      {
        label: '📋 Langkah Pemesanan',
        actionType: 'prompt',
        value: 'Bagaimana langkah mudah memesan website di CHESTADOTCOM?',
        variant: 'secondary',
      },
    ],
  };
}

/**
 * Enhanced Light & Clean Markdown Renderer with structured line-height and high contrast
 */
function FormattedMessageView({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <p className="text-[13px] sm:text-sm leading-relaxed select-text text-white font-medium">{content}</p>;
  }

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let currentBullets: string[] = [];
  let currentNumbered: { num: string; text: string }[] = [];

  const flushLists = () => {
    if (currentBullets.length > 0) {
      const listItems = [...currentBullets];
      renderedElements.push(
        <ul key={`ul-${renderedElements.length}`} className="my-2.5 space-y-2 text-[13px] sm:text-sm">
          {listItems.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-slate-800 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-2" />
              <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(b) }} />
            </li>
          ))}
        </ul>
      );
      currentBullets = [];
    }

    if (currentNumbered.length > 0) {
      const numItems = [...currentNumbered];
      renderedElements.push(
        <div key={`num-${renderedElements.length}`} className="my-3 space-y-2 text-[13px] sm:text-sm">
          {numItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 text-slate-800"
            >
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {item.num}
              </span>
              <div className="flex-1 text-slate-800 leading-relaxed font-normal">
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.text) }} />
              </div>
            </div>
          ))}
        </div>
      );
      currentNumbered = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushLists();
      continue;
    }

    // Heading: ###
    if (trimmed.startsWith('### ')) {
      flushLists();
      const title = trimmed.replace('### ', '');
      renderedElements.push(
        <h4
          key={`h4-${renderedElements.length}`}
          className="text-sm sm:text-base font-display font-bold text-purple-950 mt-1 mb-2 tracking-tight border-b border-purple-100 pb-1.5 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-3.5 bg-purple-600 rounded-full inline-block shrink-0" />
          <span>{title}</span>
        </h4>
      );
      continue;
    }

    // Numbered step: 1. Title
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      currentNumbered.push({ num: numMatch[1], text: numMatch[2] });
      continue;
    }

    // Bullet point: • or -
    if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
      const bulletText = trimmed.replace(/^[•\-]\s+/, '');
      currentBullets.push(bulletText);
      continue;
    }

    // Standard paragraph
    flushLists();
    renderedElements.push(
      <p
        key={`p-${renderedElements.length}`}
        className="text-[13px] sm:text-sm text-slate-800 leading-relaxed my-1.5"
        dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
      />
    );
  }

  flushLists();

  return <div className="space-y-1.5 select-text">{renderedElements}</div>;
}

function formatInlineMarkdown(text: string): string {
  let formatted = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-slate-950">$1</strong>'
  );
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    '<em class="italic text-slate-700">$1</em>'
  );
  return formatted;
}

export default function FloatingAIAssistant({ isLoaded = true }: { isLoaded?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'sess_default';
    let id = localStorage.getItem('ai_session_id');
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem('ai_session_id', id);
    }
    return id;
  });

  const defaultMessages: FloatingChatMessage[] = [
    {
      role: 'system',
      content: 'Halo! Selamat datang di **CHESTADOTCOM**. Ada yang bisa kami bantu seputar pembuatan website profesional atau integrasi AI? Pilih opsi instan di bawah atau ketik langsung kebutuhan Anda:',
      timestamp: new Date().toISOString(),
      actions: [
        {
          label: '💬 Chat Mas Chesta via WhatsApp',
          actionType: 'whatsapp',
          value: 'Halo Mas Chesta! Saya ingin konsultasi seputar pembuatan website di CHESTADOTCOM.',
          variant: 'whatsapp',
        },
        {
          label: '💰 Biaya Promo Rp540K (.com + Hosting)',
          actionType: 'prompt',
          value: 'Berapa biaya paket promo website dan apa saja fasilitas yang didapat?',
          variant: 'secondary',
        },
        {
          label: '⏱️ Waktu Pengerjaan (1-3 Hari)',
          actionType: 'prompt',
          value: 'Berapa lama waktu pengerjaan website sampai siap online?',
          variant: 'secondary',
        },
        {
          label: '📋 Langkah Pemesanan',
          actionType: 'prompt',
          value: 'Bagaimana langkah mudah memesan website di CHESTADOTCOM?',
          variant: 'secondary',
        },
      ],
    },
  ];

  const [chatHistory, setChatHistory] = useState<FloatingChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('floating_chat_history_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultMessages;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user } = useAuth() || {};

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, chatHistory]);

  useEffect(() => {
    localStorage.setItem('floating_chat_history_v3', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Handle Mobile Virtual Keyboard adjustments & viewport scroll
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && window.visualViewport) {
        scrollToBottom(true);
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('scroll', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOpenChat = (e?: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent<{ message?: string }>;
      if (customEvent?.detail?.message) {
        setTimeout(() => {
          handleSendMessage(undefined, customEvent.detail.message);
        }, 100);
      }
    };

    window.addEventListener('open-ai-chat', handleOpenChat);
    window.addEventListener('open-floating-ai', handleOpenChat);

    return () => {
      window.removeEventListener('open-ai-chat', handleOpenChat);
      window.removeEventListener('open-floating-ai', handleOpenChat);
    };
  }, []);

  const saveToFirestore = async (history: FloatingChatMessage[]) => {
    if (!sessionId) return;
    try {
      const sessionRef = doc(db, 'ai_chat_sessions', sessionId);
      await setDoc(
        sessionRef,
        {
          sessionId,
          messages: history,
          lastUpdated: serverTimestamp(),
          path: location.pathname,
          userEmail: user?.email || 'Guest Client',
        },
        { merge: true }
      );
    } catch (e) {
      // Background sync notification
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || message).trim();
    if (!textToSend || isSubmitting) return;

    setMessage('');
    setIsSubmitting(true);

    const userMsg: FloatingChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    const nextHistory = [...chatHistory, userMsg];
    setChatHistory(nextHistory);

    setTimeout(async () => {
      const { content, actions } = getStructuredAIResponse(textToSend);

      // Ensure every AI message includes an explicit WhatsApp consultation action
      const hasWhatsAppAction = actions.some((a) => a.actionType === 'whatsapp');
      const enhancedActions = hasWhatsAppAction
        ? actions
        : [
            {
              label: '💬 Konsultasi Lanjutan via WhatsApp',
              actionType: 'whatsapp' as const,
              value: `Halo Mas Chesta, saya ingin konsultasi lebih lanjut mengenai: "${textToSend}"`,
              variant: 'whatsapp' as const,
            },
            ...actions,
          ];

      const aiResponse: FloatingChatMessage = {
        role: 'admin',
        content,
        timestamp: new Date().toISOString(),
        actions: enhancedActions,
      };

      const finalHistory = [...nextHistory, aiResponse];
      setChatHistory(finalHistory);
      await saveToFirestore(finalHistory);
      setIsSubmitting(false);
    }, 350);
  };

  const openWhatsAppUrl = (customText?: string) => {
    const defaultMsg = 'Halo Mas Chesta! Saya ingin konsultasi seputar pembuatan website dan solusi AI di CHESTADOTCOM.';
    const encoded = encodeURIComponent(customText || defaultMsg);
    window.open(`https://wa.me/6282125447232?text=${encoded}`, '_blank', 'noopener,noreferrer');
    logAnalyticsEvent('click_whatsapp_from_ai', { context: customText || 'general' });
  };

  const directWhatsAppLink = `https://wa.me/6282125447232?text=${encodeURIComponent(
    'Halo Mas Chesta! Saya ingin konsultasi seputar pembuatan website dan solusi AI di CHESTADOTCOM.'
  )}`;

  return (
    <>
      {/* Floating Assistant Modal with Light & Clean Theme (#floating-ai-assistant) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="floating-ai-assistant"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-8 w-full sm:w-[430px] h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh-110px)] z-50 flex flex-col bg-white sm:rounded-3xl border-0 sm:border sm:border-purple-100 shadow-2xl sm:shadow-[0_24px_60px_rgba(107,33,168,0.14)] overflow-hidden font-sans"
          >
            {/* Header: Pure Clean White with Crisp Subtle Purple Accent */}
            <div className="px-4 sm:px-5 py-3.5 border-b border-purple-100 bg-white flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm text-slate-950 leading-tight">
                      CHESTADOTCOM AI
                    </h3>
                    <span className="px-1.5 py-0.2 rounded bg-purple-50 border border-purple-200 text-[10px] font-semibold text-purple-700">
                      Online
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-slate-500 font-medium">Asisten Konsultasi Siap Membantu</span>
                  </div>
                </div>
              </div>

              <button
                id="assistant-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-1.5 text-slate-400 hover:text-slate-800 active:text-slate-950 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                title="Tutup Asisten"
                aria-label="Tutup Asisten"
              >
                <X size={20} className="sm:w-5 sm:h-5 text-slate-600" />
              </button>
            </div>

            {/* Scrollable Message Feed: Light & Clean with Pure White Bubble Styling */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 custom-scrollbar bg-slate-50/50 overscroll-contain"
            >
              {chatHistory.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
                  >
                    {/* Message Bubble: Pure White for AI with High-Contrast Text & Crisp Subtle Purple Border */}
                    <div
                      className={`max-w-[94%] sm:max-w-[90%] px-4 py-3.5 rounded-2xl ${
                        isUser
                          ? 'bg-purple-900 text-white rounded-tr-xs shadow-xs font-sans'
                          : 'bg-white text-slate-900 rounded-tl-xs border border-purple-100 shadow-[0_2px_12px_rgba(107,33,168,0.04)] font-sans'
                      }`}
                    >
                      <FormattedMessageView content={msg.content} isUser={isUser} />
                    </div>

                    {/* Integrated Action Buttons & Guaranteed WhatsApp Quick-Action CTA */}
                    {!isUser && msg.actions && msg.actions.length > 0 && (
                      <div className="max-w-[98%] sm:max-w-[92%] flex flex-wrap gap-1.5 pt-1">
                        {msg.actions.map((action, aIdx) => {
                          if (action.actionType === 'whatsapp') {
                            return (
                              <button
                                key={aIdx}
                                onClick={() => openWhatsAppUrl(action.value)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-sans text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer group"
                              >
                                <MessageCircle size={13} className="text-white shrink-0" />
                                <span className="text-white">{action.label}</span>
                                <ArrowRight size={12} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
                              </button>
                            );
                          }

                          return (
                            <button
                              key={aIdx}
                              onClick={() => handleSendMessage(undefined, action.value)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 active:bg-purple-100 text-purple-950 hover:text-purple-900 border border-purple-200 font-sans text-xs font-medium transition-all cursor-pointer text-left shadow-2xs"
                            >
                              <span>{action.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {isSubmitting && (
                <div className="flex items-center gap-2 text-xs font-sans text-purple-900 px-3 py-1.5 bg-white rounded-xl border border-purple-100 w-fit shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                  <span className="text-slate-600 text-xs font-medium">Menyiapkan jawaban untuk Anda...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sticky Mobile Bottom Area: Always Visible Suggestions Bar + Fixed Input Form */}
            <div className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-purple-100 shadow-[0_-4px_20px_rgba(107,33,168,0.06)]">
              {/* Prominent 'Chat with AI' Quick Suggestion Bar */}
              <div className="px-3 pt-2.5 pb-1.5 border-b border-purple-50 bg-purple-50/30 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                <div className="flex items-center gap-1 text-[11px] font-bold text-purple-900 shrink-0 select-none pl-1">
                  <Sparkles size={12} className="text-purple-600 shrink-0" />
                  <span>Saran:</span>
                </div>

                {QUICK_AI_SUGGESTIONS.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      if (sug.whatsapp) {
                        openWhatsAppUrl(sug.whatsapp);
                      } else if (sug.prompt) {
                        handleSendMessage(undefined, sug.prompt);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-purple-100/80 active:bg-purple-200/70 text-purple-950 border border-purple-200/90 text-xs font-medium shrink-0 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                  >
                    <span>{sug.label}</span>
                  </button>
                ))}
              </div>

              {/* Message Input Form with Mobile Focus Resilience */}
              <form
                onSubmit={handleSendMessage}
                className="p-2.5 sm:p-3.5 bg-white flex items-center gap-2 shrink-0"
              >
                <input
                  id="floating-assistant-input"
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => {
                    setTimeout(() => scrollToBottom(true), 200);
                  }}
                  placeholder="Tulis pertanyaan seputar website..."
                  className="flex-1 px-4 py-2.5 sm:py-2.5 rounded-full bg-purple-50/40 text-slate-950 placeholder:text-slate-400 text-sm border border-purple-200/90 focus:border-purple-600 focus:bg-white outline-none transition-all font-sans font-medium"
                  disabled={isSubmitting}
                />
                <button
                  id="floating-assistant-send-btn"
                  type="submit"
                  disabled={!message.trim() || isSubmitting}
                  className="p-2.5 sm:p-3 rounded-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:opacity-30 text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                  title="Kirim Pesan"
                  aria-label="Kirim Pesan"
                >
                  <Send size={15} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Buttons (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 pointer-events-auto">
        {/* Floating AI Assistant Trigger (#floating-assistant-trigger-btn) */}
        <motion.button
          id="floating-assistant-trigger-btn"
          onClick={() => {
            const nextState = !isOpen;
            setIsOpen(nextState);
            if (nextState) {
              logAnalyticsEvent('open_ai_assistant', { source: 'floating_button' });
            }
          }}
          variants={assistantButtonVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="flex items-center justify-center rounded-full bg-white text-purple-950 border border-purple-200/90 p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(107,33,168,0.18)] hover:border-purple-400 hover:shadow-[0_14px_35px_rgba(107,33,168,0.25)] transition-all duration-200 cursor-pointer group"
          whileHover={{
            scale: 1.06,
            y: -2,
            transition: { type: 'spring', stiffness: 400, damping: 20 },
          }}
          whileTap={{
            scale: 0.94,
            transition: { type: 'spring', stiffness: 400, damping: 20 },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? 'Tutup Asisten' : 'Buka Asisten AI'}
        >
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X size={20} className="text-purple-900" />
            ) : (
              <Bot size={20} className="text-purple-900 group-hover:scale-110 transition-transform" />
            )}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>

          <AnimatePresence>
            {!isOpen && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-sans text-xs font-semibold overflow-hidden whitespace-nowrap"
              >
                <span className="ml-2.5 mr-1 text-slate-800 flex items-center gap-1.5">
                  <span>Tanya AI</span>
                  <Sparkles size={12} className="text-purple-600 animate-pulse" />
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
