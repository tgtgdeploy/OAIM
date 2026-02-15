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
import { Filter, Truck, Package, MapPin, CheckCircle2 } from "lucide-react";
import { useShipments } from "@/hooks/use-shipments";
import "@/styles/dashboard.css";

export default function ShippingPage() {
  const { t } = useTranslation("app");
  const { data: shipments = [], isLoading } = useShipments();

  const activeShipments = shipments.filter((s) => s.status === "shipped" || s.status === "in_transit").length;
  const pendingPickup = shipments.filter((s) => s.status === "pending").length;
  const destinations = new Set(shipments.map((s) => s.destination).filter(Boolean));
  const deliveredThisMonth = shipments.filter((s) => {
    if (s.status !== "completed") return false;
    const now = new Date();
    const date = new Date(s.shipped_date ?? s.created_at);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  return (
    <AppLayout title={t("shipping.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("shipping.activeShipments")} value={isLoading ? "—" : activeShipments.toString()} icon={Truck} testId="card-stat-active" />
          <StatCard label={t("shipping.pendingPickup")} value={isLoading ? "—" : pendingPickup.toString()} icon={Package} testId="card-stat-pending" />
          <StatCard label={t("shipping.deliveryZones")} value={isLoading ? "—" : destinations.size.toString()} icon={MapPin} testId="card-stat-zones" />
          <StatCard label={t("shipping.deliveredMonth")} value={isLoading ? "—" : deliveredThisMonth.toString()} icon={CheckCircle2} change="+18% vs last month" testId="card-stat-delivered" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("shipping.searchShipments")} testId="input-search-shipments" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-shipments">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button variant="outline" data-testid="button-manage-zones">
              <MapPin className="h-4 w-4 mr-2" />
              {t("shipping.deliveryZones")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("shipping.thShipment")}</TableHead>
                  <TableHead>{t("shipping.thCustomer")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("shipping.thCourier")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("shipping.thTracking")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("shipping.thDestination")}</TableHead>
                  <TableHead>{t("shipping.thStatus")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("shipping.thDate")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  shipments.map((s) => (
                    <TableRow key={s.id} className="cursor-pointer" data-testid={`row-shipment-${s.id}`}>
                      <TableCell className="font-medium text-sm">{s.id.substring(0, 8)}</TableCell>
                      <TableCell className="text-sm">{s.customer_name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{s.courier ?? "—"}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground font-mono text-xs">{s.tracking_number ?? "—"}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{s.destination ?? "—"}</TableCell>
                      <TableCell><StatusBadge status={s.status} /></TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{new Date(s.shipped_date ?? s.created_at).toLocaleDateString()}</TableCell>
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
