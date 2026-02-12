import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Building2, Users, MoreHorizontal, Ban, RefreshCw, Eye } from "lucide-react";
import "@/styles/superadmin.css";

const tenants = [
  { id: "1", name: "Fashion Hub KL", industry: "ecommerce", plan: "pro", status: "active", users: 3, messages: 1234, created: "2026-01-15" },
  { id: "2", name: "Nasi Kandar Express", industry: "restaurant", plan: "starter", status: "active", users: 2, messages: 567, created: "2026-01-20" },
  { id: "3", name: "Tech Gadgets MY", industry: "ecommerce", plan: "business", status: "active", users: 8, messages: 4521, created: "2026-01-10" },
  { id: "4", name: "Cafe Artisan", industry: "restaurant", plan: "trial", status: "trial", users: 1, messages: 45, created: "2026-02-01" },
  { id: "5", name: "Shoe Palace", industry: "ecommerce", plan: "pro", status: "active", users: 4, messages: 2100, created: "2025-12-05" },
  { id: "6", name: "Sushi Bar 88", industry: "restaurant", plan: "trial", status: "suspended", users: 1, messages: 12, created: "2026-02-10" },
  { id: "7", name: "HomeDecor Plus", industry: "ecommerce", plan: "starter", status: "active", users: 2, messages: 890, created: "2026-01-25" },
];

export default function TenantsPage() {
  return (
    <SuperAdminLayout title="Tenants">
      <div className="admin-content section-spacing">
        <div className="stats-grid">
          <StatCard label="Total Tenants" value={tenants.length.toString()} icon={Building2} />
          <StatCard label="Active" value={tenants.filter(t => t.status === "active").length.toString()} icon={Users} />
          <StatCard label="Trial" value={tenants.filter(t => t.status === "trial").length.toString()} icon={Users} />
          <StatCard label="Total Messages" value={tenants.reduce((a, t) => a + t.messages, 0).toLocaleString()} icon={Users} />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder="Search tenants..." testId="input-search-tenants" />
          <Button data-testid="button-add-tenant">
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Users</TableHead>
                  <TableHead className="hidden md:table-cell">Messages</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id} data-testid={`row-tenant-${tenant.id}`}>
                    <TableCell className="font-medium text-sm">{tenant.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs capitalize">{tenant.industry}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={tenant.plan} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={tenant.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{tenant.users}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{tenant.messages.toLocaleString()}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{tenant.created}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                          <DropdownMenuItem><RefreshCw className="h-4 w-4 mr-2" />Reset Data</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Ban className="h-4 w-4 mr-2" />Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
