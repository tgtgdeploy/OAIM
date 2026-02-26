import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Supplier = Row<"suppliers">;

export function useSuppliers(tenantId?: string | null) {
  return useQuery({
    queryKey: ["suppliers", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("suppliers")
        .select("*")
        .order("name", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Supplier[];
    },
  });
}

export function useCreateSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (supplier: Insert<"suppliers">) => {
      const { data, error } = await supabase
        .from("suppliers")
        .insert(supplier)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Supplier;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["suppliers", data.tenant_id] }),
  });
}

export function useUpdateSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"suppliers"> & { id: string }) => {
      const { data, error } = await supabase
        .from("suppliers")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Supplier;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["suppliers", data.tenant_id] }),
  });
}
