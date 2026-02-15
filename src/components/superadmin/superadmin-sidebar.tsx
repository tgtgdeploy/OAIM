import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Building2,
  CreditCard,
  LayoutTemplate,
  Blocks,
  BarChart3,
  Palette,
  Users,
  ScrollText,
  LifeBuoy,
  Shield,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function SuperAdminSidebar() {
  const [location] = useLocation();
  const { t } = useTranslation("superadmin");

  const platformItems = [
    { title: t("sidebar.tenants"), href: "/superadmin", icon: Building2 },
    { title: t("sidebar.plansFlags"), href: "/superadmin/plans", icon: CreditCard },
    { title: t("sidebar.modules"), href: "/superadmin/modules", icon: Blocks },
    { title: t("sidebar.templates"), href: "/superadmin/templates", icon: LayoutTemplate },
  ];

  const marketingItems = [
    { title: t("sidebar.adsCampaigns"), href: "/superadmin/ads", icon: BarChart3 },
    { title: t("sidebar.designPages"), href: "/superadmin/design", icon: Palette },
    { title: t("sidebar.referralCommission"), href: "/superadmin/referral", icon: Users },
  ];

  const operationsItems = [
    { title: t("sidebar.automation"), href: "/superadmin/automation", icon: Zap },
    { title: t("sidebar.support"), href: "/superadmin/support", icon: LifeBuoy },
    { title: t("sidebar.logs"), href: "/superadmin/logs", icon: ScrollText },
  ];

  const renderGroup = (label: string, items: typeof platformItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={location === item.href}>
                <Link href={item.href} data-testid={`link-superadmin-${item.href.split("/").pop()}`}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="link-superadmin-logo">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive">
              <Shield className="h-4 w-4 text-destructive-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none">OAIM</div>
              <div className="text-xs text-muted-foreground">{t("sidebar.superAdmin")}</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup(t("sidebar.platform"), platformItems)}
        {renderGroup(t("sidebar.marketing"), marketingItems)}
        {renderGroup(t("sidebar.operations"), operationsItems)}
      </SidebarContent>
    </Sidebar>
  );
}
