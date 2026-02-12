import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Heart,
  Scissors,
  Palette,
  Menu,
  X,
  Award,
  Droplets,
  ShieldCheck,
  CalendarCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  Camera,
  Gem,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const navLinks = ["Home", "Services", "Booking", "Gallery", "Contact"];

const services = [
  { name: "Facial Treatment", icon: Sparkles, desc: "Deep cleansing, hydrating, and anti-aging facial therapies", price: "RM 80 - RM 250", color: "bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400" },
  { name: "Body Massage", icon: Heart, desc: "Relaxing full body massages with aromatherapy oils", price: "RM 120 - RM 300", color: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400" },
  { name: "Hair & Styling", icon: Scissors, desc: "Precision cuts, coloring, treatments, and bridal styling", price: "RM 50 - RM 200", color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
  { name: "Nail Art", icon: Palette, desc: "Manicures, pedicures, gel art, and nail extensions", price: "RM 40 - RM 150", color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
  { name: "Spa Package", icon: Gem, desc: "Full day spa experience with multiple treatments combined", price: "RM 280 - RM 500", color: "bg-teal-500/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400" },
  { name: "Bridal Package", icon: Heart, desc: "Complete bridal beauty prep including makeup trial and day-of service", price: "RM 800 - RM 2000", color: "bg-fuchsia-500/10 dark:bg-fuchsia-400/10 text-fuchsia-600 dark:text-fuchsia-400" },
];

const whyUs = [
  { icon: Award, title: "Certified Therapists", desc: "All our therapists are professionally certified and trained" },
  { icon: Droplets, title: "Premium Products", desc: "We use only high-quality, dermatologically tested products" },
  { icon: ShieldCheck, title: "Hygiene Guaranteed", desc: "Strict hygiene and sanitization protocols for your safety" },
  { icon: CalendarCheck, title: "Flexible Booking", desc: "Book anytime via WhatsApp — we work around your schedule" },
];

const packages = [
  {
    name: "Glow Up",
    price: "RM 199",
    items: ["60-min Facial Treatment", "Express Manicure", "Scalp Massage", "Complimentary Drink"],
    popular: false,
  },
  {
    name: "Total Bliss",
    price: "RM 399",
    items: ["90-min Full Body Massage", "Luxury Facial", "Gel Manicure & Pedicure", "Hair Wash & Blowdry", "Welcome Refreshments"],
    popular: true,
  },
  {
    name: "Bridal Prep",
    price: "RM 899",
    items: ["Pre-wedding Facial Course (3x)", "Bridal Makeup Trial", "Day-of Makeup & Hair", "Mani-Pedi with Nail Art", "Relaxation Massage"],
    popular: false,
  },
];

const galleryColors = [
  "bg-rose-100 dark:bg-rose-900/30",
  "bg-violet-100 dark:bg-violet-900/30",
  "bg-pink-100 dark:bg-pink-900/30",
  "bg-amber-100 dark:bg-amber-900/30",
  "bg-teal-100 dark:bg-teal-900/30",
  "bg-fuchsia-100 dark:bg-fuchsia-900/30",
];

export default function BeautyTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-500 dark:bg-rose-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold" data-testid="text-logo">Beauty Studio</span>
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
                <Button data-testid="button-book-now-nav">
                  Book Now
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
              <Button className="w-full" data-testid="button-book-now-mobile">
                Book Now
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
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-rose-900/80 to-pink-950/90 dark:from-rose-950/95 dark:via-rose-900/90 dark:to-black/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(244,114,182,0.15),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20" data-testid="badge-hero">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium beauty treatments
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white" data-testid="text-hero-title">
                Relax, Rejuvenate, Refresh
              </h1>
              <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto" data-testid="text-hero-subtitle">
                Indulge in our professional beauty and wellness treatments. Book your appointment effortlessly via WhatsApp and let us take care of the rest.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="text-base" data-testid="button-book-appointment">
                    Book Appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-base border-white/30 text-white bg-white/10 backdrop-blur-sm" data-testid="button-hero-whatsapp">
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-services">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-services-title">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Professional treatments tailored to your beauty and wellness needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <Card key={service.name} className="hover-elevate overflow-visible" data-testid={`card-service-${idx}`}>
                <CardContent className="p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-md ${service.color} mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1" data-testid={`text-service-name-${idx}`}>{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-service-desc-${idx}`}>{service.desc}</p>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-sm font-medium" data-testid={`text-service-price-${idx}`}>{service.price}</span>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" data-testid={`button-book-service-${idx}`}>
                        Book Now
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-card border-y" data-testid="section-why-us">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-why-title">Why Choose Us</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Trusted by hundreds of clients for quality, safety, and results</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {whyUs.map((item) => (
                <div key={item.title} className="text-center p-4" data-testid={`feature-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rose-500/10 dark:bg-rose-400/10 mx-auto mb-3">
                    <item.icon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-gallery">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-gallery-title">Our Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A glimpse of the transformations and results we deliver</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryColors.map((color, idx) => (
              <div
                key={idx}
                className={`${color} rounded-md h-40 md:h-56 flex items-center justify-center`}
                data-testid={`gallery-placeholder-${idx}`}
              >
                <Camera className="h-8 w-8 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border-y" data-testid="section-packages">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-packages-title">Special Packages</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Save more with our curated beauty bundles</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {packages.map((pkg, idx) => (
                <Card
                  key={pkg.name}
                  className={`hover-elevate overflow-visible ${pkg.popular ? "border-rose-500/50 dark:border-rose-400/50" : ""}`}
                  data-testid={`card-package-${idx}`}
                >
                  <CardContent className="p-6">
                    {pkg.popular && (
                      <Badge variant="secondary" className="mb-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" data-testid={`badge-popular-${idx}`}>
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-xl font-bold mb-1" data-testid={`text-package-name-${idx}`}>{pkg.name}</h3>
                    <p className="text-2xl font-bold mb-4" data-testid={`text-package-price-${idx}`}>{pkg.price}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-rose-500 dark:text-rose-400 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant={pkg.popular ? "default" : "outline"} data-testid={`button-book-package-${idx}`}>
                        <SiWhatsapp className="mr-2 h-4 w-4" />
                        Book Package
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700 text-white" data-testid="section-booking-cta">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
              <SiWhatsapp className="h-7 w-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-booking-cta-title">Book Your Session Today</h2>
            <p className="text-white/80 max-w-lg mx-auto mb-6">
              Ready to treat yourself? Reach out on WhatsApp and our team will help you find the perfect treatment.
            </p>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="text-base" data-testid="button-cta-whatsapp">
                <SiWhatsapp className="mr-2 h-4 w-4" />
                Book on WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card" data-testid="section-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-500 dark:bg-rose-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-bold" data-testid="text-footer-logo">Beauty Studio</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your destination for premium beauty and wellness treatments. Relax, rejuvenate, and refresh with us.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> 88 Beauty Lane, Bangsar</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +60 12-888 9999</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> hello@beautystudio.com</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Operating Hours</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Mon - Fri: 10:00 AM - 9:00 PM</li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Sat - Sun: 9:00 AM - 7:00 PM</li>
              </ul>
              <h4 className="font-semibold mb-3 mt-6">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Services", "Booking", "Gallery", "Contact"].map((link) => (
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
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Loyalty Program</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p data-testid="text-copyright">2026 Beauty Studio. All rights reserved.</p>
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
