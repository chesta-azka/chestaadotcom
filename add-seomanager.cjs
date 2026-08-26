const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const seoManagerComponent = `
function SEOManager() {
  const [routes, setRoutes] = useState([
    { path: '/', name: 'Home' },
    { path: '/blog', name: 'Blog Hub' },
    { path: '/services', name: 'Services' },
    { path: '/portfolio', name: 'Portfolio' },
    { path: '/about', name: 'About' },
  ]);
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [seoData, setSeoData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSeo = async () => {
      setLoading(true);
      try {
        // Firebase doc IDs can't have '/' if they are just paths. Let's encode it or replace
        const docId = selectedRoute === '/' ? 'home' : selectedRoute.replace(/\\//g, '_');
        const docRef = doc(db, 'seo_settings', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSeoData(docSnap.data());
        } else {
          setSeoData({ title: '', description: '' });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSeo();
  }, [selectedRoute]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docId = selectedRoute === '/' ? 'home' : selectedRoute.replace(/\\//g, '_');
      const docRef = doc(db, 'seo_settings', docId);
      await setDoc(docRef, seoData);
      toast.success('SEO Settings saved!');
    } catch (e) {
      toast.error('Failed to save SEO settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
          <Search size={20} className="text-indigo-600" /> SEO Route Manager
        </h2>
        <p className="text-sm text-slate-500">
          Kelola Title dan Meta Description untuk setiap halaman secara dinamis.
        </p>
      </div>

      <div className="flex gap-6 flex-1">
        <div className="w-64 border-r border-slate-100 pr-6 space-y-2">
          {routes.map(r => (
            <button
              key={r.path}
              onClick={() => setSelectedRoute(r.path)}
              className={\`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors \${selectedRoute === r.path ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}\`}
            >
              {r.name}
              <div className="text-xs text-slate-400 font-normal mt-0.5">{r.path}</div>
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col max-w-2xl">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 size={24} className="text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Title</label>
                <input 
                  type="text"
                  value={seoData.title}
                  onChange={e => setSeoData({...seoData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="Misal: Jasa Web Profesional | Nama Bisnis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
                <textarea 
                  value={seoData.description}
                  onChange={e => setSeoData({...seoData, description: e.target.value})}
                  className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  placeholder="Deskripsi singkat yang akan muncul di Google pencarian..."
                />
              </div>
              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;

// Insert just before export default function AdminPage
code = code.replace("export default function AdminPage() {", seoManagerComponent + "\nexport default function AdminPage() {");

fs.writeFileSync('src/pages/AdminPage.tsx', code);
