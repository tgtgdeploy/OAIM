import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "./layout";
import { CheckCircle2, ArrowRight, Crown, Zap, Store, UtensilsCrossed, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PricingPage() {
  const { t } = useTranslation("marketing");

  const plans = [
    {
      name: t("pricing.trial"),
      price: t("pricing.trialPrice"),
      period: t("pricing.trialPeriod"),
      description: t("pricing.trialDesc"),
      features: [
        t("pricing.trialF1"),
        t("pricing.trialF2"),
        t("pricing.trialF3"),
        t("pricing.trialF4"),
      ],
      cta: t("pricing.trialCta"),
      popular: false,
      gradient: "",
      link: "/app/onboarding",
    },
    {
      name: t("pricing.starter"),
      price: t("pricing.starterPrice"),
      period: t("pricing.starterPeriod"),
      description: t("pricing.starterDesc"),
      features: [
        t("pricing.starterF1"),
        t("pricing.starterF2"),
        t("pricing.starterF3"),
        t("pricing.starterF4"),
        t("pricing.starterF5"),
        t("pricing.starterF6"),
      ],
      cta: t("pricing.starterCta"),
      popular: false,
      gradient: "",
      link: "/app/onboarding",
    },
    {
      name: t("pricing.pro"),
      price: t("pricing.proPrice"),
      period: t("pricing.proPeriod"),
      description: t("pricing.proDesc"),
      features: [
        t("pricing.proF1"),
        t("pricing.proF2"),
        t("pricing.proF3"),
        t("pricing.proF4"),
        t("pricing.proF5"),
        t("pricing.proF6"),
      ],
      cta: t("pricing.proCta"),
      popular: true,
      gradient: "gradient-border",
      link: "/app/onboarding",
    },
    {
      name: t("pricing.business"),
      price: t("pricing.businessPrice"),
      period: t("pricing.businessPeriod"),
      description: t("pricing.businessDesc"),
      features: [
        t("pricing.businessF1"),
        t("pricing.businessF2"),
        t("pricing.businessF3"),
        t("pricing.businessF4"),
        t("pricing.businessF5"),
        t("pricing.businessF6"),
        t("pricing.businessF7"),
      ],
      cta: t("pricing.businessCta"),
      popular: false,
      gradient: "",
      link: "/contact",
    },
  ];

  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 dark:from-primary/10 dark:to-violet-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Crown className="h-3 w-3 mr-1" />
              {t("pricing.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-pricing-title">
              {t("pricing.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative overflow-visible ${plan.popular ? "border-primary" : ""} ${plan.gradient} animate-fade-in-up delay-${(idx + 1) * 100}`}
                data-testid={`card-plan-${idx}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="animate-pulse-glow">
                      <Zap className="h-3 w-3 mr-1" />
                      {t("pricing.mostPopular")}
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
                  <Link href={plan.link}>
                    <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Industry Features */}
          <div className="mt-16 animate-fade-in-up">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("pricing.industryTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("pricing.industrySubtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: Store,
                  label: t("pricing.industryEcommerceLabel"),
                  features: [t("pricing.industryEcommerceF1"), t("pricing.industryEcommerceF2"), t("pricing.industryEcommerceF3"), t("pricing.industryEcommerceF4")],
                  color: "bg-blue-500/10 dark:bg-blue-400/10",
                  iconColor: "text-blue-600 dark:text-blue-400",
                },
                {
                  icon: UtensilsCrossed,
                  label: t("pricing.industryFnbLabel"),
                  features: [t("pricing.industryFnbF1"), t("pricing.industryFnbF2"), t("pricing.industryFnbF3"), t("pricing.industryFnbF4")],
                  color: "bg-orange-500/10 dark:bg-orange-400/10",
                  iconColor: "text-orange-600 dark:text-orange-400",
                },
                {
                  icon: Sparkles,
                  label: t("pricing.industryBeautyLabel"),
                  features: [t("pricing.industryBeautyF1"), t("pricing.industryBeautyF2"), t("pricing.industryBeautyF3"), t("pricing.industryBeautyF4")],
                  color: "bg-rose-500/10 dark:bg-rose-400/10",
                  iconColor: "text-rose-600 dark:text-rose-400",
                },
              ].map((industry) => (
                <Card key={industry.label}>
                  <CardContent className="p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-md ${industry.color} mb-4`}>
                      <industry.icon className={`h-6 w-6 ${industry.iconColor}`} />
                    </div>
                    <h3 className="font-bold mb-3">{industry.label}</h3>
                    <ul className="space-y-2">
                      {industry.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 animate-fade-in-up">
            <Card className="max-w-2xl mx-auto glass-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">{t("pricing.needCustomPlan")}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t("pricing.customPlanDesc")}
                </p>
                <Link href="/contact">
                  <Button variant="outline">
                    {t("pricing.contactSales")}
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
