import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type WebhookLog = Row<"webhook_logs">;

export function useWebhookLogs(tenantId: string | undefined) {
  return useQuery({
    queryKey: ["webhook_logs", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("webhook_logs")
        .select("*")
        .eq("tenant_id", tenantId!)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as WebhookLog[];
    },
    enabled: !!tenantId,
  });
}

export function useCreateWebhookLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (log: Insert<"webhook_logs">) => {
      const { data, error } = await supabase
        .from("webhook_logs")
        .insert(log)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as WebhookLog;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["webhook_logs", data.tenant_id] }),
  });
}
