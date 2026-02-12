import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface ManagementFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge?: string;
  color: string;
}

interface ManagementShowcaseProps {
  title: string;
  subtitle: string;
  features: ManagementFeature[];
  columns?: 2 | 3 | 4;
  bgSection?: boolean;
}

export function ManagementShowcase({
  title,
  subtitle,
  features,
  columns = 3,
  bgSection = false,
}: ManagementShowcaseProps) {
  const colClass = columns === 2
    ? "md:grid-cols-2"
    : columns === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={bgSection ? "bg-card border-y" : ""} data-testid="section-management">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-management-title">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid ${colClass} gap-4`}>
          {features.map((feat, idx) => {
            const colorParts = feat.color.split(" ");
            const bgColor = colorParts[0] || "";
            const textColor = colorParts.slice(1).join(" ") || "";

            return (
              <Card key={feat.title} className="hover-elevate overflow-visible" data-testid={`card-mgmt-${idx}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-md ${bgColor} shrink-0`}>
                      <feat.icon className={`h-5 w-5 ${textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-sm" data-testid={`text-mgmt-title-${idx}`}>{feat.title}</h3>
                        {feat.badge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0" data-testid={`badge-mgmt-${idx}`}>
                            {feat.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed" data-testid={`text-mgmt-desc-${idx}`}>{feat.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
