const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const targetContentTab = `      {activeTab === 'content' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
              <PenTool size={20} className="text-purple-600" /> Content Editor
            </h2>
            <p className="text-sm text-slate-500">
              Edit konten website menggunakan Markdown.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">Markdown Input</label>
              <textarea 
                value={markdownContent}
                onChange={e => setMarkdownContent(e.target.value)}
                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm resize-none custom-scrollbar"
                placeholder="Tulis konten Markdown di sini..."
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">Live Preview</label>
              <div className="flex-1 w-full p-6 bg-white border border-slate-200 rounded-2xl overflow-y-auto prose prose-slate max-w-none custom-scrollbar">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
             <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md">
                Simpan Konten
             </button>
          </div>
        </div>
      )}`;

const replacementTab = `      {activeTab === 'content' && (
        <PageManager />
      )}`;

if (code.includes('Content Editor')) {
  // Remove the old tab body and replace with a component call
  code = code.replace(targetContentTab, replacementTab);

  // We need to define PageManager component
  const pageManagerComponent = `
function PageManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('pricing_config');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch all editable page contents
    const q = query(collection(db, 'page_content'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPages(data);
      setLoading(false);
      
      const current = data.find(d => d.id === selectedPage);
      if (current) {
        // Only set content if we aren't currently editing (or just on initial load)
        // Here we just initialize if it exists
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const current = pages.find(p => p.id === selectedPage);
    if (current) {
      setContent(current.content || '');
    } else {
      if (selectedPage === 'pricing_config') {
         setContent(\`Data harga layanan yang FIX dan WAJIB kamu ikuti (PENTING: Selalu tekankan bahwa harga kita SANGAT TERJANGKAU dan mulai dari Rp 2.500.000):
- Paket Basic / Landing Page: Mulai dari Rp 2.500.000 (Cocok untuk profil bisnis awal yang elegan dan responsif).
- Paket UMKM Starter: Mulai dari Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Custom Website (Enterprise/Premium) & Agentic AI: Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).\`);
      } else {
         setContent('');
      }
    }
  }, [selectedPage, pages]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'page_content', selectedPage), {
        content,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Konten berhasil disimpan');
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan konten');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
            <PenTool size={20} className="text-purple-600" /> Page & Content Manager
          </h2>
          <p className="text-sm text-slate-500">
            Atur dan perbarui teks di setiap halaman dan konfigurasi AI Pricing.
          </p>
        </div>
        <select 
          value={selectedPage} 
          onChange={(e) => setSelectedPage(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-purple-500"
        >
          <option value="pricing_config">Pricing & AI Config</option>
          <option value="home_hero">Homepage Hero Text</option>
          <option value="about_company">About Us Details</option>
          <option value="contact_info">Contact Information</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Markdown / Text Input</label>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm resize-none custom-scrollbar"
            placeholder="Tulis detail/konten di sini..."
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Live Preview (Markdown)</label>
          <div className="flex-1 w-full p-6 bg-white border border-slate-200 rounded-2xl overflow-y-auto prose prose-slate max-w-none custom-scrollbar">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
         <button 
           onClick={handleSave}
           disabled={saving}
           className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2"
         >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            Simpan Konten
         </button>
      </div>
    </div>
  );
}
`;

  // We should append PageManager to the end of the file
  if (!code.includes('function PageManager() {')) {
    code = code + '\n\n' + pageManagerComponent;
  }
  
  // Make sure to add setDoc to the firebase imports if not there (already there on line 4, maybe). 
  // Let's just double check the imports.
  // The AdminPage.tsx has collection, query, orderBy, limit, getDocs, onSnapshot, updateDoc, deleteDoc, doc, setDoc in some places.

  fs.writeFileSync('src/pages/AdminPage.tsx', code);
  console.log("Patched AdminPage with PageManager");
} else {
  console.log("Could not find the target Content Editor tab");
}
