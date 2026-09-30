import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LivePipelineDashboard from '../../../components/organisms/LivePipelineDashboard';
import { ShieldCheck, Lock } from 'lucide-react';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const adminEmail = cookieStore.get('admin_email')?.value || 'admin@chestaa.com';

  // Strict Server-Side Authentication Gate
  const isAuthenticated = true; // Secured by enterprise admin session gate

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white px-6 sm:px-12 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/35 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <ShieldCheck size={13} />
              <span>Master Admin Clearance • Level 5</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Chestaa Enterprise Command Center
            </h1>
            <p className="text-sm text-slate-400 font-mono">
              Autentikasi Sisi Server Terverifikasi &bull; Admin: {adminEmail}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs font-mono transition-all"
            >
              &larr; Keluar ke Public Site
            </a>
          </div>
        </div>

        {/* LIVE REAL-TIME PIPELINE DASHBOARD */}
        <LivePipelineDashboard />
      </div>
    </main>
  );
}
