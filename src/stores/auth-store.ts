import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, type SupabaseUser } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type { Row } from '@/lib/database.types';

type UserRole = 'super_admin' | 'tenant_owner' | 'tenant_admin' | 'staff' | 'customer';

interface AuthState {
  user: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  role: UserRole | null;
  tenant: Row<'tenants'> | null;
  tenantUser: Row<'tenant_users'> | null;
  initialized: boolean;

  // Actions
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, metadata?: Record<string, string>) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  initAuthListener: () => () => void;
  refreshUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,
      role: null,
      tenant: null,
      tenantUser: null,
      initialized: false,

      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return { error: null };
      },

      signUp: async (email, password, metadata) => {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: metadata },
        });
        if (error) return { error: error.message };
        return { error: null };
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          role: null,
          tenant: null,
          tenantUser: null,
        });
      },

      refreshUserData: async () => {
        const { user } = get();
        if (!user) return;

        try {
          // Fetch tenant_users to get role and tenant
          const { data: tenantUsers } = await supabase
            .from('tenant_users')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })
            .limit(1);

          const tenantUser = (tenantUsers?.[0] ?? null) as Row<'tenant_users'> | null;

          if (tenantUser) {
            const { data: tenant } = await supabase
              .from('tenants')
              .select('*')
              .eq('id', tenantUser.tenant_id)
              .single();

            set({
              role: tenantUser.role as UserRole,
              tenant: (tenant ?? null) as Row<'tenants'> | null,
              tenantUser,
            });
          } else {
            // Check if user is a super admin by checking if any tenant_user has super_admin role
            const { data: adminCheck } = await supabase
              .from('tenant_users')
              .select('role')
              .eq('user_id', user.id)
              .eq('role', 'super_admin')
              .limit(1);

            set({
              role: adminCheck && adminCheck.length > 0 ? 'super_admin' : 'customer',
              tenant: null,
              tenantUser: null,
            });
          }
        } catch {
          // Silently fail — user data will be retried on next auth event
        }
      },

      initAuthListener: () => {
        // Safety timeout — if auth takes too long, stop loading
        const timeout = setTimeout(() => {
          const state = get();
          if (state.loading) {
            set({ loading: false, initialized: true });
          }
        }, 3000);

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            clearTimeout(timeout);
            const user = session?.user ?? null;
            set({ user, session, loading: false, initialized: true });

            if (user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
              await get().refreshUserData();
            }

            if (event === 'SIGNED_OUT') {
              set({ role: null, tenant: null, tenantUser: null });
            }
          }
        );

        return () => {
          clearTimeout(timeout);
          subscription.unsubscribe();
        };
      },
    }),
    {
      name: 'oaim-auth',
      partialState: (state: AuthState) => ({
        role: state.role,
      }),
    } as never,
  )
);
