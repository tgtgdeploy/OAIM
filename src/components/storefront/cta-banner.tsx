import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

interface CTABannerProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  bgClass?: string;
  whatsappNumber?: string;
}

export function CTABanner({
  title,
  subtitle,
  buttonLabel,
  bgClass = "bg-primary text-primary-foreground",
  whatsappNumber = "1234567890",
}: CTABannerProps) {
  const isCustomBg = bgClass !== "bg-primary text-primary-foreground";

  return (
    <section className={bgClass} data-testid="section-cta">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
          <SiWhatsapp className="h-7 w-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-cta-title">{title}</h2>
        <p className={`max-w-lg mx-auto mb-6 ${isCustomBg ? "text-white/80" : "text-primary-foreground/80"}`}>
          {subtitle}
        </p>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="secondary" className="text-base" data-testid="button-cta-whatsapp">
            <SiWhatsapp className="mr-2 h-4 w-4" />
            {buttonLabel}
          </Button>
        </a>
      </div>
    </section>
  );
}
