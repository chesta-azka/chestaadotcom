"use client";
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, orderBy, arrayUnion, serverTimestamp, addDoc, deleteDoc } from 'firebase/firestore';
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
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as KanbanTicket & { id: string }));
        setTickets(fetched);
        setLoading(false);
      },
      (err) => {
        console.warn("useKanban onSnapshot notice:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [workspaceSlug]);

  const addTicket = async (title: string, status: TicketStatus = 'Backlog', description: string = '', tag: string = 'Feature', priority: 'High' | 'Medium' | 'Low' = 'Medium') => {
    if (!workspaceSlug || !title.trim()) return;
    const currentTicketsInCol = tickets.filter(t => t.status === status);
    const orderIndex = currentTicketsInCol.length;

    await addDoc(collection(db, 'workspaces', workspaceSlug, 'kanban_tickets'), {
      title: title.trim(),
      description: description.trim(),
      tag,
      priority,
      status,
      orderIndex,
      revision_notes: [],
      client_approved: false,
      updated_at: serverTimestamp()
    });
  };

  const deleteTicket = async (ticketId: string) => {
    if (!workspaceSlug || !ticketId) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    await deleteDoc(ref);
  };

  const updateTicket = async (ticketId: string, updates: Partial<KanbanTicket>) => {
    if (!workspaceSlug || !ticketId) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    await updateDoc(ref, {
      ...updates,
      updated_at: serverTimestamp()
    });
  };

  const submitRevision = async (ticketId: string, note: string) => {
    if (!workspaceSlug) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    await updateDoc(ref, {
      status: 'In Progress' as TicketStatus,
      revision_notes: arrayUnion({ note, timestamp: new Date().toISOString() }),
      updated_at: serverTimestamp()
    });
  };

  const approveTicket = async (ticketId: string) => {
    if (!workspaceSlug) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    await updateDoc(ref, {
      status: 'Deployed' as TicketStatus,
      client_approved: true,
      updated_at: serverTimestamp()
    });
  };

  const moveTicket = async (ticketId: string, newStatus: TicketStatus, clearRevisionNotes = false) => {
    if (!workspaceSlug) return;
    const ref = doc(db, 'workspaces', workspaceSlug, 'kanban_tickets', ticketId);
    const payload: Partial<KanbanTicket> = { 
      status: newStatus,
      updated_at: serverTimestamp()
    };
    if (clearRevisionNotes) payload.revision_notes = [];
    if (newStatus === 'Deployed') payload.client_approved = true;
    await updateDoc(ref, payload);
  };

  return { tickets, loading, addTicket, deleteTicket, updateTicket, submitRevision, approveTicket, moveTicket };
}
