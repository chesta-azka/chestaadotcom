import React, { createContext, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthContextType {
  user: any;
  role: string | null;
  loading: boolean;
  makeMeAdmin: () => Promise<void>;
  verifyPasscode: (slug: string, passcode: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: false,
  makeMeAdmin: async () => {},
  verifyPasscode: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        role: null,
        loading: false,
        makeMeAdmin: async () => {},
        verifyPasscode: async () => false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AdminRoute() {
  return <Navigate to="/id" replace />;
}

export function ClientRoute() {
  return <Outlet />;
}
