import { AppLayout } from "./layout";
import { ReferralModule } from "@/components/modules/referral-module";

export default function MerchantReferralPage() {
  return (
    <AppLayout title="Referral Program">
      <div className="p-4 md:p-6">
        <ReferralModule context="merchant" />
      </div>
    </AppLayout>
  );
}
