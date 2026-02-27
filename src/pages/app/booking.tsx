import { useState, useMemo } from "react";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchInput } from "@/components/shared/search-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useAppointments, useCreateAppointment } from "@/hooks/use-appointments";
import { useProducts } from "@/hooks/use-products";
import { useStaff } from "@/hooks/use-staff";
import { useContacts } from "@/hooks/use-contacts";
import { useToast } from "@/hooks/use-toast";
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
  const { data: services = [] } = useProducts();
  const { data: staff = [] } = useStaff();
  const { data: contacts = [] } = useContacts();
  const createAppointment = useCreateAppointment();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formClientName, setFormClientName] = useState("");
  const [formContactId, setFormContactId] = useState("");
  const [formServiceId, setFormServiceId] = useState("");
  const [formTherapistId, setFormTherapistId] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formDuration, setFormDuration] = useState("60");
  const [formPrice, setFormPrice] = useState("");
  const [formNotes, setFormNotes] = useState("");

  const contactMap = useMemo(() => {
    const map = new Map<string, string>();
    contacts.forEach(c => map.set(c.id, c.name));
    return map;
  }, [contacts]);

  const staffMap = useMemo(() => {
    const map = new Map<string, string>();
    staff.forEach(s => map.set(s.id, s.name));
    return map;
  }, [staff]);

  const serviceMap = useMemo(() => {
    const map = new Map<string, { name: string; price: string; unit: string | null }>();
    services.forEach(s => map.set(s.id, { name: s.name, price: s.price, unit: s.unit }));
    return map;
  }, [services]);

  function resetForm() {
    setFormClientName(""); setFormContactId(""); setFormServiceId("");
    setFormTherapistId(""); setFormDate(""); setFormTime("");
    setFormDuration("60"); setFormPrice(""); setFormNotes("");
  }

  function handleServiceChange(serviceId: string) {
    setFormServiceId(serviceId);
    const svc = serviceMap.get(serviceId);
    if (svc) {
      setFormPrice(svc.price);
      if (svc.unit) {
        const mins = parseInt(svc.unit);
        if (!isNaN(mins)) setFormDuration(String(mins));
      }
    }
  }

  function handleContactChange(contactId: string) {
    setFormContactId(contactId);
    const name = contactMap.get(contactId);
    if (name) setFormClientName(name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formClientName || !formDate || !formTime) return;

    const serviceName = formServiceId ? serviceMap.get(formServiceId)?.name ?? "" : "";
    const therapistName = formTherapistId ? staffMap.get(formTherapistId) ?? "" : "";

    createAppointment.mutate(
      {
        tenant_id: "demo",
        client_name: formClientName,
        service: serviceName || "General",
        therapist: therapistName || null,
        date: formDate,
        time: formTime,
        duration: formDuration ? `${formDuration} min` : null,
        contact_id: formContactId || null,
        service_id: formServiceId || null,
        therapist_id: formTherapistId || null,
        price: formPrice || null,
        notes: formNotes || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("booking.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  }

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
            <Button onClick={() => setDialogOpen(true)} data-testid="button-new-appointment">
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
                  <TableHead className="hidden lg:table-cell text-right">{t("booking.thPrice")}</TableHead>
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
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    </TableRow>
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-sm text-destructive">
                      {t("common.error", { defaultValue: "Failed to load data. Please try again." })}
                    </TableCell>
                  </TableRow>
                ) : appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-sm text-muted-foreground">
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
                      <TableCell className="hidden lg:table-cell text-sm text-right font-medium">{apt.price ? `RM ${parseFloat(apt.price).toFixed(0)}` : "—"}</TableCell>
                      <TableCell><StatusBadge status={apt.status} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create Appointment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("booking.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("booking.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>{t("booking.client")}</Label>
              <Select value={formContactId} onValueChange={handleContactChange}>
                <SelectTrigger data-testid="select-booking-contact">
                  <SelectValue placeholder={t("booking.selectClient")} />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name} — {c.phone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bk-client-name">{t("booking.clientName")}</Label>
              <Input id="bk-client-name" required value={formClientName} onChange={(e) => setFormClientName(e.target.value)} data-testid="input-booking-client-name" />
            </div>
            <div className="space-y-2">
              <Label>{t("booking.service")}</Label>
              <Select value={formServiceId} onValueChange={handleServiceChange}>
                <SelectTrigger data-testid="select-booking-service">
                  <SelectValue placeholder={t("booking.selectService")} />
                </SelectTrigger>
                <SelectContent>
                  {services.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} — {s.currency} {parseFloat(s.price).toFixed(0)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("booking.therapist")}</Label>
              <Select value={formTherapistId} onValueChange={setFormTherapistId}>
                <SelectTrigger data-testid="select-booking-therapist">
                  <SelectValue placeholder={t("booking.selectTherapist")} />
                </SelectTrigger>
                <SelectContent>
                  {staff.filter(s => s.status !== "off").map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} {s.status === "busy" ? `(${t("therapists.statusInSession")})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bk-date">{t("booking.date")}</Label>
                <Input id="bk-date" type="date" required value={formDate} onChange={(e) => setFormDate(e.target.value)} data-testid="input-booking-date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-time">{t("booking.time")}</Label>
                <Input id="bk-time" type="time" required value={formTime} onChange={(e) => setFormTime(e.target.value)} data-testid="input-booking-time" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bk-duration">{t("booking.duration")}</Label>
                <Input id="bk-duration" type="number" placeholder="60" value={formDuration} onChange={(e) => setFormDuration(e.target.value)} data-testid="input-booking-duration" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-price">{t("booking.price")}</Label>
                <Input id="bk-price" type="number" step="0.01" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} data-testid="input-booking-price" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bk-notes">{t("booking.notes")}</Label>
              <Textarea id="bk-notes" placeholder={t("booking.notesPlaceholder")} value={formNotes} onChange={(e) => setFormNotes(e.target.value)} data-testid="input-booking-notes" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createAppointment.isPending} data-testid="button-submit-booking">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
