import {
  Briefcase,
  CalendarDays,
  Users,
  FileText,
  Star,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiWhatsapp } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  StoreHeader,
  StoreFooter,
  FeatureHighlights,
  CTABanner,
} from "@/components/storefront";

export default function ServiceTemplate() {
  const { t } = useTranslation("templates");

  const navLinks = ["Home", "Services", "About", "Contact"];

  const services = [
    { name: "Business Consulting", desc: "Strategic business advice and planning", price: "RM 500/hr", icon: Briefcase },
    { name: "Tax & Accounting", desc: "Professional tax preparation and bookkeeping", price: "RM 300/session", icon: FileText },
    { name: "Legal Advisory", desc: "Contract review and legal consultation", price: "RM 600/hr", icon: CheckCircle2 },
    { name: "IT Support", desc: "Technical support and system maintenance", price: "RM 200/hr", icon: Star },
  ];

  const whyUs = [
    { icon: Star, title: "Expert Team", desc: "Certified professionals with 10+ years experience" },
    { icon: Clock, title: "Fast Response", desc: "24-hour response time for all inquiries" },
    { icon: Users, title: "Personal Touch", desc: "Dedicated account manager for each client" },
    { icon: CheckCircle2, title: "Quality Guaranteed", desc: "100% satisfaction or money-back guarantee" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="ServicePro"
        storeIcon={Briefcase}
        iconBgClass="bg-violet-500 dark:bg-violet-600 text-white"
        navLinks={navLinks}
        ctaLabel="Get a Quote"
        industry="service"
      />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">
                Professional Services
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">
                Expert services for your business growth
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                From consulting to compliance, we provide end-to-end professional services tailored to your needs.
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </a>
                <Button size="lg" variant="outline">
                  View Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card border-y" data-testid="section-services">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Services</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Comprehensive professional services for businesses of all sizes
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s, idx) => (
                <Card key={s.name} className="hover-elevate overflow-visible" data-testid={`card-service-${idx}`}>
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-violet-500/10 mb-4">
                      <s.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="font-semibold mb-1">{s.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-violet-600 dark:text-violet-400">{s.price}</span>
                      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          <Phone className="mr-1.5 h-3 w-3" />
                          Enquire
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FeatureHighlights
          title="Why Choose Us"
          subtitle="Our commitment to excellence sets us apart"
          features={whyUs}
          iconColorClass="bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400"
        />

        <CTABanner
          title="Ready to get started?"
          subtitle="Contact us today for a free consultation and discover how we can help your business grow."
          buttonLabel="Get Free Consultation"
          bgClass="bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 text-white"
        />
      </main>

      <StoreFooter
        storeName="ServicePro"
        storeIcon={Briefcase}
        iconBgClass="bg-violet-500 dark:bg-violet-600 text-white"
        description="Your trusted partner for professional business services."
        contact={{ address: "Level 15, Menara KL, KLCC", phone: "+60 12-555 6666", email: "hello@servicepro.com" }}
        quickLinks={["Consulting", "Tax & Accounting", "Legal", "IT Support"]}
        operatingHours={[
          { label: "Mon - Fri", time: "9:00 AM - 6:00 PM" },
          { label: "Sat", time: "10:00 AM - 2:00 PM" },
        ]}
      />
    </div>
  );
}
