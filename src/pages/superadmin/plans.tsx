import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, Edit, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePlans } from "@/hooks/use-plans";
import { useFeatureFlags } from "@/hooks/use-feature-flags";

const allTiers = ["trial", "starter", "pro", "business"];

interface PlanLimits {
  messages?: number;
  users?: number;
  products?: number;
}

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
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{t("plans.plansConfigured", { count: plans.length })}</p>
              <Button data-testid="button-add-plan">
                <Plus className="h-4 w-4 mr-2" />
                {t("plans.addPlan")}
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan) => {
                const price = parseFloat(plan.price_monthly);
                const limits = plan.limits as PlanLimits;

                return (
                  <Card key={plan.tier} data-testid={`card-plan-${plan.tier}`}>
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
                      <div className="space-y-2 text-sm">
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
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("plans.modulesLabel")}</span>
                          <span className="font-medium">{plan.features.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
                    {featureFlags.map((flag) => (
                      <TableRow key={flag.key} data-testid={`row-flag-${flag.key}`}>
                        <TableCell className="font-medium text-sm">{flag.name}</TableCell>
                        {allTiers.map((tier) => (
                          <TableCell key={tier} className="text-center">
                            <Switch
                              checked={flag.plans.includes(tier)}
                              data-testid={`switch-${flag.key}-${tier}`}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
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
