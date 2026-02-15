import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { Plus, Bot, Repeat, Clock, Zap, MessageSquare, Settings, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAutomations } from "@/hooks/use-automations";

interface AutomationModuleProps {
  context: "superadmin" | "merchant";
}

const typeConfig: Record<string, { color: string; icon: typeof Bot }> = {
  trigger: { color: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: Zap },
  sequence: { color: "bg-purple-500/10 text-purple-700 dark:text-purple-300", icon: Repeat },
  scheduled: { color: "bg-orange-500/10 text-orange-700 dark:text-orange-300", icon: Clock },
  ai: { color: "bg-green-500/10 text-green-700 dark:text-green-300", icon: Bot },
};

export function AutomationModule({ context }: AutomationModuleProps) {
  const { t } = useTranslation("superadmin");
  const { data: automations = [], isLoading } = useAutomations({
    isTemplate: context === "superadmin",
  });

  const activeCount = automations.filter((a) => a.is_enabled).length;
  const totalFired = automations.reduce((sum, a) => sum + a.fired_count, 0);
  const maxTenantsUsing = automations.reduce((max, a) => Math.max(max, a.tenants_using), 0);
  const aiFired = automations
    .filter((a) => a.type === "ai")
    .reduce((sum, a) => sum + a.fired_count, 0);

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        {context === "superadmin" ? (
          <>
            <StatCard label={t("automation.totalAutomations")} value={automations.length.toString()} icon={Zap} />
            <StatCard label={t("automation.active")} value={activeCount.toString()} icon={CheckCircle2} iconColor="text-green-500" />
            <StatCard label={t("automation.tenantsUsing")} value={maxTenantsUsing.toString()} icon={MessageSquare} />
            <StatCard label={t("automation.templatesLabel")} value={automations.length.toString()} icon={Bot} />
          </>
        ) : (
          <>
            <StatCard label={t("automation.activeAutomations")} value={activeCount.toString()} icon={Zap} />
            <StatCard label={t("automation.messagesSent")} value={totalFired.toLocaleString()} icon={MessageSquare} />
            <StatCard label={t("automation.aiHandled")} value={aiFired.toLocaleString()} icon={Bot} iconColor="text-green-500" />
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
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          : automations.map((auto) => {
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
                        <p className="text-sm text-muted-foreground">{auto.description ?? ""}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          {context === "superadmin" && (
                            <span>{t("automation.tenantsUsingCount", { count: auto.tenants_using })}</span>
                          )}
                          {context === "merchant" && (
                            <span>{t("automation.messagesSentCount", { count: auto.fired_count })}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={auto.is_enabled} data-testid={`switch-automation-${auto.id}`} />
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
