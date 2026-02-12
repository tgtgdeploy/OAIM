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
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  Globe,
  Headphones,
  Star,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import imgEcommerce from "@/assets/images/marketing-ecommerce.jpg";
import imgRestaurant from "@/assets/images/marketing-restaurant.jpg";
import imgBeauty from "@/assets/images/marketing-beauty.jpg";

const modules = [
  { icon: MessageSquare, title: "WhatsApp Inbox", desc: "Unified inbox for all WhatsApp conversations with smart routing and team collaboration.", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { icon: Bot, title: "AI Sales Script", desc: "Industry-specific AI scripts that close deals automatically with personalized conversations.", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { icon: Users, title: "CRM Pipeline", desc: "Visual sales funnel from first inquiry to closed deal, with smart tags and segmentation.", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { icon: Repeat, title: "Auto Follow-up", desc: "Scheduled follow-ups that never let a lead go cold. Re-engage at the perfect moment.", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { icon: ShoppingCart, title: "ERP Lite", desc: "Products, orders, and inventory management — simple, effective, and fully integrated.", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  { icon: BarChart3, title: "Meta Ads & ROI", desc: "Track ad leads and measure real return on every marketing dollar you spend.", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
];

const stats = [
  { value: "3x", label: "Faster Response", icon: Zap },
  { value: "67%", label: "Higher Conversion", icon: TrendingUp },
  { value: "5min", label: "Setup Time", icon: Clock },
  { value: "99.9%", label: "Uptime", icon: Shield },
];

const industries = [
  { icon: Store, label: "E-Commerce", desc: "Product catalog, payments, shipping, order tracking — all powered by WhatsApp AI", image: imgEcommerce, href: "/templates/ecommerce", color: "from-emerald-600 to-teal-700" },
  { icon: UtensilsCrossed, label: "F&B / Restaurant", desc: "Menu, reservations, delivery, table management — digitize your restaurant operations", image: imgRestaurant, href: "/templates/fnb", color: "from-orange-600 to-amber-700" },
  { icon: Sparkles, label: "Beauty & Wellness", desc: "Booking, therapist scheduling, services, packages — grow your salon business", image: imgBeauty, href: "/templates/beauty", color: "from-rose-600 to-pink-700" },
];

const testimonials = [
  { name: "Ahmad Razak", role: "Owner, Fashion Hub KL", text: "OAIM transformed our WhatsApp sales. We went from manually replying to 50+ daily messages to having AI handle 80% automatically. Revenue doubled in 3 months.", rating: 5 },
  { name: "Lisa Chen", role: "Manager, The Noodle House", text: "Our reservations are now fully automated through WhatsApp. Customers love it, and we reduced no-shows by 60%. The delivery integration is seamless.", rating: 5 },
  { name: "Priya Kaur", role: "Founder, Glow Beauty Studio", text: "Booking management used to be a nightmare. Now clients book via WhatsApp, get automatic reminders, and we've grown our repeat customer base by 40%.", rating: 5 },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card/50" data-testid="section-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/8 dark:bg-primary/15 blur-3xl animate-float" />
          <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/6 dark:bg-cyan-400/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/4 left-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/4 dark:bg-violet-400/8 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,transparent_30%,hsl(var(--background))_70%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-6 animate-fade-in-down" data-testid="badge-hero">
                <span className="glow-dot mr-2" />
                WhatsApp-First AI Sales Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] animate-fade-in-up" data-testid="text-hero-title">
                Turn WhatsApp into Your{" "}
                <span className="gradient-text">AI Sales Engine</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl animate-fade-in-up delay-200" data-testid="text-hero-subtitle">
                OAIM helps e-commerce, restaurant, and beauty businesses automate customer conversations, manage sales pipelines, and close deals — all through WhatsApp with AI.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 animate-fade-in-up delay-300">
                <Link href="/app/onboarding">
                  <Button size="lg" className="text-base" data-testid="button-hero-trial">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-base" data-testid="button-hero-demo">
                    Book a Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 animate-fade-in-up delay-400">
                <div className="flex -space-x-2">
                  {["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-amber-500"].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-background flex items-center justify-center`}>
                      <span className="text-[10px] font-bold text-white">{["AR", "LC", "PK", "JT"][i]}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> businesses trust OAIM
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in-right delay-300">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-cyan-500/10 to-violet-500/10 rounded-2xl blur-xl" />

                <div className="relative glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-600">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold">OAIM Dashboard</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Conversations", val: "128", icon: MessageSquare, accent: "text-emerald-500" },
                      { label: "Conversion", val: "67%", icon: TrendingUp, accent: "text-blue-500" },
                      { label: "Revenue", val: "$12.4k", icon: BarChart3, accent: "text-violet-500" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg bg-background/60 p-3 text-center">
                        <s.icon className={`h-4 w-4 mx-auto mb-1.5 ${s.accent}`} />
                        <div className="text-lg font-bold">{s.val}</div>
                        <div className="text-[10px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-background/60 p-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Recent Messages</span>
                      <SiWhatsapp className="h-3 w-3 text-emerald-500" />
                    </div>
                    {[
                      { name: "Sarah K.", msg: "Hi, can I order 3x Rose Gold Set?", time: "2m ago", status: "bg-emerald-500" },
                      { name: "David L.", msg: "What time can I book tomorrow?", time: "5m ago", status: "bg-blue-500" },
                      { name: "Mei Lin", msg: "Do you deliver to PJ area?", time: "8m ago", status: "bg-amber-500" },
                    ].map((chat, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-md p-2 hover-elevate">
                        <div className={`w-7 h-7 rounded-full ${chat.status} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-[9px] font-bold text-white">{chat.name.split(" ").map(w => w[0]).join("")}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-medium truncate">{chat.name}</span>
                            <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.time}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{chat.msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-gradient-to-r from-primary/10 to-cyan-500/10 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium">AI Auto-reply</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      "Hi Sarah! The Rose Gold Set is RM189. Free shipping for orders above RM150. Would you like to proceed with the order?"
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 glass-card rounded-lg p-3 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold">Order Confirmed</div>
                      <div className="text-[10px] text-muted-foreground">Auto-processed by AI</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-3 -left-3 glass-card rounded-lg p-2.5 animate-float" style={{ animationDelay: "3s" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="glow-dot" />
                    <span className="text-[10px] font-medium">3 leads captured today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card/80 backdrop-blur-sm" data-testid="section-stats">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={`text-center animate-count-up delay-${(idx + 1) * 100}`} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mx-auto mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24" data-testid="section-modules">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Modular Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-modules-title">
            Everything You Need to Sell on WhatsApp
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modular tools you can unlock as your business grows. Start free, scale when ready.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, idx) => (
            <Card key={mod.title} className={`hover-elevate overflow-visible transition-all animate-fade-in-up delay-${(idx + 1) * 100}`} data-testid={`card-module-${mod.title.toLowerCase().replace(/\s/g, "-")}`}>
              <CardContent className="p-6">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${mod.color} mb-4`}>
                  <mod.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
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

      <section className="bg-card/50 border-y" data-testid="section-industries">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Globe className="h-3 w-3 mr-1" />
              Industry Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-industries-title">
              Built for Your Industry
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pre-configured templates with AI scripts, workflows, and storefronts tailored to your business type.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {industries.map((ind, idx) => (
              <Card key={ind.label} className={`overflow-visible hover-elevate group animate-fade-in-up delay-${(idx + 1) * 200}`} data-testid={`card-industry-${ind.label.toLowerCase().replace(/[\s\/&]/g, "-")}`}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-md">
                    <img src={ind.image} alt={ind.label} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${ind.color} opacity-60`} />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
                        <ind.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-semibold text-sm">{ind.label}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{ind.desc}</p>
                    <Link href={ind.href}>
                      <Button variant="outline" className="w-full" data-testid={`button-view-${ind.label.toLowerCase().replace(/[\s\/&]/g, "-")}`}>
                        View Template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24" data-testid="section-how-it-works">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            <Clock className="h-3 w-3 mr-1" />
            Quick Setup
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-how-title">
            Up and Running in 3 Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No technical skills needed. Connect WhatsApp, pick your template, start selling.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Connect WhatsApp", desc: "Link your WhatsApp Business number with our Cloud API integration in one click. Instant setup, no coding required." },
            { step: "2", title: "Choose Your Template", desc: "Pick an industry template — E-commerce, Restaurant, or Beauty — with pre-built AI scripts and workflows." },
            { step: "3", title: "Start Selling", desc: "AI handles customer conversations, your CRM fills up, orders come in automatically. Watch your revenue grow." },
          ].map((item, idx) => (
            <div key={item.step} className={`text-center animate-fade-in-up delay-${(idx + 1) * 200}`} data-testid={`step-${item.step}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white font-bold text-xl mx-auto mb-4 animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              {idx < 2 && (
                <div className="hidden md:block mt-4">
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30 mx-auto rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card/50 border-y" data-testid="section-testimonials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              Trusted by Growing Businesses
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how businesses across Southeast Asia are scaling with OAIM.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <Card key={t.name} className={`overflow-visible animate-fade-in-up delay-${(idx + 1) * 200}`} data-testid={`card-testimonial-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-600 to-teal-700 dark:from-primary/90 dark:via-emerald-700 dark:to-teal-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-cta-title">
              Ready to Transform Your Sales?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join hundreds of businesses using OAIM to automate their WhatsApp sales process.
              Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/app/onboarding">
                <Button size="lg" variant="secondary" className="text-base" data-testid="button-cta-trial">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-base border-white/20 text-white bg-white/10 backdrop-blur-sm" data-testid="button-cta-whatsapp">
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
