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
import { Filter, DollarSign, CreditCard, Wallet, TrendingUp } from "lucide-react";
import "@/styles/dashboard.css";

const transactions = [
  { id: "TXN-001", order: "ORD-001", customer: "Sarah Ahmad", amount: "RM 267.00", method: "FPX", status: "success", date: "2026-02-12 14:23" },
  { id: "TXN-002", order: "ORD-002", customer: "Ahmad Razak", amount: "RM 1,200.00", method: "Credit Card", status: "success", date: "2026-02-11 09:15" },
  { id: "TXN-003", order: "ORD-003", customer: "Lisa Tan", amount: "RM 150.00", method: "E-Wallet", status: "pending", date: "2026-02-11 16:40" },
  { id: "TXN-004", order: "ORD-004", customer: "Raj Kumar", amount: "RM 2,340.00", method: "Bank Transfer", status: "success", date: "2026-02-10 11:05" },
  { id: "TXN-005", order: "ORD-005", customer: "Mei Ling", amount: "RM 267.00", method: "FPX", status: "success", date: "2026-02-10 18:30" },
  { id: "TXN-006", order: "ORD-006", customer: "David Ooi", amount: "RM 320.00", method: "Credit Card", status: "failed", date: "2026-02-09 20:10" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "success": return <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Success</Badge>;
    case "pending": return <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">Pending</Badge>;
    case "failed": return <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600 dark:text-red-400">Failed</Badge>;
    default: return null;
  }
}

export default function PaymentsPage() {
  return (
    <AppLayout title="Payment Management">
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label="Total Revenue" value="RM 24,560" icon={DollarSign} change="+8% this month" testId="card-stat-revenue" />
          <StatCard label="Transactions" value="156" icon={CreditCard} testId="card-stat-transactions" />
          <StatCard label="Pending" value="3" icon={Wallet} testId="card-stat-pending" />
          <StatCard label="Success Rate" value="96.5%" icon={TrendingUp} testId="card-stat-rate" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder="Search transactions..." testId="input-search-transactions" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-payments">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" data-testid="button-payout">
              <DollarSign className="h-4 w-4 mr-2" />
              Request Payout
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Order</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id} className="cursor-pointer" data-testid={`row-txn-${txn.id}`}>
                    <TableCell className="font-medium text-sm">{txn.id}</TableCell>
                    <TableCell className="text-sm">{txn.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{txn.order}</TableCell>
                    <TableCell className="text-right font-medium text-sm">{txn.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{txn.method}</TableCell>
                    <TableCell>{getStatusBadge(txn.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{txn.date}</TableCell>
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
