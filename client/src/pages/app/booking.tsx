import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import "@/styles/dashboard.css";

const appointments = [
  { id: "APT-001", client: "Siti Nurhaliza", service: "Facial Treatment", therapist: "Mei Lin", date: "2026-02-12", time: "10:00 AM", duration: "60 min", status: "confirmed" },
  { id: "APT-002", client: "Amy Tan", service: "Full Body Massage", therapist: "Priya", date: "2026-02-12", time: "11:30 AM", duration: "90 min", status: "confirmed" },
  { id: "APT-003", client: "Nadia Hassan", service: "Gel Manicure", therapist: "Suki", date: "2026-02-12", time: "2:00 PM", duration: "45 min", status: "pending" },
  { id: "APT-004", client: "Rachel Lim", service: "Bridal Package", therapist: "Mei Lin", date: "2026-02-13", time: "10:00 AM", duration: "180 min", status: "confirmed" },
  { id: "APT-005", client: "Farah Aishah", service: "Scalp Treatment", therapist: "Priya", date: "2026-02-13", time: "3:00 PM", duration: "45 min", status: "pending" },
  { id: "APT-006", client: "Jenny Wong", service: "Spa Package", therapist: "Suki", date: "2026-02-11", time: "1:00 PM", duration: "120 min", status: "completed" },
  { id: "APT-007", client: "Aisha Kamal", service: "Hair Coloring", therapist: "Mei Lin", date: "2026-02-11", time: "4:00 PM", duration: "90 min", status: "cancelled" },
];

export default function BookingPage() {
  return (
    <AppLayout title="Booking & Appointments">
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label="Today's Appointments" value="3" icon={CalendarDays} testId="card-stat-today" />
          <StatCard label="Pending Confirmation" value="2" icon={Clock} testId="card-stat-pending" />
          <StatCard label="Completed (Week)" value="18" icon={CheckCircle2} change="+20% vs last week" testId="card-stat-completed" />
          <StatCard label="No-Shows (Month)" value="2" icon={XCircle} change="-60% vs last month" testId="card-stat-noshow" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder="Search appointments..." testId="input-search-appointments" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-appointments">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button data-testid="button-new-appointment">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead className="hidden md:table-cell">Therapist</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Time</TableHead>
                  <TableHead className="hidden lg:table-cell">Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id} className="cursor-pointer" data-testid={`row-appointment-${apt.id}`}>
                    <TableCell className="font-medium text-sm">{apt.id}</TableCell>
                    <TableCell className="text-sm">{apt.client}</TableCell>
                    <TableCell className="text-sm">{apt.service}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{apt.therapist}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{apt.date}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{apt.time}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{apt.duration}</TableCell>
                    <TableCell><StatusBadge status={apt.status} /></TableCell>
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
