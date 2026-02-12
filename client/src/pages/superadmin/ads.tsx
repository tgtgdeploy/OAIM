import { SuperAdminLayout } from "./layout";
import { AdsModule } from "@/components/modules/ads-module";

export default function SuperAdminAdsPage() {
  return (
    <SuperAdminLayout title="Ads & Campaigns">
      <div className="p-4 md:p-6">
        <AdsModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
