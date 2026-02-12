import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "./layout";
import {
  Store,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Bot,
  ShoppingCart,
  Repeat,
  Users,
  BarChart3,
  Truck,
  CreditCard,
  Tag,
  CalendarDays,
  ChefHat,
  Star,
} from "lucide-react";

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-solutions-title">
            Industry Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pre-configured templates with industry-specific AI scripts, tags,
            pipeline stages, and automated workflows.
          </p>
        </div>

        <div id="ecommerce" className="mb-20">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500/10 dark:bg-blue-400/10">
              <Store className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">E-commerce</h2>
              <p className="text-muted-foreground">Turn WhatsApp inquiries into confirmed orders</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: MessageSquare,
                title: "Instant Price Quoting",
                desc: "AI reads product inquiries and instantly sends price, stock status, and product images.",
              },
              {
                icon: ShoppingCart,
                title: "Order via Chat",
                desc: "Customers place orders directly in WhatsApp. Auto-create order records with COD or prepaid options.",
              },
              {
                icon: Truck,
                title: "Logistics Tracking",
                desc: "Send shipping updates and tracking links automatically when order status changes.",
              },
              {
                icon: Repeat,
                title: "Abandoned Cart Recovery",
                desc: "Re-engage customers who showed interest but didn't complete the purchase.",
              },
              {
                icon: CreditCard,
                title: "COD Management",
                desc: "Handle cash-on-delivery orders with confirmation flow and delivery coordination.",
              },
              {
                icon: Tag,
                title: "Smart Product Tags",
                desc: "Auto-tag contacts based on interests, purchase history, and interaction patterns.",
              },
            ].map((item) => (
              <Card key={item.title} data-testid={`card-ecom-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardContent className="p-5">
                  <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-500/5 dark:bg-blue-400/5 border-blue-500/10 dark:border-blue-400/10">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4">What's Included in the E-commerce Template</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Pre-built AI script for product inquiries",
                  "Pipeline: New → Quoted → Confirmed → Shipped → Completed",
                  "Tags: Hot Lead, Repeat Buyer, COD, VIP",
                  "Follow-up sequence: Day 1, Day 3, Day 7",
                  "Product catalog with CSV import",
                  "Order management with status tracking",
                  "Revenue dashboard",
                  "WhatsApp template messages",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="restaurant" className="mb-12">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-500/10 dark:bg-orange-400/10">
              <UtensilsCrossed className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Restaurant</h2>
              <p className="text-muted-foreground">Serve more customers with less effort</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: ChefHat,
                title: "Digital Menu",
                desc: "Share your menu via WhatsApp with categories, prices, and photos.",
              },
              {
                icon: CalendarDays,
                title: "Table Reservation",
                desc: "Accept reservations through WhatsApp with automatic confirmation and reminders.",
              },
              {
                icon: Truck,
                title: "Delivery Orders",
                desc: "Take delivery orders with address collection, payment options, and ETA updates.",
              },
              {
                icon: Star,
                title: "Loyalty & Re-engagement",
                desc: "Track visit frequency, send special offers to dormant customers, build loyalty.",
              },
              {
                icon: Bot,
                title: "AI Menu Assistant",
                desc: "AI answers menu questions, suggests dishes, handles dietary restrictions.",
              },
              {
                icon: BarChart3,
                title: "Revenue Insights",
                desc: "Track daily orders, popular items, peak hours, and customer patterns.",
              },
            ].map((item) => (
              <Card key={item.title} data-testid={`card-rest-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardContent className="p-5">
                  <item.icon className="h-5 w-5 text-orange-600 dark:text-orange-400 mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-orange-500/5 dark:bg-orange-400/5 border-orange-500/10 dark:border-orange-400/10">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4">What's Included in the Restaurant Template</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI script for menu inquiries & reservations",
                  "Pipeline: Inquiry → Reserved → Dined → Follow-up",
                  "Tags: Regular, VIP, Birthday, Delivery",
                  "Re-engagement: 14-day & 30-day dormant alerts",
                  "Menu items with categories",
                  "Reservation management",
                  "Daily revenue tracking",
                  "Customer preference notes",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/app/onboarding">
            <Button size="lg" data-testid="button-solutions-trial">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
