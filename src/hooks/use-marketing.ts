import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type MarketingCampaign = Row<"marketing_campaigns">;
type MarketingPerformance = Row<"marketing_performance">;
type AdPlacementPlan = Row<"ad_placement_plans">;

export function useMarketingCampaigns(tenantId?: string | null) {
  return useQuery({
    queryKey: ["marketing_campaigns", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("marketing_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as MarketingCampaign[];
    },
  });
}

export function useCreateMarketingCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (campaign: Insert<"marketing_campaigns">) => {
      const { data, error } = await supabase
        .from("marketing_campaigns")
        .insert(campaign)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as MarketingCampaign;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["marketing_campaigns", data.tenant_id] }),
  });
}

export function useUpdateMarketingCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"marketing_campaigns"> & { id: string }) => {
      const { data, error } = await supabase
        .from("marketing_campaigns")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as MarketingCampaign;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["marketing_campaigns", data.tenant_id] }),
  });
}

export function useMarketingPerformance(tenantId?: string | null, days = 30) {
  return useQuery({
    queryKey: ["marketing_performance", tenantId ?? "all", days],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - days);
      let query = supabase
        .from("marketing_performance")
        .select("*")
        .gte("date", since.toISOString().split("T")[0])
        .order("date", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as MarketingPerformance[];
    },
  });
}

export function useAdPlacementPlans(tenantId?: string | null) {
  return useQuery({
    queryKey: ["ad_placement_plans", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("ad_placement_plans")
        .select("*")
        .order("created_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as AdPlacementPlan[];
    },
  });
}

export function useCreateAdPlacementPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (plan: Insert<"ad_placement_plans">) => {
      const { data, error } = await supabase
        .from("ad_placement_plans")
        .insert(plan)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as AdPlacementPlan;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["ad_placement_plans", data.tenant_id] }),
  });
}

export function useUpdateAdPlacementPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"ad_placement_plans"> & { id: string }) => {
      const { data, error } = await supabase
        .from("ad_placement_plans")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as AdPlacementPlan;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["ad_placement_plans", data.tenant_id] }),
  });
}
