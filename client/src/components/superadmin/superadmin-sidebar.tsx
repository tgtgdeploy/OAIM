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
  Image,
  ScrollText,
  LifeBuoy,
  Shield,
} from "lucide-react";

const items = [
  { title: "Tenants", href: "/superadmin", icon: Building2 },
  { title: "Plans & Flags", href: "/superadmin/plans", icon: CreditCard },
  { title: "Templates", href: "/superadmin/templates", icon: LayoutTemplate },
  { title: "Case Library", href: "/superadmin/cases", icon: Image },
  { title: "Logs", href: "/superadmin/logs", icon: ScrollText },
  { title: "Support", href: "/superadmin/support", icon: LifeBuoy },
];

export function SuperAdminSidebar() {
  const [location] = useLocation();

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
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
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
      </SidebarContent>
    </Sidebar>
  );
}
