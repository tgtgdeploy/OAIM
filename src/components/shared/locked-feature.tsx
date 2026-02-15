import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Lock, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LockedFeatureCard {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface LockedFeatureProps {
  title: string;
  description: string;
  upgradePlan: string;
  features?: LockedFeatureCard[];
  testId?: string;
}

export function LockedFeature({ title, description, upgradePlan, features, testId }: LockedFeatureProps) {
  const { t } = useTranslation("storefront");

  return (
    <div className="max-w-2xl mx-auto py-12 text-center" data-testid={testId}>
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted mx-auto mb-6">
        <Lock className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">{description}</p>

      {features && features.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-4">
                <feature.icon className="h-5 w-5 text-muted-foreground mb-2" />
                <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Link href="/pricing">
        <Button>
          {t("locked.upgradeTo", { plan: upgradePlan })}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
