import { Camera } from "lucide-react";

interface GalleryItem {
  image?: string;
  alt?: string;
  color?: string;
}

interface GalleryGridProps {
  title: string;
  subtitle: string;
  items?: GalleryItem[];
  placeholderColors?: string[];
  columns?: 2 | 3;
}

export function GalleryGrid({
  title,
  subtitle,
  items,
  placeholderColors,
  columns = 3,
}: GalleryGridProps) {
  const colClass = columns === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3";

  const galleryItems: GalleryItem[] = items || (placeholderColors || []).map(c => ({ color: c }));

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-gallery">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-gallery-title">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className={`grid ${colClass} gap-4`}>
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className={`${item.color || ""} rounded-md h-40 md:h-56 overflow-hidden relative group`}
            data-testid={`gallery-item-${idx}`}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.alt || ""}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${item.color || "bg-muted"}`}>
                <Camera className="h-8 w-8 text-muted-foreground/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
