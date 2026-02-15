import { AppLayout } from "./layout";
import { AutomationModule } from "@/components/modules/automation-module";
import { useTranslation } from "react-i18next";

export default function MerchantAutomationPage() {
  const { t } = useTranslation("app");
  return (
    <AppLayout title={t("sidebar.automation")}>
      <div className="p-4 md:p-6">
        <AutomationModule context="merchant" />
      </div>
    </AppLayout>
  );
}
