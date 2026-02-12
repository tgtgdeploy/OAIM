import { AppLayout } from "./layout";
import { AutomationModule } from "@/components/modules/automation-module";

export default function MerchantAutomationPage() {
  return (
    <AppLayout title="Automation">
      <div className="p-4 md:p-6">
        <AutomationModule context="merchant" />
      </div>
    </AppLayout>
  );
}
