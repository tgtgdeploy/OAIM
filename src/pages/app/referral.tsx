import { AppLayout } from "./layout";
import { ReferralModule } from "@/components/modules/referral-module";
import { useTranslation } from "react-i18next";

export default function MerchantReferralPage() {
  const { t } = useTranslation("app");
  return (
    <AppLayout title={t("sidebar.referral")}>
      <div className="p-4 md:p-6">
        <ReferralModule context="merchant" />
      </div>
    </AppLayout>
  );
}
