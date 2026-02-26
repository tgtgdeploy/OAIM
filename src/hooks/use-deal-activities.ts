import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type DealActivity = Row<"deal_activities">;

export function useDealActivities(dealId: string | undefined) {
  return useQuery({
    queryKey: ["deal_activities", dealId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deal_activities")
        .select("*")
        .eq("deal_id", dealId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DealActivity[];
    },
    enabled: !!dealId,
  });
}

export function useCreateDealActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (activity: Insert<"deal_activities">) => {
      const { data, error } = await supabase
        .from("deal_activities")
        .insert(activity)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as DealActivity;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["deal_activities", data.deal_id] }),
  });
}
