import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
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
import { useTranslation } from "react-i18next";
import "@/styles/dashboard.css";

const reservations = [
  { id: "RES-001", guest: "Sarah Ahmad", date: "2026-02-12", time: "7:00 PM", pax: 4, table: "T-05", status: "confirmed", note: "Birthday celebration" },
  { id: "RES-002", guest: "Ahmad Razak", date: "2026-02-12", time: "7:30 PM", pax: 2, table: "T-02", status: "confirmed", note: "" },
  { id: "RES-003", guest: "Lisa Tan", date: "2026-02-12", time: "8:00 PM", pax: 8, table: "T-10", status: "pending", note: "Need high chair" },
  { id: "RES-004", guest: "David Ooi", date: "2026-02-13", time: "12:30 PM", pax: 3, table: "-", status: "pending", note: "" },
  { id: "RES-005", guest: "Mei Ling", date: "2026-02-13", time: "6:30 PM", pax: 6, table: "T-08", status: "confirmed", note: "Anniversary dinner" },
  { id: "RES-006", guest: "Raj Kumar", date: "2026-02-14", time: "7:00 PM", pax: 2, table: "-", status: "pending", note: "Valentine's special" },
  { id: "RES-007", guest: "Nurul Huda", date: "2026-02-11", time: "1:00 PM", pax: 10, table: "T-12", status: "completed", note: "Corporate lunch" },
];

export default function ReservationsPage() {
  const { t } = useTranslation("app");

  return (
    <AppLayout title={t("reservations.title")}>
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label={t("reservations.todaysBookings")} value="3" icon={CalendarDays} testId="card-stat-today" />
          <StatCard label={t("reservations.totalGuestsToday")} value="14" icon={Users} testId="card-stat-guests" />
          <StatCard label={t("reservations.pending")} value="3" icon={Clock} testId="card-stat-pending" />
          <StatCard label={t("reservations.thisWeek")} value="12" icon={CheckCircle2} change="+25% vs last week" testId="card-stat-week" />
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
                {reservations.map((res) => (
                  <TableRow key={res.id} className="cursor-pointer" data-testid={`row-reservation-${res.id}`}>
                    <TableCell className="font-medium text-sm">{res.id}</TableCell>
                    <TableCell className="text-sm">{res.guest}</TableCell>
                    <TableCell className="text-sm">{res.date}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{res.time}</TableCell>
                    <TableCell className="text-sm">{res.pax}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{res.table}</TableCell>
                    <TableCell><StatusBadge status={res.status} /></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-40 truncate">{res.note || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
