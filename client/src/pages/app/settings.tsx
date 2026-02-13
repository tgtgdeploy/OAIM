import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, Bot, Users, CreditCard, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation("app");

  const roleTranslations: Record<string, string> = {
    Owner: t("settings.roleOwner"),
    Admin: t("settings.roleAdmin"),
    Staff: t("settings.roleStaff"),
  };

  return (
    <AppLayout title={t("settings.title")}>
      <div className="p-4 md:p-6 max-w-4xl">
        <Tabs defaultValue="business" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="business" data-testid="tab-business"><Store className="h-4 w-4 mr-1.5" />{t("settings.tabBusiness")}</TabsTrigger>
            <TabsTrigger value="ai" data-testid="tab-ai"><Bot className="h-4 w-4 mr-1.5" />{t("settings.tabAiScript")}</TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team"><Users className="h-4 w-4 mr-1.5" />{t("settings.tabTeam")}</TabsTrigger>
            <TabsTrigger value="billing" data-testid="tab-billing"><CreditCard className="h-4 w-4 mr-1.5" />{t("settings.tabBilling")}</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">{t("settings.businessInfo")}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="biz-name">{t("settings.businessName")}</Label>
                    <Input id="biz-name" defaultValue="My Fashion Store" data-testid="input-biz-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-industry">{t("settings.industry")}</Label>
                    <Select defaultValue="ecommerce">
                      <SelectTrigger data-testid="select-industry">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">{t("settings.ecommerce")}</SelectItem>
                        <SelectItem value="restaurant">{t("settings.restaurant")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-phone">{t("settings.whatsappNumber")}</Label>
                    <Input id="biz-phone" defaultValue="+60 12-345-6789" data-testid="input-biz-phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-email">{t("settings.businessEmail")}</Label>
                    <Input id="biz-email" defaultValue="hello@myfashion.com" data-testid="input-biz-email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-address">{t("settings.address")}</Label>
                  <Textarea id="biz-address" defaultValue="123 Jalan Bukit Bintang, 55100 KL" className="resize-none" rows={2} data-testid="input-biz-address" />
                </div>
                <Button data-testid="button-save-business">{t("settings.saveChanges")}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">{t("settings.aiSalesScript")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 p-3 border rounded-md">
                    <div>
                      <div className="text-sm font-medium">{t("settings.autoReplyEnabled")}</div>
                      <div className="text-xs text-muted-foreground">{t("settings.autoReplyDesc")}</div>
                    </div>
                    <Switch defaultChecked data-testid="switch-auto-reply" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-tone">{t("settings.tone")}</Label>
                    <Select defaultValue="friendly">
                      <SelectTrigger data-testid="select-tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">{t("settings.toneFriendly")}</SelectItem>
                        <SelectItem value="formal">{t("settings.toneFormal")}</SelectItem>
                        <SelectItem value="casual">{t("settings.toneCasual")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-goal">{t("settings.salesGoal")}</Label>
                    <Select defaultValue="close">
                      <SelectTrigger data-testid="select-goal">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="close">{t("settings.goalCloseSales")}</SelectItem>
                        <SelectItem value="qualify">{t("settings.goalQualifyLeads")}</SelectItem>
                        <SelectItem value="support">{t("settings.goalCustomerSupport")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-rules">{t("settings.customRules")}</Label>
                    <Textarea
                      id="ai-rules"
                      placeholder={t("settings.customRulesPlaceholder")}
                      className="resize-none"
                      rows={4}
                      data-testid="input-ai-rules"
                    />
                  </div>
                </div>
                <Button data-testid="button-save-ai">{t("settings.saveScriptSettings")}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">{t("settings.teamMembers")}</h3>
                  <Button data-testid="button-invite-member">
                    <Users className="h-4 w-4 mr-2" />
                    {t("settings.invite")}
                  </Button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "John Doe", email: "john@company.com", role: "Owner" },
                    { name: "Jane Smith", email: "jane@company.com", role: "Admin" },
                    { name: "Ali Hassan", email: "ali@company.com", role: "Staff" },
                  ].map((member) => (
                    <div key={member.email} className="flex items-center gap-3 p-3 border rounded-md" data-testid={`member-${member.email}`}>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.email}</div>
                      </div>
                      <Badge variant="secondary">{roleTranslations[member.role]}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">{t("settings.currentPlan")}</h3>
                <div className="flex items-center justify-between gap-4 p-4 bg-primary/5 rounded-md border border-primary/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{t("settings.proPlan")}</span>
                      <Badge>{t("common.active")}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">$79/month - Renews Feb 28, 2026</p>
                  </div>
                  <Button variant="outline" data-testid="button-change-plan">{t("settings.changePlan")}</Button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">{t("settings.usageThisMonth")}</h4>
                  <div className="space-y-2">
                    {[
                      { label: t("settings.usageMessages"), used: 1234, limit: 5000 },
                      { label: t("settings.usageTeamMembers"), used: 3, limit: 5 },
                      { label: t("settings.usageProducts"), used: 8, limit: 500 },
                    ].map((usage) => (
                      <div key={usage.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{usage.label}</span>
                          <span className="text-muted-foreground">{usage.used} / {usage.limit}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${(usage.used / usage.limit) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
