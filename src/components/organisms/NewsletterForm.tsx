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
    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 text-white">
        <h3 className="text-3xl font-bold mb-4">Newsletter Kami</h3>
        <p className="text-slate-400">Dapatkan update terbaru seputar teknologi dan AI langsung di inbox Anda.</p>
      </div>
      <form onSubmit={handleSubscribe} className="w-full md:w-[400px] relative">
        <Mail size={20} className="absolute left-4 top-4 text-slate-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Anda"
          className="w-full pl-12 pr-32 py-4 bg-slate-800 border-slate-700 text-white rounded-full outline-none"
          required
        />
        <button type="submit" disabled={loading} className="absolute right-2 top-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
          Subscribe
        </button>
      </form>
    </div>
  );
}
