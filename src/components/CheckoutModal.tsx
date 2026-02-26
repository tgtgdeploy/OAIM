import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { usePlans } from "@/hooks/use-plans";
import { useCreateCheckout } from "@/hooks/use-payment";
import { useAuthStore } from "@/stores/auth-store";
import { useTranslation } from "react-i18next";
import type { PlanKey } from "@/lib/stripe";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TIER_ORDER: PlanKey[] = ["starter", "pro", "business"];

const TIER_FEATURES: Record<PlanKey, string[]> = {
  starter: [
    "1,000 messages/month",
    "1 team member",
    "Basic AI script",
    "WhatsApp integration",
  ],
  pro: [
    "5,000 messages/month",
    "5 team members",
    "Advanced AI script",
    "WhatsApp + Telegram",
    "Automation workflows",
    "Follow-up reminders",
  ],
  business: [
    "Unlimited messages",
    "Unlimited team members",
    "Custom AI training",
    "All integrations",
    "Ads & ROI tracking",
    "Priority support",
    "API access",
  ],
};

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { t } = useTranslation("app");
  const { data: plans = [] } = usePlans();
  const checkout = useCreateCheckout();
  const tenant = useAuthStore((s) => s.tenant);

  const handleSubscribe = (planTier: PlanKey, planId: string) => {
    if (!tenant) return;
    checkout.mutate({
      tenantId: (tenant as Record<string, unknown>).id as string,
      planId,
      planTier,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("pricing.modalTitle")}</DialogTitle>
          <DialogDescription>{t("pricing.modalDesc")}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {TIER_ORDER.map((tier) => {
            const plan = plans.find(
              (p) => (p as Record<string, unknown>).tier === tier
            );
            const features = TIER_FEATURES[tier];
            const isPopular = tier === "pro";

            return (
              <Card
                key={tier}
                className={`relative overflow-visible ${isPopular ? "border-primary shadow-md" : ""}`}
              >
                {isPopular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    {t("pricing.popular")}
                  </Badge>
                )}
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold capitalize">{tier}</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">
                        RM {plan ? Number((plan as Record<string, unknown>).price_monthly) : "—"}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={isPopular ? "default" : "outline"}
                    disabled={checkout.isPending || !plan}
                    onClick={() =>
                      plan &&
                      handleSubscribe(tier, (plan as Record<string, unknown>).id as string)
                    }
                    data-testid={`button-subscribe-${tier}`}
                  >
                    {checkout.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      t("pricing.subscribe")
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
