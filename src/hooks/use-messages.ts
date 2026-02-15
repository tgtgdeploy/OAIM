import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type Message = Row<"messages">;

export function useMessages(conversationId?: string | null) {
  return useQuery({
    queryKey: ["messages", conversationId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (conversationId) query = query.eq("conversation_id", conversationId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Message[];
    },
  });
}

export function useCreateMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (message: Insert<"messages">) => {
      const { data, error } = await supabase
        .from("messages")
        .insert(message)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Message;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["messages", data.conversation_id] });
      qc.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
