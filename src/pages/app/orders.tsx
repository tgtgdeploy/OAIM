import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Filter, ShoppingCart, Package, Truck, CheckCircle2, X, Trash2 } from "lucide-react";
import { useOrders, useCreateOrder } from "@/hooks/use-orders";
import { useContacts } from "@/hooks/use-contacts";
import { useProducts } from "@/hooks/use-products";
import { useProductVariants } from "@/hooks/use-product-variants";
import { useBulkCreateOrderItems } from "@/hooks/use-order-items";
import { useToast } from "@/hooks/use-toast";
import "@/styles/dashboard.css";

interface LineItem {
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

const paymentStatusColors: Record<string, string> = {
  unpaid: "bg-red-500/10 text-red-600 dark:text-red-400",
  partial: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  refunded: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
};

export default function OrdersPage() {
  const { t } = useTranslation("app");
  const { data: orders = [], isLoading } = useOrders();
  const { data: contacts = [] } = useContacts();
  const { data: products = [] } = useProducts();
  const createOrder = useCreateOrder();
  const bulkCreateItems = useBulkCreateOrderItems();
  const { toast } = useToast();

  const contactMap = useMemo(() => {
    const map = new Map<string, string>();
    contacts.forEach(c => map.set(c.id, c.name));
    return map;
  }, [contacts]);

  // Create order dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contactId, setContactId] = useState("");
  const [currency, setCurrency] = useState("MYR");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  // Detail dialog
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const { data: selectedVariants = [] } = useProductVariants(selectedProductId || undefined);

  const addLineItem = (variantId?: string) => {
    if (!selectedProduct) return;
    const variant = variantId ? selectedVariants.find(v => v.id === variantId) : null;
    const unitPrice = variant ? variant.price : parseFloat(selectedProduct.price);
    const item: LineItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      variantId: variant?.id,
      variantName: variant?.name,
      quantity: 1,
      unitPrice,
      lineTotal: unitPrice,
    };
    setLineItems([...lineItems, item]);
    setSelectedProductId("");
  };

  const updateLineItemQty = (index: number, qty: number) => {
    const items = [...lineItems];
    items[index].quantity = qty;
    items[index].lineTotal = qty * items[index].unitPrice;
    setLineItems(items);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const orderTotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const resetForm = () => {
    setContactId(""); setCurrency("MYR"); setNotes("");
    setPaymentMethod(""); setShippingAddress(""); setShippingCity("");
    setShippingState(""); setShippingPostalCode(""); setShippingCountry("");
    setLineItems([]); setSelectedProductId("");
  };

  const handleSubmit = () => {
    if (!contactId || lineItems.length === 0) return;
    createOrder.mutate(
      {
        tenant_id: "demo",
        contact_id: contactId,
        total: orderTotal.toString(),
        currency,
        items: lineItems.map(li => ({ name: li.productName, qty: li.quantity, price: li.unitPrice })),
        notes: notes || null,
        payment_method: paymentMethod || null,
        shipping_address: shippingAddress || null,
        shipping_city: shippingCity || null,
        shipping_state: shippingState || null,
        shipping_postal_code: shippingPostalCode || null,
        shipping_country: shippingCountry || null,
      },
      {
        onSuccess: (order) => {
          // Create order items in the order_items table
          if (lineItems.length > 0) {
            bulkCreateItems.mutate({
              orderId: order.id,
              items: lineItems.map(li => ({
                order_id: order.id,
                product_id: li.productId,
                variant_id: li.variantId || null,
                product_name: li.productName,
                variant_name: li.variantName || null,
                quantity: li.quantity,
                unit_price: li.unitPrice,
                line_total: li.lineTotal,
              })),
            });
          }
          toast({ title: t("orders.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  };

  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const inTransit = orders.filter((order) => order.status === "shipped").length;
  const completed = orders.filter((order) => order.status === "completed").length;

  const paymentStatusLabels: Record<string, string> = {
    unpaid: t("orders.paymentUnpaid"),
    partial: t("orders.paymentPartial"),
    paid: t("orders.paymentPaid"),
    refunded: t("orders.paymentRefunded"),
  };

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
            <Button data-testid="button-create-order" onClick={() => setDialogOpen(true)}>
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
                  <TableHead className="hidden sm:table-cell">{t("orders.thPaymentStatus")}</TableHead>
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
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer" data-testid={`row-order-${order.id}`}>
                      <TableCell className="font-medium text-sm">{order.id.substring(0, 8)}</TableCell>
                      <TableCell className="text-sm">{contactMap.get(order.contact_id) || order.contact_id.substring(0, 8)}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-48 truncate">{order.items.length} items</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary" className={`text-xs ${paymentStatusColors[order.payment_status] || ""}`}>
                          {paymentStatusLabels[order.payment_status] || order.payment_status}
                        </Badge>
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

        {/* Create Order Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("orders.dialogTitle")}</DialogTitle>
              <DialogDescription className="sr-only">{t("orders.dialogTitle")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {/* Customer Selection */}
              <div className="space-y-2">
                <Label>{t("orders.customer")}</Label>
                <Select value={contactId} onValueChange={setContactId}>
                  <SelectTrigger data-testid="select-order-customer">
                    <SelectValue placeholder={t("orders.selectCustomer")} />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}{c.company ? ` (${c.company})` : ""}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Line Items */}
              <div className="space-y-3">
                <Label>{t("orders.lineItems")}</Label>
                {lineItems.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("orders.selectProduct")}</TableHead>
                        <TableHead className="w-20">{t("orders.quantity")}</TableHead>
                        <TableHead className="text-right w-24">{t("orders.unitPrice")}</TableHead>
                        <TableHead className="text-right w-24">{t("orders.lineTotal")}</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="text-sm">
                            {item.productName}{item.variantName ? ` - ${item.variantName}` : ""}
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => updateLineItemQty(idx, parseInt(e.target.value) || 1)}
                              className="h-8 w-16"
                            />
                          </TableCell>
                          <TableCell className="text-right text-sm">{item.unitPrice.toLocaleString()}</TableCell>
                          <TableCell className="text-right text-sm font-medium">{item.lineTotal.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeLineItem(idx)}>
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {/* Add product selector */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Select value={selectedProductId} onValueChange={(v) => setSelectedProductId(v)}>
                      <SelectTrigger data-testid="select-add-product">
                        <SelectValue placeholder={t("orders.selectProduct")} />
                      </SelectTrigger>
                      <SelectContent>
                        {products.filter(p => p.is_active).map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name} — {p.currency} {parseFloat(p.price).toLocaleString()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedProductId && selectedVariants.length > 0 ? (
                    <Select onValueChange={(variantId) => addLineItem(variantId)}>
                      <SelectTrigger className="w-40" data-testid="select-add-variant">
                        <SelectValue placeholder={t("orders.selectVariant")} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedVariants.filter(v => v.is_active).map((v) => (
                          <SelectItem key={v.id} value={v.id}>{v.name} — {v.currency} {v.price.toLocaleString()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => addLineItem()} disabled={!selectedProductId} data-testid="button-add-line-item">
                      <Plus className="h-4 w-4 mr-1" /> {t("orders.addItem")}
                    </Button>
                  )}
                </div>

                {lineItems.length > 0 && (
                  <div className="text-right text-sm font-bold">
                    {t("orders.total")}: {currency} {orderTotal.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div className="space-y-2">
                <Label>{t("orders.shippingAddress")}</Label>
                <Input value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} data-testid="input-shipping-address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("orders.shippingCity")}</Label>
                  <Input value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t("orders.shippingState")}</Label>
                  <Input value={shippingState} onChange={(e) => setShippingState(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("orders.shippingPostalCode")}</Label>
                  <Input value={shippingPostalCode} onChange={(e) => setShippingPostalCode(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t("orders.shippingCountry")}</Label>
                  <Input value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} />
                </div>
              </div>

              {/* Payment & Notes */}
              <div className="space-y-2">
                <Label>{t("orders.paymentMethod")}</Label>
                <Input value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} data-testid="input-payment-method" />
              </div>
              <div className="space-y-2">
                <Label>{t("orders.currency")}</Label>
                <Input value={currency} onChange={(e) => setCurrency(e.target.value)} data-testid="input-order-currency" />
              </div>
              <div className="space-y-2">
                <Label>{t("orders.notes")}</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("orders.notesPlaceholder")} data-testid="input-order-notes" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={!contactId || lineItems.length === 0 || createOrder.isPending} data-testid="button-submit-order">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
