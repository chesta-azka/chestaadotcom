const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Need to import addCollection or addDoc if not imported
if (!code.includes('addDoc')) {
  code = code.replace(/import \{ doc, setDoc, getDoc(.*?) \} from 'firebase\/firestore';/, "import { doc, setDoc, getDoc, addDoc$1 } from 'firebase/firestore';");
}
if (!code.includes('serverTimestamp')) {
    code = code.replace(/import \{ (.*?) \} from 'firebase\/firestore';/, "import { $1, serverTimestamp } from 'firebase/firestore';");
}

// 1. In SEOManager handleSave
const oldSeoSave = `      await setDoc(docRef, seoData);
      toast.success('SEO Settings saved!');`;
const newSeoSave = `      await setDoc(docRef, seoData);
      await addDoc(collection(db, 'audit_logs'), {
        action: 'Updated SEO Settings',
        details: \`Updated SEO for route: \${selectedRoute}\`,
        adminEmail: auth.currentUser?.email || 'Unknown',
        timestamp: serverTimestamp()
      });
      toast.success('SEO Settings saved!');`;

if (code.includes(oldSeoSave)) {
    code = code.replace(oldSeoSave, newSeoSave);
}

// 2. In UserManagement handleRoleChange
const oldRoleChange = `      await setDoc(doc(db, 'users', userId), { role: newRole }, { merge: true });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(\`Role updated to \${newRole}\`);`;
const newRoleChange = `      await setDoc(doc(db, 'users', userId), { role: newRole }, { merge: true });
      await addDoc(collection(db, 'audit_logs'), {
        action: 'Modified User Role',
        details: \`Changed role of user \${userId} to \${newRole}\`,
        adminEmail: auth.currentUser?.email || 'Unknown',
        timestamp: serverTimestamp()
      });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(\`Role updated to \${newRole}\`);`;

if (code.includes(oldRoleChange)) {
    code = code.replace(oldRoleChange, newRoleChange);
}

// 3. SystemAuditLog Component
const systemAuditLogComponent = `
function SystemAuditLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch audit logs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
            <Shield size={20} className="text-indigo-600" /> System Audit Log
          </h2>
          <p className="text-sm text-slate-500">
            Read-only log of significant admin actions.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 custom-scrollbar">
        {loading ? (
          <div className="h-full flex items-center justify-center min-h-[300px]">
            <Loader2 size={24} className="text-indigo-600 animate-spin" />
          </div>
        ) : logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
            <Shield size={32} className="mb-4 opacity-50" />
            <p>No audit logs available.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Admin Email</th>
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Action</th>
                <th className="px-6 py-4 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    }) : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {log.adminEmail}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
`;
code = code + '\n' + systemAuditLogComponent;

// Ensure { Shield } is imported from lucide-react in AdminPage.tsx
if (!code.includes('Shield')) {
  code = code.replace(/import \{ (.*?) \} from 'lucide-react';/, "import { $1, Shield } from 'lucide-react';");
}

fs.writeFileSync('src/pages/AdminPage.tsx', code);
