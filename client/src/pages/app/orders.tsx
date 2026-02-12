import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Filter, ShoppingCart, Package, Truck, CheckCircle2 } from "lucide-react";
import "@/styles/dashboard.css";

const orders = [
  { id: "ORD-001", customer: "Sarah Ahmad", items: "Blue Dress x2, Scarf x1", total: "RM 267.00", status: "confirmed", date: "2026-02-12" },
  { id: "ORD-002", customer: "Ahmad Razak", items: "Wholesale T-Shirts x50", total: "RM 1,200.00", status: "shipped", date: "2026-02-11" },
  { id: "ORD-003", customer: "Lisa Tan", items: "Accessories Bundle", total: "RM 150.00", status: "draft", date: "2026-02-11" },
  { id: "ORD-004", customer: "Raj Kumar", items: "Bulk Mixed Order", total: "RM 2,340.00", status: "completed", date: "2026-02-10" },
  { id: "ORD-005", customer: "Mei Ling", items: "Blue Dress x3", total: "RM 267.00", status: "confirmed", date: "2026-02-10" },
  { id: "ORD-006", customer: "David Ooi", items: "Running Shoes x2", total: "RM 320.00", status: "draft", date: "2026-02-09" },
  { id: "ORD-007", customer: "Nurul Huda", items: "Hijab Collection x4", total: "RM 280.00", status: "completed", date: "2026-02-08" },
];

export default function OrdersPage() {
  return (
    <AppLayout title="Orders">
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label="Total Orders" value="156" icon={ShoppingCart} change="+12% this month" testId="card-summary-total-orders" />
          <StatCard label="Revenue" value="RM 24,560" icon={Package} change="+8% this month" testId="card-summary-revenue" />
          <StatCard label="In Transit" value="23" icon={Truck} testId="card-summary-in-transit" />
          <StatCard label="Completed" value="128" icon={CheckCircle2} change="+15% this month" testId="card-summary-completed" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder="Search orders..." testId="input-search-orders" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-orders">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button data-testid="button-create-order">
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="cursor-pointer" data-testid={`row-order-${order.id}`}>
                    <TableCell className="font-medium text-sm">{order.id}</TableCell>
                    <TableCell className="text-sm">{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-48 truncate">{order.items}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">{order.total}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
