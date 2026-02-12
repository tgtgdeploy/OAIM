import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface HeroCTA {
  label: string;
  href?: string;
  variant?: "secondary" | "outline";
  isWhatsApp?: boolean;
}

interface StoreHeroProps {
  gradientClass: string;
  accentOverlay?: string;
  bgImage?: string;
  badgeIcon: LucideIcon | IconType;
  badgeText: string;
  title: string;
  subtitle: string;
  primaryCTA: HeroCTA;
  secondaryCTA?: HeroCTA;
  whatsappNumber?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}

export function StoreHero({
  gradientClass,
  accentOverlay,
  bgImage,
  badgeIcon: BadgeIcon,
  badgeText,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  whatsappNumber = "1234567890",
  align = "center",
  children,
}: StoreHeroProps) {
  function renderCTA(cta: HeroCTA, testId: string) {
    const isOutline = cta.variant === "outline";
    const href = cta.href || (cta.isWhatsApp ? `https://wa.me/${whatsappNumber}` : "#");
    const isExternal = href.startsWith("http");

    const btn = (
      <Button
        size="lg"
        variant={cta.variant || "secondary"}
        className={`text-base ${isOutline ? "border-white/30 text-white bg-white/10 backdrop-blur-sm" : ""}`}
        data-testid={testId}
      >
        {cta.isWhatsApp && <SiWhatsapp className="mr-2 h-4 w-4" />}
        {cta.label}
        {!cta.isWhatsApp && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    );

    if (isExternal) {
      return <a href={href} target="_blank" rel="noopener noreferrer">{btn}</a>;
    }
    return <a href={href}>{btn}</a>;
  }

  const isLeft = align === "left";

  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      )}
      <div className={`absolute inset-0 ${gradientClass}`} />
      {accentOverlay && <div className={`absolute inset-0 ${accentOverlay}`} />}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className={`${isLeft ? "max-w-2xl" : "max-w-3xl mx-auto text-center"}`}>
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20" data-testid="badge-hero">
            <BadgeIcon className="h-3 w-3 mr-1" />
            {badgeText}
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white" data-testid="text-hero-title">
            {title}
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl" data-testid="text-hero-subtitle">
            {subtitle}
          </p>
          <div className={`flex flex-col sm:flex-row ${isLeft ? "items-start" : "items-center justify-center"} gap-3`}>
            {renderCTA(primaryCTA, "button-hero-primary")}
            {secondaryCTA && renderCTA(secondaryCTA, "button-hero-secondary")}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
