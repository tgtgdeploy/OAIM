import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Staff = Row<"staff">;

export function useStaff(tenantId?: string | null) {
  return useQuery({
    queryKey: ["staff", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("staff")
        .select("*")
        .order("name", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Staff[];
    },
  });
}

export function useCreateStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: Insert<"staff">) => {
      const { data, error } = await supabase
        .from("staff")
        .insert(s)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Staff;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}

export function useUpdateStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"staff"> & { id: string }) => {
      const { data, error } = await supabase
        .from("staff")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Staff;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}
