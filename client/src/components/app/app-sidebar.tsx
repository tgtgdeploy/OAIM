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

const ecommerceItems = [
  { title: "Shipping", href: "/app/shipping", icon: Truck },
  { title: "Payments", href: "/app/payments", icon: CreditCard },
];

const fnbItems = [
  { title: "Menu", href: "/app/menu", icon: ChefHat },
  { title: "Reservations", href: "/app/reservations", icon: CalendarDays },
  { title: "Delivery", href: "/app/delivery", icon: Bike },
  { title: "Tables", href: "/app/tables", icon: LayoutGrid },
  { title: "Checkout", href: "/app/checkout", icon: Receipt },
];

const beautyItems = [
  { title: "Booking", href: "/app/booking", icon: CalendarDays },
  { title: "Therapists", href: "/app/therapists", icon: UserCheck },
  { title: "Services", href: "/app/services", icon: Scissors },
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

const industryConfig = {
  ecommerce: {
    icon: Store,
    label: "E-Commerce",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    items: ecommerceItems,
    groupLabel: "E-Commerce",
  },
  fnb: {
    icon: UtensilsCrossed,
    label: "F&B",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    items: fnbItems,
    groupLabel: "F&B / Restaurant",
  },
  beauty: {
    icon: Sparkles,
    label: "Beauty",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    items: beautyItems,
    groupLabel: "Beauty & Wellness",
  },
};

export function AppSidebar() {
  const [location] = useLocation();
  const { industry, templatePath, industryLabel } = useIndustry();
  const config = industryConfig[industry];

  const mainItems = [
    { title: "Store Homepage", href: templatePath, icon: Globe },
    { title: "Inbox", href: "/app", icon: MessageSquare, badge: "3" },
    { title: "Contacts", href: "/app/contacts", icon: Users },
    { title: "Pipeline", href: "/app/pipeline", icon: GitBranch },
    { title: "Orders", href: "/app/orders", icon: ShoppingCart },
    { title: "Products", href: "/app/products", icon: Package },
  ];

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={location === item.href}>
                <Link href={item.href} data-testid={`link-app-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.title}</span>
                  {"badge" in item && item.badge && (
                    <Badge variant="default" className="text-xs px-1.5 min-w-5 h-5 justify-center">
                      {item.badge}
                    </Badge>
                  )}
                  {"locked" in item && item.locked && (
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
        {renderGroup("Main", mainItems)}
        {renderGroup(config.groupLabel, config.items)}
        {renderGroup("Advanced", advancedItems)}
        {renderGroup("Management", settingsItems)}
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
