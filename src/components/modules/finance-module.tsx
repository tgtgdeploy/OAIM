import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tabs, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFinanceTransactions } from "@/hooks/use-finance";
import { useAuthStore } from "@/stores/auth-store";

export function FinanceModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;
  const { data: transactions = [], isLoading } = useFinanceTransactions(tenantId);
  const [tab, setTab] = useState("all");

  const income = transactions.filter((tx) => tx.type === "income").reduce((s, tx) => s + parseFloat(tx.amount), 0);
  const expenses = transactions.filter((tx) => tx.type === "expense").reduce((s, tx) => s + parseFloat(tx.amount), 0);
  const profit = income - expenses;

  const filtered = tab === "all" ? transactions : transactions.filter((tx) => tx.type === tab);

  // Expense breakdown by category
  const expenseBreakdown = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const cat = tx.category || "uncategorized";
      acc[cat] = (acc[cat] || 0) + parseFloat(tx.amount);
      return acc;
    }, {} as Record<string, number>);

  const breakdownEntries = Object.entries(expenseBreakdown).sort((a, b) => b[1] - a[1]);
  const totalExpense = breakdownEntries.reduce((s, [, v]) => s + v, 0);

  if (isLoading) {
    return <div className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{[1,2,3].map(i=><Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}</div></div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label={t("finance.revenue")} value={`RM ${income.toLocaleString()}`} icon={TrendingUp} iconColor="text-green-500" />
        <StatCard label={t("finance.expenses")} value={`RM ${expenses.toLocaleString()}`} icon={TrendingDown} iconColor="text-red-500" />
        <StatCard
          label={t("finance.profit")}
          value={`RM ${profit.toLocaleString()}`}
          icon={DollarSign}
          iconColor={profit >= 0 ? "text-green-500" : "text-red-500"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Expense Breakdown */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2"><CardTitle className="text-sm">{t("finance.expenseBreakdown")}</CardTitle></CardHeader>
          <CardContent>
            {breakdownEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("finance.noData")}</p>
            ) : (
              <div className="space-y-3">
                {breakdownEntries.map(([cat, amount]) => {
                  const pct = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(0) : 0;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="capitalize">{cat}</span>
                        <span className="font-medium">RM {amount.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction List */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{t("finance.transactions")}</CardTitle>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="h-8">
                  <TabsTrigger value="all" className="text-xs h-6">{t("finance.tabAll")}</TabsTrigger>
                  <TabsTrigger value="income" className="text-xs h-6">{t("finance.tabIncome")}</TabsTrigger>
                  <TabsTrigger value="expense" className="text-xs h-6">{t("finance.tabExpense")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("finance.thDate")}</TableHead>
                  <TableHead>{t("finance.thCategory")}</TableHead>
                  <TableHead>{t("finance.thDescription")}</TableHead>
                  <TableHead className="text-right">{t("finance.thAmount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(0, 20).map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs capitalize">{tx.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm max-w-48 truncate">{tx.description || "—"}</TableCell>
                    <TableCell className="text-right">
                      <span className={`text-sm font-medium flex items-center justify-end gap-1 ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {tx.type === "income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {tx.currency} {parseFloat(tx.amount).toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">{t("finance.noData")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
