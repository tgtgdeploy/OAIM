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

const platformItems = [
  { title: "Tenants", href: "/superadmin", icon: Building2 },
  { title: "Plans & Flags", href: "/superadmin/plans", icon: CreditCard },
  { title: "Modules", href: "/superadmin/modules", icon: Blocks },
  { title: "Templates", href: "/superadmin/templates", icon: LayoutTemplate },
];

const marketingItems = [
  { title: "Ads & Campaigns", href: "/superadmin/ads", icon: BarChart3 },
  { title: "Design & Pages", href: "/superadmin/design", icon: Palette },
  { title: "Referral Commission", href: "/superadmin/referral", icon: Users },
];

const operationsItems = [
  { title: "Automation", href: "/superadmin/automation", icon: Zap },
  { title: "Support", href: "/superadmin/support", icon: LifeBuoy },
  { title: "Logs", href: "/superadmin/logs", icon: ScrollText },
];

export function SuperAdminSidebar() {
  const [location] = useLocation();

  const renderGroup = (label: string, items: typeof platformItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={location === item.href}>
                <Link href={item.href} data-testid={`link-superadmin-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
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
        <Link href="/superadmin">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive">
              <Shield className="h-4 w-4 text-destructive-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none">OAIM</div>
              <div className="text-xs text-muted-foreground">Super Admin</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Platform", platformItems)}
        {renderGroup("Marketing", marketingItems)}
        {renderGroup("Operations", operationsItems)}
      </SidebarContent>
    </Sidebar>
  );
}
