import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Store,
  UtensilsCrossed,
  Sparkles,
  Briefcase,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Zap,
  MessageSquare,
  Bot,
  Moon,
  Sun,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

const stepIcons = [Store, Zap, MessageSquare, Bot, Upload, Bot];

type IndustryId = "ecommerce" | "restaurant" | "beauty" | "service" | "quant";
type Platform = "whatsapp" | "telegram";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [platform, setPlatform] = useState<Platform>("whatsapp");
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("app");
  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;

  const stepLabels = [
    t("onboarding.stepBusiness"),
    t("onboarding.stepIndustry"),
    t("onboarding.stepPlatform"),
    t("onboarding.stepWhatsApp"),
    t("onboarding.stepProducts"),
    t("onboarding.stepAiScript"),
  ];

  const industries = [
    { id: "ecommerce" as const, icon: Store, label: t("onboarding.industryEcommerce"), desc: t("onboarding.industryEcommerceDesc"), color: "bg-blue-500/10 dark:bg-blue-400/10", iconColor: "text-blue-600 dark:text-blue-400" },
    { id: "restaurant" as const, label: t("onboarding.industryRestaurant"), icon: UtensilsCrossed, desc: t("onboarding.industryRestaurantDesc"), color: "bg-orange-500/10 dark:bg-orange-400/10", iconColor: "text-orange-600 dark:text-orange-400" },
    { id: "beauty" as const, label: t("onboarding.industryBeauty"), icon: Sparkles, desc: t("onboarding.industryBeautyDesc"), color: "bg-rose-500/10 dark:bg-rose-400/10", iconColor: "text-rose-600 dark:text-rose-400" },
    { id: "service" as const, label: t("onboarding.industryService"), icon: Briefcase, desc: t("onboarding.industryServiceDesc"), color: "bg-violet-500/10 dark:bg-violet-400/10", iconColor: "text-violet-600 dark:text-violet-400" },
    { id: "quant" as const, label: t("onboarding.industryQuant"), icon: TrendingUp, desc: t("onboarding.industryQuantDesc"), color: "bg-cyan-500/10 dark:bg-cyan-400/10", iconColor: "text-cyan-600 dark:text-cyan-400" },
  ];

  const getAiScriptLabel = () => {
    switch (industry) {
      case "restaurant": return t("onboarding.aiScriptRestaurant");
      case "beauty": return t("onboarding.aiScriptBeauty");
      case "service": return t("onboarding.aiScriptService");
      case "quant": return t("onboarding.aiScriptQuant");
      default: return t("onboarding.aiScriptEcommerce");
    }
  };

  const getGoalLabel = () => {
    switch (industry) {
      case "restaurant": return t("onboarding.goalRestaurant");
      case "beauty": return t("onboarding.goalBeauty");
      case "service": return t("onboarding.goalService");
      case "quant": return t("onboarding.goalQuant");
      default: return t("onboarding.goalEcommerce");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer" data-testid="link-logo-home">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">OAIM</span>
                  <span className="text-muted-foreground text-xs hidden sm:inline">{t("onboarding.setup")}</span>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{step + 1}/{totalSteps}</span>
              <LanguageSwitcher />
              <Button size="icon" variant="ghost" onClick={toggleTheme} data-testid="button-theme-toggle">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2.5 gap-1">
            {stepLabels.map((label, i) => {
              const Icon = stepIcons[i];
              const isActive = i === step;
              const isDone = i < step;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-1 text-[11px] sm:text-xs transition-colors ${
                    isDone
                      ? "text-primary"
                      : isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground/50"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  ) : (
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span className={`${isActive ? "" : "hidden sm:inline"}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-lg">

          {/* Step 0: Business Info */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1.5" data-testid="text-step-title">{t("onboarding.createBusiness")}</h2>
                <p className="text-sm text-muted-foreground">{t("onboarding.createBusinessDesc")}</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">{t("onboarding.businessName")}</Label>
                  <Input id="business-name" placeholder={t("onboarding.businessNamePlaceholder")} data-testid="input-business-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-name">{t("onboarding.yourName")}</Label>
                  <Input id="owner-name" placeholder={t("onboarding.yourNamePlaceholder")} data-testid="input-owner-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-email">{t("onboarding.email")}</Label>
                  <Input id="owner-email" type="email" placeholder={t("onboarding.emailPlaceholder")} data-testid="input-owner-email" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Industry */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1.5" data-testid="text-step-title">{t("onboarding.chooseIndustry")}</h2>
                <p className="text-sm text-muted-foreground">{t("onboarding.chooseIndustryDesc")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industries.map((item) => (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all overflow-visible hover-elevate ${industry === item.id ? "border-primary ring-1 ring-primary" : ""}`}
                    onClick={() => setIndustry(item.id)}
                    data-testid={`card-industry-${item.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${item.color} shrink-0`}>
                          <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">{item.label}</h3>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        {industry === item.id && (
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Platform Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1.5" data-testid="text-step-title">{t("onboarding.choosePlatform")}</h2>
                <p className="text-sm text-muted-foreground">{t("onboarding.choosePlatformDesc")}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Card
                  className={`cursor-pointer transition-all overflow-visible hover-elevate ${platform === "whatsapp" ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setPlatform("whatsapp")}
                  data-testid="card-platform-whatsapp"
                >
                  <CardContent className="p-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-green-500/10 mx-auto mb-3">
                      <SiWhatsapp className="h-7 w-7 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-sm">WhatsApp</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t("onboarding.platformWhatsAppDesc")}</p>
                    {platform === "whatsapp" && <Badge className="mt-2">{t("onboarding.selected")}</Badge>}
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all overflow-visible hover-elevate ${platform === "telegram" ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setPlatform("telegram")}
                  data-testid="card-platform-telegram"
                >
                  <CardContent className="p-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-blue-500/10 mx-auto mb-3">
                      <SiTelegram className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-sm">Telegram</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t("onboarding.platformTelegramDesc")}</p>
                    {platform === "telegram" && <Badge className="mt-2">{t("onboarding.selected")}</Badge>}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Platform Credentials */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1.5" data-testid="text-step-title">
                  {platform === "whatsapp" ? t("onboarding.connectWhatsApp") : t("onboarding.connectTelegram")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {platform === "whatsapp" ? t("onboarding.connectWhatsAppDesc") : t("onboarding.connectTelegramDesc")}
                </p>
              </div>
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md mx-auto mb-4"
                    style={{ background: platform === "whatsapp" ? "rgba(34,197,94,0.1)" : "rgba(59,130,246,0.1)" }}
                  >
                    {platform === "whatsapp"
                      ? <SiWhatsapp className="h-7 w-7 text-green-600 dark:text-green-400" />
                      : <SiTelegram className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    }
                  </div>
                  <div className="text-center mb-5">
                    <h3 className="font-semibold mb-1">
                      {platform === "whatsapp" ? t("onboarding.waBusinessApi") : t("onboarding.telegramBot")}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {platform === "whatsapp" ? t("onboarding.waCredentials") : t("onboarding.telegramCredentials")}
                    </p>
                  </div>
                  {platform === "whatsapp" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone-id">{t("onboarding.phoneNumberId")}</Label>
                        <Input id="phone-id" placeholder={t("onboarding.phoneNumberIdPlaceholder")} data-testid="input-phone-id" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wa-token">{t("onboarding.accessToken")}</Label>
                        <Input id="wa-token" type="password" placeholder={t("onboarding.accessTokenPlaceholder")} data-testid="input-wa-token" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tg-token">{t("onboarding.telegramBotToken")}</Label>
                        <Input id="tg-token" type="password" placeholder={t("onboarding.telegramBotTokenPlaceholder")} data-testid="input-tg-token" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <p className="text-xs text-muted-foreground text-center">
                {platform === "whatsapp" ? (
                  <>
                    {t("onboarding.noCloudApi")}{" "}
                    <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      {t("onboarding.setupHere")}
                    </a>
                  </>
                ) : (
                  <>
                    {t("onboarding.noTelegramBot")}{" "}
                    <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      @BotFather
                    </a>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Step 4: Products */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1.5" data-testid="text-step-title">
                  {industry === "restaurant" ? t("onboarding.importMenuItems") : t("onboarding.importProducts")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {industry === "restaurant" ? t("onboarding.importMenuDesc") : t("onboarding.importProductsDesc")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Card className="cursor-pointer hover-elevate overflow-visible" data-testid="card-import-csv">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Upload className="h-7 w-7 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm mb-0.5">{t("onboarding.uploadCsv")}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block">{t("onboarding.uploadCsvDesc")}</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover-elevate overflow-visible" data-testid="card-import-sample">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Zap className="h-7 w-7 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm mb-0.5">{t("onboarding.sampleData")}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block">{industry === "restaurant" ? t("onboarding.sampleDataMenuDesc") : t("onboarding.sampleDataProductsDesc")}</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-2">{t("onboarding.sampleDataIncludes")}</div>
                  <ul className="space-y-1.5">
                    {(industry === "restaurant"
                      ? [t("onboarding.sampleMenu1"), t("onboarding.sampleMenu2"), t("onboarding.sampleMenu3")]
                      : [t("onboarding.sampleProducts1"), t("onboarding.sampleProducts2"), t("onboarding.sampleProducts3")]
                    ).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: AI Script */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1.5" data-testid="text-step-title">{t("onboarding.enableAiScript")}</h2>
                <p className="text-sm text-muted-foreground">{t("onboarding.enableAiScriptDesc")}</p>
              </div>
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 mx-auto mb-4">
                    <Bot className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center mb-5">
                    <h3 className="font-semibold mb-1">{getAiScriptLabel()}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("onboarding.preConfigured")}</p>
                  </div>
                  <div className="space-y-0">
                    {[
                      { label: t("onboarding.tone"), value: t("onboarding.toneFriendly") },
                      { label: t("onboarding.goal"), value: getGoalLabel() },
                      { label: t("onboarding.autoReply"), value: t("onboarding.autoReplyValue") },
                      { label: t("onboarding.language"), value: t("onboarding.languageValue") },
                      { label: t("onboarding.platform"), value: platform === "whatsapp" ? "WhatsApp" : "Telegram" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2.5 border-b last:border-0">
                        <span className="text-xs sm:text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-xs sm:text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("onboarding.allSet")}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {t("onboarding.allSetDesc")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              data-testid="button-prev-step"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{t("common.back")}</span>
            </Button>
            {step < totalSteps - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !industry}
                data-testid="button-next-step"
              >
                {t("common.continue")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href="/app">
                <Button data-testid="button-complete-setup">
                  {t("onboarding.completeSetup")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
