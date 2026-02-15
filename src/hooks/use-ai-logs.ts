import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type AiLog = Row<"ai_logs">;

export function useAiLogs(tenantId?: string | null) {
  return useQuery({
    queryKey: ["ai_logs", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("ai_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as AiLog[];
    },
  });
}

export function useCreateAiLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (log: Insert<"ai_logs">) => {
      const { data, error } = await supabase
        .from("ai_logs")
        .insert(log)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as AiLog;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ai_logs"] }),
  });
}
