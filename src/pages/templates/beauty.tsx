import {
  Sparkles,
  Heart,
  Scissors,
  Palette,
  Award,
  Droplets,
  ShieldCheck,
  CalendarCheck,
  Gem,
  CalendarDays,
  UserCheck,
  Star,
  Clock,
  ArrowRight,
  MapPin,
  Quote,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiWhatsapp } from "react-icons/si";
import {
  StoreHeader,
  StoreHero,
  StoreFooter,
  FeatureHighlights,
  PackageGrid,
  CTABanner,
} from "@/components/storefront";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import heroImg from "@/assets/images/beauty-hero.jpg";
import imgFacial from "@/assets/images/beauty-facial.jpg";
import imgMassage from "@/assets/images/beauty-massage.jpg";
import imgHair from "@/assets/images/beauty-hair.jpg";
import imgNails from "@/assets/images/beauty-nails.jpg";
import imgSpaRoom from "@/assets/images/beauty-spa-room.jpg";
import imgTherapist1 from "@/assets/images/therapist-1_1.jpg";
import imgTherapist2 from "@/assets/images/therapist-1_2.jpg";
import imgTherapist3 from "@/assets/images/therapist-1_3.jpg";

export default function BeautyTemplate() {
  const { t } = useTranslation("templates");

  const navLinks = [
    t("beauty.navHome"),
    t("beauty.navServices"),
    t("beauty.navBooking"),
    t("beauty.navGallery"),
    t("beauty.navContact"),
  ];

  const services = [
    { name: t("beauty.service1Name"), image: imgFacial, desc: t("beauty.service1Desc"), price: t("beauty.service1Price"), duration: t("beauty.service1Duration"), rating: 4.9 },
    { name: t("beauty.service2Name"), image: imgMassage, desc: t("beauty.service2Desc"), price: t("beauty.service2Price"), duration: t("beauty.service2Duration"), rating: 4.8 },
    { name: t("beauty.service3Name"), image: imgHair, desc: t("beauty.service3Desc"), price: t("beauty.service3Price"), duration: t("beauty.service3Duration"), rating: 4.7 },
    { name: t("beauty.service4Name"), image: imgNails, desc: t("beauty.service4Desc"), price: t("beauty.service4Price"), duration: t("beauty.service4Duration"), rating: 4.9 },
  ];

  const therapists = [
    { name: t("beauty.therapist1Name"), role: t("beauty.therapist1Role"), specialty: t("beauty.therapist1Specialty"), experience: t("beauty.therapist1Exp"), rating: 4.9, reviews: 342, image: imgTherapist1 },
    { name: t("beauty.therapist2Name"), role: t("beauty.therapist2Role"), specialty: t("beauty.therapist2Specialty"), experience: t("beauty.therapist2Exp"), rating: 4.8, reviews: 256, image: imgTherapist2 },
    { name: t("beauty.therapist3Name"), role: t("beauty.therapist3Role"), specialty: t("beauty.therapist3Specialty"), experience: t("beauty.therapist3Exp"), rating: 5.0, reviews: 189, image: imgTherapist3 },
  ];

  const whyUs = [
    { icon: Award, title: t("beauty.why1Title"), desc: t("beauty.why1Desc") },
    { icon: Droplets, title: t("beauty.why2Title"), desc: t("beauty.why2Desc") },
    { icon: ShieldCheck, title: t("beauty.why3Title"), desc: t("beauty.why3Desc") },
    { icon: CalendarCheck, title: t("beauty.why4Title"), desc: t("beauty.why4Desc") },
  ];

  const packages = [
    {
      name: t("beauty.package1Name"),
      price: "RM 199",
      items: [t("beauty.package1Item1"), t("beauty.package1Item2"), t("beauty.package1Item3"), t("beauty.package1Item4")],
      popular: false,
    },
    {
      name: t("beauty.package2Name"),
      price: "RM 399",
      items: [t("beauty.package2Item1"), t("beauty.package2Item2"), t("beauty.package2Item3"), t("beauty.package2Item4"), t("beauty.package2Item5")],
      popular: true,
    },
    {
      name: t("beauty.package3Name"),
      price: "RM 899",
      items: [t("beauty.package3Item1"), t("beauty.package3Item2"), t("beauty.package3Item3"), t("beauty.package3Item4"), t("beauty.package3Item5")],
      popular: false,
    },
  ];

  const reviews = [
    { name: t("beauty.review1Name"), rating: 5, text: t("beauty.review1Text"), service: t("beauty.review1Service"), date: t("beauty.review1Date") },
    { name: t("beauty.review2Name"), rating: 5, text: t("beauty.review2Text"), service: t("beauty.review2Service"), date: t("beauty.review2Date") },
    { name: t("beauty.review3Name"), rating: 4, text: t("beauty.review3Text"), service: t("beauty.review3Service"), date: t("beauty.review3Date") },
    { name: t("beauty.review4Name"), rating: 5, text: t("beauty.review4Text"), service: t("beauty.review4Service"), date: t("beauty.review4Date") },
  ];

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="Beauty Studio"
        storeIcon={Sparkles}
        iconBgClass="bg-rose-500 dark:bg-rose-600 text-white"
        navLinks={navLinks}
        ctaLabel={t("beauty.bookNow")}
        industry="beauty"
      />

      <main className="flex-1">
        <StoreHero
          bgImage={heroImg}
          gradientClass="bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/60 dark:to-black/20"
          badgeIcon={Sparkles}
          badgeText={t("beauty.heroBadge")}
          title={t("beauty.heroTitle")}
          subtitle={t("beauty.heroSubtitle")}
          primaryCTA={{ label: t("beauty.heroCta"), isWhatsApp: true }}
          secondaryCTA={{ label: t("beauty.heroCtaSecondary"), variant: "outline" }}
          align="left"
        />

        <section className="border-b bg-card/50" data-testid="section-stats-bar">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Star, value: "4.9/5", label: t("beauty.statRating") },
                { icon: UserCheck, value: "15+", label: t("beauty.statTherapists") },
                { icon: Clock, value: "10 Years", label: t("beauty.statExperience") },
                { icon: Heart, value: "8K+", label: t("beauty.statClients") },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-rose-500/10 dark:bg-rose-400/10 shrink-0">
                    <stat.icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
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

        <section data-testid="section-services">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">{t("beauty.servicesBadge")}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-services-title">{t("beauty.servicesTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("beauty.servicesSubtitle")}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service, idx) => (
                <Card key={service.name} className="hover-elevate overflow-visible group" data-testid={`card-service-${idx}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative overflow-hidden rounded-t-md sm:rounded-t-none sm:rounded-l-md sm:w-48 shrink-0">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-40 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold">{service.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-amber-500">
                            <Star className="h-3 w-3 fill-amber-500" />
                            {service.rating}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{service.desc}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {service.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-auto flex-wrap">
                          <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{service.price}</span>
                          <div className="flex gap-2">
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                              <Button size="sm" data-testid={`button-book-${idx}`}>
                                <SiWhatsapp className="mr-1.5 h-3 w-3" />
                                {t("beauty.book")}
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card border-y" data-testid="section-therapists">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">{t("beauty.teamBadge")}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-therapists-title">{t("beauty.teamTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("beauty.teamSubtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {therapists.map((therapist, idx) => (
                <Card key={therapist.name} className="hover-elevate overflow-visible" data-testid={`card-therapist-${idx}`}>
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-md">
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-full h-56 object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-0.5">{therapist.name}</h3>
                      <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mb-2">{therapist.role}</p>
                      <div className="space-y-1 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Scissors className="h-3 w-3" />
                          {therapist.specialty}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {therapist.experience} {t("beauty.experience")}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-semibold">{therapist.rating}</span>
                          <span className="text-xs text-muted-foreground">({therapist.reviews})</span>
                        </div>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" data-testid={`button-book-therapist-${idx}`}>
                            {t("beauty.book")}
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

        <section data-testid="section-booking">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">{t("beauty.bookingBadge")}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-booking-title">{t("beauty.bookingTitle")}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("beauty.bookingDesc")}
                </p>
                <div className="relative overflow-hidden rounded-md">
                  <img src={imgSpaRoom} alt="Spa treatment room" className="w-full h-48 md:h-64 object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {t("beauty.bookingAddress")}
                    </div>
                  </div>
                </div>
              </div>
              <Card className="overflow-visible" data-testid="card-booking-form">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">{t("beauty.bookingSlots")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("beauty.bookingSlotsDesc")}</p>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {timeSlots.map((slot, idx) => (
                      <Button
                        key={slot}
                        size="sm"
                        variant={idx === 2 ? "default" : "outline"}
                        className="text-xs"
                        data-testid={`button-slot-${idx}`}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-4">
                    <h4 className="text-sm font-medium mb-3">{t("beauty.bookingQuickSelect")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: t("beauty.bookingFacial"), key: "facial" },
                        { label: t("beauty.bookingMassage"), key: "massage" },
                        { label: t("beauty.bookingHair"), key: "hair" },
                        { label: t("beauty.bookingNails"), key: "nails" },
                        { label: t("beauty.bookingSpaPackage"), key: "spa package" },
                      ].map((s) => (
                        <Badge key={s.key} variant="outline" className="cursor-pointer" data-testid={`badge-service-${s.key}`}>
                          {s.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full" data-testid="button-confirm-booking">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      {t("beauty.bookingConfirm")}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FeatureHighlights
          title={t("beauty.whyTitle")}
          subtitle={t("beauty.whySubtitle")}
          features={whyUs}
          iconColorClass="bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400"
          bgSection
        />

        <section data-testid="section-reviews">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4">{t("beauty.reviewBadge")}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-reviews-title">{t("beauty.reviewTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("beauty.reviewSubtitle")}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {reviews.map((review, idx) => (
                <Card key={idx} className="overflow-visible" data-testid={`card-review-${idx}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm">
                          {review.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold">{review.name}</h4>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{review.service}</span>
                          <span>-</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative pl-4">
                      <Quote className="absolute left-0 top-0 h-3 w-3 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <PackageGrid
          title={t("beauty.packageTitle")}
          subtitle={t("beauty.packageSubtitle")}
          packages={packages}
          accentColor="text-rose-500 dark:text-rose-400"
        />

        <section className="bg-card border-y" data-testid="section-recommended">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">{t("beauty.comboBadge")}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-recommended-title">{t("beauty.comboTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("beauty.comboSubtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: t("beauty.combo1Title"), items: [t("beauty.combo1Item1"), t("beauty.combo1Item2"), t("beauty.combo1Item3")], price: "RM 220", save: t("beauty.combo1Save"), image: imgMassage },
                { title: t("beauty.combo2Title"), items: [t("beauty.combo2Item1"), t("beauty.combo2Item2"), t("beauty.combo2Item3")], price: "RM 680", save: t("beauty.combo2Save"), image: imgFacial },
                { title: t("beauty.combo3Title"), items: [t("beauty.combo3Item1"), t("beauty.combo3Item2"), t("beauty.combo3Item3")], price: "RM 550", save: t("beauty.combo3Save"), image: imgNails },
              ].map((combo, idx) => (
                <Card key={combo.title} className="hover-elevate overflow-visible group" data-testid={`card-combo-${idx}`}>
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-md">
                      <img
                        src={combo.image}
                        alt={combo.title}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <Badge className="absolute top-3 right-3 bg-rose-500 text-white border-rose-500">{combo.save}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{combo.title}</h3>
                      <ul className="space-y-1 mb-3">
                        {combo.items.map((item) => (
                          <li key={item} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Sparkles className="h-2.5 w-2.5 text-rose-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{combo.price}</span>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                          <Button size="sm" data-testid={`button-combo-${idx}`}>
                            <SiWhatsapp className="mr-1.5 h-3 w-3" />
                            {t("beauty.book")}
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

        <CTABanner
          title={t("beauty.ctaTitle")}
          subtitle={t("beauty.ctaSubtitle")}
          buttonLabel={t("beauty.ctaButton")}
          bgClass="bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700 text-white"
        />
      </main>

      <StoreFooter
        storeName="Beauty Studio"
        storeIcon={Sparkles}
        iconBgClass="bg-rose-500 dark:bg-rose-600 text-white"
        description={t("beauty.footerDesc")}
        contact={{ address: "88 Beauty Lane, Bangsar", phone: "+60 12-888 9999", email: "hello@beautystudio.com" }}
        quickLinks={[t("beauty.navServices"), t("beauty.navBooking"), t("beauty.navGallery"), t("beauty.navContact")]}
        operatingHours={[
          { label: "Mon - Fri", time: "10:00 AM - 9:00 PM" },
          { label: "Sat - Sun", time: "9:00 AM - 7:00 PM" },
        ]}
        extraLinks={[
          { label: t("beauty.footerGiftCards"), href: "#" },
          { label: t("beauty.footerLoyalty"), href: "#" },
          { label: t("beauty.footerCareers"), href: "#" },
        ]}
      />
    </div>
  );
}
