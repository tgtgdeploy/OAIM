import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  MessageCircle,
  RotateCcw,
  Shirt,
  Smartphone,
  Home,
  HeartPulse,
  Package,
  CreditCard,
  BarChart3,
  Tags,
  Warehouse,
  Receipt,
  Star,
  Heart,
  ArrowRight,
  Zap,
  Clock,
  Gift,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiWhatsapp } from "react-icons/si";
import {
  StoreHeader,
  StoreHero,
  StoreFooter,
  CategoryGrid,
  ProductGrid,
  FeatureHighlights,
  CTABanner,
  TestimonialGrid,
} from "@/components/storefront";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import heroImg from "@/assets/images/ecommerce-hero.jpg";
import imgTshirt from "@/assets/images/product-tshirt.jpg";
import imgEarbuds from "@/assets/images/product-earbuds.jpg";
import imgSerum from "@/assets/images/product-serum.jpg";
import imgSneakers from "@/assets/images/product-sneakers.jpg";
import imgWatch from "@/assets/images/product-watch.jpg";
import imgBag from "@/assets/images/product-bag.jpg";

export default function EcommerceTemplate() {
  const { t } = useTranslation("templates");

  const navLinks = [
    t("ecommerce.navHome"),
    t("ecommerce.navProducts"),
    t("ecommerce.navCategories"),
    t("ecommerce.navAbout"),
    t("ecommerce.navContact"),
  ];

  const categories = [
    { name: t("ecommerce.catFashion"), icon: Shirt, color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
    { name: t("ecommerce.catElectronics"), icon: Smartphone, color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
    { name: t("ecommerce.catHomeLiving"), icon: Home, color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
    { name: t("ecommerce.catHealthBeauty"), icon: HeartPulse, color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" },
  ];

  const featuredProducts = [
    { name: t("ecommerce.product1Name"), price: "RM 49.90", originalPrice: "RM 69.90", badge: t("ecommerce.product1Badge"), image: imgTshirt, desc: t("ecommerce.product1Desc") },
    { name: t("ecommerce.product2Name"), price: "RM 129.00", badge: t("ecommerce.product2Badge"), image: imgEarbuds, desc: t("ecommerce.product2Desc") },
    { name: t("ecommerce.product3Name"), price: "RM 89.00", badge: t("ecommerce.product3Badge"), image: imgSerum, desc: t("ecommerce.product3Desc") },
  ];

  const newArrivals = [
    { name: t("ecommerce.new1Name"), price: "RM 199.00", image: imgSneakers, desc: t("ecommerce.new1Desc") },
    { name: t("ecommerce.new2Name"), price: "RM 349.00", badge: t("ecommerce.new2Badge"), image: imgWatch, desc: t("ecommerce.new2Desc") },
    { name: t("ecommerce.new3Name"), price: "RM 159.00", image: imgBag, desc: t("ecommerce.new3Desc") },
  ];

  const features = [
    { icon: Truck, title: t("ecommerce.feature1Title"), desc: t("ecommerce.feature1Desc") },
    { icon: ShieldCheck, title: t("ecommerce.feature2Title"), desc: t("ecommerce.feature2Desc") },
    { icon: MessageCircle, title: t("ecommerce.feature3Title"), desc: t("ecommerce.feature3Desc") },
    { icon: RotateCcw, title: t("ecommerce.feature4Title"), desc: t("ecommerce.feature4Desc") },
  ];

  const testimonials = [
    { name: t("ecommerce.review1Name"), rating: 5, text: t("ecommerce.review1Text") },
    { name: t("ecommerce.review2Name"), rating: 5, text: t("ecommerce.review2Text") },
    { name: t("ecommerce.review3Name"), rating: 4, text: t("ecommerce.review3Text") },
  ];

  const flashDeals = [
    { name: t("ecommerce.deal1Name"), price: "RM 249.00", originalPrice: "RM 349.00", image: imgWatch, badge: "-29%", desc: t("ecommerce.deal1Desc") },
    { name: t("ecommerce.deal2Name"), price: "RM 119.00", originalPrice: "RM 159.00", image: imgBag, badge: "-25%", desc: t("ecommerce.deal2Desc") },
    { name: t("ecommerce.deal3Name"), price: "RM 59.00", originalPrice: "RM 89.00", image: imgSerum, badge: "-34%", desc: t("ecommerce.deal3Desc") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="ShopName"
        storeIcon={ShoppingBag}
        navLinks={navLinks}
        showWhatsappInNav
        industry="ecommerce"
      />

      <main className="flex-1">
        <StoreHero
          bgImage={heroImg}
          gradientClass="bg-gradient-to-r from-black/80 via-black/60 to-black/30 dark:from-black/90 dark:via-black/70 dark:to-black/40"
          badgeIcon={SiWhatsapp}
          badgeText={t("ecommerce.heroBadge")}
          title={t("ecommerce.heroTitle")}
          subtitle={t("ecommerce.heroSubtitle")}
          primaryCTA={{ label: t("ecommerce.heroCta") }}
          secondaryCTA={{ label: t("ecommerce.heroCtaWa"), variant: "outline", isWhatsApp: true }}
          align="left"
        />

        <section className="border-b bg-card/50" data-testid="section-stats-bar">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Package, value: "2,500+", label: t("ecommerce.statProducts") },
                { icon: Star, value: "4.9/5", label: t("ecommerce.statRating") },
                { icon: Truck, value: "1-3 Days", label: t("ecommerce.statDelivery") },
                { icon: Heart, value: "15K+", label: t("ecommerce.statCustomers") },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 shrink-0">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold leading-none">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryGrid
          title={t("ecommerce.catTitle")}
          subtitle={t("ecommerce.catSubtitle")}
          categories={categories}
        />

        <ProductGrid
          title={t("ecommerce.featuredTitle")}
          subtitle={t("ecommerce.featuredSubtitle")}
          products={featuredProducts}
          placeholderIcon={ShoppingBag}
          actionLabel={t("ecommerce.addToCart")}
          whatsappLabel={t("ecommerce.ask")}
        />

        <section className="bg-card border-y" data-testid="section-flash-deals">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">{t("ecommerce.flashLimitedTime")}</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-flash-title">{t("ecommerce.flashTitle")}</h2>
                <p className="text-muted-foreground mt-1">{t("ecommerce.flashSubtitle")}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{t("ecommerce.flashEndsIn")}</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {flashDeals.map((deal, idx) => (
                <Card key={deal.name} className="hover-elevate overflow-visible group" data-testid={`card-deal-${idx}`}>
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-md">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white border-red-500">{deal.badge}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1">{deal.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{deal.desc}</p>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-red-500 dark:text-red-400">{deal.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{deal.originalPrice}</span>
                      </div>
                      <Button size="sm" className="w-full" data-testid={`button-deal-${idx}`}>
                        <ShoppingBag className="mr-2 h-3.5 w-3.5" />
                        {t("ecommerce.grabDeal")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ProductGrid
          title={t("ecommerce.newTitle")}
          subtitle={t("ecommerce.newSubtitle")}
          products={newArrivals}
          placeholderIcon={ShoppingBag}
          actionLabel={t("ecommerce.addToCart")}
          bgSection={false}
        />

        <section className="bg-card border-y" data-testid="section-brand-story">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">{t("ecommerce.storyBadge")}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-brand-title">
                  {t("ecommerce.storyTitle")}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t("ecommerce.storyP1")}
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("ecommerce.storyP2")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" data-testid="button-about-more">
                    {t("ecommerce.storyReadMore")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" data-testid="button-about-whatsapp">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      {t("ecommerce.storyChatWithUs")}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src={imgTshirt} alt="Product" className="rounded-md h-40 w-full object-cover" loading="lazy" />
                <img src={imgEarbuds} alt="Product" className="rounded-md h-40 w-full object-cover mt-8" loading="lazy" />
                <img src={imgSerum} alt="Product" className="rounded-md h-40 w-full object-cover -mt-4" loading="lazy" />
                <img src={imgSneakers} alt="Product" className="rounded-md h-40 w-full object-cover mt-4" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <FeatureHighlights
          title={t("ecommerce.featureTitle")}
          subtitle={t("ecommerce.featureSubtitle")}
          features={features}
        />

        <TestimonialGrid
          title={t("ecommerce.reviewTitle")}
          subtitle={t("ecommerce.reviewSubtitle")}
          testimonials={testimonials}
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-perks">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Gift, title: t("ecommerce.perk1Title"), desc: t("ecommerce.perk1Desc"), color: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400" },
              { icon: Tags, title: t("ecommerce.perk2Title"), desc: t("ecommerce.perk2Desc"), color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
              { icon: Truck, title: t("ecommerce.perk3Title"), desc: t("ecommerce.perk3Desc"), color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
              { icon: MessageCircle, title: t("ecommerce.perk4Title"), desc: t("ecommerce.perk4Desc"), color: "bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400" },
            ].map((perk) => (
              <Card key={perk.title} className="overflow-visible" data-testid={`card-perk-${perk.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardContent className="p-5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-md ${perk.color} mb-3`}>
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{perk.title}</h3>
                  <p className="text-xs text-muted-foreground">{perk.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <CTABanner
          title={t("ecommerce.ctaTitle")}
          subtitle={t("ecommerce.ctaSubtitle")}
          buttonLabel={t("ecommerce.ctaButton")}
        />
      </main>

      <StoreFooter
        storeName="ShopName"
        storeIcon={ShoppingBag}
        description={t("ecommerce.footerDesc")}
        contact={{ address: "123 Commerce Street, KL", phone: "+60 12-345 6789", email: "hello@shopname.com" }}
        quickLinks={[
          t("ecommerce.navHome"),
          t("ecommerce.navProducts"),
          t("ecommerce.navCategories"),
          t("ecommerce.footerAboutUs"),
          t("ecommerce.navContact"),
        ]}
        extraLinks={[
          { label: t("ecommerce.footerTrackOrder"), href: "#" },
          { label: t("ecommerce.footerShippingPolicy"), href: "#" },
          { label: t("ecommerce.footerReturnPolicy"), href: "#" },
        ]}
      />
    </div>
  );
}
