import { AppLayout } from "./layout";
import { InventoryModule } from "@/components/modules/inventory-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function InventoryPage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("inventory.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="inventory">
          <InventoryModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
