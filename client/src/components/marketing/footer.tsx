import { Link } from "wouter";
import { Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const footerLinks = {
  Product: [
    { label: "WhatsApp AI", href: "/products#whatsapp-ai" },
    { label: "CRM Pipeline", href: "/products#crm" },
    { label: "ERP Lite", href: "/products#erp" },
    { label: "Auto Follow-up", href: "/products#followup" },
    { label: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { label: "E-commerce", href: "/solutions#ecommerce" },
    { label: "Restaurant", href: "/solutions#restaurant" },
    { label: "Case Studies", href: "/cases" },
  ],
  Company: [
    { label: "About", href: "/contact" },
    { label: "Contact", href: "/contact" },
    { label: "Book Demo", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">OAIM</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              One AI Management. Turn WhatsApp into your AI-powered sales engine.
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium"
              data-testid="link-whatsapp-chat"
            >
              <SiWhatsapp className="h-4 w-4" />
              Chat with us
            </a>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} OAIM. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
