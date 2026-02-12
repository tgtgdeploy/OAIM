import { MemberLayout } from "./layout";
import { ReferralModule } from "@/components/modules/referral-module";

export default function MemberReferralPage() {
  return (
    <MemberLayout title="Refer & Earn">
      <div className="p-4 md:p-6">
        <ReferralModule context="member" />
      </div>
    </MemberLayout>
  );
}
