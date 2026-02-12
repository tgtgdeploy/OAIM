import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { LucideIcon } from "lucide-react";

interface ProductItem {
  name: string;
  price: string;
  badge?: string;
  desc?: string;
}

interface ProductGridProps {
  title: string;
  subtitle: string;
  products: ProductItem[];
  placeholderIcon?: LucideIcon;
  actionLabel?: string;
  whatsappLabel?: string;
  whatsappNumber?: string;
  bgSection?: boolean;
}

export function ProductGrid({
  title,
  subtitle,
  products,
  placeholderIcon: PlaceholderIcon = ShoppingBag,
  actionLabel = "Add to Cart",
  whatsappLabel = "Ask",
  whatsappNumber = "1234567890",
  bgSection = true,
}: ProductGridProps) {
  return (
    <section className={bgSection ? "bg-card border-y" : ""} data-testid="section-products">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-products-title">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product, idx) => (
            <Card key={product.name} className="hover-elevate overflow-visible" data-testid={`card-product-${idx}`}>
              <CardContent className="p-0">
                <div className="flex flex-row md:flex-col">
                  <div className="w-32 md:w-full h-32 md:h-48 bg-muted rounded-l-md md:rounded-l-none md:rounded-t-md flex items-center justify-center shrink-0">
                    <PlaceholderIcon className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-sm" data-testid={`text-product-name-${idx}`}>{product.name}</h3>
                      {product.badge && <Badge variant="secondary" data-testid={`badge-product-${idx}`}>{product.badge}</Badge>}
                    </div>
                    {product.desc && <p className="text-xs text-muted-foreground mb-2" data-testid={`text-product-desc-${idx}`}>{product.desc}</p>}
                    <p className="text-lg font-bold mb-3" data-testid={`text-product-price-${idx}`}>{product.price}</p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                      <Button size="sm" className="flex-1" data-testid={`button-action-${idx}`}>
                        {actionLabel}
                      </Button>
                      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" variant="outline" className="w-full" data-testid={`button-whatsapp-${idx}`}>
                          <SiWhatsapp className="mr-1 h-3 w-3" />
                          {whatsappLabel}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
