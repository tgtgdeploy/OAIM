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
  UsersRound,
  Lock,
} from "lucide-react";

const products = [
  {
    id: "whatsapp-ai",
    icon: MessageSquare,
    title: "WhatsApp Inbox",
    badge: "Core",
    badgeVariant: "default" as const,
    description: "A unified inbox that brings all WhatsApp conversations into one place. Smart routing, real-time notifications, and team collaboration built in.",
    features: [
      "Multi-agent inbox with conversation assignment",
      "Real-time message sync via Cloud API",
      "Quick reply templates",
      "Media support (images, documents, voice)",
      "Contact auto-creation from new messages",
      "Conversation search and filters",
    ],
  },
  {
    id: "ai-script",
    icon: Bot,
    title: "AI Sales Script",
    badge: "Core",
    badgeVariant: "default" as const,
    description: "Industry-specific AI scripts that understand your products, pricing, and policies. Automatically respond to customer inquiries and guide them toward a purchase.",
    features: [
      "E-commerce: price quoting, stock check, COD handling",
      "Restaurant: menu sharing, reservation, delivery",
      "Customizable tone and sales goals",
      "FAQ auto-answers from your product catalog",
      "Promotion and discount rule engine",
      "Script versioning and A/B testing",
    ],
  },
  {
    id: "crm",
    icon: Users,
    title: "CRM Pipeline",
    badge: "Starter+",
    badgeVariant: "secondary" as const,
    description: "Visual sales funnel to track every customer from first inquiry to closed deal. Tag, segment, and manage your contacts effortlessly.",
    features: [
      "4-stage pipeline: Inquiry → Quoted → Follow-up → Closed",
      "Custom tags and contact segmentation",
      "Contact timeline with full history",
      "Bulk actions and filters",
      "Pipeline analytics and conversion rates",
      "Export contacts to CSV",
    ],
  },
  {
    id: "followup",
    icon: Repeat,
    title: "Auto Follow-up",
    badge: "Pro+",
    badgeVariant: "secondary" as const,
    description: "Never let a hot lead go cold. Schedule automated follow-ups based on time, customer stage, or actions. Re-engage dormant customers at scale.",
    features: [
      "Time-based follow-up sequences",
      "Stage-triggered automations",
      "Custom message templates per trigger",
      "Follow-up calendar view",
      "Overdue alerts and reminders",
      "Performance tracking per sequence",
    ],
  },
  {
    id: "erp",
    icon: ShoppingCart,
    title: "ERP Lite",
    badge: "Pro+",
    badgeVariant: "secondary" as const,
    description: "Lightweight product, order, and inventory management. Perfect for small businesses that need just enough structure without enterprise complexity.",
    features: [
      "Product catalog with categories",
      "Order creation and status tracking",
      "Basic inventory management",
      "CSV import for products",
      "Order history per contact",
      "Simple revenue reporting",
    ],
  },
  {
    id: "ads",
    icon: BarChart3,
    title: "Meta Ads & ROI",
    badge: "Business",
    badgeVariant: "outline" as const,
    description: "Connect your Meta ad campaigns and track leads all the way to conversion. See real ROI for every dollar spent on advertising.",
    features: [
      "Meta ad lead import (Click-to-WhatsApp)",
      "Lead-to-sale attribution tracking",
      "Campaign performance dashboard",
      "Cost per lead and cost per sale metrics",
      "Ad spend vs revenue reports",
      "UTM parameter tracking",
    ],
  },
  {
    id: "team",
    icon: UsersRound,
    title: "Team & Permissions",
    badge: "Business",
    badgeVariant: "outline" as const,
    description: "Multi-user access with role-based permissions. Assign agents to conversations, track performance, and manage your team from one place.",
    features: [
      "Role-based access control (Owner, Admin, Staff)",
      "Agent performance metrics",
      "Conversation assignment and transfer",
      "Team activity log",
      "Custom permission sets",
      "Multi-location support",
    ],
  },
];

export default function ProductsPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Lock className="h-3 w-3 mr-1" />
            Modular & Unlockable
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-products-title">
            Product Modules
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with WhatsApp + AI, unlock more modules as your business grows.
            Every module integrates seamlessly with the rest.
          </p>
        </div>

        <div className="space-y-8">
          {products.map((product, index) => (
            <Card key={product.id} id={product.id} className="overflow-visible" data-testid={`card-product-${product.id}`}>
              <CardContent className="p-6 md:p-8">
                <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                        <product.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{product.title}</h2>
                      <Badge variant={product.badgeVariant}>{product.badge}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-80 flex-shrink-0">
                    <div className="rounded-md bg-muted/50 border border-border/50 h-48 md:h-full flex items-center justify-center">
                      <product.icon className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/pricing">
            <Button size="lg" data-testid="button-view-pricing">
              View Pricing Plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
