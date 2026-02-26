import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, DollarSign, CreditCard, Wallet, TrendingUp } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { useContacts } from "@/hooks/use-contacts";
import { useOrders } from "@/hooks/use-orders";
import { useMemo } from "react";
import "@/styles/dashboard.css";

export default function PaymentsPage() {
  const { t } = useTranslation("app");
  const { data: transactions = [], isLoading } = useTransactions();
  const { data: orders = [] } = useOrders();
  const { data: contacts = [] } = useContacts();

  const orderContactMap = useMemo(() => {
    const contactMap = new Map<string, string>();
    contacts.forEach(c => contactMap.set(c.id, c.name));
    const map = new Map<string, string>();
    orders.forEach(o => {
      const contactName = contactMap.get(o.contact_id);
      if (contactName) map.set(o.id, contactName);
    });
    return map;
  }, [orders, contacts]);

  const totalRevenue = transactions
    .filter((txn) => txn.status === "success")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);
  const totalCount = transactions.length;
  const pendingCount = transactions.filter((txn) => txn.status === "pending").length;
  const successCount = transactions.filter((txn) => txn.status === "success").length;
  const successRate = totalCount > 0 ? ((successCount / totalCount) * 100).toFixed(1) : "0.0";

  function getStatusBadge(status: string) {
    switch (status) {
      case "success": return <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{t("payments.statusSuccess")}</Badge>;
      case "pending": return <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">{t("payments.statusPending")}</Badge>;
      case "failed": return <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600 dark:text-red-400">{t("payments.statusFailed")}</Badge>;
      default: return null;
    }
  }

  return (
    <AppLayout title={t("payments.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("payments.totalRevenue")} value={isLoading ? "—" : `RM ${totalRevenue.toLocaleString()}`} icon={DollarSign} change="+8% this month" testId="card-stat-revenue" />
          <StatCard label={t("payments.transactions")} value={isLoading ? "—" : totalCount.toString()} icon={CreditCard} testId="card-stat-transactions" />
          <StatCard label={t("payments.pending")} value={isLoading ? "—" : pendingCount.toString()} icon={Wallet} testId="card-stat-pending" />
          <StatCard label={t("payments.successRate")} value={isLoading ? "—" : `${successRate}%`} icon={TrendingUp} testId="card-stat-rate" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("payments.searchTransactions")} testId="input-search-transactions" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-payments">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button variant="outline" data-testid="button-payout">
              <DollarSign className="h-4 w-4 mr-2" />
              {t("payments.requestPayout")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("payments.thTransaction")}</TableHead>
                  <TableHead>{t("payments.thCustomer")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("payments.thOrder")}</TableHead>
                  <TableHead className="text-right">{t("payments.thAmount")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("payments.thMethod")}</TableHead>
                  <TableHead>{t("payments.thStatus")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("payments.thDate")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  transactions.map((txn) => (
                    <TableRow key={txn.id} className="cursor-pointer" data-testid={`row-txn-${txn.id}`}>
                      <TableCell className="font-medium text-sm">{txn.id.substring(0, 8)}</TableCell>
                      <TableCell className="text-sm">{txn.customer_name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {txn.order_id ? (
                          <span className="font-mono">{txn.order_id.substring(0, 8)}</span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm">{txn.currency} {parseFloat(txn.amount).toLocaleString()}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{txn.method}</TableCell>
                      <TableCell>{getStatusBadge(txn.status)}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{new Date(txn.transaction_date).toLocaleDateString()}</TableCell>
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
