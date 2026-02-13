import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Upload, Package, Grid3X3, List } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const products = [
  { id: "1", name: "Blue Floral Dress", category: "Dresses", price: "RM 89.00", stock: 45, active: true },
  { id: "2", name: "Classic White T-Shirt", category: "Tops", price: "RM 35.00", stock: 120, active: true },
  { id: "3", name: "Leather Handbag Premium", category: "Bags", price: "RM 280.00", stock: 12, active: true },
  { id: "4", name: "Running Shoes Pro", category: "Shoes", price: "RM 160.00", stock: 30, active: true },
  { id: "5", name: "Silk Hijab Collection", category: "Hijab", price: "RM 45.00", stock: 80, active: true },
  { id: "6", name: "Casual Polo Shirt", category: "Tops", price: "RM 55.00", stock: 65, active: true },
  { id: "7", name: "Denim Jacket", category: "Outerwear", price: "RM 120.00", stock: 0, active: false },
  { id: "8", name: "Cotton Scarf", category: "Accessories", price: "RM 25.00", stock: 200, active: true },
];

export default function ProductsPage() {
  const { t } = useTranslation("app");
  const [view, setView] = useState<"grid" | "list">("grid");

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
            <Button data-testid="button-add-product">
              <Plus className="h-4 w-4 mr-2" />
              {t("products.addProduct")}
            </Button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-product-${product.id}`}>
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-md flex items-center justify-center">
                    <Package className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <Switch checked={product.active} data-testid={`switch-product-${product.id}`} />
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <span className="text-sm font-bold">{product.price}</span>
                      <Badge variant={product.stock > 0 ? "secondary" : "destructive"} className="text-xs">
                        {product.stock > 0 ? t("products.inStock", { count: product.stock }) : t("products.outOfStock")}
                      </Badge>
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
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 cursor-pointer hover-elevate" data-testid={`row-product-${product.id}`}>
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-muted-foreground/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category}</div>
                    </div>
                    <div className="text-sm font-bold">{product.price}</div>
                    <Badge variant={product.stock > 0 ? "secondary" : "destructive"} className="text-xs">
                      {product.stock > 0 ? `${product.stock}` : t("products.oos")}
                    </Badge>
                    <Switch checked={product.active} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
