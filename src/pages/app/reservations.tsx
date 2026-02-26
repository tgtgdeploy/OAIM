import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useReservations, useCreateReservation } from "@/hooks/use-reservations";
import { useToast } from "@/hooks/use-toast";
import "@/styles/dashboard.css";

export default function ReservationsPage() {
  const { t } = useTranslation("app");
  const { data: reservations = [], isLoading } = useReservations();
  const createReservation = useCreateReservation();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [formGuestName, setFormGuestName] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formPax, setFormPax] = useState("2");
  const [formTableLabel, setFormTableLabel] = useState("");
  const [formNote, setFormNote] = useState("");

  function resetForm() {
    setFormGuestName("");
    setFormDate("");
    setFormTime("");
    setFormPax("2");
    setFormTableLabel("");
    setFormNote("");
  }

  function handleSubmitReservation(e: React.FormEvent) {
    e.preventDefault();
    if (!formGuestName || !formDate || !formTime) return;
    createReservation.mutate(
      {
        tenant_id: "demo",
        guest_name: formGuestName,
        date: formDate,
        time: formTime,
        pax: parseInt(formPax, 10) || 2,
        table_label: formTableLabel || null,
        note: formNote || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("reservations.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  }

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
            <Button onClick={() => setDialogOpen(true)} data-testid="button-add-reservation">
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("reservations.dialogTitle")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitReservation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="res-guest-name">{t("reservations.guestName")}</Label>
              <Input id="res-guest-name" required value={formGuestName} onChange={(e) => setFormGuestName(e.target.value)} data-testid="input-reservation-guest" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-date">{t("reservations.date")}</Label>
              <Input id="res-date" type="date" required value={formDate} onChange={(e) => setFormDate(e.target.value)} data-testid="input-reservation-date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-time">{t("reservations.time")}</Label>
              <Input id="res-time" type="time" required value={formTime} onChange={(e) => setFormTime(e.target.value)} data-testid="input-reservation-time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-pax">{t("reservations.pax")}</Label>
              <Input id="res-pax" type="number" min="1" value={formPax} onChange={(e) => setFormPax(e.target.value)} data-testid="input-reservation-pax" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-table">{t("reservations.table")}</Label>
              <Input id="res-table" value={formTableLabel} onChange={(e) => setFormTableLabel(e.target.value)} data-testid="input-reservation-table" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-note">{t("reservations.note")}</Label>
              <Textarea id="res-note" placeholder={t("reservations.notePlaceholder")} value={formNote} onChange={(e) => setFormNote(e.target.value)} data-testid="input-reservation-note" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createReservation.isPending} data-testid="button-submit-reservation">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
