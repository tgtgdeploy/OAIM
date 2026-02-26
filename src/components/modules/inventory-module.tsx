import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Package, AlertTriangle, TrendingDown, Plus, ArrowUpCircle, ArrowDownCircle, Search,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useInventoryItems,
  useInventoryCategories,
  useCreateInventoryItem,
  useUpdateInventoryItem,
  useCreateLedgerEntry,
} from "@/hooks/use-inventory";
import { useAuthStore } from "@/stores/auth-store";

function getStockStatus(stock: number, minStock: number) {
  if (stock === 0) return "out_of_stock";
  if (stock <= minStock) return "low";
  return "normal";
}

export function InventoryModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;

  const { data: items = [], isLoading } = useInventoryItems(tenantId);
  const { data: categories = [] } = useInventoryCategories(tenantId);
  const createItem = useCreateInventoryItem();
  const updateItem = useUpdateInventoryItem();
  const createLedger = useCreateLedgerEntry();

  const [search, setSearch] = useState("");
  const [showNewItem, setShowNewItem] = useState(false);
  const [showStockModal, setShowStockModal] = useState<{ type: "in" | "out"; item: typeof items[0] } | null>(null);
  const [newForm, setNewForm] = useState({ name: "", sku: "", stock: 0, min_stock: 5, unit: "pcs", cost_price: "0" });
  const [stockQty, setStockQty] = useState(1);
  const [stockNote, setStockNote] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const totalSku = items.length;
  const lowStock = items.filter((i) => i.stock > 0 && i.stock <= i.min_stock).length;
  const outOfStock = items.filter((i) => i.stock === 0).length;

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || i.category_id === filterCategory;
    return matchSearch && matchCat;
  });

  const handleCreateItem = async () => {
    if (!tenantId || !newForm.name || !newForm.sku) return;
    await createItem.mutateAsync({
      tenant_id: tenantId,
      name: newForm.name,
      sku: newForm.sku,
      stock: newForm.stock,
      min_stock: newForm.min_stock,
      unit: newForm.unit,
      cost_price: newForm.cost_price,
    });
    setShowNewItem(false);
    setNewForm({ name: "", sku: "", stock: 0, min_stock: 5, unit: "pcs", cost_price: "0" });
  };

  const handleStockMovement = async () => {
    if (!showStockModal || !tenantId || stockQty <= 0) return;
    const { type, item } = showStockModal;
    const newStock = type === "in" ? item.stock + stockQty : Math.max(0, item.stock - stockQty);

    await createLedger.mutateAsync({
      tenant_id: tenantId,
      item_id: item.id,
      type,
      quantity: stockQty,
      movement_type: "manual",
      note: stockNote || undefined,
    });
    await updateItem.mutateAsync({ id: item.id, stock: newStock });
    setShowStockModal(null);
    setStockQty(1);
    setStockNote("");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}
        </div>
        <Card><CardContent className="p-4"><Skeleton className="h-48 w-full" /></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label={t("inventory.totalSku")} value={totalSku.toString()} icon={Package} />
        <StatCard label={t("inventory.lowStock")} value={lowStock.toString()} icon={AlertTriangle} iconColor="text-orange-500" />
        <StatCard label={t("inventory.outOfStock")} value={outOfStock.toString()} icon={TrendingDown} iconColor="text-red-500" />
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={filterCategory === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilterCategory("all")}
          >
            {t("inventory.allCategories")}
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={filterCategory === cat.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterCategory(cat.id)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("inventory.searchItems")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setShowNewItem(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("inventory.addItem")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("inventory.thItem")}</TableHead>
                <TableHead className="hidden sm:table-cell">{t("inventory.thSku")}</TableHead>
                <TableHead>{t("inventory.thStock")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("inventory.thMinStock")}</TableHead>
                <TableHead>{t("inventory.thStatus")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("inventory.thCost")}</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-sm">{item.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{item.sku}</TableCell>
                  <TableCell className="text-sm font-medium">{item.stock} {item.unit}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{item.min_stock}</TableCell>
                  <TableCell>
                    <StatusBadge status={getStockStatus(item.stock, item.min_stock)} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">RM {parseFloat(item.cost_price).toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => { setShowStockModal({ type: "in", item }); setStockQty(1); }}>
                        <ArrowUpCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { setShowStockModal({ type: "out", item }); setStockQty(1); }}>
                        <ArrowDownCircle className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    {t("inventory.noItems")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Item Dialog */}
      <Dialog open={showNewItem} onOpenChange={setShowNewItem}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("inventory.addItem")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("inventory.itemName")}</Label><Input value={newForm.name} onChange={(e) => setNewForm({ ...newForm, name: e.target.value })} /></div>
            <div><Label>{t("inventory.thSku")}</Label><Input value={newForm.sku} onChange={(e) => setNewForm({ ...newForm, sku: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("inventory.thStock")}</Label><Input type="number" value={newForm.stock} onChange={(e) => setNewForm({ ...newForm, stock: Number(e.target.value) })} /></div>
              <div><Label>{t("inventory.thMinStock")}</Label><Input type="number" value={newForm.min_stock} onChange={(e) => setNewForm({ ...newForm, min_stock: Number(e.target.value) })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("inventory.unit")}</Label>
                <Select value={newForm.unit} onValueChange={(v) => setNewForm({ ...newForm, unit: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">pcs</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="litre">litre</SelectItem>
                    <SelectItem value="box">box</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>{t("inventory.costPrice")}</Label><Input type="number" value={newForm.cost_price} onChange={(e) => setNewForm({ ...newForm, cost_price: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewItem(false)}>{t("common.back")}</Button>
            <Button onClick={handleCreateItem} disabled={createItem.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Movement Dialog */}
      <Dialog open={!!showStockModal} onOpenChange={() => setShowStockModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showStockModal?.type === "in" ? t("inventory.stockIn") : t("inventory.stockOut")}
              {" — "}{showStockModal?.item.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("inventory.quantity")}</Label><Input type="number" min={1} value={stockQty} onChange={(e) => setStockQty(Number(e.target.value))} /></div>
            <div><Label>{t("inventory.note")}</Label><Input value={stockNote} onChange={(e) => setStockNote(e.target.value)} placeholder={t("inventory.notePlaceholder")} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStockModal(null)}>{t("common.back")}</Button>
            <Button onClick={handleStockMovement} disabled={createLedger.isPending}>
              {showStockModal?.type === "in" ? t("inventory.stockIn") : t("inventory.stockOut")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
