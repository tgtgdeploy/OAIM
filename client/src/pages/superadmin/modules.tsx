import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare, ShoppingCart, Users, GitBranch, Repeat, BarChart3, Bot, Package,
  Headphones, Share2, Palette, Zap, Settings,
} from "lucide-react";

const modules = [
  { key: "whatsapp_inbox", name: "WhatsApp Inbox", desc: "Core messaging with customers via WhatsApp", icon: MessageSquare, plans: ["trial", "starter", "pro", "business"], core: true },
  { key: "ai_sales_script", name: "AI Sales Script", desc: "Automated AI responses and sales assistance", icon: Bot, plans: ["trial", "starter", "pro", "business"], core: true },
  { key: "crm_pipeline", name: "CRM Pipeline", desc: "Lead tracking with customizable stages", icon: GitBranch, plans: ["starter", "pro", "business"], core: false },
  { key: "orders_erp", name: "Orders & ERP Lite", desc: "Order management and basic inventory", icon: ShoppingCart, plans: ["pro", "business"], core: false },
  { key: "products", name: "Product Catalog", desc: "Manage products, pricing, and stock", icon: Package, plans: ["starter", "pro", "business"], core: false },
  { key: "auto_followup", name: "Auto Follow-up", desc: "Scheduled follow-up sequences", icon: Repeat, plans: ["pro", "business"], core: false },
  { key: "automation", name: "Automation & Workflows", desc: "Custom triggers, sequences, and scheduled tasks", icon: Zap, plans: ["pro", "business"], core: false },
  { key: "customer_support", name: "Customer Support", desc: "Ticket management and AI auto-reply", icon: Headphones, plans: ["starter", "pro", "business"], core: false },
  { key: "meta_ads", name: "Meta Ads & ROI", desc: "Campaign tracking and lead attribution", icon: BarChart3, plans: ["business"], core: false },
  { key: "referral", name: "Referral & Commission", desc: "Customer referral program with rewards", icon: Share2, plans: ["pro", "business"], core: false },
  { key: "design_pages", name: "Design & Landing Pages", desc: "Customizable ad pages and design assets", icon: Palette, plans: ["business"], core: false },
  { key: "team_permissions", name: "Team & Permissions", desc: "Multi-admin roles and access control", icon: Users, plans: ["business"], core: false },
];

const allPlans = ["trial", "starter", "pro", "business"];

export default function ModulesPage() {
  return (
    <SuperAdminLayout title="Modules">
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">{modules.length} modules across {allPlans.length} plans</p>
          </div>
          <Button variant="outline" data-testid="button-module-settings">
            <Settings className="h-4 w-4 mr-2" />Global Settings
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
                      {mod.core && <Badge variant="default" className="text-xs">Core</Badge>}
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
