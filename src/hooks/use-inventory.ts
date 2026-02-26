import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type InventoryItem = Row<"inventory_items">;
type InventoryCategory = Row<"inventory_categories">;
type LedgerEntry = Row<"inventory_ledger">;

export function useInventoryItems(tenantId?: string | null) {
  return useQuery({
    queryKey: ["inventory_items", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("inventory_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as InventoryItem[];
    },
  });
}

export function useInventoryCategories(tenantId?: string | null) {
  return useQuery({
    queryKey: ["inventory_categories", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("inventory_categories")
        .select("*")
        .order("name", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as InventoryCategory[];
    },
  });
}

export function useInventoryLedger(itemId?: string | null) {
  return useQuery({
    queryKey: ["inventory_ledger", itemId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("inventory_ledger")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (itemId) query = query.eq("item_id", itemId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LedgerEntry[];
    },
    enabled: !!itemId,
  });
}

export function useCreateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Insert<"inventory_items">) => {
      const { data, error } = await supabase
        .from("inventory_items")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as InventoryItem;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["inventory_items", data.tenant_id] }),
  });
}

export function useUpdateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"inventory_items"> & { id: string }) => {
      const { data, error } = await supabase
        .from("inventory_items")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as InventoryItem;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["inventory_items", data.tenant_id] }),
  });
}

export function useCreateLedgerEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Insert<"inventory_ledger">) => {
      const { data, error } = await supabase
        .from("inventory_ledger")
        .insert(entry)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as LedgerEntry;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["inventory_ledger", variables.item_id] });
      qc.invalidateQueries({ queryKey: ["inventory_items"] });
    },
  });
}

export function useCreateInventoryCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cat: Insert<"inventory_categories">) => {
      const { data, error } = await supabase
        .from("inventory_categories")
        .insert(cat)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as InventoryCategory;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["inventory_categories", data.tenant_id] }),
  });
}
