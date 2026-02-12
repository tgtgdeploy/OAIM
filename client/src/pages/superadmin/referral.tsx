import { SuperAdminLayout } from "./layout";
import { ReferralModule } from "@/components/modules/referral-module";

export default function SuperAdminReferralPage() {
  return (
    <SuperAdminLayout title="Referral & Commission">
      <div className="p-4 md:p-6">
        <ReferralModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
