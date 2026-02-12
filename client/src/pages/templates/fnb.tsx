import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Phone,
  Mail,
  ClipboardList,
  Truck,
  Flame,
  CalendarDays,
  Users,
  ChefHat,
  Receipt,
  CreditCard,
  LayoutGrid,
  Bell,
  Star,
  Bike,
  ClipboardCheck,
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
  ManagementShowcase,
  ProductGrid,
} from "@/components/storefront";

const navLinks = ["Home", "Menu", "Reservations", "About", "Contact"];

const dishes = [
  { name: "Nasi Lemak Special", desc: "Fragrant coconut rice with sambal, fried chicken, egg, and anchovies", price: "RM 15.90", badge: "Popular" },
  { name: "Grilled Salmon Set", desc: "Atlantic salmon with herb butter, seasonal vegetables, and rice", price: "RM 38.00" },
  { name: "Tom Yum Seafood", desc: "Spicy and sour Thai soup loaded with fresh prawns, squid, and mussels", price: "RM 22.00", badge: "Chef's Pick" },
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

const managementFeatures = [
  { icon: ChefHat, title: "Menu Management", desc: "Create and organize your digital menu with categories, photos, pricing, and daily specials", badge: "Core", color: "bg-orange-500/10 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400" },
  { icon: CalendarDays, title: "Reservation System", desc: "Accept table bookings via WhatsApp with time slots, party size, and auto-confirmation", badge: "Core", color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
  { icon: Bike, title: "Delivery & Takeaway", desc: "Manage delivery zones, rider assignments, pickup timers, and live order tracking", badge: "Core", color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" },
  { icon: LayoutGrid, title: "Table Management", desc: "Visual floor plan with table status, seating capacity, and real-time occupancy tracking", badge: "Core", color: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400" },
  { icon: CreditCard, title: "Checkout & Payment", desc: "QR table ordering, split bills, e-wallet integration, and automated receipt generation", badge: "Core", color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
  { icon: Receipt, title: "Order Queue", desc: "Kitchen display system with order queue, prep timers, and status notifications to customers", color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
  { icon: Bell, title: "WhatsApp Notifications", desc: "Auto-send order confirmations, prep updates, and delivery ETAs through WhatsApp", badge: "WhatsApp", color: "bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400" },
  { icon: ClipboardCheck, title: "Daily Operations", desc: "Opening/closing checklists, shift management, daily sales summary, and waste tracking", color: "bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400" },
  { icon: Star, title: "Reviews & Loyalty", desc: "Collect WhatsApp reviews, manage loyalty stamps, and reward repeat customers", color: "bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400" },
];

const reservationFields = [
  { icon: CalendarDays, title: "Date & Time", desc: "Let us know your preferred slot" },
  { icon: Users, title: "Party Size", desc: "How many guests are joining" },
];

export default function FnbTemplate() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="Restaurant Name"
        storeIcon={UtensilsCrossed}
        navLinks={navLinks}
        ctaLabel="Order Now"
      />

      <main className="flex-1">
        <StoreHero
          gradientClass="bg-gradient-to-br from-orange-950/90 via-amber-900/80 to-orange-950/90 dark:from-orange-950/95 dark:via-amber-950/90 dark:to-black/95"
          accentOverlay="bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.12),transparent_70%)]"
          badgeIcon={UtensilsCrossed}
          badgeText="Fresh from our kitchen"
          title="Authentic Flavors, Delivered to You"
          subtitle="Experience the taste of home-cooked meals crafted with the finest ingredients. Order easily through WhatsApp and enjoy delivery or pickup."
          primaryCTA={{ label: "View Menu" }}
          secondaryCTA={{ label: "Order via WhatsApp", variant: "outline", isWhatsApp: true }}
        />

        <ProductGrid
          title="Popular Dishes"
          subtitle="Our most loved dishes, prepared fresh daily by our talented chefs"
          products={dishes}
          placeholderIcon={UtensilsCrossed}
          actionLabel="Order"
          whatsappLabel="Ask"
          bgSection={false}
        />

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

        <ManagementShowcase
          title="F&B Management System"
          subtitle="Complete restaurant operations — from menu to table to delivery, all powered by WhatsApp"
          features={managementFeatures}
          columns={3}
          bgSection
        />

        <ReservationCard
          title="Make a Reservation"
          subtitle="Book your table easily through WhatsApp"
          fields={reservationFields}
          description="Send us your reservation details on WhatsApp and we will confirm your booking within minutes."
          buttonLabel="Book via WhatsApp"
        />

        <TestimonialGrid
          title="What Our Customers Say"
          subtitle="Real reviews from our happy diners"
          testimonials={testimonials}
        />
      </main>

      <StoreFooter
        storeName="Restaurant Name"
        storeIcon={UtensilsCrossed}
        description="Serving authentic flavors with love since 2010. Dine-in, takeaway, or delivery — we bring the best to your table."
        contact={{ address: "45 Food Street, Petaling Jaya", phone: "+60 3-7890 1234", email: "hello@restaurant.com" }}
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
