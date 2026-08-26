import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, MessageSquare, BarChart, PenTool, LayoutDashboard, Search, Home, Users, Menu, X, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SystemHealthHeader from '../organisms/SystemHealthHeader';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminDashboardLayout({ children, onLogout, activeTab, setActiveTab }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'chat', label: 'Riwayat Chat AI', icon: MessageSquare },
    { id: 'stats', label: 'Analitik & Metrics', icon: BarChart },
    { id: 'seo', label: 'SEO Audit Tool', icon: Search },
    { id: 'seo_manager', label: 'SEO Manager', icon: Search },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Editor', icon: PenTool },
    { id: 'audit', label: 'System Audit Log', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 w-full relative z-[100] overflow-hidden">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[120] p-2 bg-white rounded-xl shadow-md border border-slate-200 text-slate-700 hover:text-indigo-600 transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[105] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className="fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col pt-8 border-r border-slate-800 shrink-0 z-[110]"
        initial={false}
        animate={{ x: window.innerWidth >= 1024 ? 0 : (isMobileMenuOpen ? 0 : -256) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ x: window.innerWidth >= 1024 ? 0 : undefined }}
      >
        
        <div className="px-6 mb-8">
          <Link to="/" className="text-xl font-display font-bold text-white flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm">C</span>
            CHESTA Admin
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 lg:pt-8 pb-12 px-4 sm:px-8 h-screen w-full lg:w-auto">
        <div className="max-w-6xl mx-auto h-full">
          <div className="flex justify-end mb-6">
            <SystemHealthHeader />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full pb-32"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
