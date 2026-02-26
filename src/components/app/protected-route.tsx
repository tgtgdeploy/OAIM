import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/stores/auth-store';

type UserRole = 'super_admin' | 'tenant_owner' | 'tenant_admin' | 'staff' | 'customer';

const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 5,
  tenant_owner: 4,
  tenant_admin: 3,
  staff: 2,
  customer: 1,
};

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-primary animate-pulse" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole = 'customer' }: ProtectedRouteProps) {
  const { user, loading, initialized, role } = useAuthStore();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!initialized || loading) return;

    if (!user) {
      return;
    }

    if (role && requiredRole) {
      const userLevel = ROLE_HIERARCHY[role] ?? 0;
      const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;
      if (userLevel < requiredLevel) {
        if (role === 'customer') {
          navigate('/member');
        } else {
          navigate('/app');
        }
      }
    }
  }, [user, loading, initialized, role, requiredRole, navigate]);

  if (!initialized || loading) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
}
