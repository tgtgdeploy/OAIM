import { AdminLayout } from "./layout";
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
import { Plus, Edit } from "lucide-react";

const plans = [
  { name: "Trial", tier: "trial", price: 0, tenants: 2, features: ["whatsapp_inbox", "ai_sales_script"], limits: { messages: 100, users: 1, products: 10 } },
  { name: "Starter", tier: "starter", price: 29, tenants: 3, features: ["whatsapp_inbox", "ai_sales_script", "crm_pipeline"], limits: { messages: 1000, users: 2, products: 100 } },
  { name: "Pro", tier: "pro", price: 79, tenants: 4, features: ["whatsapp_inbox", "ai_sales_script", "crm_pipeline", "auto_followup", "erp_lite"], limits: { messages: 5000, users: 5, products: 500 } },
  { name: "Business", tier: "business", price: 149, tenants: 1, features: ["whatsapp_inbox", "ai_sales_script", "crm_pipeline", "auto_followup", "erp_lite", "meta_ads", "team_multi_account"], limits: { messages: -1, users: -1, products: -1 } },
];

const featureFlags = [
  { key: "whatsapp_inbox", name: "WhatsApp Inbox", plans: ["trial", "starter", "pro", "business"] },
  { key: "ai_sales_script", name: "AI Sales Script", plans: ["trial", "starter", "pro", "business"] },
  { key: "crm_pipeline", name: "CRM Pipeline", plans: ["starter", "pro", "business"] },
  { key: "auto_followup", name: "Auto Follow-up", plans: ["pro", "business"] },
  { key: "erp_lite", name: "ERP Lite", plans: ["pro", "business"] },
  { key: "meta_ads", name: "Meta Ads & ROI", plans: ["business"] },
  { key: "team_multi_account", name: "Team & Permissions", plans: ["business"] },
];

const allTiers = ["trial", "starter", "pro", "business"];

export default function PlansPage() {
  return (
    <AdminLayout title="Plans & Feature Flags">
      <div className="p-4 md:p-6 space-y-4">
        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans" data-testid="tab-plans">Plans</TabsTrigger>
            <TabsTrigger value="flags" data-testid="tab-flags">Feature Flags</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4 mt-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{plans.length} plans configured</p>
              <Button data-testid="button-add-plan">
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <Card key={plan.tier} data-testid={`card-plan-${plan.tier}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-bold">{plan.name}</h3>
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                      {plan.price > 0 && <span className="text-sm text-muted-foreground font-normal">/mo</span>}
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">{plan.tenants} active tenants</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Messages</span>
                        <span className="font-medium">{plan.limits.messages === -1 ? "Unlimited" : plan.limits.messages.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Users</span>
                        <span className="font-medium">{plan.limits.users === -1 ? "Unlimited" : plan.limits.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Products</span>
                        <span className="font-medium">{plan.limits.products === -1 ? "Unlimited" : plan.limits.products}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Modules</span>
                        <span className="font-medium">{plan.features.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flags" className="space-y-4 mt-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{featureFlags.length} feature flags</p>
              <Button data-testid="button-add-flag">
                <Plus className="h-4 w-4 mr-2" />
                Add Flag
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
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
    </AdminLayout>
  );
}
