import { AppLayout } from "./layout";
import { MediaPlanModule } from "@/components/modules/media-plan-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function MediaPlanPage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("mediaPlan.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="media_plan">
          <MediaPlanModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
