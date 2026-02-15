import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  name: string;
  icon: LucideIcon;
  desc: string;
  price: string;
  color: string;
}

interface ServiceGridProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
  ctaLabel?: string;
  whatsappNumber?: string;
  columns?: 2 | 3;
}

export function ServiceGrid({
  title,
  subtitle,
  services,
  ctaLabel = "Book Now",
  whatsappNumber = "1234567890",
  columns = 3,
}: ServiceGridProps) {
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-services">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-services-title">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className={`grid ${colClass} gap-4`}>
        {services.map((service, idx) => (
          <Card key={service.name} className="hover-elevate overflow-visible" data-testid={`card-service-${idx}`}>
            <CardContent className="p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-md ${service.color} mb-4`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1" data-testid={`text-service-name-${idx}`}>{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-3" data-testid={`text-service-desc-${idx}`}>{service.desc}</p>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-sm font-medium" data-testid={`text-service-price-${idx}`}>{service.price}</span>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" data-testid={`button-book-service-${idx}`}>
                    {ctaLabel}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
