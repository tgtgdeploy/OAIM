import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchInput } from "@/components/shared/search-input";
import { Plus, Palette, FileText, Image, Globe, Eye, Edit, Copy, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const landingPages = [
  { id: "1", name: "Summer Sale 2026", status: "published", visits: 1240, conversions: 89, template: "ecommerce", updated: "Feb 10" },
  { id: "2", name: "New Menu Launch", status: "published", visits: 560, conversions: 34, template: "restaurant", updated: "Feb 8" },
  { id: "3", name: "Valentine Promo", status: "draft", visits: 0, conversions: 0, template: "ecommerce", updated: "Feb 11" },
  { id: "4", name: "Year-End Clearance", status: "archived", visits: 3200, conversions: 210, template: "ecommerce", updated: "Jan 15" },
];

const designAssets = [
  { id: "1", name: "Product Banner Template", type: "banner", format: "1200x628", uses: 12 },
  { id: "2", name: "WhatsApp Catalog Card", type: "card", format: "800x800", uses: 8 },
  { id: "3", name: "Story Ad Template", type: "story", format: "1080x1920", uses: 5 },
  { id: "4", name: "Menu Display", type: "menu", format: "A4", uses: 3 },
];

export default function DesignPage() {
  const { t } = useTranslation("superadmin");

  return (
    <SuperAdminLayout title={t("design.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <Tabs defaultValue="pages">
          <TabsList>
            <TabsTrigger value="pages" data-testid="tab-pages">
              <Globe className="h-4 w-4 mr-1.5" />{t("design.tabPages")}
            </TabsTrigger>
            <TabsTrigger value="assets" data-testid="tab-assets">
              <Palette className="h-4 w-4 mr-1.5" />{t("design.tabAssets")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-4 mt-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <SearchInput placeholder={t("design.searchPlaceholder")} testId="input-search-pages" />
              <Button data-testid="button-create-page">
                <Plus className="h-4 w-4 mr-2" />{t("design.newPage")}
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {landingPages.map((page) => (
                <Card key={page.id} className="hover-elevate overflow-visible" data-testid={`card-page-${page.id}`}>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-md flex items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground/20" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant={page.status === "published" ? "default" : page.status === "draft" ? "secondary" : "outline"} className="text-xs capitalize">
                          {page.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{page.template}</Badge>
                      </div>
                      <h3 className="text-sm font-semibold mb-1">{page.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span>{t("design.visits", { count: page.visits.toLocaleString() })}</span>
                        <span>{t("design.conversions", { count: page.conversions })}</span>
                        <span>{t("design.updated", { date: page.updated })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="ghost" data-testid={`button-preview-${page.id}`}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" data-testid={`button-edit-page-${page.id}`}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" data-testid={`button-duplicate-page-${page.id}`}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4 mt-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground">{t("design.designTemplates", { count: designAssets.length })}</p>
              <Button data-testid="button-upload-asset">
                <Plus className="h-4 w-4 mr-2" />{t("design.uploadAsset")}
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {designAssets.map((asset) => (
                <Card key={asset.id} className="hover-elevate overflow-visible" data-testid={`card-asset-${asset.id}`}>
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted rounded-t-md flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium mb-1">{asset.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{asset.type}</Badge>
                        <span>{asset.format}</span>
                        <span>{t("design.uses", { count: asset.uses })}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}
