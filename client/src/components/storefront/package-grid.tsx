import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useTranslation } from "react-i18next";

interface PackageItem {
  name: string;
  price: string;
  items: string[];
  popular?: boolean;
}

interface PackageGridProps {
  title: string;
  subtitle: string;
  packages: PackageItem[];
  accentColor?: string;
  ctaLabel?: string;
  whatsappNumber?: string;
}

export function PackageGrid({
  title,
  subtitle,
  packages: pkgs,
  accentColor = "text-primary",
  ctaLabel,
  whatsappNumber = "1234567890",
}: PackageGridProps) {
  const { t } = useTranslation("storefront");
  const resolvedCtaLabel = ctaLabel || t("package.bookPackage");
  const borderAccent = accentColor.replace("text-", "border-").replace(/(\w+)$/, "$1/50");
  const badgeBg = accentColor.replace("text-", "bg-").replace(/(\w+)$/, "$1/10");
  const checkColor = accentColor;

  return (
    <section className="bg-card border-y" data-testid="section-packages">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-packages-title">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {pkgs.map((pkg, idx) => (
            <Card
              key={pkg.name}
              className={`hover-elevate overflow-visible ${pkg.popular ? borderAccent : ""}`}
              data-testid={`card-package-${idx}`}
            >
              <CardContent className="p-6">
                {pkg.popular && (
                  <Badge variant="secondary" className={`mb-3 ${badgeBg} ${accentColor}`} data-testid={`badge-popular-${idx}`}>
                    {t("package.mostPopular")}
                  </Badge>
                )}
                <h3 className="text-xl font-bold mb-1" data-testid={`text-package-name-${idx}`}>{pkg.name}</h3>
                <p className="text-2xl font-bold mb-4" data-testid={`text-package-price-${idx}`}>{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${checkColor} shrink-0`} />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"} data-testid={`button-book-package-${idx}`}>
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    {resolvedCtaLabel}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
