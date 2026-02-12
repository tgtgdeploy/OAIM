import { SuperAdminLayout } from "./layout";
import { SupportModule } from "@/components/modules/support-module";

export default function SupportPage() {
  return (
    <SuperAdminLayout title="Support">
      <div className="p-4 md:p-6">
        <SupportModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
