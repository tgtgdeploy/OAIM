import { AppLayout } from "./layout";
import { LockedFeature } from "@/components/shared/locked-feature";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

export default function AdsPage() {
  return (
    <AppLayout title="Meta Ads & ROI">
      <div className="p-4 md:p-6">
        <LockedFeature
          title="Meta Ads & ROI Tracking"
          description="This module is available on the Business plan. Track your Meta ad campaigns, import leads, and measure real ROI."
          upgradePlan="Business"
          features={[
            { icon: BarChart3, title: "Campaign Dashboard", desc: "See all your Meta campaigns in one place" },
            { icon: TrendingUp, title: "Lead Attribution", desc: "Track leads from ad click to sale" },
            { icon: DollarSign, title: "ROI Reports", desc: "Cost per lead, cost per sale, ROAS" },
            { icon: Users, title: "Lead Import", desc: "Auto-import Click-to-WhatsApp leads" },
          ]}
          testId="locked-ads"
        />
      </div>
    </AppLayout>
  );
}
