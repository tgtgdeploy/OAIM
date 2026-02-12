import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, DollarSign, TrendingUp, Gift, Copy, Settings, Share2 } from "lucide-react";

const superadminReferrals = [
  { id: "1", tenant: "Fashion Hub KL", referrals: 12, conversions: 8, commission: "RM 640", status: "active" },
  { id: "2", tenant: "Tech Gadgets MY", referrals: 25, conversions: 18, commission: "RM 1,440", status: "active" },
  { id: "3", tenant: "Nasi Kandar Express", referrals: 5, conversions: 3, commission: "RM 87", status: "active" },
  { id: "4", tenant: "Shoe Palace", referrals: 8, conversions: 5, commission: "RM 395", status: "paused" },
];

const merchantReferrals = [
  { id: "1", customer: "Sarah Ahmad", referred: 3, earned: "RM 45", status: "active" },
  { id: "2", customer: "David Ooi", referred: 1, earned: "RM 15", status: "pending" },
  { id: "3", customer: "Lisa Tan", referred: 5, earned: "RM 75", status: "active" },
  { id: "4", customer: "Kevin Lee", referred: 2, earned: "RM 30", status: "active" },
];

const memberReferrals = [
  { id: "1", name: "Mei Ling", status: "completed", reward: "+50 pts", date: "Feb 8" },
  { id: "2", name: "Ahmad Razak", status: "pending", reward: "+50 pts", date: "Feb 10" },
  { id: "3", name: "Siti Aminah", status: "completed", reward: "+50 pts", date: "Feb 5" },
];

interface ReferralModuleProps {
  context: "superadmin" | "merchant" | "member";
}

export function ReferralModule({ context }: ReferralModuleProps) {
  if (context === "member") {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
              <Share2 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-1">Refer & Earn</h3>
            <p className="text-sm text-muted-foreground mb-4">Share your referral code and earn 50 points for every friend who makes a purchase</p>
            <div className="flex items-center gap-2 justify-center max-w-sm mx-auto">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm" data-testid="text-referral-code">REF-SARAH2026</div>
              <Button size="icon" variant="outline" data-testid="button-copy-code">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="stats-grid">
          <StatCard label="Total Referred" value={memberReferrals.length.toString()} icon={Users} />
          <StatCard label="Points Earned" value="100" icon={Gift} iconColor="text-primary" />
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">Your Referrals</h3>
            <div className="space-y-3">
              {memberReferrals.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-md bg-muted/50" data-testid={`referral-${r.id}`}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{r.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} />
                    <Badge variant="secondary" className="text-xs">{r.reward}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (context === "superadmin") {
    return (
      <div className="space-y-4">
        <div className="stats-grid">
          <StatCard label="Total Referrals" value="50" icon={Users} />
          <StatCard label="Conversions" value="34" icon={TrendingUp} />
          <StatCard label="Total Commission" value="RM 2,562" icon={DollarSign} />
          <StatCard label="Conversion Rate" value="68%" icon={TrendingUp} iconColor="text-green-500" />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">Commission settings per plan</p>
          <Button variant="outline" data-testid="button-commission-settings">
            <Settings className="h-4 w-4 mr-2" />Commission Settings
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {superadminReferrals.map((r) => (
                  <TableRow key={r.id} data-testid={`row-referral-${r.id}`}>
                    <TableCell className="font-medium text-sm">{r.tenant}</TableCell>
                    <TableCell className="text-sm">{r.referrals}</TableCell>
                    <TableCell className="text-sm">{r.conversions}</TableCell>
                    <TableCell className="text-sm font-medium">{r.commission}</TableCell>
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

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        <StatCard label="Total Referrals" value={merchantReferrals.reduce((a, r) => a + r.referred, 0).toString()} icon={Users} />
        <StatCard label="Total Earned" value="RM 165" icon={DollarSign} />
        <StatCard label="Active Referrers" value={merchantReferrals.filter(r => r.status === "active").length.toString()} icon={TrendingUp} />
        <StatCard label="Avg per Referrer" value="2.75" icon={Gift} />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">Customer referral program</p>
        <Button data-testid="button-referral-settings">
          <Settings className="h-4 w-4 mr-2" />Program Settings
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Referred</TableHead>
                <TableHead>Earned</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {merchantReferrals.map((r) => (
                <TableRow key={r.id} data-testid={`row-referral-${r.id}`}>
                  <TableCell className="font-medium text-sm">{r.customer}</TableCell>
                  <TableCell className="text-sm">{r.referred}</TableCell>
                  <TableCell className="text-sm font-medium">{r.earned}</TableCell>
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
