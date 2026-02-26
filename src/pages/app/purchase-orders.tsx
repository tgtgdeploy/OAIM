import { AppLayout } from "./layout";
import { PurchaseOrdersModule } from "@/components/modules/purchase-orders-module";
import { FeatureGatekeeper } from "@/components/FeatureGatekeeper";
import { useTranslation } from "react-i18next";

export default function PurchaseOrdersPage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("purchaseOrders.title")}>
      <div className="p-4 md:p-6">
        <FeatureGatekeeper feature="purchase_orders">
          <PurchaseOrdersModule />
        </FeatureGatekeeper>
      </div>
    </AppLayout>
  );
}
