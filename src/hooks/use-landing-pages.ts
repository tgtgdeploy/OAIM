import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type LandingPage = Row<"landing_pages">;

export function useLandingPages(tenantId?: string | null) {
  return useQuery({
    queryKey: ["landing_pages", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("landing_pages")
        .select("*")
        .order("updated_at", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LandingPage[];
    },
  });
}

export function useCreateLandingPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (page: Insert<"landing_pages">) => {
      const { data, error } = await supabase
        .from("landing_pages")
        .insert(page)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as LandingPage;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["landing_pages"] }),
  });
}

export function useUpdateLandingPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"landing_pages"> & { id: string }) => {
      const { data, error } = await supabase
        .from("landing_pages")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as LandingPage;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["landing_pages"] }),
  });
}

export function useDeleteLandingPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("landing_pages")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["landing_pages"] }),
  });
}
