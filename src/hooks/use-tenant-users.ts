import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type TenantUser = Row<"tenant_users">;

export function useTenantUsers(tenantId?: string | null) {
  return useQuery({
    queryKey: ["tenant_users", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase.from("tenant_users").select("*");
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as TenantUser[];
    },
  });
}

export function useTenantUser(id: string | undefined) {
  return useQuery({
    queryKey: ["tenant_users", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenant_users")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as TenantUser;
    },
    enabled: !!id,
  });
}

export function useAddTenantUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (tenantUser: Insert<"tenant_users">) => {
      const { data, error } = await supabase
        .from("tenant_users")
        .insert(tenantUser)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as TenantUser;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["tenant_users", data.tenant_id] }),
  });
}

export function useRemoveTenantUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, tenantId }: { id: string; tenantId: string }) => {
      const { error } = await supabase
        .from("tenant_users")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return tenantId;
    },
    onSuccess: (tenantId) =>
      qc.invalidateQueries({ queryKey: ["tenant_users", tenantId] }),
  });
}
