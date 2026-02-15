import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type DesignAsset = Row<"design_assets">;

export function useDesignAssets() {
  return useQuery({
    queryKey: ["design_assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("design_assets")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DesignAsset[];
    },
  });
}

export function useCreateDesignAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (asset: Insert<"design_assets">) => {
      const { data, error } = await supabase
        .from("design_assets")
        .insert(asset)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as DesignAsset;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["design_assets"] }),
  });
}

export function useUpdateDesignAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"design_assets"> & { id: string }) => {
      const { data, error } = await supabase
        .from("design_assets")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as DesignAsset;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["design_assets"] }),
  });
}

export function useDeleteDesignAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("design_assets")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["design_assets"] }),
  });
}
