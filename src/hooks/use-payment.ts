import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession, type PlanKey } from "@/lib/stripe";
import { useUpdateSubscription } from "./use-subscriptions";

export function useCreateCheckout() {
  return useMutation({
    mutationFn: async (params: {
      tenantId: string;
      planId: string;
      planTier: PlanKey;
    }) => {
      const result = await createCheckoutSession(params);
      // Redirect to Stripe checkout
      if (result.url) {
        window.location.href = result.url;
      }
      return result;
    },
  });
}

export function usePaymentSuccess() {
  const updateSub = useUpdateSubscription();

  return {
    isPaymentSuccess: new URLSearchParams(window.location.search).get("payment") === "success",
    isPaymentCancelled: new URLSearchParams(window.location.search).get("payment") === "cancelled",
    confirmPayment: async (subscriptionId: string) => {
      await updateSub.mutateAsync({
        id: subscriptionId,
        status: "active",
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    },
  };
}
