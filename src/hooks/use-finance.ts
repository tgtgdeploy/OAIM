import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert } from "@/lib/database.types";

type FinanceTransaction = Row<"finance_transactions">;

export function useFinanceTransactions(tenantId?: string | null) {
  return useQuery({
    queryKey: ["finance_transactions", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("finance_transactions")
        .select("*")
        .order("date", { ascending: false });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as FinanceTransaction[];
    },
  });
}

export function useCreateFinanceTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (tx: Insert<"finance_transactions">) => {
      const { data, error } = await supabase
        .from("finance_transactions")
        .insert(tx)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as FinanceTransaction;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["finance_transactions", data.tenant_id] }),
  });
}
