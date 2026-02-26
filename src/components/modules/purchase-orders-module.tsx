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
  Tabs, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  ClipboardList, Truck, CheckCircle2, Plus, Search, Building2, Eye,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePurchaseOrders, useCreatePurchaseOrder, useUpdatePurchaseOrder } from "@/hooks/use-purchase-orders";
import { useSuppliers, useCreateSupplier } from "@/hooks/use-suppliers";
import { useAuthStore } from "@/stores/auth-store";

export function PurchaseOrdersModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;

  const { data: pos = [], isLoading } = usePurchaseOrders(tenantId);
  const { data: suppliers = [] } = useSuppliers(tenantId);
  const createPo = useCreatePurchaseOrder();
  const updatePo = useUpdatePurchaseOrder();
  const createSupplier = useCreateSupplier();

  const [tab, setTab] = useState("orders");
  const [search, setSearch] = useState("");
  const [showNewPo, setShowNewPo] = useState(false);
  const [showNewSupplier, setShowNewSupplier] = useState(false);
  const [showDetail, setShowDetail] = useState<typeof pos[0] | null>(null);

  const [poForm, setPoForm] = useState({ po_number: "", supplier_name: "", notes: "", items: [{ item_name: "", quantity: 1, unit_price: 0 }] });
  const [supplierForm, setSupplierForm] = useState({ name: "", contact_person: "", phone: "", email: "" });

  const totalPo = pos.length;
  const pendingPo = pos.filter((p) => p.status === "draft" || p.status === "submitted").length;
  const approvedPo = pos.filter((p) => p.status === "approved").length;
  const totalAmount = pos.reduce((sum, p) => sum + parseFloat(p.total_amount), 0);

  const filteredPos = pos.filter((p) => p.po_number.toLowerCase().includes(search.toLowerCase()) || p.supplier_name.toLowerCase().includes(search.toLowerCase()));

  const handleCreatePo = async () => {
    if (!tenantId || !poForm.po_number || !poForm.supplier_name) return;
    const total = poForm.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
    await createPo.mutateAsync({
      tenant_id: tenantId,
      po_number: poForm.po_number,
      supplier_name: poForm.supplier_name,
      total_amount: total.toFixed(2),
    });
    setShowNewPo(false);
    setPoForm({ po_number: "", supplier_name: "", notes: "", items: [{ item_name: "", quantity: 1, unit_price: 0 }] });
  };

  const handleCreateSupplier = async () => {
    if (!tenantId || !supplierForm.name) return;
    await createSupplier.mutateAsync({ tenant_id: tenantId, ...supplierForm });
    setShowNewSupplier(false);
    setSupplierForm({ name: "", contact_person: "", phone: "", email: "" });
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    await updatePo.mutateAsync({ id, status: status as "draft" | "submitted" | "approved" | "received" | "cancelled" });
    setShowDetail(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label={t("purchaseOrders.totalPo")} value={totalPo.toString()} icon={ClipboardList} />
        <StatCard label={t("purchaseOrders.pending")} value={pendingPo.toString()} icon={Truck} />
        <StatCard label={t("purchaseOrders.approved")} value={approvedPo.toString()} icon={CheckCircle2} />
        <StatCard label={t("purchaseOrders.totalValue")} value={`RM ${totalAmount.toLocaleString()}`} icon={ClipboardList} />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="orders">{t("purchaseOrders.tabOrders")}</TabsTrigger>
          <TabsTrigger value="suppliers">{t("purchaseOrders.tabSuppliers")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("purchaseOrders.search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button onClick={() => tab === "orders" ? setShowNewPo(true) : setShowNewSupplier(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {tab === "orders" ? t("purchaseOrders.newPo") : t("purchaseOrders.addSupplier")}
        </Button>
      </div>

      {tab === "orders" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("purchaseOrders.thPoNumber")}</TableHead>
                  <TableHead>{t("purchaseOrders.thSupplier")}</TableHead>
                  <TableHead>{t("purchaseOrders.thStatus")}</TableHead>
                  <TableHead className="text-right">{t("purchaseOrders.thAmount")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("purchaseOrders.thDate")}</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPos.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium text-sm">{po.po_number}</TableCell>
                    <TableCell className="text-sm">{po.supplier_name}</TableCell>
                    <TableCell><StatusBadge status={po.status} /></TableCell>
                    <TableCell className="text-right text-sm font-medium">{po.currency} {parseFloat(po.total_amount).toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{new Date(po.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => setShowDetail(po)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPos.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">{t("purchaseOrders.noPo")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("purchaseOrders.thSupplierName")}</TableHead>
                  <TableHead>{t("purchaseOrders.thContact")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("purchaseOrders.thPhone")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("purchaseOrders.thEmail")}</TableHead>
                  <TableHead>{t("purchaseOrders.thStatus")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium text-sm"><div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" />{s.name}</div></TableCell>
                    <TableCell className="text-sm">{s.contact_person || "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{s.phone || "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{s.email || "—"}</TableCell>
                    <TableCell><StatusBadge status={s.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* New PO Dialog */}
      <Dialog open={showNewPo} onOpenChange={setShowNewPo}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("purchaseOrders.newPo")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("purchaseOrders.thPoNumber")}</Label><Input value={poForm.po_number} onChange={(e) => setPoForm({ ...poForm, po_number: e.target.value })} placeholder="PO-001" /></div>
            <div><Label>{t("purchaseOrders.thSupplier")}</Label><Input value={poForm.supplier_name} onChange={(e) => setPoForm({ ...poForm, supplier_name: e.target.value })} /></div>
            <div><Label>{t("purchaseOrders.notes")}</Label><Input value={poForm.notes} onChange={(e) => setPoForm({ ...poForm, notes: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPo(false)}>{t("common.back")}</Button>
            <Button onClick={handleCreatePo} disabled={createPo.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Supplier Dialog */}
      <Dialog open={showNewSupplier} onOpenChange={setShowNewSupplier}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("purchaseOrders.addSupplier")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("purchaseOrders.thSupplierName")}</Label><Input value={supplierForm.name} onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })} /></div>
            <div><Label>{t("purchaseOrders.thContact")}</Label><Input value={supplierForm.contact_person} onChange={(e) => setSupplierForm({ ...supplierForm, contact_person: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("purchaseOrders.thPhone")}</Label><Input value={supplierForm.phone} onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })} /></div>
              <div><Label>{t("purchaseOrders.thEmail")}</Label><Input value={supplierForm.email} onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSupplier(false)}>{t("common.back")}</Button>
            <Button onClick={handleCreateSupplier} disabled={createSupplier.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PO Detail Dialog */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{showDetail?.po_number}</DialogTitle></DialogHeader>
          {showDetail && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">{t("purchaseOrders.thSupplier")}:</span> {showDetail.supplier_name}</div>
                <div><span className="text-muted-foreground">{t("purchaseOrders.thAmount")}:</span> {showDetail.currency} {parseFloat(showDetail.total_amount).toLocaleString()}</div>
                <div><span className="text-muted-foreground">{t("purchaseOrders.thStatus")}:</span> <StatusBadge status={showDetail.status} /></div>
                <div><span className="text-muted-foreground">{t("purchaseOrders.thDate")}:</span> {new Date(showDetail.created_at).toLocaleDateString()}</div>
              </div>
              {showDetail.notes && <p className="text-sm text-muted-foreground">{showDetail.notes}</p>}
            </div>
          )}
          <DialogFooter className="flex gap-2">
            {showDetail?.status === "draft" && (
              <Button onClick={() => handleStatusUpdate(showDetail.id, "submitted")}>{t("purchaseOrders.submit")}</Button>
            )}
            {showDetail?.status === "submitted" && (
              <Button onClick={() => handleStatusUpdate(showDetail.id, "approved")}>{t("purchaseOrders.approve")}</Button>
            )}
            {showDetail?.status === "approved" && (
              <Button onClick={() => handleStatusUpdate(showDetail.id, "received")}>{t("purchaseOrders.markReceived")}</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
