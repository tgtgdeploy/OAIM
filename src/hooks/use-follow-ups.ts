import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type FollowUp = Row<"follow_ups">;

export function useFollowUps(tenantId?: string | null) {
  return useQuery({
    queryKey: ["follow_ups", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("follow_ups")
        .select("*")
        .order("scheduled_at", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as FollowUp[];
    },
  });
}

export function useFollowUp(id: string | undefined) {
  return useQuery({
    queryKey: ["follow_ups", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follow_ups")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as FollowUp;
    },
    enabled: !!id,
  });
}

export function useCreateFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (followUp: Insert<"follow_ups">) => {
      const { data, error } = await supabase
        .from("follow_ups")
        .insert(followUp)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as FollowUp;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["follow_ups", data.tenant_id] }),
  });
}

export function useUpdateFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"follow_ups"> & { id: string }) => {
      const { data, error } = await supabase
        .from("follow_ups")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as FollowUp;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["follow_ups", data.tenant_id] });
      qc.setQueryData(["follow_ups", "detail", data.id], data);
    },
  });
}

export function useDeleteFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, tenantId }: { id: string; tenantId: string }) => {
      const { error } = await supabase.from("follow_ups").delete().eq("id", id);
      if (error) throw error;
      return tenantId;
    },
    onSuccess: (tenantId) =>
      qc.invalidateQueries({ queryKey: ["follow_ups", tenantId] }),
  });
}
