import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialItem {
  name: string;
  rating: number;
  text: string;
}

interface TestimonialGridProps {
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

export function TestimonialGrid({ title, subtitle, testimonials }: TestimonialGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-testimonials">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-testimonials-title">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((review, idx) => (
          <Card key={review.name} className="hover-elevate overflow-visible" data-testid={`card-testimonial-${idx}`}>
            <CardContent className="p-6">
              <div className="flex gap-0.5 mb-3" data-testid={`stars-${idx}`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s <= review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4" data-testid={`text-review-${idx}`}>{review.text}</p>
              <p className="text-sm font-semibold" data-testid={`text-reviewer-${idx}`}>{review.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
