import { AppLayout } from "./layout";
import { CampaignManagerModule } from "@/components/modules/campaign-manager-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function AdsPage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("ads.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="campaigns">
          <CampaignManagerModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
