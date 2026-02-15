import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchInput } from "@/components/shared/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Filter, Bike, Package, Clock, CheckCircle2 } from "lucide-react";
import { useDeliveries } from "@/hooks/use-deliveries";
import "@/styles/dashboard.css";

export default function DeliveryPage() {
  const { t } = useTranslation("app");
  const { data: deliveries = [], isLoading } = useDeliveries();

  const activeDeliveries = deliveries.filter((d) => d.status === "delivering").length;
  const pendingPickup = deliveries.filter((d) => d.status === "pending").length;
  const completed = deliveries.filter((d) => d.status === "completed").length;

  return (
    <AppLayout title={t("delivery.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("delivery.activeDeliveries")} value={isLoading ? "—" : activeDeliveries.toString()} icon={Bike} testId="card-stat-active" />
          <StatCard label={t("delivery.pendingPickup")} value={isLoading ? "—" : pendingPickup.toString()} icon={Package} testId="card-stat-pickup" />
          <StatCard label={t("delivery.avgDeliveryTime")} value={isLoading ? "—" : "22 min"} icon={Clock} testId="card-stat-avg-time" />
          <StatCard label={t("delivery.completedToday")} value={isLoading ? "—" : completed.toString()} icon={CheckCircle2} change="+30% vs yesterday" testId="card-stat-completed" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("delivery.searchDeliveries")} testId="input-search-deliveries" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-deliveries">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button data-testid="button-new-delivery">
              <Plus className="h-4 w-4 mr-2" />
              {t("delivery.newDelivery")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("delivery.thId")}</TableHead>
                  <TableHead>{t("delivery.thCustomer")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("delivery.thAddress")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("delivery.thRider")}</TableHead>
                  <TableHead>{t("delivery.thStatus")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("delivery.thEta")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  deliveries.map((del) => (
                    <TableRow key={del.id} className="cursor-pointer" data-testid={`row-delivery-${del.id}`}>
                      <TableCell className="font-medium text-sm">{del.id.substring(0, 8)}</TableCell>
                      <TableCell className="text-sm">{del.customer_name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-48 truncate">{del.address ?? "-"}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{del.rider ?? "-"}</TableCell>
                      <TableCell><StatusBadge status={del.status} /></TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{del.eta ?? "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
