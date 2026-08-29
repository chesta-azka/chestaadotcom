import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface FirebaseContextType {
  isInitialized: boolean;
  isOnline: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ isInitialized: false, isOnline: false });

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'system', 'connection_test'));
        setIsOnline(true);
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
          setIsOnline(false);
        }
      } finally {
        setIsInitialized(true);
      }
    }
    
    testConnection();
  }, []);

  return (
    <FirebaseContext.Provider value={{ isInitialized, isOnline }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}
