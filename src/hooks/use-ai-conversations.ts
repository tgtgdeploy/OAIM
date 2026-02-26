import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type AiConversation = Row<"ai_conversations">;
type AiMessage = Row<"ai_messages">;

export function useAiConversations(tenantId?: string | null) {
  return useQuery({
    queryKey: ["ai_conversations", tenantId ?? "all"],
    queryFn: async () => {
      if (!tenantId) return [];
      const { data, error } = await supabase
        .from("ai_conversations")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("updated_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as AiConversation[];
    },
    enabled: !!tenantId,
  });
}

export function useAiMessages(conversationId?: string | null) {
  return useQuery({
    queryKey: ["ai_messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const { data, error } = await supabase
        .from("ai_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as AiMessage[];
    },
    enabled: !!conversationId,
  });
}

export function useCreateAiConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (conversation: Insert<"ai_conversations">) => {
      const { data, error } = await supabase
        .from("ai_conversations")
        .insert(conversation)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as AiConversation;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["ai_conversations", data.tenant_id] }),
  });
}

export function useCreateAiMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (message: Insert<"ai_messages">) => {
      const { data, error } = await supabase
        .from("ai_messages")
        .insert(message)
        .select()
        .single();
      if (error) throw error;

      // Note: message_count increment could be handled by a DB trigger

      return data as unknown as AiMessage;
    },
    onSuccess: (data) => {
      const msg = data as AiMessage;
      qc.invalidateQueries({ queryKey: ["ai_messages", msg.conversation_id] });
    },
  });
}
