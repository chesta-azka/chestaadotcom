import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';

const FORM_STEPS = [
  {
    id: 'project_type',
    title: 'Apa tujuan utama proyek Anda?',
    options: [
      'Pembuatan Website Baru',
      'Redesign Website Lama',
      'Otomatisasi & Agentic AI',
      'Lainnya'
    ]
  },
  {
    id: 'budget',
    title: 'Estimasi Budget Proyek',
    options: [
      'Rp 2.5 Jt - Rp 5 Jt',
      'Rp 5 Jt - Rp 10 Jt',
      'Rp 10 Jt - Rp 25 Jt',
      '> Rp 25 Jt'
    ]
  },
  {
    id: 'contact',
    title: 'Informasi Kontak Anda'
  }
];

export default function LeadCaptureForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    project_type: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (currentStep < FORM_STEPS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Formulir berhasil diproses! Mengarahkan ke WhatsApp...');
    // In a real app, send data to backend or CRM here
    const message = `Halo CHESTADOTCOM, saya tertarik untuk kolaborasi:%0A%0A*Tujuan Proyek:* ${formData.project_type}%0A*Estimasi Budget:* ${formData.budget}%0A*Nama:* ${formData.name}%0A*Perusahaan:* ${formData.company}%0A*Email:* ${formData.email}`;
    window.open(`https://wa.me/6282125447232?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden w-full max-w-2xl mx-auto">
      {/* Header Progress */}
      <div className="bg-slate-50/80 p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-slate-900 text-lg">Inisiasi Proyek</h3>
          <p className="text-slate-500 text-sm font-sans mt-1">Lengkapi form untuk mendapatkan estimasi cepat.</p>
        </div>
        {!isSubmitted && (
          <div className="flex items-center gap-2">
            {FORM_STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${idx === currentStep ? 'bg-indigo-600' : idx < currentStep ? 'bg-indigo-200' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-8 relative min-h-[360px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-display font-medium text-slate-900 mb-2">Terima Kasih!</h3>
              <p className="text-slate-600 font-sans">
                Data Anda telah kami terima. Kami akan merespon Anda segera melalui WhatsApp.
              </p>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(0);
                  setFormData({ project_type: '', budget: '', name: '', email: '', phone: '', company: '' });
                }}
                className="mt-8 text-indigo-600 font-medium text-sm hover:underline"
              >
                Mulai Ulang
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-display font-medium text-slate-900 mb-6">
                {FORM_STEPS[currentStep].title}
              </h4>

              {currentStep < 2 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FORM_STEPS[currentStep].options?.map((option) => {
                    const isSelected = formData[FORM_STEPS[currentStep].id as keyof typeof formData] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(FORM_STEPS[currentStep].id, option)}
                        className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-sans font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                            {option}
                          </span>
                          {isSelected && <CheckCircle2 size={18} className="text-indigo-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Lengkap</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Perusahaan / Brand</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-colors"
                        placeholder="PT XYZ"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Email Valid</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">No. WhatsApp</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-colors"
                        placeholder="0812..."
                      />
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Controls */}
      {!isSubmitted && (
        <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-0"
          >
            <ArrowLeft size={16} /> Sebelumnya
          </button>
          
          {currentStep === 2 ? (
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.phone}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kirim & Lanjutkan ke WA <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => Math.min(FORM_STEPS.length - 1, prev + 1))}
              disabled={
                (currentStep === 0 && !formData.project_type) || 
                (currentStep === 1 && !formData.budget)
              }
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lanjut <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
