import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, BarChart3, TrendingUp, DollarSign, Users, Eye, Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCampaigns } from "@/hooks/use-campaigns";

interface AdsModuleProps {
  context: "superadmin" | "merchant";
}

function formatCurrency(currency: string, value: string): string {
  return `${currency} ${parseFloat(value).toLocaleString()}`;
}

function LoadingSkeleton(): React.ReactElement {
  return (
    <div className="space-y-4">
      <div className="stats-grid">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="p-4 space-y-3">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdsModule({ context }: AdsModuleProps) {
  const { t } = useTranslation("superadmin");
  const { data: campaigns = [], isLoading } = useCampaigns();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + parseFloat(c.spent), 0);

  const roasValues = campaigns
    .map((c) => c.roas)
    .filter((r): r is string => r !== null)
    .map(parseFloat)
    .filter((v) => !isNaN(v));
  const avgRoas = roasValues.length > 0
    ? (roasValues.reduce((sum, v) => sum + v, 0) / roasValues.length).toFixed(1)
    : "0.0";

  const defaultCurrency = campaigns[0]?.currency ?? "RM";

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        <StatCard label={t("ads.activeCampaigns")} value={activeCampaigns.toString()} icon={BarChart3} />
        <StatCard label={t("ads.totalLeads")} value={totalLeads.toString()} icon={Users} />
        <StatCard label={t("ads.totalSpent")} value={`${defaultCurrency} ${totalSpent.toLocaleString()}`} icon={DollarSign} />
        <StatCard label={t("ads.avgRoas")} value={`${avgRoas}x`} icon={TrendingUp} iconColor="text-green-500" />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">{t("ads.campaignsCount", { count: campaigns.length })}</p>
        <Button data-testid="button-create-campaign">
          <Plus className="h-4 w-4 mr-2" />
          {context === "superadmin" ? t("ads.createTemplate") : t("ads.newCampaign")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("ads.campaign")}</TableHead>
                <TableHead>{t("ads.status")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("ads.budget")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("ads.spent")}</TableHead>
                <TableHead>{t("ads.leads")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("ads.cpl")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("ads.roas")}</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id} data-testid={`row-campaign-${c.id}`}>
                  <TableCell>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.platform}</div>
                  </TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{formatCurrency(c.currency, c.budget)}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{formatCurrency(c.currency, c.spent)}</TableCell>
                  <TableCell className="text-sm font-medium">{c.leads}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {c.cost_per_lead !== null ? formatCurrency(c.currency, c.cost_per_lead) : "-"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {c.roas !== null && (
                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-700 dark:text-green-300">
                        {c.roas}x
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" data-testid={`button-view-campaign-${c.id}`}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {c.status === "active" && (
                        <Button size="icon" variant="ghost" data-testid={`button-pause-campaign-${c.id}`}>
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {c.status === "paused" && (
                        <Button size="icon" variant="ghost" data-testid={`button-resume-campaign-${c.id}`}>
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
