import { SuperAdminLayout } from "./layout";
import { AutomationModule } from "@/components/modules/automation-module";

export default function SuperAdminAutomationPage() {
  return (
    <SuperAdminLayout title="Automation">
      <div className="p-4 md:p-6">
        <AutomationModule context="superadmin" />
      </div>
    </SuperAdminLayout>
  );
}
