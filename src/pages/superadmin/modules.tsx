import { useState } from "react";
import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  MessageSquare, ShoppingCart, Users, GitBranch, Repeat, BarChart3, Bot, Package,
  Headphones, Share2, Palette, Zap, Settings, Briefcase, Crown,
  Store, UtensilsCrossed, Sparkles,
  CalendarDays, Truck, QrCode, Scissors, Heart, Clock, Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFeatureFlags, type FallbackFlag } from "@/hooks/use-feature-flags";

const allPlans = ["trial", "starter", "pro", "business"];

const iconMap: Record<string, typeof MessageSquare> = {
  whatsapp_inbox: MessageSquare,
  ai_sales_script: Bot,
  crm_pipeline: GitBranch,
  auto_followup: Repeat,
  customer_support: Headphones,
  products: Package,
  orders_erp: ShoppingCart,
  inventory: Package,
  menu_management: Store,
  reservations: CalendarDays,
  delivery: Truck,
  tables_checkout: QrCode,
  booking: CalendarDays,
  services_catalog: Scissors,
  therapist_schedule: Clock,
  loyalty_packages: Star,
  automation: Zap,
  meta_ads: BarChart3,
  referral: Share2,
  design_pages: Palette,
  team_permissions: Users,
  professional_services: Briefcase,
};

const i18nKeyMap: Record<string, { name: string; desc: string }> = {
  whatsapp_inbox: { name: "modules.whatsappInbox", desc: "modules.whatsappInboxDesc" },
  ai_sales_script: { name: "modules.aiSalesScript", desc: "modules.aiSalesScriptDesc" },
  crm_pipeline: { name: "modules.crmPipeline", desc: "modules.crmPipelineDesc" },
  auto_followup: { name: "modules.autoFollowup", desc: "modules.autoFollowupDesc" },
  customer_support: { name: "modules.customerSupport", desc: "modules.customerSupportDesc" },
  products: { name: "modules.productCatalog", desc: "modules.productCatalogDesc" },
  orders_erp: { name: "modules.ordersErp", desc: "modules.ordersErpDesc" },
  inventory: { name: "modules.inventory", desc: "modules.inventoryDesc" },
  menu_management: { name: "modules.menuManagement", desc: "modules.menuManagementDesc" },
  reservations: { name: "modules.reservations", desc: "modules.reservationsDesc" },
  delivery: { name: "modules.deliveryManagement", desc: "modules.deliveryManagementDesc" },
  tables_checkout: { name: "modules.tablesCheckout", desc: "modules.tablesCheckoutDesc" },
  booking: { name: "modules.appointmentBooking", desc: "modules.appointmentBookingDesc" },
  services_catalog: { name: "modules.servicesCatalog", desc: "modules.servicesCatalogDesc" },
  therapist_schedule: { name: "modules.therapistScheduling", desc: "modules.therapistSchedulingDesc" },
  loyalty_packages: { name: "modules.loyaltyPackages", desc: "modules.loyaltyPackagesDesc" },
  automation: { name: "modules.automationWorkflows", desc: "modules.automationWorkflowsDesc" },
  meta_ads: { name: "modules.metaAds", desc: "modules.metaAdsDesc" },
  referral: { name: "modules.referralCommission", desc: "modules.referralCommissionDesc" },
  design_pages: { name: "modules.designPages", desc: "modules.designPagesDesc" },
  team_permissions: { name: "modules.teamPermissions", desc: "modules.teamPermissionsDesc" },
  professional_services: { name: "modules.professionalServices", desc: "modules.professionalServicesDesc" },
};

const industries = [
  { key: "all", icon: Settings },
  { key: "ecommerce", icon: Store },
  { key: "fnb", icon: UtensilsCrossed },
  { key: "beauty", icon: Sparkles },
] as const;

type FlagLike = FallbackFlag & Record<string, any>;

export default function ModulesPage() {
  const { t } = useTranslation("superadmin");
  const { data: featureFlags = [], isLoading } = useFeatureFlags();
  const [selectedIndustry, setSelectedIndustry] = useState("all");

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

  const flags = featureFlags as unknown as FlagLike[];

  const filteredFlags = selectedIndustry === "all"
    ? flags
    : flags.filter((f) => {
        const ind = f.industries as string[] | undefined;
        if (!ind) return true;
        return ind.includes(selectedIndustry);
      });

  const coreFlags = filteredFlags.filter((f) => f.category === "core");
  const industryFlags = filteredFlags.filter((f) => f.category === "industry");
  const marketingFlags = filteredFlags.filter((f) => f.category === "marketing");
  const addonFlags = filteredFlags.filter((f) => f.category === "addon");

  function renderModuleCard(flag: FlagLike) {
    const Icon = iconMap[flag.key] ?? Settings;
    const keys = i18nKeyMap[flag.key];
    const isAddon = flag.category === "addon";
    const name = keys ? t(keys.name) : flag.name;
    const desc = keys ? t(keys.desc) : (flag.description ?? "");
    const ind = flag.industries as string[] | undefined;

    return (
      <Card key={flag.key} data-testid={`card-module-${flag.key}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-md flex-shrink-0 ${isAddon ? "bg-amber-500/10" : "bg-primary/10"}`}>
              <Icon className={`h-5 w-5 ${isAddon ? "text-amber-600 dark:text-amber-400" : "text-primary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-semibold">{name}</span>
                {flag.is_core && <Badge variant="default" className="text-xs">{t("modules.core")}</Badge>}
                {isAddon && (
                  <Badge className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    <Crown className="h-3 w-3 mr-1" />
                    {t("modules.paidAddon")}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{desc}</p>
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
                {ind && flag.category === "industry" && (
                  <Badge variant="outline" className="text-[10px] ml-1">
                    {ind.map((i) => t(`modules.${i}`)).join(", ")}
                  </Badge>
                )}
              </div>
            </div>
            <Switch checked={flag.is_enabled} disabled={flag.is_core} data-testid={`switch-module-${flag.key}`} />
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderSection(title: string, sectionFlags: FlagLike[], testId: string) {
    if (sectionFlags.length === 0) return null;
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide" data-testid={testId}>{title}</h3>
        {sectionFlags.map(renderModuleCard)}
      </div>
    );
  }

  return (
    <SuperAdminLayout title={t("modules.title")}>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">{t("modules.modulesAcrossPlans", { modules: filteredFlags.length, plans: allPlans.length })}</p>
          </div>
          <Button variant="outline" data-testid="button-module-settings">
            <Settings className="h-4 w-4 mr-2" />{t("modules.globalSettings")}
          </Button>
        </div>

        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <TabsList>
            {industries.map(({ key, icon: Icon }) => (
              <TabsTrigger key={key} value={key} data-testid={`tab-modules-${key}`}>
                <Icon className="h-4 w-4 mr-1.5" />
                {key === "all" ? t("modules.allIndustries") : t(`modules.${key}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {renderSection(t("modules.coreModules"), coreFlags, "text-core-section")}
        {renderSection(t("modules.industryModules"), industryFlags, "text-industry-section")}
        {renderSection(t("modules.marketingModules"), marketingFlags, "text-marketing-section")}
        {renderSection(t("modules.addonModules"), addonFlags, "text-addon-section")}
      </div>
    </SuperAdminLayout>
  );
}
