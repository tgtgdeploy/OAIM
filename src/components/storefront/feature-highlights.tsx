import type { LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeatureHighlightsProps {
  title: string;
  subtitle: string;
  features: FeatureItem[];
  iconColorClass?: string;
  columns?: 2 | 3 | 4;
  bgSection?: boolean;
}

export function FeatureHighlights({
  title,
  subtitle,
  features,
  iconColorClass = "bg-primary/10 text-primary",
  columns = 4,
  bgSection = false,
}: FeatureHighlightsProps) {
  const colClass = columns === 2
    ? "grid-cols-2"
    : columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";

  const bgParts = iconColorClass.split(" ");
  const bgColor = bgParts[0] || "bg-primary/10";
  const textColor = bgParts[1] || "text-primary";

  return (
    <section className={bgSection ? "bg-card border-y" : ""} data-testid="section-features">
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 ${bgSection ? "" : ""}`}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-features-title">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid ${colClass} gap-4`}>
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-4" data-testid={`feature-${feature.title.toLowerCase().replace(/\s/g, "-")}`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-md ${bgColor} mx-auto mb-3`}>
                <feature.icon className={`h-6 w-6 ${textColor}`} />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
