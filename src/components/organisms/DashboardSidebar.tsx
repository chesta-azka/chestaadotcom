import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Cpu
} from 'lucide-react';
import DashboardNavItem from '../molecules/DashboardNavItem';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function DashboardSidebar({ activeTab, setActiveTab, isAdmin, onLogout }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} />, adminOnly: false },
    { id: 'posts', label: 'Journal Posts', icon: <FileText size={18} />, adminOnly: false },
    { id: 'ai-lab', label: 'Lab AI Content', icon: <Cpu size={18} />, adminOnly: false },
    { id: 'mitra', label: 'Mitra Center', icon: <Users size={18} />, adminOnly: false },
    { id: 'users', label: 'Member List', icon: <Users size={18} />, adminOnly: true },
    { id: 'settings', label: 'Config', icon: <Settings size={18} />, adminOnly: false },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => (
          (item.adminOnly ? isAdmin : true) && (
            <DashboardNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          )
        ))}
      </div>
      
      <div className="pt-8 border-t border-white/5 mt-8">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300"
        >
          <LogOut size={18} />
          <span className="text-xs font-sans font-bold tracking-wider uppercase">Log Out System</span>
        </button>
      </div>
    </div>
  );
}
