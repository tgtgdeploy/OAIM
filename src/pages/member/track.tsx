import { MemberLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Package, Truck, CheckCircle2, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MemberTrack() {
  const { t } = useTranslation("member");

  const trackingSteps = [
    { label: t("track.stepOrderPlaced"), time: "Feb 10, 10:30 AM", done: true, icon: Package },
    { label: t("track.stepConfirmed"), time: "Feb 10, 11:15 AM", done: true, icon: CheckCircle2 },
    { label: t("track.stepShipped"), time: "Feb 11, 2:00 PM", done: true, icon: Truck },
    { label: t("track.stepOutForDelivery"), time: "Estimated Feb 13", done: false, icon: MapPin },
    { label: t("track.stepDelivered"), time: "-", done: false, icon: CheckCircle2 },
  ];

  return (
    <MemberLayout title={t("track.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("track.searchPlaceholder")} className="pl-9" data-testid="input-track-order" />
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold">ORD-005</h3>
                  <Badge className="text-xs">{t("track.inTransit")}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Blue Dress x3 — RM 267.00</p>
              </div>
              <Button variant="outline" size="sm" data-testid="button-contact-seller">
                {t("track.contactSeller")}
              </Button>
            </div>

            <div className="relative pl-8">
              {trackingSteps.map((step, i) => (
                <div key={i} className="relative pb-8 last:pb-0" data-testid={`tracking-step-${i}`}>
                  {i < trackingSteps.length - 1 && (
                    <div className={`absolute left-[-20px] top-8 w-0.5 h-full ${step.done ? "bg-primary" : "bg-muted"}`} />
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`absolute left-[-28px] flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <step.icon className="h-3 w-3" />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${step.done ? "" : "text-muted-foreground"}`}>{step.label}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="h-3 w-3" />
                        {step.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
}
