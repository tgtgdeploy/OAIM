import { SuperAdminLayout } from "./layout";
import { ReferralModule } from "@/components/modules/referral-module";
import { useTranslation } from "react-i18next";

export default function SuperAdminReferralPage() {
  const { t } = useTranslation("superadmin");
  return (
    <SuperAdminLayout title={t("sidebar.referralCommission")}>
      <div className="p-4 md:p-6">
        <ReferralModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
