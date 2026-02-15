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
  image?: string;
  originalPrice?: string;
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
  columns?: 2 | 3 | 4;
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
  columns = 3,
}: ProductGridProps) {
  const colClass = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "sm:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className={bgSection ? "bg-card border-y" : ""} data-testid="section-products">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-products-title">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid ${colClass} gap-4`}>
          {products.map((product, idx) => (
            <Card key={product.name} className="hover-elevate overflow-visible group" data-testid={`card-product-${idx}`}>
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-md">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center">
                      <PlaceholderIcon className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                  )}
                  {product.badge && (
                    <Badge className="absolute top-3 left-3" data-testid={`badge-product-${idx}`}>
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="p-4 flex flex-col">
                  <h3 className="font-semibold text-sm mb-1" data-testid={`text-product-name-${idx}`}>{product.name}</h3>
                  {product.desc && <p className="text-xs text-muted-foreground mb-2 line-clamp-2" data-testid={`text-product-desc-${idx}`}>{product.desc}</p>}
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="text-lg font-bold" data-testid={`text-product-price-${idx}`}>{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button size="sm" className="flex-1" data-testid={`button-action-${idx}`}>
                      {actionLabel}
                    </Button>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" data-testid={`button-whatsapp-${idx}`}>
                        <SiWhatsapp className="h-3.5 w-3.5" />
                      </Button>
                    </a>
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
