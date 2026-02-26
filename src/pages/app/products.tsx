import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { Search, Plus, Upload, Package, Grid3X3, List } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts, useCreateProduct } from "@/hooks/use-products";
import { useToast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const { t } = useTranslation("app");
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const { toast } = useToast();
  const [view, setView] = useState<"grid" | "list">("grid");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("MYR");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setCurrency("MYR");
    setStock("");
    setDescription("");
  };

  const handleSubmit = () => {
    if (!name || !price) return;
    createProduct.mutate(
      {
        tenant_id: "demo",
        name,
        category: category || null,
        price,
        currency,
        stock: stock ? parseInt(stock, 10) : null,
        description: description || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("products.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  };

  return (
    <AppLayout title={t("products.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("products.countProducts", { count: products.length })}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("products.searchProducts")} className="pl-9 w-56" data-testid="input-search-products" />
            </div>
            <div className="flex border rounded-md">
              <Button
                size="icon"
                variant={view === "grid" ? "secondary" : "ghost"}
                onClick={() => setView("grid")}
                data-testid="button-view-grid"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={view === "list" ? "secondary" : "ghost"}
                onClick={() => setView("list")}
                data-testid="button-view-list"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" data-testid="button-import">
              <Upload className="h-4 w-4 mr-2" />
              {t("common.import")}
            </Button>
            <Button data-testid="button-add-product" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("products.addProduct")}
            </Button>
          </div>
        </div>

        {isLoading ? (
          view === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-visible">
                  <CardContent className="p-0">
                    <Skeleton className="aspect-square rounded-t-md" />
                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-12" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-5 w-10" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => {
              const stock = product.stock ?? 0;
              const formattedPrice = `${product.currency} ${parseFloat(product.price).toLocaleString()}`;
              return (
                <Card key={product.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-product-${product.id}`}>
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted rounded-t-md flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground/20" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-medium">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.category ?? "—"}</p>
                        </div>
                        <Switch checked={product.is_active} data-testid={`switch-product-${product.id}`} />
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-3">
                        <span className="text-sm font-bold">{formattedPrice}</span>
                        <Badge variant={stock > 0 ? "secondary" : "destructive"} className="text-xs">
                          {stock > 0 ? t("products.inStock", { count: stock }) : t("products.outOfStock")}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {products.map((product) => {
                  const stock = product.stock ?? 0;
                  const formattedPrice = `${product.currency} ${parseFloat(product.price).toLocaleString()}`;
                  return (
                    <div key={product.id} className="flex items-center gap-4 p-4 cursor-pointer hover-elevate" data-testid={`row-product-${product.id}`}>
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-muted-foreground/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.category ?? "—"}</div>
                      </div>
                      <div className="text-sm font-bold">{formattedPrice}</div>
                      <Badge variant={stock > 0 ? "secondary" : "destructive"} className="text-xs">
                        {stock > 0 ? `${stock}` : t("products.oos")}
                      </Badge>
                      <Switch checked={product.is_active} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("products.dialogTitle")}</DialogTitle>
              <DialogDescription className="sr-only">{t("products.dialogTitle")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>{t("products.name")}</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="input-product-name"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("products.category")}</Label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  data-testid="input-product-category"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("products.price")}</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  data-testid="input-product-price"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("products.currency")}</Label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  data-testid="input-product-currency"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("products.stock")}</Label>
                <Input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  data-testid="input-product-stock"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("products.description")}</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("products.descriptionPlaceholder")}
                  data-testid="input-product-description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={!name || !price || createProduct.isPending} data-testid="button-submit-product">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
