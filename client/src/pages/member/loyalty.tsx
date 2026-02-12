import { MemberLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { Star, Gift, TrendingUp, Clock, ArrowRight } from "lucide-react";

const rewards = [
  { id: "1", name: "RM 10 Voucher", points: 200, available: true },
  { id: "2", name: "Free Shipping", points: 150, available: true },
  { id: "3", name: "RM 25 Voucher", points: 500, available: false },
  { id: "4", name: "Exclusive Gift Set", points: 800, available: false },
];

const history = [
  { action: "Order ORD-005 completed", points: "+50", date: "Feb 10" },
  { action: "Order ORD-003 completed", points: "+30", date: "Feb 8" },
  { action: "Redeemed RM 10 Voucher", points: "-200", date: "Feb 6" },
  { action: "Order ORD-002 completed", points: "+45", date: "Feb 5" },
  { action: "Referral bonus", points: "+100", date: "Feb 1" },
];

export default function MemberLoyalty() {
  return (
    <MemberLayout title="Loyalty & Rewards">
      <div className="p-4 md:p-6 space-y-4">
        <div className="stats-grid">
          <StatCard label="Points Balance" value="450" icon={Star} iconColor="text-primary" />
          <StatCard label="Tier" value="Gold" icon={TrendingUp} />
          <StatCard label="Available Rewards" value="2" icon={Gift} />
          <StatCard label="Points Earned (Month)" value="125" icon={TrendingUp} />
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="text-center py-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">Gold Member</h3>
              <p className="text-sm text-muted-foreground mb-3">450 / 1,000 points to Platinum</p>
              <div className="h-3 rounded-full bg-muted overflow-hidden max-w-sm mx-auto">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: "45%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-4">Available Rewards</h3>
              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between gap-3 p-3 rounded-md bg-muted/50" data-testid={`reward-${reward.id}`}>
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{reward.name}</div>
                        <div className="text-xs text-muted-foreground">{reward.points} points</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={reward.available ? "default" : "outline"}
                      disabled={!reward.available}
                      data-testid={`button-redeem-${reward.id}`}
                    >
                      {reward.available ? "Redeem" : `${reward.points - 450} more`}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-4">Points History</h3>
              <div className="space-y-3">
                {history.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3" data-testid={`history-${i}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm truncate">{item.action}</div>
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                    <Badge variant={item.points.startsWith("+") ? "default" : "secondary"} className="text-xs flex-shrink-0">
                      {item.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MemberLayout>
  );
}
