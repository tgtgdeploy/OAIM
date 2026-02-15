import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarketingLayout } from "./layout";
import { Mail, MapPin, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation("marketing");

  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-title">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">{t("contact.formTitle")}</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.fullName")}</Label>
                      <Input id="name" placeholder={t("contact.namePlaceholder")} data-testid="input-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.email")}</Label>
                      <Input id="email" type="email" placeholder={t("contact.emailPlaceholder")} data-testid="input-email" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("contact.whatsappNumber")}</Label>
                      <Input id="phone" placeholder={t("contact.phonePlaceholder")} data-testid="input-phone" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">{t("contact.industry")}</Label>
                      <Select>
                        <SelectTrigger data-testid="select-industry">
                          <SelectValue placeholder={t("contact.selectIndustry")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">{t("contact.industryEcommerce")}</SelectItem>
                          <SelectItem value="restaurant">{t("contact.industryRestaurant")}</SelectItem>
                          <SelectItem value="other">{t("contact.industryOther")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.messagePlaceholder")}
                      className="resize-none"
                      rows={4}
                      data-testid="input-message"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto" data-testid="button-submit-contact">
                    {t("contact.sendMessage")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="hover-elevate" data-testid="card-whatsapp">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500/10 dark:bg-green-400/10 mb-3">
                  <SiWhatsapp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">{t("contact.whatsappUs")}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("contact.whatsappDesc")}
                </p>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    {t("contact.openWhatsapp")}
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card data-testid="card-email">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{t("contact.emailLabel")}</h3>
                <p className="text-sm text-muted-foreground">hello@oaim.com</p>
              </CardContent>
            </Card>

            <Card data-testid="card-location">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{t("contact.location")}</h3>
                <p className="text-sm text-muted-foreground">{t("contact.locationValue")}</p>
              </CardContent>
            </Card>

            <Card data-testid="card-hours">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{t("contact.businessHours")}</h3>
                <p className="text-sm text-muted-foreground">{t("contact.businessHoursValue")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
