import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { IndustryProvider } from "@/lib/industry-context";
import { lazy, Suspense, useEffect } from "react";
import "@/i18n";
import NotFound from "@/pages/not-found";
import { useAuthStore } from "@/stores/auth-store";
import { ProtectedRoute } from "@/components/app/protected-route";

const HomePage = lazy(() => import("@/pages/marketing/home"));
const ProductsPage = lazy(() => import("@/pages/marketing/products"));
const SolutionsPage = lazy(() => import("@/pages/marketing/solutions"));
const PricingPage = lazy(() => import("@/pages/marketing/pricing"));
const CasesPage = lazy(() => import("@/pages/marketing/cases"));
const ContactPage = lazy(() => import("@/pages/marketing/contact"));

const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));

const EcommerceTemplate = lazy(() => import("@/pages/templates/ecommerce"));
const FnbTemplate = lazy(() => import("@/pages/templates/fnb"));
const BeautyTemplate = lazy(() => import("@/pages/templates/beauty"));
const ServiceTemplate = lazy(() => import("@/pages/templates/service"));
const QuantTemplate = lazy(() => import("@/pages/templates/quant"));

const OnboardingPage = lazy(() => import("@/pages/app/onboarding"));
const InboxPage = lazy(() => import("@/pages/app/inbox"));
const ContactsPage = lazy(() => import("@/pages/app/contacts"));
const PipelinePage = lazy(() => import("@/pages/app/pipeline"));
const OrdersPage = lazy(() => import("@/pages/app/orders"));
const AppProductsPage = lazy(() => import("@/pages/app/products"));
const FollowUpsPage = lazy(() => import("@/pages/app/follow-ups"));
const AdsPage = lazy(() => import("@/pages/app/ads"));
const AppAutomationPage = lazy(() => import("@/pages/app/automation"));
const AppSupportPage = lazy(() => import("@/pages/app/support"));
const AppReferralPage = lazy(() => import("@/pages/app/referral"));
const AppTeamPage = lazy(() => import("@/pages/app/team"));
const SettingsPage = lazy(() => import("@/pages/app/settings"));
const MenuPage = lazy(() => import("@/pages/app/menu"));
const ReservationsPage = lazy(() => import("@/pages/app/reservations"));
const DeliveryPage = lazy(() => import("@/pages/app/delivery"));
const TablesPage = lazy(() => import("@/pages/app/tables"));
const CheckoutPage = lazy(() => import("@/pages/app/checkout"));
const BookingPage = lazy(() => import("@/pages/app/booking"));
const TherapistsPage = lazy(() => import("@/pages/app/therapists"));
const ServicesPage = lazy(() => import("@/pages/app/services"));
const ShippingPage = lazy(() => import("@/pages/app/shipping"));
const PaymentsPage = lazy(() => import("@/pages/app/payments"));
const InventoryPage = lazy(() => import("@/pages/app/inventory"));
const PurchaseOrdersPage = lazy(() => import("@/pages/app/purchase-orders"));
const BillsPage = lazy(() => import("@/pages/app/bills"));
const FinancePage = lazy(() => import("@/pages/app/finance"));
const PerformancePage = lazy(() => import("@/pages/app/performance"));
const MediaPlanPage = lazy(() => import("@/pages/app/media-plan"));

const TenantsPage = lazy(() => import("@/pages/superadmin/tenants"));
const PlansPage = lazy(() => import("@/pages/superadmin/plans"));
const ModulesPage = lazy(() => import("@/pages/superadmin/modules"));
const TemplatesPage = lazy(() => import("@/pages/superadmin/templates"));
const CaseLibraryPage = lazy(() => import("@/pages/superadmin/case-library"));
const SuperAdminAdsPage = lazy(() => import("@/pages/superadmin/ads"));
const DesignPage = lazy(() => import("@/pages/superadmin/design"));
const SuperAdminReferralPage = lazy(() => import("@/pages/superadmin/referral"));
const SuperAdminAutomationPage = lazy(() => import("@/pages/superadmin/automation"));
const LogsPage = lazy(() => import("@/pages/superadmin/logs"));
const SupportPage = lazy(() => import("@/pages/superadmin/support"));

const MemberDashboard = lazy(() => import("@/pages/member/dashboard"));
const MemberOrders = lazy(() => import("@/pages/member/orders"));
const MemberTrack = lazy(() => import("@/pages/member/track"));
const MemberProfile = lazy(() => import("@/pages/member/profile"));
const MemberLoyalty = lazy(() => import("@/pages/member/loyalty"));
const MemberReferral = lazy(() => import("@/pages/member/referral"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-primary animate-pulse" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/solutions" component={SolutionsPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/cases" component={CasesPage} />
        <Route path="/contact" component={ContactPage} />

        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/register" component={RegisterPage} />

        <Route path="/templates/ecommerce" component={EcommerceTemplate} />
        <Route path="/templates/fnb" component={FnbTemplate} />
        <Route path="/templates/beauty" component={BeautyTemplate} />
        <Route path="/templates/service" component={ServiceTemplate} />
        <Route path="/templates/quant" component={QuantTemplate} />

        <Route path="/app/onboarding" component={OnboardingPage} />
        <Route path="/app">{() => <ProtectedRoute requiredRole="staff"><InboxPage /></ProtectedRoute>}</Route>
        <Route path="/app/contacts">{() => <ProtectedRoute requiredRole="staff"><ContactsPage /></ProtectedRoute>}</Route>
        <Route path="/app/pipeline">{() => <ProtectedRoute requiredRole="staff"><PipelinePage /></ProtectedRoute>}</Route>
        <Route path="/app/orders">{() => <ProtectedRoute requiredRole="staff"><OrdersPage /></ProtectedRoute>}</Route>
        <Route path="/app/products">{() => <ProtectedRoute requiredRole="staff"><AppProductsPage /></ProtectedRoute>}</Route>
        <Route path="/app/follow-ups">{() => <ProtectedRoute requiredRole="staff"><FollowUpsPage /></ProtectedRoute>}</Route>
        <Route path="/app/ads">{() => <ProtectedRoute requiredRole="staff"><AdsPage /></ProtectedRoute>}</Route>
        <Route path="/app/automation">{() => <ProtectedRoute requiredRole="staff"><AppAutomationPage /></ProtectedRoute>}</Route>
        <Route path="/app/support">{() => <ProtectedRoute requiredRole="staff"><AppSupportPage /></ProtectedRoute>}</Route>
        <Route path="/app/referral">{() => <ProtectedRoute requiredRole="staff"><AppReferralPage /></ProtectedRoute>}</Route>
        <Route path="/app/team">{() => <ProtectedRoute requiredRole="tenant_admin"><AppTeamPage /></ProtectedRoute>}</Route>
        <Route path="/app/settings">{() => <ProtectedRoute requiredRole="tenant_admin"><SettingsPage /></ProtectedRoute>}</Route>
        <Route path="/app/menu">{() => <ProtectedRoute requiredRole="staff"><MenuPage /></ProtectedRoute>}</Route>
        <Route path="/app/reservations">{() => <ProtectedRoute requiredRole="staff"><ReservationsPage /></ProtectedRoute>}</Route>
        <Route path="/app/delivery">{() => <ProtectedRoute requiredRole="staff"><DeliveryPage /></ProtectedRoute>}</Route>
        <Route path="/app/tables">{() => <ProtectedRoute requiredRole="staff"><TablesPage /></ProtectedRoute>}</Route>
        <Route path="/app/checkout">{() => <ProtectedRoute requiredRole="staff"><CheckoutPage /></ProtectedRoute>}</Route>
        <Route path="/app/booking">{() => <ProtectedRoute requiredRole="staff"><BookingPage /></ProtectedRoute>}</Route>
        <Route path="/app/therapists">{() => <ProtectedRoute requiredRole="staff"><TherapistsPage /></ProtectedRoute>}</Route>
        <Route path="/app/services">{() => <ProtectedRoute requiredRole="staff"><ServicesPage /></ProtectedRoute>}</Route>
        <Route path="/app/shipping">{() => <ProtectedRoute requiredRole="staff"><ShippingPage /></ProtectedRoute>}</Route>
        <Route path="/app/payments">{() => <ProtectedRoute requiredRole="staff"><PaymentsPage /></ProtectedRoute>}</Route>
        <Route path="/app/inventory">{() => <ProtectedRoute requiredRole="staff"><InventoryPage /></ProtectedRoute>}</Route>
        <Route path="/app/purchase-orders">{() => <ProtectedRoute requiredRole="staff"><PurchaseOrdersPage /></ProtectedRoute>}</Route>
        <Route path="/app/bills">{() => <ProtectedRoute requiredRole="staff"><BillsPage /></ProtectedRoute>}</Route>
        <Route path="/app/finance">{() => <ProtectedRoute requiredRole="staff"><FinancePage /></ProtectedRoute>}</Route>
        <Route path="/app/performance">{() => <ProtectedRoute requiredRole="staff"><PerformancePage /></ProtectedRoute>}</Route>
        <Route path="/app/media-plan">{() => <ProtectedRoute requiredRole="staff"><MediaPlanPage /></ProtectedRoute>}</Route>

        <Route path="/superadmin">{() => <ProtectedRoute requiredRole="super_admin"><TenantsPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/plans">{() => <ProtectedRoute requiredRole="super_admin"><PlansPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/modules">{() => <ProtectedRoute requiredRole="super_admin"><ModulesPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/templates">{() => <ProtectedRoute requiredRole="super_admin"><TemplatesPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/cases">{() => <ProtectedRoute requiredRole="super_admin"><CaseLibraryPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/ads">{() => <ProtectedRoute requiredRole="super_admin"><SuperAdminAdsPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/design">{() => <ProtectedRoute requiredRole="super_admin"><DesignPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/referral">{() => <ProtectedRoute requiredRole="super_admin"><SuperAdminReferralPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/automation">{() => <ProtectedRoute requiredRole="super_admin"><SuperAdminAutomationPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/logs">{() => <ProtectedRoute requiredRole="super_admin"><LogsPage /></ProtectedRoute>}</Route>
        <Route path="/superadmin/support">{() => <ProtectedRoute requiredRole="super_admin"><SupportPage /></ProtectedRoute>}</Route>

        <Route path="/member" component={MemberDashboard} />
        <Route path="/member/orders" component={MemberOrders} />
        <Route path="/member/track" component={MemberTrack} />
        <Route path="/member/profile" component={MemberProfile} />
        <Route path="/member/loyalty" component={MemberLoyalty} />
        <Route path="/member/referral" component={MemberReferral} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const initAuthListener = useAuthStore((s) => s.initAuthListener);

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return unsubscribe;
  }, [initAuthListener]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <IndustryProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </IndustryProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
