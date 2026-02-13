import { AppLayout } from "./layout";
import { AdsModule } from "@/components/modules/ads-module";
import { LockedFeature } from "@/components/shared/locked-feature";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const isUnlocked = false;

export default function AdsPage() {
  const { t } = useTranslation("app");

  const features = [
    { icon: BarChart3, title: t("ads.feat1Title"), desc: t("ads.feat1Desc") },
    { icon: TrendingUp, title: t("ads.feat2Title"), desc: t("ads.feat2Desc") },
    { icon: DollarSign, title: t("ads.feat3Title"), desc: t("ads.feat3Desc") },
    { icon: Users, title: t("ads.feat4Title"), desc: t("ads.feat4Desc") },
  ];

  return (
    <AppLayout title={t("ads.title")}>
      <div className="p-4 md:p-6">
        {isUnlocked ? (
          <AdsModule context="merchant" />
        ) : (
          <LockedFeature
            title={t("ads.lockedTitle")}
            description={t("ads.lockedDesc")}
            upgradePlan={t("ads.lockedPlan")}
            features={features}
            testId="locked-ads"
          />
        )}
      </div>
    </AppLayout>
  );
}
