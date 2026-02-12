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

const navLinks = ["Home", "Services", "Booking", "Gallery", "Contact"];

const services = [
  { name: "Facial Treatment", image: imgFacial, desc: "Deep cleansing, hydrating, and anti-aging facial therapies", price: "From RM 80", duration: "60 - 90 min", rating: 4.9 },
  { name: "Body Massage", image: imgMassage, desc: "Relaxing full body massages with aromatherapy oils", price: "From RM 120", duration: "60 - 120 min", rating: 4.8 },
  { name: "Hair & Styling", image: imgHair, desc: "Precision cuts, coloring, treatments, and bridal styling", price: "From RM 50", duration: "30 - 90 min", rating: 4.7 },
  { name: "Nail Art", image: imgNails, desc: "Manicures, pedicures, gel art, and nail extensions", price: "From RM 40", duration: "45 - 75 min", rating: 4.9 },
];

const therapists = [
  { name: "Sarah Chen", role: "Senior Therapist", specialty: "Facial & Skin Care", experience: "8 years", rating: 4.9, reviews: 342, image: imgTherapist1 },
  { name: "Maya Lim", role: "Massage Specialist", specialty: "Deep Tissue & Aromatherapy", experience: "6 years", rating: 4.8, reviews: 256, image: imgTherapist2 },
  { name: "Aisha Rahman", role: "Beauty Consultant", specialty: "Bridal Makeup & Hair", experience: "10 years", rating: 5.0, reviews: 189, image: imgTherapist3 },
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

const reviews = [
  { name: "Joanna T.", rating: 5, text: "Sarah is absolutely amazing with facials! My skin has never looked better. The studio is clean, relaxing, and the team is so welcoming.", service: "Facial Treatment", date: "2 weeks ago" },
  { name: "Priya M.", rating: 5, text: "Had the Total Bliss package for my birthday — every single treatment was perfect. Maya's massage is the best I've ever had!", service: "Total Bliss Package", date: "1 month ago" },
  { name: "Wei Lin K.", rating: 4, text: "Great nail art designs and very attentive service. The booking through WhatsApp was super convenient. Will definitely come back!", service: "Nail Art", date: "3 weeks ago" },
  { name: "Fatimah A.", rating: 5, text: "Aisha did an incredible job for my sister's wedding. The bridal prep package was worth every ringgit. Highly recommend!", service: "Bridal Prep", date: "1 month ago" },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BeautyTemplate() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="Beauty Studio"
        storeIcon={Sparkles}
        iconBgClass="bg-rose-500 dark:bg-rose-600 text-white"
        navLinks={navLinks}
        ctaLabel="Book Now"
        industry="beauty"
      />

      <main className="flex-1">
        <StoreHero
          bgImage={heroImg}
          gradientClass="bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/60 dark:to-black/20"
          badgeIcon={Sparkles}
          badgeText="Premium beauty treatments"
          title="Relax, Rejuvenate, Refresh"
          subtitle="Indulge in our professional beauty and wellness treatments. Book your appointment effortlessly via WhatsApp and let us take care of the rest."
          primaryCTA={{ label: "Book Appointment", isWhatsApp: true }}
          secondaryCTA={{ label: "View Services", variant: "outline" }}
          align="left"
        />

        <section className="border-b bg-card/50" data-testid="section-stats-bar">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Star, value: "4.9/5", label: "Client Rating" },
                { icon: UserCheck, value: "15+", label: "Therapists" },
                { icon: Clock, value: "10 Years", label: "Experience" },
                { icon: Heart, value: "8K+", label: "Happy Clients" },
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
              <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">Our Services</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-services-title">Professional Beauty & Wellness</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Tailored treatments delivered by certified therapists using premium products</p>
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
                                Book
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
              <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">Meet Our Team</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-therapists-title">Expert Therapists</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Our certified professionals bring years of expertise and genuine care to every session</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {therapists.map((t, idx) => (
                <Card key={t.name} className="hover-elevate overflow-visible" data-testid={`card-therapist-${idx}`}>
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-md">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-56 object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-0.5">{t.name}</h3>
                      <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mb-2">{t.role}</p>
                      <div className="space-y-1 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Scissors className="h-3 w-3" />
                          {t.specialty}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {t.experience} experience
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-semibold">{t.rating}</span>
                          <span className="text-xs text-muted-foreground">({t.reviews})</span>
                        </div>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" data-testid={`button-book-therapist-${idx}`}>
                            Book
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
                <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">Book Now</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-booking-title">Schedule Your Session</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Choose your preferred time slot and service, then confirm your booking via WhatsApp. We will send you a confirmation within minutes.
                </p>
                <div className="relative overflow-hidden rounded-md">
                  <img src={imgSpaRoom} alt="Spa treatment room" className="w-full h-48 md:h-64 object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      88 Beauty Lane, Bangsar
                    </div>
                  </div>
                </div>
              </div>
              <Card className="overflow-visible" data-testid="card-booking-form">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Available Time Slots</h3>
                  <p className="text-sm text-muted-foreground mb-4">Select a time and confirm via WhatsApp</p>
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
                    <h4 className="text-sm font-medium mb-3">Quick Select Service</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Facial", "Massage", "Hair", "Nails", "Spa Package"].map((s) => (
                        <Badge key={s} variant="outline" className="cursor-pointer" data-testid={`badge-service-${s.toLowerCase()}`}>
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full" data-testid="button-confirm-booking">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      Confirm via WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FeatureHighlights
          title="Why Choose Us"
          subtitle="Trusted by thousands of clients for quality, safety, and results"
          features={whyUs}
          iconColorClass="bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400"
          bgSection
        />

        <section data-testid="section-reviews">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4">Client Reviews</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-reviews-title">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Real reviews from verified clients</p>
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
          title="Special Packages"
          subtitle="Save more with our curated beauty bundles"
          packages={packages}
          accentColor="text-rose-500 dark:text-rose-400"
        />

        <section className="bg-card border-y" data-testid="section-recommended">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">Recommended</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-recommended-title">Popular Combinations</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Our clients love these treatment combos — book together and save</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Weekend Reset", items: ["Full Body Massage", "Express Facial", "Head Massage"], price: "RM 220", save: "Save RM 45", image: imgMassage },
                { title: "Bridal Glow", items: ["3x Facial Course", "Makeup Trial", "Mani-Pedi"], price: "RM 680", save: "Save RM 120", image: imgFacial },
                { title: "Girls Day Out", items: ["Group Massage (3 pax)", "Gel Nails", "Refreshments"], price: "RM 550", save: "Save RM 80", image: imgNails },
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
                            Book
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
          title="Book Your Session Today"
          subtitle="Ready to treat yourself? Reach out on WhatsApp and our team will help you find the perfect treatment."
          buttonLabel="Book on WhatsApp"
          bgClass="bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700 text-white"
        />
      </main>

      <StoreFooter
        storeName="Beauty Studio"
        storeIcon={Sparkles}
        iconBgClass="bg-rose-500 dark:bg-rose-600 text-white"
        description="Your destination for premium beauty and wellness treatments. Relax, rejuvenate, and refresh with us."
        contact={{ address: "88 Beauty Lane, Bangsar", phone: "+60 12-888 9999", email: "hello@beautystudio.com" }}
        quickLinks={["Services", "Booking", "Gallery", "Contact"]}
        operatingHours={[
          { label: "Mon - Fri", time: "10:00 AM - 9:00 PM" },
          { label: "Sat - Sun", time: "9:00 AM - 7:00 PM" },
        ]}
        extraLinks={[
          { label: "Gift Cards", href: "#" },
          { label: "Loyalty Program", href: "#" },
          { label: "Careers", href: "#" },
        ]}
      />
    </div>
  );
}
