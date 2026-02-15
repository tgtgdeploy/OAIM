import { SuperAdminLayout } from "./layout";
import { SupportModule } from "@/components/modules/support-module";
import { useTranslation } from "react-i18next";

export default function SupportPage() {
  const { t } = useTranslation("superadmin");
  return (
    <SuperAdminLayout title={t("sidebar.support")}>
      <div className="p-4 md:p-6">
        <SupportModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
