const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const oldSeoState = `const [seoData, setSeoData] = useState({ title: '', description: '' });`;
const newSeoState = `const [seoData, setSeoData] = useState({ title: '', description: '', ogImage: '' });`;

if (code.includes(oldSeoState)) {
    code = code.replace(oldSeoState, newSeoState);
} else {
    code = code.replace(`const [seoData, setSeoData] = useState({ title: '', description: '' });`, `const [seoData, setSeoData] = useState({ title: '', description: '', ogImage: '' });`);
}

const oldSeoSet = `setSeoData({ title: '', description: '' });`;
const newSeoSet = `setSeoData({ title: '', description: '', ogImage: '' });`;

if (code.includes(oldSeoSet)) {
    code = code.replace(oldSeoSet, newSeoSet);
}

const oldSeoForm = `<div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">Meta Description</label>
              <textarea 
                value={seoData.description}
                onChange={e => setSeoData({...seoData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none h-24"
                placeholder="Deskripsi singkat tentang halaman ini (direkomendasikan < 160 karakter)"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">`;

const newSeoForm = `<div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">Meta Description</label>
              <textarea 
                value={seoData.description || ''}
                onChange={e => setSeoData({...seoData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none h-24"
                placeholder="Deskripsi singkat tentang halaman ini (direkomendasikan < 160 karakter)"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">OpenGraph Image URL</label>
              <input 
                type="text" 
                value={seoData.ogImage || ''}
                onChange={e => setSeoData({...seoData, ogImage: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-slate-500 mt-2">Digunakan sebagai gambar thumbnail saat link dibagikan di WhatsApp, LinkedIn, dsb.</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">`;

code = code.replace(oldSeoForm, newSeoForm);

fs.writeFileSync('src/pages/AdminPage.tsx', code);
