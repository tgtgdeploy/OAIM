import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UtensilsCrossed,
  Menu,
  X,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ClipboardList,
  Truck,
  CalendarDays,
  Users,
  Flame,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const navLinks = ["Home", "Menu", "Reservations", "About", "Contact"];

const dishes = [
  { name: "Nasi Lemak Special", desc: "Fragrant coconut rice with sambal, fried chicken, egg, and anchovies", price: "RM 15.90" },
  { name: "Grilled Salmon Set", desc: "Atlantic salmon with herb butter, seasonal vegetables, and rice", price: "RM 38.00" },
  { name: "Tom Yum Seafood", desc: "Spicy and sour Thai soup loaded with fresh prawns, squid, and mussels", price: "RM 22.00" },
];

const steps = [
  { step: "1", icon: ClipboardList, title: "Browse Menu", desc: "Explore our full menu and pick your favorites" },
  { step: "2", icon: SiWhatsapp, title: "WhatsApp Order", desc: "Send us your order via WhatsApp — fast and easy" },
  { step: "3", icon: Truck, title: "Delivery / Pickup", desc: "Get your food delivered or pick it up at our outlet" },
];

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "The food is always fresh and delivery is super fast. Love ordering through WhatsApp!" },
  { name: "Ahmad R.", rating: 5, text: "Best Nasi Lemak in town. The portions are generous and the sambal is incredible." },
  { name: "Lisa T.", rating: 4, text: "Great variety on the menu. The reservation system through WhatsApp is very convenient." },
];

export default function FnbTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold" data-testid="text-logo">Restaurant Name</span>
            </div>

            <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors" data-testid={`link-nav-${link.toLowerCase()}`}>
                  {link}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <Button data-testid="button-order-now-nav">
                  Order Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href="/auth/login">
                <span className="text-sm text-muted-foreground cursor-pointer" data-testid="link-merchant-login-nav">
                  Merchant Login
                </span>
              </Link>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden border-t transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          data-testid="nav-mobile"
        >
          <div className="px-4 py-4 space-y-3 bg-background">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground py-1" data-testid={`link-mobile-${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full" data-testid="button-order-now-mobile">
                Order Now
              </Button>
            </a>
            <Link href="/auth/login">
              <span className="block text-sm text-muted-foreground py-1 cursor-pointer" data-testid="link-merchant-login-mobile">
                Merchant Login
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden" data-testid="section-hero">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/90 via-amber-900/80 to-orange-950/90 dark:from-orange-950/95 dark:via-amber-950/90 dark:to-black/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.12),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20" data-testid="badge-hero">
                <UtensilsCrossed className="h-3 w-3 mr-1" />
                Fresh from our kitchen
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white" data-testid="text-hero-title">
                Authentic Flavors, Delivered to You
              </h1>
              <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto" data-testid="text-hero-subtitle">
                Experience the taste of home-cooked meals crafted with the finest ingredients. Order easily through WhatsApp and enjoy delivery or pickup.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" variant="secondary" className="text-base" data-testid="button-view-menu">
                  View Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-base border-white/30 text-white bg-white/10 backdrop-blur-sm" data-testid="button-hero-whatsapp">
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    Order via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-dishes">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-dishes-title">Popular Dishes</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our most loved dishes, prepared fresh daily by our talented chefs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {dishes.map((dish, idx) => (
              <Card key={dish.name} className="hover-elevate overflow-visible" data-testid={`card-dish-${idx}`}>
                <CardContent className="p-0">
                  <div className="h-48 bg-muted rounded-t-md flex items-center justify-center">
                    <UtensilsCrossed className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-1" data-testid={`text-dish-name-${idx}`}>{dish.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`text-dish-desc-${idx}`}>{dish.desc}</p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-bold" data-testid={`text-dish-price-${idx}`}>{dish.price}</span>
                      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" data-testid={`button-order-dish-${idx}`}>
                          <SiWhatsapp className="mr-1 h-3 w-3" />
                          Order
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-card border-y" data-testid="section-specials">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Card className="overflow-visible bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent dark:from-amber-500/5 dark:via-orange-500/3" data-testid="card-specials">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 dark:bg-amber-400/10 shrink-0">
                  <Flame className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge variant="secondary" className="mb-2" data-testid="badge-special">Today's Deal</Badge>
                  <h3 className="text-xl font-bold mb-1" data-testid="text-special-title">Family Feast Bundle</h3>
                  <p className="text-muted-foreground" data-testid="text-special-desc">
                    Get 4 main courses + 2 drinks + 1 dessert for only RM 89.90 (save RM 30). Available for delivery and dine-in.
                  </p>
                </div>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button size="lg" data-testid="button-order-special">
                    Order Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-how-to-order">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-how-title">How to Order</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps to get your favorite meals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="text-center" data-testid={`step-${item.step}`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Step {item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border-y" data-testid="section-reservation">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-reservation-title">Make a Reservation</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Book your table easily through WhatsApp</p>
            </div>
            <Card className="max-w-2xl mx-auto overflow-visible" data-testid="card-reservation">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                    <CalendarDays className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Date & Time</p>
                      <p className="text-xs text-muted-foreground">Let us know your preferred slot</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                    <Users className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Party Size</p>
                      <p className="text-xs text-muted-foreground">How many guests are joining</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Send us your reservation details on WhatsApp and we will confirm your booking within minutes.
                </p>
                <div className="text-center">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" data-testid="button-book-whatsapp">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      Book via WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-testimonials">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-testimonials-title">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real reviews from our happy diners</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((review, idx) => (
              <Card key={review.name} className="hover-elevate overflow-visible" data-testid={`card-testimonial-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3" data-testid={`stars-${idx}`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${s <= review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`text-review-${idx}`}>{review.text}</p>
                  <p className="text-sm font-semibold" data-testid={`text-reviewer-${idx}`}>{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-card" data-testid="section-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <UtensilsCrossed className="h-4 w-4" />
                </div>
                <span className="font-bold" data-testid="text-footer-logo">Restaurant Name</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Serving authentic flavors with love since 2010. Dine-in, takeaway, or delivery — we bring the best to your table.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> 45 Food Street, Petaling Jaya</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +60 3-7890 1234</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> hello@restaurant.com</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Opening Hours</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Mon - Fri: 10:00 AM - 10:00 PM</li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Sat - Sun: 9:00 AM - 11:00 PM</li>
              </ul>
              <h4 className="font-semibold mb-3 mt-6">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Menu", "Reservations", "About", "Contact"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} data-testid={`link-footer-${link.toLowerCase()}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/login">
                    <span className="cursor-pointer" data-testid="link-merchant-login-footer">Merchant Login</span>
                  </Link>
                </li>
                <li><a href="#">Delivery Info</a></li>
                <li><a href="#">Catering Services</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p data-testid="text-copyright">2026 Restaurant Name. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" data-testid="link-footer-whatsapp">
                <SiWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
