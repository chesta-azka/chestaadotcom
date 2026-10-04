'use server';

import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function trackServerEvent(path: string, userAgent: string) {
  try {
    if (!db) return { success: false, error: 'Database not initialized' };
    const analyticsRef = collection(db, 'server_analytics');
    await addDoc(analyticsRef, {
      path,
      userAgent,
      timestamp: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Server tracking error:', error);
    return { success: false, error: String(error) };
  }
}
