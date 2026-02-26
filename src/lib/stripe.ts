import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { supabase } from "@/lib/supabase";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
}

// Plan prices in MYR (cents)
export const PLAN_PRICES = {
  starter: {
    amount: 4900, // RM 49.00
    currency: "myr",
    name: "Starter Plan",
  },
  pro: {
    amount: 14900, // RM 149.00
    currency: "myr",
    name: "Pro Plan",
  },
  business: {
    amount: 29900, // RM 299.00
    currency: "myr",
    name: "Business Plan",
  },
} as const;

export type PlanKey = keyof typeof PLAN_PRICES;

export async function createCheckoutSession(params: {
  tenantId: string;
  planId: string;
  planTier: PlanKey;
  successUrl?: string;
  cancelUrl?: string;
}): Promise<{ sessionId: string; url: string }> {
  const { tenantId, planId, planTier, successUrl, cancelUrl } = params;

  const { data, error } = await supabase.functions.invoke("create-checkout-session", {
    body: {
      tenantId,
      planId,
      planTier,
      amount: PLAN_PRICES[planTier].amount,
      productName: PLAN_PRICES[planTier].name,
      successUrl: successUrl ?? `${window.location.origin}/app/settings?payment=success`,
      cancelUrl: cancelUrl ?? `${window.location.origin}/app/settings?payment=cancelled`,
    },
  });

  if (error) throw new Error(error.message ?? "Failed to create checkout session");
  return data as { sessionId: string; url: string };
}
