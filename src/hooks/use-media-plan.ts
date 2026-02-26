import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type MediaPlan = Row<"media_publishing_plan">;

export function useMediaPlans(tenantId?: string | null) {
  return useQuery({
    queryKey: ["media_publishing_plan", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("media_publishing_plan")
        .select("*")
        .order("scheduled_date", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as MediaPlan[];
    },
  });
}

export function useCreateMediaPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (plan: Insert<"media_publishing_plan">) => {
      const { data, error } = await supabase
        .from("media_publishing_plan")
        .insert(plan)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as MediaPlan;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["media_publishing_plan", data.tenant_id] }),
  });
}

export function useUpdateMediaPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"media_publishing_plan"> & { id: string }) => {
      const { data, error } = await supabase
        .from("media_publishing_plan")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as MediaPlan;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["media_publishing_plan", data.tenant_id] }),
  });
}

export function useDeleteMediaPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("media_publishing_plan")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["media_publishing_plan"] }),
  });
}
