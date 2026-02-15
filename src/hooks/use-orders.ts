import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Order = Row<"orders">;

export function useOrders(tenantId?: string | null) {
  return useQuery({
    queryKey: ["orders", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Order[];
    },
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ["orders", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as Order;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (order: Insert<"orders">) => {
      const { data, error } = await supabase
        .from("orders")
        .insert(order)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Order;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["orders", data.tenant_id] }),
  });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"orders"> & { id: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Order;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["orders", data.tenant_id] });
      qc.setQueryData(["orders", "detail", data.id], data);
    },
  });
}
