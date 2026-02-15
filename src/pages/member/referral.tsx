import { MemberLayout } from "./layout";
import { ReferralModule } from "@/components/modules/referral-module";
import { useTranslation } from "react-i18next";

export default function MemberReferralPage() {
  const { t } = useTranslation("member");
  return (
    <MemberLayout title={t("referral.title")}>
      <div className="p-4 md:p-6">
        <ReferralModule context="member" />
      </div>
    </MemberLayout>
  );
}
