import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Shipment = Row<"shipments">;

export function useShipments(tenantId?: string | null) {
  return useQuery({
    queryKey: ["shipments", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Shipment[];
    },
  });
}

export function useCreateShipment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: Insert<"shipments">) => {
      const { data, error } = await supabase
        .from("shipments")
        .insert(s)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Shipment;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shipments"] }),
  });
}

export function useUpdateShipment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"shipments"> & { id: string }) => {
      const { data, error } = await supabase
        .from("shipments")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Shipment;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shipments"] }),
  });
}
