import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row, Insert, Update } from "@/lib/database.types";

type ProductVariant = Row<"product_variants">;

export function useProductVariants(productId: string | undefined) {
  return useQuery({
    queryKey: ["product_variants", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", productId!)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProductVariant[];
    },
    enabled: !!productId,
  });
}

export function useCreateProductVariant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (variant: Insert<"product_variants">) => {
      const { data, error } = await supabase
        .from("product_variants")
        .insert(variant)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as ProductVariant;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["product_variants", data.product_id] }),
  });
}

export function useUpdateProductVariant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Update<"product_variants"> & { id: string }) => {
      const { data, error } = await supabase
        .from("product_variants")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as ProductVariant;
    },
    onSuccess: (data) =>
      qc.invalidateQueries({ queryKey: ["product_variants", data.product_id] }),
  });
}

export function useDeleteProductVariant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, productId }: { id: string; productId: string }) => {
      const { error } = await supabase.from("product_variants").delete().eq("id", id);
      if (error) throw error;
      return productId;
    },
    onSuccess: (productId) =>
      qc.invalidateQueries({ queryKey: ["product_variants", productId] }),
  });
}
