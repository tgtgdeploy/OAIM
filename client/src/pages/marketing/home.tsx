import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "./layout";
import {
  MessageSquare,
  Bot,
  Users,
  ShoppingCart,
  BarChart3,
  Repeat,
  ArrowRight,
  CheckCircle2,
  Store,
  UtensilsCrossed,
  Zap,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const modules = [
  {
    icon: MessageSquare,
    title: "WhatsApp Inbox",
    desc: "Unified inbox for all WhatsApp conversations with smart routing",
  },
  {
    icon: Bot,
    title: "AI Sales Script",
    desc: "Industry-specific AI scripts that close deals automatically",
  },
  {
    icon: Users,
    title: "CRM Pipeline",
    desc: "Visual sales funnel from inquiry to closed deal",
  },
  {
    icon: Repeat,
    title: "Auto Follow-up",
    desc: "Scheduled follow-ups that never let a lead go cold",
  },
  {
    icon: ShoppingCart,
    title: "ERP Lite",
    desc: "Products, orders, inventory — simple and effective",
  },
  {
    icon: BarChart3,
    title: "Meta Ads & ROI",
    desc: "Track ad leads and measure real return on investment",
  },
];

const stats = [
  { value: "3x", label: "Faster Response", icon: Zap },
  { value: "67%", label: "Higher Conversion", icon: TrendingUp },
  { value: "5min", label: "Setup Time", icon: Clock },
  { value: "99.9%", label: "Uptime", icon: Shield },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 dark:from-primary/10 dark:to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
              <SiWhatsapp className="h-3 w-3 mr-1" />
              WhatsApp-First AI Sales Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight" data-testid="text-hero-title">
              Turn WhatsApp into Your{" "}
              <span className="text-primary">AI Sales Engine</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              OAIM helps e-commerce and restaurant businesses automate customer conversations,
              manage sales pipelines, and close deals — all through WhatsApp with AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/app/onboarding">
                <Button size="lg" className="text-base px-8" data-testid="button-hero-trial">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-hero-demo">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-modules-title">
            Everything You Need to Sell on WhatsApp
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modular tools you can unlock as your business grows. Start free, scale when ready.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Card key={mod.title} className="hover-elevate transition-all" data-testid={`card-module-${mod.title.toLowerCase().replace(/\s/g, "-")}`}>
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-4">
                  <mod.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground">{mod.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <Button variant="outline" data-testid="button-view-modules">
              View All Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-card border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-industries-title">
              Built for Your Industry
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pre-configured templates for e-commerce and restaurant businesses.
              Get started in minutes with industry-specific workflows.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-visible hover-elevate" data-testid="card-industry-ecommerce">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500/10 dark:bg-blue-400/10 mb-4">
                  <Store className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">E-commerce</h3>
                <p className="text-muted-foreground mb-4">
                  Price inquiries, instant stock replies, COD handling, abandoned cart recovery, and logistics tracking.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Auto price quoting", "Stock availability check", "COD order management", "Abandoned cart recovery"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/solutions#ecommerce">
                  <Button variant="outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-industry-restaurant">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-500/10 dark:bg-orange-400/10 mb-4">
                  <UtensilsCrossed className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Restaurant</h3>
                <p className="text-muted-foreground mb-4">
                  Menu sharing, table reservations, delivery orders, loyalty programs, and re-engagement campaigns.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Digital menu sharing", "Table reservation system", "Delivery order tracking", "Customer re-engagement"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/solutions#restaurant">
                  <Button variant="outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-how-title">
            Up and Running in 3 Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No technical skills needed. Connect WhatsApp, pick your template, start selling.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Connect WhatsApp",
              desc: "Link your WhatsApp Business number with our Cloud API integration in one click.",
            },
            {
              step: "2",
              title: "Choose Your Template",
              desc: "Pick an industry template (E-commerce or Restaurant) with pre-built AI scripts and workflows.",
            },
            {
              step: "3",
              title: "Start Selling",
              desc: "AI handles customer conversations, your CRM fills up, orders come in automatically.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center" data-testid={`step-${item.step}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Transform Your Sales?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join hundreds of businesses using OAIM to automate their WhatsApp sales process.
            Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/app/onboarding">
              <Button size="lg" variant="secondary" className="text-base px-8" data-testid="button-cta-trial">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm" data-testid="button-cta-whatsapp">
                <SiWhatsapp className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
