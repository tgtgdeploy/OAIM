import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Filter, Truck, Package, MapPin, CheckCircle2 } from "lucide-react";
import "@/styles/dashboard.css";

const shipments = [
  { id: "SHP-001", order: "ORD-001", customer: "Sarah Ahmad", courier: "J&T Express", tracking: "JT2026021200123", destination: "Kuala Lumpur", status: "shipped", date: "2026-02-12" },
  { id: "SHP-002", order: "ORD-002", customer: "Ahmad Razak", courier: "PosLaju", tracking: "PL2026021100456", destination: "Johor Bahru", status: "shipped", date: "2026-02-11" },
  { id: "SHP-003", order: "ORD-005", customer: "Mei Ling", courier: "DHL eCommerce", tracking: "-", destination: "Penang", status: "pending", date: "2026-02-12" },
  { id: "SHP-004", order: "ORD-004", customer: "Raj Kumar", courier: "J&T Express", tracking: "JT2026020900789", destination: "Shah Alam", status: "completed", date: "2026-02-10" },
  { id: "SHP-005", order: "ORD-007", customer: "Nurul Huda", courier: "PosLaju", tracking: "PL2026020800321", destination: "Kota Kinabalu", status: "completed", date: "2026-02-08" },
  { id: "SHP-006", order: "ORD-006", customer: "David Ooi", courier: "-", tracking: "-", destination: "Petaling Jaya", status: "draft", date: "2026-02-12" },
];

export default function ShippingPage() {
  return (
    <AppLayout title="Shipping & Logistics">
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label="Active Shipments" value="2" icon={Truck} testId="card-stat-active" />
          <StatCard label="Pending Pickup" value="2" icon={Package} testId="card-stat-pending" />
          <StatCard label="Delivery Zones" value="8" icon={MapPin} testId="card-stat-zones" />
          <StatCard label="Delivered (Month)" value="45" icon={CheckCircle2} change="+18% vs last month" testId="card-stat-delivered" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder="Search shipments..." testId="input-search-shipments" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-shipments">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" data-testid="button-manage-zones">
              <MapPin className="h-4 w-4 mr-2" />
              Delivery Zones
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Courier</TableHead>
                  <TableHead className="hidden lg:table-cell">Tracking</TableHead>
                  <TableHead className="hidden sm:table-cell">Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((s) => (
                  <TableRow key={s.id} className="cursor-pointer" data-testid={`row-shipment-${s.id}`}>
                    <TableCell className="font-medium text-sm">{s.id}</TableCell>
                    <TableCell className="text-sm">{s.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{s.courier}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground font-mono text-xs">{s.tracking}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{s.destination}</TableCell>
                    <TableCell><StatusBadge status={s.status} /></TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{s.date}</TableCell>
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
