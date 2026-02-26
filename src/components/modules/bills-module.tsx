import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tabs, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText, AlertCircle, CheckCircle2, Plus, Search, Eye,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBills, useCreateBill, useUpdateBill } from "@/hooks/use-bills";
import { useAuthStore } from "@/stores/auth-store";

export function BillsModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;

  const { data: bills = [], isLoading } = useBills(tenantId);
  const createBill = useCreateBill();
  const updateBill = useUpdateBill();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [showDetail, setShowDetail] = useState<typeof bills[0] | null>(null);
  const [form, setForm] = useState({
    bill_number: "", vendor: "", amount: "", type: "other" as "purchase" | "logistics" | "operation" | "other",
    due_date: "", category: "", description: "",
  });

  const now = new Date();
  const totalBills = bills.length;
  const pendingBills = bills.filter((b) => b.status === "pending").length;
  const overdueBills = bills.filter((b) => b.status === "pending" && new Date(b.due_date) < now).length;
  const totalAmount = bills.reduce((s, b) => s + parseFloat(b.amount), 0);

  const filtered = bills.filter((b) => {
    const matchSearch = b.bill_number.toLowerCase().includes(search.toLowerCase()) || b.vendor.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    if (tab === "overdue") return matchSearch && b.status === "pending" && new Date(b.due_date) < now;
    return matchSearch && b.status === tab;
  });

  const handleCreate = async () => {
    if (!tenantId || !form.bill_number || !form.vendor || !form.amount || !form.due_date) return;
    await createBill.mutateAsync({
      tenant_id: tenantId,
      bill_number: form.bill_number,
      vendor: form.vendor,
      amount: form.amount,
      type: form.type,
      due_date: form.due_date,
      category: form.category || undefined,
      description: form.description || undefined,
    });
    setShowNew(false);
    setForm({ bill_number: "", vendor: "", amount: "", type: "other", due_date: "", category: "", description: "" });
  };

  const handleMarkPaid = async (id: string) => {
    await updateBill.mutateAsync({ id, status: "paid", paid_date: new Date().toISOString().split("T")[0] });
    setShowDetail(null);
  };

  if (isLoading) {
    return <div className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-4 gap-4">{[1,2,3,4].map(i=><Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}</div></div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label={t("bills.total")} value={totalBills.toString()} icon={FileText} />
        <StatCard label={t("bills.pending")} value={pendingBills.toString()} icon={AlertCircle} iconColor="text-yellow-500" />
        <StatCard label={t("bills.overdue")} value={overdueBills.toString()} icon={AlertCircle} iconColor="text-red-500" />
        <StatCard label={t("bills.totalAmount")} value={`RM ${totalAmount.toLocaleString()}`} icon={CheckCircle2} />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">{t("bills.tabAll")}</TabsTrigger>
          <TabsTrigger value="pending">{t("bills.tabPending")}</TabsTrigger>
          <TabsTrigger value="paid">{t("bills.tabPaid")}</TabsTrigger>
          <TabsTrigger value="overdue">{t("bills.tabOverdue")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("bills.searchBills")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("bills.addBill")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("bills.thBillNo")}</TableHead>
                <TableHead>{t("bills.thVendor")}</TableHead>
                <TableHead>{t("bills.thType")}</TableHead>
                <TableHead className="text-right">{t("bills.thAmount")}</TableHead>
                <TableHead className="hidden sm:table-cell">{t("bills.thDueDate")}</TableHead>
                <TableHead>{t("bills.thStatus")}</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((bill) => {
                const isOverdue = bill.status === "pending" && new Date(bill.due_date) < now;
                return (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium text-sm">{bill.bill_number}</TableCell>
                    <TableCell className="text-sm">{bill.vendor}</TableCell>
                    <TableCell className="text-sm capitalize">{bill.type}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{bill.currency} {parseFloat(bill.amount).toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{new Date(bill.due_date).toLocaleDateString()}</TableCell>
                    <TableCell><StatusBadge status={isOverdue ? "overdue" : bill.status} /></TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => setShowDetail(bill)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">{t("bills.noBills")}</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Bill Dialog */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("bills.addBill")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("bills.thBillNo")}</Label><Input value={form.bill_number} onChange={(e) => setForm({...form, bill_number: e.target.value})} placeholder="BILL-001" /></div>
              <div><Label>{t("bills.thVendor")}</Label><Input value={form.vendor} onChange={(e) => setForm({...form, vendor: e.target.value})} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("bills.thAmount")}</Label><Input type="number" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} /></div>
              <div>
                <Label>{t("bills.thType")}</Label>
                <Select value={form.type} onValueChange={(v) => setForm({...form, type: v as typeof form.type})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">{t("bills.typePurchase")}</SelectItem>
                    <SelectItem value="logistics">{t("bills.typeLogistics")}</SelectItem>
                    <SelectItem value="operation">{t("bills.typeOperation")}</SelectItem>
                    <SelectItem value="other">{t("bills.typeOther")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>{t("bills.thDueDate")}</Label><Input type="date" value={form.due_date} onChange={(e) => setForm({...form, due_date: e.target.value})} /></div>
            <div><Label>{t("bills.description")}</Label><Input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>{t("common.back")}</Button>
            <Button onClick={handleCreate} disabled={createBill.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bill Detail Dialog */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{showDetail?.bill_number}</DialogTitle></DialogHeader>
          {showDetail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">{t("bills.thVendor")}:</span> {showDetail.vendor}</div>
                <div><span className="text-muted-foreground">{t("bills.thAmount")}:</span> {showDetail.currency} {parseFloat(showDetail.amount).toLocaleString()}</div>
                <div><span className="text-muted-foreground">{t("bills.thType")}:</span> <span className="capitalize">{showDetail.type}</span></div>
                <div><span className="text-muted-foreground">{t("bills.thDueDate")}:</span> {new Date(showDetail.due_date).toLocaleDateString()}</div>
              </div>
              {showDetail.description && <p className="text-muted-foreground">{showDetail.description}</p>}
            </div>
          )}
          <DialogFooter>
            {showDetail?.status === "pending" && (
              <Button onClick={() => handleMarkPaid(showDetail.id)} disabled={updateBill.isPending}>
                {t("bills.markPaid")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
