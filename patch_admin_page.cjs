const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const tabCheck = `      {activeTab === 'content' && (
        <PageManager />
      )}`;

const replacementTab = `      {activeTab === 'business_config' && (
        <BusinessConfigManager />
      )}
      {activeTab === 'content' && (
        <PageManager />
      )}`;

if (code.includes(tabCheck) && !code.includes("BusinessConfigManager")) {
  code = code.replace(tabCheck, replacementTab);

  const comp = `
function BusinessConfigManager() {
  const [config, setConfig] = useState({
    starting_price: 2500000,
    umkm_price: 5000000,
    ecommerce_price: 10000000,
    enterprise_price: 15000000,
    service_base_rate: 540000
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system_config', 'business_variables'), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(prev => ({ ...prev, ...docSnap.data() }));
      }
    });
    return unsub;
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'system_config', 'business_variables'), {
        ...config,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Business configuration updated!');
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan konfigurasi bisnis');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
          <Briefcase size={20} className="text-purple-600" /> Business Configuration
        </h2>
        <p className="text-sm text-slate-500">
          Atur variabel inti bisnis. Nilai ini akan secara real-time digunakan oleh AI Assistant sebagai source of truth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Starting Price / Landing Page (Rp)</label>
          <input type="number" name="starting_price" value={config.starting_price} onChange={handleChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">UMKM Starter Price (Rp)</label>
          <input type="number" name="umkm_price" value={config.umkm_price} onChange={handleChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">E-Commerce Base Price (Rp)</label>
          <input type="number" name="ecommerce_price" value={config.ecommerce_price} onChange={handleChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Enterprise / Custom Price (Rp)</label>
          <input type="number" name="enterprise_price" value={config.enterprise_price} onChange={handleChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Service Calculator Base Rate (Rp)</label>
          <input type="number" name="service_base_rate" value={config.service_base_rate} onChange={handleChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button 
           onClick={handleSave}
           disabled={saving}
           className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2"
         >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            Simpan Konfigurasi
         </button>
      </div>
    </div>
  );
}
`;

  code = code + '\n' + comp;

  if (!code.includes("Briefcase")) {
    code = code.replace(
      "import { LogOut, LayoutDashboard, MessageSquare, BarChart, Settings, Users, ArrowUpRight, Search, Zap, Activity, CheckCircle2, XCircle, AlertCircle, RefreshCw, PenTool, Edit3, Trash2, Shield, Eye, Lock, FileText, ChevronRight, X, UserX, Loader2, Bot } from 'lucide-react';",
      "import { LogOut, LayoutDashboard, MessageSquare, BarChart, Settings, Users, ArrowUpRight, Search, Zap, Activity, CheckCircle2, XCircle, AlertCircle, RefreshCw, PenTool, Edit3, Trash2, Shield, Eye, Lock, FileText, ChevronRight, X, UserX, Loader2, Bot, Briefcase } from 'lucide-react';"
    );
  }

  fs.writeFileSync('src/pages/AdminPage.tsx', code);
  console.log("Patched AdminPage.tsx");
}
