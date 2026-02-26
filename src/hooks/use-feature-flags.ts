import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type FeatureFlag = Row<"feature_flags">;

export interface FallbackFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  is_core: boolean;
  is_enabled: boolean;
  plans: string[];
  category: "core" | "industry" | "marketing" | "addon";
  industries: string[];
}

const FALLBACK_FLAGS: FallbackFlag[] = [
  { id: "1", key: "whatsapp_inbox", name: "WhatsApp Inbox", description: "Core messaging with customers via WhatsApp", is_core: true, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "core", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "2", key: "crm_pipeline", name: "CRM Pipeline", description: "Lead tracking with customizable stages", is_core: true, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "core", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "3", key: "ai_sales_script", name: "AI Sales Script", description: "Automated AI responses and sales assistance", is_core: true, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "core", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "4", key: "auto_followup", name: "Auto Follow-up", description: "Scheduled follow-up sequences", is_core: true, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "core", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "5", key: "customer_support", name: "Customer Support", description: "Ticket management and AI auto-reply", is_core: true, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "core", industries: ["ecommerce", "fnb", "beauty"] },

  { id: "10", key: "products", name: "Product Catalog", description: "Manage products, pricing, and stock", is_core: false, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "industry", industries: ["ecommerce"] },
  { id: "11", key: "orders_erp", name: "Orders & ERP Lite", description: "Order management and basic inventory", is_core: false, is_enabled: true, plans: ["starter", "pro", "business"], category: "industry", industries: ["ecommerce"] },
  { id: "12", key: "inventory", name: "Inventory", description: "Stock tracking and warehouse management", is_core: false, is_enabled: true, plans: ["starter", "pro", "business"], category: "industry", industries: ["ecommerce"] },

  { id: "20", key: "menu_management", name: "Menu Management", description: "Digital menu, categories, pricing and availability", is_core: false, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "industry", industries: ["fnb"] },
  { id: "21", key: "reservations", name: "Reservations", description: "Table booking and guest management", is_core: false, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "industry", industries: ["fnb"] },
  { id: "22", key: "delivery", name: "Delivery Management", description: "Delivery orders, riders and zone management", is_core: false, is_enabled: true, plans: ["starter", "pro", "business"], category: "industry", industries: ["fnb"] },
  { id: "23", key: "tables_checkout", name: "Tables & Checkout", description: "Table layout, QR ordering and POS checkout", is_core: false, is_enabled: true, plans: ["starter", "pro", "business"], category: "industry", industries: ["fnb"] },

  { id: "30", key: "booking", name: "Appointment Booking", description: "Online scheduling, therapist calendar and reminders", is_core: false, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "industry", industries: ["beauty"] },
  { id: "31", key: "services_catalog", name: "Services Catalog", description: "Treatment packages, pricing and session management", is_core: false, is_enabled: true, plans: ["trial", "starter", "pro", "business"], category: "industry", industries: ["beauty"] },
  { id: "32", key: "therapist_schedule", name: "Therapist Scheduling", description: "Staff roster, availability and allocation", is_core: false, is_enabled: true, plans: ["starter", "pro", "business"], category: "industry", industries: ["beauty"] },
  { id: "33", key: "loyalty_packages", name: "Loyalty & Packages", description: "Prepaid packages, membership cards and loyalty points", is_core: false, is_enabled: true, plans: ["starter", "pro", "business"], category: "industry", industries: ["beauty"] },

  { id: "40", key: "automation", name: "Automation & Workflows", description: "Custom triggers, sequences, and scheduled tasks", is_core: false, is_enabled: true, plans: ["pro", "business"], category: "marketing", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "41", key: "meta_ads", name: "Meta Ads & ROI", description: "Campaign tracking and lead attribution", is_core: false, is_enabled: true, plans: ["pro", "business"], category: "marketing", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "42", key: "referral", name: "Referral & Commission", description: "Customer referral program with rewards", is_core: false, is_enabled: true, plans: ["pro", "business"], category: "marketing", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "43", key: "design_pages", name: "Design & Landing Pages", description: "Customizable ad pages and design assets", is_core: false, is_enabled: true, plans: ["pro", "business"], category: "marketing", industries: ["ecommerce", "fnb", "beauty"] },
  { id: "44", key: "team_permissions", name: "Team & Permissions", description: "Multi-admin roles and access control", is_core: false, is_enabled: true, plans: ["pro", "business"], category: "marketing", industries: ["ecommerce", "fnb", "beauty"] },

  { id: "50", key: "professional_services", name: "Professional Services Plugin", description: "Appointments, clients, invoicing, and project management", is_core: false, is_enabled: true, plans: ["business"], category: "addon", industries: ["ecommerce", "fnb", "beauty"] },
];

export function useFeatureFlags() {
  return useQuery({
    queryKey: ["feature_flags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feature_flags")
        .select("*")
        .order("key", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_FLAGS as unknown as FeatureFlag[];
      return data as FeatureFlag[];
    },
  });
}

export function useFeatureFlag(id: string | undefined) {
  return useQuery({
    queryKey: ["feature_flags", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feature_flags")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as FeatureFlag;
    },
    enabled: !!id,
  });
}

export function useCreateFeatureFlag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (flag: Insert<"feature_flags">) => {
      const { data, error } = await supabase
        .from("feature_flags")
        .insert(flag)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as FeatureFlag;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feature_flags"] }),
  });
}

export function useUpdateFeatureFlag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"feature_flags"> & { id: string }) => {
      const { data, error } = await supabase
        .from("feature_flags")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as FeatureFlag;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["feature_flags"] });
      qc.setQueryData(["feature_flags", data.id], data);
    },
  });
}
