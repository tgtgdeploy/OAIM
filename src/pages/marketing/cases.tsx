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
import { useTranslation } from "react-i18next";

export default function CasesPage() {
  const { t } = useTranslation("marketing");

  const industries = [
    {
      id: "ecommerce",
      templateHref: "/templates/ecommerce",
      industry: t("cases.ecommerce"),
      icon: Store,
      accentColor: "text-emerald-600 dark:text-emerald-400",
      accentBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
      borderColor: "border-emerald-500/30 dark:border-emerald-400/30",
      gradientFrom: "from-emerald-600",
      gradientTo: "to-teal-700",
      title: t("cases.ecommerceTitle"),
      tagline: t("cases.ecommerceTagline"),
      description: t("cases.ecommerceDesc"),
      coreModules: [
        { icon: Package, label: t("cases.ecommerceM1Label"), desc: t("cases.ecommerceM1Desc") },
        { icon: CreditCard, label: t("cases.ecommerceM2Label"), desc: t("cases.ecommerceM2Desc") },
        { icon: Truck, label: t("cases.ecommerceM3Label"), desc: t("cases.ecommerceM3Desc") },
        { icon: ShoppingCart, label: t("cases.ecommerceM4Label"), desc: t("cases.ecommerceM4Desc") },
      ],
      aiFeatures: [
        t("cases.ecommerceAi1"), t("cases.ecommerceAi2"), t("cases.ecommerceAi3"), t("cases.ecommerceAi4"),
      ],
      previewSections: [t("cases.ecommercePreview1"), t("cases.ecommercePreview2"), t("cases.ecommercePreview3"), t("cases.ecommercePreview4")],
      successStory: {
        title: t("cases.ecommerceStoryTitle"),
        subtitle: t("cases.ecommerceStorySubtitle"),
        metrics: [
          { label: t("cases.ecommerceStoryM1"), value: "+180%", icon: ShoppingCart },
          { label: t("cases.ecommerceStoryM2"), value: "< 30s", icon: MessageSquare },
          { label: t("cases.ecommerceStoryM3"), value: "42%", icon: TrendingUp },
          { label: t("cases.ecommerceStoryM4"), value: "1,200+", icon: Users },
        ],
      },
    },
    {
      id: "fnb",
      templateHref: "/templates/fnb",
      industry: t("cases.fnb"),
      icon: UtensilsCrossed,
      accentColor: "text-orange-600 dark:text-orange-400",
      accentBg: "bg-orange-500/10 dark:bg-orange-400/10",
      badgeColor: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
      borderColor: "border-orange-500/30 dark:border-orange-400/30",
      gradientFrom: "from-orange-600",
      gradientTo: "to-amber-700",
      title: t("cases.fnbTitle"),
      tagline: t("cases.fnbTagline"),
      description: t("cases.fnbDesc"),
      coreModules: [
        { icon: ChefHat, label: t("cases.fnbM1Label"), desc: t("cases.fnbM1Desc") },
        { icon: CalendarDays, label: t("cases.fnbM2Label"), desc: t("cases.fnbM2Desc") },
        { icon: Bike, label: t("cases.fnbM3Label"), desc: t("cases.fnbM3Desc") },
        { icon: LayoutGrid, label: t("cases.fnbM4Label"), desc: t("cases.fnbM4Desc") },
        { icon: Receipt, label: t("cases.fnbM5Label"), desc: t("cases.fnbM5Desc") },
      ],
      aiFeatures: [
        t("cases.fnbAi1"), t("cases.fnbAi2"), t("cases.fnbAi3"), t("cases.fnbAi4"),
      ],
      previewSections: [t("cases.fnbPreview1"), t("cases.fnbPreview2"), t("cases.fnbPreview3"), t("cases.fnbPreview4")],
      successStory: {
        title: t("cases.fnbStoryTitle"),
        subtitle: t("cases.fnbStorySubtitle"),
        metrics: [
          { label: t("cases.fnbStoryM1"), value: "3x", icon: ShoppingCart },
          { label: t("cases.fnbStoryM2"), value: "+60%", icon: Users },
          { label: t("cases.fnbStoryM3"), value: "85%", icon: TrendingUp },
          { label: t("cases.fnbStoryM4"), value: "< 10s", icon: MessageSquare },
        ],
      },
    },
    {
      id: "beauty",
      templateHref: "/templates/beauty",
      industry: t("cases.beauty"),
      icon: Sparkles,
      accentColor: "text-rose-600 dark:text-rose-400",
      accentBg: "bg-rose-500/10 dark:bg-rose-400/10",
      badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
      borderColor: "border-rose-500/30 dark:border-rose-400/30",
      gradientFrom: "from-rose-600",
      gradientTo: "to-pink-700",
      title: t("cases.beautyTitle"),
      tagline: t("cases.beautyTagline"),
      description: t("cases.beautyDesc"),
      coreModules: [
        { icon: CalendarDays, label: t("cases.beautyM1Label"), desc: t("cases.beautyM1Desc") },
        { icon: UserCheck, label: t("cases.beautyM2Label"), desc: t("cases.beautyM2Desc") },
        { icon: Clock, label: t("cases.beautyM3Label"), desc: t("cases.beautyM3Desc") },
        { icon: Scissors, label: t("cases.beautyM4Label"), desc: t("cases.beautyM4Desc") },
      ],
      aiFeatures: [
        t("cases.beautyAi1"), t("cases.beautyAi2"), t("cases.beautyAi3"), t("cases.beautyAi4"),
      ],
      previewSections: [t("cases.beautyPreview1"), t("cases.beautyPreview2"), t("cases.beautyPreview3"), t("cases.beautyPreview4")],
      successStory: {
        title: t("cases.beautyStoryTitle"),
        subtitle: t("cases.beautyStorySubtitle"),
        metrics: [
          { label: t("cases.beautyStoryM1"), value: "+110%", icon: CalendarDays },
          { label: t("cases.beautyStoryM2"), value: "-80%", icon: TrendingUp },
          { label: t("cases.beautyStoryM3"), value: "72%", icon: Users },
          { label: t("cases.beautyStoryM4"), value: "+65%", icon: ShoppingCart },
        ],
      },
    },
  ];

  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            <Globe className="h-3 w-3 mr-1" />
            {t("cases.badge")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-cases-title">
            {t("cases.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("cases.subtitle")}
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
                      {t("cases.coreManagementModules")}
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
                      {t("cases.whatsappAiFeatures")}
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
                        {t("cases.successStory")}
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
                      {t("cases.storefrontPreview")}
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
                      <h3 className="font-semibold mb-1">{t("cases.tryTemplate", { industry: ind.industry })}</h3>
                      <p className="text-sm text-muted-foreground">{t("cases.tryTemplateDesc")}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link href={ind.templateHref}>
                        <Button variant="outline" data-testid={`button-preview-${ind.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("cases.viewStorefront")}
                        </Button>
                      </Link>
                      <Link href={`/auth/login?role=merchant&industry=${ind.id}`}>
                        <Button data-testid={`button-merchant-login-${ind.id}`}>
                          <Store className="h-4 w-4 mr-2" />
                          {t("cases.merchantLogin")}
                        </Button>
                      </Link>
                      <Link href={`/auth/login?role=member`}>
                        <Button variant="outline" data-testid={`button-member-login-${ind.id}`}>
                          <Users className="h-4 w-4 mr-2" />
                          {t("cases.memberLogin")}
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
          <p className="text-muted-foreground mb-4">{t("cases.notSure")}</p>
          <Link href="/contact">
            <Button size="lg" variant="outline" data-testid="button-contact-us">
              {t("cases.contactForDemo")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
