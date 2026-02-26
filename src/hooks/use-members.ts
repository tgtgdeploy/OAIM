import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Member = Row<"members">;

export function useMembers(tenantId?: string | null) {
  return useQuery({
    queryKey: ["members", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Member[];
    },
  });
}

export function useMember(id: string | undefined) {
  return useQuery({
    queryKey: ["members", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as Member;
    },
    enabled: !!id,
  });
}

export function useCreateMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: Insert<"members">) => {
      const { data, error } = await supabase
        .from("members")
        .insert(member)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Member;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["members", data.tenant_id] }),
  });
}

export function useUpdateMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"members"> & { id: string }) => {
      const { data, error } = await supabase
        .from("members")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Member;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["members", data.tenant_id] });
      qc.setQueryData(["members", "detail", data.id], data);
    },
  });
}
