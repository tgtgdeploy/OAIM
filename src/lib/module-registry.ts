import type { LucideIcon } from "lucide-react";
import {
  Warehouse,
  ClipboardList,
  FileText,
  DollarSign,
  Target,
  Calendar,
  Zap,
  Share2,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import type { GatedFeature } from "@/hooks/use-trial-manager";

export type ModuleTier = "free" | "starter" | "pro" | "business";

export interface ModuleDefinition {
  key: GatedFeature;
  nameKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  tier: ModuleTier;
  route: string;
}

/**
 * Module registry — defines all paid feature modules.
 *
 * Tier hierarchy: free < starter < pro < business
 * - free: always available (no gating)
 * - starter: available in starter plan and above
 * - pro: available in pro plan and above
 * - business: only available in business plan
 *
 * Trial users get access to ALL modules during their 7-day trial.
 * After trial expires, modules are locked based on their tier vs subscription plan.
 */
export const MODULE_REGISTRY: ModuleDefinition[] = [
  // ERP Modules (starter tier)
  {
    key: "inventory",
    nameKey: "inventory.title",
    descriptionKey: "gate.modules.inventory",
    icon: Warehouse,
    tier: "starter",
    route: "/app/inventory",
  },
  {
    key: "purchase_orders",
    nameKey: "purchaseOrders.title",
    descriptionKey: "gate.modules.purchaseOrders",
    icon: ClipboardList,
    tier: "starter",
    route: "/app/purchase-orders",
  },
  {
    key: "bills",
    nameKey: "bills.title",
    descriptionKey: "gate.modules.bills",
    icon: FileText,
    tier: "starter",
    route: "/app/bills",
  },
  {
    key: "finance",
    nameKey: "finance.title",
    descriptionKey: "gate.modules.finance",
    icon: DollarSign,
    tier: "starter",
    route: "/app/finance",
  },

  // Ads/Marketing Modules (pro tier)
  {
    key: "campaigns",
    nameKey: "ads.title",
    descriptionKey: "gate.modules.campaigns",
    icon: BarChart3,
    tier: "pro",
    route: "/app/ads",
  },
  {
    key: "performance",
    nameKey: "performance.title",
    descriptionKey: "gate.modules.performance",
    icon: Target,
    tier: "pro",
    route: "/app/performance",
  },
  {
    key: "media_plan",
    nameKey: "mediaPlan.title",
    descriptionKey: "gate.modules.mediaPlan",
    icon: Calendar,
    tier: "pro",
    route: "/app/media-plan",
  },

  // Advanced Modules (pro tier)
  {
    key: "automations",
    nameKey: "sidebar.automation",
    descriptionKey: "gate.modules.automations",
    icon: Zap,
    tier: "pro",
    route: "/app/automation",
  },
  {
    key: "referrals",
    nameKey: "sidebar.referral",
    descriptionKey: "gate.modules.referrals",
    icon: Share2,
    tier: "pro",
    route: "/app/referral",
  },
  {
    key: "ads",
    nameKey: "sidebar.adsRoi",
    descriptionKey: "gate.modules.ads",
    icon: BarChart3,
    tier: "pro",
    route: "/app/ads",
  },
  {
    key: "ai_chat",
    nameKey: "sidebar.inbox",
    descriptionKey: "gate.modules.aiChat",
    icon: MessageSquare,
    tier: "pro",
    route: "/app",
  },
];

const TIER_ORDER: Record<ModuleTier, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  business: 3,
};

/** Check if a subscription plan tier can access a module */
export function canAccessModule(moduleTier: ModuleTier, subscriptionTier: ModuleTier): boolean {
  return TIER_ORDER[subscriptionTier] >= TIER_ORDER[moduleTier];
}

/** Get module definition by key */
export function getModuleByKey(key: GatedFeature): ModuleDefinition | undefined {
  return MODULE_REGISTRY.find((m) => m.key === key);
}

/** Get all modules for a given tier */
export function getModulesByTier(tier: ModuleTier): ModuleDefinition[] {
  return MODULE_REGISTRY.filter((m) => m.tier === tier);
}

/** Routes that are gated (for sidebar lock icon logic) */
export const GATED_ROUTES = new Set(MODULE_REGISTRY.map((m) => m.route));

/** Check if a sidebar route is gated */
export function isRouteGated(route: string): boolean {
  return GATED_ROUTES.has(route);
}
