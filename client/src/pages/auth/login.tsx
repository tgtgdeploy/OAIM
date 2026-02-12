import { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme-provider";
import {
  Shield,
  Store,
  Users,
  ArrowRight,
  ArrowLeft,
  Moon,
  Sun,
  Eye,
  EyeOff,
  UtensilsCrossed,
  Sparkles,
  Package,
  ChefHat,
  Scissors,
  CreditCard,
  Truck,
  CalendarDays,
  Bike,
  LayoutGrid,
  Receipt,
  UserCheck,
  Clock,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

type Step = "choose-role" | "choose-industry" | "login-form";
type Role = "superadmin" | "merchant" | "member";
type Industry = "ecommerce" | "fnb" | "beauty";

const roles = [
  {
    id: "superadmin" as Role,
    label: "Super Admin",
    desc: "Platform management — manage all tenants, plans, and modules",
    icon: Shield,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-500/20",
    path: "/superadmin",
  },
  {
    id: "merchant" as Role,
    label: "Merchant Dashboard",
    desc: "Business management — choose your industry to enter the backend",
    icon: Store,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20",
    path: "/app",
  },
  {
    id: "member" as Role,
    label: "Member Portal",
    desc: "Customer portal — orders, loyalty, referrals, and account",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20",
    path: "/member",
  },
];

const industryOptions = [
  {
    id: "ecommerce" as Industry,
    label: "E-Commerce",
    desc: "Product catalog, payments, shipping & order management",
    icon: Store,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20",
    modules: [
      { icon: Package, label: "Products" },
      { icon: CreditCard, label: "Payments" },
      { icon: Truck, label: "Shipping" },
    ],
  },
  {
    id: "fnb" as Industry,
    label: "F&B / Restaurant",
    desc: "Menu, reservations, delivery, table management & checkout",
    icon: UtensilsCrossed,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-500/20",
    modules: [
      { icon: ChefHat, label: "Menu" },
      { icon: CalendarDays, label: "Reservations" },
      { icon: Bike, label: "Delivery" },
      { icon: LayoutGrid, label: "Tables" },
      { icon: Receipt, label: "Checkout" },
    ],
  },
  {
    id: "beauty" as Industry,
    label: "Beauty & Wellness",
    desc: "Booking, therapist scheduling, services & session management",
    icon: Sparkles,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/20",
    modules: [
      { icon: CalendarDays, label: "Booking" },
      { icon: UserCheck, label: "Therapists" },
      { icon: Scissors, label: "Services" },
      { icon: Clock, label: "Sessions" },
    ],
  },
];

export default function LoginPage() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = new URLSearchParams(search);
  const queryRole = params.get("role") as Role | null;
  const queryIndustry = params.get("industry") as Industry | null;

  const [step, setStep] = useState<Step>("choose-role");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    if (queryRole === "merchant") {
      setSelectedRole("merchant");
      setStep("choose-industry");
    } else if (queryRole === "member") {
      setSelectedRole("member");
      setStep("choose-role");
    }
  }, [queryRole]);

  function handleRoleSelect(role: Role) {
    setSelectedRole(role);
    if (role === "merchant") {
      setStep("choose-industry");
    } else {
      const r = roles.find((r) => r.id === role);
      if (r) navigate(r.path);
    }
  }

  function handleIndustrySelect(industry: Industry) {
    navigate("/app");
  }

  function handleFormLogin(e: React.FormEvent) {
    e.preventDefault();
    navigate("/app");
  }

  function handleBack() {
    if (step === "choose-industry") {
      setStep("choose-role");
      setSelectedRole(null);
    } else if (step === "login-form") {
      setStep("choose-role");
      setSelectedRole(null);
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-emerald-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZWMTJINGNIMCA2IDIuNjg2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
                <SiWhatsapp className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">OAIM</span>
            </div>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              One AI Management
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              WhatsApp-first AI sales platform for e-commerce, restaurant, and beauty businesses. Manage conversations, automate sales, and grow revenue.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                AI-powered sales scripts for your industry
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Multi-tenant SaaS with full CRM pipeline
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                WhatsApp automation + Meta ads integration
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
          <Link href="/">
            <div className="flex items-center gap-2 lg:hidden cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <SiWhatsapp className="h-4 w-4" />
              </div>
              <span className="font-bold">OAIM</span>
            </div>
          </Link>
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

            {step === "choose-role" && (
              <>
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold" data-testid="text-login-title">Welcome to OAIM</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose your portal to continue
                  </p>
                </div>

                <div className="space-y-3">
                  {roles.map((role) => (
                    <Card
                      key={role.id}
                      role="button"
                      tabIndex={0}
                      className={`cursor-pointer hover-elevate overflow-visible border ${role.borderColor}`}
                      onClick={() => handleRoleSelect(role.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleRoleSelect(role.id); }}
                      data-testid={`button-role-${role.id}`}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${role.color}`}>
                          <role.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or sign in with credentials
                    </span>
                  </div>
                </div>

                <form onSubmit={handleFormLogin} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/forgot-password">
                        <span className="text-xs text-primary cursor-pointer" data-testid="link-forgot-password">
                          Forgot password?
                        </span>
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  <Button type="submit" className="w-full" data-testid="button-login">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/auth/register">
                    <span className="text-primary font-medium cursor-pointer" data-testid="link-register">
                      Sign up
                    </span>
                  </Link>
                </p>
              </>
            )}

            {step === "choose-industry" && (
              <>
                <div className="space-y-2">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-back-to-roles"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </button>
                  <h2 className="text-2xl font-bold" data-testid="text-industry-title">Select Your Industry</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose your business type to see the matching management backend
                  </p>
                </div>

                <div className="space-y-3">
                  {industryOptions.map((ind) => (
                    <Card
                      key={ind.id}
                      role="button"
                      tabIndex={0}
                      className={`cursor-pointer hover-elevate overflow-visible border ${ind.borderColor}`}
                      onClick={() => handleIndustrySelect(ind.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleIndustrySelect(ind.id); }}
                      data-testid={`button-industry-${ind.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${ind.color}`}>
                            <ind.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">{ind.label}</p>
                            <p className="text-xs text-muted-foreground">{ind.desc}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3 ml-15 pl-15">
                          {ind.modules.map((mod) => (
                            <Badge key={mod.label} variant="outline" className="text-[10px] px-1.5 py-0 gap-1">
                              <mod.icon className="h-2.5 w-2.5" />
                              {mod.label}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
