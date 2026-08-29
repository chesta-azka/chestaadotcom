import re

with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

# Replace function SEOTool()
seo_pattern = re.compile(r"function SEOTool\(\) \{.*?return \(\s*<div.*?</div>\s*\);\s*\}", re.DOTALL)

new_seo = """function SEOTool() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/ai/seo-audit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (data.auditResult) {
        setResult(data.auditResult);
      } else {
        toast.error(data.error || 'Audit Failed');
      }
    } catch (e) {
      toast.error('Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-4 border-black bg-white flex flex-col min-h-[500px]">
      <div className="bg-black text-white px-8 py-6 border-b-4 border-black flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-mono font-black uppercase tracking-tighter flex items-center gap-3">
            <Shield size={28} strokeWidth={3} /> SLA Node Health
          </h2>
          <p className="text-sm font-mono mt-2 tracking-widest text-slate-400">Diagnostic API for Service Level Agreements</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-black">
          <div className="p-4 border-b-4 border-black bg-slate-100">
            <span className="font-mono font-bold text-sm uppercase">Input Stream</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-white p-6 font-mono text-sm focus:outline-none resize-none placeholder:text-slate-300"
            placeholder="PASTE RAW NODE DATA HERE..."
          ></textarea>
          <button
            onClick={handleAudit}
            disabled={loading || !content}
            className="w-full py-4 bg-black text-white font-mono font-bold uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            {loading ? 'ANALYZING...' : 'INITIATE DIAGNOSTIC'}
          </button>
        </div>
        
        <div className="flex flex-col bg-slate-50">
          <div className="p-4 border-b-4 border-black bg-slate-200">
            <span className="font-mono font-bold text-sm uppercase">Diagnostic Output</span>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {result ? (
              <div className="font-mono text-sm prose prose-sm prose-slate max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-mono text-sm uppercase text-center">
                Awaiting input stream...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}"""

content = seo_pattern.sub(new_seo, content)

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)

