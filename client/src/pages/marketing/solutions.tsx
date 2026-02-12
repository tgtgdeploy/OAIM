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
import { useTranslation } from "react-i18next";

import imgEcommerce from "@/assets/images/marketing-ecommerce.jpg";
import imgRestaurant from "@/assets/images/marketing-restaurant.jpg";
import imgBeauty from "@/assets/images/marketing-beauty.jpg";

export default function SolutionsPage() {
  const { t } = useTranslation("marketing");

  const solutions = [
    {
      id: "ecommerce",
      label: t("solutions.ecommerce"),
      icon: Store,
      color: "text-emerald-600 dark:text-emerald-400",
      colorBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
      gradient: "from-emerald-600 to-teal-700",
      image: imgEcommerce,
      tagline: t("solutions.ecommerceTagline"),
      description: t("solutions.ecommerceDesc"),
      features: [
        { icon: MessageSquare, title: t("solutions.ecommerceF1Title"), desc: t("solutions.ecommerceF1Desc") },
        { icon: ShoppingCart, title: t("solutions.ecommerceF2Title"), desc: t("solutions.ecommerceF2Desc") },
        { icon: Truck, title: t("solutions.ecommerceF3Title"), desc: t("solutions.ecommerceF3Desc") },
        { icon: Repeat, title: t("solutions.ecommerceF4Title"), desc: t("solutions.ecommerceF4Desc") },
        { icon: CreditCard, title: t("solutions.ecommerceF5Title"), desc: t("solutions.ecommerceF5Desc") },
        { icon: Tag, title: t("solutions.ecommerceF6Title"), desc: t("solutions.ecommerceF6Desc") },
      ],
      templateItems: [
        t("solutions.ecommerceT1"), t("solutions.ecommerceT2"), t("solutions.ecommerceT3"), t("solutions.ecommerceT4"),
        t("solutions.ecommerceT5"), t("solutions.ecommerceT6"), t("solutions.ecommerceT7"), t("solutions.ecommerceT8"),
      ],
    },
    {
      id: "restaurant",
      label: t("solutions.fnb"),
      icon: UtensilsCrossed,
      color: "text-orange-600 dark:text-orange-400",
      colorBg: "bg-orange-500/10 dark:bg-orange-400/10",
      gradient: "from-orange-600 to-amber-700",
      image: imgRestaurant,
      tagline: t("solutions.fnbTagline"),
      description: t("solutions.fnbDesc"),
      features: [
        { icon: ChefHat, title: t("solutions.fnbF1Title"), desc: t("solutions.fnbF1Desc") },
        { icon: CalendarDays, title: t("solutions.fnbF2Title"), desc: t("solutions.fnbF2Desc") },
        { icon: Truck, title: t("solutions.fnbF3Title"), desc: t("solutions.fnbF3Desc") },
        { icon: Star, title: t("solutions.fnbF4Title"), desc: t("solutions.fnbF4Desc") },
        { icon: Bot, title: t("solutions.fnbF5Title"), desc: t("solutions.fnbF5Desc") },
        { icon: BarChart3, title: t("solutions.fnbF6Title"), desc: t("solutions.fnbF6Desc") },
      ],
      templateItems: [
        t("solutions.fnbT1"), t("solutions.fnbT2"), t("solutions.fnbT3"), t("solutions.fnbT4"),
        t("solutions.fnbT5"), t("solutions.fnbT6"), t("solutions.fnbT7"), t("solutions.fnbT8"),
      ],
    },
    {
      id: "beauty",
      label: t("solutions.beauty"),
      icon: Sparkles,
      color: "text-rose-600 dark:text-rose-400",
      colorBg: "bg-rose-500/10 dark:bg-rose-400/10",
      gradient: "from-rose-600 to-pink-700",
      image: imgBeauty,
      tagline: t("solutions.beautyTagline"),
      description: t("solutions.beautyDesc"),
      features: [
        { icon: CalendarDays, title: t("solutions.beautyF1Title"), desc: t("solutions.beautyF1Desc") },
        { icon: UserCheck, title: t("solutions.beautyF2Title"), desc: t("solutions.beautyF2Desc") },
        { icon: Scissors, title: t("solutions.beautyF3Title"), desc: t("solutions.beautyF3Desc") },
        { icon: Clock, title: t("solutions.beautyF4Title"), desc: t("solutions.beautyF4Desc") },
        { icon: Star, title: t("solutions.beautyF5Title"), desc: t("solutions.beautyF5Desc") },
        { icon: Bot, title: t("solutions.beautyF6Title"), desc: t("solutions.beautyF6Desc") },
      ],
      templateItems: [
        t("solutions.beautyT1"), t("solutions.beautyT2"), t("solutions.beautyT3"), t("solutions.beautyT4"),
        t("solutions.beautyT5"), t("solutions.beautyT6"), t("solutions.beautyT7"), t("solutions.beautyT8"),
      ],
    },
  ];

  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 dark:from-primary/10 dark:to-orange-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Layers className="h-3 w-3 mr-1" />
              {t("solutions.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-solutions-title">
              {t("solutions.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("solutions.subtitle")}
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
                    <h2 className="text-3xl font-bold mb-3" data-testid={`text-solution-title-${sol.id}`}>{sol.label} {t("solutions.solution")}</h2>
                    <p className="text-lg text-muted-foreground mb-2">{sol.tagline}</p>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{sol.description}</p>
                    <div className="flex gap-3 flex-wrap">
                      <Link href={`/templates/${sol.id === "restaurant" ? "fnb" : sol.id}`}>
                        <Button data-testid={`button-preview-${sol.id}`}>
                          {t("solutions.viewStorefront")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/auth/login?role=merchant&industry=${sol.id === "restaurant" ? "fnb" : sol.id}`}>
                        <Button variant="outline" data-testid={`button-try-${sol.id}`}>
                          {t("solutions.tryBackend")}
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
                    <h3 className="text-base font-semibold mb-4">{t("solutions.whatsIncluded", { label: sol.label })}</h3>
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
                {t("solutions.startFreeTrial")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
