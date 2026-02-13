import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Receipt, CreditCard, Wallet, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/styles/dashboard.css";

const bills = [
  { id: "BILL-001", table: "T-05", items: 4, subtotal: "RM 86.80", tax: "RM 5.21", total: "RM 92.01", method: "E-Wallet", status: "paid", time: "7:45 PM" },
  { id: "BILL-002", table: "T-02", items: 2, subtotal: "RM 38.00", tax: "RM 2.28", total: "RM 40.28", method: "-", status: "open", time: "7:30 PM" },
  { id: "BILL-003", table: "T-12", items: 12, subtotal: "RM 340.00", tax: "RM 20.40", total: "RM 360.40", method: "Card", status: "paid", time: "1:45 PM" },
  { id: "BILL-004", table: "DEL-001", items: 3, subtotal: "RM 52.90", tax: "RM 3.17", total: "RM 56.07", method: "Online", status: "paid", time: "6:20 PM" },
  { id: "BILL-005", table: "T-09", items: 5, subtotal: "RM 110.00", tax: "RM 6.60", total: "RM 116.60", method: "-", status: "open", time: "8:10 PM" },
  { id: "BILL-006", table: "Takeaway", items: 2, subtotal: "RM 29.90", tax: "RM 1.79", total: "RM 31.69", method: "Cash", status: "paid", time: "5:55 PM" },
];

export default function CheckoutPage() {
  const { t } = useTranslation("app");
  const totalRevenue = bills.filter(b => b.status === "paid").reduce((sum, b) => sum + parseFloat(b.total.replace("RM ", "").replace(",", "")), 0);

  function getStatusBadge(status: string) {
    if (status === "paid") return <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{t("checkout.statusPaid")}</Badge>;
    return <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">{t("checkout.statusOpen")}</Badge>;
  }

  return (
    <AppLayout title={t("checkout.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("checkout.todaysRevenue")} value={`RM ${totalRevenue.toFixed(2)}`} icon={DollarSign} change="+12% vs yesterday" testId="card-stat-revenue" />
          <StatCard label={t("checkout.billsPaid")} value={`${bills.filter(b => b.status === "paid").length}`} icon={Receipt} testId="card-stat-paid" />
          <StatCard label={t("checkout.openBills")} value={`${bills.filter(b => b.status === "open").length}`} icon={CreditCard} testId="card-stat-open" />
          <StatCard label={t("checkout.avgBillSize")} value="RM 65.80" icon={Wallet} testId="card-stat-avg" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("checkout.searchBills")} testId="input-search-bills" />
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
                  <TableHead className="hidden sm:table-cell">{t("checkout.thItems")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("checkout.thSubtotal")}</TableHead>
                  <TableHead>{t("checkout.thTotal")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("checkout.thPayment")}</TableHead>
                  <TableHead>{t("checkout.thStatus")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("checkout.thTime")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id} className="cursor-pointer" data-testid={`row-bill-${bill.id}`}>
                    <TableCell className="font-medium text-sm">{bill.id}</TableCell>
                    <TableCell className="text-sm">{bill.table}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{bill.items}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{bill.subtotal}</TableCell>
                    <TableCell className="font-medium text-sm">{bill.total}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{bill.method}</TableCell>
                    <TableCell>{getStatusBadge(bill.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{bill.time}</TableCell>
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
