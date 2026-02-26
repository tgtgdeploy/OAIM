import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Warehouse, ClipboardList, FileText, DollarSign, Target, Calendar,
  Zap, Share2, BarChart3, MessageSquare, Briefcase,
  Check, Crown, Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTrialManager } from "@/hooks/use-trial-manager";
import { useAuthStore } from "@/stores/auth-store";
import { MODULE_REGISTRY, type ModuleDefinition, type ModuleTier } from "@/lib/module-registry";

const iconMap: Record<string, typeof MessageSquare> = {
  inventory: Warehouse,
  purchase_orders: ClipboardList,
  bills: FileText,
  finance: DollarSign,
  campaigns: BarChart3,
  performance: Target,
  media_plan: Calendar,
  automations: Zap,
  referrals: Share2,
  ads: BarChart3,
  ai_chat: MessageSquare,
  professional_services: Briefcase,
};

const tierColors: Record<ModuleTier, string> = {
  free: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  starter: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  pro: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  business: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

function PluginCard({ module, isUnlocked, isTrial }: { module: ModuleDefinition; isUnlocked: boolean; isTrial: boolean }) {
  const { t } = useTranslation("app");
  const Icon = iconMap[module.key] ?? Zap;
  const isAddon = module.category === "addon";

  return (
    <Card className={`relative overflow-hidden ${isUnlocked ? "border-primary/30" : ""}`} data-testid={`card-plugin-${module.key}`}>
      {isAddon && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-md bg-amber-500 text-white text-xs">
            <Crown className="h-3 w-3 mr-1" />
            {t("plugins.addon")}
          </Badge>
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${isUnlocked ? "bg-primary/10" : "bg-muted"}`}>
            <Icon className={`h-6 w-6 ${isUnlocked ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold">{t(module.nameKey)}</span>
              <Badge variant="secondary" className={`text-xs capitalize ${tierColors[module.tier]}`}>
                {module.tier}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{t(module.descriptionKey)}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isUnlocked ? (
                  <div className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Check className="h-3.5 w-3.5" />
                    {isTrial ? t("plugins.trialActive") : t("plugins.activated")}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {module.price ? `$${module.price}/mo` : t("plugins.includedIn", { tier: module.tier })}
                  </span>
                )}
              </div>
              {isUnlocked ? (
                <Switch checked disabled={isTrial} data-testid={`switch-plugin-${module.key}`} />
              ) : (
                <Button size="sm" variant="outline" data-testid={`button-unlock-${module.key}`}>
                  {t("plugins.unlock")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PluginsPage() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const { status, remainingDays, isPremiumLocked } = useTrialManager(tenant?.id);
  const isTrial = status === "trialing";
  const isUnlocked = !isPremiumLocked;

  const coreModules = MODULE_REGISTRY.filter((m) => m.category !== "addon");
  const addonModules = MODULE_REGISTRY.filter((m) => m.category === "addon");

  return (
    <AppLayout title={t("plugins.title")}>
      <div className="p-4 md:p-6 space-y-6">
        {isTrial && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 flex items-center gap-3" data-testid="banner-trial-plugins">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{t("plugins.trialBanner", { days: remainingDays })}</p>
              <p className="text-xs text-muted-foreground">{t("plugins.trialBannerDesc")}</p>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-1" data-testid="text-addon-plugins-heading">{t("plugins.addonPlugins")}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t("plugins.addonPluginsDesc")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {addonModules.map((module) => (
              <PluginCard key={module.key} module={module} isUnlocked={isUnlocked} isTrial={isTrial} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-1" data-testid="text-included-modules-heading">{t("plugins.includedModules")}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t("plugins.includedModulesDesc")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {coreModules.map((module) => (
              <PluginCard key={module.key} module={module} isUnlocked={isUnlocked} isTrial={isTrial} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
