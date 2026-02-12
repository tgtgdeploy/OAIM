import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { StatCard } from "@/components/shared/stat-card";
import { Plus, Bot, Repeat, Clock, Zap, MessageSquare, Settings, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const superadminAutomations = [
  { id: "1", name: "Welcome Message", type: "trigger", enabled: true, tenants: 7, desc: "Auto-reply to first message from new contact" },
  { id: "2", name: "Order Confirmation", type: "trigger", enabled: true, tenants: 5, desc: "Send confirmation when order status changes" },
  { id: "3", name: "Follow-up Sequence", type: "sequence", enabled: true, tenants: 4, desc: "Day 1/3/7/14 follow-up after inquiry" },
  { id: "4", name: "Abandoned Cart", type: "trigger", enabled: false, tenants: 0, desc: "Remind customers about unpurchased items" },
  { id: "5", name: "Birthday Greeting", type: "scheduled", enabled: true, tenants: 3, desc: "Auto-send birthday message with special offer" },
];

const merchantAutomations = [
  { id: "1", name: "Welcome Message", type: "trigger", enabled: true, fired: 234, desc: "Greet new contacts automatically" },
  { id: "2", name: "Order Confirmation", type: "trigger", enabled: true, fired: 89, desc: "Confirm orders via WhatsApp" },
  { id: "3", name: "Follow-up Day 1", type: "sequence", enabled: true, fired: 156, desc: "Initial follow-up after inquiry" },
  { id: "4", name: "Follow-up Day 3", type: "sequence", enabled: true, fired: 120, desc: "Second follow-up reminder" },
  { id: "5", name: "Follow-up Day 7", type: "sequence", enabled: false, fired: 0, desc: "Final offer message" },
  { id: "6", name: "AI Auto-Reply", type: "ai", enabled: true, fired: 1200, desc: "AI handles common customer questions" },
];

interface AutomationModuleProps {
  context: "superadmin" | "merchant";
}

export function AutomationModule({ context }: AutomationModuleProps) {
  const { t } = useTranslation("superadmin");
  const automations = context === "superadmin" ? superadminAutomations : merchantAutomations;
  const typeConfig: Record<string, { color: string; icon: typeof Bot }> = {
    trigger: { color: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: Zap },
    sequence: { color: "bg-purple-500/10 text-purple-700 dark:text-purple-300", icon: Repeat },
    scheduled: { color: "bg-orange-500/10 text-orange-700 dark:text-orange-300", icon: Clock },
    ai: { color: "bg-green-500/10 text-green-700 dark:text-green-300", icon: Bot },
  };

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        {context === "superadmin" ? (
          <>
            <StatCard label={t("automation.totalAutomations")} value={automations.length.toString()} icon={Zap} />
            <StatCard label={t("automation.active")} value={automations.filter(a => a.enabled).length.toString()} icon={CheckCircle2} iconColor="text-green-500" />
            <StatCard label={t("automation.tenantsUsing")} value="7" icon={MessageSquare} />
            <StatCard label={t("automation.templatesLabel")} value="5" icon={Bot} />
          </>
        ) : (
          <>
            <StatCard label={t("automation.activeAutomations")} value={automations.filter(a => a.enabled).length.toString()} icon={Zap} />
            <StatCard label={t("automation.messagesSent")} value={merchantAutomations.reduce((a, m) => a + m.fired, 0).toLocaleString()} icon={MessageSquare} />
            <StatCard label={t("automation.aiHandled")} value="1,200" icon={Bot} iconColor="text-green-500" />
            <StatCard label={t("automation.responseRate")} value="94%" icon={CheckCircle2} />
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">
          {context === "superadmin" ? t("automation.templateDesc") : t("automation.activeDesc")}
        </p>
        <Button data-testid="button-create-automation">
          <Plus className="h-4 w-4 mr-2" />
          {context === "superadmin" ? t("automation.newTemplate") : t("automation.newAutomation")}
        </Button>
      </div>

      <div className="space-y-3">
        {automations.map((auto) => {
          const type = typeConfig[auto.type] || typeConfig.trigger;
          return (
            <Card key={auto.id} data-testid={`card-automation-${auto.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-md flex-shrink-0 ${type.color}`}>
                    <type.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold">{auto.name}</span>
                      <Badge variant="secondary" className={`text-xs ${type.color}`}>{auto.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{auto.desc}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {context === "superadmin" && "tenants" in auto && (
                        <span>{t("automation.tenantsUsingCount", { count: (auto as any).tenants })}</span>
                      )}
                      {context === "merchant" && "fired" in auto && (
                        <span>{t("automation.messagesSentCount", { count: (auto as any).fired.toLocaleString() })}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={auto.enabled} data-testid={`switch-automation-${auto.id}`} />
                    <Button size="icon" variant="ghost" data-testid={`button-config-automation-${auto.id}`}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
