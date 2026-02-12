import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare, ShoppingCart, Users, GitBranch, Repeat, BarChart3, Bot, Package,
  Headphones, Share2, Palette, Zap, Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const allPlans = ["trial", "starter", "pro", "business"];

export default function ModulesPage() {
  const { t } = useTranslation("superadmin");

  const modules = [
    { key: "whatsapp_inbox", name: t("modules.whatsappInbox"), desc: t("modules.whatsappInboxDesc"), icon: MessageSquare, plans: ["trial", "starter", "pro", "business"], core: true },
    { key: "ai_sales_script", name: t("modules.aiSalesScript"), desc: t("modules.aiSalesScriptDesc"), icon: Bot, plans: ["trial", "starter", "pro", "business"], core: true },
    { key: "crm_pipeline", name: t("modules.crmPipeline"), desc: t("modules.crmPipelineDesc"), icon: GitBranch, plans: ["starter", "pro", "business"], core: false },
    { key: "orders_erp", name: t("modules.ordersErp"), desc: t("modules.ordersErpDesc"), icon: ShoppingCart, plans: ["pro", "business"], core: false },
    { key: "products", name: t("modules.productCatalog"), desc: t("modules.productCatalogDesc"), icon: Package, plans: ["starter", "pro", "business"], core: false },
    { key: "auto_followup", name: t("modules.autoFollowup"), desc: t("modules.autoFollowupDesc"), icon: Repeat, plans: ["pro", "business"], core: false },
    { key: "automation", name: t("modules.automationWorkflows"), desc: t("modules.automationWorkflowsDesc"), icon: Zap, plans: ["pro", "business"], core: false },
    { key: "customer_support", name: t("modules.customerSupport"), desc: t("modules.customerSupportDesc"), icon: Headphones, plans: ["starter", "pro", "business"], core: false },
    { key: "meta_ads", name: t("modules.metaAds"), desc: t("modules.metaAdsDesc"), icon: BarChart3, plans: ["business"], core: false },
    { key: "referral", name: t("modules.referralCommission"), desc: t("modules.referralCommissionDesc"), icon: Share2, plans: ["pro", "business"], core: false },
    { key: "design_pages", name: t("modules.designPages"), desc: t("modules.designPagesDesc"), icon: Palette, plans: ["business"], core: false },
    { key: "team_permissions", name: t("modules.teamPermissions"), desc: t("modules.teamPermissionsDesc"), icon: Users, plans: ["business"], core: false },
  ];

  return (
    <SuperAdminLayout title={t("modules.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">{t("modules.modulesAcrossPlans", { modules: modules.length, plans: allPlans.length })}</p>
          </div>
          <Button variant="outline" data-testid="button-module-settings">
            <Settings className="h-4 w-4 mr-2" />{t("modules.globalSettings")}
          </Button>
        </div>

        <div className="space-y-3">
          {modules.map((mod) => (
            <Card key={mod.key} data-testid={`card-module-${mod.key}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                    <mod.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold">{mod.name}</span>
                      {mod.core && <Badge variant="default" className="text-xs">{t("modules.core")}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{mod.desc}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {allPlans.map((plan) => (
                        <Badge
                          key={plan}
                          variant={mod.plans.includes(plan) ? "default" : "secondary"}
                          className={`text-xs capitalize ${!mod.plans.includes(plan) ? "opacity-40" : ""}`}
                        >
                          {plan}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Switch checked={true} disabled={mod.core} data-testid={`switch-module-${mod.key}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
