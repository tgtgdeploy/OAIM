import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Store, UtensilsCrossed, Eye, Edit, Trash2, Image } from "lucide-react";

const cases = [
  { id: "1", title: "Fashion Wholesale Supplier", industry: "ecommerce", published: true, screenshots: 4, metrics: 4, date: "2026-02-05" },
  { id: "2", title: "Electronics Retailer", industry: "ecommerce", published: true, screenshots: 3, metrics: 4, date: "2026-01-28" },
  { id: "3", title: "Local Restaurant Chain", industry: "restaurant", published: true, screenshots: 5, metrics: 4, date: "2026-01-20" },
  { id: "4", title: "Premium Cafe & Bistro", industry: "restaurant", published: true, screenshots: 3, metrics: 4, date: "2026-01-15" },
  { id: "5", title: "Organic Health Store", industry: "ecommerce", published: false, screenshots: 2, metrics: 2, date: "2026-02-10" },
];

export default function CaseLibraryPage() {
  return (
    <SuperAdminLayout title="Case Library">
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search cases..." className="pl-9 w-64" data-testid="input-search-cases" />
          </div>
          <Button data-testid="button-add-case">
            <Plus className="h-4 w-4 mr-2" />
            Add Case Study
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c) => (
            <Card key={c.id} className="hover-elevate overflow-visible" data-testid={`card-case-${c.id}`}>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-md flex items-center justify-center">
                  <Image className="h-10 w-10 text-muted-foreground/20" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {c.industry === "ecommerce" ? (
                        <><Store className="h-3 w-3 mr-1" />Ecom</>
                      ) : (
                        <><UtensilsCrossed className="h-3 w-3 mr-1" />Restaurant</>
                      )}
                    </Badge>
                    <Badge variant={c.published ? "default" : "secondary"} className="text-xs">
                      {c.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {c.screenshots} screenshots, {c.metrics} metrics
                  </p>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" data-testid={`button-view-${c.id}`}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" data-testid={`button-edit-${c.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" data-testid={`button-delete-${c.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
