"use client";
import { useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';
import { User, ArrowRight, Sparkles } from 'lucide-react';

export function CommLinkAdmin() {
  const isInitial = useRef(true);
  const processedSessions = useRef(new Set<string>());

  useEffect(() => {
    // 1. Real-time onSnapshot listener for AI Chat Sessions requiring human handoff / pricing intent
    const qAiSessions = query(
      collection(db, 'ai_chat_sessions'),
      where('requiresHuman', '==', true)
    );

    const unsubSessions = onSnapshot(qAiSessions, (snapshot) => {
      if (isInitial.current) {
        snapshot.docs.forEach(d => processedSessions.current.add(d.id));
        isInitial.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const docId = change.doc.id;
          const data = change.doc.data();

          // If already taken over, do not re-notify
          if (data.humanTakeover === true) return;

          // Avoid duplicates if unchanged
          const key = `${docId}_${data.lastUpdated?.seconds || Date.now()}`;
          if (processedSessions.current.has(key)) return;
          processedSessions.current.add(key);

          const isPricing = !!data.pricingIntent;
          const lastMsg = data.visitorMessage || (Array.isArray(data.messages) ? data.messages[data.messages.length - 1]?.content : 'Permintaan konsultasi live.');

          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white text-slate-900 border border-purple-100 rounded-2xl shadow-xl p-4 pointer-events-auto flex flex-col font-sans transition-all duration-300`}
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    {isPricing ? '🔥 Hot Lead' : '⚡ Communication Request'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-purple-50 px-2 py-0.5 rounded-full">
                  ID: {docId.substring(0, 8)}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isPricing 
                    ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                    : 'bg-purple-50 text-purple-900 border border-purple-100'
                }`}>
                  {isPricing ? <Sparkles size={18} /> : <User size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    {isPricing ? 'Visitor menanyakan estimasi harga & paket' : 'Visitor meminta terhubung ke Engineer'}
                  </p>
                  <p className="text-xs text-slate-800 font-medium bg-purple-50/40 p-2.5 rounded-xl border border-purple-100 line-clamp-2 leading-relaxed italic">
                    "{lastMsg}"
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  Abaikan
                </button>

                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    window.dispatchEvent(new CustomEvent('intercept-chat-session', { detail: { sessionId: docId } }));
                    if (window.location.pathname !== '/admin') {
                      window.location.href = `/admin?tab=chat&session=${docId}`;
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-purple-900 hover:bg-purple-800 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Buka Chat</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ), { duration: 15000, position: 'bottom-right' });
        }
      });
    }, (error) => {
      console.warn("CommLinkAdmin AI sessions onSnapshot error:", error);
    });

    return () => unsubSessions();
  }, []);

  return null;
}

export default CommLinkAdmin;
