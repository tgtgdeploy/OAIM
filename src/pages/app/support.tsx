import { AppLayout } from "./layout";
import { SupportModule } from "@/components/modules/support-module";
import { useTranslation } from "react-i18next";

export default function MerchantSupportPage() {
  const { t } = useTranslation("app");
  return (
    <AppLayout title={t("sidebar.customerSupport")}>
      <div className="p-4 md:p-6">
        <SupportModule context="merchant" />
      </div>
    </AppLayout>
  );
}
