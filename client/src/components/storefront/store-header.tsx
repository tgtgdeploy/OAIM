import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Zap, Users, Store } from "lucide-react";
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
  industry?: "ecommerce" | "fnb" | "beauty";
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
  industry = "ecommerce",
}: StoreHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const merchantLoginHref = `/auth/login?role=merchant&industry=${industry}`;
  const memberLoginHref = `/auth/login?role=member&industry=${industry}`;

  return (
    <>
      <div className="w-full bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <Link href="/">
            <div className="flex items-center gap-1.5 cursor-pointer" data-testid="link-oaim-topbar">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-primary to-emerald-500">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-tight">OAIM</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="text-[11px] text-white/60 cursor-pointer hidden sm:inline" data-testid="link-oaim-homepage">
                Visit OAIM to explore more solutions
              </span>
            </Link>
            <Link href={memberLoginHref}>
              <span className="flex items-center gap-1 text-[11px] text-white/80 cursor-pointer" data-testid="link-member-login-topbar">
                <Users className="h-3 w-3" />
                Member
              </span>
            </Link>
            <Link href={merchantLoginHref}>
              <span className="flex items-center gap-1 text-[11px] text-white/80 cursor-pointer" data-testid="link-merchant-login-topbar">
                <Store className="h-3 w-3" />
                Merchant
              </span>
            </Link>
          </div>
        </div>
      </div>

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
            <div className="flex gap-3 pt-2 border-t">
              <Link href={memberLoginHref} className="flex-1">
                <Button variant="outline" className="w-full" data-testid="link-member-login-mobile">
                  <Users className="mr-2 h-4 w-4" />
                  Member Login
                </Button>
              </Link>
              <Link href={merchantLoginHref} className="flex-1">
                <Button variant="outline" className="w-full" data-testid="link-merchant-login-mobile">
                  <Store className="mr-2 h-4 w-4" />
                  Merchant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
