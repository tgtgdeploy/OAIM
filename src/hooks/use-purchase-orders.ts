import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type PurchaseOrder = Row<"purchase_orders">;
type PurchaseOrderItem = Row<"purchase_order_items">;

export function usePurchaseOrders(tenantId?: string | null) {
  return useQuery({
    queryKey: ["purchase_orders", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("purchase_orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as PurchaseOrder[];
    },
  });
}

export function usePurchaseOrderItems(poId?: string | null) {
  return useQuery({
    queryKey: ["purchase_order_items", poId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchase_order_items")
        .select("*")
        .eq("po_id", poId!);
      if (error) throw error;
      return data as PurchaseOrderItem[];
    },
    enabled: !!poId,
  });
}

export function useCreatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (po: Insert<"purchase_orders">) => {
      const { data, error } = await supabase
        .from("purchase_orders")
        .insert(po)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as PurchaseOrder;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["purchase_orders", data.tenant_id] }),
  });
}

export function useUpdatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"purchase_orders"> & { id: string }) => {
      const { data, error } = await supabase
        .from("purchase_orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as PurchaseOrder;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["purchase_orders", data.tenant_id] }),
  });
}

export function useCreatePurchaseOrderItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Insert<"purchase_order_items">) => {
      const { data, error } = await supabase
        .from("purchase_order_items")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as PurchaseOrderItem;
    },
    onSuccess: (_data, variables) =>
      qc.invalidateQueries({ queryKey: ["purchase_order_items", variables.po_id] }),
  });
}
