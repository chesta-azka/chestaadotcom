"use client";
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, orderBy, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { KanbanTicket, TicketStatus } from '../lib/db';

export function useKanban(workspaceSlug: string) {
  const [tickets, setTickets] = useState<(KanbanTicket & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspaceSlug) return;
    const q = query(
      collection(db, 'workspaces', workspaceSlug, 'kanban_tickets'),
      orderBy('orderIndex', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as KanbanTicket & { id: string }));
      setTickets(fetched);
      setLoading(false);
    });
    return unsubscribe;
  }, [workspaceSlug]);

  const submitRevision = async (ticketId: string, note: string) => {
    if (!workspaceSlug) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    await updateDoc(ref, {
      status: 'In Progress' as TicketStatus,
      revision_notes: arrayUnion({ note, timestamp: new Date() }), // Storing JS Date or Timestamp
    });
  };

  const approveTicket = async (ticketId: string) => {
    if (!workspaceSlug) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    await updateDoc(ref, {
      status: 'Deployed' as TicketStatus,
      client_approved: true,
      revision_notes: [], // Clear history upon final approval
    });
  };

  const moveTicket = async (ticketId: string, newStatus: TicketStatus, clearRevisionNotes = false) => {
    if (!workspaceSlug) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    const payload: Partial<KanbanTicket> = { status: newStatus };
    if (clearRevisionNotes) payload.revision_notes = [];
    await updateDoc(ref, payload);
  };

  return { tickets, loading, submitRevision, approveTicket, moveTicket };
}
