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
  Shield,
  LogIn,
  Eye,
  CheckCircle2,
  Zap,
  BarChart3,
  Bell,
  Globe,
} from "lucide-react";

const industries = [
  {
    id: "ecommerce",
    templateHref: "/templates/ecommerce",
    industry: "E-Commerce",
    icon: Store,
    accentColor: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    borderColor: "border-emerald-500/30 dark:border-emerald-400/30",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-700",
    title: "E-Commerce Solution",
    tagline: "Complete online sales management powered by WhatsApp AI",
    description: "Transform your online store with AI-powered WhatsApp sales. From product catalog to payment processing and logistics — manage everything in one place while AI handles customer conversations.",
    coreModules: [
      { icon: Package, label: "Product & Catalog", desc: "Full product management with categories, variants, pricing, and inventory tracking" },
      { icon: CreditCard, label: "Payment Processing", desc: "Multi-gateway payment with FPX, credit card, e-wallet, and bank transfer support" },
      { icon: Truck, label: "Shipping & Logistics", desc: "Courier integration with J&T, PosLaju, DHL — auto tracking and delivery notifications" },
      { icon: ShoppingCart, label: "Order Management", desc: "Complete order lifecycle from cart to delivery with real-time status updates" },
    ],
    aiFeatures: [
      "AI auto-replies for product inquiries and pricing",
      "Smart follow-up for abandoned carts via WhatsApp",
      "Automated order confirmation and shipping notifications",
      "Customer segmentation and re-engagement campaigns",
    ],
    previewSections: ["Product Grid", "Category Browsing", "Cart & Checkout", "Order Tracking"],
    successStory: {
      title: "Fashion Wholesale Supplier",
      subtitle: "180% increase in order volume with WhatsApp AI",
      metrics: [
        { label: "Order Volume", value: "+180%", icon: ShoppingCart },
        { label: "Response Time", value: "< 30s", icon: MessageSquare },
        { label: "Conversion", value: "42%", icon: TrendingUp },
        { label: "Customers", value: "1,200+", icon: Users },
      ],
    },
  },
  {
    id: "fnb",
    templateHref: "/templates/fnb",
    industry: "F&B / Restaurant",
    icon: UtensilsCrossed,
    accentColor: "text-orange-600 dark:text-orange-400",
    accentBg: "bg-orange-500/10 dark:bg-orange-400/10",
    badgeColor: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    borderColor: "border-orange-500/30 dark:border-orange-400/30",
    gradientFrom: "from-orange-600",
    gradientTo: "to-amber-700",
    title: "F&B / Restaurant Solution",
    tagline: "Full restaurant operations with WhatsApp ordering built in",
    description: "Digitize your restaurant operations from menu to checkout. Manage reservations, table layouts, delivery orders, and billing — all connected to WhatsApp for seamless customer communication.",
    coreModules: [
      { icon: ChefHat, label: "Menu Management", desc: "Digital menu with categories, pricing, add-ons, availability, and seasonal specials" },
      { icon: CalendarDays, label: "Reservation System", desc: "Online booking via WhatsApp with auto-confirmation, waitlist, and capacity management" },
      { icon: Bike, label: "Delivery & Takeaway", desc: "Delivery order management with rider assignment, real-time tracking, and ETA updates" },
      { icon: LayoutGrid, label: "Table Management", desc: "Visual table layout with real-time status, zone grouping, and guest assignment" },
      { icon: Receipt, label: "Checkout & Billing", desc: "POS-style billing with tax calculation, split bills, and multiple payment methods" },
    ],
    aiFeatures: [
      "WhatsApp ordering with AI menu recommendations",
      "Automated reservation confirmations and reminders",
      "Re-engagement messages for dormant customers",
      "Smart upselling based on order history",
    ],
    previewSections: ["Digital Menu", "Reservation Form", "Delivery Tracking", "Table View"],
    successStory: {
      title: "Local Restaurant Chain (3 Locations)",
      subtitle: "3x more delivery orders with automated WhatsApp ordering",
      metrics: [
        { label: "Delivery Orders", value: "3x", icon: ShoppingCart },
        { label: "Repeat Customers", value: "+60%", icon: Users },
        { label: "Reservations", value: "85%", icon: TrendingUp },
        { label: "Response", value: "< 10s", icon: MessageSquare },
      ],
    },
  },
  {
    id: "beauty",
    templateHref: "/templates/beauty",
    industry: "Beauty & Wellness",
    icon: Sparkles,
    accentColor: "text-rose-600 dark:text-rose-400",
    accentBg: "bg-rose-500/10 dark:bg-rose-400/10",
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    borderColor: "border-rose-500/30 dark:border-rose-400/30",
    gradientFrom: "from-rose-600",
    gradientTo: "to-pink-700",
    title: "Beauty & Wellness Solution",
    tagline: "Salon and spa management with WhatsApp appointment booking",
    description: "Streamline your beauty business with automated booking, therapist scheduling, and session management. Reduce no-shows with WhatsApp reminders and grow repeat clients with personalized follow-ups.",
    coreModules: [
      { icon: CalendarDays, label: "Booking & Appointment", desc: "Online booking via WhatsApp with available slots, auto-confirmation, and calendar sync" },
      { icon: UserCheck, label: "Therapist Management", desc: "Therapist profiles, specialties, schedules, availability tracking, and performance stats" },
      { icon: Clock, label: "Session & Duration", desc: "Configure service durations, buffer times, room/bed allocation, and daily capacity" },
      { icon: Scissors, label: "Service Catalog", desc: "Organize services by category with pricing tiers, add-ons, and combo packages" },
    ],
    aiFeatures: [
      "WhatsApp booking with intelligent slot suggestions",
      "Automated reminders 24h and 1h before appointments",
      "Post-visit follow-ups and rebooking prompts",
      "Personalized treatment recommendations based on history",
    ],
    previewSections: ["Service Menu", "Booking Calendar", "Package Deals", "Gallery"],
    successStory: {
      title: "Premium Beauty & Spa Studio",
      subtitle: "110% more bookings with automated WhatsApp management",
      metrics: [
        { label: "Bookings", value: "+110%", icon: CalendarDays },
        { label: "No-Shows", value: "-80%", icon: TrendingUp },
        { label: "Repeat Clients", value: "72%", icon: Users },
        { label: "Revenue", value: "+65%", icon: ShoppingCart },
      ],
    },
  },
];

export default function CasesPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            <Globe className="h-3 w-3 mr-1" />
            Industry Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-cases-title">
            Choose Your Industry Solution
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each industry comes with a complete management backend, public storefront, and member portal — all connected through WhatsApp AI.
          </p>
        </div>

        <div className="space-y-24">
          {industries.map((ind, idx) => (
            <div key={ind.id} data-testid={`section-industry-${ind.id}`}>
              <div className={`rounded-lg bg-gradient-to-r ${ind.gradientFrom} ${ind.gradientTo} p-6 md:p-8 mb-8`}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                    <ind.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-white/20 text-white border-white/30 mb-2">{ind.industry}</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white" data-testid={`text-industry-title-${ind.id}`}>
                      {ind.title}
                    </h2>
                    <p className="text-white/80 mt-1 max-w-2xl">{ind.tagline}</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 mb-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2" data-testid={`text-features-heading-${ind.id}`}>
                      <Zap className={`h-4 w-4 ${ind.accentColor}`} />
                      Core Management Modules
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{ind.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {ind.coreModules.map((mod) => (
                        <Card key={mod.label} data-testid={`card-module-${ind.id}-${mod.label.toLowerCase().replace(/\s/g, "-")}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${ind.accentBg}`}>
                                <mod.icon className={`h-4 w-4 ${ind.accentColor}`} />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-semibold">{mod.label}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{mod.desc}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <MessageSquare className={`h-4 w-4 ${ind.accentColor}`} />
                      WhatsApp AI Features
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {ind.aiFeatures.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${ind.accentColor}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <Card className={`${ind.borderColor}`}>
                    <CardContent className="p-5">
                      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" data-testid={`text-success-heading-${ind.id}`}>
                        <BarChart3 className={`h-4 w-4 ${ind.accentColor}`} />
                        Success Story
                      </h3>
                      <p className="text-sm font-semibold mb-1">{ind.successStory.title}</p>
                      <p className="text-xs text-muted-foreground mb-4">{ind.successStory.subtitle}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {ind.successStory.metrics.map((m) => (
                          <div key={m.label} className={`rounded-md p-2.5 text-center ${ind.accentBg}`}>
                            <m.icon className={`h-3.5 w-3.5 mx-auto mb-1 ${ind.accentColor}`} />
                            <div className="text-lg font-bold">{m.value}</div>
                            <div className="text-[10px] text-muted-foreground">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                      <Eye className={`h-4 w-4 ${ind.accentColor}`} />
                      Storefront Preview Includes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ind.previewSections.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Card className={`${ind.borderColor}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Try {ind.industry} Template</h3>
                      <p className="text-sm text-muted-foreground">Preview the storefront or log in to explore the management backend</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link href={ind.templateHref}>
                        <Button variant="outline" data-testid={`button-preview-${ind.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Storefront
                        </Button>
                      </Link>
                      <Link href={`/auth/login?role=merchant&industry=${ind.id}`}>
                        <Button data-testid={`button-merchant-login-${ind.id}`}>
                          <Store className="h-4 w-4 mr-2" />
                          Merchant Login
                        </Button>
                      </Link>
                      <Link href={`/auth/login?role=member`}>
                        <Button variant="outline" data-testid={`button-member-login-${ind.id}`}>
                          <Users className="h-4 w-4 mr-2" />
                          Member Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {idx < industries.length - 1 && (
                <div className="mt-16 border-b border-border" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Not sure which template is right for you?</p>
          <Link href="/contact">
            <Button size="lg" variant="outline" data-testid="button-contact-us">
              Contact Us for a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
