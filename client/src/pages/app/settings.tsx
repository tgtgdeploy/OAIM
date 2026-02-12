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

export default function SettingsPage() {
  return (
    <AppLayout title="Settings">
      <div className="p-4 md:p-6 max-w-4xl">
        <Tabs defaultValue="business" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="business" data-testid="tab-business"><Store className="h-4 w-4 mr-1.5" />Business</TabsTrigger>
            <TabsTrigger value="ai" data-testid="tab-ai"><Bot className="h-4 w-4 mr-1.5" />AI Script</TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team"><Users className="h-4 w-4 mr-1.5" />Team</TabsTrigger>
            <TabsTrigger value="billing" data-testid="tab-billing"><CreditCard className="h-4 w-4 mr-1.5" />Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Business Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="biz-name">Business Name</Label>
                    <Input id="biz-name" defaultValue="My Fashion Store" data-testid="input-biz-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-industry">Industry</Label>
                    <Select defaultValue="ecommerce">
                      <SelectTrigger data-testid="select-industry">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-phone">WhatsApp Number</Label>
                    <Input id="biz-phone" defaultValue="+60 12-345-6789" data-testid="input-biz-phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-email">Business Email</Label>
                    <Input id="biz-email" defaultValue="hello@myfashion.com" data-testid="input-biz-email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-address">Address</Label>
                  <Textarea id="biz-address" defaultValue="123 Jalan Bukit Bintang, 55100 KL" className="resize-none" rows={2} data-testid="input-biz-address" />
                </div>
                <Button data-testid="button-save-business">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">AI Sales Script</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 p-3 border rounded-md">
                    <div>
                      <div className="text-sm font-medium">Auto-reply enabled</div>
                      <div className="text-xs text-muted-foreground">AI will respond to incoming messages automatically</div>
                    </div>
                    <Switch defaultChecked data-testid="switch-auto-reply" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-tone">Tone</Label>
                    <Select defaultValue="friendly">
                      <SelectTrigger data-testid="select-tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly & Professional</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-goal">Sales Goal</Label>
                    <Select defaultValue="close">
                      <SelectTrigger data-testid="select-goal">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="close">Close Sales</SelectItem>
                        <SelectItem value="qualify">Qualify Leads</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-rules">Custom Rules</Label>
                    <Textarea
                      id="ai-rules"
                      placeholder="e.g. Always offer free shipping for orders above RM 100..."
                      className="resize-none"
                      rows={4}
                      data-testid="input-ai-rules"
                    />
                  </div>
                </div>
                <Button data-testid="button-save-ai">Save Script Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <Button data-testid="button-invite-member">
                    <Users className="h-4 w-4 mr-2" />
                    Invite
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
                      <Badge variant="secondary">{member.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Current Plan</h3>
                <div className="flex items-center justify-between gap-4 p-4 bg-primary/5 rounded-md border border-primary/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">Pro Plan</span>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">$79/month - Renews Feb 28, 2026</p>
                  </div>
                  <Button variant="outline" data-testid="button-change-plan">Change Plan</Button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Usage This Month</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Messages", used: 1234, limit: 5000 },
                      { label: "Team Members", used: 3, limit: 5 },
                      { label: "Products", used: 8, limit: 500 },
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
