import { useState } from "react";
import { Link, useLocation } from "wouter";
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

const benefits = [
  "Free 14-day trial, no credit card required",
  "AI sales scripts for your industry",
  "WhatsApp Business API integration",
  "Full CRM with pipeline management",
];

export default function RegisterPage() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    navigate("/app/onboarding");
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
                Start selling smarter<br />with WhatsApp AI
              </h1>
              <p className="text-lg text-white/80 max-w-md">
                Join hundreds of businesses using OAIM to automate sales and boost revenue through WhatsApp.
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
                <span className="text-xs text-white/50">E-commerce</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <UtensilsCrossed className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/50">F&B</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShoppingCart className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/50">Retail</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/40">
            &copy; 2026 OAIM. All rights reserved.
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
              <h2 className="text-2xl font-bold" data-testid="text-register-title">Create your account</h2>
              <p className="text-sm text-muted-foreground">
                Get started with a 14-day free trial
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+60 12-345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-type">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger data-testid="select-business-type">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="fnb">Food & Beverage</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              <Button type="submit" className="w-full" data-testid="button-register">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our{" "}
                <span className="text-primary cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-primary cursor-pointer">Privacy Policy</span>
              </p>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login">
                <span className="text-primary font-medium cursor-pointer" data-testid="link-login">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
