import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRestaurantTables } from "@/hooks/use-restaurant-tables";

function getStatusColor(status: string): string {
  switch (status) {
    case "available": return "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "occupied": return "bg-red-500/10 dark:bg-red-400/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "reserved": return "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "cleaning": return "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    default: return "";
  }
}

function getCardBorder(status: string): string {
  switch (status) {
    case "available": return "border-emerald-500/30 dark:border-emerald-400/30";
    case "occupied": return "border-red-500/30 dark:border-red-400/30";
    case "reserved": return "border-blue-500/30 dark:border-blue-400/30";
    case "cleaning": return "border-amber-500/30 dark:border-amber-400/30";
    default: return "";
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, zoneIdx) => (
        <div key={zoneIdx}>
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-visible">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                  <Skeleton className="h-3 w-16 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TablesPage() {
  const { t } = useTranslation("app");
  const { data: tables = [], isLoading, error } = useRestaurantTables();

  const zones = Array.from(new Set(tables.map((table) => table.zone)));

  const counts = {
    available: tables.filter((table) => table.status === "available").length,
    occupied: tables.filter((table) => table.status === "occupied").length,
    reserved: tables.filter((table) => table.status === "reserved").length,
    cleaning: tables.filter((table) => table.status === "cleaning").length,
  };

  const statusLabels: Record<string, string> = {
    available: t("tables.available"),
    occupied: t("tables.occupied"),
    reserved: t("tables.reserved"),
    cleaning: t("tables.cleaning"),
  };

  const zoneLabels: Record<string, string> = {
    Indoor: t("tables.zoneIndoor"),
    Outdoor: t("tables.zoneOutdoor"),
    VIP: t("tables.zoneVip"),
  };

  return (
    <AppLayout title={t("tables.title")}>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">{t("tables.available")} ({counts.available})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="text-xs text-muted-foreground">{t("tables.occupied")} ({counts.occupied})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">{t("tables.reserved")} ({counts.reserved})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">{t("tables.cleaning")} ({counts.cleaning})</span>
            </div>
          </div>
          <Button data-testid="button-add-table">
            <Plus className="h-4 w-4 mr-2" />
            {t("tables.addTable")}
          </Button>
        </div>

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400">{t("tables.errorLoading")}</div>
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          zones.map((zone) => (
            <div key={zone}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{zoneLabels[zone] ?? zone}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {tables.filter((table) => table.zone === zone).map((table) => (
                  <Card
                    key={table.id}
                    className={`hover-elevate overflow-visible cursor-pointer ${getCardBorder(table.status)}`}
                    data-testid={`card-table-${table.table_number}`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold" data-testid={`text-table-id-${table.table_number}`}>{table.table_number}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(table.status)}`}>
                          {statusLabels[table.status] ?? table.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{t("tables.seats", { count: table.seats })}</span>
                      </div>
                      {(table.status === "occupied" || table.status === "reserved") && (
                        <div className="text-[11px] text-muted-foreground truncate">
                          {table.guest_name}
                          {table.occupied_since && <span className="block">{t("tables.since", { time: table.occupied_since })}</span>}
                          {table.reserved_time && <span className="block">{t("tables.at", { time: table.reserved_time })}</span>}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}
