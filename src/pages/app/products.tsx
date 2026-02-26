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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Upload, Package, Grid3X3, List, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts, useCreateProduct } from "@/hooks/use-products";
import { useProductVariants, useCreateProductVariant, useDeleteProductVariant } from "@/hooks/use-product-variants";
import { useToast } from "@/hooks/use-toast";
import type { Row } from "@/lib/database.types";

type Product = Row<"products">;

export default function ProductsPage() {
  const { t, i18n } = useTranslation("app");
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const { toast } = useToast();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Create product dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameZh, setNameZh] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("MYR");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [productTags, setProductTags] = useState("");
  const [images, setImages] = useState("");
  const [discountType, setDiscountType] = useState<string>("none");
  const [discountValue, setDiscountValue] = useState("");
  const [description, setDescription] = useState("");

  // Detail dialog
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Variant form
  const [variantName, setVariantName] = useState("");
  const [variantPrice, setVariantPrice] = useState("");
  const [variantStock, setVariantStock] = useState("");
  const [variantSku, setVariantSku] = useState("");
  const [variantAttrs, setVariantAttrs] = useState("");

  const { data: variants = [] } = useProductVariants(detailProduct?.id);
  const createVariant = useCreateProductVariant();
  const deleteVariant = useDeleteProductVariant();

  const resetForm = () => {
    setName(""); setNameEn(""); setNameZh(""); setCategory("");
    setPrice(""); setCurrency("MYR"); setStock(""); setSku("");
    setBrand(""); setProductTags(""); setImages("");
    setDiscountType("none"); setDiscountValue(""); setDescription("");
  };

  const resetVariantForm = () => {
    setVariantName(""); setVariantPrice(""); setVariantStock("");
    setVariantSku(""); setVariantAttrs("");
  };

  const handleSubmit = () => {
    if (!name || !price) return;
    const tagArr = productTags.split(",").map(t => t.trim()).filter(Boolean);
    const imageArr = images.split("\n").map(u => u.trim()).filter(Boolean);
    createProduct.mutate(
      {
        tenant_id: "demo",
        name,
        name_en: nameEn || null,
        name_zh: nameZh || null,
        category: category || null,
        price,
        currency,
        stock: stock ? parseInt(stock, 10) : null,
        sku: sku || null,
        brand: brand || null,
        tags: tagArr,
        images: imageArr,
        discount_type: discountType !== "none" ? (discountType as "percentage" | "fixed") : null,
        discount_value: discountValue ? parseFloat(discountValue) : null,
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

  const handleAddVariant = () => {
    if (!detailProduct || !variantName) return;
    let attrs: Record<string, unknown> = {};
    try { if (variantAttrs) attrs = JSON.parse(variantAttrs); } catch { /* ignore */ }
    createVariant.mutate(
      {
        product_id: detailProduct.id,
        tenant_id: detailProduct.tenant_id,
        name: variantName,
        price: variantPrice ? parseFloat(variantPrice) : 0,
        stock: variantStock ? parseInt(variantStock, 10) : 0,
        sku: variantSku || null,
        attributes: attrs,
      },
      {
        onSuccess: () => {
          toast({ title: t("products.saveVariant") });
          resetVariantForm();
        },
      }
    );
  };

  const getDisplayName = (product: Product) => {
    if (i18n.language === "zh" && product.name_zh) return product.name_zh;
    if (i18n.language === "en" && product.name_en) return product.name_en;
    return product.name;
  };

  const getDiscountBadge = (product: Product) => {
    if (!product.discount_type || !product.discount_value) return null;
    if (product.discount_type === "percentage") {
      return <Badge variant="destructive" className="text-xs">{t("products.discountBadge", { value: product.discount_value })}</Badge>;
    }
    return <Badge variant="destructive" className="text-xs">{t("products.discountFixedBadge", { value: product.discount_value })}</Badge>;
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.name_en?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.name_zh?.includes(searchQuery)) ||
    (p.sku?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AppLayout title={t("products.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("products.countProducts", { count: products.length })}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("products.searchProducts")}
                className="pl-9 w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-products"
              />
            </div>
            <div className="flex border rounded-md">
              <Button size="icon" variant={view === "grid" ? "secondary" : "ghost"} onClick={() => setView("grid")} data-testid="button-view-grid">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant={view === "list" ? "secondary" : "ghost"} onClick={() => setView("list")} data-testid="button-view-list">
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
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => {
              const stockVal = product.stock ?? 0;
              const formattedPrice = `${product.currency} ${parseFloat(product.price).toLocaleString()}`;
              const displayName = getDisplayName(product);
              const discount = getDiscountBadge(product);
              return (
                <Card
                  key={product.id}
                  className="hover-elevate overflow-visible cursor-pointer"
                  data-testid={`card-product-${product.id}`}
                  onClick={() => { setDetailProduct(product); setDetailOpen(true); }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted rounded-t-md flex items-center justify-center relative">
                      <Package className="h-12 w-12 text-muted-foreground/20" />
                      {discount && <div className="absolute top-2 right-2">{discount}</div>}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-medium">{displayName}</h3>
                          <p className="text-xs text-muted-foreground">{product.category ?? "—"}</p>
                          {product.sku && <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>}
                        </div>
                        <Switch checked={product.is_active} onClick={(e) => e.stopPropagation()} data-testid={`switch-product-${product.id}`} />
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-3">
                        <span className="text-sm font-bold">{formattedPrice}</span>
                        <Badge variant={stockVal > 0 ? "secondary" : "destructive"} className="text-xs">
                          {stockVal > 0 ? t("products.inStock", { count: stockVal }) : t("products.outOfStock")}
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
                {filtered.map((product) => {
                  const stockVal = product.stock ?? 0;
                  const formattedPrice = `${product.currency} ${parseFloat(product.price).toLocaleString()}`;
                  const displayName = getDisplayName(product);
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 cursor-pointer hover-elevate"
                      data-testid={`row-product-${product.id}`}
                      onClick={() => { setDetailProduct(product); setDetailOpen(true); }}
                    >
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-muted-foreground/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{displayName}</div>
                        <div className="text-xs text-muted-foreground">{product.category ?? "—"}{product.sku ? ` · ${product.sku}` : ""}</div>
                      </div>
                      <div className="text-sm font-bold">{formattedPrice}</div>
                      {getDiscountBadge(product)}
                      <Badge variant={stockVal > 0 ? "secondary" : "destructive"} className="text-xs">
                        {stockVal > 0 ? `${stockVal}` : t("products.oos")}
                      </Badge>
                      <Switch checked={product.is_active} onClick={(e) => e.stopPropagation()} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Product Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("products.dialogTitle")}</DialogTitle>
              <DialogDescription className="sr-only">{t("products.dialogTitle")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>{t("products.name")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required data-testid="input-product-name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("products.nameEn")}</Label>
                  <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} data-testid="input-product-name-en" />
                </div>
                <div className="space-y-2">
                  <Label>{t("products.nameZh")}</Label>
                  <Input value={nameZh} onChange={(e) => setNameZh(e.target.value)} data-testid="input-product-name-zh" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("products.sku")}</Label>
                  <Input value={sku} onChange={(e) => setSku(e.target.value)} data-testid="input-product-sku" />
                </div>
                <div className="space-y-2">
                  <Label>{t("products.brand")}</Label>
                  <Input value={brand} onChange={(e) => setBrand(e.target.value)} data-testid="input-product-brand" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("products.category")}</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} data-testid="input-product-category" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("products.price")}</Label>
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required data-testid="input-product-price" />
                </div>
                <div className="space-y-2">
                  <Label>{t("products.currency")}</Label>
                  <Input value={currency} onChange={(e) => setCurrency(e.target.value)} data-testid="input-product-currency" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("products.stock")}</Label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} data-testid="input-product-stock" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("products.discountType")}</Label>
                  <Select value={discountType} onValueChange={setDiscountType}>
                    <SelectTrigger data-testid="select-discount-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t("products.discountNone")}</SelectItem>
                      <SelectItem value="percentage">{t("products.discountPercentage")}</SelectItem>
                      <SelectItem value="fixed">{t("products.discountFixed")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {discountType !== "none" && (
                  <div className="space-y-2">
                    <Label>{t("products.discountValue")}</Label>
                    <Input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} data-testid="input-discount-value" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("products.tags")}</Label>
                <Input value={productTags} onChange={(e) => setProductTags(e.target.value)} placeholder={t("products.tagsPlaceholder")} data-testid="input-product-tags" />
              </div>
              <div className="space-y-2">
                <Label>{t("products.images")}</Label>
                <Textarea value={images} onChange={(e) => setImages(e.target.value)} placeholder={t("products.imagesPlaceholder")} rows={3} data-testid="input-product-images" />
              </div>
              <div className="space-y-2">
                <Label>{t("products.description")}</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("products.descriptionPlaceholder")} data-testid="input-product-description" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={!name || !price || createProduct.isPending} data-testid="button-submit-product">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Product Detail + Variant Management Dialog */}
        <Dialog open={detailOpen} onOpenChange={(open) => { setDetailOpen(open); if (!open) { setDetailProduct(null); resetVariantForm(); } }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("products.productDetails")}</DialogTitle>
              <DialogDescription className="sr-only">{t("products.productDetails")}</DialogDescription>
            </DialogHeader>
            {detailProduct && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">{t("products.name")}:</span> {detailProduct.name}</div>
                  {detailProduct.name_en && <div><span className="text-muted-foreground">{t("products.nameEn")}:</span> {detailProduct.name_en}</div>}
                  {detailProduct.name_zh && <div><span className="text-muted-foreground">{t("products.nameZh")}:</span> {detailProduct.name_zh}</div>}
                  <div><span className="text-muted-foreground">{t("products.price")}:</span> {detailProduct.currency} {parseFloat(detailProduct.price).toLocaleString()}</div>
                  {detailProduct.sku && <div><span className="text-muted-foreground">{t("products.sku")}:</span> {detailProduct.sku}</div>}
                  {detailProduct.brand && <div><span className="text-muted-foreground">{t("products.brand")}:</span> {detailProduct.brand}</div>}
                  <div><span className="text-muted-foreground">{t("products.stock")}:</span> {detailProduct.stock ?? 0}</div>
                  <div><span className="text-muted-foreground">{t("products.category")}:</span> {detailProduct.category ?? "—"}</div>
                  {detailProduct.discount_type && (
                    <div><span className="text-muted-foreground">{t("products.discountType")}:</span> {detailProduct.discount_type} ({detailProduct.discount_value})</div>
                  )}
                </div>
                {detailProduct.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {detailProduct.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                  </div>
                )}

                {/* Variants Section */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">{t("products.variants")}</h4>
                  {variants.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("products.noVariants")}</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("products.variantName")}</TableHead>
                          <TableHead>{t("products.variantSku")}</TableHead>
                          <TableHead className="text-right">{t("products.variantPrice")}</TableHead>
                          <TableHead className="text-right">{t("products.variantStock")}</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variants.map((v) => (
                          <TableRow key={v.id}>
                            <TableCell className="text-sm">{v.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground font-mono">{v.sku ?? "—"}</TableCell>
                            <TableCell className="text-sm text-right">{v.currency} {v.price.toLocaleString()}</TableCell>
                            <TableCell className="text-sm text-right">{v.stock}</TableCell>
                            <TableCell>
                              <Button size="icon" variant="ghost" onClick={() => deleteVariant.mutate({ id: v.id, productId: detailProduct.id })}>
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  <div className="mt-4 p-3 border rounded-md space-y-3">
                    <h5 className="text-sm font-medium">{t("products.addVariant")}</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder={t("products.variantName")} value={variantName} onChange={(e) => setVariantName(e.target.value)} />
                      <Input placeholder={t("products.variantSku")} value={variantSku} onChange={(e) => setVariantSku(e.target.value)} />
                      <Input type="number" placeholder={t("products.variantPrice")} value={variantPrice} onChange={(e) => setVariantPrice(e.target.value)} />
                      <Input type="number" placeholder={t("products.variantStock")} value={variantStock} onChange={(e) => setVariantStock(e.target.value)} />
                    </div>
                    <Input placeholder={t("products.variantAttributesPlaceholder")} value={variantAttrs} onChange={(e) => setVariantAttrs(e.target.value)} />
                    <Button size="sm" onClick={handleAddVariant} disabled={!variantName || createVariant.isPending}>
                      {t("products.saveVariant")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
