import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Loader2, CheckCircle2, Store, UtensilsCrossed, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePlans } from "@/hooks/use-plans";
import { useFeatureFlags } from "@/hooks/use-feature-flags";

const allTiers = ["trial", "starter", "pro", "business"];

const industries = [
  { key: "ecommerce", icon: Store },
  { key: "fnb", icon: UtensilsCrossed },
  { key: "beauty", icon: Sparkles },
] as const;

interface PlanLimits {
  messages?: number;
  users?: number;
  products?: number;
}

const moduleNameKeys: Record<string, string> = {
  whatsapp_inbox: "modules.whatsappInbox",
  ai_sales_script: "modules.aiSalesScript",
  crm_pipeline: "modules.crmPipeline",
  auto_followup: "modules.autoFollowup",
  customer_support: "modules.customerSupport",
  products: "modules.productCatalog",
  orders_erp: "modules.ordersErp",
  inventory: "modules.inventory",
  menu_management: "modules.menuManagement",
  reservations: "modules.reservations",
  delivery: "modules.deliveryManagement",
  tables_checkout: "modules.tablesCheckout",
  booking: "modules.appointmentBooking",
  services_catalog: "modules.servicesCatalog",
  therapist_schedule: "modules.therapistScheduling",
  loyalty_packages: "modules.loyaltyPackages",
  automation: "modules.automationWorkflows",
  meta_ads: "modules.metaAds",
  referral: "modules.referralCommission",
  design_pages: "modules.designPages",
  team_permissions: "modules.teamPermissions",
  professional_services: "modules.professionalServices",
};

function formatLimit(value: number | undefined, unlimited: string): string {
  if (value === undefined) return "\u2014";
  if (value === -1) return unlimited;
  return value.toLocaleString();
}

export default function PlansPage() {
  const { t } = useTranslation("superadmin");
  const { data: plans = [], isLoading: plansLoading } = usePlans();
  const { data: featureFlags = [], isLoading: flagsLoading } = useFeatureFlags();

  if (plansLoading || flagsLoading) {
    return (
      <SuperAdminLayout title={t("plans.title")}>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout title={t("plans.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans" data-testid="tab-plans">{t("plans.tabPlans")}</TabsTrigger>
            <TabsTrigger value="flags" data-testid="tab-flags">{t("plans.tabFlags")}</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4 mt-4">
            <Tabs defaultValue="ecommerce">
              <TabsList>
                {industries.map(({ key, icon: Icon }) => (
                  <TabsTrigger key={key} value={key} data-testid={`tab-plans-${key}`}>
                    <Icon className="h-4 w-4 mr-1.5" />
                    {t(`modules.${key}`)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {industries.map(({ key: industryKey }) => {
                const industryPlans = plans.filter((p: any) => p.industry === industryKey);
                return (
                  <TabsContent key={industryKey} value={industryKey} className="space-y-4 mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">{t("plans.plansConfigured", { count: industryPlans.length })}</p>
                      <Button data-testid={`button-add-plan-${industryKey}`}>
                        <Plus className="h-4 w-4 mr-2" />
                        {t("plans.addPlan")}
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {industryPlans.map((plan: any) => {
                        const price = parseFloat(plan.price_monthly);
                        const limits = plan.limits as PlanLimits;
                        return (
                          <Card key={plan.id} data-testid={`card-plan-${plan.id}`}>
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <h3 className="font-bold">{plan.name}</h3>
                                <Button size="icon" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-2xl font-bold mb-1">
                                {price === 0 ? t("plans.free") : `$${price}`}
                                {price > 0 && <span className="text-sm text-muted-foreground font-normal">{t("plans.perMonth")}</span>}
                              </div>
                              <div className="text-xs text-muted-foreground mb-4">{t("plans.activeTenants", { count: 0 })}</div>
                              <div className="space-y-2 text-sm mb-4">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">{t("plans.messages")}</span>
                                  <span className="font-medium">{formatLimit(limits.messages, t("plans.unlimited"))}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">{t("plans.users")}</span>
                                  <span className="font-medium">{formatLimit(limits.users, t("plans.unlimited"))}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">{t("plans.products")}</span>
                                  <span className="font-medium">{formatLimit(limits.products, t("plans.unlimited"))}</span>
                                </div>
                              </div>
                              <div className="border-t pt-3">
                                <p className="text-xs font-medium text-muted-foreground mb-2">{t("plans.modulesLabel")} ({plan.features.length})</p>
                                <div className="space-y-1">
                                  {plan.features.map((feature: string) => (
                                    <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                      <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                      <span>{moduleNameKeys[feature] ? t(moduleNameKeys[feature]) : feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>

          <TabsContent value="flags" className="space-y-4 mt-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{t("plans.featureFlags", { count: featureFlags.length })}</p>
              <Button data-testid="button-add-flag">
                <Plus className="h-4 w-4 mr-2" />
                {t("plans.addFlag")}
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("plans.feature")}</TableHead>
                      {allTiers.map((tier) => (
                        <TableHead key={tier} className="text-center capitalize">{tier}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureFlags.map((flag: any) => {
                      const nameKey = moduleNameKeys[flag.key];
                      return (
                        <TableRow key={flag.key} data-testid={`row-flag-${flag.key}`}>
                          <TableCell className="font-medium text-sm">
                            <div className="flex items-center gap-2">
                              <span>{nameKey ? t(nameKey) : flag.name}</span>
                              {flag.category === "industry" && (
                                <Badge variant="outline" className="text-[10px]">
                                  {(flag.industries || []).map((i: string) => t(`modules.${i}`)).join(", ")}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          {allTiers.map((tier) => (
                            <TableCell key={tier} className="text-center">
                              <Switch
                                checked={flag.plans.includes(tier)}
                                data-testid={`switch-${flag.key}-${tier}`}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}
