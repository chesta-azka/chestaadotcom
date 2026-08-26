import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  makeMeAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true, makeMeAdmin: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[AuthContext] Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("[AuthContext] Auth state changed. User:", currentUser ? currentUser.email : 'null');
      setUser(currentUser);
      if (currentUser) {
        try {
          console.log(`[AuthContext] Fetching role for UID: ${currentUser.uid}`);
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const currentRole = userDoc.data().role || 'user';
            console.log(`[AuthContext] Role found in Firestore: ${currentRole}`);
            setRole(currentRole);
          } else {
            console.log(`[AuthContext] No role found. Creating default 'user' document for ${currentUser.email}`);
            await setDoc(userDocRef, {
              email: currentUser.email,
              role: 'user',
              createdAt: new Date()
            });
            setRole('user');
          }
        } catch (error) {
          console.error("[AuthContext] Error fetching user role from Firestore:", error);
          setRole('user');
        }
      } else {
        console.log("[AuthContext] User is logged out. Clearing role state.");
        setRole(null);
      }
      setLoading(false);
    });
    
    return () => {
      console.log("[AuthContext] Cleaning up onAuthStateChanged listener...");
      unsubscribe();
    };
  }, []);

  const makeMeAdmin = async () => {
    if (!user) {
      toast.error("You must be logged in to upgrade your role.");
      return;
    }
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { role: 'admin', email: user.email }, { merge: true });
      setRole('admin');
      toast.success("Successfully upgraded to Admin role!");
    } catch (err) {
      console.error("Failed to upgrade role:", err);
      toast.error("Failed to upgrade role. Check permissions.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, makeMeAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
