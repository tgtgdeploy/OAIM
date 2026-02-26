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
import { Filter, Receipt, CreditCard, Wallet, DollarSign } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useContacts } from "@/hooks/use-contacts";
import { useMemo } from "react";
import "@/styles/dashboard.css";

const PAID_STATUSES = ["completed", "shipped", "confirmed"] as const;
const OPEN_STATUSES = ["draft"] as const;

function isPaid(status: string): boolean {
  return (PAID_STATUSES as readonly string[]).includes(status);
}

function isOpen(status: string): boolean {
  return (OPEN_STATUSES as readonly string[]).includes(status);
}

function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toFixed(2)}`;
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CheckoutPage() {
  const { t } = useTranslation("app");
  const { data: orders = [], isLoading } = useOrders();
  const { data: contacts = [] } = useContacts();

  const contactMap = useMemo(() => {
    const map = new Map<string, string>();
    contacts.forEach(c => map.set(c.id, c.name));
    return map;
  }, [contacts]);

  const paidOrders = orders.filter((o) => isPaid(o.status));
  const openOrders = orders.filter((o) => isOpen(o.status));
  const totalRevenue = paidOrders.reduce(
    (sum, o) => sum + parseFloat(o.total),
    0,
  );
  const avgBillSize =
    paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  function getStatusLabel(status: string): string {
    if (isPaid(status)) return t("checkout.statusPaid");
    if (isOpen(status)) return t("checkout.statusOpen");
    return status;
  }

  function getStatusKey(status: string): string {
    if (isPaid(status)) return "completed";
    if (isOpen(status)) return "draft";
    return status;
  }

  return (
    <AppLayout title={t("checkout.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard
            label={t("checkout.todaysRevenue")}
            value={isLoading ? "—" : formatCurrency(totalRevenue, "RM")}
            icon={DollarSign}
            change="+12% vs yesterday"
            testId="card-stat-revenue"
          />
          <StatCard
            label={t("checkout.billsPaid")}
            value={isLoading ? "—" : paidOrders.length.toString()}
            icon={Receipt}
            testId="card-stat-paid"
          />
          <StatCard
            label={t("checkout.openBills")}
            value={isLoading ? "—" : openOrders.length.toString()}
            icon={CreditCard}
            testId="card-stat-open"
          />
          <StatCard
            label={t("checkout.avgBillSize")}
            value={isLoading ? "—" : formatCurrency(avgBillSize, "RM")}
            icon={Wallet}
            testId="card-stat-avg"
          />
        </div>

        <div className="toolbar-row">
          <SearchInput
            placeholder={t("checkout.searchBills")}
            testId="input-search-bills"
          />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-bills">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button data-testid="button-daily-report">
              <Receipt className="h-4 w-4 mr-2" />
              {t("checkout.dailyReport")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("checkout.thBillId")}</TableHead>
                  <TableHead>{t("checkout.thTableOrder")}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t("checkout.thItems")}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("checkout.thSubtotal")}
                  </TableHead>
                  <TableHead>{t("checkout.thTotal")}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t("checkout.thPayment")}
                  </TableHead>
                  <TableHead>{t("checkout.thStatus")}</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {t("checkout.thTime")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                      </TableRow>
                    ))
                  : orders.map((order) => {
                      const total = parseFloat(order.total);
                      const itemCount = order.items.length;

                      return (
                        <TableRow
                          key={order.id}
                          className="cursor-pointer"
                          data-testid={`row-bill-${order.id}`}
                        >
                          <TableCell className="font-medium text-sm">
                            {order.id.substring(0, 8)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {contactMap.get(order.contact_id) || order.contact_id.substring(0, 8)}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {itemCount}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {formatCurrency(total, order.currency)}
                          </TableCell>
                          <TableCell className="font-medium text-sm">
                            {formatCurrency(total, order.currency)}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {order.notes ?? "—"}
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              status={getStatusKey(order.status)}
                              label={getStatusLabel(order.status)}
                            />
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                            {formatTime(order.created_at)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
