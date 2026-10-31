import React, { createContext, useContext, useState } from 'react';

interface FirebaseContextType {
  isInitialized: boolean;
  isOnline: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ isInitialized: true, isOnline: true });

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized] = useState(true);
  const [isOnline] = useState(true);

  return (
    <FirebaseContext.Provider value={{ isInitialized, isOnline }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}
