import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Subscription = Row<"subscriptions">;

export function useSubscription(tenantId?: string | null) {
  return useQuery({
    queryKey: ["subscriptions", tenantId ?? "all"],
    queryFn: async () => {
      if (!tenantId) return null;
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      return (data?.[0] as Subscription) ?? null;
    },
    enabled: !!tenantId,
  });
}

export function useCreateSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sub: Insert<"subscriptions">) => {
      const { data, error } = await supabase
        .from("subscriptions")
        .insert(sub)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Subscription;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["subscriptions", data.tenant_id] }),
  });
}

export function useUpdateSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"subscriptions"> & { id: string }) => {
      const { data, error } = await supabase
        .from("subscriptions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Subscription;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["subscriptions", data.tenant_id] }),
  });
}
