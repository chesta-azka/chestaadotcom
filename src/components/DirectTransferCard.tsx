"use client";

import React, { useState } from 'react';
import { 
  CreditCard, Copy, Check, 
  Smartphone, Building, CheckCircle2, 
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';

interface DirectTransferCardProps {
  workspaceSlug?: string;
  clientName?: string;
  defaultAmount?: number;
  onSuccessSubmitted?: () => void;
}

export function DirectTransferCard({
  workspaceSlug,
  clientName: initialClientName = '',
  defaultAmount = 5000000,
  onSuccessSubmitted
}: DirectTransferCardProps) {
  const [selectedMethod, setSelectedMethod] = useState<'bca' | 'mandiri' | 'ewallet' | 'qris'>('bca');
  const [paymentScheme, setPaymentScheme] = useState<'dp' | 'full' | 'custom'>('dp');
  const [customNominal, setCustomNominal] = useState<number>(defaultAmount);
  const [uniqueCode] = useState<number>(() => Math.floor(Math.random() * 880) + 110);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form confirmation state
  const [name, setName] = useState<string>(initialClientName);
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const basePrice = customNominal;
  const finalPrice = paymentScheme === 'dp'
    ? Math.round(basePrice * 0.5) + uniqueCode
    : basePrice + uniqueCode;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
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
    const methodDescriptions = {
      bca: 'Bank Central Asia (BCA) - 8735-0921-44 a.n CHESTADOTCOM CIPTA KARYA',
      mandiri: 'Bank Mandiri - 137-00-2819-3821 a.n CHESTA ADITYA',
      ewallet: 'GoPay / DANA - 0821-2544-7232 a.n CHESTA ADITYA',
      qris: 'QRIS Satset Instant Settlement',
    };

    const msg = encodeURIComponent(
      `Halo Tim CHESTADOTCOM,\n\n` +
      `Konfirmasi Pembayaran Direct Transfer:\n` +
      `• Workspace / Klien: ${name || workspaceSlug || 'Klien'}\n` +
      `• No. WhatsApp: ${phone || '-'}\n` +
      `• Nominal Transfer: ${formattedPrice} (Kode Unik #${uniqueCode})\n` +
      `• Skema: ${paymentScheme === 'dp' ? 'Down Payment (DP 50%)' : paymentScheme === 'full' ? 'Pelunasan Penuh 100%' : 'Kustom'}\n` +
      `• Metode: ${methodDescriptions[selectedMethod]}\n` +
      `• Catatan: ${notes || 'Bukti terlampir. Mohon verifikasi kwitansi resmi.'}\n\n` +
      `Terima kasih!`
    );

    window.open(`https://wa.me/6282125447232?text=${msg}`, '_blank');
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Harap lengkapi Nama dan No. WhatsApp.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'ai_leads'), {
        name: name.trim(),
        phone: phone.trim(),
        workspaceSlug: workspaceSlug || 'direct',
        nominal: finalPrice,
        uniqueCode,
        paymentScheme,
        paymentMethod: selectedMethod,
        notes: notes.trim(),
        status: 'PAYMENT_SUBMITTED',
        source: 'Client Portal Direct Transfer Tab',
        createdAt: serverTimestamp(),
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      setIsSubmitted(true);
      toast.success('Bukti pembayaran berhasil dicatat! Sesi verifikasi aktif.');
      if (onSuccessSubmitted) onSuccessSubmitted();
    } catch (err) {
      console.error(err);
      toast.error('Gagal mencatat data. Silakan hubungi kami via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-900 text-white shadow-xs">
              <CreditCard size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-bold text-slate-900">
                  Direct Transfer & E-Wallet
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-100">
                  Instant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Bebas biaya gateway tambahan &bull; Rekening resmi berbadan hukum &bull; Verifikasi langsung
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppConfirm}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl border border-emerald-200 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <Smartphone size={14} />
            <span>Chat Langsung Engineer</span>
          </button>
        </div>

        {/* Amount & Scheme Config */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 p-5 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-3">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              1. Tentukan Nominal / Tagihan Proyek
            </label>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'DP 50%', type: 'dp', sub: 'Mulai Pengerjaan' },
                { label: 'Full 100%', type: 'full', sub: 'Pelunasan Penuh' },
                { label: 'Kustom', type: 'custom', sub: 'Sesuai Invoice' },
              ].map((sch) => (
                <button
                  key={sch.type}
                  type="button"
                  onClick={() => setPaymentScheme(sch.type as any)}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center ${
                    paymentScheme === sch.type
                      ? 'bg-purple-900 text-white border-purple-900 shadow-2xs font-bold'
                      : 'bg-white text-slate-600 border-purple-100 text-xs hover:border-purple-200'
                  }`}
                >
                  <span className="text-xs">{sch.label}</span>
                  <span className="text-[10px] font-normal opacity-75">{sch.sub}</span>
                </button>
              ))}
            </div>

            <div className="mt-2">
              <label className="text-[11px] text-slate-500 block mb-1">
                Nominal Dasar Proyek (Rp):
              </label>
              <input
                type="number"
                value={customNominal}
                onChange={(e) => setCustomNominal(Number(e.target.value) || 0)}
                step={500000}
                min={500000}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-purple-100 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-900 text-white shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[11px] text-purple-200 uppercase tracking-wider font-semibold block">
                Total Yang Harus Ditransfer:
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight mt-1">
                {formattedPrice}
              </div>
              <span className="text-[10px] text-purple-200 font-mono block mt-0.5">
                (Termasuk Kode Unik #{uniqueCode})
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(String(finalPrice), 'Nominal Transfer', 'final_amount')}
              className="w-full py-2 px-3 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'final_amount' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
              <span>{copiedKey === 'final_amount' ? 'Nominal Tersalin!' : 'Salin Nominal Persis'}</span>
            </button>
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            2. Pilih Rekening Tujuan / E-Wallet
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* BCA */}
            <div className="p-5 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-purple-900 flex items-center gap-1">
                    <Building size={14} /> BCA Direct
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-purple-100 text-purple-900 rounded-md">
                    Prioritas
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block">Nomor Rekening:</span>
                <div className="font-mono text-base font-bold text-slate-900 tracking-wider my-0.5">
                  8735-0921-44
                </div>
                <span className="text-xs font-medium text-slate-600 block">
                  a.n. CHESTADOTCOM CIPTA KARYA
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('8735092144', 'No. Rekening BCA', 'bca_card')}
                className="w-full py-1.5 text-xs font-semibold bg-white text-slate-700 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                {copiedKey === 'bca_card' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copiedKey === 'bca_card' ? 'Tersalin' : 'Salin Rekening BCA'}</span>
              </button>
            </div>

            {/* Mandiri */}
            <div className="p-5 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-purple-900 flex items-center gap-1">
                    <Building size={14} /> Bank Mandiri
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-purple-100 text-purple-900 rounded-md">
                    Instant
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block">Nomor Rekening:</span>
                <div className="font-mono text-base font-bold text-slate-900 tracking-wider my-0.5">
                  137-00-2819-3821
                </div>
                <span className="text-xs font-medium text-slate-600 block">
                  a.n. CHESTA ADITYA
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('1370028193821', 'No. Rekening Mandiri', 'mandiri_card')}
                className="w-full py-1.5 text-xs font-semibold bg-white text-slate-700 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                {copiedKey === 'mandiri_card' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copiedKey === 'mandiri_card' ? 'Tersalin' : 'Salin Rekening Mandiri'}</span>
              </button>
            </div>

            {/* E-Wallet */}
            <div className="p-5 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-purple-900 flex items-center gap-1">
                    <Smartphone size={14} /> GoPay / DANA
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-purple-100 text-purple-900 rounded-md">
                    0% Admin
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block">Nomor HP E-Wallet:</span>
                <div className="font-mono text-base font-bold text-slate-900 tracking-wider my-0.5">
                  0821-2544-7232
                </div>
                <span className="text-xs font-medium text-slate-600 block">
                  a.n. CHESTA ADITYA
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('082125447232', 'Nomor E-Wallet', 'ewallet_card')}
                className="w-full py-1.5 text-xs font-semibold bg-white text-slate-700 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                {copiedKey === 'ewallet_card' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copiedKey === 'ewallet_card' ? 'Tersalin' : 'Salin Nomor E-Wallet'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation & Proof Upload */}
        <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-900 text-white flex items-center justify-center text-[10px] font-black">3</span>
              Kirim Bukti Pembayaran & Terbitkan Kwitansi Resmi
            </h4>
            <span className="text-[11px] text-purple-700 font-medium">
              Verifikasi &lt; 15 Menit
            </span>
          </div>

          {isSubmitted ? (
            <div className="p-5 rounded-xl bg-white border border-emerald-300 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 size={20} />
              </div>
              <h5 className="font-bold text-slate-900 text-sm">Data Transfer Berhasil Diterima!</h5>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Terima kasih. Pembayaran Anda sedang diverifikasi. Anda juga dapat mengirim bukti screenshot langsung ke WhatsApp.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppConfirm}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <Smartphone size={14} />
                <span>Kirim Bukti ke WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitProof} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Klien / Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda / Bisnis"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-purple-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-purple-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan / Bukti Referensi Transfer (Opsional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Sudah ditransfer via BCA jam 10:15 WIB"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-purple-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-4 bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? 'Memproses...' : 'Kirim Konfirmasi Pembayaran'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppConfirm}
                  className="w-full sm:w-auto py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Smartphone size={14} />
                  <span>Konfirmasi via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
