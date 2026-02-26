import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useTrialManager, type GatedFeature } from "@/hooks/use-trial-manager";
import { useAuthStore } from "@/stores/auth-store";
import { useTranslation } from "react-i18next";

interface FeatureGatekeeperProps {
  feature: GatedFeature;
  children: React.ReactNode;
}

export function FeatureGatekeeper({ feature, children }: FeatureGatekeeperProps) {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const { isPremiumLocked, isLoading } = useTrialManager(tenant?.id);

  if (isLoading || !isPremiumLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
        <div className="text-center space-y-4 max-w-sm px-4" data-testid={`gate-${feature}`}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mx-auto">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">{t("gate.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("gate.description")}</p>
          </div>
          <Button data-testid="button-gate-upgrade">{t("gate.upgradeCta")}</Button>
        </div>
      </div>
    </div>
  );
}
