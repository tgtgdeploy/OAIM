import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { useTrialManager } from "@/hooks/use-trial-manager";
import { useAuthStore } from "@/stores/auth-store";
import { useTranslation } from "react-i18next";

export function TrialBanner() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const { status, remainingDays, isExpired, isLoading } = useTrialManager(tenant?.id);

  if (isLoading || status === "active") return null;

  const config = isExpired
    ? {
        bg: "bg-muted border-muted-foreground/20",
        text: "text-muted-foreground",
        icon: XCircle,
        message: t("trial.expired"),
      }
    : remainingDays <= 2
      ? {
          bg: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/50",
          text: "text-red-700 dark:text-red-400",
          icon: AlertTriangle,
          message: t("trial.daysLeft", { count: remainingDays }),
        }
      : remainingDays <= 4
        ? {
            bg: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900/50",
            text: "text-yellow-700 dark:text-yellow-400",
            icon: Clock,
            message: t("trial.daysLeft", { count: remainingDays }),
          }
        : {
            bg: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900/50",
            text: "text-green-700 dark:text-green-400",
            icon: Sparkles,
            message: t("trial.daysLeft", { count: remainingDays }),
          };

  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2 border-b ${config.bg}`}
      data-testid="trial-banner"
    >
      <div className={`flex items-center gap-2 text-sm ${config.text}`}>
        <Icon className="h-4 w-4 shrink-0" />
        <span className="font-medium">{config.message}</span>
      </div>
      <Button size="sm" variant={isExpired ? "default" : "outline"} data-testid="button-upgrade">
        {t("trial.upgrade")}
      </Button>
    </div>
  );
}
