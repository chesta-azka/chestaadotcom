import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isValidated, setIsValidated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setIsValidated(true);
      setIsAuthorized(false);
      return;
    }

    const verify = async () => {
      try {
        const token = await user.getIdToken(true);
        const res = await fetch('/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        setIsAuthorized(false);
      } finally {
        setIsValidated(true);
      }
    };
    verify();
  }, [user, loading]);

  if (loading || !isValidated) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  const isSetup = new URLSearchParams(location.search).get('setup') === 'true';
  if (!isAuthorized && !isSetup) {
    return <>{fallback}</>;
  }

  // If they are on setup route, we might want to show the fallback (AdminLogin) anyway if they are not authorized, because they need to register.
  if (!isAuthorized && isSetup) {
      return <>{fallback}</>;
  }

  return <>{children}</>;
}
