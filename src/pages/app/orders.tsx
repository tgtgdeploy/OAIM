import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Filter, ShoppingCart, Package, Truck, CheckCircle2 } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import "@/styles/dashboard.css";

export default function OrdersPage() {
  const { t } = useTranslation("app");
  const { data: orders = [], isLoading } = useOrders();

  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const inTransit = orders.filter((order) => order.status === "shipped").length;
  const completed = orders.filter((order) => order.status === "completed").length;

  return (
    <AppLayout title={t("orders.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("orders.totalOrders")} value={isLoading ? "—" : totalOrders.toString()} icon={ShoppingCart} change="+12% this month" testId="card-summary-total-orders" />
          <StatCard label={t("orders.revenue")} value={isLoading ? "—" : `RM ${revenue.toLocaleString()}`} icon={Package} change="+8% this month" testId="card-summary-revenue" />
          <StatCard label={t("orders.inTransit")} value={isLoading ? "—" : inTransit.toString()} icon={Truck} testId="card-summary-in-transit" />
          <StatCard label={t("orders.completed")} value={isLoading ? "—" : completed.toString()} icon={CheckCircle2} change="+15% this month" testId="card-summary-completed" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("orders.searchOrders")} testId="input-search-orders" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-orders">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button data-testid="button-create-order">
              <Plus className="h-4 w-4 mr-2" />
              {t("orders.createOrder")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("orders.thOrderId")}</TableHead>
                  <TableHead>{t("orders.thCustomer")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("orders.thItems")}</TableHead>
                  <TableHead>{t("orders.thStatus")}</TableHead>
                  <TableHead className="text-right">{t("orders.thTotal")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("orders.thDate")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer" data-testid={`row-order-${order.id}`}>
                      <TableCell className="font-medium text-sm">{order.id.substring(0, 8)}</TableCell>
                      <TableCell className="text-sm">{order.contact_id.substring(0, 8)}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-48 truncate">{order.items.length} items</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm">{order.currency} {parseFloat(order.total).toLocaleString()}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
