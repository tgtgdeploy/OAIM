import { Link } from "wouter";
import { MemberLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ShoppingBag, MapPin, Star, ArrowRight, MessageSquare } from "lucide-react";

const recentOrders = [
  { id: "ORD-005", items: "Blue Dress x3", total: "RM 267.00", status: "confirmed", date: "Feb 10" },
  { id: "ORD-003", items: "Accessories Bundle", total: "RM 150.00", status: "shipped", date: "Feb 8" },
  { id: "ORD-001", items: "Silk Hijab x2", total: "RM 90.00", status: "completed", date: "Feb 3" },
];

export default function MemberDashboard() {
  return (
    <MemberLayout title="Dashboard">
      <div className="member-page-padding section-spacing">
        <div>
          <h2 className="text-2xl font-bold mb-1" data-testid="text-welcome">Welcome back, Sarah!</h2>
          <p className="text-muted-foreground">Here's a summary of your account activity.</p>
        </div>

        <div className="stats-grid">
          <StatCard label="Total Orders" value="12" icon={ShoppingBag} />
          <StatCard label="In Transit" value="2" icon={MapPin} />
          <StatCard label="Loyalty Points" value="450" icon={Star} iconColor="text-primary" />
          <StatCard label="Messages" value="3" icon={MessageSquare} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-semibold">Recent Orders</h3>
                <Link href="/member/orders">
                  <Button variant="ghost" size="sm" data-testid="button-view-all-orders">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between gap-3 p-3 rounded-md bg-muted/50" data-testid={`recent-order-${order.id}`}>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-medium">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{order.items}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium">{order.total}</div>
                      <div className="text-xs text-muted-foreground">{order.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-4">Loyalty Program</h3>
              <div className="text-center py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <Badge className="mb-2">Gold Member</Badge>
                <p className="text-2xl font-bold mb-1">450 Points</p>
                <p className="text-sm text-muted-foreground mb-4">550 more points to reach Platinum</p>
                <div className="h-2 rounded-full bg-muted overflow-hidden max-w-xs mx-auto mb-4">
                  <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
                </div>
                <Link href="/member/loyalty">
                  <Button variant="outline" size="sm" data-testid="button-view-rewards">
                    View Rewards <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Track Order", href: "/member/track", icon: MapPin },
                { label: "My Orders", href: "/member/orders", icon: ShoppingBag },
                { label: "My Profile", href: "/member/profile", icon: Star },
                { label: "Chat with Us", href: "#", icon: MessageSquare },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <Card className="hover-elevate overflow-visible cursor-pointer" data-testid={`quick-action-${action.label.toLowerCase().replace(/\s/g, "-")}`}>
                    <CardContent className="p-4 text-center">
                      <action.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
}
