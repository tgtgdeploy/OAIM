import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type SupportTicket = Row<"support_tickets">;

export function useSupportTickets(tenantId: string | undefined) {
  return useQuery({
    queryKey: ["support_tickets", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("tenant_id", tenantId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as SupportTicket[];
    },
    enabled: !!tenantId,
  });
}

export function useSupportTicket(id: string | undefined) {
  return useQuery({
    queryKey: ["support_tickets", "detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as SupportTicket;
    },
    enabled: !!id,
  });
}

export function useCreateSupportTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ticket: Insert<"support_tickets">) => {
      const { data, error } = await supabase
        .from("support_tickets")
        .insert(ticket)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as SupportTicket;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["support_tickets", data.tenant_id] }),
  });
}

export function useUpdateSupportTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"support_tickets"> & { id: string }) => {
      const { data, error } = await supabase
        .from("support_tickets")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as SupportTicket;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["support_tickets", data.tenant_id] });
      qc.setQueryData(["support_tickets", "detail", data.id], data);
    },
  });
}
