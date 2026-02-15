import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Plan = Row<"plans">;
type PlanTier = Plan["tier"];

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true });
      if (error) throw error;
      return data as Plan[];
    },
  });
}

export function usePlan(id: string | undefined) {
  return useQuery({
    queryKey: ["plans", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as Plan;
    },
    enabled: !!id,
  });
}

export function usePlanByTier(tier: PlanTier | undefined) {
  return useQuery({
    queryKey: ["plans", "tier", tier],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("tier", tier!)
        .single();
      if (error) throw error;
      return data as unknown as Plan;
    },
    enabled: !!tier,
  });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (plan: Insert<"plans">) => {
      const { data, error } = await supabase
        .from("plans")
        .insert(plan)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Plan;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["plans"] }),
  });
}

export function useUpdatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"plans"> & { id: string }) => {
      const { data, error } = await supabase
        .from("plans")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Plan;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["plans"] });
      qc.setQueryData(["plans", data.id], data);
    },
  });
}
