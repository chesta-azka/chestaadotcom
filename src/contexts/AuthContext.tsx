import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';
import { Navigate, Outlet, useParams } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  makeMeAdmin: () => Promise<void>;
  verifyPasscode: (slug: string, passcode: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  role: null, 
  loading: true, 
  makeMeAdmin: async () => {},
  verifyPasscode: async () => false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setRole(userDoc.data().role || 'user');
          } else {
            await setDoc(userDocRef, {
              email: currentUser.email,
              role: 'user',
              createdAt: new Date()
            });
            setRole('user');
          }
        } catch (error) {
          setRole('user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
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
      toast.error("Failed to upgrade role. Check permissions.");
    }
  };

  const verifyPasscode = async (slug: string, passcode: string) => {
    try {
      const workspaceRef = doc(db, 'workspaces', slug);
      const snap = await getDoc(workspaceRef);
      if (snap.exists() && snap.data().passcode === passcode) {
        // Store verification in session storage to persist across reloads
        sessionStorage.setItem(`workspace_auth_${slug}`, 'true');
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, makeMeAdmin, verifyPasscode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ---------------------------------------------
// ROUTE PROTECTORS
// ---------------------------------------------

export function AdminRoute() {
  const { user, role, loading } = useAuth();
  
  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-slate-50"><span className="animate-pulse">Loading Admin...</span></div>;
  
  if (!user || role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}

export function ClientRoute() {
  const { slug } = useParams();
  const isAuthenticated = sessionStorage.getItem(`workspace_auth_${slug}`) === 'true';
  
  if (!isAuthenticated) {
    // If they haven't verified passcode yet, send them to a login prompt for this workspace
    return <Navigate to={`/client-login/${slug}`} replace />;
  }
  
  return <Outlet />;
}
