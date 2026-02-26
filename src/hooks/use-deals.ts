import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Deal = Row<"deals">;

export function useDeals(tenantId?: string | null) {
  return useQuery({
    queryKey: ["deals", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Deal[];
    },
  });
}

export function useDeal(id: string | undefined) {
  return useQuery({
    queryKey: ["deals", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as Deal;
    },
    enabled: !!id,
  });
}

export function useCreateDeal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (deal: Insert<"deals">) => {
      const { data, error } = await supabase
        .from("deals")
        .insert(deal)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Deal;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["deals", data.tenant_id] }),
  });
}

export function useUpdateDeal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"deals"> & { id: string }) => {
      const { data, error } = await supabase
        .from("deals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Deal;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["deals", data.tenant_id] });
      qc.setQueryData(["deals", "detail", data.id], data);
    },
  });
}

export function useDeleteDeal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, tenantId }: { id: string; tenantId: string }) => {
      const { error } = await supabase.from("deals").delete().eq("id", id);
      if (error) throw error;
      return tenantId;
    },
    onSuccess: (tenantId) =>
      qc.invalidateQueries({ queryKey: ["deals", tenantId] }),
  });
}
