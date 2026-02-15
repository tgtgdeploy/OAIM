import { useMemo } from "react";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Clock, MoreVertical, GripVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProducts, useUpdateProduct } from "@/hooks/use-products";

export default function ServicesPage() {
  const { t } = useTranslation("app");
  const { data: services = [], isLoading } = useProducts();
  const updateProduct = useUpdateProduct();

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of services) {
      const cat = s.category ?? "Uncategorized";
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [services]);

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
                data-testid="input-search-services"
              />
            </div>
            <Button variant="outline" data-testid="button-add-category">
              <Plus className="h-4 w-4 mr-2" />
              {t("services.category")}
            </Button>
            <Button data-testid="button-add-service">
              <Plus className="h-4 w-4 mr-2" />
              {t("services.addService")}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              size="sm"
              variant="outline"
              data-testid={`filter-category-${cat.name}`}
            >
              {cat.name}
              <Badge
                variant="secondary"
                className="ml-1.5 text-[10px] px-1.5 py-0"
              >
                {cat.count}
              </Badge>
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
            {services.map((item) => (
              <Card key={item.id} data-testid={`card-service-${item.id}`}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0 cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-sm font-medium"
                          data-testid={`text-service-name-${item.id}`}
                        >
                          {item.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {item.category ?? "Uncategorized"}
                        </Badge>
                      </div>
                      {item.description && (
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{item.description}</span>
                        </div>
                      )}
                    </div>
                    <span
                      className="text-sm font-bold shrink-0"
                      data-testid={`text-service-price-${item.id}`}
                    >
                      {formatPrice(item.currency, item.price)}
                    </span>
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() =>
                        handleToggleActive(item.id, item.is_active)
                      }
                      data-testid={`switch-service-${item.id}`}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      data-testid={`button-service-more-${item.id}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
