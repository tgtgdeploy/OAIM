import { useMemo } from "react";
import { useSubscription } from "./use-subscriptions";

type SubscriptionStatus = "trialing" | "active" | "past_due" | "cancelled" | "expired";
type ReminderType = "d3" | "d6" | "d7" | null;

interface TrialState {
  status: SubscriptionStatus;
  remainingDays: number;
  isExpired: boolean;
  isPremiumLocked: boolean;
  reminderType: ReminderType;
  isLoading: boolean;
}

const GATED_FEATURES = [
  "automations", "campaigns", "referrals", "ads", "ai_chat",
  "inventory", "purchase_orders", "bills", "finance",
  "performance", "media_plan",
  "professional_services",
] as const;
export type GatedFeature = (typeof GATED_FEATURES)[number];

function calculateRemainingDays(trialExpiresAt: string | null): number {
  if (!trialExpiresAt) return 0;
  const now = Date.now();
  const expires = new Date(trialExpiresAt).getTime();
  const diff = expires - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getReminderType(remainingDays: number, status: SubscriptionStatus): ReminderType {
  if (status !== "trialing") return null;
  if (remainingDays <= 1) return "d7";
  if (remainingDays <= 2) return "d6";
  if (remainingDays <= 4) return "d3";
  return null;
}

export function useTrialManager(tenantId?: string | null): TrialState {
  const { data: subscription, isLoading } = useSubscription(tenantId);

  return useMemo(() => {
    if (!subscription) {
      return {
        status: "trialing" as SubscriptionStatus,
        remainingDays: 7,
        isExpired: false,
        isPremiumLocked: false,
        reminderType: null,
        isLoading,
      };
    }

    const status = (subscription.status ?? "trialing") as SubscriptionStatus;
    const remainingDays = calculateRemainingDays(subscription.trial_expires_at);
    const isExpired = status === "expired" || (status === "trialing" && remainingDays <= 0);
    const isPremiumLocked = isExpired || status === "cancelled";
    const reminderType = getReminderType(remainingDays, status);

    return {
      status: isExpired && status === "trialing" ? "expired" : status,
      remainingDays,
      isExpired,
      isPremiumLocked,
      reminderType,
      isLoading,
    };
  }, [subscription, isLoading]);
}

export function isFeatureGated(feature: string): boolean {
  return GATED_FEATURES.includes(feature as GatedFeature);
}
