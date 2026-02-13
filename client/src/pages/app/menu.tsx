import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  ChefHat,
  GripVertical,
  Image,
  MoreVertical,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const categories = [
  { id: "1", name: "Rice & Noodles", count: 8, active: true },
  { id: "2", name: "Grilled & BBQ", count: 5, active: true },
  { id: "3", name: "Soups", count: 4, active: true },
  { id: "4", name: "Appetizers", count: 6, active: true },
  { id: "5", name: "Beverages", count: 10, active: true },
  { id: "6", name: "Desserts", count: 3, active: false },
];

const menuItems = [
  { id: "1", name: "Nasi Lemak Special", category: "Rice & Noodles", price: "RM 15.90", available: true, popular: true },
  { id: "2", name: "Grilled Salmon Set", category: "Grilled & BBQ", price: "RM 38.00", available: true, popular: false },
  { id: "3", name: "Tom Yum Seafood", category: "Soups", price: "RM 22.00", available: true, popular: true },
  { id: "4", name: "Satay Ayam (10 pcs)", category: "Appetizers", price: "RM 12.00", available: true, popular: true },
  { id: "5", name: "Char Kway Teow", category: "Rice & Noodles", price: "RM 13.00", available: true, popular: false },
  { id: "6", name: "Teh Tarik", category: "Beverages", price: "RM 4.50", available: true, popular: false },
  { id: "7", name: "Mee Goreng Mamak", category: "Rice & Noodles", price: "RM 11.00", available: false, popular: false },
  { id: "8", name: "Cendol", category: "Desserts", price: "RM 6.00", available: true, popular: false },
];

export default function MenuPage() {
  const { t } = useTranslation("app");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filtered = activeCategory
    ? menuItems.filter((m) => m.category === activeCategory)
    : menuItems;

  return (
    <AppLayout title={t("menu.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("menu.itemsAcross", { items: menuItems.length, categories: categories.length })}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("menu.searchMenu")} className="pl-9 w-56" data-testid="input-search-menu" />
            </div>
            <Button variant="outline" data-testid="button-add-category">
              <Plus className="h-4 w-4 mr-2" />
              {t("menu.category")}
            </Button>
            <Button data-testid="button-add-item">
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
              key={cat.id}
              size="sm"
              variant={activeCategory === cat.name ? "secondary" : "outline"}
              onClick={() => setActiveCategory(cat.name)}
              data-testid={`filter-category-${cat.id}`}
            >
              {cat.name}
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{cat.count}</Badge>
            </Button>
          ))}
        </div>

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
                      {item.popular && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-0.5">
                          <Flame className="h-2.5 w-2.5" />
                          {t("menu.popular")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <span className="text-sm font-bold shrink-0" data-testid={`text-menu-price-${item.id}`}>{item.price}</span>
                  <Switch checked={item.available} data-testid={`switch-menu-${item.id}`} />
                  <Button size="icon" variant="ghost" data-testid={`button-menu-more-${item.id}`}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
