import {
  TrendingUp,
  LineChart,
  Signal,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  StoreHeader,
  StoreFooter,
  FeatureHighlights,
  CTABanner,
} from "@/components/storefront";

export default function QuantTemplate() {
  const navLinks = ["Dashboard", "Strategies", "Signals", "Pricing"];

  const features = [
    { icon: LineChart, name: "Algo Trading", desc: "Automated trading strategies powered by quantitative models", metric: "12.5% avg annual return" },
    { icon: Signal, name: "Signal Analysis", desc: "Real-time market signals with AI-driven pattern recognition", metric: "85% accuracy rate" },
    { icon: BarChart3, name: "Portfolio Analytics", desc: "Advanced portfolio analysis with risk metrics and optimization", metric: "Multi-asset support" },
    { icon: Shield, name: "Risk Management", desc: "Dynamic position sizing and stop-loss automation", metric: "Max drawdown -8%" },
  ];

  const whyUs = [
    { icon: Zap, title: "Low Latency", desc: "Sub-millisecond execution for optimal fills" },
    { icon: Shield, title: "Risk Controls", desc: "Multi-layer risk management system" },
    { icon: LineChart, title: "Backtested", desc: "10+ years of historical backtesting" },
    { icon: CheckCircle2, title: "Transparent", desc: "Real-time P&L and trade logging" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StoreHeader
        storeName="QuantEdge"
        storeIcon={TrendingUp}
        iconBgClass="bg-cyan-500 dark:bg-cyan-600 text-white"
        navLinks={navLinks}
        ctaLabel="Start Trading"
        industry="quant"
      />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20">
                Quantitative Trading
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">
                Algorithmic trading for the modern investor
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Deploy proven quantitative strategies with real-time signal analysis and automated risk management.
              </p>
              <div className="flex gap-3">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View Performance
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-card/50" data-testid="section-stats">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "$2.4M", label: "Trading Volume" },
                { value: "12.5%", label: "Avg Annual Return" },
                { value: "342", label: "Active Strategies" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-testid="section-features">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Trading Tools</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Professional-grade quantitative tools for systematic trading
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, idx) => (
                <Card key={f.name} className="hover-elevate overflow-visible" data-testid={`card-feature-${idx}`}>
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-500/10 mb-4">
                      <f.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="font-semibold mb-1">{f.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{f.desc}</p>
                    <Badge variant="outline" className="text-cyan-600 dark:text-cyan-400 border-cyan-500/20">
                      {f.metric}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FeatureHighlights
          title="Why QuantEdge"
          subtitle="Built by traders, for traders"
          features={whyUs}
          iconColorClass="bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400"
          bgSection
        />

        <CTABanner
          title="Start your quantitative journey"
          subtitle="Deploy your first strategy in minutes with our intuitive platform."
          buttonLabel="Open Account"
          bgClass="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 text-white"
        />
      </main>

      <StoreFooter
        storeName="QuantEdge"
        storeIcon={TrendingUp}
        iconBgClass="bg-cyan-500 dark:bg-cyan-600 text-white"
        description="Professional quantitative trading platform."
        contact={{ address: "Menara Exchange, TRX", phone: "+60 12-777 8888", email: "info@quantedge.com" }}
        quickLinks={["Strategies", "Signals", "API Docs", "Support"]}
        operatingHours={[
          { label: "Market Hours", time: "24/5 (Mon-Fri)" },
          { label: "Support", time: "24/7" },
        ]}
      />
    </div>
  );
}
