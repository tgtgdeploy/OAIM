import { SuperAdminLayout } from "./layout";
import { AutomationModule } from "@/components/modules/automation-module";
import { useTranslation } from "react-i18next";

export default function SuperAdminAutomationPage() {
  const { t } = useTranslation("superadmin");
  return (
    <SuperAdminLayout title={t("sidebar.automation")}>
      <div className="p-4 md:p-6">
        <AutomationModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
