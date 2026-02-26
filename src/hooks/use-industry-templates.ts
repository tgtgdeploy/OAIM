import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type IndustryTemplate = Row<"industry_templates">;

interface FallbackTemplate {
  id: string;
  key: string;
  industry: string;
  label: string;
  version: string;
  updated_at: string;
  components: {
    type: string;
    name: string;
    items: string[];
  }[];
}

const FALLBACK_TEMPLATES: FallbackTemplate[] = [
  {
    id: "tmpl-ecom",
    key: "ecommerce",
    industry: "ecommerce",
    label: "E-commerce Template",
    version: "v2.1",
    updated_at: "2025-12-15T00:00:00Z",
    components: [
      { type: "AI Script", name: "E-commerce Sales Script", items: ["Price quoting", "Stock check", "Product recommendation", "Order status", "COD handling", "Upselling", "Shipping inquiry"] },
      { type: "Pipeline", name: "Sales Pipeline", items: ["New Inquiry", "Quoted", "Confirmed", "Payment Received", "Shipped", "Completed", "Closed Lost"] },
      { type: "Tags", name: "Contact Tags", items: ["Hot Lead", "Repeat Buyer", "VIP", "Wholesale", "Dropship", "COD", "Prepaid", "Refund Risk"] },
      { type: "Follow-ups", name: "Follow-up Sequences", items: ["Day 1: Initial follow-up", "Day 3: Product reminder", "Day 7: Special offer", "Day 14: Re-engagement", "Day 30: Loyalty reward"] },
      { type: "Quick Replies", name: "Quick Reply Templates", items: ["Welcome greeting", "Price list share", "Payment confirmation", "Shipping update", "Thank you + review request"] },
      { type: "Storefront", name: "WhatsApp Catalog", items: ["Featured products", "Category browsing", "Cart builder", "Checkout link"] },
    ],
  },
  {
    id: "tmpl-fnb",
    key: "restaurant",
    industry: "restaurant",
    label: "Restaurant Template",
    version: "v1.8",
    updated_at: "2025-11-20T00:00:00Z",
    components: [
      { type: "AI Script", name: "Restaurant Assistant", items: ["Menu sharing", "Reservation handling", "Delivery inquiry", "Dietary questions", "Operating hours", "Promotions", "Catering inquiry"] },
      { type: "Pipeline", name: "Customer Pipeline", items: ["Inquiry", "Reserved", "Dining", "Post-dining", "Regular", "VIP", "Lapsed"] },
      { type: "Tags", name: "Customer Tags", items: ["Regular", "VIP", "Birthday", "Allergies", "Catering", "Delivery", "Dine-in", "Corporate"] },
      { type: "Follow-ups", name: "Re-engagement", items: ["Day 1: Thank you + feedback", "Day 7: Come back offer", "Day 30: Miss you promo", "Day 60: Loyalty reward", "Birthday: Special deal"] },
      { type: "Quick Replies", name: "Quick Reply Templates", items: ["Today's specials", "Reservation confirmed", "Delivery ETA", "Feedback request", "Happy birthday greeting"] },
      { type: "Menu Card", name: "Digital Menu", items: ["Main courses", "Beverages", "Desserts", "Set meals", "Seasonal specials"] },
    ],
  },
  {
    id: "tmpl-beauty",
    key: "beauty",
    industry: "beauty",
    label: "Beauty & Wellness Template",
    version: "v1.5",
    updated_at: "2025-11-10T00:00:00Z",
    components: [
      { type: "AI Script", name: "Beauty Assistant", items: ["Service inquiry", "Booking assistance", "Treatment recommendations", "Aftercare tips", "Price list sharing", "Package inquiry", "Therapist availability"] },
      { type: "Pipeline", name: "Client Pipeline", items: ["New Inquiry", "Consultation", "Trial Session", "Booked", "Completed", "Follow-up", "Membership"] },
      { type: "Tags", name: "Client Tags", items: ["New Client", "Regular", "VIP", "Skin Sensitive", "Package Holder", "Bridal", "Referral", "Lapsed"] },
      { type: "Follow-ups", name: "Care Sequences", items: ["Day 1: Aftercare reminder", "Day 3: Check-in", "Day 7: Feedback request", "Day 30: Rebooking nudge", "Day 90: Loyalty offer", "Birthday: Special treat"] },
      { type: "Quick Replies", name: "Quick Reply Templates", items: ["Welcome & services intro", "Booking confirmed", "Reminder 24h before", "Aftercare instructions", "Package balance update"] },
      { type: "Service Menu", name: "Treatment Catalog", items: ["Facial treatments", "Body treatments", "Hair services", "Nail services", "Packages & bundles"] },
    ],
  },
];

export function useIndustryTemplates() {
  return useQuery({
    queryKey: ["industry_templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industry_templates")
        .select("*")
        .order("industry", { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_TEMPLATES as unknown as IndustryTemplate[];
      return data as IndustryTemplate[];
    },
  });
}

export function useIndustryTemplate(key: string | undefined) {
  return useQuery({
    queryKey: ["industry_templates", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industry_templates")
        .select("*")
        .eq("key", key!)
        .single();
      if (error) throw error;
      return data as unknown as IndustryTemplate;
    },
    enabled: !!key,
  });
}

export function useCreateIndustryTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (template: Insert<"industry_templates">) => {
      const { data, error } = await supabase
        .from("industry_templates")
        .insert(template)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as IndustryTemplate;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industry_templates"] }),
  });
}

export function useUpdateIndustryTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"industry_templates"> & { id: string }) => {
      const { data, error } = await supabase
        .from("industry_templates")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as IndustryTemplate;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industry_templates"] }),
  });
}
