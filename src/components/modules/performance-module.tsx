import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DollarSign, Eye, MousePointer, Target, TrendingUp, BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMarketingPerformance, useMarketingCampaigns } from "@/hooks/use-marketing";
import { useAuthStore } from "@/stores/auth-store";

type DateRange = "7d" | "30d" | "90d";

export function PerformanceModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;

  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [platformFilter, setPlatformFilter] = useState("all");

  const daysMap: Record<DateRange, number> = { "7d": 7, "30d": 30, "90d": 90 };
  const { data: perfData = [], isLoading } = useMarketingPerformance(tenantId, daysMap[dateRange]);
  const { data: campaigns = [] } = useMarketingCampaigns(tenantId);

  const filtered = platformFilter === "all"
    ? perfData
    : perfData.filter((r) => r.platform === platformFilter);

  const totalSpend = filtered.reduce((s, r) => s + parseFloat(r.spend), 0);
  const totalImpressions = filtered.reduce((s, r) => s + r.impressions, 0);
  const totalClicks = filtered.reduce((s, r) => s + r.clicks, 0);
  const totalConversions = filtered.reduce((s, r) => s + r.conversions, 0);
  const avgCtr = filtered.length > 0
    ? (filtered.reduce((s, r) => s + parseFloat(r.ctr), 0) / filtered.length).toFixed(2)
    : "0.00";
  const avgRoas = filtered.length > 0
    ? (filtered.reduce((s, r) => s + parseFloat(r.roas), 0) / filtered.length).toFixed(2)
    : "0.00";

  // Group by date for trend data
  const dailyTrend = filtered.reduce((acc, r) => {
    const dateKey = r.date;
    if (!acc[dateKey]) acc[dateKey] = { date: dateKey, impressions: 0, clicks: 0, conversions: 0, spend: 0 };
    acc[dateKey].impressions += r.impressions;
    acc[dateKey].clicks += r.clicks;
    acc[dateKey].conversions += r.conversions;
    acc[dateKey].spend += parseFloat(r.spend);
    return acc;
  }, {} as Record<string, { date: string; impressions: number; clicks: number; conversions: number; spend: number }>);

  const trendData = Object.values(dailyTrend).sort((a, b) => a.date.localeCompare(b.date));

  // Top campaigns by spend
  const campaignSpend = filtered.reduce((acc, r) => {
    const name = r.campaign_name || "Unknown";
    if (!acc[name]) acc[name] = { name, spend: 0, impressions: 0, clicks: 0, conversions: 0 };
    acc[name].spend += parseFloat(r.spend);
    acc[name].impressions += r.impressions;
    acc[name].clicks += r.clicks;
    acc[name].conversions += r.conversions;
    return acc;
  }, {} as Record<string, { name: string; spend: number; impressions: number; clicks: number; conversions: number }>);

  const topCampaigns = Object.values(campaignSpend).sort((a, b) => b.spend - a.spend).slice(0, 10);

  const platforms = Array.from(new Set(perfData.map((r) => r.platform)));

  if (isLoading) {
    return <div className="space-y-4"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{[1,2,3,4,5,6].map(i=><Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}</div></div>;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {(["7d", "30d", "90d"] as DateRange[]).map((range) => (
            <Button key={range} size="sm" variant={dateRange === range ? "default" : "outline"} onClick={() => setDateRange(range)}>
              {range}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          <Badge variant={platformFilter === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setPlatformFilter("all")}>
            {t("performance.allPlatforms")}
          </Badge>
          {platforms.map((p) => (
            <Badge key={p} variant={platformFilter === p ? "default" : "outline"} className="cursor-pointer capitalize" onClick={() => setPlatformFilter(p)}>
              {p}
            </Badge>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label={t("performance.spend")} value={`RM ${totalSpend.toLocaleString()}`} icon={DollarSign} />
        <StatCard label={t("performance.impressions")} value={totalImpressions.toLocaleString()} icon={Eye} />
        <StatCard label={t("performance.clicks")} value={totalClicks.toLocaleString()} icon={MousePointer} />
        <StatCard label={t("performance.conversions")} value={totalConversions.toLocaleString()} icon={Target} />
        <StatCard label={t("performance.avgCtr")} value={`${avgCtr}%`} icon={BarChart3} />
        <StatCard label={t("performance.avgRoas")} value={`${avgRoas}x`} icon={TrendingUp} iconColor="text-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Trend (simplified as table since no recharts) */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">{t("performance.dailyTrend")}</CardTitle></CardHeader>
          <CardContent className="p-0 max-h-80 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("performance.thDate")}</TableHead>
                  <TableHead className="text-right">{t("performance.impressions")}</TableHead>
                  <TableHead className="text-right">{t("performance.clicks")}</TableHead>
                  <TableHead className="text-right">{t("performance.spend")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendData.slice(-15).map((d) => (
                  <TableRow key={d.date}>
                    <TableCell className="text-xs">{new Date(d.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right text-xs">{d.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-xs">{d.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-xs">RM {d.spend.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                {trendData.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-6">{t("performance.noData")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Campaigns */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">{t("performance.topCampaigns")}</CardTitle></CardHeader>
          <CardContent className="p-0 max-h-80 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("performance.campaign")}</TableHead>
                  <TableHead className="text-right">{t("performance.spend")}</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">{t("performance.clicks")}</TableHead>
                  <TableHead className="text-right">{t("performance.conversions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCampaigns.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell className="text-sm font-medium max-w-32 truncate">{c.name}</TableCell>
                    <TableCell className="text-right text-sm">RM {c.spend.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm hidden sm:table-cell">{c.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">{c.conversions}</TableCell>
                  </TableRow>
                ))}
                {topCampaigns.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-6">{t("performance.noData")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
