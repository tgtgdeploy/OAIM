import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/stores/auth-store';

export function useAuth() {
  const { user, session, loading, role, tenant, tenantUser, initialized } = useAuthStore();
  return { user, session, loading, role, tenant, tenantUser, initialized, isAuthenticated: !!user };
}

export function useRequireAuth(redirectTo = '/auth/login') {
  const { user, loading, initialized } = useAuthStore();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (initialized && !loading && !user) {
      navigate(redirectTo);
    }
  }, [user, loading, initialized, navigate, redirectTo]);

  return { user, loading, initialized };
}
