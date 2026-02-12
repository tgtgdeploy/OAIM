import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "./layout";
import {
  ArrowRight,
  Store,
  UtensilsCrossed,
  TrendingUp,
  MessageSquare,
  ShoppingCart,
  Users,
  Sparkles,
  ExternalLink,
  Package,
  CreditCard,
  Truck,
  ChefHat,
  CalendarDays,
  Bike,
  LayoutGrid,
  Receipt,
  Scissors,
  Clock,
  UserCheck,
} from "lucide-react";

const templates = [
  {
    id: "ecommerce",
    href: "/templates/ecommerce",
    industry: "E-Commerce",
    icon: Store,
    color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    title: "E-Commerce Template",
    desc: "Complete online store management with product catalog, payment processing, and logistics integration — all powered by WhatsApp sales.",
    features: [
      { icon: Package, label: "Product Management" },
      { icon: CreditCard, label: "Payment Processing" },
      { icon: Truck, label: "Shipping & Logistics" },
      { icon: ShoppingCart, label: "Order Tracking" },
    ],
  },
  {
    id: "fnb",
    href: "/templates/fnb",
    industry: "F&B / Restaurant",
    icon: UtensilsCrossed,
    color: "bg-orange-500/10 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    title: "Restaurant Template",
    desc: "Full restaurant operations from digital menu to table management, reservations, delivery, and checkout — with WhatsApp ordering built in.",
    features: [
      { icon: ChefHat, label: "Menu Management" },
      { icon: CalendarDays, label: "Reservation System" },
      { icon: Bike, label: "Delivery & Takeaway" },
      { icon: LayoutGrid, label: "Table Management" },
      { icon: Receipt, label: "Checkout & Billing" },
    ],
  },
  {
    id: "beauty",
    href: "/templates/beauty",
    industry: "Beauty & Wellness",
    icon: Sparkles,
    color: "bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400",
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    title: "Beauty & Massage Template",
    desc: "Streamlined salon and spa management with appointment booking, therapist scheduling, service duration tracking — powered by WhatsApp.",
    features: [
      { icon: CalendarDays, label: "Booking & Appointment" },
      { icon: UserCheck, label: "Therapist Management" },
      { icon: Clock, label: "Session & Duration" },
      { icon: Scissors, label: "Service Catalog" },
    ],
  },
];

const cases = [
  {
    id: "fashion-store",
    industry: "ecommerce" as const,
    title: "Fashion Wholesale Supplier",
    subtitle: "How a fashion supplier increased order volume by 180% with WhatsApp AI",
    metrics: [
      { label: "Order Volume", value: "+180%", icon: ShoppingCart },
      { label: "Response Time", value: "< 30s", icon: MessageSquare },
      { label: "Conversion Rate", value: "42%", icon: TrendingUp },
      { label: "Active Customers", value: "1,200+", icon: Users },
    ],
    challenge: "Managing hundreds of daily WhatsApp inquiries manually, losing orders due to slow responses and forgotten follow-ups.",
    solution: "Deployed OAIM with e-commerce template. AI handles price quoting, stock checks, and order confirmation. Auto follow-ups recover abandoned inquiries.",
    results: "180% increase in monthly orders within 3 months. Average response time dropped from 15 minutes to under 30 seconds.",
  },
  {
    id: "restaurant-chain",
    industry: "restaurant" as const,
    title: "Local Restaurant Chain (3 Locations)",
    subtitle: "Tripled delivery orders by automating WhatsApp ordering and re-engagement",
    metrics: [
      { label: "Delivery Orders", value: "3x", icon: ShoppingCart },
      { label: "Repeat Customers", value: "+60%", icon: Users },
      { label: "Reservation Rate", value: "85%", icon: TrendingUp },
      { label: "Avg Response", value: "< 10s", icon: MessageSquare },
    ],
    challenge: "Taking orders via phone calls and manual WhatsApp. Losing reservations, no way to re-engage past customers.",
    solution: "Deployed restaurant template with digital menu, reservation system, and 14-day re-engagement campaigns for dormant customers.",
    results: "3x more delivery orders per week. 60% increase in repeat customers through automated re-engagement messages.",
  },
  {
    id: "beauty-salon",
    industry: "beauty" as const,
    title: "Premium Beauty & Spa Studio",
    subtitle: "Doubled bookings with automated WhatsApp appointment management and therapist scheduling",
    metrics: [
      { label: "Bookings", value: "+110%", icon: CalendarDays },
      { label: "No-Show Rate", value: "-80%", icon: TrendingUp },
      { label: "Repeat Clients", value: "72%", icon: Users },
      { label: "Revenue", value: "+65%", icon: ShoppingCart },
    ],
    challenge: "Manual appointment booking via phone and WhatsApp. Frequent double-bookings, no-shows, and therapist scheduling conflicts.",
    solution: "Deployed beauty template with WhatsApp booking, automated reminders, therapist availability management, and post-visit follow-ups.",
    results: "110% more bookings per month. No-show rate dropped by 80% with WhatsApp reminders 24h and 1h before appointments.",
  },
];

function getIndustryBadge(industry: string) {
  if (industry === "ecommerce") return { icon: Store, label: "E-Commerce", variant: "default" as const };
  if (industry === "restaurant") return { icon: UtensilsCrossed, label: "Restaurant", variant: "secondary" as const };
  return { icon: Sparkles, label: "Beauty & Wellness", variant: "outline" as const };
}

export default function CasesPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-cases-title">
            Industry Templates & Success Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our ready-made templates for different industries and see real results from businesses using OAIM.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-templates-heading">Industry Templates</h2>
            <Badge variant="secondary">Live Preview</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <Card key={tpl.id} className="hover-elevate overflow-visible flex flex-col" data-testid={`card-template-${tpl.id}`}>
                <CardContent className="p-0 flex flex-col flex-1">
                  <div className={`h-36 rounded-t-md flex items-center justify-center ${tpl.color.split(" ")[0]}`}>
                    <tpl.icon className={`h-16 w-16 ${tpl.color.split(" ").slice(1).join(" ")} opacity-60`} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <Badge variant="outline" className={`self-start mb-3 ${tpl.badgeColor}`} data-testid={`badge-template-${tpl.id}`}>
                      <tpl.icon className="h-3 w-3 mr-1" />
                      {tpl.industry}
                    </Badge>
                    <h3 className="text-lg font-bold mb-2" data-testid={`text-template-title-${tpl.id}`}>{tpl.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{tpl.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {tpl.features.map((feat) => (
                        <div key={feat.label} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 rounded-md px-2 py-1">
                          <feat.icon className="h-3 w-3 shrink-0" />
                          {feat.label}
                        </div>
                      ))}
                    </div>
                    <Link href={tpl.href}>
                      <Button className="w-full" variant="outline" data-testid={`button-preview-${tpl.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Demo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" data-testid="text-cases-heading">Customer Success Stories</h2>
          <div className="space-y-8">
            {cases.map((c) => {
              const badge = getIndustryBadge(c.industry);
              return (
                <Card key={c.id} data-testid={`card-case-${c.id}`}>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <Badge variant={badge.variant}>
                        <badge.icon className="h-3 w-3 mr-1" />
                        {badge.label}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2" data-testid={`text-case-title-${c.id}`}>{c.title}</h2>
                    <p className="text-muted-foreground mb-6">{c.subtitle}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {c.metrics.map((m) => (
                        <div key={m.label} className="bg-muted/50 rounded-md p-3 text-center">
                          <m.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                          <div className="text-xl font-bold">{m.value}</div>
                          <div className="text-xs text-muted-foreground">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-destructive mb-1">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{c.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1">Solution</h4>
                        <p className="text-sm text-muted-foreground">{c.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-chart-2 mb-1">Results</h4>
                        <p className="text-sm text-muted-foreground">{c.results}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/app/onboarding">
            <Button size="lg" data-testid="button-cases-trial">
              Start Your Success Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
