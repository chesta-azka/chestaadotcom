const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyQuizPage.tsx', 'utf8');

if (!code.includes('submitQuizLead')) {
  // Add import
  code = code.replace(
    /import \{ Link, useNavigate \} from 'react-router-dom';/,
    "import { Link, useNavigate } from 'react-router-dom';\nimport { submitQuizLead } from '../lib/quizDb';"
  );
  
  // Add state for lead form
  code = code.replace(
    /const \[isCompleted, setIsCompleted\] = useState\(false\);/,
    "const [isCompleted, setIsCompleted] = useState(false);\n  const [showLeadForm, setShowLeadForm] = useState(false);\n  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '' });\n  const [isSubmitting, setIsSubmitting] = useState(false);\n  const [leadSubmitted, setLeadSubmitted] = useState(false);"
  );
  
  // In handleFinishQuiz, we can just let it finish. The lead form will be shown in the results view.
  
  // Update the results UI to include the lead form
  const leadFormUI = `
            {!leadSubmitted ? (
              <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left">
                <h3 className="font-display font-bold text-slate-900 mb-2">Dapatkan Analisis Mendalam & Roadmap Belajar Khusus</h3>
                <p className="text-sm text-slate-500 mb-4">Masukkan email Anda untuk menerima feedback teknis eksklusif dari tim engineering CHESTAADOTCOM dan akses ke Masterclass kami.</p>
                
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  await submitQuizLead({
                    name: leadForm.name,
                    email: leadForm.email,
                    company: leadForm.company,
                    score: score,
                    totalQuestions: questions.length,
                    timeSpentSeconds: 600 - timeLeft,
                    level: level.label
                  });
                  setIsSubmitting(false);
                  setLeadSubmitted(true);
                }} className="space-y-4">
                  <div>
                    <input type="text" required placeholder="Nama Lengkap" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
                  </div>
                  <div>
                    <input type="email" required placeholder="Email Kerja / Pribadi" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
                  </div>
                  <div>
                    <input type="text" placeholder="Perusahaan / Kampus (Opsional)" value={leadForm.company} onChange={e => setLeadForm({...leadForm, company: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isSubmitting ? <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full"/> : 'Kirim Hasil & Roadmap Saya'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center gap-4 text-left">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Berhasil Terkirim!</h4>
                  <p className="text-sm opacity-90">Roadmap teknis dan akses Masterclass akan segera dikirimkan ke email Anda.</p>
                </div>
              </div>
            )}
  `;
  
  // Inject before the review section
  code = code.replace(
    /\{\/\* Review Section \*\/\}/,
    leadFormUI + "\n\n            {/* Review Section */}"
  );
  
  fs.writeFileSync('src/pages/AcademyQuizPage.tsx', code);
}
