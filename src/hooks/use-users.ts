import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type User = Row<"users">;

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as User;
    },
    enabled: !!id,
  });
}

export function useUserByEmail(email: string | undefined) {
  return useQuery({
    queryKey: ["users", "email", email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email!)
        .single();
      if (error) throw error;
      return data as unknown as User;
    },
    enabled: !!email,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (user: Insert<"users">) => {
      const { data, error } = await supabase
        .from("users")
        .insert(user)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as User;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"users"> & { id: string }) => {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as User;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.setQueryData(["users", data.id], data);
    },
  });
}
