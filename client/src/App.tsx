import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/not-found";

const HomePage = lazy(() => import("@/pages/marketing/home"));
const ProductsPage = lazy(() => import("@/pages/marketing/products"));
const SolutionsPage = lazy(() => import("@/pages/marketing/solutions"));
const PricingPage = lazy(() => import("@/pages/marketing/pricing"));
const CasesPage = lazy(() => import("@/pages/marketing/cases"));
const ContactPage = lazy(() => import("@/pages/marketing/contact"));

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

        <Route path="/app/onboarding" component={OnboardingPage} />
        <Route path="/app" component={InboxPage} />
        <Route path="/app/contacts" component={ContactsPage} />
        <Route path="/app/pipeline" component={PipelinePage} />
        <Route path="/app/orders" component={OrdersPage} />
        <Route path="/app/products" component={AppProductsPage} />
        <Route path="/app/follow-ups" component={FollowUpsPage} />
        <Route path="/app/ads" component={AdsPage} />
        <Route path="/app/automation" component={AppAutomationPage} />
        <Route path="/app/support" component={AppSupportPage} />
        <Route path="/app/referral" component={AppReferralPage} />
        <Route path="/app/team" component={AppTeamPage} />
        <Route path="/app/settings" component={SettingsPage} />

        <Route path="/superadmin" component={TenantsPage} />
        <Route path="/superadmin/plans" component={PlansPage} />
        <Route path="/superadmin/modules" component={ModulesPage} />
        <Route path="/superadmin/templates" component={TemplatesPage} />
        <Route path="/superadmin/cases" component={CaseLibraryPage} />
        <Route path="/superadmin/ads" component={SuperAdminAdsPage} />
        <Route path="/superadmin/design" component={DesignPage} />
        <Route path="/superadmin/referral" component={SuperAdminReferralPage} />
        <Route path="/superadmin/automation" component={SuperAdminAutomationPage} />
        <Route path="/superadmin/logs" component={LogsPage} />
        <Route path="/superadmin/support" component={SupportPage} />

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
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
