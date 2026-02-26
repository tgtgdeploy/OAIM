import { AppLayout } from "./layout";
import { PerformanceModule } from "@/components/modules/performance-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function PerformancePage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("performance.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="performance">
          <PerformanceModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
