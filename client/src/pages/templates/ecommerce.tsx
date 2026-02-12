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
  ManagementShowcase,
} from "@/components/storefront";

const navLinks = ["Home", "Products", "Categories", "About", "Contact"];

const categories = [
  { name: "Fashion", icon: Shirt, color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
  { name: "Electronics", icon: Smartphone, color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
  { name: "Home & Living", icon: Home, color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
  { name: "Health & Beauty", icon: HeartPulse, color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" },
];

const products = [
  { name: "Classic Cotton T-Shirt", price: "RM 49.90", badge: "Best Seller" },
  { name: "Wireless Earbuds Pro", price: "RM 129.00", badge: "New" },
  { name: "Organic Face Serum", price: "RM 89.00", badge: "Popular" },
];

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Get your orders delivered within 1-3 business days nationwide" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "All transactions are encrypted and secured for your safety" },
  { icon: MessageCircle, title: "WhatsApp Support", desc: "Chat with us anytime for instant help and product inquiries" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free returns within 14 days of purchase" },
];

const managementFeatures = [
  { icon: Package, title: "Product Management", desc: "Add, edit, and organize products with variants, SKUs, images, and inventory tracking", badge: "Core", color: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" },
  { icon: CreditCard, title: "Payment Processing", desc: "Accept multiple payment methods including FPX, credit cards, and e-wallets", badge: "Core", color: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" },
  { icon: Truck, title: "Shipping & Logistics", desc: "Manage delivery zones, shipping rates, and courier integration with real-time tracking", badge: "Core", color: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" },
  { icon: Receipt, title: "Order Management", desc: "Track orders from placement to delivery with automated status updates via WhatsApp", color: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400" },
  { icon: Tags, title: "Promotions & Discounts", desc: "Create voucher codes, flash sales, bundle deals, and loyalty rewards for customers", color: "bg-pink-500/10 dark:bg-pink-400/10 text-pink-600 dark:text-pink-400" },
  { icon: Warehouse, title: "Inventory Control", desc: "Real-time stock levels, low stock alerts, and automatic reorder point notifications", color: "bg-orange-500/10 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400" },
  { icon: BarChart3, title: "Sales Analytics", desc: "Dashboards showing revenue, top products, conversion rates, and customer insights", color: "bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400" },
  { icon: MessageCircle, title: "WhatsApp Catalog", desc: "Sync products to WhatsApp catalog for customers to browse and order in-chat", badge: "WhatsApp", color: "bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400" },
];

export default function EcommerceTemplate() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="ShopName"
        storeIcon={ShoppingBag}
        navLinks={navLinks}
        showWhatsappInNav
      />

      <main className="flex-1">
        <StoreHero
          gradientClass="bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-emerald-950/90 dark:from-emerald-950/95 dark:via-emerald-900/90 dark:to-black/95"
          accentOverlay="bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_70%)]"
          badgeIcon={SiWhatsapp}
          badgeText="Shop via WhatsApp"
          title="Your One-Stop Online Shop"
          subtitle="Discover a wide range of quality products and shop conveniently through WhatsApp. Browse, ask questions, and order — all in one chat."
          primaryCTA={{ label: "Browse Products" }}
          secondaryCTA={{ label: "WhatsApp Us", variant: "outline", isWhatsApp: true }}
        />

        <CategoryGrid
          title="Featured Categories"
          subtitle="Browse our top categories and find exactly what you need"
          categories={categories}
        />

        <ProductGrid
          title="Featured Products"
          subtitle="Handpicked items at great prices — order directly via WhatsApp"
          products={products}
          placeholderIcon={ShoppingBag}
          actionLabel="Add to Cart"
          whatsappLabel="Ask"
        />

        <ManagementShowcase
          title="E-Commerce Management"
          subtitle="Everything you need to run your online store — from products to payments to delivery"
          features={managementFeatures}
          columns={4}
          bgSection
        />

        <FeatureHighlights
          title="Why Shop With Us"
          subtitle="We make your shopping experience simple, safe, and satisfying"
          features={features}
        />

        <CTABanner
          title="Chat with us on WhatsApp"
          subtitle="Have a question? Want to place an order? Reach out to us on WhatsApp for instant assistance."
          buttonLabel="Start Chat"
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
