import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type RestaurantTable = Row<"restaurant_tables">;

export function useRestaurantTables(tenantId?: string | null) {
  return useQuery({
    queryKey: ["restaurant_tables", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("restaurant_tables")
        .select("*")
        .order("table_number", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as RestaurantTable[];
    },
  });
}

export function useCreateRestaurantTable() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (table: Insert<"restaurant_tables">) => {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .insert(table)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as RestaurantTable;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurant_tables"] }),
  });
}

export function useUpdateRestaurantTable() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"restaurant_tables"> & { id: string }) => {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as RestaurantTable;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurant_tables"] }),
  });
}
