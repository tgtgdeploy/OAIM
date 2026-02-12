import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BarChart3, TrendingUp, DollarSign, Users, Eye, Pause, Play } from "lucide-react";

const campaigns = [
  { id: "1", name: "Summer Fashion Sale", platform: "Meta", status: "active", budget: "RM 500", spent: "RM 320", leads: 45, cost_per_lead: "RM 7.11", roas: "4.2x" },
  { id: "2", name: "New Menu Launch", platform: "Meta", status: "active", budget: "RM 300", spent: "RM 180", leads: 28, cost_per_lead: "RM 6.43", roas: "3.8x" },
  { id: "3", name: "Year-End Clearance", platform: "Meta", status: "paused", budget: "RM 1,000", spent: "RM 950", leads: 120, cost_per_lead: "RM 7.92", roas: "5.1x" },
  { id: "4", name: "Valentine Promo", platform: "Meta", status: "draft", budget: "RM 200", spent: "RM 0", leads: 0, cost_per_lead: "-", roas: "-" },
];

interface AdsModuleProps {
  context: "superadmin" | "merchant";
}

export function AdsModule({ context }: AdsModuleProps) {
  const filteredCampaigns = context === "superadmin" ? campaigns : campaigns.filter(c => c.status !== "draft" || true);

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        <StatCard label="Active Campaigns" value={campaigns.filter(c => c.status === "active").length.toString()} icon={BarChart3} />
        <StatCard label="Total Leads" value={campaigns.reduce((a, c) => a + c.leads, 0).toString()} icon={Users} />
        <StatCard label="Total Spent" value="RM 1,450" icon={DollarSign} />
        <StatCard label="Avg ROAS" value="4.4x" icon={TrendingUp} iconColor="text-green-500" />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">{campaigns.length} campaigns</p>
        <Button data-testid="button-create-campaign">
          <Plus className="h-4 w-4 mr-2" />
          {context === "superadmin" ? "Create Template" : "New Campaign"}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Budget</TableHead>
                <TableHead className="hidden md:table-cell">Spent</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead className="hidden lg:table-cell">CPL</TableHead>
                <TableHead className="hidden lg:table-cell">ROAS</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((c) => (
                <TableRow key={c.id} data-testid={`row-campaign-${c.id}`}>
                  <TableCell>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.platform}</div>
                  </TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{c.budget}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{c.spent}</TableCell>
                  <TableCell className="text-sm font-medium">{c.leads}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{c.cost_per_lead}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {c.roas !== "-" && <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-700 dark:text-green-300">{c.roas}</Badge>}
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
