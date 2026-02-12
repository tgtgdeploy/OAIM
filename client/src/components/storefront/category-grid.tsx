import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface CategoryItem {
  name: string;
  icon: LucideIcon;
  color: string;
}

interface CategoryGridProps {
  title: string;
  subtitle: string;
  categories: CategoryItem[];
  columns?: 2 | 3 | 4;
}

export function CategoryGrid({
  title,
  subtitle,
  categories,
  columns = 4,
}: CategoryGridProps) {
  const colClass = columns === 2
    ? "grid-cols-2"
    : columns === 3
      ? "grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-categories">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-categories-title">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className={`grid ${colClass} gap-4`}>
        {categories.map((cat) => (
          <Card key={cat.name} className="hover-elevate overflow-visible" data-testid={`card-category-${cat.name.toLowerCase().replace(/\s/g, "-")}`}>
            <CardContent className="p-6 text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-md ${cat.color} mx-auto mb-3`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">{cat.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
