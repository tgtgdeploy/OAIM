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
import { useTranslation } from "react-i18next";
import { useTenants } from "@/hooks/use-tenants";
import "@/styles/superadmin.css";

export default function TenantsPage() {
  const { t } = useTranslation("superadmin");
  const { data: tenants = [], isLoading } = useTenants();

  const activeCount = tenants.filter((tenant) => tenant.status === "active").length;
  const trialCount = tenants.filter((tenant) => tenant.status === "trial").length;

  if (isLoading) {
    return (
      <SuperAdminLayout title={t("tenants.title")}>
        <div className="admin-content section-spacing flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary animate-pulse" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout title={t("tenants.title")}>
      <div className="admin-content section-spacing">
        <div className="stats-grid">
          <StatCard label={t("tenants.totalTenants")} value={tenants.length.toString()} icon={Building2} />
          <StatCard label={t("tenants.active")} value={activeCount.toString()} icon={Users} />
          <StatCard label={t("tenants.trial")} value={trialCount.toString()} icon={Users} />
          <StatCard label={t("tenants.totalMessages")} value={"—"} icon={Users} />
        </div>

        <div className="toolbar-row">
          <SearchInput placeholder={t("tenants.searchPlaceholder")} testId="input-search-tenants" />
          <Button data-testid="button-add-tenant">
            <Plus className="h-4 w-4 mr-2" />
            {t("tenants.addTenant")}
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("tenants.tenant")}</TableHead>
                  <TableHead>{t("tenants.industry")}</TableHead>
                  <TableHead>{t("tenants.plan")}</TableHead>
                  <TableHead>{t("tenants.status")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("tenants.users")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("tenants.messages")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("tenants.created")}</TableHead>
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
                    <TableCell className="hidden md:table-cell text-sm">—</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">—</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {new Date(tenant.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />{t("tenants.viewDetails")}</DropdownMenuItem>
                          <DropdownMenuItem><RefreshCw className="h-4 w-4 mr-2" />{t("tenants.resetData")}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Ban className="h-4 w-4 mr-2" />{t("tenants.suspend")}</DropdownMenuItem>
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
