import { Link } from "wouter";
import { Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("marketing");

  const footerLinks = {
    [t("footer.product")]: [
      { label: t("footer.whatsappAi"), href: "/products#whatsapp-ai" },
      { label: t("footer.crmPipeline"), href: "/products#crm" },
      { label: t("footer.erpLite"), href: "/products#erp" },
      { label: t("footer.autoFollowUp"), href: "/products#followup" },
      { label: t("footer.pricing"), href: "/pricing" },
    ],
    [t("footer.solutions")]: [
      { label: t("footer.ecommerce"), href: "/solutions#ecommerce" },
      { label: t("footer.restaurant"), href: "/solutions#restaurant" },
      { label: t("footer.beautyWellness"), href: "/solutions#beauty" },
      { label: t("footer.caseStudies"), href: "/cases" },
    ],
    [t("footer.company")]: [
      { label: t("footer.about"), href: "/contact" },
      { label: t("footer.contact"), href: "/contact" },
      { label: t("footer.bookDemo"), href: "/contact" },
    ],
  };

  return (
    <footer className="border-t bg-card/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-600">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">OAIM</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {t("footer.description")}
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium"
              data-testid="link-whatsapp-chat"
            >
              <SiWhatsapp className="h-4 w-4" />
              {t("footer.chatWithUs")}
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
            &copy; {new Date().getFullYear()} OAIM. {t("footer.allRightsReserved")}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">{t("footer.privacy")}</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">{t("footer.terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
