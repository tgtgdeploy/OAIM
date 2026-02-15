import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Automation = Row<"automations">;

export function useAutomations(opts?: { tenantId?: string | null; isTemplate?: boolean }) {
  return useQuery({
    queryKey: ["automations", opts?.tenantId ?? "all", opts?.isTemplate],
    queryFn: async () => {
      let query = supabase
        .from("automations")
        .select("*")
        .order("created_at", { ascending: false });
      if (opts?.tenantId) query = query.eq("tenant_id", opts.tenantId);
      if (opts?.isTemplate !== undefined) query = query.eq("is_template", opts.isTemplate);
      const { data, error } = await query;
      if (error) throw error;
      return data as Automation[];
    },
  });
}

export function useCreateAutomation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (automation: Insert<"automations">) => {
      const { data, error } = await supabase
        .from("automations")
        .insert(automation)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Automation;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["automations"] }),
  });
}

export function useUpdateAutomation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"automations"> & { id: string }) => {
      const { data, error } = await supabase
        .from("automations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Automation;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["automations"] }),
  });
}
