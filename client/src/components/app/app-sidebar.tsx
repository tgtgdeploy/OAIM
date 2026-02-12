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
  Bot,
  Headphones,
  Share2,
  UserCog,
} from "lucide-react";

const mainItems = [
  { title: "Inbox", href: "/app", icon: MessageSquare, badge: "3" },
  { title: "Contacts", href: "/app/contacts", icon: Users },
  { title: "Pipeline", href: "/app/pipeline", icon: GitBranch },
  { title: "Orders", href: "/app/orders", icon: ShoppingCart },
  { title: "Products", href: "/app/products", icon: Package },
];

const advancedItems = [
  { title: "Automation", href: "/app/automation", icon: Zap },
  { title: "Follow-ups", href: "/app/follow-ups", icon: Repeat },
  { title: "Customer Support", href: "/app/support", icon: Headphones },
  { title: "Ads & ROI", href: "/app/ads", icon: BarChart3, locked: true },
  { title: "Referral", href: "/app/referral", icon: Share2 },
];

const settingsItems = [
  { title: "Team & Roles", href: "/app/team", icon: UserCog },
  { title: "Settings", href: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();

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
              <div className="text-xs text-muted-foreground">Merchant</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.href}>
                    <Link href={item.href} data-testid={`link-app-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="default" className="text-xs px-1.5 min-w-5 h-5 justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Advanced</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {advancedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.href}>
                    <Link href={item.href} data-testid={`link-app-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.locked && (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.href}>
                    <Link href={item.href} data-testid={`link-app-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
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
      <SidebarFooter className="p-4">
        <div className="rounded-md bg-primary/10 p-3">
          <div className="text-xs font-medium mb-1">Pro Plan</div>
          <div className="text-xs text-muted-foreground">1,234 / 5,000 messages</div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
