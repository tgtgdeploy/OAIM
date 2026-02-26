import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Plan = Row<"plans">;
type PlanTier = Plan["tier"];

export interface FallbackPlan {
  id: string;
  tier: string;
  name: string;
  industry: string;
  price_monthly: string;
  limits: { messages: number; users: number; products: number };
  features: string[];
}

const CORE_FEATURES = ["whatsapp_inbox", "crm_pipeline", "ai_sales_script", "auto_followup", "customer_support"];
const MARKETING_FEATURES = ["automation", "meta_ads", "referral", "design_pages", "team_permissions"];

const FALLBACK_PLANS: FallbackPlan[] = [
  {
    id: "ecom-trial", tier: "trial", name: "Trial", industry: "ecommerce", price_monthly: "0",
    limits: { messages: 100, users: 1, products: 20 },
    features: [...CORE_FEATURES, "products"],
  },
  {
    id: "ecom-starter", tier: "starter", name: "Starter", industry: "ecommerce", price_monthly: "29",
    limits: { messages: 1000, users: 3, products: 100 },
    features: [...CORE_FEATURES, "products", "orders_erp", "inventory"],
  },
  {
    id: "ecom-pro", tier: "pro", name: "Pro", industry: "ecommerce", price_monthly: "79",
    limits: { messages: 5000, users: 10, products: 500 },
    features: [...CORE_FEATURES, "products", "orders_erp", "inventory", ...MARKETING_FEATURES],
  },
  {
    id: "ecom-business", tier: "business", name: "Business", industry: "ecommerce", price_monthly: "149",
    limits: { messages: -1, users: -1, products: -1 },
    features: [...CORE_FEATURES, "products", "orders_erp", "inventory", ...MARKETING_FEATURES, "professional_services"],
  },

  {
    id: "fnb-trial", tier: "trial", name: "Trial", industry: "fnb", price_monthly: "0",
    limits: { messages: 100, users: 1, products: 20 },
    features: [...CORE_FEATURES, "menu_management", "reservations"],
  },
  {
    id: "fnb-starter", tier: "starter", name: "Starter", industry: "fnb", price_monthly: "29",
    limits: { messages: 1000, users: 3, products: 100 },
    features: [...CORE_FEATURES, "menu_management", "reservations", "delivery", "tables_checkout"],
  },
  {
    id: "fnb-pro", tier: "pro", name: "Pro", industry: "fnb", price_monthly: "79",
    limits: { messages: 5000, users: 10, products: 500 },
    features: [...CORE_FEATURES, "menu_management", "reservations", "delivery", "tables_checkout", ...MARKETING_FEATURES],
  },
  {
    id: "fnb-business", tier: "business", name: "Business", industry: "fnb", price_monthly: "149",
    limits: { messages: -1, users: -1, products: -1 },
    features: [...CORE_FEATURES, "menu_management", "reservations", "delivery", "tables_checkout", ...MARKETING_FEATURES, "professional_services"],
  },

  {
    id: "beauty-trial", tier: "trial", name: "Trial", industry: "beauty", price_monthly: "0",
    limits: { messages: 100, users: 1, products: 20 },
    features: [...CORE_FEATURES, "booking", "services_catalog"],
  },
  {
    id: "beauty-starter", tier: "starter", name: "Starter", industry: "beauty", price_monthly: "29",
    limits: { messages: 1000, users: 3, products: 100 },
    features: [...CORE_FEATURES, "booking", "services_catalog", "therapist_schedule", "loyalty_packages"],
  },
  {
    id: "beauty-pro", tier: "pro", name: "Pro", industry: "beauty", price_monthly: "79",
    limits: { messages: 5000, users: 10, products: 500 },
    features: [...CORE_FEATURES, "booking", "services_catalog", "therapist_schedule", "loyalty_packages", ...MARKETING_FEATURES],
  },
  {
    id: "beauty-business", tier: "business", name: "Business", industry: "beauty", price_monthly: "149",
    limits: { messages: -1, users: -1, products: -1 },
    features: [...CORE_FEATURES, "booking", "services_catalog", "therapist_schedule", "loyalty_packages", ...MARKETING_FEATURES, "professional_services"],
  },
];

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_PLANS as unknown as Plan[];
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
