import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type Reservation = Row<"reservations">;

export function useReservations(tenantId?: string | null) {
  return useQuery({
    queryKey: ["reservations", tenantId ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: true });
      if (tenantId) query = query.eq("tenant_id", tenantId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Reservation[];
    },
  });
}

export function useCreateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (res: Insert<"reservations">) => {
      const { data, error } = await supabase
        .from("reservations")
        .insert(res)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Reservation;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reservations"] }),
  });
}

export function useUpdateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"reservations"> & { id: string }) => {
      const { data, error } = await supabase
        .from("reservations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Reservation;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reservations"] }),
  });
}
