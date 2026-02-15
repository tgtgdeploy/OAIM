import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Copy, Store, UtensilsCrossed, CheckCircle2, GitBranch, Tag, Bot, Repeat } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useIndustryTemplates } from "@/hooks/use-industry-templates";

interface TemplateComponent {
  type: string;
  name: string;
  icon?: string;
  items: string[];
}

const industryConfig: Record<string, { icon: typeof Store; color: string; bgColor: string }> = {
  ecommerce: {
    icon: Store,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
  },
  restaurant: {
    icon: UtensilsCrossed,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 dark:bg-orange-400/10",
  },
};

const compIconMap: Record<string, typeof Bot> = {
  "AI Script": Bot,
  "Pipeline": GitBranch,
  "Tags": Tag,
  "Follow-ups": Repeat,
};

export default function TemplatesPage() {
  const { t } = useTranslation("superadmin");
  const { data: templateList = [], isLoading } = useIndustryTemplates();

  if (isLoading) {
    return (
      <SuperAdminLayout title={t("templates.title")}>
        <div className="admin-content section-spacing flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary animate-pulse" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  const defaultTab = templateList[0]?.key ?? "ecommerce";

  return (
    <SuperAdminLayout title={t("templates.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("templates.industryTemplateManagement")}</p>
          <Button data-testid="button-create-template">
            <Plus className="h-4 w-4 mr-2" />
            {t("templates.newTemplate")}
          </Button>
        </div>

        <Tabs defaultValue={defaultTab}>
          <TabsList>
            {templateList.map((template) => {
              const config = industryConfig[template.industry];
              const TabIcon = config?.icon ?? Store;
              return (
                <TabsTrigger key={template.key} value={template.key} data-testid={`tab-${template.key}`}>
                  <TabIcon className="h-4 w-4 mr-1.5" />{template.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {templateList.map((template) => {
            const config = industryConfig[template.industry] ?? industryConfig.ecommerce;
            const IndustryIcon = config.icon;
            const components = template.components as unknown as TemplateComponent[];
            const formattedDate = new Date(template.updated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <TabsContent key={template.key} value={template.key} className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${config.bgColor}`}>
                          <IndustryIcon className={`h-5 w-5 ${config.color}`} />
                        </div>
                        <div>
                          <h3 className="font-bold">{template.label}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">{template.version}</Badge>
                            <span>{t("templates.updated", { date: formattedDate })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" data-testid={`button-duplicate-${template.key}`}>
                          <Copy className="h-4 w-4 mr-2" />{t("templates.duplicate")}
                        </Button>
                        <Button data-testid={`button-edit-${template.key}`}>
                          <Edit className="h-4 w-4 mr-2" />{t("templates.edit")}
                        </Button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {components.map((comp) => {
                        const CompIcon = compIconMap[comp.type] ?? Bot;
                        return (
                          <Card key={comp.type} data-testid={`card-component-${comp.type.toLowerCase().replace(/\s/g, "-")}`}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <CompIcon className={`h-4 w-4 ${config.color}`} />
                                <div>
                                  <div className="text-sm font-medium">{comp.name}</div>
                                  <div className="text-xs text-muted-foreground">{comp.type}</div>
                                </div>
                              </div>
                              <ul className="space-y-1">
                                {comp.items.map((item) => (
                                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}
