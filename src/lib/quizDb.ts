import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface QuizLead {
  name: string;
  email: string;
  company?: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  level: string;
  created_at: any;
}

export const submitQuizLead = async (leadData: Omit<QuizLead, 'created_at'>) => {
  try {
    const leadsRef = collection(db, 'academy_quiz_leads');
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      created_at: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting quiz lead:', error);
    return { success: false, error };
  }
};
