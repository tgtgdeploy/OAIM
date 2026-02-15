import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type FeatureFlag = Row<"feature_flags">;

export function useFeatureFlags() {
  return useQuery({
    queryKey: ["feature_flags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feature_flags")
        .select("*")
        .order("key", { ascending: true });
      if (error) throw error;
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
