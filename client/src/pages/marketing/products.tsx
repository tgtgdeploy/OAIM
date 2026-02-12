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
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductsPage() {
  const { t } = useTranslation("marketing");

  const products = [
    {
      id: "whatsapp-ai",
      icon: MessageSquare,
      title: t("products.whatsappInbox"),
      badge: t("products.badgeCore"),
      badgeVariant: "default" as const,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      description: t("products.whatsappInboxDesc"),
      features: [
        t("products.whatsappInboxF1"),
        t("products.whatsappInboxF2"),
        t("products.whatsappInboxF3"),
        t("products.whatsappInboxF4"),
        t("products.whatsappInboxF5"),
        t("products.whatsappInboxF6"),
      ],
    },
    {
      id: "ai-script",
      icon: Bot,
      title: t("products.aiSalesScript"),
      badge: t("products.badgeCore"),
      badgeVariant: "default" as const,
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      description: t("products.aiSalesScriptDesc"),
      features: [
        t("products.aiSalesScriptF1"),
        t("products.aiSalesScriptF2"),
        t("products.aiSalesScriptF3"),
        t("products.aiSalesScriptF4"),
        t("products.aiSalesScriptF5"),
        t("products.aiSalesScriptF6"),
      ],
    },
    {
      id: "crm",
      icon: Users,
      title: t("products.crmPipeline"),
      badge: t("products.badgeStarter"),
      badgeVariant: "secondary" as const,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      description: t("products.crmPipelineDesc"),
      features: [
        t("products.crmPipelineF1"),
        t("products.crmPipelineF2"),
        t("products.crmPipelineF3"),
        t("products.crmPipelineF4"),
        t("products.crmPipelineF5"),
        t("products.crmPipelineF6"),
      ],
    },
    {
      id: "followup",
      icon: Repeat,
      title: t("products.autoFollowUp"),
      badge: t("products.badgePro"),
      badgeVariant: "secondary" as const,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      description: t("products.autoFollowUpDesc"),
      features: [
        t("products.autoFollowUpF1"),
        t("products.autoFollowUpF2"),
        t("products.autoFollowUpF3"),
        t("products.autoFollowUpF4"),
        t("products.autoFollowUpF5"),
        t("products.autoFollowUpF6"),
      ],
    },
    {
      id: "erp",
      icon: ShoppingCart,
      title: t("products.erpLite"),
      badge: t("products.badgePro"),
      badgeVariant: "secondary" as const,
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      description: t("products.erpLiteDesc"),
      features: [
        t("products.erpLiteF1"),
        t("products.erpLiteF2"),
        t("products.erpLiteF3"),
        t("products.erpLiteF4"),
        t("products.erpLiteF5"),
        t("products.erpLiteF6"),
      ],
    },
    {
      id: "ads",
      icon: BarChart3,
      title: t("products.metaAds"),
      badge: t("products.badgeBusiness"),
      badgeVariant: "outline" as const,
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      description: t("products.metaAdsDesc"),
      features: [
        t("products.metaAdsF1"),
        t("products.metaAdsF2"),
        t("products.metaAdsF3"),
        t("products.metaAdsF4"),
        t("products.metaAdsF5"),
        t("products.metaAdsF6"),
      ],
    },
    {
      id: "team",
      icon: UsersRound,
      title: t("products.teamPermissions"),
      badge: t("products.badgeBusiness"),
      badgeVariant: "outline" as const,
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
      description: t("products.teamPermissionsDesc"),
      features: [
        t("products.teamPermissionsF1"),
        t("products.teamPermissionsF2"),
        t("products.teamPermissionsF3"),
        t("products.teamPermissionsF4"),
        t("products.teamPermissionsF5"),
        t("products.teamPermissionsF6"),
      ],
    },
  ];

  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 dark:from-primary/10 dark:to-cyan-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              <Lock className="h-3 w-3 mr-1" />
              {t("products.modularUnlockable")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-products-title">
              {t("products.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("products.subtitle")}
            </p>
          </div>

          <div className="space-y-6">
            {products.map((product, index) => (
              <Card key={product.id} id={product.id} className={`overflow-visible animate-fade-in-up delay-${Math.min((index + 1) * 100, 800)}`} data-testid={`card-product-${product.id}`}>
                <CardContent className="p-6 md:p-8">
                  <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${product.color}`}>
                          <product.icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold">{product.title}</h2>
                        <Badge variant={product.badgeVariant}>{product.badge}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-2.5">
                        {product.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-80 flex-shrink-0">
                      <div className={`rounded-md h-48 md:h-full flex items-center justify-center relative overflow-hidden ${product.color.split(" ")[0]}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5" />
                        <product.icon className="h-20 w-20 opacity-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up">
            <Link href="/pricing">
              <Button size="lg" data-testid="button-view-pricing">
                {t("products.viewPricingPlans")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
