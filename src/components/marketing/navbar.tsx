import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu, X, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const navLinkKeys = [
  { key: "products", href: "/products" },
  { key: "solutions", href: "/solutions" },
  { key: "pricing", href: "/pricing" },
  { key: "cases", href: "/cases" },
  { key: "contact", href: "/contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation("marketing");

  return (
    <nav className="sticky top-0 z-50 border-b glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-600">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">OAIM</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinkKeys.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm ${location === link.href ? "bg-accent" : ""}`}
                  data-testid={`link-nav-${link.key}`}
                >
                  {t(`navbar.${link.key}`)}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="outline" data-testid="button-login">
                {t("navbar.logIn")}
              </Button>
            </Link>
            <Link href="/auth/register" className="hidden sm:block">
              <Button data-testid="button-free-trial">
                {t("navbar.freeTrial")}
              </Button>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden border-t bg-background transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col p-4 gap-1">
          {navLinkKeys.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className="w-full justify-start mobile-touch-target"
                onClick={() => setMobileOpen(false)}
                data-testid={`link-mobile-${link.key}`}
              >
                {t(`navbar.${link.key}`)}
              </Button>
            </Link>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t">
            <Link href="/auth/login" className="flex-1">
              <Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>
                {t("navbar.logIn")}
              </Button>
            </Link>
            <Link href="/auth/register" className="flex-1">
              <Button className="w-full" onClick={() => setMobileOpen(false)}>
                {t("navbar.freeTrial")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
