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
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  User,
  Star,
  Zap,
  Share2,
} from "lucide-react";

const items = [
  { title: "Dashboard", href: "/member", icon: LayoutDashboard },
  { title: "My Orders", href: "/member/orders", icon: ShoppingBag },
  { title: "Track Order", href: "/member/track", icon: MapPin },
  { title: "Loyalty", href: "/member/loyalty", icon: Star },
  { title: "Refer & Earn", href: "/member/referral", icon: Share2 },
  { title: "Profile", href: "/member/profile", icon: User },
];

export function MemberSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/member">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none">OAIM</div>
              <div className="text-xs text-muted-foreground">My Account</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.href}>
                    <Link href={item.href} data-testid={`link-member-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
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
          <div className="flex items-center gap-2 mb-1">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Gold Member</span>
          </div>
          <div className="text-xs text-muted-foreground">450 / 1,000 points to Platinum</div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
