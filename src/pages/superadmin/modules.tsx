import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare, ShoppingCart, Users, GitBranch, Repeat, BarChart3, Bot, Package,
  Headphones, Share2, Palette, Zap, Settings, Briefcase, TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFeatureFlags } from "@/hooks/use-feature-flags";

const allPlans = ["trial", "starter", "pro", "business"];

const iconMap: Record<string, typeof MessageSquare> = {
  whatsapp_inbox: MessageSquare,
  ai_sales_script: Bot,
  crm_pipeline: GitBranch,
  orders_erp: ShoppingCart,
  products: Package,
  auto_followup: Repeat,
  automation: Zap,
  customer_support: Headphones,
  meta_ads: BarChart3,
  referral: Share2,
  design_pages: Palette,
  team_permissions: Users,
  professional_services: Briefcase,
  quant_trading: TrendingUp,
};

export default function ModulesPage() {
  const { t } = useTranslation("superadmin");
  const { data: featureFlags = [], isLoading } = useFeatureFlags();

  if (isLoading) {
    return (
      <SuperAdminLayout title={t("modules.title")}>
        <div className="p-4 md:p-6 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary animate-pulse" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout title={t("modules.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">{t("modules.modulesAcrossPlans", { modules: featureFlags.length, plans: allPlans.length })}</p>
          </div>
          <Button variant="outline" data-testid="button-module-settings">
            <Settings className="h-4 w-4 mr-2" />{t("modules.globalSettings")}
          </Button>
        </div>

        <div className="space-y-3">
          {featureFlags.map((flag) => {
            const Icon = iconMap[flag.key] ?? Settings;

            return (
              <Card key={flag.key} data-testid={`card-module-${flag.key}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold">{flag.name}</span>
                        {flag.is_core && <Badge variant="default" className="text-xs">{t("modules.core")}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{flag.description ?? ""}</p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {allPlans.map((plan) => (
                          <Badge
                            key={plan}
                            variant={flag.plans.includes(plan) ? "default" : "secondary"}
                            className={`text-xs capitalize ${!flag.plans.includes(plan) ? "opacity-40" : ""}`}
                          >
                            {plan}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Switch checked={flag.is_enabled} disabled={flag.is_core} data-testid={`switch-module-${flag.key}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
