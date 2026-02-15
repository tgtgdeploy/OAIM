import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { useContacts } from "@/hooks/use-contacts";

function formatRelativeTime(isoDate: string): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  return `${diffDays}d ago`;
}

export default function PipelinePage() {
  const { t } = useTranslation("app");
  const { data: contacts = [], isLoading } = useContacts();

  const stageOrder = ["new_inquiry", "quoted", "follow_up", "closed_won"] as const;
  const stageColorMap: Record<string, string> = {
    new_inquiry: "bg-blue-500",
    quoted: "bg-yellow-500",
    follow_up: "bg-orange-500",
    closed_won: "bg-green-500",
  };

  const stagesData = stageOrder.map(stageId => ({
    id: stageId,
    color: stageColorMap[stageId],
    deals: contacts.filter(c => c.stage === stageId).map(c => ({
      id: c.id,
      name: c.name,
      value: "—",
      product: c.tags.join(", ") || "—",
      time: formatRelativeTime(c.created_at),
    })),
  }));

  const totalDeals = contacts.length;
  const totalValue = "—";

  const stageTitles: Record<string, string> = {
    new_inquiry: t("pipeline.stageNewInquiry"),
    quoted: t("pipeline.stageQuoted"),
    follow_up: t("pipeline.stageFollowUp"),
    closed_won: t("pipeline.stageClosedWon"),
  };

  const stages = stagesData.map((s) => ({
    ...s,
    title: stageTitles[s.id] || s.id,
  }));

  return (
    <AppLayout title={t("pipeline.title")}>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">{t("pipeline.activeDeals", { count: totalDeals })}</div>
            </div>
            <Badge variant="secondary" className="text-sm">{t("pipeline.pipelineValue", { value: totalValue })}</Badge>
          </div>
          <Button data-testid="button-add-deal">
            <Plus className="h-4 w-4 mr-2" />
            {t("pipeline.addDeal")}
          </Button>
        </div>

        {isLoading ? (
          <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
            <div className="flex gap-4 min-w-max pb-4">
              {stageOrder.map((stageId) => (
                <div key={stageId} className="w-72 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-8 ml-auto" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <Skeleton className="h-7 w-7 rounded-full flex-shrink-0" />
                            <div className="flex-1 min-w-0 space-y-2">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-3 w-2/3" />
                              <Skeleton className="h-3 w-1/3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
            <div className="flex gap-4 min-w-max pb-4">
              {stages.map((stage) => (
                <div key={stage.id} className="w-72 flex-shrink-0" data-testid={`pipeline-stage-${stage.id}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                    <h3 className="text-sm font-semibold">{stage.title}</h3>
                    <Badge variant="secondary" className="text-xs ml-auto">{stage.deals.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {stage.deals.map((deal) => (
                      <Card key={deal.id} className="cursor-pointer hover-elevate overflow-visible" data-testid={`card-deal-${deal.id}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-7 w-7 flex-shrink-0 mt-0.5">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {deal.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium truncate">{deal.name}</span>
                                <span className="text-sm font-bold text-primary whitespace-nowrap">{deal.value}</span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{deal.product}</p>
                              <p className="text-xs text-muted-foreground mt-1">{deal.time}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="ghost" className="w-full border border-dashed text-muted-foreground" data-testid={`button-add-deal-${stage.id}`}>
                      <Plus className="h-4 w-4 mr-1" /> {t("common.add")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
