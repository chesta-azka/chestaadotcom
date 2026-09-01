import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      toast.success("Berhasil berlangganan!");
    } catch (error) {
      toast.error("Gagal berlangganan.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-purple-600 rounded-3xl p-8 text-center text-white flex flex-col items-center">
        <CheckCircle size={32} className="mb-4" />
        <h3 className="text-2xl font-bold mb-2">Terima Kasih!</h3>
        <p className="text-purple-100">Email Anda telah terdaftar untuk newsletter.</p>
      </div>
    );
  }

  return (
    <div className="bg-purple-50/50 border border-purple-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-sm">
      <div className="flex-1 text-slate-900">
        <span className="text-purple-700 font-mono text-xs uppercase tracking-wider font-bold inline-block mb-2">
          Update &amp; Wawasan
        </span>
        <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">Newsletter Digital</h3>
        <p className="text-slate-600 text-sm font-sans">Dapatkan insight teknologi, optimasi web modern, dan AI langsung ke email Anda.</p>
      </div>
      <form onSubmit={handleSubscribe} className="w-full md:w-[420px] relative">
        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan alamat email Anda"
          className="w-full pl-11 pr-32 py-3.5 bg-white border border-purple-200 text-slate-900 text-sm rounded-full outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all font-sans"
          required
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold font-sans rounded-full transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          {loading ? 'Mengirim...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
