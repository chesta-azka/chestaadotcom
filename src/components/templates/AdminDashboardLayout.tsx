import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, MessageSquare, BarChart, PenTool, LayoutDashboard, Search, Home, Users, Menu, X, Shield, Bot, Briefcase, Plus, FileText, Activity, MapPin, Sparkles } from 'lucide-react';
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
  
  // Phase 3 Features: AI Lead Scoring, Workspace Generator, One-Click Document, SLA Node Health, Localized GEO-SEO
  const tabs = [
    { id: 'dashboard', label: 'Dashboard & Analytics', icon: Activity },
    { id: 'ai_leads', label: 'AI Lead Scoring', icon: Users },
    { id: 'ai_training', label: 'AI Feedback & Training', icon: Sparkles },
    { id: 'business_config', label: 'Workspace Generator', icon: Plus },
    { id: 'chat', label: 'Comm-Link Audit', icon: MessageSquare },
    { id: 'stats', label: 'Document Generator', icon: FileText },
    { id: 'seo', label: 'SLA Node Health', icon: Shield },
    { id: 'seo_manager', label: 'GEO-SEO Radar', icon: MapPin },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-white w-full relative z-[100] overflow-hidden selection:bg-black selection:text-white">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[120] p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[105] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Brutalist Sidebar */}
      <motion.aside 
        className="fixed lg:static inset-y-0 left-0 w-72 bg-white text-black flex flex-col pt-8 border-r-4 border-black shrink-0 z-[110]"
        initial={false}
        animate={{ x: window.innerWidth >= 1024 ? 0 : (isMobileMenuOpen ? 0 : -288) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ x: window.innerWidth >= 1024 ? 0 : undefined }}
      >
        
        <div className="px-8 mb-12">
          <Link to="/" className="text-2xl font-display font-black tracking-tighter uppercase flex flex-col gap-1" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="bg-black text-white px-2 py-1 w-max leading-none">SYS.ADMIN</span>
            <span className="text-sm tracking-widest text-slate-500 font-bold">COMMAND_CENTER</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 font-mono font-bold uppercase tracking-tight text-sm transition-all border-2 ${
                activeTab === tab.id
                  ? 'bg-black text-white border-black translate-x-2'
                  : 'bg-transparent text-slate-600 border-transparent hover:border-black hover:text-black hover:translate-x-1'
              }`}
            >
              <tab.icon size={18} strokeWidth={2.5} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 bg-white border-2 border-black font-mono font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
          >
            <LogOut size={18} strokeWidth={2.5} />
            TERMINATE SESSION
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 lg:pt-8 pb-12 px-4 sm:px-8 h-screen w-full lg:w-auto bg-slate-50">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex justify-end mb-8 border-b-2 border-black pb-4">
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
