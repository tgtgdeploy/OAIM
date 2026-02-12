import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/lib/theme-provider";
import {
  Shield,
  Store,
  Users,
  ArrowRight,
  Moon,
  Sun,
  Eye,
  EyeOff,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const demoAccounts = [
  {
    role: "superadmin",
    label: "Super Admin",
    desc: "Platform management & all tenants",
    icon: Shield,
    email: "admin@oaim.io",
    path: "/superadmin",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-500/20",
  },
  {
    role: "merchant",
    label: "Merchant",
    desc: "Business dashboard & sales tools",
    icon: Store,
    email: "demo@merchant.com",
    path: "/app",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    role: "member",
    label: "Member",
    desc: "Customer portal & orders",
    icon: Users,
    email: "member@demo.com",
    path: "/member",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20",
  },
];

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleDemoLogin(path: string) {
    navigate(path);
  }

  function handleFormLogin(e: React.FormEvent) {
    e.preventDefault();
    navigate("/app");
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-emerald-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZWMTJINDJIMCA2IDIuNjg2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
              <SiWhatsapp className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">OAIM</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              One AI Management
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              WhatsApp-first AI sales platform for e-commerce and restaurant businesses. Manage conversations, automate sales, and grow revenue.
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
              <h2 className="text-2xl font-bold" data-testid="text-login-title">Sign in to your account</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials or use a demo account below
              </p>
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Demo Accounts
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {demoAccounts.map((account) => (
                <Card
                  key={account.role}
                  role="button"
                  tabIndex={0}
                  className={`cursor-pointer hover-elevate border ${account.borderColor}`}
                  onClick={() => handleDemoLogin(account.path)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDemoLogin(account.path); }}
                  data-testid={`button-demo-${account.role}`}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${account.color}`}>
                      <account.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{account.label}</p>
                      <p className="text-xs text-muted-foreground">{account.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/register">
                <span className="text-primary font-medium cursor-pointer" data-testid="link-register">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
