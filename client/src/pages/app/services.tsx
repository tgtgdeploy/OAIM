import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Clock, MoreVertical, GripVertical } from "lucide-react";

const serviceCategories = [
  { id: "1", name: "Facial", count: 4 },
  { id: "2", name: "Massage", count: 3 },
  { id: "3", name: "Hair", count: 5 },
  { id: "4", name: "Nails", count: 4 },
  { id: "5", name: "Spa Packages", count: 3 },
];

const serviceItems = [
  { id: "1", name: "Basic Facial", category: "Facial", price: "RM 80", duration: "45 min", active: true },
  { id: "2", name: "Anti-Aging Facial", category: "Facial", price: "RM 180", duration: "60 min", active: true },
  { id: "3", name: "Hydrating Facial", category: "Facial", price: "RM 120", duration: "60 min", active: true },
  { id: "4", name: "Full Body Massage", category: "Massage", price: "RM 150", duration: "90 min", active: true },
  { id: "5", name: "Aromatherapy Massage", category: "Massage", price: "RM 200", duration: "90 min", active: true },
  { id: "6", name: "Scalp Massage", category: "Massage", price: "RM 60", duration: "30 min", active: true },
  { id: "7", name: "Haircut & Blowdry", category: "Hair", price: "RM 60", duration: "45 min", active: true },
  { id: "8", name: "Hair Coloring", category: "Hair", price: "RM 180", duration: "120 min", active: true },
  { id: "9", name: "Gel Manicure", category: "Nails", price: "RM 55", duration: "45 min", active: true },
  { id: "10", name: "Spa Day Package", category: "Spa Packages", price: "RM 399", duration: "240 min", active: false },
];

export default function ServicesPage() {
  return (
    <AppLayout title="Service Catalog">
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{serviceItems.length} services in {serviceCategories.length} categories</p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search services..." className="pl-9 w-56" data-testid="input-search-services" />
            </div>
            <Button variant="outline" data-testid="button-add-category">
              <Plus className="h-4 w-4 mr-2" />
              Category
            </Button>
            <Button data-testid="button-add-service">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {serviceCategories.map((cat) => (
            <Button key={cat.id} size="sm" variant="outline" data-testid={`filter-category-${cat.id}`}>
              {cat.name}
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{cat.count}</Badge>
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          {serviceItems.map((item) => (
            <Card key={item.id} data-testid={`card-service-${item.id}`}>
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0 cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium" data-testid={`text-service-name-${item.id}`}>{item.name}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">{item.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold shrink-0" data-testid={`text-service-price-${item.id}`}>{item.price}</span>
                  <Switch checked={item.active} data-testid={`switch-service-${item.id}`} />
                  <Button size="icon" variant="ghost" data-testid={`button-service-more-${item.id}`}>
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
