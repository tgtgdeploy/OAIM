import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/lib/theme-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Store,
  UtensilsCrossed,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function RegisterPage() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authSignUp = useAuthStore((s) => s.signUp);

  const benefits = [
    t("register.leftPanel.benefit1"),
    t("register.leftPanel.benefit2"),
    t("register.leftPanel.benefit3"),
    t("register.leftPanel.benefit4"),
  ];

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);
    try {
      const { error } = await authSignUp(email, password, {
        full_name: name,
        phone,
        business_type: businessType,
      });
      if (error) {
        setAuthError(error);
        return;
      }
      navigate("/app/onboarding");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-emerald-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZWMTJINGJIMCA2IDIuNjg2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
              <SiWhatsapp className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">OAIM</span>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                {t("register.leftPanel.heading1")}<br />{t("register.leftPanel.heading2")}
              </h1>
              <p className="text-lg text-white/80 max-w-md">
                {t("register.leftPanel.description")}
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col items-center gap-1">
                <Store className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/50">{t("register.leftPanel.ecommerce")}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <UtensilsCrossed className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/50">{t("register.leftPanel.fnb")}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShoppingCart className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/50">{t("register.leftPanel.retail")}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/40">
            {t("register.leftPanel.copyright")}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <SiWhatsapp className="h-4 w-4" />
            </div>
            <span className="font-bold">OAIM</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSwitcher />
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold" data-testid="text-register-title">{t("register.title")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("register.subtitle")}
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("register.fullName")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("register.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("register.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("register.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("register.whatsappNumber")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("register.phonePlaceholder")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-type">{t("register.businessType")}</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger data-testid="select-business-type">
                    <SelectValue placeholder={t("register.businessTypePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">{t("register.businessTypes.ecommerce")}</SelectItem>
                    <SelectItem value="fnb">{t("register.businessTypes.fnb")}</SelectItem>
                    <SelectItem value="retail">{t("register.businessTypes.retail")}</SelectItem>
                    <SelectItem value="services">{t("register.businessTypes.services")}</SelectItem>
                    <SelectItem value="other">{t("register.businessTypes.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("register.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("register.passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <p className="text-sm text-destructive text-center">{authError}</p>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-register">
                {isSubmitting ? "Creating account..." : t("register.createAccount")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {t("register.termsPrefix")}{" "}
                <span className="text-primary cursor-pointer">{t("register.termsOfService")}</span>
                {" "}{t("register.and")}{" "}
                <span className="text-primary cursor-pointer">{t("register.privacyPolicy")}</span>
              </p>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("register.or")}
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {t("register.hasAccount")}{" "}
              <Link href="/auth/login">
                <span className="text-primary font-medium cursor-pointer" data-testid="link-login">
                  {t("register.signIn")}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
