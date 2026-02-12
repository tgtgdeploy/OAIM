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
  Star,
  Play,
  Layers,
  BrainCircuit,
  Workflow,
  Target,
  Send,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import heroAiBg from "@/assets/images/hero-ai-bg.png";
import heroPhoneMockup from "@/assets/images/hero-phone-mockup.png";
import imgEcommerce from "@/assets/images/marketing-ecommerce.jpg";
import imgRestaurant from "@/assets/images/marketing-restaurant.jpg";
import imgBeauty from "@/assets/images/marketing-beauty.jpg";

const modules = [
  { icon: MessageSquare, title: "WhatsApp Inbox", desc: "Unified inbox for all customer conversations with smart routing and team collaboration.", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", accent: "from-emerald-500 to-green-600" },
  { icon: BrainCircuit, title: "AI Sales Script", desc: "Industry-specific AI that understands your products and closes deals automatically.", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400", accent: "from-violet-500 to-purple-600" },
  { icon: Target, title: "CRM Pipeline", desc: "Visual sales funnel from first inquiry to closed deal with smart tags and segmentation.", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", accent: "from-blue-500 to-indigo-600" },
  { icon: Workflow, title: "Auto Follow-up", desc: "Scheduled follow-ups that never let a lead go cold. Re-engage at the perfect moment.", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", accent: "from-amber-500 to-orange-600" },
  { icon: ShoppingCart, title: "ERP Lite", desc: "Products, orders, and inventory management — simple, effective, and fully integrated.", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400", accent: "from-rose-500 to-red-600" },
  { icon: BarChart3, title: "Meta Ads & ROI", desc: "Track ad leads and measure real return on every marketing dollar you spend.", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400", accent: "from-cyan-500 to-teal-600" },
];

const stats = [
  { value: "3x", label: "Faster Response Time", icon: Zap },
  { value: "67%", label: "Higher Conversion Rate", icon: TrendingUp },
  { value: "< 5min", label: "Setup Time", icon: Clock },
  { value: "99.9%", label: "Platform Uptime", icon: Shield },
];

const industries = [
  { icon: Store, label: "E-Commerce", desc: "Product catalog, payments, shipping, order tracking — all powered by WhatsApp AI", image: imgEcommerce, href: "/templates/ecommerce", gradient: "from-emerald-600 to-teal-700" },
  { icon: UtensilsCrossed, label: "F&B / Restaurant", desc: "Menu, reservations, delivery, table management — digitize your restaurant operations", image: imgRestaurant, href: "/templates/fnb", gradient: "from-orange-600 to-amber-700" },
  { icon: Sparkles, label: "Beauty & Wellness", desc: "Booking, therapist scheduling, services, packages — grow your salon business", image: imgBeauty, href: "/templates/beauty", gradient: "from-rose-600 to-pink-700" },
];

const testimonials = [
  { name: "Ahmad Razak", role: "Owner, Fashion Hub KL", text: "OAIM transformed our WhatsApp sales. We went from manually replying to 50+ daily messages to having AI handle 80% automatically. Revenue doubled in 3 months.", rating: 5 },
  { name: "Lisa Chen", role: "Manager, The Noodle House", text: "Our reservations are now fully automated through WhatsApp. Customers love it, and we reduced no-shows by 60%. The delivery integration is seamless.", rating: 5 },
  { name: "Priya Kaur", role: "Founder, Glow Beauty Studio", text: "Booking management used to be a nightmare. Now clients book via WhatsApp, get automatic reminders, and we've grown our repeat customer base by 40%.", rating: 5 },
];

const workflow = [
  { step: "01", icon: SiWhatsapp, title: "Customer Messages", desc: "A customer sends a WhatsApp message asking about your product or service." },
  { step: "02", icon: BrainCircuit, title: "AI Processes", desc: "OAIM's AI understands the intent, checks your catalog, and generates a personalized response." },
  { step: "03", icon: Send, title: "Auto Reply", desc: "Instant reply with pricing, availability, and a call-to-action — all within seconds." },
  { step: "04", icon: CheckCircle2, title: "Deal Closed", desc: "Customer confirms, order is created, follow-up scheduled. All automated." },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img src={heroAiBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] rounded-full bg-cyan-500/15 blur-[80px] animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 mb-6 animate-fade-in-down" data-testid="badge-hero">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-white/90">Powered by AI + WhatsApp Cloud API</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-[1.08] text-white animate-fade-in-up" data-testid="text-hero-title">
                Your AI Sales Team
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  on WhatsApp
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/65 mb-8 leading-relaxed max-w-lg animate-fade-in-up delay-200" data-testid="text-hero-subtitle">
                OAIM automates customer conversations, manages your sales pipeline, and closes deals 24/7 — so you can focus on growing your business.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 animate-fade-in-up delay-300">
                <Link href="/app/onboarding">
                  <Button size="lg" className="text-base bg-gradient-to-r from-primary to-emerald-500 border-primary-border" data-testid="button-hero-trial">
                    Start Free — No Card Needed
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-base border-white/15 text-white bg-white/5 backdrop-blur-sm" data-testid="button-hero-demo">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-10 pt-8 border-t border-white/10 animate-fade-in-up delay-400">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"].map((c, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-black/30 flex items-center justify-center`}>
                        <span className="text-[9px] font-bold text-white">{["AR", "LC", "PK", "JT", "ML"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-white/60">
                    <span className="font-semibold text-white">500+</span> businesses
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-white/50 ml-1.5">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center animate-fade-in-right delay-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full border border-primary/10 animate-float opacity-40" style={{ animationDelay: "0s" }} />
                <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-500/10 animate-float opacity-30" style={{ animationDelay: "1.5s" }} />
                <div className="absolute w-[240px] h-[240px] rounded-full border border-violet-500/10 animate-float opacity-20" style={{ animationDelay: "3s" }} />
              </div>
              <div className="relative z-10">
                <img src={heroPhoneMockup} alt="OAIM AI Dashboard" className="w-[280px] md:w-[320px] drop-shadow-2xl animate-float" style={{ animationDelay: "0.5s" }} />

                <div className="absolute -top-4 -right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-3 animate-fade-in-down delay-500">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/50">Revenue Today</div>
                      <div className="text-sm font-bold text-white">RM 12,840</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-3 animate-fade-in-up delay-600">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/20">
                      <BrainCircuit className="h-3.5 w-3.5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/50">AI Replies</div>
                      <div className="text-sm font-bold text-white">128 today</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-16 -translate-y-1/2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-2.5 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[10px] text-white/80 font-medium">Order #1247 confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="relative" data-testid="section-stats">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <Card className="border-border/50 glass-card overflow-visible">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, idx) => (
                  <div key={stat.label} className={`text-center animate-count-up delay-${(idx + 1) * 100}`} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative overflow-hidden" data-testid="section-workflow">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-14 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Workflow className="h-3 w-3 mr-1" />
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-workflow-title">
              From Message to Money in{" "}
              <span className="gradient-text">Seconds</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch how OAIM turns a simple WhatsApp message into a closed deal — fully automated.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {workflow.map((w, idx) => (
              <div key={w.step} className={`relative animate-fade-in-up delay-${(idx + 1) * 100}`} data-testid={`workflow-step-${w.step}`}>
                <Card className="overflow-visible h-full">
                  <CardContent className="p-5 text-center">
                    <div className="text-[10px] font-mono text-primary/60 tracking-widest mb-3">{w.step}</div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 mx-auto mb-4">
                      <w.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-sm">{w.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
                  </CardContent>
                </Card>
                {idx < workflow.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-card border">
                      <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" data-testid="section-modules">
        <div className="absolute inset-0 bg-card/50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 dark:bg-primary/8 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-14 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Layers className="h-3 w-3 mr-1" />
              Modular Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-modules-title">
              Everything You Need to{" "}
              <span className="gradient-text">Sell on WhatsApp</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Modular tools you can unlock as your business grows. Start free, scale when ready.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, idx) => (
              <Card key={mod.title} className={`overflow-visible hover-elevate group animate-fade-in-up delay-${(idx + 1) * 100}`} data-testid={`card-module-${mod.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${mod.accent} flex-shrink-0`}>
                      <mod.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" data-testid="button-view-modules">
                Explore All Modules
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" data-testid="section-industries">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-14 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Globe className="h-3 w-3 mr-1" />
              Industry Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-industries-title">
              Built for{" "}
              <span className="gradient-text">Your Industry</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pre-configured templates with AI scripts, workflows, and storefronts tailored to your business type.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {industries.map((ind, idx) => (
              <Card key={ind.label} className={`overflow-visible hover-elevate group animate-fade-in-up delay-${(idx + 1) * 200}`} data-testid={`card-industry-${ind.label.toLowerCase().replace(/[\s\/&]/g, "-")}`}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-md">
                    <img src={ind.image} alt={ind.label} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${ind.gradient} opacity-50 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md border border-white/10">
                        <ind.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="text-white font-semibold text-sm block">{ind.label}</span>
                        <span className="text-white/50 text-[10px]">AI-Powered Template</span>
                      </div>
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

      <section className="relative overflow-hidden" data-testid="section-testimonials">
        <div className="absolute inset-0 bg-card/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-14 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              Trusted by{" "}
              <span className="gradient-text">Growing Businesses</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how businesses across Southeast Asia are scaling with OAIM.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => (
              <Card key={t.name} className={`overflow-visible animate-fade-in-up delay-${(idx + 1) * 200}`} data-testid={`card-testimonial-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{t.name.split(" ").map(w => w[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 mx-auto mb-6">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-cta-title">
              Ready to Transform Your Sales?
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Join hundreds of businesses using OAIM to automate their WhatsApp sales. Start free today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/app/onboarding">
                <Button size="lg" className="text-base bg-gradient-to-r from-primary to-emerald-500 border-primary-border" data-testid="button-cta-trial">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-base border-white/15 text-white bg-white/5 backdrop-blur-sm" data-testid="button-cta-whatsapp">
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
            <p className="text-xs text-white/30 mt-6">14-day free trial. No credit card. Cancel anytime.</p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
