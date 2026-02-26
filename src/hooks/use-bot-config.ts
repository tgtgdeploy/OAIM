import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type BotConfig = Row<"bot_configs">;

export function useBotConfig(tenantId?: string | null) {
  return useQuery({
    queryKey: ["bot_configs", tenantId ?? "all"],
    queryFn: async () => {
      if (!tenantId) return null;
      const { data, error } = await supabase
        .from("bot_configs")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      return (data?.[0] as BotConfig) ?? null;
    },
    enabled: !!tenantId,
  });
}

export function useCreateBotConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (config: Insert<"bot_configs">) => {
      const { data, error } = await supabase
        .from("bot_configs")
        .insert(config)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as BotConfig;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["bot_configs", data.tenant_id] }),
  });
}

export function useUpdateBotConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"bot_configs"> & { id: string }) => {
      const { data, error } = await supabase
        .from("bot_configs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as BotConfig;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["bot_configs", data.tenant_id] }),
  });
}
