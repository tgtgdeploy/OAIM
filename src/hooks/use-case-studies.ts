import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type CaseStudy = Row<"case_studies">;

export function useCaseStudies() {
  return useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CaseStudy[];
    },
  });
}

export function usePublishedCaseStudies() {
  return useQuery({
    queryKey: ["case_studies", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CaseStudy[];
    },
  });
}

export function useCaseStudy(id: string | undefined) {
  return useQuery({
    queryKey: ["case_studies", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as CaseStudy;
    },
    enabled: !!id,
  });
}

export function useCreateCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cs: Insert<"case_studies">) => {
      const { data, error } = await supabase
        .from("case_studies")
        .insert(cs)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as CaseStudy;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["case_studies"] }),
  });
}

export function useUpdateCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"case_studies"> & { id: string }) => {
      const { data, error } = await supabase
        .from("case_studies")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as CaseStudy;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["case_studies"] });
      qc.setQueryData(["case_studies", data.id], data);
    },
  });
}

export function useDeleteCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("case_studies")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["case_studies"] }),
  });
}
