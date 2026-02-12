import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "./layout";
import {
  Store,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Bot,
  ShoppingCart,
  Repeat,
  BarChart3,
  Truck,
  CreditCard,
  Tag,
  CalendarDays,
  ChefHat,
  Star,
  Scissors,
  UserCheck,
  Clock,
  Layers,
} from "lucide-react";

import imgEcommerce from "@/assets/images/marketing-ecommerce.jpg";
import imgRestaurant from "@/assets/images/marketing-restaurant.jpg";
import imgBeauty from "@/assets/images/marketing-beauty.jpg";

const solutions = [
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: Store,
    color: "text-emerald-600 dark:text-emerald-400",
    colorBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    gradient: "from-emerald-600 to-teal-700",
    image: imgEcommerce,
    tagline: "Turn WhatsApp inquiries into confirmed orders",
    description: "Transform your online store with AI-powered WhatsApp sales. From product catalog to payment processing and logistics — manage everything in one place.",
    features: [
      { icon: MessageSquare, title: "Instant Price Quoting", desc: "AI reads product inquiries and instantly sends price, stock status, and product images." },
      { icon: ShoppingCart, title: "Order via Chat", desc: "Customers place orders directly in WhatsApp. Auto-create order records with COD or prepaid options." },
      { icon: Truck, title: "Logistics Tracking", desc: "Send shipping updates and tracking links automatically when order status changes." },
      { icon: Repeat, title: "Abandoned Cart Recovery", desc: "Re-engage customers who showed interest but didn't complete the purchase." },
      { icon: CreditCard, title: "COD Management", desc: "Handle cash-on-delivery orders with confirmation flow and delivery coordination." },
      { icon: Tag, title: "Smart Product Tags", desc: "Auto-tag contacts based on interests, purchase history, and interaction patterns." },
    ],
    templateItems: [
      "Pre-built AI script for product inquiries",
      "Pipeline: New > Quoted > Confirmed > Shipped > Completed",
      "Tags: Hot Lead, Repeat Buyer, COD, VIP",
      "Follow-up sequence: Day 1, Day 3, Day 7",
      "Product catalog with CSV import",
      "Order management with status tracking",
      "Revenue dashboard",
      "WhatsApp template messages",
    ],
  },
  {
    id: "restaurant",
    label: "F&B / Restaurant",
    icon: UtensilsCrossed,
    color: "text-orange-600 dark:text-orange-400",
    colorBg: "bg-orange-500/10 dark:bg-orange-400/10",
    gradient: "from-orange-600 to-amber-700",
    image: imgRestaurant,
    tagline: "Serve more customers with less effort",
    description: "Digitize your restaurant operations from menu to checkout. Manage reservations, table layouts, delivery orders, and billing — all connected to WhatsApp.",
    features: [
      { icon: ChefHat, title: "Digital Menu", desc: "Share your menu via WhatsApp with categories, prices, and photos." },
      { icon: CalendarDays, title: "Table Reservation", desc: "Accept reservations through WhatsApp with automatic confirmation and reminders." },
      { icon: Truck, title: "Delivery Orders", desc: "Take delivery orders with address collection, payment options, and ETA updates." },
      { icon: Star, title: "Loyalty & Re-engagement", desc: "Track visit frequency, send special offers to dormant customers, build loyalty." },
      { icon: Bot, title: "AI Menu Assistant", desc: "AI answers menu questions, suggests dishes, handles dietary restrictions." },
      { icon: BarChart3, title: "Revenue Insights", desc: "Track daily orders, popular items, peak hours, and customer patterns." },
    ],
    templateItems: [
      "AI script for menu inquiries & reservations",
      "Pipeline: Inquiry > Reserved > Dined > Follow-up",
      "Tags: Regular, VIP, Birthday, Delivery",
      "Re-engagement: 14-day & 30-day dormant alerts",
      "Menu items with categories",
      "Reservation management",
      "Daily revenue tracking",
      "Customer preference notes",
    ],
  },
  {
    id: "beauty",
    label: "Beauty & Wellness",
    icon: Sparkles,
    color: "text-rose-600 dark:text-rose-400",
    colorBg: "bg-rose-500/10 dark:bg-rose-400/10",
    gradient: "from-rose-600 to-pink-700",
    image: imgBeauty,
    tagline: "Grow your salon with automated WhatsApp booking",
    description: "Streamline your beauty business with automated booking, therapist scheduling, and session management. Reduce no-shows with WhatsApp reminders.",
    features: [
      { icon: CalendarDays, title: "Smart Booking", desc: "Online booking via WhatsApp with available slots, auto-confirmation, and calendar sync." },
      { icon: UserCheck, title: "Therapist Management", desc: "Therapist profiles, specialties, schedules, availability tracking, and performance stats." },
      { icon: Scissors, title: "Service Catalog", desc: "Organize services by category with pricing tiers, add-ons, and combo packages." },
      { icon: Clock, title: "Session & Duration", desc: "Configure service durations, buffer times, room/bed allocation, and daily capacity." },
      { icon: Star, title: "Client Loyalty", desc: "Track visit history, send birthday offers, build long-term relationships automatically." },
      { icon: Bot, title: "AI Receptionist", desc: "AI handles booking inquiries, suggests services, and manages cancellations 24/7." },
    ],
    templateItems: [
      "AI script for booking inquiries & slot suggestions",
      "Pipeline: Inquiry > Booked > Visited > Follow-up",
      "Tags: Regular, VIP, Birthday, New Client",
      "Reminders: 24h and 1h before appointments",
      "Service catalog with pricing tiers",
      "Therapist scheduling & availability",
      "Package deals management",
      "Client history & preferences",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 dark:from-primary/10 dark:to-orange-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Layers className="h-3 w-3 mr-1" />
              Solutions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-solutions-title">
              Industry Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pre-configured templates with industry-specific AI scripts, tags, pipeline stages, and automated workflows.
            </p>
          </div>

          <div className="space-y-24">
            {solutions.map((sol, idx) => (
              <div key={sol.id} id={sol.id} className="animate-fade-in-up" data-testid={`section-solution-${sol.id}`}>
                <div className="grid md:grid-cols-2 gap-6 mb-8 items-center">
                  <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                    <Badge variant="secondary" className={`mb-4 ${sol.colorBg} ${sol.color} border-transparent`}>
                      <sol.icon className="h-3 w-3 mr-1" />
                      {sol.label}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-3" data-testid={`text-solution-title-${sol.id}`}>{sol.label} Solution</h2>
                    <p className="text-lg text-muted-foreground mb-2">{sol.tagline}</p>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{sol.description}</p>
                    <div className="flex gap-3 flex-wrap">
                      <Link href={`/templates/${sol.id === "restaurant" ? "fnb" : sol.id}`}>
                        <Button data-testid={`button-preview-${sol.id}`}>
                          View Storefront
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/auth/login?role=merchant&industry=${sol.id === "restaurant" ? "fnb" : sol.id}`}>
                        <Button variant="outline" data-testid={`button-try-${sol.id}`}>
                          Try Backend
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className={`relative overflow-hidden rounded-md ${idx % 2 === 1 ? "md:order-1" : ""}`}>
                    <img src={sol.image} alt={sol.label} className="w-full h-64 md:h-72 object-cover" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${sol.gradient} opacity-40`} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {sol.features.map((feat) => (
                    <Card key={feat.title} className="overflow-visible" data-testid={`card-${sol.id}-${feat.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <CardContent className="p-5">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${sol.colorBg} mb-3`}>
                          <feat.icon className={`h-4 w-4 ${sol.color}`} />
                        </div>
                        <h3 className="font-semibold mb-1 text-sm">{feat.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className={`${sol.colorBg} border-transparent`}>
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-base font-semibold mb-4">What's Included in the {sol.label} Template</h3>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {sol.templateItems.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className={`h-4 w-4 ${sol.color} mt-0.5 flex-shrink-0`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {idx < solutions.length - 1 && <div className="mt-16 border-b" />}
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in-up">
            <Link href="/app/onboarding">
              <Button size="lg" data-testid="button-solutions-trial">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
