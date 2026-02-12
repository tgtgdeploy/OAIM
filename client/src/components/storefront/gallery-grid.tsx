import { Camera } from "lucide-react";

interface GalleryGridProps {
  title: string;
  subtitle: string;
  placeholderColors: string[];
  columns?: 2 | 3;
}

export function GalleryGrid({
  title,
  subtitle,
  placeholderColors,
  columns = 3,
}: GalleryGridProps) {
  const colClass = columns === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-gallery">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-gallery-title">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className={`grid ${colClass} gap-4`}>
        {placeholderColors.map((color, idx) => (
          <div
            key={idx}
            className={`${color} rounded-md h-40 md:h-56 flex items-center justify-center`}
            data-testid={`gallery-placeholder-${idx}`}
          >
            <Camera className="h-8 w-8 text-muted-foreground/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
