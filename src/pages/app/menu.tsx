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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Plus,
  GripVertical,
  Image as ImageIcon,
  MoreVertical,
  Flame,
  Leaf,
  Clock,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts, useUpdateProduct, useCreateProduct } from "@/hooks/use-products";
import { useProductVariants, useCreateProductVariant } from "@/hooks/use-product-variants";
import { useToast } from "@/hooks/use-toast";

export default function MenuPage() {
  const { t, i18n } = useTranslation("app");
  const { data: products = [], isLoading } = useProducts();
  const updateProduct = useUpdateProduct();
  const createProduct = useCreateProduct();
  const createVariant = useCreateProductVariant();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<string | null>(null);

  // Create form state
  const [formName, setFormName] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formNameZh, setFormNameZh] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCurrency, setFormCurrency] = useState("MYR");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formPrepTime, setFormPrepTime] = useState("");
  const [formIsSpicy, setFormIsSpicy] = useState(false);
  const [formIsVegetarian, setFormIsVegetarian] = useState(false);

  // Variant form state
  const [variantName, setVariantName] = useState("");
  const [variantPrice, setVariantPrice] = useState("");

  const detailProduct = products.find(p => p.id === detailItem);
  const { data: detailVariants = [] } = useProductVariants(detailItem ?? undefined);

  function resetForm() {
    setFormName(""); setFormNameEn(""); setFormNameZh("");
    setFormCategory(""); setFormPrice(""); setFormCurrency("MYR");
    setFormDescription(""); setFormImageUrl(""); setFormTags("");
    setFormPrepTime(""); setFormIsSpicy(false); setFormIsVegetarian(false);
  }

  function handleSubmitItem(e: React.FormEvent) {
    e.preventDefault();
    if (!formName || !formPrice) return;
    const tags = formTags.split(",").map(t => t.trim()).filter(Boolean);
    if (formIsSpicy) tags.push("spicy");
    if (formIsVegetarian) tags.push("vegetarian");

    createProduct.mutate(
      {
        tenant_id: "demo",
        name: formName,
        name_en: formNameEn || null,
        name_zh: formNameZh || null,
        category: formCategory || null,
        price: formPrice,
        currency: formCurrency,
        description: formDescription || null,
        image_url: formImageUrl || null,
        images: formImageUrl ? [formImageUrl] : [],
        tags,
        unit: formPrepTime ? `${formPrepTime} min` : null,
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

  function handleAddVariant() {
    if (!detailItem || !variantName || !variantPrice) return;
    createVariant.mutate(
      {
        tenant_id: "demo",
        product_id: detailItem,
        name: variantName,
        price: parseFloat(variantPrice),
        currency: detailProduct?.currency ?? "MYR",
      },
      {
        onSuccess: () => {
          toast({ title: t("menu.variantAdded") });
          setVariantName("");
          setVariantPrice("");
        },
      }
    );
  }

  function getDisplayName(item: { name: string; name_en?: string | null; name_zh?: string | null }): string {
    if (i18n.language === "zh" && item.name_zh) return item.name_zh;
    if (i18n.language === "en" && item.name_en) return item.name_en;
    return item.name;
  }

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const cat = p.category ?? "Uncategorized";
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory) {
      result = result.filter((p) => (p.category ?? "Uncategorized") === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.name_en?.toLowerCase().includes(q) ||
        p.name_zh?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

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
              <Input
                placeholder={t("menu.searchMenu")}
                className="pl-9 w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-menu"
              />
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
                    <div
                      className="h-12 w-12 rounded-md bg-muted flex items-center justify-center shrink-0 overflow-hidden cursor-pointer"
                      onClick={() => setDetailItem(item.id)}
                    >
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setDetailItem(item.id)}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium" data-testid={`text-menu-name-${item.id}`}>
                          {getDisplayName(item)}
                        </span>
                        {item.tags?.includes("spicy") && <Flame className="h-3.5 w-3.5 text-red-500" />}
                        {item.tags?.includes("vegetarian") && <Leaf className="h-3.5 w-3.5 text-green-500" />}
                        {item.discount_type && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-red-500/10 text-red-600">
                            {item.discount_type === "percentage" ? `-${item.discount_value}%` : `-${item.discount_value}`}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{item.category ?? "Uncategorized"}</span>
                        {item.unit && (
                          <>
                            <span>·</span>
                            <Clock className="h-3 w-3" />
                            <span>{item.unit}</span>
                          </>
                        )}
                      </div>
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

      {/* Create Menu Item Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("menu.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("menu.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-name">{t("menu.itemName")}</Label>
              <Input id="menu-name" required value={formName} onChange={(e) => setFormName(e.target.value)} data-testid="input-menu-name" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="menu-name-en">{t("menu.nameEn")}</Label>
                <Input id="menu-name-en" value={formNameEn} onChange={(e) => setFormNameEn(e.target.value)} data-testid="input-menu-name-en" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-name-zh">{t("menu.nameZh")}</Label>
                <Input id="menu-name-zh" value={formNameZh} onChange={(e) => setFormNameZh(e.target.value)} data-testid="input-menu-name-zh" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-category">{t("menu.category")}</Label>
              <Input id="menu-category" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} data-testid="input-menu-category" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="menu-price">{t("menu.price")}</Label>
                <Input id="menu-price" type="number" step="0.01" required value={formPrice} onChange={(e) => setFormPrice(e.target.value)} data-testid="input-menu-price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-currency">{t("menu.currency")}</Label>
                <Input id="menu-currency" value={formCurrency} onChange={(e) => setFormCurrency(e.target.value)} data-testid="input-menu-currency" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-image">{t("menu.imageUrl")}</Label>
              <Input id="menu-image" type="url" placeholder="https://..." value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} data-testid="input-menu-image" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-prep-time">{t("menu.prepTime")}</Label>
              <Input id="menu-prep-time" type="number" placeholder="15" value={formPrepTime} onChange={(e) => setFormPrepTime(e.target.value)} data-testid="input-menu-prep-time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-tags">{t("menu.tags")}</Label>
              <Input id="menu-tags" placeholder={t("menu.tagsPlaceholder")} value={formTags} onChange={(e) => setFormTags(e.target.value)} data-testid="input-menu-tags" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Switch checked={formIsSpicy} onCheckedChange={setFormIsSpicy} data-testid="switch-menu-spicy" />
                <Flame className="h-4 w-4 text-red-500" />
                {t("menu.spicy")}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Switch checked={formIsVegetarian} onCheckedChange={setFormIsVegetarian} data-testid="switch-menu-vegetarian" />
                <Leaf className="h-4 w-4 text-green-500" />
                {t("menu.vegetarian")}
              </label>
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

      {/* Menu Item Detail Dialog */}
      <Dialog open={!!detailItem} onOpenChange={(open) => { if (!open) setDetailItem(null); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("menu.itemDetails")}</DialogTitle>
            <DialogDescription className="sr-only">{t("menu.itemDetails")}</DialogDescription>
          </DialogHeader>
          {detailProduct && (
            <div className="space-y-4">
              {detailProduct.image_url && (
                <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                  <img src={detailProduct.image_url} alt={detailProduct.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg">{getDisplayName(detailProduct)}</h3>
                {detailProduct.name_en && detailProduct.name_zh && (
                  <p className="text-sm text-muted-foreground">{detailProduct.name_en} / {detailProduct.name_zh}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{detailProduct.category ?? "Uncategorized"}</Badge>
                {detailProduct.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{formatPrice(detailProduct.currency, detailProduct.price)}</span>
                {detailProduct.unit && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {detailProduct.unit}
                  </span>
                )}
              </div>
              {detailProduct.description && (
                <p className="text-sm text-muted-foreground">{detailProduct.description}</p>
              )}

              {/* Variants / Sizes / Options */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-3">{t("menu.variants")}</h4>
                {detailVariants.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("menu.noVariants")}</p>
                ) : (
                  <div className="space-y-2">
                    {detailVariants.map(v => (
                      <div key={v.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                        <span className="text-sm">{v.name}</span>
                        <span className="text-sm font-medium">{formatPrice(v.currency, String(v.price))}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <Input
                    placeholder={t("menu.variantNamePlaceholder")}
                    value={variantName}
                    onChange={(e) => setVariantName(e.target.value)}
                    className="flex-1"
                    data-testid="input-variant-name"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={t("menu.price")}
                    value={variantPrice}
                    onChange={(e) => setVariantPrice(e.target.value)}
                    className="w-24"
                    data-testid="input-variant-price"
                  />
                  <Button type="button" size="sm" onClick={handleAddVariant} disabled={createVariant.isPending} data-testid="button-add-variant">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
