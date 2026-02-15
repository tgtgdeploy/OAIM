import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Conversation = Row<"conversations">;

export function useConversations(tenantId?: string | null) {
  return useQuery({
    queryKey: ["conversations", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("conversations")
        .select("*")
        .order("last_message_at", { ascending: false, nullsFirst: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Conversation[];
    },
  });
}

export function useConversation(id: string | undefined) {
  return useQuery({
    queryKey: ["conversations", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as Conversation;
    },
    enabled: !!id,
  });
}

export function useConversationsByContact(contactId: string | undefined) {
  return useQuery({
    queryKey: ["conversations", "contact", contactId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("contact_id", contactId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Conversation[];
    },
    enabled: !!contactId,
  });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (conversation: Insert<"conversations">) => {
      const { data, error } = await supabase
        .from("conversations")
        .insert(conversation)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Conversation;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["conversations", data.tenant_id] }),
  });
}

export function useUpdateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"conversations"> & { id: string }) => {
      const { data, error } = await supabase
        .from("conversations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Conversation;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["conversations", data.tenant_id] });
      qc.setQueryData(["conversations", "detail", data.id], data);
    },
  });
}
