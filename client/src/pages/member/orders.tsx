import { MemberLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Eye, MessageSquare, RotateCcw } from "lucide-react";

const orders = [
  { id: "ORD-005", items: ["Blue Dress x3"], total: "RM 267.00", status: "confirmed", date: "Feb 10, 2026", payment: "COD" },
  { id: "ORD-004", items: ["Red Handbag x1"], total: "RM 189.00", status: "shipped", date: "Feb 9, 2026", payment: "Bank Transfer" },
  { id: "ORD-003", items: ["Accessories Bundle"], total: "RM 150.00", status: "shipped", date: "Feb 8, 2026", payment: "COD" },
  { id: "ORD-002", items: ["Silk Hijab Set x5"], total: "RM 225.00", status: "completed", date: "Feb 5, 2026", payment: "Online Banking" },
  { id: "ORD-001", items: ["Silk Hijab x2"], total: "RM 90.00", status: "completed", date: "Feb 3, 2026", payment: "COD" },
];

export default function MemberOrders() {
  return (
    <MemberLayout title="My Orders">
      <div className="p-4 md:p-6 space-y-4">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all-orders">All</TabsTrigger>
            <TabsTrigger value="active" data-testid="tab-active-orders">Active</TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed-orders">Completed</TabsTrigger>
          </TabsList>

          {["all", "active", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
              {orders
                .filter(o => tab === "all" || (tab === "active" ? ["confirmed", "shipped"].includes(o.status) : o.status === "completed"))
                .map((order) => (
                  <Card key={order.id} data-testid={`card-order-${order.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-sm font-semibold">{order.id}</span>
                              <StatusBadge status={order.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                              <span>{order.date}</span>
                              <span>{order.payment}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold mb-2">{order.total}</div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" data-testid={`button-view-order-${order.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {order.status === "completed" && (
                              <Button size="icon" variant="ghost" data-testid={`button-reorder-${order.id}`}>
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MemberLayout>
  );
}
