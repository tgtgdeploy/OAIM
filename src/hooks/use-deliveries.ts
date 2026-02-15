import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Delivery = Row<"deliveries">;

export function useDeliveries(tenantId?: string | null) {
  return useQuery({
    queryKey: ["deliveries", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("deliveries")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Delivery[];
    },
  });
}

export function useCreateDelivery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (d: Insert<"deliveries">) => {
      const { data, error } = await supabase
        .from("deliveries")
        .insert(d)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Delivery;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deliveries"] }),
  });
}

export function useUpdateDelivery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"deliveries"> & { id: string }) => {
      const { data, error } = await supabase
        .from("deliveries")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Delivery;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deliveries"] }),
  });
}
