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

const navLinks = ["Home", "Products", "Categories", "About", "Contact"];

const categories = [
  { name: "Fashion", icon: Shirt, color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
  { name: "Electronics", icon: Smartphone, color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
  { name: "Home & Living", icon: Home, color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
  { name: "Health & Beauty", icon: HeartPulse, color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" },
];

const featuredProducts = [
  { name: "Classic Cotton T-Shirt", price: "RM 49.90", originalPrice: "RM 69.90", badge: "Best Seller", image: imgTshirt, desc: "Premium 100% organic cotton, available in 8 colors" },
  { name: "Wireless Earbuds Pro", price: "RM 129.00", badge: "New", image: imgEarbuds, desc: "Active noise cancellation, 24h battery life" },
  { name: "Organic Face Serum", price: "RM 89.00", badge: "Popular", image: imgSerum, desc: "Vitamin C brightening formula with hyaluronic acid" },
];

const newArrivals = [
  { name: "Sport Sneakers V2", price: "RM 199.00", image: imgSneakers, desc: "Lightweight breathable running shoes" },
  { name: "Smart Watch Elite", price: "RM 349.00", badge: "New", image: imgWatch, desc: "Heart rate, GPS, 7-day battery" },
  { name: "Leather Crossbody Bag", price: "RM 159.00", image: imgBag, desc: "Genuine leather, adjustable strap" },
];

const features = [
  { icon: Truck, title: "Free Delivery", desc: "Free shipping on orders above RM 100 nationwide" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "All transactions encrypted with bank-grade security" },
  { icon: MessageCircle, title: "WhatsApp Support", desc: "Chat with us anytime for instant help" },
  { icon: RotateCcw, title: "14-Day Returns", desc: "Hassle-free returns with full refund guarantee" },
];

const testimonials = [
  { name: "Aisyah K.", rating: 5, text: "Super fast delivery and the quality exceeded my expectations! Love ordering through WhatsApp, so convenient." },
  { name: "Daniel L.", rating: 5, text: "The earbuds are amazing, great sound quality. Customer service was very responsive via WhatsApp." },
  { name: "Mei Ling C.", rating: 4, text: "Beautiful packaging and genuine products. The face serum is now my daily essential. Will reorder!" },
];

const flashDeals = [
  { name: "Smart Watch Elite", price: "RM 249.00", originalPrice: "RM 349.00", image: imgWatch, badge: "-29%", desc: "Limited time offer" },
  { name: "Leather Crossbody Bag", price: "RM 119.00", originalPrice: "RM 159.00", image: imgBag, badge: "-25%", desc: "While stocks last" },
  { name: "Organic Face Serum", price: "RM 59.00", originalPrice: "RM 89.00", image: imgSerum, badge: "-34%", desc: "Bundle with cleanser" },
];

export default function EcommerceTemplate() {
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
          badgeText="Shop via WhatsApp"
          title="Discover Quality Products for Every Lifestyle"
          subtitle="Browse curated collections, shop confidently with secure checkout, and enjoy fast nationwide delivery. Chat with us on WhatsApp for personalized recommendations."
          primaryCTA={{ label: "Browse Products" }}
          secondaryCTA={{ label: "WhatsApp Us", variant: "outline", isWhatsApp: true }}
          align="left"
        />

        <section className="border-b bg-card/50" data-testid="section-stats-bar">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Package, value: "2,500+", label: "Products" },
                { icon: Star, value: "4.9/5", label: "Rating" },
                { icon: Truck, value: "1-3 Days", label: "Delivery" },
                { icon: Heart, value: "15K+", label: "Happy Customers" },
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
          title="Shop by Category"
          subtitle="Find exactly what you need across our curated collections"
          categories={categories}
        />

        <ProductGrid
          title="Featured Products"
          subtitle="Handpicked items at great prices — order directly via WhatsApp"
          products={featuredProducts}
          placeholderIcon={ShoppingBag}
          actionLabel="Add to Cart"
          whatsappLabel="Ask"
        />

        <section className="bg-card border-y" data-testid="section-flash-deals">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">Limited Time</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-flash-title">Flash Deals</h2>
                <p className="text-muted-foreground mt-1">Grab these deals before they expire</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Ends in 23:59:59</span>
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
                        Grab Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ProductGrid
          title="New Arrivals"
          subtitle="Fresh styles and the latest products just added to our store"
          products={newArrivals}
          placeholderIcon={ShoppingBag}
          actionLabel="Add to Cart"
          bgSection={false}
        />

        <section className="bg-card border-y" data-testid="section-brand-story">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Our Story</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-brand-title">
                  Quality Products, Honest Prices
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded in 2020, ShopName started with a simple mission: to bring quality, curated products to Malaysian shoppers at honest prices. Every item in our store is carefully selected and tested by our team.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We believe shopping should be personal and convenient. That is why we are on WhatsApp — so you can chat with real people, ask questions about products, and get personalized recommendations before you buy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" data-testid="button-about-more">
                    Read Our Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" data-testid="button-about-whatsapp">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      Chat With Us
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
          title="Why Shop With Us"
          subtitle="We make your shopping experience simple, safe, and satisfying"
          features={features}
        />

        <TestimonialGrid
          title="What Our Customers Say"
          subtitle="Real reviews from verified shoppers"
          testimonials={testimonials}
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-perks">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Gift, title: "Loyalty Points", desc: "Earn points on every purchase and redeem for discounts", color: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400" },
              { icon: Tags, title: "Member Discounts", desc: "Exclusive prices and early access to new products", color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
              { icon: Truck, title: "Track Orders", desc: "Real-time tracking from warehouse to your doorstep", color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
              { icon: MessageCircle, title: "WhatsApp Updates", desc: "Order confirmations and delivery updates via WhatsApp", color: "bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400" },
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
          title="Start Shopping on WhatsApp"
          subtitle="Browse our catalog, ask questions, and place orders — all in one chat. Fast replies guaranteed."
          buttonLabel="Chat & Shop Now"
        />
      </main>

      <StoreFooter
        storeName="ShopName"
        storeIcon={ShoppingBag}
        description="Your trusted online store for quality products. Shop anytime, anywhere via WhatsApp."
        contact={{ address: "123 Commerce Street, KL", phone: "+60 12-345 6789", email: "hello@shopname.com" }}
        quickLinks={["Home", "Products", "Categories", "About Us", "Contact"]}
        extraLinks={[
          { label: "Track Order", href: "#" },
          { label: "Shipping Policy", href: "#" },
          { label: "Return Policy", href: "#" },
        ]}
      />
    </div>
  );
}
