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
  Clock,
  CreditCard,
  Star,
  Bell,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import {
  StoreHeader,
  StoreHero,
  StoreFooter,
  ServiceGrid,
  FeatureHighlights,
  PackageGrid,
  GalleryGrid,
  CTABanner,
  ManagementShowcase,
} from "@/components/storefront";

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

const managementFeatures = [
  { icon: CalendarDays, title: "Booking & Appointment", desc: "Online booking via WhatsApp with available time slots, auto-confirmation, and calendar sync", badge: "Core", color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
  { icon: UserCheck, title: "Therapist Management", desc: "Manage therapist profiles, specialties, schedules, availability, and performance tracking", badge: "Core", color: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400" },
  { icon: Clock, title: "Session & Duration", desc: "Configure service durations, buffer times between sessions, and room/bed allocation", badge: "Core", color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
  { icon: Scissors, title: "Service Catalog", desc: "Organize services by category with pricing tiers, add-ons, and combo packages", color: "bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400" },
  { icon: CreditCard, title: "Payment & Packages", desc: "Prepaid packages, membership plans, gift vouchers, and multiple payment methods", color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" },
  { icon: Star, title: "Client Profiles", desc: "Track client preferences, treatment history, allergies, and personalized recommendations", color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
  { icon: Bell, title: "WhatsApp Reminders", desc: "Automated booking reminders 24h and 1h before appointments to reduce no-shows", badge: "WhatsApp", color: "bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400" },
];

export default function BeautyTemplate() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="Beauty Studio"
        storeIcon={Sparkles}
        iconBgClass="bg-rose-500 dark:bg-rose-600 text-white"
        navLinks={navLinks}
        ctaLabel="Book Now"
      />

      <main className="flex-1">
        <StoreHero
          gradientClass="bg-gradient-to-br from-rose-950/90 via-rose-900/80 to-pink-950/90 dark:from-rose-950/95 dark:via-rose-900/90 dark:to-black/95"
          accentOverlay="bg-[radial-gradient(circle_at_50%_30%,rgba(244,114,182,0.15),transparent_70%)]"
          badgeIcon={Sparkles}
          badgeText="Premium beauty treatments"
          title="Relax, Rejuvenate, Refresh"
          subtitle="Indulge in our professional beauty and wellness treatments. Book your appointment effortlessly via WhatsApp and let us take care of the rest."
          primaryCTA={{ label: "Book Appointment", isWhatsApp: true }}
          secondaryCTA={{ label: "WhatsApp Us", variant: "outline", isWhatsApp: true }}
        />

        <ServiceGrid
          title="Our Services"
          subtitle="Professional treatments tailored to your beauty and wellness needs"
          services={services}
        />

        <FeatureHighlights
          title="Why Choose Us"
          subtitle="Trusted by hundreds of clients for quality, safety, and results"
          features={whyUs}
          iconColorClass="bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400"
          bgSection
        />

        <GalleryGrid
          title="Our Work"
          subtitle="A glimpse of the transformations and results we deliver"
          placeholderColors={galleryColors}
        />

        <ManagementShowcase
          title="Beauty & Wellness Management"
          subtitle="Complete salon and spa operations — booking, therapists, sessions, and payments via WhatsApp"
          features={managementFeatures}
          columns={3}
          bgSection
        />

        <PackageGrid
          title="Special Packages"
          subtitle="Save more with our curated beauty bundles"
          packages={packages}
          accentColor="text-rose-500 dark:text-rose-400"
        />

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
