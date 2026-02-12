import { SuperAdminLayout } from "./layout";
import { AdsModule } from "@/components/modules/ads-module";
import { useTranslation } from "react-i18next";

export default function SuperAdminAdsPage() {
  const { t } = useTranslation("superadmin");
  return (
    <SuperAdminLayout title={t("sidebar.adsCampaigns")}>
      <div className="p-4 md:p-6">
        <AdsModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
