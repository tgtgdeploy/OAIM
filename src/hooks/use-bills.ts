import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Bill = Row<"bills">;

export function useBills(tenantId?: string | null) {
  return useQuery({
    queryKey: ["bills", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("bills")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Bill[];
    },
  });
}

export function useCreateBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (bill: Insert<"bills">) => {
      const { data, error } = await supabase
        .from("bills")
        .insert(bill)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Bill;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["bills", data.tenant_id] }),
  });
}

export function useUpdateBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"bills"> & { id: string }) => {
      const { data, error } = await supabase
        .from("bills")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Bill;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["bills", data.tenant_id] }),
  });
}
