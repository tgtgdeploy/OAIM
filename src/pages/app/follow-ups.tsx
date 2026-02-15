import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFollowUps } from "@/hooks/use-follow-ups";

export default function FollowUpsPage() {
  const { t } = useTranslation("app");
  const { data: followUps = [], isLoading } = useFollowUps();

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    pending: { label: t("followUps.statusPending"), color: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: Clock },
    completed: { label: t("followUps.statusCompleted"), color: "bg-green-500/10 text-green-700 dark:text-green-300", icon: CheckCircle2 },
    overdue: { label: t("followUps.statusOverdue"), color: "bg-red-500/10 text-red-700 dark:text-red-300", icon: AlertCircle },
  };

  return (
    <AppLayout title={t("followUps.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{t("followUps.pending", { count: followUps.filter(f => f.status === "pending").length })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>{t("followUps.overdue", { count: followUps.filter(f => f.status === "overdue").length })}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" data-testid="button-calendar-view">
              <Calendar className="h-4 w-4 mr-2" />
              {t("followUps.calendar")}
            </Button>
            <Button data-testid="button-create-followup">
              <Plus className="h-4 w-4 mr-2" />
              {t("followUps.newFollowUp")}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">{t("followUps.tabAll")}</TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">{t("followUps.tabPending")}</TabsTrigger>
            <TabsTrigger value="overdue" data-testid="tab-overdue">{t("followUps.tabOverdue")}</TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">{t("followUps.tabCompleted")}</TabsTrigger>
          </TabsList>

          {["all", "pending", "overdue", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-2 mt-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                followUps
                  .filter(f => tab === "all" || f.status === tab)
                  .map((followUp) => {
                    const status = statusConfig[followUp.status];
                    const contactName = followUp.contact_name ?? followUp.contact_id.slice(0, 8);
                    const scheduledDate = new Date(followUp.scheduled_at).toLocaleString();
                    return (
                      <Card key={followUp.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-followup-${followUp.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-9 w-9 flex-shrink-0">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {contactName.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-sm font-medium">{contactName}</span>
                                <Badge variant="secondary" className={`text-xs ${status.color}`}>
                                  {status.label}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {followUp.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{followUp.message}</p>
                              <div className="flex items-center gap-1 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{scheduledDate}</span>
                              </div>
                            </div>
                            {followUp.status === "pending" && (
                              <Button variant="outline" size="sm" data-testid={`button-send-${followUp.id}`}>
                                {t("followUps.sendNow")}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
