import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  UtensilsCrossed,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Zap,
  MessageSquare,
  Bot,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const steps = [
  { title: "Business Info", icon: Store },
  { title: "Industry", icon: Zap },
  { title: "WhatsApp", icon: MessageSquare },
  { title: "Products", icon: Upload },
  { title: "AI Script", icon: Bot },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState<"ecommerce" | "restaurant" | null>(null);
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">OAIM</span>
            <span className="text-muted-foreground text-sm">Setup</span>
          </div>
          <Progress value={progress} className="h-1.5" data-testid="progress-onboarding" />
          <div className="flex items-center gap-2 mt-3 overflow-x-auto">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`flex items-center gap-1.5 text-xs whitespace-nowrap ${i <= step ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {i < step ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <s.icon className="h-4 w-4" />
                )}
                {s.title}
                {i < steps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Create Your Business</h2>
                <p className="text-muted-foreground">Let's set up your OAIM account. This takes about 5 minutes.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" placeholder="e.g. My Fashion Store" data-testid="input-business-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Your Name</Label>
                  <Input id="owner-name" placeholder="e.g. John Doe" data-testid="input-owner-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input id="owner-email" type="email" placeholder="you@company.com" data-testid="input-owner-email" />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Choose Your Industry</h2>
                <p className="text-muted-foreground">This will load a pre-built template with AI scripts, tags, and workflows.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all overflow-visible hover-elevate ${industry === "ecommerce" ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setIndustry("ecommerce")}
                  data-testid="card-industry-ecommerce"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-500/10 dark:bg-blue-400/10 mx-auto mb-4">
                      <Store className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">E-commerce</h3>
                    <p className="text-sm text-muted-foreground">Products, pricing, orders, COD, shipping</p>
                    {industry === "ecommerce" && (
                      <Badge className="mt-3">Selected</Badge>
                    )}
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all overflow-visible hover-elevate ${industry === "restaurant" ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setIndustry("restaurant")}
                  data-testid="card-industry-restaurant"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-orange-500/10 dark:bg-orange-400/10 mx-auto mb-4">
                      <UtensilsCrossed className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Restaurant</h3>
                    <p className="text-sm text-muted-foreground">Menu, reservations, delivery, loyalty</p>
                    {industry === "restaurant" && (
                      <Badge className="mt-3">Selected</Badge>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Connect WhatsApp</h2>
                <p className="text-muted-foreground">Link your WhatsApp Business number via Cloud API.</p>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-green-500/10 dark:bg-green-400/10 mx-auto mb-4">
                    <SiWhatsapp className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="font-semibold mb-1">WhatsApp Business API</h3>
                    <p className="text-sm text-muted-foreground">Enter your WhatsApp Cloud API credentials</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-id">Phone Number ID</Label>
                      <Input id="phone-id" placeholder="e.g. 123456789012345" data-testid="input-phone-id" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wa-token">Access Token</Label>
                      <Input id="wa-token" type="password" placeholder="Your permanent access token" data-testid="input-wa-token" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <p className="text-xs text-muted-foreground text-center">
                Don't have a Cloud API account? <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Set up here</a>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">
                  Import {industry === "restaurant" ? "Menu Items" : "Products"}
                </h2>
                <p className="text-muted-foreground">Add your {industry === "restaurant" ? "menu" : "product catalog"} or use our sample data to get started.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover-elevate overflow-visible" data-testid="card-import-csv">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Upload CSV</h3>
                    <p className="text-sm text-muted-foreground">Import from a spreadsheet</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover-elevate overflow-visible" data-testid="card-import-sample">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Use Sample Data</h3>
                    <p className="text-sm text-muted-foreground">Start with demo {industry === "restaurant" ? "menu" : "products"}</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-2">Sample data will include:</div>
                  <ul className="space-y-1">
                    {(industry === "restaurant"
                      ? ["10 menu items with categories", "Sample pricing", "Item descriptions and images"]
                      : ["15 products with categories", "Sample pricing and stock", "Product descriptions"]
                    ).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Enable AI Script</h2>
                <p className="text-muted-foreground">Your AI assistant is ready. Review the settings and launch.</p>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10 mx-auto mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="font-semibold mb-1">
                      {industry === "restaurant" ? "Restaurant" : "E-commerce"} AI Script
                    </h3>
                    <p className="text-sm text-muted-foreground">Pre-configured for your industry</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Tone", value: "Friendly & Professional" },
                      { label: "Goal", value: industry === "restaurant" ? "Reservations & Orders" : "Close Sales" },
                      { label: "Auto-reply", value: "Within 5 seconds" },
                      { label: "Language", value: "English + Bahasa" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">You're all set!</div>
                      <div className="text-sm text-muted-foreground">
                        Click "Complete Setup" to go to your Inbox and start receiving messages.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              data-testid="button-prev-step"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !industry}
                data-testid="button-next-step"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href="/app">
                <Button data-testid="button-complete-setup">
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
