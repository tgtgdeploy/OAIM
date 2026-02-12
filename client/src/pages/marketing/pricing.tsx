import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "./layout";
import { CheckCircle2, X, ArrowRight, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Trial",
    price: "Free",
    period: "14 days",
    description: "Try OAIM with basic WhatsApp + AI",
    features: [
      { name: "WhatsApp Inbox", included: true },
      { name: "AI Sales Script (Basic)", included: true },
      { name: "Up to 100 messages/month", included: true },
      { name: "1 user", included: true },
      { name: "CRM Pipeline", included: false },
      { name: "Auto Follow-up", included: false },
      { name: "ERP Lite", included: false },
      { name: "Meta Ads & ROI", included: false },
      { name: "Team & Permissions", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
    gradient: "",
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Add CRM to manage your sales pipeline",
    features: [
      { name: "WhatsApp Inbox", included: true },
      { name: "AI Sales Script (Full)", included: true },
      { name: "Up to 1,000 messages/month", included: true },
      { name: "2 users", included: true },
      { name: "CRM Pipeline", included: true },
      { name: "Auto Follow-up", included: false },
      { name: "ERP Lite", included: false },
      { name: "Meta Ads & ROI", included: false },
      { name: "Team & Permissions", included: false },
    ],
    cta: "Get Started",
    popular: false,
    gradient: "",
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Full automation with follow-ups and orders",
    features: [
      { name: "WhatsApp Inbox", included: true },
      { name: "AI Sales Script (Full)", included: true },
      { name: "Up to 5,000 messages/month", included: true },
      { name: "5 users", included: true },
      { name: "CRM Pipeline", included: true },
      { name: "Auto Follow-up", included: true },
      { name: "ERP Lite", included: true },
      { name: "Meta Ads & ROI", included: false },
      { name: "Team & Permissions", included: false },
    ],
    cta: "Upgrade to Pro",
    popular: true,
    gradient: "gradient-border",
  },
  {
    name: "Business",
    price: "$149",
    period: "/month",
    description: "Everything + ads tracking and team management",
    features: [
      { name: "WhatsApp Inbox", included: true },
      { name: "AI Sales Script (Full)", included: true },
      { name: "Unlimited messages", included: true },
      { name: "Unlimited users", included: true },
      { name: "CRM Pipeline", included: true },
      { name: "Auto Follow-up", included: true },
      { name: "ERP Lite", included: true },
      { name: "Meta Ads & ROI", included: true },
      { name: "Team & Permissions", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "",
  },
];

export default function PricingPage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 dark:from-primary/10 dark:to-violet-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Crown className="h-3 w-3 mr-1" />
              Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-pricing-title">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start free, upgrade when you're ready. All plans include WhatsApp integration and AI-powered sales scripts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan, idx) => (
              <Card
                key={plan.name}
                className={`relative overflow-visible ${plan.popular ? "border-primary" : ""} ${plan.gradient} animate-fade-in-up delay-${(idx + 1) * 100}`}
                data-testid={`card-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="animate-pulse-glow">
                      <Zap className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-bold ${plan.popular ? "gradient-text" : ""}`}>{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <Link href={plan.name === "Business" ? "/contact" : "/app/onboarding"}>
                    <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f.name} className="flex items-center gap-2 text-sm">
                        {f.included ? (
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/30 flex-shrink-0" />
                        )}
                        <span className={f.included ? "" : "text-muted-foreground/50"}>
                          {f.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in-up">
            <Card className="max-w-2xl mx-auto glass-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Need a custom plan?</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  For larger teams or specific requirements, we offer tailored solutions with custom pricing and dedicated support.
                </p>
                <Link href="/contact">
                  <Button variant="outline">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
