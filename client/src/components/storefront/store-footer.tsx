import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface OperatingHours {
  label: string;
  time: string;
}

interface StoreFooterProps {
  storeName: string;
  storeIcon: LucideIcon;
  iconBgClass?: string;
  description: string;
  contact: ContactInfo;
  quickLinks: string[];
  extraLinks?: { label: string; href: string }[];
  operatingHours?: OperatingHours[];
  whatsappNumber?: string;
  year?: string;
}

export function StoreFooter({
  storeName,
  storeIcon: StoreIcon,
  iconBgClass = "bg-primary text-primary-foreground",
  description,
  contact,
  quickLinks,
  extraLinks = [],
  operatingHours,
  whatsappNumber = "1234567890",
  year = "2026",
}: StoreFooterProps) {
  const { t } = useTranslation("storefront");

  return (
    <footer className="border-t bg-card" data-testid="section-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${iconBgClass}`}>
                <StoreIcon className="h-4 w-4" />
              </div>
              <span className="font-bold" data-testid="text-footer-logo">{storeName}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {contact.address}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {contact.phone}</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> {contact.email}</div>
            </div>
          </div>

          <div>
            {operatingHours && operatingHours.length > 0 && (
              <>
                <h4 className="font-semibold mb-3">{t("footer.operatingHours")}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {operatingHours.map((h) => (
                    <li key={h.label} className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0" /> {h.label}: {h.time}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <h4 className={`font-semibold mb-3 ${operatingHours ? "mt-6" : ""}`}>{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s/g, "-")}`} data-testid={`link-footer-${link.toLowerCase().replace(/\s/g, "-")}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t("footer.account")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/auth/login">
                  <span className="cursor-pointer" data-testid="link-merchant-login-footer">{t("footer.merchantLogin")}</span>
                </Link>
              </li>
              {extraLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p data-testid="text-copyright">{year} {storeName}. {t("footer.allRightsReserved")}</p>
          <div className="flex items-center gap-3">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" data-testid="link-footer-whatsapp">
              <SiWhatsapp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
