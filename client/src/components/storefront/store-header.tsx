import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { LucideIcon } from "lucide-react";

interface StoreHeaderProps {
  storeName: string;
  storeIcon: LucideIcon;
  iconBgClass?: string;
  navLinks: string[];
  ctaLabel?: string;
  ctaHref?: string;
  whatsappNumber?: string;
  showWhatsappInNav?: boolean;
}

export function StoreHeader({
  storeName,
  storeIcon: StoreIcon,
  iconBgClass = "bg-primary text-primary-foreground",
  navLinks,
  ctaLabel,
  ctaHref = "https://wa.me/1234567890",
  whatsappNumber = "1234567890",
  showWhatsappInNav = false,
}: StoreHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <div className="flex items-center gap-2">
            <div className={`flex h-9 w-9 items-center justify-center rounded-md ${iconBgClass}`}>
              <StoreIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold" data-testid="text-logo">{storeName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors" data-testid={`link-nav-${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {showWhatsappInNav && (
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" data-testid="button-whatsapp-nav">
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            )}
            {ctaLabel && (
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                <Button data-testid="button-cta-nav">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
            <Link href="/auth/login">
              <span className="text-sm text-muted-foreground cursor-pointer" data-testid="link-merchant-login-nav">
                Merchant Login
              </span>
            </Link>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={`md:hidden border-t transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        data-testid="nav-mobile"
      >
        <div className="px-4 py-4 space-y-3 bg-background">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground py-1" data-testid={`link-mobile-${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
          {showWhatsappInNav && (
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" className="w-full" data-testid="button-whatsapp-mobile">
                <SiWhatsapp className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </a>
          )}
          {ctaLabel && (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full" data-testid="button-cta-mobile">
                {ctaLabel}
              </Button>
            </a>
          )}
          <Link href="/auth/login">
            <span className="block text-sm text-muted-foreground py-1 cursor-pointer" data-testid="link-merchant-login-mobile">
              Merchant Login
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
