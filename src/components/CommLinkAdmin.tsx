"use client";
import React, { useEffect, useRef } from 'react';
import { collectionGroup, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';
import { MessageSquare } from 'lucide-react';

export function CommLinkAdmin() {
  const isInitial = useRef(true);
  const processedIds = useRef(new Set<string>());

  useEffect(() => {
    // Listen to all chat_messages across all workspaces for client messages
    const q = query(
      collectionGroup(db, 'chat_messages'),
      where('sender', '==', 'client')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (isInitial.current) {
        // Mark all initial existing messages as processed to avoid spamming toasts on mount
        snapshot.docs.forEach(doc => processedIds.current.add(doc.id));
        isInitial.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const docId = change.doc.id;
          
          if (processedIds.current.has(docId)) return;
          processedIds.current.add(docId);

          const data = change.doc.data();
          // Path: workspaces/{workspaceId}/chat_messages/{messageId}
          const workspaceId = change.doc.ref.parent.parent?.id || 'UNKNOWN-NODE';

          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-sm w-full bg-black text-white border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] pointer-events-auto flex flex-col font-mono cursor-pointer hover:bg-slate-900 transition-colors`}
              onClick={() => {
                toast.dismiss(t.id);
                // Direct route to the workspace chat view 
                window.location.href = `/admin?tab=chat&workspace=${workspaceId}`;
              }}
            >
              <div className="bg-white text-black px-3 py-1 flex items-center justify-between border-b-2 border-white">
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                  System Alert
                </span>
                <span className="text-[10px] font-bold uppercase">SECURE COMM-LINK</span>
              </div>
              <div className="p-4 flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                    Incoming Transmission
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">
                    NODE_ID: {workspaceId.substring(0, 8)}...
                  </p>
                  <p className="text-sm text-gray-100 border-l-2 border-white pl-3 py-1 bg-black leading-relaxed">
                    "{data.text}"
                  </p>
                </div>
              </div>
            </div>
          ), { duration: 8000, position: 'bottom-right' });
        }
      });
    }, (error) => {
      console.error("CommLinkAdmin Observer Error:", error);
    });

    return () => unsubscribe();
  }, []);

  return null; // Headless observer component
}
