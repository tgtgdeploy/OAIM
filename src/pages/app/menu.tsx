import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  GripVertical,
  Image,
  MoreVertical,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts, useUpdateProduct, useCreateProduct } from "@/hooks/use-products";
import { useToast } from "@/hooks/use-toast";

export default function MenuPage() {
  const { t } = useTranslation("app");
  const { data: products = [], isLoading } = useProducts();
  const updateProduct = useUpdateProduct();
  const createProduct = useCreateProduct();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCurrency, setFormCurrency] = useState("MYR");
  const [formDescription, setFormDescription] = useState("");

  function resetForm() {
    setFormName("");
    setFormCategory("");
    setFormPrice("");
    setFormCurrency("MYR");
    setFormDescription("");
  }

  function handleSubmitItem(e: React.FormEvent) {
    e.preventDefault();
    if (!formName || !formPrice) return;
    createProduct.mutate(
      {
        tenant_id: "demo",
        name: formName,
        category: formCategory || null,
        price: formPrice,
        currency: formCurrency,
        description: formDescription || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("menu.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  }

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const cat = p.category ?? "Uncategorized";
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  const filtered = activeCategory
    ? products.filter((p) => (p.category ?? "Uncategorized") === activeCategory)
    : products;

  function handleToggleActive(id: string, currentlyActive: boolean): void {
    updateProduct.mutate({ id, is_active: !currentlyActive });
  }

  function formatPrice(currency: string, price: string): string {
    return `${currency} ${parseFloat(price).toFixed(2)}`;
  }

  return (
    <AppLayout title={t("menu.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {t("menu.itemsAcross", { items: products.length, categories: categories.length })}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("menu.searchMenu")} className="pl-9 w-56" data-testid="input-search-menu" />
            </div>
            <Button variant="outline" data-testid="button-add-category">
              <Plus className="h-4 w-4 mr-2" />
              {t("menu.category")}
            </Button>
            <Button onClick={() => setDialogOpen(true)} data-testid="button-add-item">
              <Plus className="h-4 w-4 mr-2" />
              {t("menu.addItem")}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={activeCategory === null ? "secondary" : "outline"}
            onClick={() => setActiveCategory(null)}
            data-testid="filter-all"
          >
            {t("menu.all")}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.name}
              size="sm"
              variant={activeCategory === cat.name ? "secondary" : "outline"}
              onClick={() => setActiveCategory(cat.name)}
              data-testid={`filter-category-${cat.name}`}
            >
              {cat.name}
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{cat.count}</Badge>
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-10" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) => (
              <Card key={item.id} data-testid={`card-menu-item-${item.id}`}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0 cursor-grab" />
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <Image className="h-5 w-5 text-muted-foreground/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium" data-testid={`text-menu-name-${item.id}`}>{item.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.category ?? "Uncategorized"}</p>
                    </div>
                    <span className="text-sm font-bold shrink-0" data-testid={`text-menu-price-${item.id}`}>
                      {formatPrice(item.currency, item.price)}
                    </span>
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() => handleToggleActive(item.id, item.is_active)}
                      data-testid={`switch-menu-${item.id}`}
                    />
                    <Button size="icon" variant="ghost" data-testid={`button-menu-more-${item.id}`}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("menu.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("menu.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-name">{t("menu.itemName")}</Label>
              <Input id="menu-name" required value={formName} onChange={(e) => setFormName(e.target.value)} data-testid="input-menu-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-category">{t("menu.category")}</Label>
              <Input id="menu-category" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} data-testid="input-menu-category" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-price">{t("menu.price")}</Label>
              <Input id="menu-price" type="number" step="0.01" required value={formPrice} onChange={(e) => setFormPrice(e.target.value)} data-testid="input-menu-price" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-currency">{t("menu.currency")}</Label>
              <Input id="menu-currency" value={formCurrency} onChange={(e) => setFormCurrency(e.target.value)} data-testid="input-menu-currency" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-description">{t("menu.description")}</Label>
              <Textarea id="menu-description" placeholder={t("menu.descriptionPlaceholder")} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} data-testid="input-menu-description" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createProduct.isPending} data-testid="button-submit-menu-item">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
