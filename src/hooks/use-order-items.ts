import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type OrderItem = Row<"order_items">;

export function useOrderItems(orderId: string | undefined) {
  return useQuery({
    queryKey: ["order_items", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as OrderItem[];
    },
    enabled: !!orderId,
  });
}

export function useCreateOrderItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Insert<"order_items">) => {
      const { data, error } = await supabase
        .from("order_items")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as OrderItem;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["order_items", data.order_id] }),
  });
}

export function useBulkCreateOrderItems() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, items }: { orderId: string; items: Insert<"order_items">[] }) => {
      const { data, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();
      if (error) throw error;
      return { orderId, data: data as unknown as OrderItem[] };
    },
    onSuccess: ({ orderId }) =>
      qc.invalidateQueries({ queryKey: ["order_items", orderId] }),
  });
}

export function useDeleteOrderItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, orderId }: { id: string; orderId: string }) => {
      const { error } = await supabase.from("order_items").delete().eq("id", id);
      if (error) throw error;
      return orderId;
    },
    onSuccess: (orderId) =>
      qc.invalidateQueries({ queryKey: ["order_items", orderId] }),
  });
}
