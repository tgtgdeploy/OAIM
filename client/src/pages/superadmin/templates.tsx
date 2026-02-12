import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Copy, Store, UtensilsCrossed, CheckCircle2, GitBranch, Tag, Bot, Repeat } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TemplatesPage() {
  const { t } = useTranslation("superadmin");

  const templates = {
    ecommerce: {
      icon: Store,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
      version: "v2.1",
      updated: "Feb 10, 2026",
      label: t("templates.ecommerceTemplate"),
      components: [
        { type: t("templates.aiScript"), name: t("templates.ecomSalesScript"), icon: Bot, items: t("templates.ecomSalesScriptItems", { returnObjects: true }) as string[] },
        { type: t("templates.pipeline"), name: t("templates.ecomPipeline"), icon: GitBranch, items: t("templates.ecomPipelineItems", { returnObjects: true }) as string[] },
        { type: t("templates.tags"), name: t("templates.ecomTags"), icon: Tag, items: t("templates.ecomTagItems", { returnObjects: true }) as string[] },
        { type: t("templates.followups"), name: t("templates.ecomFollowups"), icon: Repeat, items: t("templates.ecomFollowupItems", { returnObjects: true }) as string[] },
      ],
    },
    restaurant: {
      icon: UtensilsCrossed,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10 dark:bg-orange-400/10",
      version: "v1.8",
      updated: "Feb 8, 2026",
      label: t("templates.restaurantTemplate"),
      components: [
        { type: t("templates.aiScript"), name: t("templates.restAssistant"), icon: Bot, items: t("templates.restAssistantItems", { returnObjects: true }) as string[] },
        { type: t("templates.pipeline"), name: t("templates.restPipeline"), icon: GitBranch, items: t("templates.restPipelineItems", { returnObjects: true }) as string[] },
        { type: t("templates.tags"), name: t("templates.restTags"), icon: Tag, items: t("templates.restTagItems", { returnObjects: true }) as string[] },
        { type: t("templates.followups"), name: t("templates.restFollowups"), icon: Repeat, items: t("templates.restFollowupItems", { returnObjects: true }) as string[] },
      ],
    },
  };

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

        <Tabs defaultValue="ecommerce">
          <TabsList>
            <TabsTrigger value="ecommerce" data-testid="tab-ecommerce">
              <Store className="h-4 w-4 mr-1.5" />{t("templates.ecommerce")}
            </TabsTrigger>
            <TabsTrigger value="restaurant" data-testid="tab-restaurant">
              <UtensilsCrossed className="h-4 w-4 mr-1.5" />{t("templates.restaurant")}
            </TabsTrigger>
          </TabsList>

          {Object.entries(templates).map(([key, template]) => (
            <TabsContent key={key} value={key} className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-md ${template.bgColor}`}>
                        <template.icon className={`h-5 w-5 ${template.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold">{template.label}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">{template.version}</Badge>
                          <span>{t("templates.updated", { date: template.updated })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" data-testid={`button-duplicate-${key}`}>
                        <Copy className="h-4 w-4 mr-2" />{t("templates.duplicate")}
                      </Button>
                      <Button data-testid={`button-edit-${key}`}>
                        <Edit className="h-4 w-4 mr-2" />{t("templates.edit")}
                      </Button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {template.components.map((comp) => (
                      <Card key={comp.type} data-testid={`card-component-${comp.type.toLowerCase().replace(/\s/g, "-")}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <comp.icon className={`h-4 w-4 ${template.color}`} />
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}
