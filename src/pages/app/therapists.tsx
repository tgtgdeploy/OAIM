import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Star, Clock, CalendarCheck, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStaff } from "@/hooks/use-staff";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TherapistsPage() {
  const { t } = useTranslation("app");
  const { data: staff = [], isLoading, error } = useStaff();

  function getStatusBadge(status: string) {
    switch (status) {
      case "available": return <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{t("therapists.statusAvailable")}</Badge>;
      case "busy": return <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">{t("therapists.statusInSession")}</Badge>;
      case "off": return <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">{t("therapists.statusDayOff")}</Badge>;
      default: return null;
    }
  }

  if (isLoading) {
    return (
      <AppLayout title={t("therapists.title")}>
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-36" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title={t("therapists.title")}>
        <div className="p-4 md:p-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{t("common.errorLoading")}</p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={t("therapists.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("therapists.countTherapists", { count: staff.length })}</p>
          <Button data-testid="button-add-therapist">
            <Plus className="h-4 w-4 mr-2" />
            {t("therapists.addTherapist")}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((therapist) => (
            <Card key={therapist.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-therapist-${therapist.id}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12" data-testid={`avatar-therapist-${therapist.id}`}>
                    <AvatarFallback className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium">{getInitials(therapist.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm" data-testid={`text-therapist-name-${therapist.id}`}>{therapist.name}</h3>
                      {getStatusBadge(therapist.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{therapist.role ?? ""}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {therapist.specialties.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0">{s}</Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span className="text-sm font-bold">{therapist.rating ?? "—"}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{t("therapists.rating")}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <CalendarCheck className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-bold">{therapist.today_bookings}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{t("therapists.today")}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-bold">{therapist.weekly_hours}h</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{t("therapists.thisWeek")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
