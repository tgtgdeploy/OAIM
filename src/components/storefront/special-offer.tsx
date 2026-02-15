import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SpecialOfferProps {
  icon: LucideIcon;
  iconColor: string;
  badgeText: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  gradientClass?: string;
}

export function SpecialOffer({
  icon: Icon,
  iconColor,
  badgeText,
  title,
  description,
  ctaLabel = "Order Now",
  ctaHref = "https://wa.me/1234567890",
  gradientClass = "bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent dark:from-amber-500/5 dark:via-orange-500/3",
}: SpecialOfferProps) {
  return (
    <section className="bg-card border-y" data-testid="section-specials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Card className={`overflow-visible ${gradientClass}`} data-testid="card-specials">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconColor} shrink-0`}>
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <Badge variant="secondary" className="mb-2" data-testid="badge-special">{badgeText}</Badge>
              <h3 className="text-xl font-bold mb-1" data-testid="text-special-title">{title}</h3>
              <p className="text-muted-foreground" data-testid="text-special-desc">{description}</p>
            </div>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button size="lg" data-testid="button-order-special">
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
