import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface TimeSlot {
  id: string;
  dateStr: string;
  timeStr: string;
  label: string;
  datetime: string;
}

interface MeetingSchedulerChipsProps {
  onBooked?: (slot: TimeSlot) => void;
  sessionId: string;
}

export default function MeetingSchedulerChips({ onBooked, sessionId }: MeetingSchedulerChipsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [step, setStep] = useState<'select' | 'details' | 'success'>('select');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await fetch('/api/calendar/slots');
      const data = await res.json();
      if (data.success && data.slots) {
        setSlots(data.slots);
      } else {
        setSlots([
          { id: '1', dateStr: 'Hari Ini', timeStr: '15:00 WIB', label: 'Hari Ini, 15:00 WIB', datetime: new Date(Date.now() + 3600000 * 3).toISOString() },
          { id: '2', dateStr: 'Besok', timeStr: '10:00 WIB', label: 'Besok, 10:00 WIB', datetime: new Date(Date.now() + 86400000).toISOString() },
          { id: '3', dateStr: 'Besok', timeStr: '14:00 WIB', label: 'Besok, 14:00 WIB', datetime: new Date(Date.now() + 86400000 + 14400000).toISOString() },
          { id: '4', dateStr: 'Lusa', timeStr: '11:00 WIB', label: 'Lusa, 11:00 WIB', datetime: new Date(Date.now() + 172800000).toISOString() }
        ]);
      }
    } catch (e) {
      setSlots([
        { id: '1', dateStr: 'Hari Ini', timeStr: '15:00 WIB', label: 'Hari Ini, 15:00 WIB', datetime: new Date(Date.now() + 3600000 * 3).toISOString() },
        { id: '2', dateStr: 'Besok', timeStr: '10:00 WIB', label: 'Besok, 10:00 WIB', datetime: new Date(Date.now() + 86400000).toISOString() },
        { id: '3', dateStr: 'Besok', timeStr: '14:00 WIB', label: 'Besok, 14:00 WIB', datetime: new Date(Date.now() + 86400000 + 14400000).toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep('details');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      toast.error('Mohon isi nama dan nomor WhatsApp Anda.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          slot: selectedSlot,
          clientName,
          clientPhone,
          service: 'Discovery Call Konsultasi Website & AI'
        })
      });
      const data = await res.json();
      if (data.success) {
        setStep('success');
        toast.success('Discovery Call berhasil dijadwalkan!');
        if (onBooked && selectedSlot) onBooked(selectedSlot);
      } else {
        toast.error(data.error || 'Gagal menjadwalkan.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan jaringan.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-2 text-xs font-mono text-purple-600 flex items-center gap-2">
        <Sparkles className="animate-spin" size={14} /> Memuat jadwal konsultasi tersedia...
      </div>
    );
  }

  if (step === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-purple-50/90 border border-purple-200 rounded-2xl p-4 my-2 text-slate-900 font-sans shadow-xs"
      >
        <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm mb-1">
          <CheckCircle2 size={18} className="text-purple-600" />
          Janji Temu Berhasil Dikonfirmasi!
        </div>
        <p className="text-xs text-slate-600 mb-2">
          Terima kasih <strong className="text-slate-900">{clientName}</strong>. Sesi Discovery Call 15 menit telah dijadwalkan pada <strong className="text-purple-900">{selectedSlot?.label}</strong>. Undangan kalender dan detail telah dikirimkan ke dasbor admin.
        </p>
        <a
          href={`https://wa.me/6282125447232?text=${encodeURIComponent(`Halo Mas Chesta, saya ${clientName} telah booking jadwal Discovery Call pada ${selectedSlot?.label}. Mohon konfirmasinya.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-medium transition-all shadow-xs"
        >
          Konfirmasi via WhatsApp <ArrowRight size={12} />
        </a>
      </motion.div>
    );
  }

  if (step === 'details') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-purple-200 rounded-2xl p-4 my-2 shadow-xs font-sans max-w-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-900">
            <Calendar size={14} className="text-purple-600" />
            <span>Pilih Waktu: {selectedSlot?.label}</span>
          </div>
          <button
            onClick={() => setStep('select')}
            className="text-[11px] font-mono text-purple-600 hover:underline cursor-pointer"
          >
            Ubah
          </button>
        </div>

        <form onSubmit={handleConfirmBooking} className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              placeholder="cth. Budi Santoso"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-500 font-sans bg-slate-50/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">Nomor WhatsApp</label>
            <input
              type="tel"
              required
              placeholder="cth. 08123456789"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-500 font-sans bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {submitting ? <Sparkles className="animate-spin" size={13} /> : <CheckCircle2 size={13} />}
            {submitting ? 'Menyimpan Jadwal...' : 'Konfirmasi Jadwal Konsultasi'}
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 pt-2 pb-1 max-w-full font-sans"
    >
      <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-0.5">
        <Clock size={13} className="text-purple-600" />
        <span>Pilih Waktu Discovery Call (15 Menit):</span>
      </div>
      <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-none">
        {slots.map((slot) => (
          <motion.button
            key={slot.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectSlot(slot)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-purple-700 border border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 text-xs font-medium transition-all cursor-pointer shadow-2xs group whitespace-nowrap"
          >
            <Calendar size={13} className="text-purple-500 group-hover:text-white shrink-0 transition-colors" />
            <span>{slot.label}</span>
            <ArrowRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
