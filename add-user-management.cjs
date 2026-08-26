const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const importsToAdd = `
import { Users as UsersIcon } from 'lucide-react';
`;
// Add imports safely
code = code.replace("import { Search, Sparkles, Loader2, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon } from 'lucide-react';", "import { Search, Sparkles, Loader2, FileText, CheckCircle2, Lock, LogOut, MessageSquare, Clock, BarChart as BarChartIcon, Users as UsersIcon } from 'lucide-react';");

const userManagementComponent = `
function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { makeMeAdmin } = useAuth(); // Utility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await setDoc(doc(db, 'users', userId), { role: newRole }, { merge: true });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(\`Role updated to \${newRole}\`);
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
            <UsersIcon size={20} className="text-indigo-600" /> User Management
          </h2>
          <p className="text-sm text-slate-500">
            Kelola peran pengguna (Admin/User).
          </p>
        </div>
        <button
          onClick={makeMeAdmin}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-xl hover:bg-indigo-100 transition-colors"
        >
          Darurat: Jadikan Saya Admin
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={24} className="text-indigo-600 animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm font-medium text-slate-500">
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-3 px-4 text-sm text-slate-800">{u.email || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={\`px-2.5 py-1 text-xs font-medium rounded-full \${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}\`}>
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select 
                      value={u.role || 'user'}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-white border border-slate-200 text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-sm text-slate-500">
                    Belum ada pengguna terdaftar di Firestore.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
`;

code = code.replace("export default function AdminPage() {", userManagementComponent + "\nexport default function AdminPage() {");

const userTabInsert = `      {activeTab === 'users' && (
        <UserManagement />
      )}
`;
code = code.replace("{activeTab === 'seo_manager' && (", userTabInsert + "{activeTab === 'seo_manager' && (");

fs.writeFileSync('src/pages/AdminPage.tsx', code);
