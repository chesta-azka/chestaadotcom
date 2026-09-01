"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, Copy, Check, QrCode, ShieldCheck, 
  X, Send, RefreshCw, CheckCircle2,
  Building, Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import confetti from 'canvas-confetti';

export interface DirectTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
  initialService?: string;
  initialAmount?: number;
  initialNominal?: number;
  clientName?: string;
}

const PAYMENT_PRESETS = [
  { id: 'landing', name: 'Paket Basic / Landing Page', price: 2500000, popular: false },
  { id: 'starter', name: 'Paket UMKM Starter & SEO', price: 5000000, popular: true },
  { id: 'ecommerce', name: 'E-Commerce Full-Stack', price: 10000000, popular: false },
  { id: 'enterprise', name: 'Custom Enterprise & Agentic AI', price: 15000000, popular: false },
];

export default function DirectTransferModal({
  isOpen,
  onClose,
  initialPackage,
  initialService,
  initialAmount,
  initialNominal,
  clientName: initialClientName = '',
}: DirectTransferModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'bca' | 'mandiri' | 'ewallet' | 'qris'>('bca');
  const [paymentType, setPaymentType] = useState<'dp' | 'full' | 'custom'>('dp');
  const effectivePackage = initialPackage || initialService || 'starter';
  const effectiveAmount = initialAmount || initialNominal || 5000000;
  const [selectedPackage, setSelectedPackage] = useState<string>(effectivePackage);
  const [customAmount, setCustomAmount] = useState<number>(effectiveAmount);
  const [uniqueCode] = useState<number>(() => Math.floor(Math.random() * 890) + 110);
  
  // Client confirmation state
  const [clientName, setClientName] = useState<string>(initialClientName);
  const [clientPhone, setClientPhone] = useState<string>('');
  const [transferNotes, setTransferNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialAmount || initialNominal) {
      setCustomAmount(initialAmount || initialNominal || 5000000);
    }
    if (initialPackage || initialService) {
      setSelectedPackage(initialPackage || initialService || 'starter');
    }
  }, [initialAmount, initialNominal, initialPackage, initialService]);

  const basePrice = paymentType === 'custom' 
    ? customAmount 
    : (PAYMENT_PRESETS.find(p => p.id === selectedPackage)?.price || 5000000);

  const finalPrice = paymentType === 'dp' 
    ? Math.round(basePrice * 0.5) + uniqueCode 
    : basePrice + uniqueCode;

  const formattedFinalPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(finalPrice);

  const handleCopy = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} berhasil disalin!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleWhatsAppConfirm = () => {
    const selectedPkgName = PAYMENT_PRESETS.find(p => p.id === selectedPackage)?.name || 'Solusi Kustom';
    const methodNames = {
      bca: 'Bank Central Asia (BCA) - 8735-0921-44',
      mandiri: 'Bank Mandiri - 137-00-2819-3821',
      ewallet: 'GoPay / DANA - 0821-2544-7232',
      qris: 'QRIS Satset Instant',
    };

    const text = encodeURIComponent(
      `Halo Tim CHESTADOTCOM,\n\n` +
      `Saya ingin konfirmasi Direct Transfer:\n` +
      `• Nama Klien: ${clientName || 'Klien'}\n` +
      `• No. WhatsApp: ${clientPhone || '-'}\n` +
      `• Layanan / Paket: ${selectedPkgName}\n` +
      `• Skema Pembayaran: ${paymentType === 'dp' ? 'Down Payment (DP 50%)' : paymentType === 'full' ? 'Pelunasan Penuh 100%' : 'Nominal Kustom'}\n` +
      `• Total Ditransfer: ${formattedFinalPrice} (Termasuk Kode Unik #${uniqueCode})\n` +
      `• Metode Pembayaran: ${methodNames[selectedMethod]}\n` +
      `• Catatan Tambahan: ${transferNotes || 'Mohon verifikasi dan konfirmasi penerimaan.'}\n\n` +
      `Terima kasih!`
    );

    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      toast.error('Harap lengkapi Nama dan No. WhatsApp Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedPkgName = PAYMENT_PRESETS.find(p => p.id === selectedPackage)?.name || 'Solusi Kustom';
      
      await addDoc(collection(db, 'ai_leads'), {
        name: clientName.trim(),
        phone: clientPhone.trim(),
        email: `${clientName.toLowerCase().replace(/\s+/g, '')}@client.chesta.id`,
        package: selectedPkgName,
        paymentScheme: paymentType,
        nominal: finalPrice,
        uniqueCode,
        paymentMethod: selectedMethod,
        notes: transferNotes.trim(),
        status: 'PAYMENT_SUBMITTED',
        source: 'Direct Transfer Modal',
        createdAt: serverTimestamp(),
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      setIsSuccessSubmitted(true);
      toast.success('Konfirmasi pembayaran berhasil dikirim! Tim kami segera memverifikasi.');
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengirim data. Silakan hubungi kami langsung via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative w-full max-w-3xl bg-white border border-purple-100 rounded-3xl shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 bg-purple-50/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-xs">
                <CreditCard size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-display font-bold text-slate-900 tracking-tight">
                    Direct Transfer & E-Wallet
                  </h2>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                    Satset &bull; 0% Fee
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Pembayaran transfer langsung tanpa ribet &bull; Konfirmasi instan via WhatsApp
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Step 1: Pilih Paket & Skema Pembayaran */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-[10px] font-black">1</span>
                  Pilih Layanan / Paket Proyek
                </label>
                <span className="text-[11px] text-purple-900 font-semibold">
                  Mulai Rp 2.500.000
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PAYMENT_PRESETS.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      if (paymentType === 'custom') setPaymentType('dp');
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                      selectedPackage === pkg.id && paymentType !== 'custom'
                        ? 'border-purple-900 bg-purple-50 text-purple-950 ring-1 ring-purple-900/20'
                        : 'border-purple-100 bg-white text-slate-700 hover:border-purple-200'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-900 text-white">
                        Populer
                      </span>
                    )}
                    <div>
                      <span className="font-bold text-xs block">{pkg.name}</span>
                      <span className="text-xs text-slate-500">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(pkg.price)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Scheme Radio Toggle */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-600 block mb-2">
                  Skema Pembayaran:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentType('dp')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 border ${
                      paymentType === 'dp'
                        ? 'bg-purple-900 text-white border-purple-900 shadow-2xs'
                        : 'bg-white text-slate-600 border-purple-100'
                    }`}
                  >
                    <span>DP 50% di Awal</span>
                    <span className="text-[10px] font-normal opacity-80">Mulai Pengerjaan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('full')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 border ${
                      paymentType === 'full'
                        ? 'bg-purple-900 text-white border-purple-900 shadow-2xs'
                        : 'bg-white text-slate-600 border-purple-100'
                    }`}
                  >
                    <span>Full 100%</span>
                    <span className="text-[10px] font-normal opacity-80">Pelunasan Penuh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('custom')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 border ${
                      paymentType === 'custom'
                        ? 'bg-purple-900 text-white border-purple-900 shadow-2xs'
                        : 'bg-white text-slate-600 border-purple-100'
                    }`}
                  >
                    <span>Nominal Kustom</span>
                    <span className="text-[10px] font-normal opacity-80">Sesuai Tagihan</span>
                  </button>
                </div>

                {paymentType === 'custom' && (
                  <div className="mt-2.5">
                    <label className="text-xs text-slate-500 block mb-1">
                      Masukkan Nominal Transfer (Rp):
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Number(e.target.value) || 0)}
                      step={100000}
                      min={500000}
                      className="w-full px-3.5 py-2 rounded-xl bg-purple-50/30 border border-purple-100 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Total Transfer & Unique Code Box */}
            <div className="p-4 rounded-2xl bg-purple-900 text-white shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-200">
                <span>Total Nominal Transfer Termasuk Kode Unik:</span>
                <span className="font-mono bg-purple-800 px-2 py-0.5 rounded-md text-[11px] font-bold">
                  Kode Unik: +{uniqueCode}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                  {formattedFinalPrice}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(String(finalPrice), 'Nominal Transfer', 'final_price')}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'final_price' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                  <span>{copiedKey === 'final_price' ? 'Tersalin' : 'Salin Nominal'}</span>
                </button>
              </div>
              <p className="text-[11px] text-purple-200 leading-relaxed">
                Penting: Transfer tepat sampai digit terakhir ({uniqueCode}) agar verifikasi otomatis berjalan cepat.
              </p>
            </div>

            {/* Step 3: Pilih Metode Rekening */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-[10px] font-black">2</span>
                Pilih Rekening Tujuan / E-Wallet
              </label>

              <div className="grid grid-cols-4 gap-1.5 p-1 bg-purple-50 rounded-2xl">
                {[
                  { id: 'bca', label: 'BCA Direct', icon: Building },
                  { id: 'mandiri', label: 'Mandiri', icon: Building },
                  { id: 'ewallet', label: 'GoPay / DANA', icon: Smartphone },
                  { id: 'qris', label: 'QRIS', icon: QrCode },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = selectedMethod === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedMethod(tab.id as any)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        isActive
                          ? 'bg-white text-purple-900 shadow-xs'
                          : 'text-slate-600 hover:text-purple-900'
                      }`}
                    >
                      <Icon size={14} />
                      <span className="text-[10px] sm:text-xs truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Details for Selected Method */}
              <div className="p-4.5 rounded-2xl bg-purple-50/40 border border-purple-100">
                {selectedMethod === 'bca' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-purple-900">
                          Bank Central Asia (BCA)
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          Prioritas
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Kode Bank: 014</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Nomor Rekening BCA:</span>
                        <span className="font-mono text-base sm:text-lg font-bold text-slate-900 tracking-wider">
                          8735-0921-44
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('8735092144', 'No. Rekening BCA', 'bca')}
                        className="px-3 py-1.5 text-xs font-semibold bg-purple-50 text-purple-900 rounded-lg border border-purple-200 hover:bg-purple-100 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'bca' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedKey === 'bca' ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center justify-between">
                      <span>Atas Nama: <strong className="text-slate-900">CHESTADOTCOM CIPTA KARYA</strong></span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Auto-Verification Active
                      </span>
                    </div>
                  </div>
                )}

                {selectedMethod === 'mandiri' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-purple-900">
                          Bank Mandiri
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          Instant
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Kode Bank: 008</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Nomor Rekening Mandiri:</span>
                        <span className="font-mono text-base sm:text-lg font-bold text-slate-900 tracking-wider">
                          137-00-2819-3821
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('1370028193821', 'No. Rekening Mandiri', 'mandiri')}
                        className="px-3 py-1.5 text-xs font-semibold bg-purple-50 text-purple-900 rounded-lg border border-purple-200 hover:bg-purple-100 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'mandiri' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedKey === 'mandiri' ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center justify-between">
                      <span>Atas Nama: <strong className="text-slate-900">CHESTA ADITYA</strong></span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Direct Verification
                      </span>
                    </div>
                  </div>
                )}

                {selectedMethod === 'ewallet' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-purple-900">
                          GoPay / DANA / OVO
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          0% Biaya Admin
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Semua E-Wallet</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Nomor HP E-Wallet:</span>
                        <span className="font-mono text-base sm:text-lg font-bold text-slate-900 tracking-wider">
                          0821-2544-7232
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('082125447232', 'Nomor E-Wallet', 'ewallet')}
                        className="px-3 py-1.5 text-xs font-semibold bg-purple-50 text-purple-900 rounded-lg border border-purple-200 hover:bg-purple-100 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'ewallet' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedKey === 'ewallet' ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center justify-between">
                      <span>Atas Nama: <strong className="text-slate-900">CHESTA ADITYA</strong></span>
                      <span className="text-purple-900 font-semibold">
                        Sertakan kode unik pada berita transfer
                      </span>
                    </div>
                  </div>
                )}

                {selectedMethod === 'qris' && (
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-purple-900">
                          QRIS Universal
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          Semua Bank & E-Wallet
                        </span>
                      </div>
                      <span className="text-xs text-purple-900 font-bold">NMID: ID102026190281</span>
                    </div>

                    <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border border-purple-200 shadow-xs flex flex-col items-center justify-center relative">
                      <QrCode size={130} className="text-slate-900" />
                      <div className="text-[10px] font-bold text-slate-800 font-mono mt-1">CHESTADOTCOM CIPTA KARYA</div>
                    </div>

                    <p className="text-xs text-slate-500">
                      Buka aplikasi BCA Mobile, Livin Mandiri, GoPay, OVO, atau ShopeePay lalu scan QRIS di atas.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Konfirmasi Pembayaran */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-[10px] font-black">3</span>
                Konfirmasi Pembayaran Anda
              </label>

              {isSuccessSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Konfirmasi Anda Telah Diterima!</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Tim kami sedang memverifikasi transfer <strong>{formattedFinalPrice}</strong>. Kami akan segera menghubungi Anda.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleWhatsAppConfirm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Smartphone size={14} />
                    <span>Lanjut ke WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitProof} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nama Lengkap / Perusahaan *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Contoh: PT Surya Digital / Bpk. Budi"
                        className="w-full px-3.5 py-2 rounded-xl bg-purple-50/30 border border-purple-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-3.5 py-2 rounded-xl bg-purple-50/30 border border-purple-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Catatan / No. Referensi Transaksi (Opsional)
                    </label>
                    <input
                      type="text"
                      value={transferNotes}
                      onChange={(e) => setTransferNotes(e.target.value)}
                      placeholder="Contoh: Transfer via m-BCA a.n Budi"
                      className="w-full px-3.5 py-2 rounded-xl bg-purple-50/30 border border-purple-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 py-3 px-5 bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Kirim Konfirmasi Pembayaran</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppConfirm}
                      className="w-full sm:w-auto py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Smartphone size={14} />
                      <span>Konfirmasi via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-100 bg-purple-50/40 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
            <div className="flex items-center gap-1.5 text-purple-900 font-semibold">
              <ShieldCheck size={14} />
              <span>SSL 256-Bit Guaranteed Settlement</span>
            </div>
            <span>CHESTADOTCOM CIPTA KARYA</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
