import { AppLayout } from "./layout";
import { SupportModule } from "@/components/modules/support-module";

export default function MerchantSupportPage() {
  return (
    <AppLayout title="Customer Support">
      <div className="p-4 md:p-6">
        <SupportModule context="merchant" />
      </div>
    </AppLayout>
  );
}
