import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Transaction = Row<"transactions">;

export function useTransactions(tenantId?: string | null) {
  return useQuery({
    queryKey: ["transactions", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("transactions")
        .select("*")
        .order("transaction_date", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Transaction[];
    },
  });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Insert<"transactions">) => {
      const { data, error } = await supabase
        .from("transactions")
        .insert(t)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Transaction;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"transactions"> & { id: string }) => {
      const { data, error } = await supabase
        .from("transactions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Transaction;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });
}
