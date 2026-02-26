import { AppLayout } from "./layout";
import { BillsModule } from "@/components/modules/bills-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function BillsPage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("bills.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="bills">
          <BillsModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
