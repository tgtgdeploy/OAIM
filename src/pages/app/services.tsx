import { useMemo, useState } from "react";
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
import { Search, Plus, Clock, MoreVertical, GripVertical, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProducts, useUpdateProduct, useCreateProduct } from "@/hooks/use-products";
import { useProductVariants, useCreateProductVariant } from "@/hooks/use-product-variants";
import { useToast } from "@/hooks/use-toast";

export default function ServicesPage() {
  const { t, i18n } = useTranslation("app");
  const { data: services = [], isLoading } = useProducts();
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
  const [formDuration, setFormDuration] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formTags, setFormTags] = useState("");

  // Variant (pricing tier) form
  const [variantName, setVariantName] = useState("");
  const [variantPrice, setVariantPrice] = useState("");
  const [variantDuration, setVariantDuration] = useState("");

  const detailProduct = services.find(p => p.id === detailItem);
  const { data: detailVariants = [] } = useProductVariants(detailItem ?? undefined);

  function resetForm() {
    setFormName(""); setFormNameEn(""); setFormNameZh("");
    setFormCategory(""); setFormPrice(""); setFormCurrency("MYR");
    setFormDuration(""); setFormDescription(""); setFormImageUrl("");
    setFormTags("");
  }

  function handleSubmitService(e: React.FormEvent) {
    e.preventDefault();
    if (!formName || !formPrice) return;
    const tags = formTags.split(",").map(t => t.trim()).filter(Boolean);

    createProduct.mutate(
      {
        tenant_id: "demo",
        name: formName,
        name_en: formNameEn || null,
        name_zh: formNameZh || null,
        category: formCategory || null,
        price: formPrice,
        currency: formCurrency,
        description: formDuration ? `${formDuration} min — ${formDescription || ""}`.trim() : (formDescription || null),
        image_url: formImageUrl || null,
        images: formImageUrl ? [formImageUrl] : [],
        tags,
        unit: formDuration ? `${formDuration} min` : null,
      },
      {
        onSuccess: () => {
          toast({ title: t("services.success") });
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
        attributes: variantDuration ? { duration: `${variantDuration} min` } : {},
      },
      {
        onSuccess: () => {
          toast({ title: t("services.variantAdded") });
          setVariantName(""); setVariantPrice(""); setVariantDuration("");
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
    for (const s of services) {
      const cat = s.category ?? "Uncategorized";
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [services]);

  const filtered = useMemo(() => {
    let result = services;
    if (activeCategory) {
      result = result.filter((s) => (s.category ?? "Uncategorized") === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.name_en?.toLowerCase().includes(q) ||
        s.name_zh?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [services, activeCategory, searchQuery]);

  function handleToggleActive(id: string, currentValue: boolean): void {
    updateProduct.mutate({ id, is_active: !currentValue });
  }

  function formatPrice(currency: string, price: string): string {
    return `${currency} ${parseFloat(price).toLocaleString()}`;
  }

  return (
    <AppLayout title={t("services.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {t("services.countServices", {
              services: services.length,
              categories: categories.length,
            })}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("services.searchServices")}
                className="pl-9 w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-services"
              />
            </div>
            <Button variant="outline" data-testid="button-add-category">
              <Plus className="h-4 w-4 mr-2" />
              {t("services.category")}
            </Button>
            <Button onClick={() => setDialogOpen(true)} data-testid="button-add-service">
              <Plus className="h-4 w-4 mr-2" />
              {t("services.addService")}
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
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-12 w-12 rounded-md shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/5" />
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
              <Card key={item.id} data-testid={`card-service-${item.id}`}>
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
                        <span className="text-sm font-medium" data-testid={`text-service-name-${item.id}`}>
                          {getDisplayName(item)}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {item.category ?? "Uncategorized"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        {item.unit && (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>{item.unit}</span>
                          </>
                        )}
                        {item.description && !item.unit && (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>{item.description}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold shrink-0" data-testid={`text-service-price-${item.id}`}>
                      {formatPrice(item.currency, item.price)}
                    </span>
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() => handleToggleActive(item.id, item.is_active)}
                      data-testid={`switch-service-${item.id}`}
                    />
                    <Button size="icon" variant="ghost" data-testid={`button-service-more-${item.id}`}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Service Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("services.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("services.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitService} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="svc-name">{t("services.serviceName")}</Label>
              <Input id="svc-name" required value={formName} onChange={(e) => setFormName(e.target.value)} data-testid="input-service-name" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="svc-name-en">{t("services.nameEn")}</Label>
                <Input id="svc-name-en" value={formNameEn} onChange={(e) => setFormNameEn(e.target.value)} data-testid="input-service-name-en" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-name-zh">{t("services.nameZh")}</Label>
                <Input id="svc-name-zh" value={formNameZh} onChange={(e) => setFormNameZh(e.target.value)} data-testid="input-service-name-zh" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-category">{t("services.category")}</Label>
              <Input id="svc-category" placeholder={t("services.categoryPlaceholder")} value={formCategory} onChange={(e) => setFormCategory(e.target.value)} data-testid="input-service-category" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="svc-price">{t("services.price")}</Label>
                <Input id="svc-price" type="number" step="0.01" required value={formPrice} onChange={(e) => setFormPrice(e.target.value)} data-testid="input-service-price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-currency">{t("services.currency")}</Label>
                <Input id="svc-currency" value={formCurrency} onChange={(e) => setFormCurrency(e.target.value)} data-testid="input-service-currency" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-duration">{t("services.duration")}</Label>
                <Input id="svc-duration" type="number" placeholder="60" value={formDuration} onChange={(e) => setFormDuration(e.target.value)} data-testid="input-service-duration" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-image">{t("services.imageUrl")}</Label>
              <Input id="svc-image" type="url" placeholder="https://..." value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} data-testid="input-service-image" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-tags">{t("services.tags")}</Label>
              <Input id="svc-tags" placeholder={t("services.tagsPlaceholder")} value={formTags} onChange={(e) => setFormTags(e.target.value)} data-testid="input-service-tags" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-description">{t("services.description")}</Label>
              <Textarea id="svc-description" placeholder={t("services.descriptionPlaceholder")} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} data-testid="input-service-description" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createProduct.isPending} data-testid="button-submit-service">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Service Detail Dialog */}
      <Dialog open={!!detailItem} onOpenChange={(open) => { if (!open) setDetailItem(null); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("services.serviceDetails")}</DialogTitle>
            <DialogDescription className="sr-only">{t("services.serviceDetails")}</DialogDescription>
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

              {/* Pricing Tiers / Variants */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-3">{t("services.pricingTiers")}</h4>
                {detailVariants.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("services.noTiers")}</p>
                ) : (
                  <div className="space-y-2">
                    {detailVariants.map(v => (
                      <div key={v.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                        <div>
                          <span className="text-sm font-medium">{v.name}</span>
                          {v.attributes && typeof v.attributes === "object" && "duration" in v.attributes && (
                            <span className="text-xs text-muted-foreground ml-2">({String(v.attributes.duration)})</span>
                          )}
                        </div>
                        <span className="text-sm font-bold">{formatPrice(v.currency, String(v.price))}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <Input
                    placeholder={t("services.tierName")}
                    value={variantName}
                    onChange={(e) => setVariantName(e.target.value)}
                    className="flex-1"
                    data-testid="input-tier-name"
                  />
                  <Input
                    type="number"
                    placeholder={t("services.tierDuration")}
                    value={variantDuration}
                    onChange={(e) => setVariantDuration(e.target.value)}
                    className="w-20"
                    data-testid="input-tier-duration"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={t("services.price")}
                    value={variantPrice}
                    onChange={(e) => setVariantPrice(e.target.value)}
                    className="w-24"
                    data-testid="input-tier-price"
                  />
                  <Button type="button" size="sm" onClick={handleAddVariant} disabled={createVariant.isPending} data-testid="button-add-tier">
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
