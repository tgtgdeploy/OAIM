import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";
import type { LucideIcon } from "lucide-react";

interface ReservationField {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ReservationCardProps {
  title: string;
  subtitle: string;
  fields: ReservationField[];
  description: string;
  buttonLabel?: string;
  whatsappNumber?: string;
}

export function ReservationCard({
  title,
  subtitle,
  fields,
  description,
  buttonLabel = "Book via WhatsApp",
  whatsappNumber = "1234567890",
}: ReservationCardProps) {
  return (
    <section className="bg-card border-y" data-testid="section-reservation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-reservation-title">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        <Card className="max-w-2xl mx-auto overflow-visible" data-testid="card-reservation">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {fields.map((field) => (
                <div key={field.title} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <field.icon className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{field.title}</p>
                    <p className="text-xs text-muted-foreground">{field.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 text-center">{description}</p>
            <div className="text-center">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" data-testid="button-book-whatsapp">
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  {buttonLabel}
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
