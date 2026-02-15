import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchInput } from "@/components/shared/search-input";
import { Plus, Filter, CalendarDays, Users, Clock, CheckCircle2 } from "lucide-react";
import { useReservations } from "@/hooks/use-reservations";
import "@/styles/dashboard.css";

export default function ReservationsPage() {
  const { t } = useTranslation("app");
  const { data: reservations = [], isLoading } = useReservations();

  const today = new Date().toISOString().slice(0, 10);
  const todaysBookings = reservations.filter((r) => r.date === today);
  const totalGuestsToday = todaysBookings.reduce((sum, r) => sum + r.pax, 0);
  const pending = reservations.filter((r) => r.status === "pending").length;

  return (
    <AppLayout title={t("reservations.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("reservations.todaysBookings")} value={isLoading ? "—" : todaysBookings.length.toString()} icon={CalendarDays} testId="card-stat-today" />
          <StatCard label={t("reservations.totalGuestsToday")} value={isLoading ? "—" : totalGuestsToday.toString()} icon={Users} testId="card-stat-guests" />
          <StatCard label={t("reservations.pending")} value={isLoading ? "—" : pending.toString()} icon={Clock} testId="card-stat-pending" />
          <StatCard label={t("reservations.thisWeek")} value={isLoading ? "—" : reservations.length.toString()} icon={CheckCircle2} change="+25% vs last week" testId="card-stat-week" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("reservations.searchReservations")} testId="input-search-reservations" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-reservations">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button data-testid="button-add-reservation">
              <Plus className="h-4 w-4 mr-2" />
              {t("reservations.addBooking")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("reservations.thId")}</TableHead>
                  <TableHead>{t("reservations.thGuest")}</TableHead>
                  <TableHead>{t("reservations.thDate")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("reservations.thTime")}</TableHead>
                  <TableHead>{t("reservations.thPax")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("reservations.thTable")}</TableHead>
                  <TableHead>{t("reservations.thStatus")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("reservations.thNote")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  reservations.map((res) => (
                    <TableRow key={res.id} className="cursor-pointer" data-testid={`row-reservation-${res.id}`}>
                      <TableCell className="font-medium text-sm">{res.id.substring(0, 8)}</TableCell>
                      <TableCell className="text-sm">{res.guest_name}</TableCell>
                      <TableCell className="text-sm">{res.date}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{res.time}</TableCell>
                      <TableCell className="text-sm">{res.pax}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{res.table_label || "-"}</TableCell>
                      <TableCell><StatusBadge status={res.status} /></TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-40 truncate">{res.note || "-"}</TableCell>
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
