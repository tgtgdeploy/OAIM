import { AppLayout } from "./layout";
import { FinanceModule } from "@/components/modules/finance-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function FinancePage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("finance.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="finance">
          <FinanceModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
