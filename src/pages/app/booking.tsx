import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchInput } from "@/components/shared/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Filter, CalendarDays, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppointments } from "@/hooks/use-appointments";
import "@/styles/dashboard.css";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now);
  monday.setDate(diff);
  return monday.toISOString().slice(0, 10);
}

export default function BookingPage() {
  const { t } = useTranslation("app");
  const { data: appointments = [], isLoading, error } = useAppointments();

  const today = getToday();
  const weekStart = getWeekStart();

  const todayCount = appointments.filter((a) => a.date === today).length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const completedThisWeek = appointments.filter(
    (a) => a.status === "completed" && a.date >= weekStart && a.date <= today
  ).length;
  const cancelledThisMonth = appointments.filter((a) => {
    const month = today.slice(0, 7);
    return a.status === "cancelled" && a.date.startsWith(month);
  }).length;

  return (
    <AppLayout title={t("booking.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("booking.todaysAppointments")} value={String(todayCount)} icon={CalendarDays} testId="card-stat-today" />
          <StatCard label={t("booking.pendingConfirmation")} value={String(pendingCount)} icon={Clock} testId="card-stat-pending" />
          <StatCard label={t("booking.completedWeek")} value={String(completedThisWeek)} icon={CheckCircle2} testId="card-stat-completed" />
          <StatCard label={t("booking.noShowsMonth")} value={String(cancelledThisMonth)} icon={XCircle} testId="card-stat-noshow" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("booking.searchAppointments")} testId="input-search-appointments" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-appointments">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button data-testid="button-new-appointment">
              <Plus className="h-4 w-4 mr-2" />
              {t("booking.newBooking")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("booking.thId")}</TableHead>
                  <TableHead>{t("booking.thClient")}</TableHead>
                  <TableHead>{t("booking.thService")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("booking.thTherapist")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("booking.thDate")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("booking.thTime")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("booking.thDuration")}</TableHead>
                  <TableHead>{t("booking.thStatus")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-sm text-destructive">
                      {t("common.error", { defaultValue: "Failed to load data. Please try again." })}
                    </TableCell>
                  </TableRow>
                ) : appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-sm text-muted-foreground">
                      {t("booking.noAppointments", { defaultValue: "No appointments found." })}
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((apt) => (
                    <TableRow key={apt.id} className="cursor-pointer" data-testid={`row-appointment-${apt.id}`}>
                      <TableCell className="font-medium text-sm">{apt.id.slice(0, 8)}</TableCell>
                      <TableCell className="text-sm">{apt.client_name}</TableCell>
                      <TableCell className="text-sm">{apt.service}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{apt.therapist ?? "—"}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{apt.date}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{apt.time}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{apt.duration ?? "—"}</TableCell>
                      <TableCell><StatusBadge status={apt.status} /></TableCell>
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
