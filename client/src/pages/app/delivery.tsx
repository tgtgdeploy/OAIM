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
import { Plus, Filter, Bike, Package, Clock, CheckCircle2 } from "lucide-react";
import "@/styles/dashboard.css";

const deliveries = [
  { id: "DEL-001", order: "ORD-042", customer: "Sarah Ahmad", address: "Jalan Ampang 12, KL", rider: "Ali", status: "delivering", eta: "15 min" },
  { id: "DEL-002", order: "ORD-043", customer: "David Ooi", address: "SS2, Petaling Jaya", rider: "Raju", status: "confirmed", eta: "25 min" },
  { id: "DEL-003", order: "ORD-044", customer: "Lisa Tan", address: "Bangsar South", rider: "-", status: "pending", eta: "-" },
  { id: "DEL-004", order: "ORD-040", customer: "Ahmad Razak", address: "Damansara Heights", rider: "Ali", status: "completed", eta: "-" },
  { id: "DEL-005", order: "ORD-039", customer: "Mei Ling", address: "Mont Kiara", rider: "Raju", status: "completed", eta: "-" },
  { id: "DEL-006", order: "ORD-045", customer: "Raj Kumar", address: "Cheras", rider: "-", status: "pending", eta: "-" },
];

export default function DeliveryPage() {
  return (
    <AppLayout title="Delivery & Takeaway">
      <div className="dashboard-page-padding section-spacing">
        <div className="stats-grid">
          <StatCard label="Active Deliveries" value="2" icon={Bike} testId="card-stat-active" />
          <StatCard label="Pending Pickup" value="2" icon={Package} testId="card-stat-pickup" />
          <StatCard label="Avg Delivery Time" value="22 min" icon={Clock} testId="card-stat-avg-time" />
          <StatCard label="Completed Today" value="18" icon={CheckCircle2} change="+30% vs yesterday" testId="card-stat-completed" />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder="Search deliveries..." testId="input-search-deliveries" />
          <div className="toolbar-actions">
            <Button variant="outline" data-testid="button-filter-deliveries">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button data-testid="button-new-delivery">
              <Plus className="h-4 w-4 mr-2" />
              New Delivery
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Address</TableHead>
                  <TableHead className="hidden sm:table-cell">Rider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((del) => (
                  <TableRow key={del.id} className="cursor-pointer" data-testid={`row-delivery-${del.id}`}>
                    <TableCell className="font-medium text-sm">{del.id}</TableCell>
                    <TableCell className="text-sm">{del.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-48 truncate">{del.address}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{del.rider}</TableCell>
                    <TableCell><StatusBadge status={del.status} /></TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{del.eta}</TableCell>
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
