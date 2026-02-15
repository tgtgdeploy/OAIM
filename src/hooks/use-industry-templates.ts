import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type IndustryTemplate = Row<"industry_templates">;

export function useIndustryTemplates() {
  return useQuery({
    queryKey: ["industry_templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industry_templates")
        .select("*")
        .order("industry", { ascending: true });
      if (error) throw error;
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
