import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Referral = Row<"referrals">;

export function useReferrals(context?: string, tenantId?: string | null) {
  return useQuery({
    queryKey: ["referrals", context ?? "all", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false });
      if (context) query = query.eq("context", context);
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Referral[];
    },
  });
}

export function useCreateReferral() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (referral: Insert<"referrals">) => {
      const { data, error } = await supabase
        .from("referrals")
        .insert(referral)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Referral;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["referrals"] }),
  });
}

export function useUpdateReferral() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"referrals"> & { id: string }) => {
      const { data, error } = await supabase
        .from("referrals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Referral;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["referrals"] }),
  });
}
