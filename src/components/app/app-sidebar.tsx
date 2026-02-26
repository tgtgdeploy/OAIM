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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Users,
  GitBranch,
  ShoppingCart,
  Package,
  Repeat,
  BarChart3,
  Settings,
  Zap,
  Lock,
  Headphones,
  Share2,
  UserCog,
  ChefHat,
  CalendarDays,
  Bike,
  LayoutGrid,
  Receipt,
  Scissors,
  UserCheck,
  Truck,
  CreditCard,
  Globe,
  Store,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import { useIndustry } from "@/lib/industry-context";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const [location] = useLocation();
  const { industry, templatePath, industryLabel } = useIndustry();
  const { t } = useTranslation("app");

  const ecommerceItems = [
    { title: t("sidebar.shipping"), href: "/app/shipping", icon: Truck },
    { title: t("sidebar.payments"), href: "/app/payments", icon: CreditCard },
  ];

  const fnbItems = [
    { title: t("sidebar.menu"), href: "/app/menu", icon: ChefHat },
    { title: t("sidebar.reservations"), href: "/app/reservations", icon: CalendarDays },
    { title: t("sidebar.delivery"), href: "/app/delivery", icon: Bike },
    { title: t("sidebar.tables"), href: "/app/tables", icon: LayoutGrid },
    { title: t("sidebar.checkout"), href: "/app/checkout", icon: Receipt },
  ];

  const beautyItems = [
    { title: t("sidebar.booking"), href: "/app/booking", icon: CalendarDays },
    { title: t("sidebar.therapists"), href: "/app/therapists", icon: UserCheck },
    { title: t("sidebar.services"), href: "/app/services", icon: Scissors },
  ];

  const industryConfig = {
    ecommerce: {
      icon: Store,
      label: t("sidebar.industry.ecommerce"),
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      items: ecommerceItems,
      groupLabel: t("sidebar.industry.ecommerceGroup"),
    },
    fnb: {
      icon: UtensilsCrossed,
      label: t("sidebar.industry.fnb"),
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      items: fnbItems,
      groupLabel: t("sidebar.industry.fnbGroup"),
    },
    beauty: {
      icon: Sparkles,
      label: t("sidebar.industry.beauty"),
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      items: beautyItems,
      groupLabel: t("sidebar.industry.beautyGroup"),
    },
  };

  const config = industryConfig[industry];

  const mainItems = [
    { title: t("sidebar.storeHomepage"), href: templatePath ?? `/templates/${industry}`, icon: Globe },
    { title: t("sidebar.inbox"), href: "/app", icon: MessageSquare, badge: "3" },
    { title: t("sidebar.contacts"), href: "/app/contacts", icon: Users },
    { title: t("sidebar.pipeline"), href: "/app/pipeline", icon: GitBranch },
    { title: t("sidebar.orders"), href: "/app/orders", icon: ShoppingCart },
    { title: t("sidebar.products"), href: "/app/products", icon: Package },
  ];

  const advancedItems = [
    { title: t("sidebar.automation"), href: "/app/automation", icon: Zap },
    { title: t("sidebar.followUps"), href: "/app/follow-ups", icon: Repeat },
    { title: t("sidebar.customerSupport"), href: "/app/support", icon: Headphones },
    { title: t("sidebar.adsRoi"), href: "/app/ads", icon: BarChart3, locked: true },
    { title: t("sidebar.referral"), href: "/app/referral", icon: Share2 },
  ];

  const settingsItems = [
    { title: t("sidebar.teamRoles"), href: "/app/team", icon: UserCog },
    { title: t("sidebar.settings"), href: "/app/settings", icon: Settings },
  ];

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={location === item.href}>
                <Link href={item.href} data-testid={`link-app-${item.href.split("/").pop()}`}>
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.title}</span>
                  {"badge" in item && item.badge && (
                    <Badge variant="default" className="text-xs px-1.5 min-w-5 h-5 justify-center">
                      {item.badge as React.ReactNode}
                    </Badge>
                  )}
                  {"locked" in item && (item as { locked?: boolean }).locked && (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
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
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none">OAIM</div>
              <div className="text-xs text-muted-foreground">{industryLabel}</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup(t("sidebar.main"), mainItems)}
        {renderGroup(config.groupLabel, config.items)}
        {renderGroup(t("sidebar.advanced"), advancedItems)}
        {renderGroup(t("sidebar.management"), settingsItems)}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="rounded-md bg-primary/10 p-3">
          <div className="text-xs font-medium mb-1">{t("sidebar.footer.proPlan")}</div>
          <div className="text-xs text-muted-foreground">{t("sidebar.footer.messagesUsage", { used: "1,234", total: "5,000" })}</div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
