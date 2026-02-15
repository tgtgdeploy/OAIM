import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Phone,
  CalendarDays,
  Users,
  ChefHat,
  Star,
  Bike,
  Flame,
  ArrowRight,
  Award,
  Heart,
  Leaf,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiWhatsapp } from "react-icons/si";
import {
  StoreHeader,
  StoreHero,
  StoreFooter,
  StepProcess,
  TestimonialGrid,
  SpecialOffer,
  ReservationCard,
  CTABanner,
  GalleryGrid,
} from "@/components/storefront";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import heroImg from "@/assets/images/fnb-hero.jpg";
import imgNasilemak from "@/assets/images/food-nasilemak.jpg";
import imgSalmon from "@/assets/images/food-salmon.jpg";
import imgTomyum from "@/assets/images/food-tomyum.jpg";
import imgDessert from "@/assets/images/food-dessert.jpg";
import imgSatay from "@/assets/images/food-satay.jpg";
import imgInterior from "@/assets/images/restaurant-interior.jpg";

export default function FnbTemplate() {
  const { t } = useTranslation("templates");

  const navLinks = [
    t("fnb.navHome"),
    t("fnb.navMenu"),
    t("fnb.navReservations"),
    t("fnb.navAbout"),
    t("fnb.navContact"),
  ];

  const menuCategories = [
    {
      name: t("fnb.menuCat1"),
      items: [
        { name: t("fnb.dish1Name"), desc: t("fnb.dish1Desc"), price: "RM 15.90", image: imgNasilemak, badge: t("fnb.dish1Badge") },
        { name: t("fnb.dish2Name"), desc: t("fnb.dish2Desc"), price: "RM 38.00", image: imgSalmon },
        { name: t("fnb.dish3Name"), desc: t("fnb.dish3Desc"), price: "RM 22.00", image: imgTomyum, badge: t("fnb.dish3Badge") },
      ],
    },
    {
      name: t("fnb.menuCat2"),
      items: [
        { name: t("fnb.dish4Name"), desc: t("fnb.dish4Desc"), price: "RM 18.90", image: imgSatay },
        { name: t("fnb.dish5Name"), desc: t("fnb.dish5Desc"), price: "RM 16.00", image: imgDessert, badge: t("fnb.dish5Badge") },
      ],
    },
  ];

  const steps = [
    { step: "1", icon: UtensilsCrossed, title: t("fnb.step1Title"), desc: t("fnb.step1Desc") },
    { step: "2", icon: SiWhatsapp, title: t("fnb.step2Title"), desc: t("fnb.step2Desc") },
    { step: "3", icon: Bike, title: t("fnb.step3Title"), desc: t("fnb.step3Desc") },
  ];

  const testimonials = [
    { name: t("fnb.review1Name"), rating: 5, text: t("fnb.review1Text") },
    { name: t("fnb.review2Name"), rating: 5, text: t("fnb.review2Text") },
    { name: t("fnb.review3Name"), rating: 4, text: t("fnb.review3Text") },
  ];

  const reservationFields = [
    { icon: CalendarDays, title: t("fnb.reserveDateTime"), desc: t("fnb.reserveDateTimeDesc") },
    { icon: Users, title: t("fnb.reservePartySize"), desc: t("fnb.reservePartySizeDesc") },
  ];

  const galleryItems = [
    { image: imgNasilemak, alt: "Nasi Lemak Special" },
    { image: imgSalmon, alt: "Grilled Salmon" },
    { image: imgInterior, alt: "Restaurant Interior" },
    { image: imgTomyum, alt: "Tom Yum Seafood" },
    { image: imgSatay, alt: "Chicken Satay" },
    { image: imgDessert, alt: "Chocolate Cake" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="The Kitchen"
        storeIcon={UtensilsCrossed}
        iconBgClass="bg-orange-600 dark:bg-orange-700 text-white"
        navLinks={navLinks}
        ctaLabel={t("fnb.orderNow")}
        industry="fnb"
      />

      <main className="flex-1">
        <StoreHero
          bgImage={heroImg}
          gradientClass="bg-gradient-to-r from-black/85 via-black/60 to-transparent dark:from-black/95 dark:via-black/70 dark:to-black/20"
          badgeIcon={UtensilsCrossed}
          badgeText={t("fnb.heroBadge")}
          title={t("fnb.heroTitle")}
          subtitle={t("fnb.heroSubtitle")}
          primaryCTA={{ label: t("fnb.heroCta") }}
          secondaryCTA={{ label: t("fnb.heroCtaWa"), variant: "outline", isWhatsApp: true }}
          align="left"
        />

        <section className="border-b bg-card/50" data-testid="section-highlights-bar">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: ChefHat, label: t("fnb.highlightChef"), desc: t("fnb.highlightChefDesc") },
                { icon: Leaf, label: t("fnb.highlightFresh"), desc: t("fnb.highlightFreshDesc") },
                { icon: Clock, label: t("fnb.highlightDelivery"), desc: t("fnb.highlightDeliveryDesc") },
                { icon: Star, label: t("fnb.highlightRating"), desc: t("fnb.highlightRatingDesc") },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3" data-testid={`highlight-${item.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500/10 dark:bg-orange-400/10 shrink-0">
                    <item.icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-none">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card border-b" data-testid="section-about">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative">
                <img
                  src={imgInterior}
                  alt="Restaurant interior"
                  className="rounded-md w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
                <Card className="absolute -bottom-6 -right-2 md:right-4 overflow-visible" data-testid="card-about-highlight">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500/10 dark:bg-orange-400/10 shrink-0">
                      <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{t("fnb.aboutEst")}</div>
                      <div className="text-xs text-muted-foreground">{t("fnb.aboutEstDesc")}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="pt-4 md:pt-0">
                <Badge variant="secondary" className="mb-4 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20">{t("fnb.aboutBadge")}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-about-title">
                  {t("fnb.aboutTitle")}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t("fnb.aboutP1")}
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("fnb.aboutP2")}
                </p>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { value: "15+", label: t("fnb.aboutYears") },
                    { value: "50+", label: t("fnb.aboutMenuItems") },
                    { value: "2K+", label: t("fnb.aboutDailyOrders") },
                  ].map((s) => (
                    <div key={s.label} className="text-center" data-testid={`about-stat-${s.label.toLowerCase()}`}>
                      <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {menuCategories.map((cat, catIdx) => (
          <section key={cat.name} className={catIdx % 2 === 0 ? "" : "bg-card border-y"} data-testid={`section-menu-${catIdx}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold" data-testid={`text-menu-cat-${catIdx}`}>{cat.name}</h2>
                  <p className="text-muted-foreground mt-1">{t("fnb.menuCatDesc")}</p>
                </div>
                <Button variant="outline" data-testid={`button-menu-all-${catIdx}`}>
                  {t("fnb.viewFullMenu")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((dish, idx) => (
                  <Card key={dish.name} className="hover-elevate overflow-visible group" data-testid={`card-dish-${catIdx}-${idx}`}>
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-md">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {dish.badge && (
                          <Badge className="absolute top-3 left-3">{dish.badge}</Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold">{dish.name}</h3>
                          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{dish.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{dish.desc}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" data-testid={`button-order-${catIdx}-${idx}`}>
                            {t("fnb.orderNow")}
                          </Button>
                          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" data-testid={`button-wa-${catIdx}-${idx}`}>
                              <SiWhatsapp className="h-3.5 w-3.5" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}

        <SpecialOffer
          icon={Flame}
          iconColor="bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400"
          badgeText={t("fnb.offerBadge")}
          title={t("fnb.offerTitle")}
          description={t("fnb.offerDesc")}
          ctaLabel={t("fnb.orderNow")}
        />

        <StepProcess
          title={t("fnb.stepsTitle")}
          subtitle={t("fnb.stepsSubtitle")}
          steps={steps}
        />

        <ReservationCard
          title={t("fnb.reserveTitle")}
          subtitle={t("fnb.reserveSubtitle")}
          fields={reservationFields}
          description={t("fnb.reserveDesc")}
          buttonLabel={t("fnb.reserveButton")}
        />

        <GalleryGrid
          title={t("fnb.galleryTitle")}
          subtitle={t("fnb.gallerySubtitle")}
          items={galleryItems}
        />

        <TestimonialGrid
          title={t("fnb.reviewTitle")}
          subtitle={t("fnb.reviewSubtitle")}
          testimonials={testimonials}
        />

        <CTABanner
          title={t("fnb.ctaTitle")}
          subtitle={t("fnb.ctaSubtitle")}
          buttonLabel={t("fnb.ctaButton")}
          bgClass="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-700 dark:to-amber-700 text-white"
        />
      </main>

      <StoreFooter
        storeName="The Kitchen"
        storeIcon={UtensilsCrossed}
        iconBgClass="bg-orange-600 dark:bg-orange-700 text-white"
        description={t("fnb.footerDesc")}
        contact={{ address: "45 Food Street, Petaling Jaya", phone: "+60 3-7890 1234", email: "hello@thekitchen.com" }}
        quickLinks={[t("fnb.navMenu"), t("fnb.navReservations"), t("fnb.navAbout"), t("fnb.navContact")]}
        operatingHours={[
          { label: "Mon - Fri", time: "10:00 AM - 10:00 PM" },
          { label: "Sat - Sun", time: "9:00 AM - 11:00 PM" },
        ]}
        extraLinks={[
          { label: t("fnb.footerDeliveryInfo"), href: "#" },
          { label: t("fnb.footerCatering"), href: "#" },
          { label: t("fnb.footerCareers"), href: "#" },
        ]}
      />
    </div>
  );
}
