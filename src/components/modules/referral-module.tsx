import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, DollarSign, TrendingUp, Gift, Copy, Settings, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReferrals } from "@/hooks/use-referrals";

interface ReferralModuleProps {
  context: "superadmin" | "merchant" | "member";
}

function formatCurrency(currency: string, amount: string): string {
  return `${currency} ${parseFloat(amount).toLocaleString()}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function LoadingSkeleton(): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="stats-grid">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-4 space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ReferralModule({ context }: ReferralModuleProps): JSX.Element {
  const { t } = useTranslation("superadmin");
  const { data: referrals = [], isLoading } = useReferrals(context);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (context === "member") {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
              <Share2 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-1">{t("referral.referEarn")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("referral.referEarnDesc")}</p>
            <div className="flex items-center gap-2 justify-center max-w-sm mx-auto">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm" data-testid="text-referral-code">REF-SARAH2026</div>
              <Button size="icon" variant="outline" data-testid="button-copy-code">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="stats-grid">
          <StatCard label={t("referral.totalReferred")} value={referrals.length.toString()} icon={Users} />
          <StatCard
            label={t("referral.pointsEarned")}
            value={referrals.filter((r) => r.status === "completed").length * 50 + " pts"}
            icon={Gift}
            iconColor="text-primary"
          />
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">{t("referral.yourReferrals")}</h3>
            <div className="space-y-3">
              {referrals.map((r) => {
                const name = r.customer_name ?? "Unknown";
                return (
                  <div key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-md bg-muted/50" data-testid={`referral-${r.id}`}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">{name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(r.created_at)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={r.status} />
                      <Badge variant="secondary" className="text-xs">{r.reward ?? ""}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (context === "superadmin") {
    const totalReferrals = referrals.reduce((sum, r) => sum + r.referral_count, 0);
    const totalConversions = referrals.reduce((sum, r) => sum + r.conversions, 0);
    const totalCommission = referrals.reduce((sum, r) => sum + parseFloat(r.commission), 0);
    const conversionRate = totalReferrals > 0
      ? Math.round((totalConversions / totalReferrals) * 100)
      : 0;
    const currency = referrals[0]?.currency ?? "RM";

    return (
      <div className="space-y-4">
        <div className="stats-grid">
          <StatCard label={t("referral.totalReferrals")} value={totalReferrals.toString()} icon={Users} />
          <StatCard label={t("referral.conversions")} value={totalConversions.toString()} icon={TrendingUp} />
          <StatCard label={t("referral.totalCommission")} value={`${currency} ${totalCommission.toLocaleString()}`} icon={DollarSign} />
          <StatCard label={t("referral.conversionRate")} value={`${conversionRate}%`} icon={TrendingUp} iconColor="text-green-500" />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">{t("referral.commissionSettingsDesc")}</p>
          <Button variant="outline" data-testid="button-commission-settings">
            <Settings className="h-4 w-4 mr-2" />{t("referral.commissionSettings")}
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("referral.tenant")}</TableHead>
                  <TableHead>{t("referral.referrals")}</TableHead>
                  <TableHead>{t("referral.conversions")}</TableHead>
                  <TableHead>{t("referral.commission")}</TableHead>
                  <TableHead>{t("referral.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((r) => (
                  <TableRow key={r.id} data-testid={`row-referral-${r.id}`}>
                    <TableCell className="font-medium text-sm">{r.tenant_id}</TableCell>
                    <TableCell className="text-sm">{r.referral_count}</TableCell>
                    <TableCell className="text-sm">{r.conversions}</TableCell>
                    <TableCell className="text-sm font-medium">{formatCurrency(r.currency, r.commission)}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Merchant context
  const totalReferred = referrals.reduce((sum, r) => sum + r.referral_count, 0);
  const totalEarned = referrals.reduce((sum, r) => sum + parseFloat(r.earned), 0);
  const activeReferrers = referrals.filter((r) => r.status === "active").length;
  const avgPerReferrer = referrals.length > 0
    ? (totalReferred / referrals.length).toFixed(2)
    : "0";
  const currency = referrals[0]?.currency ?? "RM";

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        <StatCard label={t("referral.totalReferrals")} value={totalReferred.toString()} icon={Users} />
        <StatCard label={t("referral.totalEarned")} value={`${currency} ${totalEarned.toLocaleString()}`} icon={DollarSign} />
        <StatCard label={t("referral.activeReferrers")} value={activeReferrers.toString()} icon={TrendingUp} />
        <StatCard label={t("referral.avgPerReferrer")} value={avgPerReferrer} icon={Gift} />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">{t("referral.customerReferralProgram")}</p>
        <Button data-testid="button-referral-settings">
          <Settings className="h-4 w-4 mr-2" />{t("referral.programSettings")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("referral.customer")}</TableHead>
                <TableHead>{t("referral.referred")}</TableHead>
                <TableHead>{t("referral.earned")}</TableHead>
                <TableHead>{t("referral.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((r) => (
                <TableRow key={r.id} data-testid={`row-referral-${r.id}`}>
                  <TableCell className="font-medium text-sm">{r.customer_name ?? "Unknown"}</TableCell>
                  <TableCell className="text-sm">{r.referral_count}</TableCell>
                  <TableCell className="text-sm font-medium">{formatCurrency(r.currency, r.earned)}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
