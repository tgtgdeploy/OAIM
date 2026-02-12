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

const navLinks = ["Home", "Menu", "Reservations", "About", "Contact"];

const menuCategories = [
  {
    name: "Signature Mains",
    items: [
      { name: "Nasi Lemak Special", desc: "Fragrant coconut rice with sambal, fried chicken, egg, and anchovies", price: "RM 15.90", image: imgNasilemak, badge: "Popular" },
      { name: "Grilled Salmon Set", desc: "Atlantic salmon with herb butter, seasonal vegetables, and rice", price: "RM 38.00", image: imgSalmon },
      { name: "Tom Yum Seafood", desc: "Spicy and sour Thai soup with fresh prawns, squid, and mussels", price: "RM 22.00", image: imgTomyum, badge: "Chef's Pick" },
    ],
  },
  {
    name: "Appetizers & Sides",
    items: [
      { name: "Chicken Satay (10 pcs)", desc: "Charcoal-grilled with homemade peanut sauce", price: "RM 18.90", image: imgSatay },
      { name: "Chocolate Lava Cake", desc: "Warm chocolate cake with vanilla ice cream", price: "RM 16.00", image: imgDessert, badge: "Sweet" },
    ],
  },
];

const steps = [
  { step: "1", icon: UtensilsCrossed, title: "Browse Menu", desc: "Explore our full menu with photos and descriptions" },
  { step: "2", icon: SiWhatsapp, title: "WhatsApp Order", desc: "Send us your order via WhatsApp — fast and easy" },
  { step: "3", icon: Bike, title: "Delivery / Pickup", desc: "Get your food delivered or pick it up at our outlet" },
];

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "The food is always fresh and delivery is super fast. Love ordering through WhatsApp!" },
  { name: "Ahmad R.", rating: 5, text: "Best Nasi Lemak in town. The portions are generous and the sambal is incredible." },
  { name: "Lisa T.", rating: 4, text: "Great variety on the menu. The reservation system through WhatsApp is very convenient." },
];

const reservationFields = [
  { icon: CalendarDays, title: "Date & Time", desc: "Let us know your preferred slot" },
  { icon: Users, title: "Party Size", desc: "How many guests are joining" },
];

const galleryItems = [
  { image: imgNasilemak, alt: "Nasi Lemak Special" },
  { image: imgSalmon, alt: "Grilled Salmon" },
  { image: imgInterior, alt: "Restaurant Interior" },
  { image: imgTomyum, alt: "Tom Yum Seafood" },
  { image: imgSatay, alt: "Chicken Satay" },
  { image: imgDessert, alt: "Chocolate Cake" },
];

export default function FnbTemplate() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="The Kitchen"
        storeIcon={UtensilsCrossed}
        iconBgClass="bg-orange-600 dark:bg-orange-700 text-white"
        navLinks={navLinks}
        ctaLabel="Order Now"
        industry="fnb"
      />

      <main className="flex-1">
        <StoreHero
          bgImage={heroImg}
          gradientClass="bg-gradient-to-r from-black/85 via-black/60 to-transparent dark:from-black/95 dark:via-black/70 dark:to-black/20"
          badgeIcon={UtensilsCrossed}
          badgeText="Fresh from our kitchen"
          title="Authentic Flavors, Delivered to You"
          subtitle="Experience the taste of home-cooked meals crafted with the finest ingredients. Order easily through WhatsApp and enjoy delivery or pickup."
          primaryCTA={{ label: "View Menu" }}
          secondaryCTA={{ label: "Order via WhatsApp", variant: "outline", isWhatsApp: true }}
          align="left"
        />

        <section className="border-b bg-card/50" data-testid="section-highlights-bar">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: ChefHat, label: "Chef-Crafted", desc: "Every dish made fresh" },
                { icon: Leaf, label: "Fresh Ingredients", desc: "Locally sourced daily" },
                { icon: Clock, label: "Fast Delivery", desc: "30 min average" },
                { icon: Star, label: "4.8 Rating", desc: "2,000+ reviews" },
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
                      <div className="text-sm font-bold">Est. 2010</div>
                      <div className="text-xs text-muted-foreground">Serving with love for 15 years</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="pt-4 md:pt-0">
                <Badge variant="secondary" className="mb-4 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20">Our Story</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-about-title">
                  Where Tradition Meets Taste
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The Kitchen was born from a passion for authentic Malaysian and Asian cuisine. Our head chef brings over 20 years of culinary expertise, crafting dishes that celebrate the rich flavors of our heritage.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every ingredient is sourced fresh from local markets daily. We believe great food starts with great ingredients and is served with heart.
                </p>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { value: "15+", label: "Years" },
                    { value: "50+", label: "Menu Items" },
                    { value: "2K+", label: "Daily Orders" },
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
                  <p className="text-muted-foreground mt-1">Fresh, flavorful, made with love</p>
                </div>
                <Button variant="outline" data-testid={`button-menu-all-${catIdx}`}>
                  View Full Menu
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
                            Order Now
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
          badgeText="Today's Deal"
          title="Family Feast Bundle"
          description="Get 4 main courses + 2 drinks + 1 dessert for only RM 89.90 (save RM 30). Available for delivery and dine-in."
          ctaLabel="Order Now"
        />

        <StepProcess
          title="How to Order"
          subtitle="Three simple steps to get your favorite meals"
          steps={steps}
        />

        <ReservationCard
          title="Make a Reservation"
          subtitle="Book your table easily through WhatsApp"
          fields={reservationFields}
          description="Send us your reservation details on WhatsApp and we will confirm your booking within minutes."
          buttonLabel="Book via WhatsApp"
        />

        <GalleryGrid
          title="A Taste of Our Kitchen"
          subtitle="Every dish tells a story — here are some of our favorites"
          items={galleryItems}
        />

        <TestimonialGrid
          title="What Our Customers Say"
          subtitle="Real reviews from our happy diners"
          testimonials={testimonials}
        />

        <CTABanner
          title="Order Your Next Meal on WhatsApp"
          subtitle="Browse our menu, ask about daily specials, and place your order in seconds. Fast, personal, delicious."
          buttonLabel="Order on WhatsApp"
          bgClass="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-700 dark:to-amber-700 text-white"
        />
      </main>

      <StoreFooter
        storeName="The Kitchen"
        storeIcon={UtensilsCrossed}
        iconBgClass="bg-orange-600 dark:bg-orange-700 text-white"
        description="Serving authentic flavors with love since 2010. Dine-in, takeaway, or delivery — we bring the best to your table."
        contact={{ address: "45 Food Street, Petaling Jaya", phone: "+60 3-7890 1234", email: "hello@thekitchen.com" }}
        quickLinks={["Menu", "Reservations", "About", "Contact"]}
        operatingHours={[
          { label: "Mon - Fri", time: "10:00 AM - 10:00 PM" },
          { label: "Sat - Sun", time: "9:00 AM - 11:00 PM" },
        ]}
        extraLinks={[
          { label: "Delivery Info", href: "#" },
          { label: "Catering Services", href: "#" },
          { label: "Careers", href: "#" },
        ]}
      />
    </div>
  );
}
