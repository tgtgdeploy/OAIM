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
} from "lucide-react";

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
    id: "electronics-shop",
    industry: "ecommerce" as const,
    title: "Electronics Retailer",
    subtitle: "From chaos to organized sales pipeline with CRM and auto follow-ups",
    metrics: [
      { label: "Revenue Growth", value: "+95%", icon: TrendingUp },
      { label: "Follow-up Rate", value: "100%", icon: MessageSquare },
      { label: "Pipeline Deals", value: "350+", icon: ShoppingCart },
      { label: "Team Members", value: "8", icon: Users },
    ],
    challenge: "Sales team of 8 people using personal WhatsApp with no tracking, no pipeline visibility, and no follow-up system.",
    solution: "Centralized all conversations into OAIM inbox. Set up CRM pipeline with stages. Automated 3-day and 7-day follow-up sequences.",
    results: "95% revenue growth in 6 months. Zero leads fall through the cracks with 100% automated follow-up coverage.",
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
    id: "cafe-bistro",
    industry: "restaurant" as const,
    title: "Premium Cafe & Bistro",
    subtitle: "Building a loyal customer base with AI-powered WhatsApp engagement",
    metrics: [
      { label: "Customer Retention", value: "+75%", icon: Users },
      { label: "Table Bookings", value: "+120%", icon: TrendingUp },
      { label: "Monthly Revenue", value: "+45%", icon: ShoppingCart },
      { label: "Review Score", value: "4.8/5", icon: MessageSquare },
    ],
    challenge: "New cafe struggling to build repeat customers. No systematic way to collect feedback or promote specials.",
    solution: "Used OAIM for reservation management, post-visit feedback collection, and targeted promotions based on customer preferences.",
    results: "75% improvement in customer retention. Table bookings up 120% through WhatsApp-based reservation system.",
  },
];

export default function CasesPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-cases-title">
            Customer Success Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses like yours are using OAIM to transform their WhatsApp sales process.
          </p>
        </div>

        <div className="space-y-8">
          {cases.map((c) => (
            <Card key={c.id} data-testid={`card-case-${c.id}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant={c.industry === "ecommerce" ? "default" : "secondary"}>
                    {c.industry === "ecommerce" ? (
                      <Store className="h-3 w-3 mr-1" />
                    ) : (
                      <UtensilsCrossed className="h-3 w-3 mr-1" />
                    )}
                    {c.industry === "ecommerce" ? "E-commerce" : "Restaurant"}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">{c.title}</h2>
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
          ))}
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
